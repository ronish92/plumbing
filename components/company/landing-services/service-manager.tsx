"use client";

import { useState } from "react";


import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, RefreshCw, Quote } from "lucide-react";

import { toast } from "sonner";
import { ServiceForm } from "./service-form";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";
import { ILandingService } from "@/models/available-services";

export function LandingServicesManager() {
  
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ILandingService | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const router = useRouter();

  const handleEdit = (service: ILandingService) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
  
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingService(null);
    router.refresh();
  };

 const services: ILandingService[] = [
  {
    "id": "srv_01J8Y",
    "title": "Professional Deep Cleaning",
    "subtitle": "Complete top-to-bottom sanitization for your entire home.",
    "filePath": "/images/c1.jpg",
    "features": [
      "Kitchen appliances interior & exterior",
      "Bathroom scrubbing and disinfection",
      "Wall washing and baseboard wiping",
      "HEPA-filter vacuuming & mopping"
    ],
    "category": "Cleaning",
    "isActive": true,
    "createdBy": "admin_user_01",
    "updatedBy": "admin_user_01"
  },
  {
    "id": "srv_02K9X",
    "title": "Emergency Plumbing Repair",
    "subtitle": "Fast, reliable fixing for leaks, bursts, and clogged drains.",
    "filePath": "/images/e1.jpg",
    "features": [
      "24/7 emergency response",
      "Pipe leak detection and repair",
      "Drain snaking and hydro-jetting",
      "Licensed and insured plumbers"
    ],
    "category": "Plumbing",
    "isActive": true,
    "createdBy": "admin_user_01",
    "updatedBy": null
  },
  {
    "id": "srv_03M7W",
    "title": "Smart Home Automation Setup",
    "subtitle": "Connect your lights, security, and climate into one smart ecosystem.",
    "filePath": "/images/p2.jpg",
    "features": [
      "Smart thermostat installation",
      "Security camera & doorbell mounting",
      "Voice assistant integration (Alexa/Google)",
      "Wi-Fi network optimization"
    ],
    "category": "Electrical",
    "isActive": true,
    "createdBy": "tech_lead_02",
    "updatedBy": "admin_user_01"
  },
  {
    "id": "srv_04N6V",
    "title": "Central AC Maintenance & Tune-Up",
    "subtitle": "Prepare your cooling system for maximum efficiency before summer hits.",
    "filePath": "/images/c1.jpg",
    "features": [
      "Refrigerant level check & top-off",
      "Condenser coil professional cleaning",
      "Electrical component inspection",
      "Filter replacement included"
    ],
    "category": "HVAC",
    "isActive": false,
    "createdBy": "hvac_manager",
    "updatedBy": null
  },
  {
    "id": "srv_05P5U",
    "title": "Express Handyman Assembly",
    "subtitle": "Furniture assembly, picture hanging, and minor home repairs done right.",
    "filePath": "/images/p1.webp",
    "features": [
      "Flat-pack furniture assembly (IKEA, etc.)",
      "TV wall mounting and cable concealment",
      "Blinds, curtains, and shelf installation",
      "Billed by the hour with no hidden fees"
    ],
    "category": "Handyman",
    "isActive": true,
    "createdBy": null,
    "updatedBy": null
  }
]


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600">Manage services details</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.refresh()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

 
      {services.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Quote className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Landing Services yet
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by adding your first services
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create First Service
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {services.map((service) => (
              <ServiceListItem
                key={service.id}
                service={service}
                onEdit={handleEdit}
                onDelete={setServiceToDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Form Modal */}
      <Modal
        title={editingService ? "Edit Service" : "Add New Service"}
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
        onConfirm={() => serviceToDelete && handleDelete(serviceToDelete)}
        title="Delete Perk"
        message="Are you sure you want to delete this Service? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
}


function ServiceListItem({ 
  service, 
  onEdit, 
  onDelete,
}: { 
  service: ILandingService;
  onEdit: (service: ILandingService) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        {/* Image */}
        <div className="shrink-0">
          <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
            {service.filePath ? (
              <img
                src={service.filePath}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <Quote className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>
               
              </div>
              
              <p className="text-gray-600 text-sm mb-2">
                {service.subtitle}
              </p>

               <p className="text-gray-600 text-sm mb-2">
                {service.category}
              </p>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(service)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => onDelete(service.id)}
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