import "../../styles/luxury.css";
import type { Metadata } from "next";
import FeaturedTrench from "@/components/FeaturedTrench";
import LuxuryStory from "@/components/LuxuryStory";
import ScrollReveal from "@/components/ScrollReveal";
import { luxuryStory } from "@/data/brand";

const story = luxuryStory("trench-coat")!;

export const metadata: Metadata = {
  title: story.name,
  description:
    "The story behind the Cash Culture Luxury Trench Coat: premium wool-blend shell, quilted lining, red accent stitching. Grey, Camel, and Black. Limited production.",
  alternates: { canonical: "/luxury/trench-coat" },
  openGraph: { images: [{ url: story.campaign.image, alt: story.name }] },
};

export default function TrenchCoatPage() {
  return (
    <main className="cc-lux">
      <ScrollReveal selector=".cc-lux .featured" />
      <LuxuryStory story={story}>
        <FeaturedTrench />
      </LuxuryStory>
    </main>
  );
}
