"use client";

import { useRef, useState } from "react";
import { IService } from "@/models/service";



import { ImageIcon, Calendar } from "lucide-react";



interface ServiceFormProps {
  service?: IService | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ServiceForm({
  service,
 
}: ServiceFormProps) {


  const [imagePreview, setImagePreview] = useState<string | null>(
    service?.filePath || null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);



  return (
    <div className="p-4 sm:p-6">


      <form
     
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
                Service Title 
              </label>

              <span className="text-xs text-gray-600">
        {service?.title}
      </span>

             
            </div>

            {/* Description */}
            <div>
              <div className="mb-1.5 items-center">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                
              </div>
              <span className="text-xs text-gray-600">
                  {service?.description}
                </span>
            </div>

            {/* Features */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Service Features 
                </label>

             
              </div>         

              <p className="mt-1 text-xs text-gray-600">
                {service?.features}
              </p>
            </div>

           
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

       <span className="text-xs text-gray-400">
                  {service?.worker}
                </span>
    </div>

    {/* Price */}
    <div>
      <label
        htmlFor="price"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Price *
      </label>

      <span className="text-xs text-gray-400">
                  {service?.price}
                </span>
    </div>

    {/* Team Size */}
    <div>
      <label
        htmlFor="teamSize"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Team Size
      </label>

     <span className="text-xs text-gray-400">
                  {service?.teamSize}
                </span>
    </div>

    {/* Duration */}
    <div>
      <label
        htmlFor="duration"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Duration
      </label>

      <span className="text-xs text-gray-400">
                  {service?.duration}
                </span>
    </div>

    {/* Response Time */}
    <div>
      <label
        htmlFor="response"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Response Time
      </label>

     <span className="text-xs text-gray-400">
                  {service?.response}
                </span>
    </div>

    {/* Warranty */}
    <div>
      <label
        htmlFor="warranty"
        className="mb-1.5 block text-sm font-medium text-gray-700"
      >
        Warranty
      </label>

    <span className="text-xs text-gray-400">
                  {service?.warranty}
                </span>
    </div>


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

             
              </div>

              {imagePreview ? (
                <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={imagePreview}
                    alt="Service preview"
                    className="h-full w-full object-cover"
                  />

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
              
            </div>

            {/* Status */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Service Status
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {service?.isActive
                      ? "Visible to customers"
                      : "Hidden from customers"}
                  </p>
                </div>
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
          </div>
         
        </div>
        
      </form>
    </div>
  );
}

