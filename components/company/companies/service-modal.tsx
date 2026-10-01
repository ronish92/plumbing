"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { ICompany } from "@/models/comany";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import {
  Upload,
  ImageIcon,
  X,
  Calendar,
  Nut,
  ReceiptText,
  Server,
  Cog,
  Globe,
} from "lucide-react";

const companySchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 2 characters")
    .max(50, "Title is too long"),
  address: z
    .string().max(500, "Description is too long"),
  facebook: z .string(),
  contactPerson: z.string(),
  phone: z.string(),
  email: z.string().optional(),
  instagram: z.string().optional(),


  isVerified: z.boolean(),

 
});

type ServiceFormData = z.infer<typeof companySchema>;

interface CompanyFormProps {
  company?: ICompany | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CompanyForm({
  company,
  onSuccess,
  onCancel,
}: CompanyFormProps) {
  const [uploading, setUploading] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(
    company?.logoUrl || null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company?.name || "",
      address: company?.address || "",
      facebook: company?.facebook || "",
      isVerified: company?.isVerified ?? true,
      instagram: company?.instagram || "",
      contactPerson: company?.contactPerson || "",
       phone: company?.phone || "",
      email: company?.email || "",
   
   
    },
  });


  const isActive = watch("isVerified");

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
                Company Name *
              </label>

              <Input
                id="title"
                placeholder="e.g. Premium House Painting"
                {...register("name")}
                className={errors.name ? "border-red-300" : ""}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="title"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Address *
              </label>

              <Input
                id="title"
                placeholder="e.g. Kathmandu"
                {...register("address")}
                className={errors.address ? "border-red-300" : ""}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.address?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="title"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Contact Person *
              </label>

              <Input
                id="title"
                placeholder="e.g. Premium House Painting"
                {...register("contactPerson")}
                className={errors.name ? "border-red-300" : ""}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.contactPerson?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="facebook"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Facebook Link
              </label>

              <Input
                id="facebook"
                placeholder="e.g. Premium House Painting"
                {...register("facebook")}
                className={errors.facebook ? "border-red-300" : ""}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.facebook?.message}
                </p>
              )}
            </div>

              <div>
              <label
                htmlFor="facebook"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Instagram Link
              </label>

              <Input
                id="facebook"
                placeholder="e.g. Premium House Painting"
                {...register("instagram")}
                className={errors.facebook ? "border-red-300" : ""}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.instagram?.message}
                </p>
              )}
            </div>
             <div>
              <label
                htmlFor="facebook"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <Input
                id="facebook"
                placeholder="email address"
                {...register("email")}
                className={errors.email ? "border-red-300" : ""}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email?.message}
                </p>
              )}
            </div>
             <div>
              <label
                htmlFor="facebook"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Phone number
              </label>

              <Input
                id="facebook"
                placeholder="e.g. **********"
                {...register("phone")}
                className={errors.phone ? "border-red-300" : ""}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.phone?.message}
                </p>
              )}
            </div>


           
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Company Logo
                </h3>

             
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
                    Company Status
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {company?.isVerified
                      ? "Verified"
                      : "Not verified yet"}
                  </p>
                </div>

                <Switch
                  checked={isActive}
                  onCheckedChange={(checked) =>
                    setValue("isVerified", checked)
                  }
                />
              </div>
            </div>

      
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
  <h3 className="mb-4 text-sm font-semibold text-gray-900 tracking-tight">
    Record Information
  </h3>
  <div className="space-y-1 text-sm">
    {/* License Number */}
    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
      <div className="flex items-center gap-2 text-gray-500">
        <ReceiptText className="h-4 w-4 text-gray-400" />
        <span>License No.</span>
      </div>
      <span className="font-medium text-gray-900">
        {company?.licenseNumber || "—"}
      </span>
    </div>

    <div className="flex items-center justify-between border-b border-gray-50 pb-2">
      <div className="flex items-center gap-2 text-gray-500">
        <Cog className="h-4 w-4 text-gray-400" />
        <span>Jobs Completed</span>
      </div>
      <span className="font-semibold text-gray-900">
        {company?.completedJobsCount?.toLocaleString() || "0"}
      </span>
    </div>

    {/* Website */}
    <div className="flex items-center justify-between pt-1">
      <div className="flex items-center gap-2 text-gray-500">
        <Globe className="h-4 w-4 text-gray-400" />
        <span>Website</span>
      </div>
      {company?.websiteUrl ? (
        <a 
          href={company.websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="font-medium text-orange-600 hover:underline"
        >
          Visit site
        </a>
      ) : (
        <span className="text-gray-400">Not provided</span>
      )}
    </div>
  </div>
</div>

         

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
                {company ? "Updating..." : "Creating..."}
              </>
            ) : company ? (
              "Update Company"
            ) : (
              "Create Company"
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

