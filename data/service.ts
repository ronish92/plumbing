import slugify from "slugify";

export interface Service {
  id: number;
  title: string;
  provider: string;
  rating: number;
  reviews: number;
  price: string;
  description: string;
  image: string;
  slug: string;
}

export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

const rawServices = [
  {
    id: 1,
    title: "Leak Detection & Repair",
    provider: "FlowFix Certified Team",
    rating: 4.9,
    reviews: 320,
    price: "From $89.00",
    description:
      "Advanced leak detection technology to find and fix leaks quickly, minimizing water damage and saving you money on utility bills.",
    image:
      "https://images.pexels.com/photos/8105045/pexels-photo-8105045.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Pipe Installation & Repair",
    provider: "FlowFix Certified Team",
    rating: 4.8,
    reviews: 210,
    price: "From $150.00",
    description:
      "Professional pipe fitting and installation for new construction and remodeling projects using premium materials and code-compliant methods.",
    image:
      "https://images.pexels.com/photos/4219592/pexels-photo-4219592.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Water Heater Services",
    provider: "FlowFix Certified Team",
    rating: 4.9,
    reviews: 185,
    price: "From $210.00",
    description:
      "Installation, repair, and maintenance of all water heater types including tankless, traditional, and hybrid systems.",
    image:
      "https://images.pexels.com/photos/8099147/pexels-photo-8099147.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Bathroom Remodeling",
    provider: "FlowFix Certified Team",
    rating: 5.0,
    reviews: 142,
    price: "From $1,200.00",
    description:
      "Complete bathroom plumbing for remodels — from fixture installation to shower systems, we handle every detail with precision.",
    image:
      "https://images.pexels.com/photos/6585962/pexels-photo-6585962.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    title: "Drain Cleaning",
    provider: "FlowFix Certified Team",
    rating: 4.7,
    reviews: 275,
    price: "From $120.00",
    description:
      "Thorough drain cleaning using hydro-jetting and snaking techniques to clear stubborn clogs and keep your pipes flowing freely.",
    image:
      "https://images.pexels.com/photos/4218860/pexels-photo-4218860.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    title: "Emergency Plumbing",
    provider: "FlowFix Certified Team",
    rating: 4.9,
    reviews: 410,
    price: "24/7 Service",
    description:
      "24/7 emergency plumbing services with rapid response. Burst pipes, sewage backups, and major leaks handled immediately.",
    image:
      "https://images.pexels.com/photos/8105045/pexels-photo-8105045.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const services: Service[] = rawServices.map((service) => ({
  ...service,
  slug: generateSlug(service.title),
}));