/**
 * Real Eden Childcare imagery supplied by the client.
 */

export interface CuratedImage {
  id: string;
  baseUrl: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  color: string;
}

/**
 * Keeps existing call sites simple. For local files, the browser ignores the
 * sizing query string but the function remains compatible with previous usage.
 */
export function sized(img: CuratedImage, width: number, quality = 80): string {
  const separator = img.baseUrl.includes("?") ? "&" : "?";
  return `${img.baseUrl}${separator}w=${width}&q=${quality}`;
}

const edenCredit = {
  photographer: "Eden Childcare Group",
  photographerUrl: "https://edenchildcaregroup.co.uk",
};

export const IMAGES = {
  homeHero: {
    id: "eden-main-playroom",
    baseUrl: "/eden-gallery/main-playroom.jpeg",
    alt: "Bright Eden Childcare playroom with colourful rugs, learning displays and children's activity areas",
    ...edenCredit,
    color: "#F2E7CF",
  },
  roomBabies: {
    id: "eden-reading-corner",
    baseUrl: "/eden-gallery/reading-corner.jpeg",
    alt: "Warm nursery corner with child-sized tables, reading area and learning displays",
    ...edenCredit,
    color: "#F5E8D6",
  },
  roomToddlers: {
    id: "client-toddlers",
    baseUrl: "/eden-client-images/toddlers.jpg",
    alt: "A toddler exploring colours and mark-making",
    ...edenCredit,
    color: "#D7C8AD",
  },
  roomPreschool: {
    id: "eden-preschool-room",
    baseUrl: "/eden-client-images/preschool.jpg",
    alt: "A child exploring a colourful toy camera during play",
    ...edenCredit,
    color: "#F0D8A8",
  },
  roomOutdoors: {
    id: "eden-creative-room",
    baseUrl: "/eden-gallery/creative-room.jpeg",
    alt: "Creative nursery room with bunting, display boards, play resources and child-sized seating",
    ...edenCredit,
    color: "#EDE3D3",
  },
  aboutHero: {
    id: "eden-sensory-room",
    baseUrl: "/eden-gallery/sensory-room.jpeg",
    alt: "Eden Childcare learning room with colourful mats, toys and early years resources",
    ...edenCredit,
    color: "#E8D9B8",
  },
  philosophy: {
    id: "eden-street-sign",
    baseUrl: "/eden-gallery/street-sign.jpeg",
    alt: "Eden Childcare Nursery and Pre-school sign outside the Streatham nursery",
    ...edenCredit,
    color: "#2B2A26",
  },
  // Interim warm stock imagery (Unsplash) — swap for real, consented Eden child
  // photos when the client confirms. Rooms grid + gallery stay on real photos.
  heroChildren: {
    id: "client-wellies",
    baseUrl: "/eden-client-images/hero-wellies.jpg",
    alt: "Children in colourful wellies ready for outdoor play",
    ...edenCredit,
    color: "#f3f3f3",
  },
  joyfulPlay: {
    id: "unsplash-WA2EE7YtzC4",
    baseUrl:
      "https://images.unsplash.com/photo-1557452765-5b57d100c1dc?ixid=M3w5MjQ3NTB8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNoaWxkJTIwcGxheWluZyUyMG51cnNlcnklMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXwwfHx8MTc4MTU5NTY2NHww&ixlib=rb-4.1.0",
    alt: "A toddler in a pinafore exploring wooden toys with focus and delight",
    photographer: "Troy T",
    photographerUrl: "https://unsplash.com/@ttcollect",
    color: "#f3d9d9",
  },
} as const satisfies Record<string, CuratedImage>;

export const GALLERY_IMAGES = [
  {
    title: "Main playroom",
    description: "A bright, colourful room set up for group play, early learning and movement.",
    image: IMAGES.homeHero,
  },
  {
    title: "Indoor climbing and movement",
    description: "A dedicated space for physical confidence, balance and active play indoors.",
    image: { ...IMAGES.roomToddlers, baseUrl: "/eden-gallery/climbing-frame.jpeg", alt: "Indoor climbing frame and slide" },
  },
  {
    title: "Creative learning room",
    description: "Display boards, tables and resources for project work, mark-making and small-group activities.",
    image: IMAGES.roomOutdoors,
  },
  {
    title: "Preschool room",
    description: "A warm preschool environment with low tables, visual displays and familiar routines.",
    image: { ...IMAGES.roomPreschool, baseUrl: "/eden-gallery/preschool-room.jpeg", alt: "Eden Streatham preschool room" },
  },
  {
    title: "Reading and quiet corner",
    description: "A softer room for stories, calm play and small-group time.",
    image: IMAGES.roomBabies,
  },
  {
    title: "Early years resources",
    description: "Hands-on toys, role-play resources and colourful learning areas for younger children.",
    image: IMAGES.aboutHero,
  },
  {
    title: "Eden Streatham nursery",
    description: "Eden Childcare Nursery and Preschool on Streatham High Road.",
    image: IMAGES.philosophy,
  },
];

export const UNSPLASH_REFERRAL = "https://edenchildcaregroup.co.uk";
