# Vercel access

Two ways to drive this project's Vercel account. The **MCP server** is the
default for Claude Code / agent sessions; the **CLI** is for shell-level work
and CI.

Both authenticate *as you* — neither can do more than your Vercel account
permissions already allow.

## 1. Vercel MCP (agents / Claude Code)

Configured in [`.mcp.json`](./.mcp.json), pointing at the hosted server
`https://mcp.vercel.com`. Any Claude Code session opened in this repo
(web, desktop, or IDE) will offer to connect.

- Auth is **OAuth** — you approve it in the browser the first time. No token
  is stored in the repo.
- Gives read/manage access to projects, deployments, build & runtime logs,
  domains, and deploy triggers.
- To scope it to just this project instead of the whole team, change the URL
  to `https://mcp.vercel.com/cash-culture/cash-culture`.

> Security: `.mcp.json` only references a URL. Approving the OAuth prompt is
> what grants access, so review the scopes Vercel shows you before accepting.

## 2. Vercel CLI (shell / CI)

The `vercel` CLI is a dev dependency, so `npx vercel ...` works after
`npm install`. Convenience scripts:

| Script | Command |
| --- | --- |
| `npm run vercel` | raw `vercel` passthrough |
| `npm run deploy` | `vercel deploy --prod` (production) |
| `npm run deploy:preview` | `vercel deploy` (preview) |
| `npm run logs` | `vercel logs` |
| `npm run env:pull` | pull project env into `.env.local` |

### Interactive auth (your own machine)

```bash
npx vercel login   # opens the browser
npx vercel link    # associates this folder with the project
```

### Token auth (CI / ephemeral containers / non-interactive)

1. Create a token at <https://vercel.com/account/tokens>.
2. Provide it as an environment variable — **never commit it**:
   - Local: add `VERCEL_TOKEN` to `.env.local` (gitignored).
   - Claude Code on the web: add `VERCEL_TOKEN` as an environment secret in
     the environment's settings so it's present each session.
   - CI: store it as a secret and expose it to the job.
3. With `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID` set (see `.env.example`) you can
   skip `vercel link`:

```bash
vercel deploy --prod --token "$VERCEL_TOKEN"
vercel logs --token "$VERCEL_TOKEN"
```

Tokens are long-lived credentials. Prefer the MCP/OAuth flow for interactive
work, scope tokens narrowly, and rotate them if one is ever exposed.
