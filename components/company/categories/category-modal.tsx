"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {  X, User,  Upload, File } from "lucide-react";
import { toast } from "sonner";

import { ICategory } from "@/models/category";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const categorySchema = z.object({
  name: z.string().min(2, "First name is required").max(100),
 
})




type CategoryFormData = z.infer<typeof categorySchema>;


interface CategoryFormProps {
 
  category: ICategory | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CategoryForm({
   category,
    onSuccess
    , onCancel
   }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
   const [uploading, setUploading] = useState(false);

  const [profilePreview, setProfilePreview] = useState<string | null>(category?.fileList[0] || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      
    }
  });



 const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfilePreview(previewUrl);

    // Later:
    // upload the file to API/cloud storage
    // and save the returned URL
  };

  const removeImage = () => {
    setProfilePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };



  const onSubmit = async (formData: CategoryFormData) => {
    try {
      setLoading(true);
      
     console.log("Service form data:", formData);
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message || ("Failed to create employee"));
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
   
    <div className="space-y-4">

      {/* Profile */}
      <div className="bg-gray-50 rounded-xl p-4">
       

        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {profilePreview ? (
              <>
                <img
                  src={profilePreview}
                  alt="Profile preview"
                  className="h-24 w-24 rounded-full object-cover border-2 border-white shadow"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-red-50"
                >
                  <X className="h-3.5 w-3.5 text-gray-600" />
                </button>
              </>
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white border-2 border-orange-200">
                <File className="h-10 w-10 text-orange-500" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="font-medium text-gray-900">
              Category Logo
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Square image recommended
            </p>

            <div className="flex gap-2 mt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {profilePreview ? "Change" : "Upload"}
              </Button>

              {profilePreview && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeImage}
                  className="text-red-600 hover:bg-red-50"
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>


      {/* Basic Information */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <User className="h-5 w-5 text-orange-600" />
          Category Name
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

     

          {/* First Name */}
          <div>
           

            <Input
              {...register("name")}
              placeholder="eg. Electricity"
              className={errors.name ? "border-red-300" : ""}
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
      </div>

    </div>





  {/* Form Actions */}
  <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 py-5 px-5 pt-4 border-t border-gray-200">

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
      disabled={isSubmitting || loading}
      className="w-full sm:w-auto bg-orange-500 text-white hover:bg-lime"
    >
      {isSubmitting || loading ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
          {category ? "Updating..." : "Creating..."}
        </>
      ) : (
        category ? "Update Category" : "Create Category"
      )}
    </Button>

  </div>

</form>
  );
}