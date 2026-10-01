"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IService } from "@/models/service"; 
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Settings, Star, IndianRupee, Search, User, Phone, Mail } from "lucide-react";
import { CompanyForm } from "./service-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { ICompany } from "@/models/comany";
import { Image } from "@/components/ui/image";

export function CompaniesManager() {

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<ICompany | null>(null); // Changed type
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleEdit = (company: ICompany) => { 
    setEditingService(company);
    setShowForm(true);
  };

 const companies: ICompany[] = [ 
  {
  "id": "1",
  "name": "Full House Services",
  
  "ratingAverage": 4.8,
  "reviewCount": 1250.00,
  "isVerified": true,
  "logoUrl": "https://images.pexels.com/photos/5583116/pexels-photo-5583116.jpeg",
  "address": "Kathmandu",
  "contactPerson": "Ronish Karki",
  websiteUrl: "facebook.com",
  "phone": "9841735545",
   "phone2": "3",
  "email": "cfcronish@gmail.com",
  "instagram": "https://www.instagram.com/PoliceChiefGlobal",
  "facebook": "https://www.facebook.com/PoliceChiefGlobal",
  "completedJobsCount": 14,
  "licenseNumber": "23r43rdf3",
  offeredService: [
    {
  "id": "srv-92834",
  "title": "Premium House Painting",
  "description": "Full-service interior and exterior residential painting with premium eco-friendly materials.",
  "ratings": 4.8,
  "price": 1250.00,
  "isActive": true,
  "filePath": "https://images.pexels.com/photos/5583116/pexels-photo-5583116.jpeg",
  "worker": "Ronish Karki",
  "category": "Painting",
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
 
}
 ]

 const filteredServices = companies.filter((company) => {
  const query = searchQuery.toLowerCase().trim();

  if (!query) return true;

  return (
    company.name.toLowerCase().includes(query) 
   
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
      All Companies
    </p>
  </div>

  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
    {/* Search */}
    <div className="relative w-full sm:w-64 lg:w-72">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

      <Input
        type="search"
        placeholder="Search company..."
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
      {companies.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No services yet
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by adding your first Company
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Company
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
  {filteredServices.map((service) => (
    <CompanyRow
      key={service.id}
      company={service}
      onEdit={handleEdit}
      onDelete={setServiceToDelete}
    />
  ))}
</div>
      )}

      {/* Form Modal */}
      <Modal
        title={editingService ? "Edit Company" : "Add Company"}
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingService(null);
        }}
        size="xl"
      >
        <CompanyForm
          company={editingService}
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

function CompanyRow({
  company,
  onEdit,
  onDelete,
}: {
  company: ICompany;
  onEdit: (company: ICompany) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      
  
      
  
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100 border border-gray-100">
        <Image 
    src={company.logoUrl || "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"} 
    alt={`${company.name}'s profile`} 
    fill 
    className="object-cover" 
  />
    </div>


      {/* Service info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold text-gray-900">
            {company.name}
          </h3>

          {!company.isVerified && (
            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              Inactive
            </span>
          )}
        </div>

        <p className="mt-1 line-clamp-1 text-sm text-gray-500">
          {company.address}
        </p>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6">
        
        {/* Worker */}
        <div className="min-w-0">
          <p className="text-xs text-gray-400">Phone</p>

          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 shrink-0 text-orange-500" />

            <span className="truncate text-sm font-medium text-gray-700">
              {company.phone}
            </span>
          </div>
        </div>

   
        <div className="min-w-20">
          <p className="text-xs text-gray-400">Email</p>

          <div className="flex items-center gap-1 text-xs font-semibold text-gray-900">
            <Mail className="h-3.5 w-3.5 text-orange-500" />
            {company.email}
          </div>
        </div>

        {/* Rating */}
        <div className="min-w-16">
          <p className="text-xs text-gray-400">Contact Person</p>

          <div className="flex items-center gap-1 text-sm font-medium">
            <User className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            {company.contactPerson}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center justify-end gap-1 border-t pt-3 sm:border-t-0 sm:border-l sm:pl-3 sm:pt-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(company)}
          title="Edit service"
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => onDelete(company.id)}
          title="Delete service"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

