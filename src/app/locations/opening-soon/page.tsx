import type { Metadata } from "next";
import LocationPage from "../[slug]/page";

export const metadata: Metadata = {
  title: "Holden Park | Eden Childcare Group",
  description: "Holden Park Pre-school in Southborough, Tunbridge Wells.",
};

export default function LegacyOpeningSoonPage() {
  return <LocationPage params={Promise.resolve({ slug: "holden-park" })} />;
}
