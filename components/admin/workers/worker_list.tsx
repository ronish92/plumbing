"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import { IEmployee } from "@/models/workers";
import { ConfirmDialog } from "@/components/ui/confirm-dialog"; 
import EmployeeForm from "./worker-modal";
import Modal from "@/components/ui/modal";
import { Plus, Edit, Trash2, RefreshCw, Code, FileJson, Settings, Star, IndianRupee, CurrencyIcon, User, Table, Building2, Phone } from "lucide-react";



import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, UserPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Image } from "@/components/ui/image";



export function EmployeeManager() {
  const [showForm, setShowForm] = useState(false);
 const [editingEmployee, setEditingEmployee] = useState<IEmployee | null>(null);
 const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null); 
 const [searchQuery, setSearchQuery] = useState("");
   const router = useRouter();
  
 
 const handleEdit = (employee: IEmployee) => { // Changed type
     setEditingEmployee(employee);
     setShowForm(true);
   };

  

const employees: IEmployee[] =
  [
  {
    "id": "emp_01jm8v4x2a",
    "first_name": "Sarah",
    "last_name": "Jenkins",
    "email": "sarah.jenkins@company.com",
    "phone": "+1-555-0198",
    "nidNo": "NID-98374625",
    "department": "Engineering",
    "employment_type": "Full-Time",
    "joining_date": "2024-03-15",
    "profile_image": "https://company.com",
    "salary": 85000,
    "emergency_contact": "David Jenkins (+1-555-0199)",
    "notes": "Promoted from Mid to Senior in January 2026.",
    "createdBy": "usr_admin_01",
    "updatedBy": "usr_hr_04",
    "createdAt": "2024-03-10T09:30:00Z",
    "updatedAt": "2026-01-15T14:22:18Z"
  },
  {
    "id": "emp_02kn9w5y3b",
    "first_name": "Marcus",
    "last_name": "Chen",
    "email": "marcus.chen@company.com",
    "nidNo": "NID-10293847",
    "department": "Marketing",
    "employment_type": "Contract",
    "joining_date": "2025-06-01",
    "salary": 62000,
    "createdBy": "usr_hr_02",
    "updatedBy": "usr_hr_02",
    "createdAt": "2025-05-20T11:15:00Z",
    "updatedAt": "2025-05-20T11:15:00Z"
  },
  {
    "id": "emp_03lp0x6z4c",
    "first_name": "Elena",
    "last_name": "Rostova",
    "email": "elena.rostova@company.com",
    "phone": "+44-20-7946-0192",
    "nidNo": "NID-55667788",
    "department": "Product",
    "employment_type": "Part-Time",
    "joining_date": "2025-09-10",
    "profile_image": "https://company.com",
    "salary": 45000,
    "emergency_contact": "Igor Rostov (+44-20-7946-0193)",
    "createdBy": "usr_admin_01",
    "updatedBy": "usr_admin_01",
    "createdAt": "2025-09-01T08:00:00Z",
    "updatedAt": "2025-09-02T10:30:22Z"
  },
  {
    "id": "emp_04mq1a7a5d",
    "first_name": "Amara",
    "last_name": "Okonkwo",
    "email": "amara.okonkwo@company.com",
    "phone": "+234-1-4613873",
    "nidNo": "NID-44332211",
    "department": "Design",
    "employment_type": "Intern",
    "joining_date": "2026-02-01",
    "createdBy": "usr_hr_04",
    "updatedBy": "usr_hr_04",
    "createdAt": "2026-01-28T16:45:00Z",
    "updatedAt": "2026-01-28T16:45:00Z"
  },
  {
    "id": "emp_05nr2b8b6e",
    "first_name": "James",
    "last_name": "Miller",
    "email": "james.miller@company.com",
    "phone": "+1-555-0143",
    "nidNo": "NID-12345678",
    "department": "Sales",
    "employment_type": "Full-Time",
    "joining_date": "2023-11-01",
    "salary": 75000,
    "createdBy": "usr_hr_01",
    "updatedBy": "usr_admin_01",
    "createdAt": "2023-10-25T09:00:00Z",
    "updatedAt": "2025-11-30T17:00:00Z",
    "deleted_at": "2025-11-30T17:00:00Z"
  }
]


 const filteredEmployees = employees.filter((employee) => {
  const query = searchQuery.toLowerCase().trim();
  if (!query) return true;

  const matchesSearch =
    employee.first_name.toLowerCase().includes(query) ||
    employee.last_name.toLowerCase().includes(query) ||
    employee.email.toLowerCase().includes(query) ||     
    (employee.department?.toLowerCase().includes(query) ?? false);

  return matchesSearch;
});
  


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
    setEditingEmployee(null);
    router.refresh();
  };


   return (
    <div className="space-y-6">
      {/* Header */}
    {/* Header */}
<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div className="min-w-0">
    <p className="text-sm text-gray-600 sm:text-base">
      Manage your Employees
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
      Add Employee
    </Button>
  </div>
</div>

      {/* Services Grid */}
      {employees.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Workers yet
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
  {filteredEmployees.map((employee) => (
    <EmployeesRow
      key={employee.id}
      employee={employee}
      onEdit={handleEdit}
      onDelete={setEmployeeToDelete}
    />
  ))}
</div>
      )}

      {/* Form Modal */}
      <Modal
        title={editingEmployee ? "Edit Service" : "Add Service"}
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingEmployee(null);
        }}
        size="xl"
      >
        <EmployeeForm
          employee={editingEmployee}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingEmployee(null);
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

function EmployeesRow({
  employee,
  onEdit,
  onDelete,
}: {
  employee: IEmployee;
  onEdit: (service: IEmployee) => void;
  onDelete: (id: string) => void;
}) {
  return (
   <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
  

  <div className="flex min-w-0 flex-1 items-stretch gap-3">
    

    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-gray-100 border border-gray-100">
      <Image
        src="https://landman.fashion/wp-content/uploads/2026/01/Arianas-denim-overalls-on-Landman.jpg"
        alt={`${employee.first_name}'s profile`}
        fill
        className="object-cover"
       
      />
    </div>

    {/* Text Block (Name & Email) */}
    <div className="flex flex-col justify-center min-w-0">
      <div className="flex items-center gap-1">
        <h3 className="truncate font-semibold text-gray-900">
          {employee.first_name}
        </h3>
        <h3 className="truncate font-semibold text-gray-900">
          {employee.last_name}
        </h3>
      </div>

      <p className="mt-0.5 line-clamp-1 text-sm text-gray-500">
        {employee.email}
      </p>
    </div>

  </div>

      

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6">
        
        {/* Worker */}
        <div className="min-w-0">
          <p className="text-xs text-gray-400">Phone</p>

          <div className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5 shrink-0 text-orange-500" />

            <span className="truncate text-sm font-medium text-gray-700">
              {employee.phone}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="min-w-20">
          <p className="text-xs text-gray-400">Department</p>

          <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
            <Building2 className="h-3.5 w-3.5 text-orange-500" />
            {employee.department}
          </div>
        </div>

       
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center justify-end gap-1 border-t pt-3 sm:border-t-0 sm:border-l sm:pl-3 sm:pt-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(employee)}
          title="Edit service"
        >
          <Edit className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => onDelete(employee.id)}
          title="Delete service"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}