// Master Essentials catalog. Single source of truth for the /essentials page
// (display) and checkout (via lib/products, which merges these in).
//
// Names and prices match the Shopify store, so what shoppers pick here is
// what they see at checkout. Most items use a local product shot; newer ones
// load their photos from Shopify's image CDN. Excludes the SZA Sweat Suit,
// Tapestry Hoodie, and beanies (sold under Luxury).

export type EssentialsCategory =
  | "Hoodies"
  | "Tees"
  | "Long Sleeves"
  | "Shorts"
  | "Bottoms"
  | "Tanks";

export type EssentialsItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: EssentialsCategory;
  badge?: string;
  sizes?: string[]; // omit for default S-XL; [] for one-size
  // Colorways. When present, the card shows swatches that swap the displayed
  // image; the selected color name flows through to the cart line.
  colors?: { name: string; hex: string; image: string }[];
  // Extra product views (e.g. back graphic) shown as gallery thumbnails on the
  // order page, in addition to the main image and any color images.
  gallery?: string[];
  // Short fabric line shown on the product page, from the Shopify blank
  // (e.g. "360 GSM vintage-wash fleece").
  fabric?: string;
  // Tapstitch fulfillment lives in data/tapstitch.ts, keyed by this item's id.
};

export const ESSENTIALS: EssentialsItem[] = [
  // ---- Hoodies ----
  { id: "ess-hoodie-teddy", name: "Money Bear Hoodie", price: 65, image: "/images/ess-teddyhoodie-front.webp", category: "Hoodies", fabric: "360 GSM monkey-wash heavyweight cotton, drop shoulder" },
  { id: "ess-hoodie-feelgood", name: "Feel Good Hoodie", price: 65, image: "/images/ess-feelgood-front.webp", category: "Hoodies", fabric: "360 GSM vintage-wash frayed fleece" },
  { id: "ess-hoodie-silentlove", name: "Silent Bear Hoodie", price: 65, image: "/images/ess-silentlovehoodie-front.webp", category: "Hoodies", fabric: "360 GSM vintage-wash frayed fleece" },
  { id: "ess-hoodie-pinkstars", name: "Stay Focused Hoodie", price: 65, image: "/images/ess-pinkstars-front.webp", category: "Hoodies", fabric: "Vintage-wash frayed fleece", badge: "Best Seller", colors: [
    { name: "Black", hex: "#2b2b2b", image: "/images/ess-pinkstars-front.webp" },
    { name: "Washed Blue", hex: "#4a546f", image: "/images/ess-pinkstars-blue-front.webp" },
  ] },
  { id: "ess-hoodie-rednolimit", name: "No Limits Hoodie", price: 65, image: "/images/ess-rednolimit-front.webp", category: "Hoodies", fabric: "Vintage-wash frayed fleece", colors: [
    { name: "Black", hex: "#2b2b2b", image: "/images/ess-rednolimit-front.webp" },
    { name: "Washed Grey", hex: "#9b968b", image: "/images/ess-rednolimit-grey-front.webp" },
    { name: "Washed Green", hex: "#5f6a55", image: "/images/ess-rednolimit-green-front.webp" },
  ] },
  { id: "ess-hoodie-bluelane", name: "Your Own Lane Hoodie", price: 65, image: "/images/ess-bluelane-front.webp", category: "Hoodies" },
  { id: "ess-hoodie-butterfly", name: "SZA Hoodie", price: 65, image: "/images/ess-butterfly-front.webp", category: "Hoodies", fabric: "360 GSM vintage-wash frayed fleece", badge: "New", gallery: ["/images/ess-butterfly-back.webp"] },
  { id: "ess-hoodie-artwar195", name: "$1.95 Cash Hoodie", price: 65, image: "/images/ess-artwar195hoodie-front.webp", category: "Hoodies", fabric: "Monkey-wash heavyweight cotton, drop shoulder", gallery: ["/images/ess-artwar195hoodie-alt.webp"] },
  { id: "ess-hoodie-madness", name: "Madness Hoodie", price: 65, image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/ebb1775abe8a4fdb9cacbf81707a3d4c.png", category: "Hoodies", badge: "New", sizes: ["S", "M", "L", "XL", "2XL"], gallery: ["https://cdn.shopify.com/s/files/1/0753/5103/1877/files/22421b9437c34a0bbabe81b4d6547277.png"] },

  // ---- Tees ----
  { id: "ess-tee-energy", name: "LDR Cash Tee", price: 45, image: "/images/ess-energy-front.webp", category: "Tees", badge: "Best Seller", sizes: ["S", "M", "L", "XL", "2XL", "3XL"] },
  { id: "ess-tee-ambition", name: "Ambition Tee", price: 45, image: "/images/ess-ambition-front.webp", category: "Tees", sizes: ["S", "M", "L", "XL", "2XL", "3XL"] },
  { id: "ess-tee-true", name: "Truce Tee", price: 45, image: "/images/ess-true-front.webp", category: "Tees", fabric: "Oversized snow-wash cotton" },
  { id: "ess-tee-romance", name: "Romance Tee", price: 45, image: "/images/ess-romance-front.webp", category: "Tees", fabric: "Oversized snow-wash cotton" },
  { id: "ess-tee-moneyangle", name: "Money Angle Tee", price: 45, image: "/images/ess-moneyangle-front.webp", category: "Tees", fabric: "300 GSM boxy cut, one-piece pattern" },
  { id: "ess-tee-artwar195cash", name: "$1.95 Cash Tee", price: 45, image: "/images/ess-artwar195cash-front.webp", category: "Tees", fabric: "250 GSM acid-wash, oversized" },
  { id: "ess-tee-artwar195", name: "Art War Tee", price: 45, image: "/images/ess-artwar195-front.webp", category: "Tees", fabric: "250 GSM acid-wash, oversized", colors: [
    { name: "Black Acid Wash", hex: "#3a3a3a", image: "/images/ess-artwar195-front.webp" },
    { name: "Grey Acid Wash", hex: "#b7b4ad", image: "/images/ess-artwar195-grey-front.webp" },
  ] },
  { id: "ess-tee-powerofmoney", name: "Power Angle Tee", price: 45, image: "/images/ess-powerofmoney-front.webp", category: "Tees", fabric: "250 GSM acid-wash, oversized" },
  { id: "ess-tee-hustlerangle", name: "Hustler Angle Tee", price: 45, image: "/images/ess-hustlerangle-front.webp", category: "Tees", fabric: "250 GSM acid-wash, oversized" },
  { id: "ess-tee-nolimits", name: "No Limits Tee", price: 45, image: "/images/ess-nolimits-front.webp", category: "Tees", sizes: ["S", "M", "L", "XL", "2XL", "3XL"] },
  { id: "ess-tee-teddy", name: "Cash Culture Bear Tee", price: 40, image: "/images/ess-teddytee-front.webp", category: "Tees", sizes: ["S", "M", "L"] },
  { id: "ess-tee-shortsleeve", name: "Cash Culture Tee", price: 45, image: "/images/ess-shortsleeve-front.webp", category: "Tees", sizes: ["XS", "S", "M", "L", "XL", "2XL"] },
  { id: "ess-tee-soccerjersey", name: "Cash Soccer Jersey", price: 40, image: "/images/ess-soccerjersey-front.webp", category: "Tees", sizes: ["M", "L", "XL", "2XL"], colors: [
    { name: "Green", hex: "#2f5d3a", image: "/images/ess-soccerjersey-front.webp" },
    { name: "Black", hex: "#222222", image: "/images/ess-soccerjersey-black-front.webp" },
  ] },
  { id: "ess-tee-sza", name: "SZA Big Boy Tee", price: 45, image: "/images/ess-szatee-front.webp", category: "Tees", fabric: "250 GSM monkey-wash, drop shoulder", badge: "New" },
  { id: "ess-tee-worldwide", name: "Black Worldwide Tee", price: 45, image: "/images/ess-worldwide-front.webp", category: "Tees", badge: "New", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], colors: [
    { name: "Black", hex: "#2b2b2b", image: "/images/ess-worldwide-front.webp" },
    { name: "Brown", hex: "#5a4434", image: "/images/ess-worldwide-brown-front.webp" },
  ], gallery: ["/images/ess-worldwide-back.webp", "/images/ess-worldwide-brown-back.webp"] },

  { id: "ess-tee-worldwidewhite", name: "White Worldwide Tee", price: 45, image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/6e984943e3d84082b9cc38e607bcf8ae.png", category: "Tees", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], gallery: ["https://cdn.shopify.com/s/files/1/0753/5103/1877/files/ab8b2096de9143c485d431b15fc0faa9.png"] },
  { id: "ess-tee-execute", name: "Execute Tee", price: 45, image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/3698ab16ff854dee8649760c7c70e735_92e4b1eb-a1f5-47a8-ba17-85c379ff2709.png", category: "Tees", badge: "New", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], gallery: ["https://cdn.shopify.com/s/files/1/0753/5103/1877/files/84c0d98b95bc4affa973100469d59f0d_0e3f6c63-d7d7-498e-a257-04d101a0736e.png"] },
  { id: "ess-tee-dcmo", name: "DCMO Tee", price: 45, image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/0c415f4cb65244599315f29a8dac6a37.png", category: "Tees", badge: "New", sizes: ["S", "M", "L", "XL", "2XL"], gallery: ["https://cdn.shopify.com/s/files/1/0753/5103/1877/files/fb7e48a9509c48ec8c726e9f0f32fb83.png"] },
  { id: "ess-tee-cashtoon", name: "Cash Toon Tee", price: 45, image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/9a3e254b754b4ffda7b1de1a0a6d3433.png", category: "Tees", badge: "New", sizes: ["XS", "S", "M", "L", "XL", "2XL"], colors: [
    { name: "White", hex: "#f2f0eb", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/9a3e254b754b4ffda7b1de1a0a6d3433.png" },
    { name: "Sky Blue", hex: "#8fb8d8", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/6603c87d7682454fb26a6dafe2670259.png" },
    { name: "Flower Gray", hex: "#8e8c88", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/5ab49896b91847a493574ec9fefaa808.png" },
    { name: "Light Gray", hex: "#c9c8c4", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/195c1a65c58243c9a759ceb01dd46059.png" },
  ] },
  { id: "ess-tee-cashrebel", name: "Cash Rebel Tee", price: 45, image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/af2df7614fb840beb059da029d94db48.png", category: "Tees", badge: "New", sizes: ["XS", "S", "M", "L", "XL", "2XL"], colors: [
    { name: "Red", hex: "#a8322d", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/af2df7614fb840beb059da029d94db48.png" },
    { name: "White", hex: "#f2f0eb", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/f792f89a242f4738af1ab831b2fdaecc.png" },
    { name: "Flower Gray", hex: "#8e8c88", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/7c6e09502b794baa90b1e0796a250596.png" },
    { name: "Light Gray", hex: "#c9c8c4", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/a0e2a8631b1d41e7b503849bd41fc4cb.png" },
  ] },

  // ---- Long Sleeves & Crewnecks ----
  { id: "ess-ls-hope", name: "Hope Long Sleeve", price: 45, image: "/images/ess-hope-front.webp", category: "Long Sleeves", gallery: ["/images/ess-hope-back.webp"] },
  { id: "ess-ls-hopesweatshirt", name: "Hope Sweatshirt", price: 55, image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/3bba49c1effb4f609e968154804896b8_d44c09fb-0095-4054-b005-18a3c6af4554.png", category: "Long Sleeves", sizes: ["S", "M", "L", "XL", "2XL"], gallery: ["https://cdn.shopify.com/s/files/1/0753/5103/1877/files/105e3ebf793f489baaef53800edbefdc_5b4ed28d-e73e-4f37-bc91-e48f09da88b6.png"] },
  { id: "ess-ls-desire", name: "Desire Long Sleeve", price: 50, image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/30c4088927d14b17b12c787353efe00c.png", category: "Long Sleeves", badge: "New", fabric: "300 GSM classic heavyweight", sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"], colors: [
    { name: "Classic Black", hex: "#1f1f1f", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/30c4088927d14b17b12c787353efe00c.png" },
    { name: "Red", hex: "#a8322d", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/7b08097decb54220875b54b19f07cd22.png" },
    { name: "Ink Blue", hex: "#2c3a55", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/5be1a61ad1e24edea49f3c99c90e0c87.png" },
    { name: "Klein Blue", hex: "#1f3fa8", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/62b44ba62e454a93ae059668de74c5d5.png" },
    { name: "Dark Grey", hex: "#4d4d4d", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/5c35497e6967465e95a43b8d2ac4c2d9.png" },
    { name: "Apricot", hex: "#e3b48f", image: "https://cdn.shopify.com/s/files/1/0753/5103/1877/files/447b3dd54b544bd9a9c35c15d5d511be.png" },
  ] },

  // ---- Shorts ----
  { id: "ess-shorts-samuraiblack", name: "Black Samurai Shorts", price: 45, image: "/images/ess-samuraiblackshorts-front.webp", category: "Shorts", fabric: "Heavyweight 100% cotton, loose fit", sizes: ["XS", "S", "M", "L", "XL", "2XL"] },
  { id: "ess-shorts-samuraiwhite", name: "White Samurai Shorts", price: 45, image: "/images/ess-samuraiwhiteshorts-front.webp", category: "Shorts", fabric: "Heavyweight 100% cotton, loose fit", sizes: ["XS", "S", "M", "L", "XL", "2XL"] },
  { id: "ess-shorts-luxshort", name: "Cash Short Shorts", price: 45, image: "/images/ess-luxshortshorts-front.webp", category: "Shorts", fabric: "Snow-wash cotton, raw edge", badge: "New", sizes: ["S", "M", "L", "XL"], colors: [
    { name: "Washed Black", hex: "#3a3a3a", image: "/images/ess-luxshortshorts-front.webp" },
    { name: "Washed Grey", hex: "#9a968f", image: "/images/ess-luxshortshorts-grey-front.webp" },
  ] },
  { id: "ess-shorts-luxury", name: "Luxury Shorts", price: 40, image: "/images/ess-luxshorts-front.webp", category: "Shorts", fabric: "Sun-fade cotton, raw edge", badge: "New" },

  // ---- Bottoms ----
  { id: "ess-joggers-silentlove", name: "Silent Bear Joggers", price: 55, image: "/images/ess-silentlovejoggers-front.webp", category: "Bottoms" },
  { id: "ess-bottoms-szapants", name: "SZA Sweatpants", price: 55, image: "/images/ess-szasweatpants-front.webp", category: "Bottoms", fabric: "Monkey-wash pure cotton, loose fit", badge: "New" },

  // ---- Tanks ----
  { id: "ess-tank-silentlove", name: "Silent Tank Top", price: 45, image: "/images/ess-silentlovetank-front.webp", category: "Tanks", fabric: "French terry, boxy fit" },
  { id: "ess-tank-samuraihoodie", name: "Samurai No Sleeves", price: 40, image: "/images/ess-samuraihoodie-front.webp", category: "Tanks" },
];

// Render order for category sections.
export const ESSENTIALS_CATEGORIES: EssentialsCategory[] = [
  "Hoodies",
  "Tees",
  "Long Sleeves",
  "Shorts",
  "Bottoms",
  "Tanks",
];
