"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";

import { ConfirmDialog } from "@/components/ui/confirm-dialog"; 
import EmployeeForm from "./category-modal";
import Modal from "@/components/ui/modal";
import { Plus, Edit, Trash2, Settings, Building2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { ICategory } from "@/models/category";
import { GetCategory, GetAllCategories,  } from "@/actions/common/category";



export function CategoryManager() {
  const [showForm, setShowForm] = useState(false);
 const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
 const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null); 

   const router = useRouter();
  
 
 const handleEdit = (category: ICategory) => { 
     setEditingCategory(category);
     setShowForm(true);
   };

  

const categories: ICategory[] =
  [
  {
    "id": "emp_01jm8v4x2a",
    "name": "Plumbing",
   
    "fileList": [
      "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg",
    ]
  },
  {
    "id": "emp_02kn9w5y3b",
    "name": "Electricity",
     "fileList": [
      "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg",
    ]
   
  },
  {
    "id": "emp_03lp0x6z4c",
    "name": "Painting",

     "fileList": [
      "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg",
    ]
  },
  
]


  


//     const handleDeleteEmployee = (id: string) => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete this employee? This action can be undone from the trash."
//       )
//     ) {
//       startTransition(async () => {
//         try {
//           await deleteEmployeeClient(id);
//           toast.success("Employee deleted successfully");
//         } catch (error: any) {
//           toast.error(error.message || "Failed to delete employee");
//         }
//       });
//     }
//   };



  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCategory(null);
    router.refresh();
  };


   return (
    <div className="space-y-6">
      {/* Header */}
    {/* Header */}
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div className="min-w-0">
    <p className="text-sm text-gray-600 sm:text-base">
      Manage your Category
    </p>
  </div>

  <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
  

    <Button
      className="w-full shrink-0 bg-orange-500 text-white hover:bg-lime sm:w-auto"
      onClick={() => setShowForm(true)}
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Category
    </Button>
  </div>
</div>

      {/* Services Grid */}
      {categories.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Category yet
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by adding your first category
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create First Category
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
  {categories.map((category) => (
    <CategoryRow
      key={category.id}
      category={category}
      onEdit={handleEdit}
      onDelete={setEmployeeToDelete}
    />
  ))}
</div>
      )}

      {/* Form Modal */}
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingCategory(null);
        }}
        size="sm"
      >
        <EmployeeForm
          category={editingCategory}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingCategory(null);
          }}
        />
      </Modal>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={!!employeeToDelete}
        onClose={() => setEmployeeToDelete(null)}
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

function CategoryRow({
  category,
  onEdit,
  onDelete,
}: {
  category: ICategory;
  onEdit: (category: ICategory) => void;
  onDelete: (id: string) => void;
}) {
  return (
   <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
  

  <div className="flex min-w-0 flex-1 items-stretch gap-3">
    

    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100 border border-gray-100">
      <Image 
  src={category.fileList[0] || "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg"} 
  alt={`${category.name}`} 
  fill 
  className="object-cover" 
/>
    </div>

    {/* Text Block (Name & Email) */}
    <div className="flex flex-col justify-center min-w-0">
      <div className="flex items-center gap-1">
        <h3 className="truncate font-semibold text-gray-900">
          {category.name}
        </h3>
      
      </div>
    </div>

  </div>


      {/* Actions */}
      <div className="flex shrink-0 items-center justify-end gap-1 border-t pt-3 sm:border-t-0 sm:border-l sm:pl-3 sm:pt-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(category)}
          title="Edit service"
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => onDelete(category.id)}
          title="Delete service"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}