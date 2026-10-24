import { GALLERY_IMAGES } from "./images";

export type NurseryPhoto = { src: string; alt: string };
// Only branch-confirmed photos. Add Holden Park photos when supplied.
export const NURSERY_PHOTOS: Record<string, NurseryPhoto[]> = {
  croydon: [
    { src: "/eden-client-images/croydon-1.jpg", alt: "Croydon nursery room with child-sized tables and learning displays" },
    { src: "/eden-client-images/croydon-2.jpg", alt: "Another view inside Eden Croydon nursery" },
    { src: "/eden-client-images/croydon-3.jpg", alt: "Play and learning space at Eden Croydon" },
  ],
  streatham: GALLERY_IMAGES.map(({image}) => ({src: image.baseUrl, alt: image.alt})),
  rochester: [
    { src: "/eden-client-images/rochester-1.jpg", alt: "Rochester play space with colourful mats and role-play toys" },
    { src: "/eden-client-images/rochester-2.jpg", alt: "Rochester sensory toys and phonics display" },
    { src: "/eden-client-images/rochester-3.jpg", alt: "Rochester literacy area with child-sized desks" },
  ],
  "holden-park": [],
};
