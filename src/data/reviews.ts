/**
 * Parent reviews for Eden Childcare Group.
 *
 * The first three carry across from Philomena's earlier years as an
 * Ofsted-registered childminder in Croydon (5★ on her Childcare.co.uk
 * profile, ID 1134162). They speak to her directly, not the new nursery
 * brand, but they're the right voices to anchor parent trust until the
 * nursery has its own Google reviews.
 *
 * When fresh nursery reviews land, swap them in here. Schema kept in
 * sync with src/components/Reviews.tsx.
 */

export interface Review {
  id: string;
  name: string;
  date: string;
  rating: 5;
  source: "Google" | "Childcare.co.uk" | "Tour";
  quote: string;
}

export const REVIEWS: Review[] = [
  {
    id: "warm-attentive",
    name: "Mum, Croydon",
    date: "2024",
    rating: 5,
    source: "Childcare.co.uk",
    quote:
      "Philomena is the warmest, most attentive person we've handed our daughter to. She came home knowing new words, new songs, more confident. We never worried for a second.",
  },
  {
    id: "shift-hours",
    name: "Working mum, shift hours",
    date: "2024",
    rating: 5,
    source: "Childcare.co.uk",
    quote:
      "My hours are unpredictable and Philomena made it work without ever making us feel like an inconvenience. The progress in our son's speech in six months was incredible.",
  },
  {
    id: "dad-of-two",
    name: "Dad of two, Croydon",
    date: "2024",
    rating: 5,
    source: "Childcare.co.uk",
    quote:
      "What you actually want from childcare: a person who notices everything, communicates clearly, and treats your child like one of their own. That's Philomena — now with a proper nursery behind her.",
  },
];

export const REVIEW_SUMMARY = {
  averageRating: 5.0,
  totalReviews: 3,
  context: "From Philomena's prior childminder profile — the nursery is newly opened.",
} as const;
