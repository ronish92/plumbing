"use client"

import { useState } from "react"
import { Building2, SquarePen } from "lucide-react"
import { Image } from "@/components/ui/image"

import { Button } from "@/components/ui/button"
import { AboutUsForm } from "./about-us-modal"
import Modal from "@/components/ui/modal"

export interface IAboutUs {
  id: string
  title: string
  subtitle: string
  description: string[]
  createdAt?: string
  images: string[]
}

export function AboutUsManager() {
  const [editingAboutUs, setEditingAboutUs] = useState<IAboutUs | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleEdit = (aboutUs: IAboutUs) => {
    setEditingAboutUs(aboutUs)
    setShowForm(true)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingAboutUs(null)

    // Later:
    // refetch About Us data here
  }

  // Temporary static data
  // Replace this with API data later
  const aboutUs: IAboutUs = {
    id: "00",
    title: "Complete Care for Your Home, Property, and Pets",
    subtitle:
      "From emergency plumbing and structural renovation to loving pet care—we handle it all",
    description: [
      "At OmniHome Solutions, we believe that running a household should be stress-free. That is why we have brought every essential home service under one reliable roof. Whether you need a licensed electrician for urgent wiring, a skilled crew for structural remodeling, a fresh coat of paint, or a certified specialist to care for your pets while you are away, our team is equipped to handle your home's diverse needs with absolute precision.",
      "By combining trade expertise with everyday lifestyle support, we eliminate the hassle of managing multiple contractors. Our vetted professionals bring years of experience, strict safety protocols, and a commitment to quality to every single job. From fixing a burst pipe and pouring concrete to walking your dog and grooming your cat, we treat your property and your family with the utmost respect.",
    ],
    images: ["/images/gaspipe.png", "/images/burst.jpg"],
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Building2 className="h-5 w-5 text-blue-600" />
            Company Description
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Manage the company description displayed on your website.
          </p>
        </div>
      </div>

      {/* About Us Card */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="p-6">
          {/* Card Header */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <span className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                About Us
              </span>

              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {aboutUs.title}
              </h3>

              <p className="mt-2 text-sm font-medium text-gray-500">
                {aboutUs.subtitle}
              </p>
            </div>

            {/* Edit Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(aboutUs)}
              className="shrink-0 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
            >
              <SquarePen className="mr-1.5 h-4 w-4" />
              Edit
            </Button>
          </div>

          {/* Images */}
          {aboutUs.images?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {aboutUs.images.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative h-40 w-40 overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                >
                  <Image
                    src={image}
                    alt={`About Us image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mt-6 space-y-4">
            {aboutUs.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-sm leading-7 text-gray-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit About Us Component"
        isOpen={showForm}
        onClose={() => {
          setShowForm(false)
          setEditingAboutUs(null)
        }}
        size="xl"
      >
        <AboutUsForm
          company={editingAboutUs}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false)
            setEditingAboutUs(null)
          }}
        />
      </Modal>
    </div>
  )
}