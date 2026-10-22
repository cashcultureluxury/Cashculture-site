// Brand source of truth: the words Cash Culture stands on. Pages pull from here
// so the Code, the mantra, and the core lines stay identical everywhere and can
// be edited in one place.

export const TAGLINE = "For The Ones Who Build.";

export const CORE_IDEA = "Cash Culture is the culture of people who build.";

// Who the culture is for. Different paths, same mindset; order reads like a roll call.
export const HUSTLER_ROLES = [
  "Entrepreneur",
  "Artist",
  "Athlete",
  "Student",
  "Professional",
  "Creator",
  "Builder",
];

export const MANTRA = [
  "Build yourself.",
  "Build your family.",
  "Build your future.",
  "Build something meaningful.",
  "Build something that can outlive you.",
];

// The Code's framing lines, shared by the home preview and the full Code.
export const CODE_HEADLINE = "Eleven Values. One Standard.";
export const CODE_ASIDE = "The Cash Culture Code isn't just a list. It's a lifestyle. It's how we move, think, and build.";
export const CODE_INTRO =
  "The standard we hold ourselves to, and the people we build with. It shows up in your actions, not on a shirt.";
export const STATUS_LINE = "You don't chase status. You build yourself, your reputation, and your work.";

export type CodeValue = { title: string; line: string; body: string };

// The Cash Culture Code. Eleven values, in order. Status is intentionally not
// one of them: character, discipline, and work create status on their own.
export const CODE: CodeValue[] = [
  { title: "Integrity", line: "Do the right thing even when nobody is watching.", body: "Your name matters. Your reputation matters. Your character matters." },
  { title: "Passion", line: "Put your heart into what you build.", body: "Passion creates energy, creativity, and purpose. Don't build something just because it looks good from the outside. Care about the work." },
  { title: "Appearance", line: "How you present yourself matters.", body: "Clothing, grooming, health, posture, presence. Not to seem better than anyone, but because you respect yourself enough to show up well." },
  { title: "Attitude", line: "You can't control everything. You control your response.", body: "Keep your confidence and your perspective when things get hard." },
  { title: "Team Spirit", line: "You don't have to build alone.", body: "Community, collaboration, mentorship, shared growth. The culture gets stronger when more people build together." },
  { title: "Personal Development", line: "Never stop becoming.", body: "Your mind, your body, your character, your skills, your leadership. Success isn't just what you obtain. It's who you become while obtaining it." },
  { title: "Discipline", line: "Do what needs to be done, even when you don't feel like it.", body: "Motivation comes and goes. Discipline keeps you moving." },
  { title: "Punctuality", line: "Respect people's time. Respect your own.", body: "Being on time is part of professionalism and part of character." },
  { title: "Lead By Example", line: "Don't just talk about the standard. Live it.", body: "People should be able to see the values in your actions." },
  { title: "Deliver Your Word", line: "If you say you'll do it, do it.", body: "Your word should mean something. Reliability is part of reputation." },
  { title: "Work Ethic", line: "Keep working. Keep learning. Keep building.", body: "Refuse to let circumstances decide your future for you." },
];

// The Modern Hustler. Different paths, same drive: it isn't what they do,
// it's how they move.
export const HUSTLER_PATHS = [
  "A student building a business.",
  "A rapper building a company.",
  "A nine-to-five building something after work.",
  "An athlete building a legacy.",
  "A creator building a brand.",
  "A CEO building a company.",
];

export const HUSTLER_TRAITS = ["Clean", "Motivated", "Confident", "Versatile", "Disciplined", "Respectful", "Driven"];

// The clean hustler moves between worlds. Same person, every room.
export const HUSTLER_ROOMS = [
  { room: "The Conference", wear: "Suit and tie." },
  { room: "The Meeting", wear: "Tailored." },
  { room: "The Studio", wear: "Essentials." },
  { room: "The Gym", wear: "Built to train." },
  { room: "The Dinner", wear: "Elevated." },
  { room: "The Night Out", wear: "Luxury streetwear." },
];

// What the Modern Hustler cares about, and what the culture leaves out.
export const HUSTLER_IS = [
  "How they dress",
  "How they carry themselves",
  "How they treat people",
  "Their health",
  "Their word",
  "Their family",
  "Their work",
  "Their future",
];

export const HUSTLER_IS_NOT = [
  "Fake wealth",
  "Flexing for validation",
  "Crime or street glorification",
  "Disrespecting people to get ahead",
  "Poverty as an aesthetic",
];

// The Family: the people who represent the culture. Different careers,
// different backgrounds, same standard.
export const FAMILY_ROLES = [
  "Entrepreneurs",
  "Artists",
  "Rappers",
  "Athletes",
  "Coaches",
  "Designers",
  "Creators",
  "Students",
  "Professionals",
  "Business Owners",
  "Community Leaders",
];

export const FAMILY_TRAITS = [
  "Driven",
  "Disciplined",
  "Respectful",
  "Presentable",
  "Confident",
  "Hardworking",
  "Creative",
  "Focused on growth",
  "Building something real",
];

export const FAMILY_SELECTION =
  "We don't choose people because of their follower count. We choose people because of who they are, how they move, and what they're building.";

// Luxury: how the elevated line is framed everywhere it is introduced.
export const LUXURY_QUALITIES = ["Limited", "Premium", "Intentional", "Collectible", "Sophisticated"];

// What the community is built around beyond the clothing.
export const COMMUNITY_PILLARS = ["Events", "Stories", "Collaborations", "Networking"];

// The closing statement that signs off the homepage.
export const CLOSING = ["Built Through Adversity.", "Driven By Purpose.", "Built To Last."];

// Luxury product storytelling, prepared for dedicated Luxury product pages:
// Campaign -> Story -> Design -> Materials -> Details -> Product -> Purchase.
// Not rendered yet; the product and purchase steps reuse the existing catalog
// and cart, so a page only needs this editorial layer on top.
export type LuxuryStory = {
  /** Matches the product id / page slug. */
  slug: string;
  campaign: { title: string; image: string; line?: string };
  story: string;
  design: string;
  materials: string[];
  details: string[];
};
