"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  Briefcase,
  CreditCard,
  FileText,
  Trash2,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IBooking } from "@/models/booking";

const bookingSchema = z.object({
  phone: z.string().min(1, "Client number is required"),
  worker: z.string().optional(),
  status: z.string().min(1, "Status is required"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  booking: IBooking | null;
  onEdit: (booking: IBooking) => void;
  onDelete: (booking: IBooking) => void;
  onClose: () => void;
}

const statusOptions = [
  "Pending",
  "Confirmed",
  "Assigned",
  "In Progress",
  "Completed",
  "Cancelled",
];

export function BookingsDetailForm({
  booking,
  onClose,
  onDelete,
  onEdit,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      phone: booking?.customer.phone ?? "",
      worker: booking?.worker?.name ?? "",
      status: booking?.status ?? "Pending",
    },
  });

  const currentStatus = watch("status");

  useEffect(() => {
    if (booking) {
      reset({
        phone: booking.customer.phone ?? "",
        worker: booking.worker?.name ?? "",
        status: booking.status ?? "Pending",
      });
    }
  }, [booking, reset]);

  if (!booking) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">
        No booking selected.
      </div>
    );
  }

  const onSubmit = async (formData: BookingFormData) => {
    try {
      console.log("Booking update:", {
        bookingId: booking.id,
        ...formData,
      });

      // Later:
      // await updateBooking({
      //   bookingId: booking.id,
      //   phone: formData.phone,
      //   workerId: ...,
      //   status: formData.status,
      // });

      onClose();
    } catch (error) {
      console.error("Booking update error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 p-4 sm:p-6"
    >
      

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Booking
            </p>

            <h3 className="mt-1 text-lg font-semibold text-gray-900">
              {booking.bookingNo}
            </h3>
          </div>

          <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {booking.status}
          </span>
        </div>
      </div>

 

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

 

        <div className="space-y-5">

          {/* Customer Information */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />

              <h3 className="text-base font-semibold text-gray-900">
                Customer Information
              </h3>
            </div>

            <div className="space-y-4">

              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {booking.customer.name}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />

                  <p className="text-xs text-gray-500">
                    Email
                  </p>
                </div>

                <p className="mt-1 text-sm text-gray-800">
                  {booking.customer.email}
                </p>
              </div>

              {/* Editable phone */}
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />

                  <label
                    htmlFor="phone"
                    className="text-xs font-medium text-gray-700"
                  >
                    Client Number *
                  </label>
                </div>

                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+977 98XXXXXXXX"
                  className={errors.phone ? "border-red-300" : ""}
                />

                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Service Information */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />

              <h3 className="text-base font-semibold text-gray-900">
                Service Information
              </h3>
            </div>

            <div className="space-y-4">

              <div>
                <p className="text-xs text-gray-500">
                  Service
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {booking.service.title}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />

                    <p className="text-xs text-gray-500">
                      Scheduled Date
                    </p>
                  </div>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {booking.scheduledDate}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />

                    <p className="text-xs text-gray-500">
                      Time Slot
                    </p>
                  </div>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {booking.timeSlot}
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Customer Note */}
          {booking.customerNote && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />

                <h3 className="text-sm font-semibold text-gray-900">
                  Customer Note
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-gray-600">
                {booking.customerNote}
              </p>
            </div>
          )}

        </div>

        {/* ===================================================
            RIGHT COLUMN
        ==================================================== */}

        <div className="space-y-5">

          {/* Assignment & Status */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">

            <div className="mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />

              <h3 className="text-base font-semibold text-gray-900">
                Assignment
              </h3>
            </div>

            <div className="space-y-4">

              {/* Worker */}
              <div>
                <label
                  htmlFor="worker"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Assigned Worker
                </label>

                {currentStatus === "Completed" ? (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500">
                    {booking.worker?.name || "No worker assigned"}
                  </div>
                ) : (
                  <Input
                    id="worker"
                    {...register("worker")}
                    placeholder="Assign worker"
                  />
                )}

                {currentStatus !== "Completed" && (
                  <p className="mt-1 text-xs text-gray-400">
                    Worker assignment can be changed until completion.
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Booking Status
                </label>

                <select
                  id="status"
                  {...register("status")}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {errors.status && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.status.message}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Payment Details */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">

            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />

              <h3 className="text-base font-semibold text-gray-900">
                Payment Details
              </h3>
            </div>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Service Amount
                </span>

                <span className="font-medium text-gray-900">
                  {booking.pricing.currency}{" "}
                  {booking.pricing.serviceAmount}
                </span>
              </div>

              {booking.pricing.discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Discount
                  </span>

                  <span className="font-medium text-emerald-600">
                    - {booking.pricing.currency}{" "}
                    {booking.pricing.discount}
                  </span>
                </div>
              )}

              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">
                    Total
                  </span>

                  <span className="font-bold text-gray-900">
                    {booking.pricing.currency}{" "}
                    {booking.pricing.totalAmount}
                  </span>
                </div>
              </div>

            </div>

            <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2.5">

              <div>
                <p className="text-xs text-gray-500">
                  Payment
                </p>

                <p className="text-sm font-medium text-gray-900">
                  {booking.pricing.paymentMethod || "Not paid"}
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  booking.pricing.paymentStatus === "Paid"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {booking.pricing.paymentStatus}
              </span>

            </div>

          </div>

        </div>
      </div>

     

      <div className="flex flex-col justify-end gap-2 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">

   
        <div className="flex gap-2">

          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>

        </div>

      </div>

    </form>
  );
}