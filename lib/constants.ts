export type EventItem = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string; // e.g., "2025-11-07"
    time: string; // e.g., "09:00 AM"
};

// Curated list of upcoming/popular developer events.
// Image assets live under public/images and can be used directly with next/image
// via paths like "/images/event1.png".

export const events = [
  {
    title: "React Summit 2026",
    image: "/images/Event1.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "June 14, 2026",
    time: "09:00 AM - 06:00 PM"
  },
  {
    title: "AI & Machine Learning Hackathon",
    image: "/images/Event2.png",
    slug: "ai-ml-hackathon-2026",
    location: "San Francisco, CA",
    date: "March 21, 2026",
    time: "10:00 AM - 10:00 PM"
  },
  {
    title: "Next.js Conf 2026",
    image: "/images/Event1.png",
    slug: "nextjs-conf-2026",
    location: "Virtual Event",
    date: "October 25, 2026",
    time: "12:00 PM - 08:00 PM"
  },
  {
    title: "DevOps Summit",
    image: "/images/Event2.png",
    slug: "devops-summit-2026",
    location: "Austin, TX",
    date: "May 10, 2026",
    time: "08:00 AM - 05:00 PM"
  },
  {
    title: "Web3 Developers Conference",
    image: "/images/Event1.png",
    slug: "web3-dev-conf-2026",
    location: "Miami, FL",
    date: "April 15, 2026",
    time: "09:30 AM - 06:30 PM"
  },
  {
    title: "Google I/O Extended",
    image: "/images/Event2.png",
    slug: "google-io-extended-2026",
    location: "Mountain View, CA",
    date: "May 28, 2026",
    time: "10:00 AM - 07:00 PM"
  },
  {
    title: "JavaScript Mastery Workshop",
    image: "/images/Event1.png",
    slug: "js-mastery-workshop",
    location: "New York, NY",
    date: "February 18, 2026",
    time: "01:00 PM - 05:00 PM"
  },
  {
    title: "Cloud Architecture Bootcamp",
    image: "/images/Event2.png",
    slug: "cloud-architecture-bootcamp",
    location: "Seattle, WA",
    date: "July 08, 2026",
    time: "09:00 AM - 04:00 PM"
  },
  {
    title: "Mobile Dev Meetup",
    image: "/images/Event1.png",
    slug: "mobile-dev-meetup-feb",
    location: "Los Angeles, CA",
    date: "February 05, 2026",
    time: "06:00 PM - 09:00 PM"
  },
  {
    title: "Cybersecurity Conference 2026",
    image: "/images/Event2.png",
    slug: "cybersecurity-conf-2026",
    location: "Washington, DC",
    date: "September 12, 2026",
    time: "08:30 AM - 06:00 PM"
  },
  {
    title: "TypeScript Workshop",
    image: "/images/Event1.png",
    slug: "typescript-workshop-2026",
    location: "Boston, MA",
    date: "March 30, 2026",
    time: "10:00 AM - 03:00 PM"
  },
  {
    title: "GraphQL Summit",
    image: "/images/Event2.png",
    slug: "graphql-summit-2026",
    location: "Chicago, IL",
    date: "November 18, 2026",
    time: "09:00 AM - 05:00 PM"
  }
];

