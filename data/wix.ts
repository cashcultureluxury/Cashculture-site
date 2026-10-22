// AUTO-GENERATED from the Wix Stores catalog export (catalog_products.csv).
// Joins each storefront product (data/essentials.ts ids) to its Wix Stores
// Product ID + per-variant Size/Color option choices. The join key is the
// Tapstitch SKU, which appears identically in both the Wix export and
// data/tapstitch.ts, so every variant below is an exact (non-fuzzy) match.
// Regenerate by re-running the importer against a fresh Wix catalog export.
//
// catalogItemId = the Wix product GUID (the CSV handleId minus its 'product_'
// prefix). At order time we send option choices (e.g. { Size, Color }) rather
// than a variant id, since the Wix CSV export exposes choices, not variant ids.

export type WixVariant = {
  size?: string;
  color?: string;
  /** Tapstitch/Wix shared SKU — the join key (kept for traceability). */
  sku?: string;
};

export type WixProduct = {
  /** Wix Stores Product ID — the catalogReference.catalogItemId. */
  productId: string;
  title: string;
  /** Wix option names, used to build catalogReference.options choices. */
  sizeOptionName?: string;
  colorOptionName?: string;
  variants: WixVariant[];
};

/** Resolved target for a single cart line. */
export type WixCatalogRef = {
  /** Wix Product ID -> catalogReference.catalogItemId */
  productId: string;
  /** Option choices -> catalogReference.options.options, e.g. { Size: "M" }. */
  options?: Record<string, string>;
  /** Matched variant's exact Wix Size/Color choices + SKU. Used at order time to
   *  look up the managed-variant's variantId from the live Wix catalog (Wix
   *  requires variantId, not choices, for products with managed variants). */
  size?: string;
  color?: string;
  sku?: string;
};

// Keyed by storefront product id (data/essentials.ts).
export const WIX_BY_PRODUCT: Record<string, WixProduct> = {
  "ess-hoodie-bluelane": {
    productId: "abb84e66-503c-453f-808d-d2af508ba99c",
    title: "BLUE CREATE YOUR OWN LANE HOODIE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "2XL", sku: "260521PODRB2669#005" },
      { color: "Black", size: "XL", sku: "260521PODRB2669#004" },
      { color: "Black", size: "M", sku: "260521PODRB2669#002" },
      { color: "Black", size: "S", sku: "260521PODRB2669#001" },
      { color: "Black", size: "L", sku: "260521PODRB2669#003" },
    ],
  },
  "ess-hoodie-butterfly": {
    productId: "34a04904-829f-4f66-b41a-839153f7a9eb",
    title: "BUTTERFLY HOODIE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "S", sku: "241106PODRB1114#001" },
      { color: "Black", size: "M", sku: "241106PODRB1114#002" },
      { color: "Black", size: "2XL", sku: "241106PODRB1114#005" },
      { color: "Black", size: "L", sku: "241106PODRB1114#003" },
      { color: "Black", size: "XL", sku: "241106PODRB1114#004" },
    ],
  },
  "ess-hoodie-feelgood": {
    productId: "6b25d2e4-4bc6-41e7-9da4-08f8bd16b310",
    title: "FEEL GOOD HOODIE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "XL", sku: "241116PODRB0722#004" },
      { color: "Black", size: "M", sku: "241116PODRB0722#002" },
      { color: "Black", size: "L", sku: "241116PODRB0722#003" },
      { color: "Black", size: "2XL", sku: "241116PODRB0722#005" },
      { color: "Black", size: "S", sku: "241116PODRB0722#001" },
    ],
  },
  "ess-hoodie-pinkstars": {
    productId: "c7611e3c-3443-455b-960f-b0b223f1ad1a",
    title: "PINK STARS HOODIE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "M", sku: "260521PODRB2816#002" },
      { color: "Black", size: "2XL", sku: "260521PODRB2816#005" },
      { color: "Navy Blue", size: "S", sku: "260521PODRB2816#006" },
      { color: "Black", size: "S", sku: "260521PODRB2816#001" },
      { color: "Navy Blue", size: "2XL", sku: "260521PODRB2816#010" },
      { color: "Black", size: "XL", sku: "260521PODRB2816#004" },
      { color: "Navy Blue", size: "M", sku: "260521PODRB2816#007" },
      { color: "Navy Blue", size: "XL", sku: "260521PODRB2816#009" },
      { color: "Navy Blue", size: "L", sku: "260521PODRB2816#008" },
      { color: "Black", size: "L", sku: "260521PODRB2816#003" },
    ],
  },
  "ess-hoodie-rednolimit": {
    productId: "b60f5a84-03b8-4c97-ab77-45c62e3b1490",
    title: "RED NO LIMIT HOODIE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Retro Green", size: "M", sku: "260521PODRB2699#012" },
      { color: "Medium Gray", size: "XL", sku: "260521PODRB2699#009" },
      { color: "Medium Gray", size: "M", sku: "260521PODRB2699#007" },
      { color: "Medium Gray", size: "S", sku: "260521PODRB2699#006" },
      { color: "Black", size: "M", sku: "260521PODRB2699#002" },
      { color: "Retro Green", size: "S", sku: "260521PODRB2699#011" },
      { color: "Black", size: "2XL", sku: "260521PODRB2699#005" },
      { color: "Black", size: "L", sku: "260521PODRB2699#003" },
      { color: "Retro Green", size: "2XL", sku: "260521PODRB2699#015" },
      { color: "Medium Gray", size: "2XL", sku: "260521PODRB2699#010" },
      { color: "Black", size: "XL", sku: "260521PODRB2699#004" },
      { color: "Retro Green", size: "XL", sku: "260521PODRB2699#014" },
      { color: "Black", size: "S", sku: "260521PODRB2699#001" },
      { color: "Retro Green", size: "L", sku: "260521PODRB2699#013" },
      { color: "Medium Gray", size: "L", sku: "260521PODRB2699#008" },
    ],
  },
  "ess-hoodie-silentlove": {
    productId: "6724ba58-f68c-47ca-89d4-34a74a40a57d",
    title: "SILENT LOVE HOODIE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "L", sku: "241117PODRB0033#003" },
      { color: "Black", size: "XL", sku: "241117PODRB0033#004" },
      { color: "Black", size: "S", sku: "241117PODRB0033#001" },
      { color: "Black", size: "2XL", sku: "241117PODRB0033#005" },
      { color: "Black", size: "M", sku: "241117PODRB0033#002" },
    ],
  },
  "ess-hoodie-teddy": {
    productId: "356dce44-85fa-44ca-b31c-00d1fa23b547",
    title: "TEDDY HOODIES",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "XL", sku: "241116PODRB0724#004" },
      { color: "Black", size: "M", sku: "241116PODRB0724#002" },
      { color: "Black", size: "S", sku: "241116PODRB0724#001" },
      { color: "Black", size: "L", sku: "241116PODRB0724#003" },
      { color: "Black", size: "2XL", sku: "241116PODRB0724#005" },
    ],
  },
  "ess-joggers-silentlove": {
    productId: "7a750766-1644-442e-af86-db6e840fecd3",
    title: "SILENT LOVE JOGGERS",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "2XL", sku: "250121PODPX0870#005" },
      { color: "Black", size: "S", sku: "250121PODPX0870#001" },
      { color: "Black", size: "XL", sku: "250121PODPX0870#004" },
      { color: "Black", size: "M", sku: "250121PODPX0870#002" },
      { color: "Black", size: "L", sku: "250121PODPX0870#003" },
    ],
  },
  "ess-ls-hope": {
    productId: "a0dc64cf-a5e9-4cf7-a90f-c540a90e1875",
    title: "HOPE LONG SLEEVE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "L", sku: "260214PODRA2937#003" },
      { color: "Black", size: "2XL", sku: "260214PODRA2937#005" },
      { color: "Black", size: "S", sku: "260214PODRA2937#001" },
      { color: "Black", size: "M", sku: "260214PODRA2937#002" },
      { color: "Black", size: "XL", sku: "260214PODRA2937#004" },
    ],
  },
  "ess-shorts-samuraiblack": {
    productId: "b47d33ef-177a-4cc0-a23e-35d5f3d08503",
    title: "BLACK LOST SAMURAI SHORTS",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "XS", sku: "250514PODFV0098#001" },
      { color: "Black", size: "M", sku: "250514PODFV0098#003" },
      { color: "Black", size: "XL", sku: "250514PODFV0098#005" },
      { color: "Black", size: "L", sku: "250514PODFV0098#004" },
      { color: "Black", size: "S", sku: "250514PODFV0098#002" },
      { color: "Black", size: "2XL", sku: "250514PODFV0098#006" },
    ],
  },
  "ess-shorts-samuraiwhite": {
    productId: "ef50a19b-7ea3-4463-985e-517dcb493ba5",
    title: "WHITE LOST SAMURAI SHORTS",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "White", size: "XL", sku: "250514PODFV0089#005" },
      { color: "White", size: "L", sku: "250514PODFV0089#004" },
      { color: "White", size: "S", sku: "250514PODFV0089#002" },
      { color: "Oat Gray", size: "XS", sku: "250514PODFV0089#007" },
      { color: "Oat Gray", size: "S", sku: "250514PODFV0089#008" },
      { color: "Oat Gray", size: "2XL", sku: "250514PODFV0089#012" },
      { color: "White", size: "XS", sku: "250514PODFV0089#001" },
      { color: "Oat Gray", size: "L", sku: "250514PODFV0089#010" },
      { color: "White", size: "2XL", sku: "250514PODFV0089#006" },
      { color: "Oat Gray", size: "M", sku: "250514PODFV0089#009" },
      { color: "White", size: "M", sku: "250514PODFV0089#003" },
      { color: "Oat Gray", size: "XL", sku: "250514PODFV0089#011" },
    ],
  },
  "ess-tank-samuraihoodie": {
    productId: "e0f3278e-37fd-4612-9979-ae827a981c5b",
    title: "LOST SAMURAI TANK TOP HOODIE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "S", sku: "250514PODPT0085#001" },
      { color: "Black", size: "XL", sku: "250514PODPT0085#004" },
      { color: "Black", size: "M", sku: "250514PODPT0085#002" },
      { color: "Black", size: "2XL", sku: "250514PODPT0085#005" },
      { color: "Black", size: "L", sku: "250514PODPT0085#003" },
    ],
  },
  "ess-tank-silentlove": {
    productId: "0f08829e-2ccd-406e-99ee-fb812fd740f5",
    title: "SILET LOVE TANK TOP",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "M", sku: "250325PODPT0154#002" },
      { color: "Black", size: "S", sku: "250325PODPT0154#001" },
      { color: "Black", size: "XL", sku: "250325PODPT0154#004" },
      { color: "Black", size: "L", sku: "250325PODPT0154#003" },
      { color: "Black", size: "2XL", sku: "250325PODPT0154#005" },
    ],
  },
  "ess-tee-ambition": {
    productId: "bbb69768-162c-484a-b25c-918407ecc541",
    title: "AMBITION TEE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Dark Gray", size: "M", sku: "260521PODPQ3313#008" },
      { color: "Dark Gray", size: "L", sku: "260521PODPQ3313#009" },
      { color: "Black", size: "XL", sku: "260521PODPQ3313#004" },
      { color: "Dark Gray", size: "XL", sku: "260521PODPQ3313#010" },
      { color: "Dark Gray", size: "3XL", sku: "260521PODPQ3313#012" },
      { color: "Navy Blue", size: "XL", sku: "260521PODPQ3313#016" },
      { color: "Black", size: "3XL", sku: "260521PODPQ3313#006" },
      { color: "Navy Blue", size: "2XL", sku: "260521PODPQ3313#017" },
      { color: "Navy Blue", size: "3XL", sku: "260521PODPQ3313#018" },
      { color: "Black", size: "M", sku: "260521PODPQ3313#002" },
      { color: "Black", size: "S", sku: "260521PODPQ3313#001" },
      { color: "Navy Blue", size: "M", sku: "260521PODPQ3313#014" },
      { color: "Navy Blue", size: "L", sku: "260521PODPQ3313#015" },
      { color: "Black", size: "2XL", sku: "260521PODPQ3313#005" },
      { color: "Black", size: "L", sku: "260521PODPQ3313#003" },
      { color: "Dark Gray", size: "S", sku: "260521PODPQ3313#007" },
      { color: "Dark Gray", size: "2XL", sku: "260521PODPQ3313#011" },
      { color: "Navy Blue", size: "S", sku: "260521PODPQ3313#013" },
    ],
  },
  "ess-tee-artwar195cash": {
    productId: "3a96a7a2-7cd3-4465-896b-092944ff61f1",
    title: "ART WAR $1.95 CASH TEE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "M", sku: "241107PODPQ0395#002" },
      { color: "Black", size: "XL", sku: "241107PODPQ0395#004" },
      { color: "Black", size: "L", sku: "241107PODPQ0395#003" },
      { color: "Black", size: "2XL", sku: "241107PODPQ0395#005" },
      { color: "Black", size: "S", sku: "241107PODPQ0395#001" },
    ],
  },
  "ess-tee-energy": {
    productId: "41389b69-30ef-4dea-86d4-1463f00cf7f1",
    title: "PROTECT YOUR ENERGY TEE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "White", size: "M", sku: "260521PODPQ4262#002" },
      { color: "White", size: "L", sku: "260521PODPQ4262#003" },
      { color: "White", size: "2XL", sku: "260521PODPQ4262#005" },
      { color: "White", size: "3XL", sku: "260521PODPQ4262#006" },
      { color: "White", size: "S", sku: "260521PODPQ4262#001" },
      { color: "White", size: "XL", sku: "260521PODPQ4262#004" },
    ],
  },
  "ess-tee-execute": {
    productId: "c1e21954-51b1-42e9-9b0e-152cf8223bcd",
    title: "EXECUTE TEE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "White", size: "XL", sku: "260521PODPQ4216#004" },
      { color: "White", size: "3XL", sku: "260521PODPQ4216#006" },
      { color: "White", size: "M", sku: "260521PODPQ4216#002" },
      { color: "White", size: "L", sku: "260521PODPQ4216#003" },
      { color: "White", size: "S", sku: "260521PODPQ4216#001" },
      { color: "White", size: "2XL", sku: "260521PODPQ4216#005" },
    ],
  },
  "ess-tee-hustlerangle": {
    productId: "3611452a-e107-4206-9f71-679ae12ba6c6",
    title: "HUSTLER ANGLE TEE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Light Gray", size: "M", sku: "241204PODPQ0013#007" },
      { color: "Black", size: "XL", sku: "241204PODPQ0013#004" },
      { color: "Light Gray", size: "2XL", sku: "241204PODPQ0013#010" },
      { color: "Black", size: "S", sku: "241204PODPQ0013#001" },
      { color: "Black", size: "2XL", sku: "241204PODPQ0013#005" },
      { color: "Black", size: "L", sku: "241204PODPQ0013#003" },
      { color: "Light Gray", size: "L", sku: "241204PODPQ0013#008" },
      { color: "Light Gray", size: "S", sku: "241204PODPQ0013#006" },
      { color: "Light Gray", size: "XL", sku: "241204PODPQ0013#009" },
      { color: "Black", size: "M", sku: "241204PODPQ0013#002" },
    ],
  },
  "ess-tee-money": {
    productId: "27986fdf-1e66-47d0-ba92-19e04c0411f1",
    title: "MONEY MOVES TEE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "L", sku: "241116PODPQ0596#013" },
      { color: "Light Gray", size: "2XL", sku: "241116PODPQ0596#005" },
      { color: "Black", size: "XL", sku: "241116PODPQ0596#014" },
      { color: "Black", size: "M", sku: "241116PODPQ0596#012" },
      { color: "Black", size: "S", sku: "241116PODPQ0596#011" },
      { color: "Light Gray", size: "XL", sku: "241116PODPQ0596#004" },
      { color: "Light Gray", size: "L", sku: "241116PODPQ0596#003" },
      { color: "Black", size: "2XL", sku: "241116PODPQ0596#015" },
      { color: "Light Gray", size: "M", sku: "241116PODPQ0596#002" },
      { color: "Light Gray", size: "S", sku: "241116PODPQ0596#001" },
    ],
  },
  "ess-tee-moneyangle": {
    productId: "906b53fa-07c2-487a-8337-6bcb6950aa7e",
    title: "MONEY ANGLE TEE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "L", sku: "241108PODPQ0294#003" },
      { color: "Black", size: "2XL", sku: "241108PODPQ0294#005" },
      { color: "Black", size: "XL", sku: "241108PODPQ0294#004" },
      { color: "Black", size: "S", sku: "241108PODPQ0294#001" },
      { color: "Black", size: "M", sku: "241108PODPQ0294#002" },
    ],
  },
  "ess-tee-nolimits": {
    productId: "87ae977d-684b-4e10-b018-42c4a3c95c43",
    title: "CASH CULTURE NO LIMITS",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "2XL", sku: "260521PODPQ2973#005" },
      { color: "Black", size: "3XL", sku: "260521PODPQ2973#006" },
      { color: "Black", size: "M", sku: "260521PODPQ2973#002" },
      { color: "Black", size: "XL", sku: "260521PODPQ2973#004" },
      { color: "Black", size: "S", sku: "260521PODPQ2973#001" },
      { color: "Black", size: "L", sku: "260521PODPQ2973#003" },
    ],
  },
  "ess-tee-powerofmoney": {
    productId: "5d7364b0-7dd0-41e4-9e28-5e08dac87fed",
    title: "POWER OF MONEY TEE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "M", sku: "241204PODPQ0104#002" },
      { color: "Black", size: "L", sku: "241204PODPQ0104#003" },
      { color: "Black", size: "S", sku: "241204PODPQ0104#001" },
      { color: "Black", size: "2XL", sku: "241204PODPQ0104#005" },
      { color: "Black", size: "XL", sku: "241204PODPQ0104#004" },
    ],
  },
  "ess-tee-romance": {
    productId: "54709596-681a-4b02-bb33-b326edf8f263",
    title: "ROMANCE SHORT SLEEVES",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "L", sku: "241112PODPQ1172#003" },
      { color: "Black", size: "S", sku: "241112PODPQ1172#001" },
      { color: "Black", size: "2XL", sku: "241112PODPQ1172#005" },
      { color: "Black", size: "M", sku: "241112PODPQ1172#002" },
      { color: "Black", size: "XL", sku: "241112PODPQ1172#004" },
    ],
  },
  "ess-tee-shortsleeve": {
    productId: "abfbc788-8cb2-4d0d-b9be-88b5ca8bf1de",
    title: "CASH CULTURE SHORT SLEEVE TEE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "White", size: "S", sku: "250706PODPQ1015#002" },
      { color: "Flower Gray", size: "XS", sku: "250706PODPQ1015#007" },
      { color: "Flower Gray", size: "S", sku: "250706PODPQ1015#008" },
      { color: "Flower Gray", size: "M", sku: "250706PODPQ1015#009" },
      { color: "Flower Gray", size: "2XL", sku: "250706PODPQ1015#012" },
      { color: "White", size: "2XL", sku: "250706PODPQ1015#006" },
      { color: "White", size: "L", sku: "250706PODPQ1015#004" },
      { color: "White", size: "XS", sku: "250706PODPQ1015#001" },
      { color: "White", size: "M", sku: "250706PODPQ1015#003" },
      { color: "Flower Gray", size: "XL", sku: "250706PODPQ1015#011" },
      { color: "Flower Gray", size: "L", sku: "250706PODPQ1015#010" },
      { color: "White", size: "XL", sku: "250706PODPQ1015#005" },
    ],
  },
  "ess-tee-soccerjersey": {
    productId: "ea8ea951-9af2-4d7b-a4ea-317afd7d964a",
    title: "CASH CULTURE SOCCER JERESY",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "XL", sku: "260521PODPQ3182#003" },
      { color: "Dark Green with Black", size: "2XL", sku: "260521PODPQ3182#012" },
      { color: "Dark Green with Black", size: "L", sku: "260521PODPQ3182#010" },
      { color: "Black", size: "L", sku: "260521PODPQ3182#002" },
      { color: "Navy Blue with Gray Blue", size: "L", sku: "260521PODPQ3182#014" },
      { color: "Black", size: "2XL", sku: "260521PODPQ3182#004" },
      { color: "Dark Green with Black", size: "M", sku: "260521PODPQ3182#009" },
      { color: "Navy Blue with Gray Blue", size: "XL", sku: "260521PODPQ3182#015" },
      { color: "Navy Blue with Gray Blue", size: "2XL", sku: "260521PODPQ3182#016" },
      { color: "Navy Blue with Gray Blue", size: "M", sku: "260521PODPQ3182#013" },
      { color: "Dark Green with Black", size: "XL", sku: "260521PODPQ3182#011" },
      { color: "Black", size: "M", sku: "260521PODPQ3182#001" },
    ],
  },
  "ess-tee-sza": {
    productId: "8b18f7a4-4d38-4dc7-9847-2e1345ffc54e",
    title: "SZA TEA",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "S", sku: "241106PODPQ1110#001" },
      { color: "Black", size: "M", sku: "241106PODPQ1110#002" },
      { color: "Black", size: "2XL", sku: "241106PODPQ1110#005" },
      { color: "Black", size: "L", sku: "241106PODPQ1110#003" },
      { color: "Black", size: "XL", sku: "241106PODPQ1110#004" },
    ],
  },
  "ess-tee-teddy": {
    productId: "8b7334a1-25ed-419d-a818-8b593754c6a9",
    title: "CASH CULTURE TEDDY",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "L", sku: "260214PODAA2920#003" },
      { color: "Black", size: "S", sku: "260214PODAA2920#001" },
      { color: "Black", size: "M", sku: "260214PODAA2920#002" },
    ],
  },
  "ess-tee-true": {
    productId: "b577a773-4498-4c9c-a938-bfd0a3f44e9f",
    title: "TRUE SHORT SLEEVE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Black", size: "XL", sku: "241112PODPQ1181#004" },
      { color: "Black", size: "S", sku: "241112PODPQ1181#001" },
      { color: "Black", size: "2XL", sku: "241112PODPQ1181#005" },
      { color: "Black", size: "M", sku: "241112PODPQ1181#002" },
      { color: "Black", size: "L", sku: "241112PODPQ1181#003" },
    ],
  },
  "ess-tee-worldwide": {
    productId: "e2c755ea-7edf-4bbd-ab13-6b3787896283",
    title: "ORANGE WORLDWIDE TEE",
    sizeOptionName: "Size",
    colorOptionName: "Color",
    variants: [
      { color: "Navy Blue", size: "3XL", sku: "260521PODPQ1095#012" },
      { color: "Coffee", size: "2XL", sku: "260521PODPQ1095#017" },
      { color: "Navy Blue", size: "L", sku: "260521PODPQ1095#009" },
      { color: "Navy Blue", size: "M", sku: "260521PODPQ1095#008" },
      { color: "Coffee", size: "L", sku: "260521PODPQ1095#015" },
      { color: "Black", size: "XL", sku: "260521PODPQ1095#004" },
      { color: "White Gray", size: "M", sku: "260521PODPQ1095#020" },
      { color: "White Gray", size: "3XL", sku: "260521PODPQ1095#024" },
      { color: "Black", size: "M", sku: "260521PODPQ1095#002" },
      { color: "White Gray", size: "2XL", sku: "260521PODPQ1095#023" },
      { color: "White Gray", size: "S", sku: "260521PODPQ1095#019" },
      { color: "Coffee", size: "XL", sku: "260521PODPQ1095#016" },
      { color: "Navy Blue", size: "XL", sku: "260521PODPQ1095#010" },
      { color: "Black", size: "2XL", sku: "260521PODPQ1095#005" },
      { color: "Coffee", size: "S", sku: "260521PODPQ1095#013" },
      { color: "Black", size: "3XL", sku: "260521PODPQ1095#006" },
      { color: "White Gray", size: "XL", sku: "260521PODPQ1095#022" },
      { color: "Navy Blue", size: "S", sku: "260521PODPQ1095#007" },
      { color: "White Gray", size: "L", sku: "260521PODPQ1095#021" },
      { color: "Coffee", size: "3XL", sku: "260521PODPQ1095#018" },
      { color: "Black", size: "L", sku: "260521PODPQ1095#003" },
      { color: "Black", size: "S", sku: "260521PODPQ1095#001" },
      { color: "Coffee", size: "M", sku: "260521PODPQ1095#014" },
      { color: "Navy Blue", size: "2XL", sku: "260521PODPQ1095#011" },
    ],
  },
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Resolve the Wix catalog target for a storefront product + chosen size/color.
 * Size is matched exactly (normalized); color fuzzily (either string contains the
 * other), mirroring resolveTapstitchVariant. Returns the EXACT Wix option-choice
 * strings so catalogReference.options points at the right Wix variant.
 */
export function resolveWixCatalogRef(
  productId: string,
  opts: { size?: string; color?: string } = {},
): WixCatalogRef | undefined {
  const product = WIX_BY_PRODUCT[productId];
  if (!product) return undefined;

  let vs = product.variants;
  if (vs.length === 0) return { productId: product.productId };

  if (opts.size) {
    const ns = norm(opts.size);
    const bySize = vs.filter((v) => v.size && norm(v.size) === ns);
    if (bySize.length) vs = bySize;
  }
  if (opts.color && vs.length > 1) {
    const nc = norm(opts.color);
    const byColor = vs.filter(
      (v) => v.color && (norm(v.color).includes(nc) || nc.includes(norm(v.color))),
    );
    if (byColor.length) vs = byColor;
  }

  const variant = vs[0];
  if (!variant) return undefined;

  const options: Record<string, string> = {};
  if (product.sizeOptionName && variant.size) options[product.sizeOptionName] = variant.size;
  if (product.colorOptionName && variant.color) options[product.colorOptionName] = variant.color;

  return {
    productId: product.productId,
    options: Object.keys(options).length ? options : undefined,
    size: variant.size,
    color: variant.color,
    sku: variant.sku,
  };
}
