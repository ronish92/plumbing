import slugify from "slugify";
import { IService } from "@/models/service"; 



export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

const rawServices: IService[] = [
 {
  "id": "srv-92834",
  "title": "Premium House Painting",
  "description": "Full-service interior and exterior residential painting with premium eco-friendly materials.",
  "ratings": 4.8,
  "price": 1250.00,
  "isActive": true,
  "filePath": "https://images.pexels.com/photos/5583116/pexels-photo-5583116.jpeg",
  "worker": "Ronish Karki",
  "warranty": "2 Years",
  "teamSize": "3",
  "response": "Within 2 hours",
  "duration": "3-5 Days",
  "features": "Eco-friendly paint, Surface priming, Post-job cleanup, Color consultation",
  "category": "Painting",
  "comments": 14,
  "createdBy": "Admin-1",
  "updatedBy": "Admin-2",
  "createdAt": "2026-08-15T10:30:00Z",
  "updatedAt": "2026-08-27T07:15:22Z",
  "reviews" : [
    {
    name: "Emily Johnson",
    message: "Absolutely love this product! It exceeded my expectations and arrived super fast.",
    rating: 5,
    created_at: "2026-08-28T14:32:00.000Z"
  },
  {
    name: "Michael Chen",
    message: "Good quality for the price. The setup took a bit longer than expected, but it works perfectly now.",
    rating: 4,
    created_at: "2026-08-30T09:15:00.000Z"
  },
  {
    name: "Sarah Martinez",
    message: "The item arrived damaged. Customer service was helpful, but I am still waiting for my replacement.",
    rating: 2,
    created_at: "2026-09-01T11:45:00.000Z"
  }
  ]
},
{
  "id": "2",
  "title": "Pipe Installation & Repair",
  "description": "Professional pipe fitting and installation for new construction and remodeling projects using premium materials and code-compliant methods.",
  "ratings": 4.8,
  "price": 150.00,
  "isActive": true,
  "filePath": "https://images.pexels.com/photos/4219592/pexels-photo-4219592.jpeg?auto=compress&cs=tinysrgb&w=600",
  "worker": "Sandesh Karki",
  "warranty": "3 Years",
  "teamSize": "3",
  "response": "Within 2 hours",
  "category": "Plumbing",
  "duration": "3-5 Days",
  "features": "Eco-friendly paint, Surface priming, Post-job cleanup, Color consultation",
  "comments": 210,
  "createdBy": "Admin-1",
  "updatedBy": "Admin-2",
  "createdAt": "2026-08-15T10:30:00Z",
  "updatedAt": "2026-08-27T07:15:22Z"
},
{
  "id": "3",
  "title": "Water Heater Services",
  "description": "Installation, repair, and maintenance of all water heater types including tankless, traditional, and hybrid systems.",
  "ratings": 4.9,
  "price": 210.00,
  "isActive": true,
  "filePath": "https://images.pexels.com/photos/8099147/pexels-photo-8099147.jpeg?auto=compress&cs=tinysrgb&w=600",
  "worker": "Ronish Karki",
  "category": "Electricity",
  "warranty": "3 Years",
  "teamSize": "3",
  "response": "Within 2 hours",
  "duration": "3-5 Days",
  "features": "Eco-friendly paint, Surface priming, Post-job cleanup, Color consultation",
  "comments": 210,
  "createdBy": "Admin-1",
  "updatedBy": "Admin-2",
  "createdAt": "2026-08-15T10:30:00Z",
  "updatedAt": "2026-08-27T07:15:22Z"
},
{
  "id": "4",
  "title": "Smart Home Security Camera",
  "description": "Installation or repair of CCTV cameras for your security and peace of mind ",
  "ratings": 4.9,
  "price": 210.00,
  "isActive": true,
  "filePath": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  "worker": "Ronish Karki",
  "category": "Electricity",
  "warranty": "3 Years",
  "teamSize": "3",
  "response": "Within 2 hours",
  "duration": "3-5 Days",
  "features": "Eco-friendly paint, Surface priming, Post-job cleanup, Color consultation",
  "comments": 210,
  "createdBy": "Admin-1",
  "updatedBy": "Admin-2",
  "createdAt": "2026-08-15T10:30:00Z",
  "updatedAt": "2026-08-27T07:15:22Z"
},
];

export const services: IService[] = rawServices .map((service) => ({
  ...service,
  slug: generateSlug(service.title),
}));

