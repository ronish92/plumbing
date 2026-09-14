'use client';


import Link from 'next/link';
import { ChevronRight, MoveRight } from 'lucide-react';
import { Heading } from './ui/heading';
import { Image } from './ui/image';
import { categories } from '@/data/category';



export default function CategoryNavigation() {


  return (
    <>
    <Heading as="h2" textAlign="text-center">Category</Heading>
    <nav aria-label="Category navigation" className="w-full max-w-6xl mx-auto px-4 py-8 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 items-center gap-y-6">
        {categories.map((category, index) => (
          <Link
            key={category.id}
             href={`/categories/${category.slug}`}
            className={`flex items-center justify-between lg:justify-center lg:flex-col gap-4 px-6 relative group cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded-md
              ${index !== categories.length - 1 ? 'lg:border-r lg:border-slate-200' : ''}`}
          >
            {/* Visual Icon Accent */}
            <div className="transform transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105">
              <Image
          src={category.image}
          alt={category.title}
          
          className="object-cover rounded-lg"  
          width={100}
          height={100}
        /> 
            </div>

            {/* Label and Morphing Arrow Button */}
            <div className="flex items-center gap-2 mt-1">
              <span className= "text-base font-medium tracking-wide transition-colors duration-300 text-orange-400" >
                {category.title}
              </span>
              
              {/* Arrow Container with fixed width so text doesn't jump */}
              <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden text-orange-400">
                
                {/* Standard Circle Chevron (Fades and slides out to the right) */}
                <div className="absolute inset-0 flex items-center justify-center transform transition-all duration-300 ease-in-out group-hover:translate-x-4 group-hover:opacity-0 group-focus-visible:translate-x-4 group-focus-visible:opacity-0">
                  <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
                    <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                  </div>
                </div>

                {/* Long Arrow Icon (Slides in from the left) */}
                <div className="absolute inset-0 flex items-center justify-center transform -translate-x-4 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  <MoveRight className="w-8 h-5 stroke-1" />
                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
    </>
  );
}
