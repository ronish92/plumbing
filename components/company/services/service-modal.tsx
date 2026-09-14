"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { IService } from "@/models/service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  Upload,
  ImageIcon,
  X,
  User,
  Clock,
  ShieldCheck,
  Users,
  IndianRupee,
  Calendar,
} from "lucide-react";

const serviceSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description is too long"),

  features: z
    .string()
    .min(1, "Features are required")
    .max(5000, "Features are too long"),
  worker: z
    .string()
    .min(1, "Worker is required"),
  price: z
    .string()
    .min(1, "Price is required"),
  warranty: z.string().optional(),

  teamSize: z.string().optional(),

  response: z.string().optional(),

  duration: z.string().optional(),

  isActive: z.boolean(),

 
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  service?: IService | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ServiceForm({
  service,
  onSuccess,
  onCancel,
}: ServiceFormProps) {
  const [uploading, setUploading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(
    service?.filePath || null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: service?.title || "",
      description: service?.description || "",
      features: service?.features || "",
      isActive: service?.isActive ?? true,
      worker: service?.worker || "",
      price: service?.price || "",
      warranty: service?.warranty || "",
      teamSize: service?.teamSize || "",
      response: service?.response || "",
      duration: service?.duration || "",
   
    },
  });

  const description = watch("description");
  const features = watch("features");
  const isActive = watch("isActive");

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Later:
    // upload the file to API/cloud storage
    // and save the returned URL
  };

  const removeImage = () => {
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (formData: ServiceFormData) => {
    try {
      console.log("Service form data:", formData);

      // API logic will go here

      onSuccess();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6">


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Service Title *
              </label>

              <Input
                id="title"
                placeholder="e.g. Premium House Painting"
                {...register("title")}
                className={errors.title ? "border-red-300" : ""}
              />

              {errors.title && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description *
                </label>

                <span className="text-xs text-gray-400">
                  {description?.length || 0}/500
                </span>
              </div>

              <Textarea
                id="description"
                placeholder="Briefly describe what this service includes..."
                rows={4}
                {...register("description")}
                className={errors.description ? "border-red-300" : ""}
              />

              {errors.description && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Features */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Service Features *
                </label>

                <span className="text-xs text-gray-400">
                  {features?.length || 0}/5000
                </span>
              </div>

              <Textarea
                placeholder={`• Eco-friendly materials
• Surface preparation
• Professional installation
• Post-service cleanup`}
                rows={5}
                {...register("features")}
                className={errors.features ? "border-red-300" : ""}
              />

              <p className="mt-1 text-xs text-gray-400">
                One feature per line.
              </p>

              {errors.features && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.features.message}
                </p>
              )}
            </div>

            {/* Service Details - NOW BELOW FEATURES */}
            {service && (
              <div className="rounded-lg border border-gray-200 p-4">
  <div className="mb-4">
    <h4 className="font-medium text-gray-900">
      Service Details
    </h4>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
    {/* Worker */}
    <div>
      <label
        htmlFor="worker"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Worker *
      </label>

      <Input
        id="worker"
        placeholder="Assigned worker"
        {...register("worker")}
        className={errors.worker ? "border-red-300" : ""}
      />

      {errors.worker && (
        <p className="mt-1 text-xs text-red-600">
          {errors.worker.message}
        </p>
      )}
    </div>

    {/* Price */}
    <div>
      <label
        htmlFor="price"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Price *
      </label>

      <Input
        id="price"
        type="number"
        placeholder="0.00"
        {...register("price")}
        className={errors.price ? "border-red-300" : ""}
      />

      {errors.price && (
        <p className="mt-1 text-xs text-red-600">
          {errors.price.message}
        </p>
      )}
    </div>

    {/* Team Size */}
    <div>
      <label
        htmlFor="teamSize"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Team Size
      </label>

      <Input
        id="teamSize"
        placeholder="e.g. 3 workers"
        {...register("teamSize")}
      />
    </div>

    {/* Duration */}
    <div>
      <label
        htmlFor="duration"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Duration
      </label>

      <Input
        id="duration"
        placeholder="e.g. 2-3 days"
        {...register("duration")}
      />
    </div>

    {/* Response Time */}
    <div>
      <label
        htmlFor="response"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Response Time
      </label>

      <Input
        id="response"
        placeholder="e.g. Within 2 hours"
        {...register("response")}
      />
    </div>

    {/* Warranty */}
    <div>
      <label
        htmlFor="warranty"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Warranty
      </label>

      <Input
        id="warranty"
        placeholder="e.g. 2 Years"
        {...register("warranty")}
      />
    </div>

    {/* Rating */}
    {/* <div className="sm:col-span-2">
      <label
        htmlFor="ratings"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Rating
      </label>

      <Input
        id="ratings"
        type="number"
        step="0.1"
        min="0"
        max="5"
        {...register("ratings")}
      />
    </div> */}

  </div>
</div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Service Image
                </h3>

                <p className="text-xs text-gray-500">
                  Add an image for this service
                </p>
              </div>

              {imagePreview ? (
                <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={imagePreview}
                    alt="Service preview"
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
                  >
                    <X className="h-4 w-4 text-gray-700" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:border-orange-400 hover:bg-orange-50"
                >
                  <ImageIcon className="mb-2 h-7 w-7 text-gray-400" />

                  <span className="text-xs font-medium text-gray-600">
                    Upload Image
                  </span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {imagePreview && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 w-full"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Change Image
                </Button>
              )}
            </div>

            {/* Status */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Service Status
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {isActive
                      ? "Visible to customers"
                      : "Hidden from customers"}
                  </p>
                </div>

                <Switch
                  checked={isActive}
                  onCheckedChange={(checked) =>
                    setValue("isActive", checked)
                  }
                />
              </div>
            </div>

            {/* Metadata */}
            {service && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">
                  Record Information
                </h3>

                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    Created:{" "}
                    {service.createdAt
                      ? new Date(service.createdAt).toLocaleDateString()
                      : "N/A"}
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    Updated:{" "}
                    {service.updatedAt
                      ? new Date(service.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
              </div>
            )}

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
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
                {service ? "Updating..." : "Creating..."}
              </>
            ) : service ? (
              "Update Service"
            ) : (
              "Create Service"
            )}
          </Button>
        </div>
          </div>
         
        </div>

        {/* Actions */}
        
      </form>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-0.5 text-gray-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="truncate font-medium text-gray-800">
          {value}
        </p>
      </div>
    </div>
  );
}