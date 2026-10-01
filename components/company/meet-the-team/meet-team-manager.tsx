"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IService } from "@/models/service"; 
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, RefreshCw, Code, FileJson, Settings, Star, IndianRupee, CurrencyIcon, Search, User } from "lucide-react";
import { toast } from "sonner";
import { ServiceForm } from "./meet-team-modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";

export interface IMeetTeam {
  id: string
  name: string
  department: string
  description: string
  address: string
  image: string
}

export function ServicesManager() {

  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<IMeetTeam | null>(null); 
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleEdit = (member: IMeetTeam) => { 
    setEditingMember(member);
    setShowForm(true);
  };

 const members: IMeetTeam[] = [ 
  {
  "id": "srv-92834",
  "name": "Premium House Painting",
  "description": "Full-service interior and exterior residential painting with premium eco-friendly materials.",
  "address": "KTM",
  "department": "Plumbing",
  "image": "https://images.pexels.com/photos/5583116/pexels-photo-5583116.jpeg",
 
}
 ]




  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingMember(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
    {/* Header */}
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div className="min-w-0">
    <p className="text-sm text-gray-600 sm:text-base">
      Manage your team members for display
    </p>
  </div>

  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
   
    <Button
      className="w-full shrink-0 bg-orange-500 text-white hover:bg-lime sm:w-auto"
      onClick={() => setShowForm(true)}
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Team Member
    </Button>
  </div>
</div>

      {/* Services Grid */}
      {members.length === 0 ? (
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
  {members.map((member) => (
    <MemberRow
      key={member.id}
      member={member}
      onEdit={handleEdit}
      onDelete={setMemberToDelete}
    />
  ))}
</div>
      )}

      {/* Form Modal */}
      <Modal
        title={editingMember ? "Edit Member" : "Add Member"}
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingMember(null);
        }}
        size="xl"
      >
        <ServiceForm
          service={editingMember}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingMember(null);
          }}
        />
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!memberToDelete}
        onClose={() => setMemberToDelete(null)}
        onConfirm={() => {}} 
        title="Delete Service"
        message="Are you sure you want to delete this Member? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );


function MemberRow({
  member,
  onEdit,
  onDelete,
}: {
  member: IMeetTeam;
  onEdit: (member: IMeetTeam) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      
      {/* Service info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold text-gray-900">
            {member.name}
          </h3>

         
        </div>

        <p className="mt-1 line-clamp-1 text-sm text-gray-500">
          {member.description}
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
              {member.department}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="min-w-20">
          <p className="text-xs text-gray-400">Price</p>

          <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
            <IndianRupee className="h-3.5 w-3.5 text-orange-500" />
            {member.address}
          </div>
        </div>

     

      {/* Actions */}
      <div className="flex shrink-0 items-center justify-end gap-1 border-t pt-3 sm:border-t-0 sm:border-l sm:pl-3 sm:pt-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(member)}
          title="Edit service"
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => onDelete(member.id)}
          title="Delete service"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
      </div>
  );
}
