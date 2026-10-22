# Order fulfillment setup (Stripe → Wix → Tapstitch)

How a paid order reaches production/shipping, and the one-time setup required to
turn it on. **If orders are charging in Stripe but never reaching Tapstitch, you
are almost certainly missing the Stripe webhook in step 1** — without it, nothing
downstream ever runs.

## How it works

```
Customer pays (Stripe Checkout)
        │
        ▼
Stripe fires `checkout.session.completed`  ── requires the webhook in step 1
        │
        ▼
POST /api/stripe-webhook  (verifies signature, reads cart from session metadata)
        │
        ▼
createWixOrder()  → creates a PAID order in Wix Stores      ── requires step 2
        │
        ▼
Wix's free Tapstitch app fulfills the paid order  ── install/connect in Wix
        │
        ▼
Production + shipping to the customer
```

The webhook **prefers the Wix bridge** whenever `WIX_API_KEY` + `WIX_SITE_ID`
are set; otherwise it falls back to the direct Tapstitch Enterprise API. With
neither set it no-ops cleanly (the order still appears in Stripe and the receipt
email still sends, so you can fulfill by hand).

Product → Wix catalog mapping lives in [`data/wix.ts`](data/wix.ts) (generated
from the Wix catalog export, joined to Tapstitch by SKU). The order payload is
isolated in [`lib/wix.ts`](lib/wix.ts).

## One-time setup

### 1. Register the Stripe webhook  ← the step most often missed

In the **Stripe Dashboard** (make sure you're in **Live mode**, not Test):

1. **Developers → Webhooks → Add endpoint**
2. Endpoint URL: `https://cashcultureluxury.com/api/stripe-webhook`
3. Events to send: **`checkout.session.completed`**
4. Save, then copy the **Signing secret** (`whsec_…`).

In **Vercel → Project → Settings → Environment Variables (Production)**:

| Variable | Value |
| --- | --- |
| `STRIPE_WEBHOOK_SECRET` | the `whsec_…` from above |
| `STRIPE_SECRET_KEY` | your live Stripe secret key (`sk_live_…`) |

### 2. Configure the Wix bridge

Get a Wix API key: **manage.wix.com → Settings → API Keys** (grant it Stores /
Orders permissions). Then in **Vercel → Environment Variables (Production)**:

| Variable | Value | Required |
| --- | --- | --- |
| `WIX_API_KEY` | the Wix API key | ✅ |
| `WIX_SITE_ID` | the Wix site (store) id that has the Tapstitch app installed | ✅ |
| `WIX_ACCOUNT_ID` | account id header — only if your key requires it | optional |
| `WIX_STORES_APP_ID` | override only if Wix changes the default Stores app id | optional |

In **Wix**: install the **Tapstitch** app on that same store and connect it, so
it auto-fulfills paid orders.

### 3. Redeploy

Environment-variable changes only take effect on a new deployment. Redeploy
production (push to `main`, or **Vercel → Deployments → Redeploy**).

## Verify it worked

1. Place a test order on the live site (Stripe **test mode** with card
   `4242 4242 4242 4242`, or a real low-value order you refund afterward).
2. **Vercel → Project → Logs** (or `get_runtime_logs`): you should now see
   `POST /api/stripe-webhook → 200`. If that line is **absent**, Stripe isn't
   delivering the event — recheck step 1 (endpoint URL, Live vs Test mode).
3. **Stripe → Webhooks → your endpoint**: the event shows a `200` response.
4. **Wix → Orders**: the new PAID order appears and Tapstitch picks it up.

## Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Charged in Stripe, no `POST /api/stripe-webhook` in logs | Webhook endpoint not registered (or pointing at Test mode / wrong URL) | Step 1 |
| `POST /api/stripe-webhook → 503` "Webhook not configured" | `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` missing | Step 1 + redeploy |
| `POST /api/stripe-webhook → 400` "Invalid signature" | `STRIPE_WEBHOOK_SECRET` doesn't match this endpoint (e.g. Test secret on a Live endpoint) | Copy the correct signing secret, redeploy |
| Webhook `200` but nothing in Wix; logs show `[wix] … skipping` | `WIX_API_KEY` / `WIX_SITE_ID` not set | Step 2 + redeploy |
| Logs show `[wix] Order create failed <status> <detail>` | Wix rejected the order payload | Read the `<detail>`; field mapping is isolated in `lib/wix.ts` |
| Logs show `[wix] No mappable items` | Product isn't mapped in `data/wix.ts` | Add the product to the Wix catalog + regenerate `data/wix.ts` |

All fulfillment logs are prefixed `[wix]` / `[stripe-webhook]`, so filtering
runtime logs by those tags surfaces any issue quickly.
