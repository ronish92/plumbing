"use client";

import { useState, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TiptapEditor } from "@/components/TiptapEditor";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";


const serviceSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
    subtitle: z.string().min(10, "Subtitle must be at least 10 characters").max(200, "Subtitle is too long"),
    category: z.string().min(1, "Category is required"),
    features: z.string().min(100),

    isActive: z.boolean(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
    service?: ILandingService | null;
    onSuccess: () => void;
    onCancel: () => void;
}

  const Categories = [
        "Plumbing",
        "Construction",
        "Electricity",
        "Painting",

    ];

    export interface ILandingService {
  id: string;
  title: string;
  subtitle: string;
  filePath: string;
  features: string;
  category: string;
  isActive: boolean;
  createdBy: string | null;
  updatedBy?: string | null;
 
}

export function ServiceForm({ service, onSuccess, onCancel }: ServiceFormProps) {
    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(service?.filePath || null);
    const [isActive, setIsActive] = useState(service?.isActive ?? true);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            title: service?.title || "",
            subtitle: service?.subtitle || "",
            isActive: service?.isActive ?? true,
            category: service?.category || Categories[0],
        },
    });

  



    const subtitle = watch("subtitle");

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
            setImageFile(file);
            // Create preview
            setImagePreview(URL.createObjectURL(file));
            toast.success("Image selected successfully");
        } catch (error) {
            toast.error("Failed to process image");
            setImageFile(null);
            setImagePreview(null);
        } finally {
            setUploading(false);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (formData: ServiceFormData) => {
        try {
            const requestFormData = new FormData();
            requestFormData.append("title", formData.title);
            requestFormData.append("subtitle", formData.subtitle);
            requestFormData.append("category", formData.category);
            requestFormData.append("isActive", String(isActive));


            requestFormData.append(
                "features",
                formData.features
            );

            if (imageFile) {
                requestFormData.append("image", imageFile);
            } else if (service?.filePath) {

                requestFormData.append("imageUrl", service.filePath);
            }
            if (service) {

                //  await updatePerkClient(service._id, requestFormData);
                toast.success("Service updated successfully");
            } else {
                // await createPerkClient(requestFormData);
                toast.success("Service created successfully");
            }

            onSuccess();
        } catch (error: any) {
            console.error("Form submission error:", error);
            toast.error(error.message || (service ? "Failed to update service" : "Failed to create service"));
        }
    };

    return (
        <div className="p-6">


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <Input
                                id="title"
                                placeholder="Enter service title"
                                {...register("title")}
                                className={errors.title ? "border-red-300" : ""}
                            />
                            {errors.title && (
                                <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                                Subtitle *
                            </label>
                            <Textarea
                                id="subtitle"
                                placeholder="Enter service subtitle"
                                rows={3}
                                {...register("subtitle")}
                                className={errors.subtitle ? "border-red-300" : ""}
                            />
                            <div className="flex items-center justify-between mt-1">
                                {errors.subtitle ? (
                                    <p className="text-sm text-red-600">{errors.subtitle.message}</p>
                                ) : (
                                    <p className="text-xs text-gray-500">
                                        {subtitle?.length || 0}/200 characters
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="categories"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Select a Category
                            </label>

                            <select
                                id="status"
                                {...register("category")}
                                className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {Categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>

                            {errors.category && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>



                        {/* Features */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Service Features
                                    </label>

                                </div>

                             
                            </div>
                              
                <label htmlFor="">Description</label>
                <Controller
                    name="features"
                    control={control}
                    render={({ field }) => (
                        <TiptapEditor
                            content={field.value}
                            onChange={field.onChange}
                            placeholder="Describe service features..."
                            className={errors.features ? "border-red-500" : ""}
                        />
                    )}
                />
                {/* <EditorContent editor={editor} /> */}
                {/* <input type="text" {...register("description")} /> */}
                {errors.features && <p className="error">This field is required</p>}
   

                            
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">

                                <div>

                                    <p className="text-sm text-gray-900">
                                        {isActive ? "Active - Visible to users" : "Inactive - Hidden from users"}
                                    </p>
                                </div>
                            </div>
                            <Switch
                                checked={isActive}
                                onCheckedChange={setIsActive}
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Image
                                <span className="text-xs text-gray-500 ml-2">(Optional - Recommended 1:1 ratio)</span>
                            </label>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                ref={fileInputRef}
                            />

                            {imagePreview ? (
                                <div className="relative rounded-lg overflow-hidden border border-gray-300">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover"
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
                                                <ImageIcon className="h-4 w-4 mr-2" />
                                                Change Image
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={removeImage}
                                                className="bg-orange-500/90 hover:bg-orange-400"
                                            >
                                                <X className="h-4 w-4 mr-2" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Badge */}
                                    <div className="absolute top-2 left-2">
                                        {imageFile ? (
                                            <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded">
                                                New Image
                                            </span>
                                        ) : service ? (
                                            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                                Current Image
                                            </span>
                                        ) : null}
                                    </div>
                                </div>
                            ) : (
                                /* Upload Area */
                                <div
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                                    onClick={triggerFileInput}
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                        {service && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                Current image will be replaced
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Status Messages */}
                            {uploading && (
                                <div className="mt-2 flex items-center text-sm text-orange-600">
                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-600 mr-2"></div>
                                    Processing image...
                                </div>
                            )}

                            {!imagePreview && service?.filePath && (
                                <p className="mt-2 text-sm text-yellow-600">
                                    No new image selected. Current image will be kept.
                                </p>
                            )}
                        </div>

                        {/* Current Info (if editing) */}
                        {service && (
                            <div className="border border-gray-200 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2">Current Information</h4>
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>Created By: {service.createdBy}</p>
                                    <p>Last Updated By: {service.updatedBy}</p>

                                    <p>Status: {service.isActive ? "Active" : "Inactive"}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t">
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting || uploading}>
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                {service ? "Updating..." : "Creating..."}
                            </>
                        ) : (
                            <>{service ? "Update Service" : "Create Service"}</>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}