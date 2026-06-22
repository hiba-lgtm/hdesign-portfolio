import neutreenoDashboard from "@/imports/Neutreeno Decarb.png";
import timrWebsite from "@/imports/Timr Website.png";
import haulerHero from "@/imports/Hauler Hero.png";
import pebble1 from "@/imports/Pebble 1.png";
import listingLeaders from "@/imports/Listing Leaders.png";
import listingLeadersVideo from "@/imports/Listing Leaders.mp4";
import neutreenoCoverVideo from "@/imports/Neutreeno Cover.mp4";
import timr1 from "@/imports/Timr_1.jpg";
import timr2 from "@/imports/Timr_2.jpg";
import timr3 from "@/imports/Timr_3.jpg";
import haulerHero1 from "@/imports/Hauler Hero_1.jpg";
import haulerHero2 from "@/imports/Hauler Hero_2.jpg";
import haulerHero3 from "@/imports/Hauler Hero 3.jpg";
import pebbleCaseStudy1 from "@/imports/Pebble_1.jpg";
import pebbleCaseStudy2 from "@/imports/Pebble_2.jpg";
import pebbleCaseStudy3 from "@/imports/Pebble_3.jpg";
import neutreenoEmission from "@/imports/Neutreeno_Emission Action Center.png";
import neutreenoEntity from "@/imports/Neutreeno_Entity Deletion.png";
import neutreenoProducts from "@/imports/Neutreeno_My Products.png";
import gmfAssociates from "@/imports/GMF Associates.png";

export interface Metric {
  label: string;
  value: string;
  detail: string;
}

export type FilterTag = "Mobile Apps" | "SaaS" | "Design Systems" | "Healthcare" | "Website";

export interface Work {
  id: string;
  slug: string;
  title: string;
  summary: string;
  caseStudyDescription: string;
  category: string;
  filterTag: FilterTag;
  displayTag: string;
  year: string;
  thumbnail: string;
  thumbnailVideo?: string;
  metric: string;
  role: string;
  skills: string[];
  caseStudyImages: string[];
  externalUrl: string;
  problem: string;
  process: string;
  processImage: string;
  beforeImage: string;
  afterImage: string;
  metrics: Metric[];
}

export const WORKS: Work[] = [
  {
    id: "01",
    slug: "neutreeno",
    title: "Neutreeno",
    summary:
      "Supplier decarbonisation platform — helping manufacturers map, track and reduce their Scope 3 emissions.",
    caseStudyDescription:
      "As Lead UI/UX Designer for Neutreeno's supplier decarbonisation platform, I help manufacturers map, track, and reduce their Scope 3 emissions through software that turns carbon data into clear, prioritized action. My work spans the full product surface — designing new user stories and dashboard experiences, simplifying complex emissions data into usable interfaces, building out and maintaining the team's design component library, and running design QA to keep what ships aligned with what's designed. Alongside product work, I've also supported marketing material as needed, helping translate the platform's technical depth into clear visual communication.",
    category: "SaaS Platform",
    filterTag: "SaaS",
    displayTag: "SaaS Platform",
    year: "2025 – Ongoing",
    thumbnail: neutreenoDashboard,
    thumbnailVideo: neutreenoCoverVideo,
    metric:"12+ Months Ongoing Engagement",
    role: "Lead UI/UX Designer",
    skills: ["User Interface Design", "Design Systems", "Data Visualization", "Design QA", "Figma"],
    caseStudyImages: [
      neutreenoEmission,
      neutreenoEntity,
      neutreenoProducts,
    ],
    externalUrl: "#",
    problem:
      "SMEs knew they needed to reduce emissions but had no accessible way to track, understand, or report their carbon footprint. Enterprise tools were too complex and costly; consumer apps were too shallow to meet compliance needs.",
    process:
      "Discovery with 8 sustainability managers at mid-size companies → Jobs-to-be-Done mapping → data architecture design in collaboration with the engineering team → 4 Figma sprint cycles → 6-week pilot with 15 SME clients across manufacturing and logistics.",
    processImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop&auto=format",
    beforeImage:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&h=480&fit=crop&auto=format",
    afterImage:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=700&h=480&fit=crop&auto=format",
    metrics: [
      { label: "Emission targets set (D30)", value: "82%", detail: "Of pilot companies" },
      { label: "Reporting time saved/week", value: "3.2 hrs", detail: "Per sustainability lead" },
      { label: "Pilot-to-paid conversion", value: "91%", detail: "After 6-week pilot" },
      { label: "Compliance report time", value: "−74%", detail: "vs. manual spreadsheets" },
    ],
  },
  {
    id: "02",
    slug: "timr",
    title: "Timr",
    summary:
      "Employee time management SaaS for staffing agencies — designed end-to-end across marketing website, web dashboard, and iOS app.",
    caseStudyDescription:
      "Timr is an employee time management SaaS platform for a Denmark-based staffing agency, designed end-to-end as their Lead UI/UX Designer — from the marketing website to the web dashboard and iOS mobile app. The work included complex data views for candidate management, timesheets, invoicing, and analytics, plus onboarding and authentication flows. The core design challenge was making dense workforce data feel simple and approachable for non-technical users, delivered as a full Figma handoff ready for development.",
    category: "SaaS + iOS",
    filterTag: "SaaS",
    displayTag: "SaaS + iOS",
    year: "2024",
    thumbnail: timrWebsite,
    metric: "40% Reduction in Timesheet Processing Time",
    role: "Lead UI/UX Designer",
    skills: ["User Experience Design", "User Interface Design", "High Fidelity Design", "Mobile App Design", "Figma"],
    caseStudyImages: [
      timr1,
      timr2,
      timr3,
    ],
    externalUrl: "#",
    problem:
      "Freelancers were losing an estimated 12% of billable hours to inaccurate time logging, invoice disputes, and manual rate calculations. Every tool on the market was designed for agency teams, not solo creatives working across multiple clients and project types.",
    process:
      "35 in-depth interviews with freelance designers, developers, and copywriters → persona mapping → mobile-first prototyping in Figma → ProtoPie interactive prototype for usability testing → public beta with 800 signups, iterated weekly for 8 weeks.",
    processImage:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=600&fit=crop&auto=format",
    beforeImage:
      "https://images.unsplash.com/photo-1547954575-855750c57bd3?w=700&h=480&fit=crop&auto=format",
    afterImage:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=700&h=480&fit=crop&auto=format",
    metrics: [
      { label: "Billable hours captured", value: "+18%", detail: "Avg. per user/month" },
      { label: "Invoice disputes", value: "−70%", detail: "Within first quarter" },
      { label: "Monthly revenue increase", value: "$240", detail: "Avg. per user" },
      { label: "Cross-platform rating", value: "4.7 ★", detail: "iOS + Android" },
    ],
  },
  {
    id: "03",
    slug: "hauler-hero",
    title: "Hauler Hero",
    summary:
      "Enterprise SaaS platform for waste and recycling businesses — covering CRM, route management, billing, dispatching, and a white-label customer portal.",
    caseStudyDescription:
      "Hauler Hero is a market-leading enterprise SaaS platform serving waste and recycling businesses across the US. As Lead UI/UX Designer, I led the full UX and UI design of the platform, covering CRM, route management, billing and invoicing, dispatching, reporting, inventory, and a white-label customer portal — all designed in Figma. The core challenge was handling complex operational data across multiple modules while keeping the interface fast and intuitive for field-based users.",
    category: "Enterprise SaaS",
    filterTag: "SaaS",
    displayTag: "Enterprise SaaS",
    year: "2021",
    thumbnail: haulerHero,
    metric: "8 Modules Designed Across 1 Platform",
    role: "Lead UI/UX Designer",
    skills: ["User Experience Design", "User Interface Design", "High Fidelity Design", "Mobile App Design", "Figma"],
    caseStudyImages: [
      haulerHero1,
      haulerHero2,
      haulerHero3,
    ],
    externalUrl: "#",
    problem: "",
    process: "",
    processImage: "",
    beforeImage: "",
    afterImage: "",
    metrics: [],
  },
  {
    id: "04",
    slug: "pebble",
    title: "Pebble",
    summary:
      "Property management CRM for real estate professionals — redesigned across client dashboard, billing portal, listing flows, inbox, lead views, and admin portal.",
    caseStudyDescription:
      "Pebble is a property management CRM that helps real estate professionals manage listings, leads, and client communications in one platform. I led the UI/UX work across the platform, both redesigning existing modules and designing new ones from the ground up — covering the client dashboard, billing portal, property listing flows, buyer/seller inbox, lead detail views, and admin portal. The work spanned everything from improving established workflows to defining entirely new product surfaces, bringing a consistent design language across both as the platform grew.",
    category: "SaaS · CRM",
    filterTag: "SaaS",
    displayTag: "SaaS · CRM",
    year: "2022",
    thumbnail: pebble1,
    metric: "6 Core Modules Redesigned",
    role: "Lead UI/UX Designer",
    skills: ["User Experience Design", "User Interface Design", "High Fidelity Design", "Mobile App Design", "Figma"],
    caseStudyImages: [
      pebbleCaseStudy1,
      pebbleCaseStudy2,
      pebbleCaseStudy3,
    ],
    externalUrl: "#",
    problem: "",
    process: "",
    processImage: "",
    beforeImage: "",
    afterImage: "",
    metrics: [],
  },
  {
    id: "05",
    slug: "listing-leaders",
    title: "Listing Leaders",
    summary:
      "A modern website redesign for a real estate pre-licensing school in Northwest Indiana — covering brand presentation, course information architecture, and a fresh visual direction while preserving their existing logo.",
    caseStudyDescription:
      "Listing Leaders needed a modern, engaging website to better represent their real estate school and streamline access to course information. I completely redesigned the site using a new visual direction, updated typography, and a fresh color system — while keeping their existing logo intact. The improved layout and clearer CTAs significantly boosted user interaction, resulting in a 48% increase in course inquiry form submissions within the first month post-launch.",
    category: "Website Redesign",
    filterTag: "Website",
    displayTag: "Website Redesign",
    year: "2023",
    thumbnail: listingLeaders,
    thumbnailVideo: listingLeadersVideo,
    metric: "48% Increase in Lead Conversion",
    role: "Lead UI/UX Designer",
    skills: ["Figma", "Website Redesign", "User Interface Design", "User Experience Design"],
    caseStudyImages: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&h=900&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&h=900&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=900&fit=crop&auto=format",
    ],
    externalUrl: "#",
    problem: "",
    process: "",
    processImage: "",
    beforeImage: "",
    afterImage: "",
    metrics: [],
  },
  {
    id: "06",
    slug: "gmf-associates",
    title: "GMF Associates",
    summary:
      "A complete website overhaul for an architecture firm — revamped interface, new color palette, and restructured layout to better showcase their portfolio, while preserving their existing logo.",
    caseStudyDescription:
      "GMF Associates, an architecture firm, needed a complete website overhaul to match their high-end, modern portfolio. I led the redesign from the ground up — revamping their outdated interface, introducing a sleek new color palette, and structuring the layout to better showcase their work. The only element retained was the original logo. The new design elevates their brand presence and better reflects the sophistication of their services.",
    category: "Website Redesign",
    filterTag: "Website",
    displayTag: "Website Redesign",
    year: "2024",
    thumbnail: gmfAssociates,
    metric: "4 Weeks to Full Redesign",
    role: "Lead UI/UX Designer",
    skills: ["Figma", "Website Redesign", "User Interface Design", "User Experience Design", "Design Thinking"],
    caseStudyImages: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1400&h=900&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1400&h=900&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&h=900&fit=crop&auto=format",
    ],
    externalUrl: "#",
    problem: "",
    process: "",
    processImage: "",
    beforeImage: "",
    afterImage: "",
    metrics: [],
  },
];
