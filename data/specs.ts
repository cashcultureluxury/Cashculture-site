// Product specification sheets, keyed by garment type. Rendered on each
// Essentials product order page. specForProduct() maps a catalog item to the
// right sheet (by category, with a couple of id-based overrides).
import type { EssentialsItem } from "./essentials";

export type SpecBlock = {
  gender: string;
  model?: string;
  fabric: string;
  weight: string;
  thickness: string;
  stretch?: string;
  care: string; // "; "-separated steps
  features: string; // comma-separated tags
  printSize?: string;
  notes?: string;
};

const CARE = "Machine wash at 30°C (gentle cycle); Do not bleach; Tumble dry low; Iron at low temperature, avoid ironing on print; Do not dry clean";

export const SPECS: Record<string, SpecBlock> = {
  tee: {
    gender: "Unisex",
    fabric: "100% cotton",
    weight: "7.7 oz/yd² (260 g/m²)",
    thickness: "Moderate",
    care: CARE,
    features:
      "Basics, Casual, Preppy, Sporty, Daily Casual, Holiday, Outdoor, Running, School, Sport, Office, Pure Cotton, Short Sleeve, Regular Sleeve, Round Neck / O-Neck, Regular, Loose, Spring, Summer, Autumn",
    printSize: "40*52cm",
    notes:
      "Minor batch differences can occur during blank garment production due to variations in fabric, dye and processing. This is common in apparel manufacturing, and we work hard to keep every item consistent.",
  },
  jersey: {
    gender: "Unisex",
    fabric: "100% polyester",
    weight: "6.2 oz/yd² (210 g/m²)",
    thickness: "Thin",
    care: CARE,
    features:
      "Basics, Casual, Sporty, Preppy, Daily Casual, Outdoor, Sport, Running, School, Polyester, Patchwork, Short Sleeve, Raglan Sleeve, V-Neck, Mid Long, Oversized, Summer",
    notes:
      "Minor batch differences can occur during blank garment production due to variations in fabric, dye and processing. This is common in apparel manufacturing, and we work hard to keep every item consistent.",
  },
  hoodie: {
    gender: "Unisex",
    fabric: "42% cotton, 53% polyester, 5% other fibers",
    weight: "10.6 oz/yd² (360 g/m²)",
    thickness: "Thicken",
    stretch: "Slight Stretch",
    care: CARE,
    features:
      "Casual, Street, Daily Casual, Pure Cotton, Washed, Frayed, Long Sleeve, Hooded, Regular, Loose, Autumn, Winter",
    notes:
      "Each piece is handcrafted, ensuring its uniqueness. Minor variations from website images are natural and highlight its artisanal quality.",
  },
  shorts: {
    gender: "Women",
    model: "Loose",
    fabric: "100% Cotton",
    weight: "8.8 oz/yd² (300 g/m²)",
    thickness: "Moderate",
    care: CARE,
    features:
      "Basics, Casual, Sexy, Street, Vintage, Daily Casual, Office, School, Outdoor, Pure Cotton, Washed, Frayed, Crop, Loose, High Waist, Spring, Summer, Autumn",
    printSize: "40*52cm",
    notes:
      "Minor batch differences can occur during blank garment production due to variations in fabric, dye and processing. This is common in apparel manufacturing, and we work hard to keep every item consistent.",
  },
  sweatpants: {
    gender: "Unisex",
    model: "Loose",
    fabric: "42% cotton, 53% polyester, 5% other fibers",
    weight: "10.5 oz/yd² (355 g/m²)",
    thickness: "Moderate",
    care: CARE,
    features:
      "Casual, Basics, Street, Vintage, Outdoor, Daily Casual, School, Cotton Blend, Drawstring, Washed, Long, Loose, Mid Waist, Spring, Autumn, Winter, Summer",
  },
};

/** Resolve the right spec sheet for a catalog item, or null if none applies. */
export function specForProduct(item: EssentialsItem): SpecBlock | null {
  switch (item.category) {
    case "Hoodies":
      return SPECS.hoodie;
    case "Bottoms":
      return SPECS.sweatpants;
    case "Shorts":
      // The provided shorts sheet describes the Luxury (short) shorts.
      return item.id.includes("lux") ? SPECS.shorts : null;
    case "Tees":
      return item.id.includes("soccerjersey") ? SPECS.jersey : SPECS.tee;
    default:
      return null; // Long Sleeves / Tanks: no sheet provided yet
  }
}
