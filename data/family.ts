// The Cash Culture Family: the people who represent the culture (internally,
// the ambassador program). Shared by the home page preview and the full
// /family roster. name + image are the minimum; everything else is optional
// and only renders when present.
export type FamilyMember = {
  name: string;
  image: string;
  /** Role / profession, e.g. "Stylist & Fashion Designer". */
  niche?: string;
  /** What they're building, in their words. Leads the card when present. */
  building?: string;
  /** The Cash Culture Code value that represents them most (a title from CODE). */
  value?: string;
  location?: string;
  quote?: string;
  instagram?: string;
  tiktok?: string;
  code?: string;
};

export const FAMILY: FamilyMember[] = [
  {
    name: "Wesely Nchinda",
    instagram: "https://www.instagram.com/lil.weezzyy",
    tiktok: "https://www.tiktok.com/@_wes_wes2_",
    image: "/images/ambassador-wesley.webp",
    niche: "Football Coach, Free Agent & CEO of Loop Dynasty",
    location: "Laurel, MD",
    quote: "I rep CC because hustle is in my veins, I know nothing else. I always worked for what I wanted, never given any handouts — everything I earned. CC motivates me by just being better each day and being able to take care of those close to me.",
    code: "WEEZY15",
  },
  {
    name: "Daniel Santiago Aboagye",
    image: "/images/ambassador-daniel.webp",
    instagram: "https://www.instagram.com/wtf.czl",
    niche: "Sales Corporate Trainer",
    location: "Baltimore, MD",
    quote: "I rep Cash Culture not only because I love supporting Black-owned businesses, but because I love supporting businesses that are pushing the needle and boundaries continuously.",
    code: "ALLDAY",
  },
  {
    name: "Nick Curry",
    image: "/images/ambassador-nick.webp",
    instagram: "https://www.instagram.com/iam_nickcurry",
    niche: "Artist, Producer & Record Executive",
    location: "Baltimore, MD",
    quote: "I rep CC because I love to hustle. Before I ever made my first dollar, I was doing this because I genuinely had a love for it. I was always placed in a box by people's expectations and limitations — what they believe is possible for someone else — so my hustle also comes from a place of proving to myself that I'm exactly who I think I am. That's why I rep CC.",
    code: "IAMYOU1937",
  },
  {
    name: "Kyrin “Kozzy” Redd",
    image: "/images/ambassador-kozzy.webp",
    instagram: "https://www.instagram.com/ohhdattskyy",
    niche: "Stylist & Fashion Designer",
    location: "Baltimore, MD",
    quote: "I support Cash Culture because I connect with what the brand represents beyond just the clothing. I like the idea of wearing something that reflects ambition, creativity, success, and the mindset of building your own legacy. Cash Culture blends luxury with culture in a way that feels authentic to people who are creating their own path, and that's something I genuinely identify with. I'd be proud to represent a brand that encourages people to think bigger, move with purpose, and make their own mark.",
    code: "KOZZY",
  },
  {
    name: "Myon Davis",
    image: "/images/ambassador-myon.webp",
    instagram: "https://www.instagram.com/410.myon",
    tiktok: "https://www.tiktok.com/@moemoney.410",
    niche: "CEO of AFS & Party Promoter",
    location: "Baltimore, MD",
    quote: "I rep Cash Culture because it represents the grind, the ambition, and the mindset I stand on. It's more than just a name to me — it's about chasing the bag, staying focused, and building something for yourself.",
    code: "410MYON",
  },
];
