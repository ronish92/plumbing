"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";


import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, RefreshCw, MessageSquare, Quote } from "lucide-react";
import { toast } from "sonner";
import { TestimonialForm } from "./testimonial-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ITestimonial } from "@/models/testomonials";



export function TestimonialsManager() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<ITestimonial | null>(null);
  const [testimonialToDelete, setTestimonialToDelete] =
    useState<string | null>(null);

  const handleEdit = (testimonial: ITestimonial) => {
    setEditingTestimonial(testimonial);
    setShowForm(true);
  };

  const testimonials: ITestimonial[] = [
  { 
    id: "1",
    quote:
    "Great craftsmanship. Watching them work was awesome. I had my solar water heating system repaired and now it's running very smoothly.",
    author: 'Kriti Neupane',
    title: 'Housewife',
    publication: 'Wellness & Lifestyle Review',
  },
  {
    id: "2",
    quote:
      "They fixed my Kitchen sink and i loved it how they told me the estimate before hand and final price was even below the estimate.",
    author: 'Sukriti Dhakal',
    title: 'Electrical Engineer',
    publication: 'The Savoy, London',
  },
  {
     id: "3",
    quote:
      "The attention to detail is extraordinary. They installed a new commode in my house and they cleaned the station after work .",
    author: 'Riddhi Rathod',
    title: 'Business Owner',
    publication: 'Modern Drinks Magazine',
  },
]

  const handleDelete = async (id: string) => {
    // startTransition(async () => {
    //   try {
    //     await deleteTestimonialClient(id);
    //     toast.success("Testimonial deleted");
    //     router.refresh(); // ✅ This now works - props update automatically
    //   } catch (err: any) {
    //     toast.error(err.message || "Failed to delete testimonial");
    //   } finally {
    //     setTestimonialToDelete(null);
    //   }
    // });
  };

  const handleToggleStatus = async (id: string) => {
    // startTransition(async () => {
    //   try {
    //     await toggleTestimonialStatusClient(id);
    //     toast.success("Status updated");
    //     router.refresh(); // ✅ Props update
    //   } catch (err: any) {
    //     toast.error(err.message || "Failed to update status");
    //   }
    // });
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingTestimonial(null);
    router.refresh(); 
  };

  return (
    <div className="space-y-6">
      {/* Loading Overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-lg">
            <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Updating...</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Testimonials Management
          </h1>
          <p className="text-gray-600">
            Manage client testimonials and reviews
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => router.refresh()}
            disabled={isPending}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </div>
      </div>

      {/* Empty State */}
      {testimonials.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No testimonials yet
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by adding your first testimonial
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Testimonial
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {testimonials.map((testimonial) => (
              <TestimonialListItem
                key={testimonial.id}
                testimonial={testimonial}
                onEdit={handleEdit}
                onDelete={setTestimonialToDelete}
                onToggleStatus={handleToggleStatus}
                disabled={isPending}
              />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal
        title={editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTestimonial(null);
        }}
        size="lg"
      >
        <TestimonialForm
          testimonial={editingTestimonial}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingTestimonial(null);
          }}
        />
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={!!testimonialToDelete}
        onClose={() => setTestimonialToDelete(null)}
        onConfirm={() =>
          testimonialToDelete && handleDelete(testimonialToDelete)
        }
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial?"
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}

/* ---------------- Item ---------------- */

function TestimonialListItem({
  testimonial,
  onEdit,
  onDelete,
  onToggleStatus,
  disabled,
}: {
  testimonial: ITestimonial;
  onEdit: (testimonial: ITestimonial) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-100 to-purple-100 flex items-center justify-center">
            <Quote className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {testimonial.title}
                </h3>

                <button
                  onClick={() => onToggleStatus(testimonial.id)}
                  disabled={disabled}
                  className={`text-xs px-2 py-1 rounded-full cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    testimonial.isActive
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {testimonial.isActive ? "Active" : "Inactive"}
                </button>
              </div>

              <p className="text-gray-600 text-sm italic mb-3">
                "{testimonial.quote}"
              </p>

              <div className="text-sm text-gray-700">
                <span className="font-medium">{testimonial.author}</span>
                {testimonial.title && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{testimonial.title}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onEdit(testimonial)}
                disabled={disabled}
                className="cursor-pointer"
              >
                <Edit className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:bg-red-50 cursor-pointer"
                onClick={() => onDelete(testimonial.id)}
                disabled={disabled}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}