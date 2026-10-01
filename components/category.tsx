'use client';

import { ICategory } from "@/models/category";
import { useQuery } from '@tanstack/react-query';
import { GetAllCategory } from '@/models/category';
import Link from 'next/link';
import { ChevronRight, MoveRight } from 'lucide-react';
import { Heading } from './ui/heading';
import { Image } from './ui/image';
import slugify from "slugify";

export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}



  export default function CategoryNavigation() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["GetAllCategory"],
    queryFn: GetAllCategory,
  })

    const categories: ICategory[] = data?.data ?? []


  return (
    <>
      <Heading as="h2" textAlign="text-center">
        Category
      </Heading>

      <nav
        aria-label="Category navigation"
        className="mx-auto w-full max-w-6xl bg-white px-4 py-8"
      >
        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4"
              >
                <div className="h-24 w-24 animate-pulse rounded-lg bg-gray-200" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <p className="py-8 text-center text-sm text-red-500">
            Failed to load categories.
          </p>
        ) : categories.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            No categories available.
          </p>
        ) : (
          <div className="grid grid-cols-1 items-center gap-y-6 sm:grid-cols-2 lg:grid-cols-6">
            {categories.map((category, index) => {
              const slug = generateSlug(category.name)
              const image = category.fileList?.[0]

              return (
                <Link
                  key={category.id}
                  href={`/categories/${slug}`}
                  className={`group relative flex cursor-pointer select-none items-center justify-between gap-4 rounded-md px-6 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 lg:flex-col lg:justify-center ${
                    index !== categories.length - 1
                      ? "lg:border-r lg:border-slate-200"
                      : ""
                  }`}
                >
                  {/* Category Image */}
                  <div className="transform transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105">
                    {image ? (
                      <Image
                        src={image}
                        alt={category.name}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-[100px] w-[100px] rounded-lg bg-gray-100" />
                    )}
                  </div>

                  {/* Category Name + Arrow */}
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-base font-medium tracking-wide text-orange-400 transition-colors duration-300">
                      {category.name}
                    </span>

                    <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden text-orange-400">
                      {/* Circle Chevron */}
                      <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:translate-x-4 group-hover:opacity-0 group-focus-visible:translate-x-4 group-focus-visible:opacity-0">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-current">
                          <ChevronRight className="h-3 w-3 stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Long Arrow */}
                      <div className="absolute inset-0 flex -translate-x-4 items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                        <MoveRight className="h-5 w-8 stroke-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </nav>
    </>
  )
}
