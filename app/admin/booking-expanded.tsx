"use client";

import { Calendar, Clock, Eye, Pencil, Trash2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IBooking } from "@/models/booking";

interface AllBookingModalProps {
  bookings: IBooking[];
  onView: (booking: IBooking) => void;
  onEdit: (booking: IBooking) => void;
  onAssign: (booking: IBooking) => void;
  onDelete: (booking: IBooking) => void;
}

export function AllBookingModal({
  bookings,
  onView,
  onEdit,
  onAssign,
  onDelete,
}: AllBookingModalProps) {
  return (
    <div className="space-y-4 p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
          {bookings.length} bookings
        </span>
        
        </div>

        
      </div>

      {/* Booking List */}
      <div className="max-h-[65vh] space-y-3 overflow-y-auto pr-1">
        {bookings.map((booking) => {
          const isCompleted = booking.status === "Completed";

          return (
            <div
              key={booking.id}
              className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm"
            >
              {/* Top row */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {booking.bookingNo}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <h3 className="mt-1 font-semibold text-gray-900">
                    {booking.customer.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {booking.service.title}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-left sm:text-right">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="font-semibold text-gray-900">
                    Rs. {booking.pricing.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Booking information */}
              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-400">Date</p>
                    <p className="text-sm font-medium text-gray-700">
                      {booking.scheduledDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-400">Time</p>
                    <p className="text-sm font-medium text-gray-700">
                      {booking.timeSlot}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-400">Worker</p>
                    <p className="text-sm font-medium text-gray-700">
                      {booking.worker?.name ?? "Unassigned"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer phone */}
              <div className="mt-3 text-sm text-gray-500">
                <span className="font-medium text-gray-700">
                  Customer:
                </span>{" "}
                {booking.customer.phone}
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap justify-end gap-2 border-t border-gray-100 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onView(booking)}
                >
                  <Eye className="mr-1.5 h-4 w-4" />
                  View
                </Button>

                {/* <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(booking)}
                >
                  <Pencil className="mr-1.5 h-4 w-4" />
                  Edit
                </Button> */}

                {!isCompleted && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onAssign(booking)}
                  >
                    <UserRound className="mr-1.5 h-4 w-4" />
                    Assign
                  </Button>
                )}

                {/* <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => onDelete(booking)}
                >
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  Delete
                </Button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}