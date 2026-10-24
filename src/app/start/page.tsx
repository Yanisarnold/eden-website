import { IMAGES } from "@/data/images";
import { PageHero } from "@/components/PageHero";

export const metadata = {
  title: "Book a Tour | Eden Childcare Group",
  description: "Start a nursery enquiry with Eden Childcare Group.",
  robots: { index: false, follow: true },
};

export default function StartPage() {
  return (
    <PageHero
      eyebrow="Book a tour"
      title={<>Start your<br /><span className="script text-eden-green">Eden enquiry.</span></>}
      description="Tell us your child's age, preferred nursery, start date and the days you need. We'll confirm current spaces and help arrange a visit."
      image={IMAGES.roomPreschool}
      action={{ href: "/contact", label: "Book a tour" }}
    />
  );
}
