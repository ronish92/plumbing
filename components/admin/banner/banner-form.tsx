"use client";

import { useState, useRef } from "react";
import { IBanner } from "@/models/banner"; 
import { Button } from "@/components/ui/button";
import { X, Upload, Image as ImageIcon, Camera } from "lucide-react";
import { toast } from "sonner";





interface BannerSlideFormProps {
  slide?: IBanner | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function BannerSlideForm({ slide, onSuccess, onCancel }: BannerSlideFormProps) {
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(slide?.filePath || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);





  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (PNG, JPG, JPEG, GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    
    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setSelectedFile(file);
      setIsImageChanged(true);
      toast.success("New image selected");
    } catch (error) {
      toast.error("Failed to process image");
      setImagePreview(slide?.filePath || null);
      setSelectedFile(null);
      setIsImageChanged(false);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    // If editing, show upload area. If creating, keep empty.
    if (slide) {
      setImagePreview(null); // Hide current image preview
    } else {
      setImagePreview(null);
    }
    setSelectedFile(null);
    setIsImageChanged(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Image cleared. Select a new image or keep empty.");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async () => {
    try {
    
      if (!slide) {
        if (!selectedFile) {
          toast.error("Image is required for new slides");
          return;
        }
        
        const requestFormData = new FormData();
    
        requestFormData.append("image", selectedFile);
        
  
        toast.success("Slide created successfully");
        onSuccess();
        return;
      }
      
     
      const requestFormData = new FormData();
       
      // Only append image if a new one is selected
      if (selectedFile) {
        requestFormData.append("image", selectedFile);
      }
      // If no new image selected, backend will keep the current image
      
    //  await updateBannerSlideClient(slide.id, requestFormData);
      toast.success("Slide updated successfully");
      
      onSuccess();
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message || (slide ? "Failed to update slide" : "Failed to create slide"));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {slide ? "Edit Slide" : "Create New Slide"}
          </h2>
          <p className="text-sm text-gray-600">
            {slide ? "Update slide content and/or image" : "Add a new slide to the banner"}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slide Image {!slide && "*"}
            <span className="text-xs text-gray-500 ml-2">
              {slide ? "Select a new image to replace current" : "Required for new slides"}
            </span>
          </label>
          
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              {/* Hidden file input */}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                ref={fileInputRef}
              />
              
              {/* Current/Preview Image */}
              {imagePreview ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={imagePreview}
                    alt={selectedFile ? "New preview" : "Current slide"}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-200 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={triggerFileInput}
                        className="bg-white/90 hover:bg-white"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Change Image
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={removeImage}
                        className="bg-red-500/90 hover:bg-red-600"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                  
                  {/* Badge indicating image status */}
                  <div className="absolute top-2 left-2">
                    {selectedFile ? (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        New Image
                      </span>
                    ) : slide ? (
                      <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                        Current Image
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : (
                /* Upload Area - shown when no image is displayed */
                <div 
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={triggerFileInput}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    {slide && (
                      <p className="text-xs text-gray-500 mt-2">
                        Current image will be replaced
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Status Messages */}
            {!imagePreview && !slide && (
              <p className="mt-2 text-sm text-red-600">Image is required for new slides</p>
            )}
            
            {uploading && (
              <div className="mt-2 flex items-center text-sm text-blue-600">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-2"></div>
                Processing image...
              </div>
            )}
            
            {slide && !imagePreview && (
              <p className="mt-2 text-sm text-yellow-600">
                No image selected. Current image will be removed if you submit.
              </p>
            )}
            
            {slide && imagePreview && !selectedFile && (
              <p className="mt-2 text-sm text-gray-500">
                Keeping current image
              </p>
            )}
            
            {slide && selectedFile && (
              <p className="mt-2 text-sm text-green-600">
                New image will replace the current one
              </p>
            )}
          </div>
        </div>
       

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={uploading}>
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {slide ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{slide ? "Update Slide" : "Create Slide"}</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}