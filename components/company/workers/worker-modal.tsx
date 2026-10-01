"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {  X, Save, User,  Briefcase,  DollarSign, Users, Upload,FileText, ImageIcon } from "lucide-react";
import { toast } from "sonner";

// import { Employee, createEmployee, updateEmployee } from "@/lib/api/employees/employees";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IEmployee } from "@/models/workers";
import { Button } from "@/components/ui/button";


const employeeSchema = z.object({
  nidNo: z.string().min(3, "Employee code must be at least 3 characters").max(50),
  first_name: z.string().min(2, "First name is required").max(100),
  last_name: z.string().min(2, "Last name is required").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  designation: z.string().min(2, "Designation is required").max(100),
  department: z.string().min(2, "Department is required").max(100).optional(),
  employment_type: z.enum(["Full-Time", "Part-Time", "Contract", "Intern"]).default("Full-Time"),
  joining_date: z.string().min(1, "Joining date is required"),
  salary: z.number().min(500),
  emergency_contact: z.string().optional(),
})




type EmployeeFormData = z.infer<typeof employeeSchema>;


interface EmployeeFormProps {
 
  employee: IEmployee | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EmployeeForm({
   employee,
    onSuccess
    , onCancel
   }: EmployeeFormProps) {
  const [loading, setLoading] = useState(false);
   const [uploading, setUploading] = useState(false);

  const [profilePreview, setProfilePreview] = useState<string | null>(employee?.profile_image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
       nidNo: employee?.nidNo || "",
      first_name: employee?.first_name || "",
      last_name: employee?.last_name || "",
      email: employee?.email || "",
      phone: employee?.phone || "",
     
      department: employee?.department || "",
      employment_type: employee?.employment_type || "Full-Time",
     
      joining_date: employee?.joining_date ? new Date(employee.joining_date).toISOString().split('T')[0] : "",
    
      salary: employee?.salary || 500,
      emergency_contact: employee?.emergency_contact || "" 
    }
  });

  // Set profile preview if editing and employee has profile image
  useEffect(() => {
    if (employee?.profile_image) {
      setProfilePreview(employee.profile_image);
    }
  }, [employee]);

 const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setProfilePreview(previewUrl);

    // Later:
    // upload the file to API/cloud storage
    // and save the returned URL
  };

  const removeImage = () => {
    setProfilePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };



  const onSubmit = async (formData: EmployeeFormData) => {
    try {
      setLoading(true);
      
     console.log("Service form data:", formData);
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast.error(error.message || ("Failed to create employee"));
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

    {/* =====================================================
        LEFT COLUMN
    ====================================================== */}
    <div className="space-y-4">

      {/* Profile */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Profile
        </h3>

        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {profilePreview ? (
              <>
                <img
                  src={profilePreview}
                  alt="Profile preview"
                  className="h-24 w-24 rounded-full object-cover border-2 border-white shadow"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-red-50"
                >
                  <X className="h-3.5 w-3.5 text-gray-600" />
                </button>
              </>
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 border-2 border-white shadow">
                <User className="h-10 w-10 text-blue-500" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="font-medium text-gray-900">
              Profile Photo
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Square image recommended
            </p>

            <div className="flex gap-2 mt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {profilePreview ? "Change" : "Upload"}
              </Button>

              {profilePreview && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeImage}
                  className="text-red-600 hover:bg-red-50"
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>


      {/* Basic Information */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          Basic Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* NID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employee NID *
            </label>

            <Input
              {...register("nidNo")}
              placeholder="EMP-001"
              className={errors.nidNo ? "border-red-300" : ""}
            />

            {errors.nidNo && (
              <p className="mt-1 text-xs text-red-600">
                {errors.nidNo.message}
              </p>
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>

            <Input
              {...register("first_name")}
              placeholder="John"
              className={errors.first_name ? "border-red-300" : ""}
            />

            {errors.first_name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>

            <Input
              {...register("last_name")}
              placeholder="Doe"
              className={errors.last_name ? "border-red-300" : ""}
            />

            {errors.last_name && (
              <p className="mt-1 text-xs text-red-600">
                {errors.last_name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <Input
              type="email"
              {...register("email")}
              placeholder="john@company.com"
              className={errors.email ? "border-red-300" : ""}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>

            <Input
              {...register("phone")}
              placeholder="+977 98XXXXXXXX"
            />
          </div>

        </div>
      </div>

    </div>


    {/* =====================================================
        RIGHT COLUMN
    ====================================================== */}
    <div className="space-y-4">

      {/* Employment + Salary */}
      <div className="bg-gray-50 rounded-xl p-4">

        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-blue-600" />
          Employment & Compensation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>

            <Input
              {...register("department")}
              placeholder="Engineering"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type
            </label>

            <select
              {...register("employment_type")}
              className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Joining Date *
            </label>

            <Input
              type="date"
              {...register("joining_date")}
              className={errors.joining_date ? "border-red-300" : ""}
            />

            {errors.joining_date && (
              <p className="mt-1 text-xs text-red-600">
                {errors.joining_date.message}
              </p>
            )}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary
            </label>

            <Input
              type="number"
              step="0.01"
              {...register("salary", {
                valueAsNumber: true,
                onChange: (e) => {
                  const value = parseFloat(e.target.value) || 0;
                  setValue("salary", value);
                },
              })}
              placeholder="50000"
              className={errors.salary ? "border-red-300" : ""}
            />

            {errors.salary && (
              <p className="mt-1 text-xs text-red-600">
                {errors.salary.message}
              </p>
            )}
          </div>

        </div>
      </div>


      {/* Emergency Contact */}
      <div className="bg-gray-50 rounded-xl p-4">

        <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Emergency Contact
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Name
            </label>

            <Input
              {...register("emergency_contact")}
              placeholder="Emergency contact"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Phone
            </label>

            <Input
              placeholder="+977 98XXXXXXXX"
            />
          </div>

        </div>
      </div>

    </div>

  </div>


  {/* Form Actions */}
  <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 py-5 px-5 pt-4 border-t border-gray-200">

    <Button
      type="button"
      variant="outline"
      onClick={onCancel}
      className="w-full sm:w-auto"
    >
      Cancel
    </Button>

    <Button
      type="submit"
      disabled={isSubmitting || loading}
      className="w-full sm:w-auto bg-orange-500 text-white hover:bg-lime"
    >
      {isSubmitting || loading ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
          {employee ? "Updating..." : "Creating..."}
        </>
      ) : (
        employee ? "Update Employee" : "Create Employee"
      )}
    </Button>

  </div>

</form>
  );
}