import { Suspense } from 'react'
import { notFound } from 'next/navigation';
import CategoryServicepage from '@/components/category_service';
import { categories } from '@/data/category';
import { services } from "@/data/service"

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function CategoryDetailPage({ params }: PageProps) {
 
  const {slug} = await params;

    const category = categories.find(
    (category) => category.slug === slug
  );
 
  
  if (!category) {
    notFound();
  }

  const categoryServices = services.filter(
    (service) =>
      service.category.trim().toLowerCase() ===
      category.title.trim().toLowerCase()
  )

  return (   
    <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
  <CategoryServicepage 
  categories = {categories}
  services={categoryServices}
   />
</Suspense>
  )
}