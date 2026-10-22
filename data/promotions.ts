// Member-exclusive promotions shown on /account ("Exclusive Access").
// Curated by hand for now — edit this list to add/retire offers. Codes are
// revealed only to signed-in customers; signed-out visitors see them locked.

export type Promotion = {
  /** Short headline, e.g. "15% Off Your Next Order". */
  title: string;
  /** One-line description of the offer / terms. */
  description: string;
  /** The code customers enter at checkout. */
  code: string;
  /** Optional flourish for the marquee offer. */
  highlight?: boolean;
};

export const PROMOTIONS: Promotion[] = [
  {
    title: "15% Off Your Next Order",
    description: "Members-only follow-up to your welcome offer. Valid on any item.",
    code: "MEMBER15",
    highlight: true,
  },
  {
    title: "Free Shipping Over $75",
    description: "Skip the shipping on every qualifying order, all year.",
    code: "SHIPCULTURE",
  },
  {
    title: "Early Access to New Drops",
    description: "Shop limited releases 24 hours before they go public.",
    code: "FIRSTLOOK",
  },
];
