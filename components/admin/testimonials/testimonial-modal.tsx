"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { X, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import { ITestimonial } from "@/models/testomonials";

const testimonialSchema = z.object({
  title: z.string().min(3).max(100),
  quote: z.string().min(10).max(1000),
  author: z.string().min(2).max(100),
  authorTitle: z.string().max(100).optional(),
  isActive: z.boolean(),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  testimonial?: ITestimonial | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function TestimonialForm({
  testimonial,
  onSuccess,
  onCancel,
}: TestimonialFormProps) {
  const [isActive, setIsActive] = useState(testimonial?.isActive ?? true);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      title: testimonial?.title || "",
      quote: testimonial?.quote || "",
      author: testimonial?.author || "",
      authorTitle: testimonial?.title || "",
      isActive: testimonial?.isActive ?? true,
    },
  });

  const quote = watch("quote");
  const title = watch("title");

  const onSubmit = (data: TestimonialFormData) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("quote", data.quote);
        formData.append("author", data.author);
        formData.append("isActive", String(isActive));

        if (data.authorTitle) {
          formData.append("authorTitle", data.authorTitle);
        }

        // if (testimonial) {
        //   await updateTestimonialClient(testimonial._id, formData);
        //   toast.success("Testimonial updated");
        // } else {
        //   await createTestimonialClient(formData);
        //   toast.success("Testimonial created");
        // }

        onSuccess(); // parent does router.refresh()
      } catch (err: any) {
        toast.error(
          err.message ||
            (testimonial
              ? "Failed to update testimonial"
              : "Failed to create testimonial")
        );
      }
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">
            {testimonial ? "Edit Testimonial" : "Create Testimonial"}
          </h2>
          <p className="text-sm text-gray-600">
            {testimonial
              ? "Update testimonial details"
              : "Add a new client testimonial"}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title *</label>
          <Input {...register("title")} />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-red-600">{errors.title?.message}</span>
            <span>{title?.length || 0}/100</span>
          </div>
        </div>

        {/* Quote */}
        <div>
          <label className="block text-sm font-medium mb-2">Quote *</label>
          <Textarea rows={4} {...register("quote")} />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-red-600">{errors.quote?.message}</span>
            <span>{quote?.length || 0}/1000</span>
          </div>
        </div>

        {/* Author */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Author Name *
            </label>
            <Input {...register("author")} />
            <p className="text-xs text-red-600">
              {errors.author?.message}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Author Title
            </label>
            <Input {...register("authorTitle")} />
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            {isActive ? (
              <ToggleRight className="text-green-600" />
            ) : (
              <ToggleLeft className="text-gray-400" />
            )}
            <div>
              <p className="font-medium">Status</p>
              <p className="text-sm text-gray-500">
                {isActive ? "Visible on site" : "Hidden"}
              </p>
            </div>
          </div>
          <Switch checked={isActive} onCheckedChange={setIsActive} />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? testimonial
                ? "Updating..."
                : "Creating..."
              : testimonial
              ? "Update Testimonial"
              : "Create Testimonial"}
          </Button>
        </div>
      </form>
    </div>
  );
}
