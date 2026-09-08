"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IService } from "@/models/service"; 
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, RefreshCw, Code, FileJson, Settings, Star, IndianRupee, CurrencyIcon, Search, User } from "lucide-react";
import { toast } from "sonner";
import { ServiceForm } from "./service-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

export function ServicesManager() {

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null); // Changed type
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleEdit = (service: IService) => { 
    setEditingService(service);
    setShowForm(true);
  };

 const services: IService[] = [ 
  {
  "id": "srv-92834",
  "title": "Premium House Painting",
  "description": "Full-service interior and exterior residential painting with premium eco-friendly materials.",
  "ratings": 4.8,
  "price": 1250.00,
  "isActive": true,
  "filePath": "https://images.pexels.com/photos/5583116/pexels-photo-5583116.jpeg",
  "worker": "Ronish Karki",
  "warranty": "2 Years",
  "teamSize": "3",
  "response": "Within 2 hours",
  "duration": "3-5 Days",
  "features": "Eco-friendly paint, Surface priming, Post-job cleanup, Color consultation",
  "comments": 14,
  "createdBy": "Admin-1",
  "updatedBy": "Admin-2",
  "createdAt": "2026-08-15T10:30:00Z",
  "updatedAt": "2026-08-27T07:15:22Z"
}
 ]

 const filteredServices = services.filter((service) => {
  const query = searchQuery.toLowerCase().trim();

  if (!query) return true;

  return (
    service.title.toLowerCase().includes(query) 
    // ||
    // service.worker.toLowerCase().includes(query)
  );
});


  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingService(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
    {/* Header */}
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div className="min-w-0">
    <p className="text-sm text-gray-600 sm:text-base">
      Manage your services and offerings
    </p>
  </div>

  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
    {/* Search */}
    <div className="relative w-full sm:w-64 lg:w-72">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

      <Input
        type="search"
        placeholder="Search title or worker..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-9"
      />
    </div>

    <Button
      className="w-full shrink-0 bg-orange-500 text-white hover:bg-lime sm:w-auto"
      onClick={() => setShowForm(true)}
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Service
    </Button>
  </div>
</div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No services yet
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by adding your first service
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create First Service
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
  {filteredServices.map((service) => (
    <ServiceRow
      key={service.id}
      service={service}
      onEdit={handleEdit}
      onDelete={setServiceToDelete}
    />
  ))}
</div>
      )}

      {/* Form Modal */}
      <Modal
        title={editingService ? "Edit Service" : "Add Service"}
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingService(null);
        }}
        size="xl"
      >
        <ServiceForm
          service={editingService}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingService(null);
          }}
        />
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!serviceToDelete}
        onClose={() => setServiceToDelete(null)}
        onConfirm={() => {}} 
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}

function ServiceRow({
  service,
  onEdit,
  onDelete,
}: {
  service: IService;
  onEdit: (service: IService) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      
      {/* Service info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold text-gray-900">
            {service.title}
          </h3>

          {!service.isActive && (
            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              Inactive
            </span>
          )}
        </div>

        <p className="mt-1 line-clamp-1 text-sm text-gray-500">
          {service.description}
        </p>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6">
        
        {/* Worker */}
        <div className="min-w-0">
          <p className="text-xs text-gray-400">Worker</p>

          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 shrink-0 text-orange-500" />

            <span className="truncate text-sm font-medium text-gray-700">
              {service.worker}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="min-w-20">
          <p className="text-xs text-gray-400">Price</p>

          <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
            <IndianRupee className="h-3.5 w-3.5 text-orange-500" />
            {service.price}
          </div>
        </div>

        {/* Rating */}
        <div className="min-w-16">
          <p className="text-xs text-gray-400">Rating</p>

          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            {service.ratings || "—"}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center justify-end gap-1 border-t pt-3 sm:border-t-0 sm:border-l sm:pl-3 sm:pt-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(service)}
          title="Edit service"
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => onDelete(service.id)}
          title="Delete service"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

