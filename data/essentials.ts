// Master Essentials catalog. Single source of truth for the /essentials page
// (display) and checkout (via lib/products, which merges these in).
//
// Every item below has a real product shot (white-background cutout exported
// from Tapstitch). Prices/names transcribed from the cashculturebrand.com
// store. Excludes the SZA Sweat Suit collection, Tapestry Hoodie, and beanies
// (sold under Luxury).

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
  reviews: string;
  badge?: string;
  sizes?: string[]; // omit for default S-XL; [] for one-size
  // Colorways. When present, the card shows swatches that swap the displayed
  // image; the selected color name flows through to the cart line.
  colors?: { name: string; hex: string; image: string }[];
  // Extra product views (e.g. back graphic) shown as gallery thumbnails on the
  // order page, in addition to the main image and any color images.
  gallery?: string[];
  // Tapstitch fulfillment lives in data/tapstitch.ts, keyed by this item's id.
};

export const ESSENTIALS: EssentialsItem[] = [
  // ---- Hoodies ----
  { id: "ess-hoodie-teddy", name: "Teddy Hoodies", price: 65, image: "/images/ess-teddyhoodie-front.webp", category: "Hoodies", reviews: "31" },
  { id: "ess-hoodie-feelgood", name: "Feel Good Hoodie", price: 65, image: "/images/ess-feelgood-front.webp", category: "Hoodies", reviews: "27" },
  { id: "ess-hoodie-silentlove", name: "Silent Love Hoodie", price: 65, image: "/images/ess-silentlovehoodie-front.webp", category: "Hoodies", reviews: "53" },
  { id: "ess-hoodie-pinkstars", name: "Stay Focused Hoodie", price: 65, image: "/images/ess-pinkstars-front.webp", category: "Hoodies", reviews: "48", badge: "Best Seller", colors: [
    { name: "Black", hex: "#2b2b2b", image: "/images/ess-pinkstars-front.webp" },
    { name: "Washed Blue", hex: "#4a546f", image: "/images/ess-pinkstars-blue-front.webp" },
  ] },
  { id: "ess-hoodie-rednolimit", name: "No Limits Hoodie", price: 65, image: "/images/ess-rednolimit-front.webp", category: "Hoodies", reviews: "22", colors: [
    { name: "Black", hex: "#2b2b2b", image: "/images/ess-rednolimit-front.webp" },
    { name: "Washed Grey", hex: "#9b968b", image: "/images/ess-rednolimit-grey-front.webp" },
    { name: "Washed Green", hex: "#5f6a55", image: "/images/ess-rednolimit-green-front.webp" },
  ] },
  { id: "ess-hoodie-bluelane", name: "Your Own Lane Hoodie", price: 65, image: "/images/ess-bluelane-front.webp", category: "Hoodies", reviews: "19" },
  { id: "ess-hoodie-butterfly", name: "Butterfly Hoodie", price: 65, image: "/images/ess-butterfly-front.webp", category: "Hoodies", reviews: "14", badge: "New", gallery: ["/images/ess-butterfly-back.webp"] },
  { id: "ess-hoodie-artwar195", name: "Art War $1.95 Hoodie", price: 65, image: "/images/ess-artwar195hoodie-front.webp", category: "Hoodies", reviews: "16", gallery: ["/images/ess-artwar195hoodie-alt.webp"] },

  // ---- Tees ----
  { id: "ess-tee-energy", name: "Protect Your Energy Tee", price: 45, image: "/images/ess-energy-front.webp", category: "Tees", reviews: "72", badge: "Best Seller", sizes: ["S", "M", "L", "XL", "2XL", "3XL"] },
  { id: "ess-tee-ambition", name: "Ambition Tee", price: 45, image: "/images/ess-ambition-front.webp", category: "Tees", reviews: "55", sizes: ["S", "M", "L", "XL", "2XL", "3XL"] },
  { id: "ess-tee-true", name: "True Short Sleeve", price: 45, image: "/images/ess-true-front.webp", category: "Tees", reviews: "21" },
  { id: "ess-tee-romance", name: "Romance Short Sleeves", price: 45, image: "/images/ess-romance-front.webp", category: "Tees", reviews: "18" },
  { id: "ess-tee-moneyangle", name: "Money Angle Tee", price: 45, image: "/images/ess-moneyangle-front.webp", category: "Tees", reviews: "34" },
  { id: "ess-tee-artwar195cash", name: "$1.95 Cash Tee", price: 45, image: "/images/ess-artwar195cash-front.webp", category: "Tees", reviews: "26" },
  { id: "ess-tee-artwar195", name: "Art War", price: 45, image: "/images/ess-artwar195-front.webp", category: "Tees", reviews: "20", colors: [
    { name: "Black Acid Wash", hex: "#3a3a3a", image: "/images/ess-artwar195-front.webp" },
    { name: "Grey Acid Wash", hex: "#b7b4ad", image: "/images/ess-artwar195-grey-front.webp" },
  ] },
  { id: "ess-tee-powerofmoney", name: "Power Of Money Tee", price: 45, image: "/images/ess-powerofmoney-front.webp", category: "Tees", reviews: "37" },
  { id: "ess-tee-hustlerangle", name: "Hustler Angle Tee", price: 45, image: "/images/ess-hustlerangle-front.webp", category: "Tees", reviews: "33" },
  { id: "ess-tee-nolimits", name: "No Limits Tee", price: 45, image: "/images/ess-nolimits-front.webp", category: "Tees", reviews: "30", sizes: ["S", "M", "L", "XL", "2XL", "3XL"] },
  { id: "ess-tee-teddy", name: "Cash Culture Bear Tee", price: 40, image: "/images/ess-teddytee-front.webp", category: "Tees", reviews: "32", sizes: ["S", "M", "L"] },
  { id: "ess-tee-shortsleeve", name: "Cash Culture Short Sleeve Tee", price: 45, image: "/images/ess-shortsleeve-front.webp", category: "Tees", reviews: "41", sizes: ["XS", "S", "M", "L", "XL", "2XL"] },
  { id: "ess-tee-soccerjersey", name: "Cash Soccer Jersey", price: 40, image: "/images/ess-soccerjersey-front.webp", category: "Tees", reviews: "27", sizes: ["M", "L", "XL", "2XL"], colors: [
    { name: "Green", hex: "#2f5d3a", image: "/images/ess-soccerjersey-front.webp" },
    { name: "Black", hex: "#222222", image: "/images/ess-soccerjersey-black-front.webp" },
  ] },
  { id: "ess-tee-sza", name: "SZA Tee", price: 45, image: "/images/ess-szatee-front.webp", category: "Tees", reviews: "12", badge: "New" },
  { id: "ess-tee-worldwide", name: "Black Worldwide Tee", price: 45, image: "/images/ess-worldwide-front.webp", category: "Tees", reviews: "9", badge: "New", sizes: ["S", "M", "L", "XL", "2XL", "3XL"], colors: [
    { name: "Black", hex: "#2b2b2b", image: "/images/ess-worldwide-front.webp" },
    { name: "Brown", hex: "#5a4434", image: "/images/ess-worldwide-brown-front.webp" },
  ], gallery: ["/images/ess-worldwide-back.webp", "/images/ess-worldwide-brown-back.webp"] },

  // ---- Long Sleeves & Crewnecks ----
  { id: "ess-ls-hope", name: "Hope Long Sleeve", price: 45, image: "/images/ess-hope-front.webp", category: "Long Sleeves", reviews: "38", gallery: ["/images/ess-hope-back.webp"] },

  // ---- Shorts ----
  { id: "ess-shorts-samuraiblack", name: "Black Lost Samurai Shorts", price: 45, image: "/images/ess-samuraiblackshorts-front.webp", category: "Shorts", reviews: "22", sizes: ["XS", "S", "M", "L", "XL", "2XL"] },
  { id: "ess-shorts-samuraiwhite", name: "White Lost Samurai Shorts", price: 45, image: "/images/ess-samuraiwhiteshorts-front.webp", category: "Shorts", reviews: "20", sizes: ["XS", "S", "M", "L", "XL", "2XL"] },
  { id: "ess-shorts-luxshort", name: "Luxury Short Shorts", price: 45, image: "/images/ess-luxshortshorts-front.webp", category: "Shorts", reviews: "8", badge: "New", sizes: ["S", "M", "L", "XL"], colors: [
    { name: "Washed Black", hex: "#3a3a3a", image: "/images/ess-luxshortshorts-front.webp" },
    { name: "Washed Grey", hex: "#9a968f", image: "/images/ess-luxshortshorts-grey-front.webp" },
  ] },
  { id: "ess-shorts-luxury", name: "Luxury Shorts", price: 40, image: "/images/ess-luxshorts-front.webp", category: "Shorts", reviews: "11", badge: "New" },

  // ---- Bottoms ----
  { id: "ess-joggers-silentlove", name: "Silent Love Joggers", price: 55, image: "/images/ess-silentlovejoggers-front.webp", category: "Bottoms", reviews: "36" },
  { id: "ess-bottoms-szapants", name: "SZA Sweat Pants", price: 55, image: "/images/ess-szasweatpants-front.webp", category: "Bottoms", reviews: "7", badge: "New" },

  // ---- Tanks ----
  { id: "ess-tank-silentlove", name: "Silent Love Tank Top", price: 45, image: "/images/ess-silentlovetank-front.webp", category: "Tanks", reviews: "23" },
  { id: "ess-tank-samuraihoodie", name: "Lost Samurai Tank Top Hoodie", price: 40, image: "/images/ess-samuraihoodie-front.webp", category: "Tanks", reviews: "18" },
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
