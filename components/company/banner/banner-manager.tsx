"use client";

import { useState } from "react";
import { IBanner } from "@/models/banner"; // Import from models
// import { getBannerSlides } from "@/lib/api/content/banner"; // Keep API function import
// import { deleteBannerSlideClient } from "@/actions/banner/banner.client";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Image as ImageIcon, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { BannerSlideForm } from "./banner-form";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useRouter } from "next/navigation";

export function BannerManager() {

  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<IBanner | null>(null);
  const [slideToDelete, setSlideToDelete] = useState<string | null>(null);
  const router = useRouter();


  const handleEdit = (slide: IBanner) => {
    if (!slide?.id) {
      toast.error("Invalid slide data");
      return;
    }
    setEditingSlide(slide);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    // if (!id) {
    //   toast.error("Invalid slide ID");
    //   return;
    // }
    
    // try {
    //   await deleteBannerSlideClient(id);
    //   toast.success("Slide deleted successfully");
    //   router.refresh(); // This will trigger page.tsx to refetch
    // } catch (error) {
    //   toast.error("Failed to delete slide");
    // }
    setSlideToDelete(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingSlide(null);
    router.refresh(); // This will trigger page.tsx to refetch
  };

   const slides: IBanner[] = [
  {
    "id": "banner-001",
    "title": "Professional Home Cleaning Services",
    "filePath": "https://images.unsplash.com/photo-1615856210162-9ae33390b1a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvbWUlMjBzZXJ2aWNlfGVufDB8fDB8fHww"
  },
  {
    "id": "banner-002",
    "title": "Expert Plumbing & Leak Repair",
    "filePath": "https://plus.unsplash.com/premium_photo-1683134512538-7b390d0adc9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D"
  },
  {
    "id": "banner-003",
    "title": "Certified Electrical Maintenance",
    "filePath": "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZSUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D"
  },
  {
    "id": "banner-004",
    "title": "AC Repair & HVAC Servicing",
    "filePath": "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZSUyMHNlcnZpY2V8ZW58MHx8MHx8fDA%3D"
  }
]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
          <p className="text-gray-600">Total Banners: {slides.length}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.refresh()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {slides.length < 3 && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          )}
        </div>
      </div>

      

      {/* Slides Grid */}
      {slides.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No banner slides yet</h3>
         
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create First Slide
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => {
            const slideId = slide.id || "unknown";
            const slideTitle = slide.title || "Untitled Slide";
         
          

            return (
              <div
                key={slideId}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
              >
                {/* Image */}
                <div className="h-48 bg-gray-100 relative">
                  {slide.filePath ? (
                    <img
                      src={slide.filePath}
                      alt={slideTitle}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

              
                <div className="p-4 flex items-center justify-between gap-4"> 
  <h3 className="font-semibold text-gray-900 text-lg truncate"> 
    {slideTitle} 
  </h3> 
  <div className="flex items-center gap-2 shrink-0"> 
    <Button variant="ghost" size="sm" onClick={() => handleEdit(slide)} > 
      <Edit className="h-3 w-3" /> 
    </Button> 
    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => setSlideToDelete(slideId)} > 
      <Trash2 className="h-3 w-3" /> 
    </Button> 
  </div> 
</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Form Modal */}
      <Modal
        title={editingSlide ? "Edit Slide" : "Create New Slide"}
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingSlide(null);
        }}
        size="md"
      >
        <BannerSlideForm
          slide={editingSlide}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingSlide(null);
          }}
        />
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!slideToDelete}
        onClose={() => setSlideToDelete(null)}
        onConfirm={() => slideToDelete && handleDelete(slideToDelete)}
        title="Delete Slide"
        message="Are you sure you want to delete this slide? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}