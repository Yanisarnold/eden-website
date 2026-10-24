/**
 * Shared business info for Eden Childcare Group.
 * Single source of truth — edit here, updates everywhere.
 *
 * Sources:
 *   - Ofsted register (Edenchildcare Ltd, URN 2811658, registered 03 Feb 2025)
 *   - Lambeth Family Information Directory listing 12317
 *   - Founder's Childcare.co.uk childminder profile (Croydon CR0)
 */


export const LOCATION_SERVICES = {
  toddlers: {
    title: "Toddlers",
    age: "15 months-3 years",
    summary:
      "Active toddler care with language-rich play, early independence, creative activities and calm daily rhythms.",
  },
  preschool: {
    title: "Pre-school",
    age: "3-4 years",
    summary:
      "Reception preparation with phonics, early numeracy, social confidence and funded-hours guidance.",
  },
  afterschool: {
    title: "After-school club",
    age: "Ask about age availability",
    summary: "A welcoming place to play and unwind after school. Ask our team about school pick-up and drop-off, availability and arrangements.",
  },
} as const;

type LocationServiceKey = keyof typeof LOCATION_SERVICES;

export const ACTIVITY_CARDS = [
  {
    title: "Arts & crafts",
    summary: "Painting, mark-making, collage and creative projects that help children build confidence and fine motor skills.",
    image: "/eden-activities/arts-and-colours.jpg",
  },
  {
    title: "Outdoor play",
    summary: "Fresh-air play, climbing, movement games and garden time built into the weekly rhythm.",
    image: "/eden-activities/outdoor-play.jpeg",
  },
  {
    title: "Early learning",
    summary: "Stories, language, numbers, music and guided play matched to each age group and room.",
    image: "/eden-activities/early-learning.jpg",
  },
  {
    title: "Meals & routines",
    summary: "Calm mealtimes, rest, hygiene habits and predictable daily structure so children know what comes next.",
    image: "/eden-activities/meals-and-routines.jpg",
  },
] as const;

export const BUSINESS = {
  legalName: "Edenchildcare Ltd",
  tradingName: "Eden Childcare Group",
  clientSlug: "edenchildcare-group",
  siteUrl: "https://edenchildcaregroup.co.uk",
  leadApiUrl: "/api",
  tagline: "A small group, built around your child.",
  practitioner: {
    firstName: "Philomena",
    lastName: "Sadia",
    fullName: "Philomena Sadia",
    role: "Founder & Manager",
    credentialLine:
      "Ofsted Registered · Safeguarding DSL · SENCO Training · Paediatric First Aid",
    qualifiedYear: 2014,
    formerRole: "Ofsted-registered childminder and nursery director",
  },
  // Edenchildcare Ltd registered with Ofsted Feb 2025
  foundedYear: 2025,
  ofsted: {
    registeredName: "Edenchildcare Ltd",
    urn: "2811658",
    registeredDate: "03 February 2025",
    type: "Childcare on Non-Domestic Premises, Full Day Care",
    localAuthority: "Lambeth",
    note: "Newly registered — first inspection scheduled within 30 months per Ofsted policy.",
  },

  phone: {
    display: "07861 763 780",
    international: "+447861763780",
    waUrl: "https://wa.me/447861763780",
    telUrl: "tel:+447861763780",
  },
  email: "admin@edenchildcaregroup.co.uk",
  admissionsEmail: "admin@edenchildcaregroup.co.uk",
  // Founder's working email used on Ofsted/Lambeth filings — kept here for
  // operational fallback only, not displayed publicly on the site.
  founderEmail: "philomenesadia77@gmail.com",

  address: {
    line1: "211–213 High Road",
    line2: "Streatham",
    city: "London",
    postcode: "SW16 6EG",
    country: "United Kingdom",
    display: "211–213 High Road, Streatham, London SW16 6EG",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Edenchildcare+211-213+High+Road+Streatham+SW16+6EG",
    embedQuery:
      "https://www.google.com/maps?q=211-213+High+Road+Streatham+SW16+6EG&output=embed",
  },

  locations: [
    {
      slug: "croydon",
      comingSoon: false,
      name: "Eden Childcare Croydon",
      shortName: "Croydon",
      line1: "57 Pawsons Road",
      line2: "Thornton Heath",
      city: "Croydon",
      region: "London",
      postcode: "CR0 2QA",
      display: "57 Pawsons Road, Thornton Heath, Croydon CR0 2QA",
      localArea: "Thornton Heath and Croydon",
      strapline: "Eden nursery care for families in Thornton Heath, Croydon and nearby areas.",
      overview:
        "Eden Croydon offers toddler and pre-school care with familiar routines, early learning and close communication with parents.",
      availability: {
        label: "Croydon spaces",
        headline: "Now enrolling across our rooms",
        note: "Call or WhatsApp the team for the latest room-by-room details and to arrange a visit.",
      },
      services: ["toddlers", "preschool", "afterschool"] satisfies LocationServiceKey[],
      hours: "Monday to Friday, 7:00 am–8:00 pm",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=57+Pawsons+Road+Thornton+Heath+Croydon+CR0+2QA",
      embedQuery:
        "https://www.google.com/maps?q=57+Pawsons+Road+Thornton+Heath+Croydon+CR0+2QA&output=embed",
      coordinates: { lat: 51.39911, lng: -0.09861 },
    },
    {
      slug: "streatham",
      comingSoon: false,
      name: "Eden Childcare Nursery & Pre-school",
      shortName: "Streatham",
      line1: "211–213 Streatham High Road",
      line2: "Streatham",
      city: "London",
      region: "London",
      postcode: "SW16 6EG",
      display: "211–213 Streatham High Road, London SW16 6EG",
      localArea: "Streatham",
      strapline: "A high-road nursery and pre-school for Streatham families.",
      overview:
        "Eden Streatham offers full-day care for toddlers and pre-school children, with clear routines, language-rich play and gentle settling-in.",
      availability: {
        label: "Streatham spaces",
        headline: "Now enrolling across our rooms",
        note: "Call or WhatsApp the team for the latest room-by-room details and to arrange a visit.",
      },
      services: ["toddlers", "preschool", "afterschool"] satisfies LocationServiceKey[],
      hours: "Monday to Friday, 7:00 am–7:00 pm",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Eden+Childcare+Nursery+Pre-school+211-213+Streatham+High+Road+London+SW16+6EG",
      embedQuery:
        "https://www.google.com/maps?q=211-213+Streatham+High+Road+London+SW16+6EG&output=embed",
      coordinates: { lat: 51.42785, lng: -0.13104 },
    },
    {
      slug: "rochester",
      comingSoon: false,
      name: "Eden Childcare Nursery & Pre-school",
      shortName: "Rochester",
      line1: "St Justus Church",
      line2: "Clifton Close",
      city: "Rochester, Kent",
      region: "Kent",
      postcode: "ME2 2HG",
      display: "St Justus Church, Clifton Close, Rochester, Kent ME2 2HG",
      localArea: "Rochester and Medway",
      strapline: "Eden nursery care for families in Rochester, Medway and nearby areas.",
      overview:
        "Eden Rochester offers toddler and pre-school care with safe routines, purposeful play and a calm start for each child.",
      availability: {
        label: "Rochester spaces",
        headline: "Now enrolling across our rooms",
        note: "Call or WhatsApp the team for the latest room-by-room details and to arrange a visit.",
      },
      services: ["toddlers", "preschool"] satisfies LocationServiceKey[],
      hours: "Monday to Friday, 7:00 am–7:00 pm",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=St+Justus+Church+Clifton+Close+Rochester+Kent+ME2+2HG",
      embedQuery:
        "https://www.google.com/maps?q=St+Justus+Church+Clifton+Close+Rochester+Kent+ME2+2HG&output=embed",
      coordinates: { lat: 51.3946, lng: 0.47982 },
    },
    {
      slug: "holden-park",
      comingSoon: false,
      name: "Holden Park Pre-school",
      shortName: "Holden Park",
      line1: "Gospel Hall, Rear of 61 Prospect Road",
      line2: "Southborough",
      city: "Tunbridge Wells",
      region: "Kent",
      postcode: "TN4 0EH",
      display: "Gospel Hall, Rear of 61 Prospect Road, Southborough, Tunbridge Wells TN4 0EH",
      localArea: "Southborough and Tunbridge Wells",
      strapline: "Eden toddler and pre-school care for families in Southborough and Tunbridge Wells.",
      overview:
        "Holden Park offers toddler and pre-school care with secure routines, purposeful play and close communication with parents.",
      availability: {
        label: "Holden Park Pre-school",
        headline: "Ask about current availability",
        note: "Call or WhatsApp the Eden team for the latest spaces, age-group information and tour times.",
      },
      services: ["toddlers", "preschool"] satisfies LocationServiceKey[],
      phone: { display: "01892 520626", telUrl: "tel:+441892520626" },
      hours: "Monday to Friday, 7:30 am–6:00 pm",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Holden+Park+Gospel+Hall+Rear+of+61+Prospect+Road+Southborough+Tunbridge+Wells+TN4+0EH",
      embedQuery:
        "https://www.google.com/maps?q=Holden+Park+Gospel+Hall+Rear+of+61+Prospect+Road+Southborough+Tunbridge+Wells+TN4+0EH&output=embed",
      coordinates: { lat: 51.1554, lng: 0.2564 },
    },
  ],

  hours: [
    { day: "Monday to Friday", time: "8am to 7pm" },
    { day: "Saturday", time: "Closed" },
    { day: "Sunday", time: "Closed" },
  ],

  ages: {
    range: "15 months – 4 years",
    rooms: ["Toddlers (15m–3y)", "Pre-school (3–4y)"],
  },

  funding: [
    "Funded hours from 9 months (working parents)",
    "2-year-old funded hours",
    "3 & 4-year-old funded hours — 15 hours (universal)",
    "3 & 4-year-old funded hours — 30 hours (working parents)",
    "Tax-Free Childcare",
    "Universal Credit childcare element",
    "Workplace voucher schemes (legacy scheme, joined before Oct 2018)",
  ],

  languages: ["English", "French", "Arabic"],

  inclusion: {
    headline: "Care shaped around each child.",
    supports: [
      "Autism (ASD)",
      "ADHD",
      "Speech & language",
      "Learning differences",
      "Behavioural & emotional needs",
      "Allergies, asthma, eczema",
    ],
  },

  socials: {
    instagram: {
      handle: "edenchildcaregroup",
      url: "https://www.instagram.com/edenchildcaregroup/",
    },
    google: "https://www.google.com/maps/search/?api=1&query=Edenchildcare+SW16+6EG",
  },

  whatsappPrefill:
    "Hi Philomena, I found Eden Childcare online — could I book a tour and ask about availability?",
} as const;

export function yearsInBusiness(): number {
  // Founder operated as a registered childminder before opening the nursery —
  // count years of childcare experience, not company age.
  const startedChildcare = 2018;
  return Math.max(1, new Date().getFullYear() - startedChildcare);
}

export function whatsappLink(message?: string): string {
  const base = BUSINESS.phone.waUrl;
  const msg = message ?? BUSINESS.whatsappPrefill;
  return `${base}?text=${encodeURIComponent(msg)}`;
}

export function roadNameWithoutNumber(line: string): string {
  return line
    .replace(/\b(?:Rear of\s+)?\d+[–-]?\d*\s+/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function openStreetMapEmbedUrl(
  coordinates: { lat: number; lng: number },
  span = 0.012,
): string {
  const { lat, lng } = coordinates;
  const bbox = [lng - span, lat - span, lng + span, lat + span]
    .map((value) => value.toFixed(6))
    .join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lng}`)}`;
}
