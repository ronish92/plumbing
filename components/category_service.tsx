"use client"

import { Star, ChevronDown, Wrench, Zap, Hammer, Paintbrush, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IService } from "@/models/service"
import { ICategory } from "@/models/category"


function PopularCard({
  service,
  onClick,
}: {
  service: IService
  onClick: () => void
}) {
  return (
    <Card
      onClick={onClick}
      className="group overflow-hidden border-gray-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
    >
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={service.filePath || "/placeholder.svg"}
            alt={service.title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Service badge */}
          <Badge className="absolute left-3 top-3 bg-orange-400 text-black">
            {service.category}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900">
            {service.title}
          </h3>

          {/* Rating */}
          <div className="mb-3 flex items-center gap-1.5">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(service.ratings)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <span className="text-sm text-gray-500">
              {service.ratings?.toFixed(1)} ({service.comments})
            </span>
          </div>

          {/* Price */}
          <div className="mb-3 flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              Rs. {service.price}
            </span>
            <span className="text-xs text-gray-500">starting price</span>
          </div>

          {/* Provider */}
          <div className="mb-4 text-sm text-gray-500">
            Provided by{" "}
            <span className="font-medium text-gray-800">
              {service.worker}
            </span>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
            className="w-full bg-orange-400 text-white hover:bg-[#9FEF00]"
          >
            View Service
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const normalizeCategory = (value: string) =>
  value.trim().toLowerCase()

interface CategoryServicePageProps {
  services: IService[];

   categories: ICategory[]

}

export default function CategoryServicepage({ categories, services} : CategoryServicePageProps ) {

  const router = useRouter()
    const searchParams = useSearchParams()

  const handleCardClick = (slug: string) => {
    router.push(`/services/${slug}`)
  }


const filteredServices = services
const selectedCategory = searchParams.get("category")

  // const filteredServices = selectedCategory
  // ? services.filter(
  //     (service) =>
  //       normalizeCategory(service.category!) ===
  //       normalizeCategory(selectedCategory)
  //   )
  // : services

  const handleCategoryChange = (slug: string) => {
  router.push(
    `/categories/${slug}`
  )
}



const currentCategory = categories.find(
  (category) =>
    normalizeCategory(category.slug!) ===
    normalizeCategory(selectedCategory ?? "")
)

const currentCategoryName =
  currentCategory?.title ?? "Featured Services"

  return (
    <div className="min-h-screen bg-gray-50 py-36">
      <div className="container mx-auto px-6 py-6 lg:px-10">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>       

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
               {selectedCategory
        ? `${currentCategoryName} Services`
        : "Featured Services"}
            </h1>
          </div>

          {/* Category dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-fit gap-2 border-gray-300 bg-white"
              >
                Change Category
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52">
              {categories.map((category) => {
              

                return (
                  <DropdownMenuItem
                    key={category.id}
                     onClick={() =>
              handleCategoryChange(category.slug!)
            }
                    className="cursor-pointer"
                  >
                  
                    {category.title}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Trust banner */}
        <div className="mb-8 rounded-xl border border-gray/40 bg-orange-400/10 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-orange-300 p-2">
              <ShieldCheck className="h-5 w-5 text-black" />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Trusted professionals
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-gray-600">
                We help you connect with reliable service providers based on
                ratings, reviews, and service history.
              </p>
            </div>
          </div>
        </div>

        {/* Results row */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-gray-500 mb-5">
  {filteredServices.length}{" "}
  {filteredServices.length === 1 ? "service" : "services"} available
</p>
        </div>

        {/* Service grid */}
        {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.map((service) => (
            <PopularCard
              key={service.id}
              service={service}
              onClick={() => {
                if (service.slug) {
                  handleCardClick(service.slug)
                }
              }}
            />
          ))}
        </div>
        ) : (
  <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center">
    <h3 className="text-lg font-semibold text-gray-900">
      No services available
    </h3>

    <p className="mt-2 text-sm text-gray-500">
      We don't have any services in this category yet.
    </p>
  </div>
)}

        {/* Load more */}
        {services.length > 0 && (
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              className="border-gray-300 bg-white px-8 hover:bg-gray-100"
            >
              Load More Services
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}