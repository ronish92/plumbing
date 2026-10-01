
"use client"

import { useRef, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Upload,
  ImageIcon,
  X,
  Plus,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IAboutUs } from "./about-us"


const aboutUsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z
    .string()
    .min(1, "Subtitle is required")
    .max(500, "Subtitle is too long"),

  description: z
    .array(
      z.object({
        text: z.string().min(1, "Description cannot be empty"),
      })
    )
    .min(1, "At least one description is required"),
})

type AboutUsFormData = z.infer<typeof aboutUsSchema>

interface AboutUsFormProps {
  company?: IAboutUs | null
  onSuccess: () => void
  onCancel: () => void
}

export function AboutUsForm({
  company,
  onSuccess,
  onCancel,
}: AboutUsFormProps) {
  const [uploading, setUploading] = useState(false)

  // Existing image URLs
  const [imagePreviews, setImagePreviews] = useState<
    (string | null)[]
  >([
    company?.images?.[0] || null,
    company?.images?.[1] || null,
  ])

  // Newly selected files
  const [imageFiles, setImageFiles] = useState<
    (File | null)[]
  >([null, null])

  // Separate file inputs for the two image slots
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AboutUsFormData>({
    resolver: zodResolver(aboutUsSchema),

   defaultValues: {
  title: company?.title || "",
  subtitle: company?.subtitle || "",
  description: company?.description?.length
    ? company.description.map((text) => ({
        text,
      }))
    : [{ text: "" }],
},
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "description",
  })

  /*
   * Handle image selection
   */
  const handleImageChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    // Optional validation
    if (!file.type.startsWith("image/")) {
      return
    }

    // Clean up previous object URL
    if (imagePreviews[index]?.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreviews[index]!)
    }

    const previewUrl = URL.createObjectURL(file)

    setImagePreviews((prev) => {
      const updated = [...prev]
      updated[index] = previewUrl
      return updated
    })

    setImageFiles((prev) => {
      const updated = [...prev]
      updated[index] = file
      return updated
    })
  }

  /*
   * Remove image from a slot
   */
  const removeImage = (index: number) => {
    const preview = imagePreviews[index]

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview)
    }

    setImagePreviews((prev) => {
      const updated = [...prev]
      updated[index] = null
      return updated
    })

    setImageFiles((prev) => {
      const updated = [...prev]
      updated[index] = null
      return updated
    })

    if (fileInputRefs[index].current) {
      fileInputRefs[index].current!.value = ""
    }
  }

  /*
   * Submit
   */
  const onSubmit = async (formData: AboutUsFormData) => {
    try {
      setUploading(true)


      console.log("Form data:", formData)
      console.log("Image files:", imageFiles)

  

      // Example:
      //
      const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description.map(
        (item) => item.text
      ),
    }
      //
      // if (imageFiles[0]) {
      //   payload.append("images", imageFiles[0])
      // }
      //
      // if (imageFiles[1]) {
      //   payload.append("images", imageFiles[1])
      // }
      //
      // await updateAboutUs(payload)

      onSuccess()
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
      

        <div className="space-y-5">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Title *
            </label>

            <Input
              id="title"
              placeholder="e.g. Complete Care for Your Home"
              {...register("title")}
              className={
                errors.title ? "border-red-300" : ""
              }
            />

            {errors.title && (
              <p className="mt-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Subtitle */}
          <div>
            <label
              htmlFor="subtitle"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Subtitle *
            </label>

            <Input
              id="subtitle"
              placeholder="A short overview of your company"
              {...register("subtitle")}
              className={
                errors.subtitle ? "border-red-300" : ""
              }
            />

            {errors.subtitle && (
              <p className="mt-1 text-xs text-red-600">
                {errors.subtitle.message}
              </p>
            )}
          </div>
        </div>

      

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Description
              </h3>

              <p className="text-xs text-gray-500">
                Add one or more paragraphs about your company.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ text: "" })}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add Paragraph
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    Paragraph {index + 1}
                  </span>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <textarea
                  {...register(`description.${index}.text`)}
                  rows={3}
                  placeholder="Write a paragraph about your company..."
                  className={`w-full resize-y rounded-md border bg-white px-3 py-2 text-sm outline-none transition focus:border-orange-400 focus:ring-1 focus:ring-orange-400 ${
                    errors.description?.[index]
                      ? "border-red-300"
                      : "border-gray-200"
                  }`}
                />

                {errors.description?.[index]?.text && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.description[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* IMAGES                                   */}
      

        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Images
            </h3>

            <p className="text-xs text-gray-500">
              Upload up to two images for the About Us section.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[0, 1].map((index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-gray-50 p-3"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Image {index + 1}
                  </span>

                  {imagePreviews[index] && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {imagePreviews[index] ? (
                  <>
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200">
                      <img
                        src={imagePreviews[index]!}
                        alt={`About Us image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        fileInputRefs[index].current?.click()
                      }
                      className="mt-3 w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Change Image
                    </Button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRefs[index].current?.click()
                    }
                    className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white transition hover:border-orange-400 hover:bg-orange-50"
                  >
                    <ImageIcon className="mb-2 h-7 w-7 text-gray-400" />

                    <span className="text-xs font-medium text-gray-600">
                      Upload Image
                    </span>

                    <span className="mt-1 text-[11px] text-gray-400">
                      Image {index + 1}
                    </span>
                  </button>
                )}

                <input
                  ref={fileInputRefs[index]}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) =>
                    handleImageChange(index, event)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* ========================================= */}
        {/* ACTIONS                                  */}
        {/* ========================================= */}

        <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting || uploading}
            className="w-full bg-orange-500 text-white hover:bg-orange-600 sm:w-auto"
          >
            {isSubmitting || uploading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
                Updating...
              </>
            ) : (
              "Update Company"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

