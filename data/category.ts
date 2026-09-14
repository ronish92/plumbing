import { ICategory } from "@/models/category";
import slugify from "slugify";

export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export const rawCategories: ICategory[] = [
  {
    id: 1,
    title: "Plumbing",
    image: "/images/c1.png",
  },
  {
    id: 2,
    title: "Electrical",
    image: "/images/c2.png",
  },
  {
    id: 3,
    title: "Construction", 
    image: "/images/c3.png",
  },
  {
    id: 4,
    title: "Painting",
    image: "/images/c4.png",
  },
  {
    id: 5,
    title: "Carpentry",
    image: "/images/c5.png",
  },
  {
    id: 6,
    title: "PetCare",
    image: "/images/c6.png",
  },
]

export const categories: ICategory[] = rawCategories .map((category) => ({
  ...category,
  slug: generateSlug(category.title),
}));