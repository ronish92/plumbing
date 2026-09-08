"use client";

import {
CalendarDays,
Clock,
FileText,
CreditCard,
Tag,
User,
X,
} from "lucide-react";
import {
  Calendar,
  Conv,
  type DualDate,
} from "react-bs-ad-datepicker";
import { Button } from "@/components/ui/button";

interface BookingReviewModalProps {
open: boolean;
onClose: () => void;

serviceTitle: string;
date: string;
time: string;

customerName: string;
customerPhone?: string;

customerNote?: string;

serviceAmount: number;
discount?: number;
totalAmount: number;

promoCode?: string;

paymentMethod: string;
onPaymentMethodChange: (method: string) => void;

onConfirm: () => void;
submitting?: boolean;
}

export default function BookingReviewModal({
open,
onClose,
serviceTitle,
date,
time,
customerName,
customerPhone,
customerNote,
serviceAmount,
discount = 0,
totalAmount,
promoCode,
paymentMethod,
onPaymentMethodChange,
onConfirm,
submitting = false,
}: BookingReviewModalProps) {
if (!open) return null;

return (

 <>

    {/* Content */}
    <div className="max-h-[70vh] overflow-y-auto p-5">

      {/* Booking details */}
      <div className="rounded-xl border border-gray-200 p-4">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">
          Booking Details
        </h3>

        <div className="space-y-3">

          <div>
            <p className="text-xs text-gray-500">Service</p>
            <p className="text-sm font-medium text-gray-900">
              {serviceTitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <CalendarDays className="mt-0.5 h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm font-medium text-gray-900">
                  {date}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-sm font-medium text-gray-900">
                  {time}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Customer */}
      <div className="mt-4 rounded-xl border border-gray-200 p-4">
        <div className="mb-3 flex items-center gap-2">
          <User className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-semibold text-gray-900">
            Customer
          </h3>
        </div>

        <p className="text-sm font-medium text-gray-900">
          {customerName}
        </p>

        {customerPhone && (
          <p className="mt-1 text-xs text-gray-500">
            {customerPhone}
          </p>
        )}
      </div>

      {/* Customer note */}
      {customerNote?.trim() && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4 text-orange-500" />
            <h3 className="text-sm font-semibold text-gray-900">
              Additional Instructions
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-gray-600">
            {customerNote}
          </p>
        </div>
      )}

      {/* Payment */}
      <div className="mt-4 rounded-xl border border-gray-200 p-4">
        <div className="mb-4 flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-orange-500" />
          <h3 className="text-sm font-semibold text-gray-900">
            Payment
          </h3>
        </div>

        <div className="space-y-2 text-sm">

          <div className="flex justify-between">
            <span className="text-gray-500">
              Service
            </span>
            <span className="font-medium text-gray-900">
              Rs. {serviceAmount.toLocaleString()}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center gap-1 text-gray-500">
                <Tag className="h-3.5 w-3.5" />
                Discount
              </span>
              <span className="font-medium text-green-600">
                - Rs. {discount.toLocaleString()}
              </span>
            </div>
          )}

          {promoCode && (
            <div className="text-xs text-gray-400">
              Promo code: {promoCode}
            </div>
          )}

          <div className="my-3 border-t" />

          <div className="flex justify-between">
            <span className="font-semibold text-gray-900">
              Total
            </span>
            <span className="text-lg font-bold text-gray-900">
              Rs. {totalAmount.toLocaleString()}
            </span>
          </div>

        </div>

        {/* Payment method */}
        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Payment Method
          </label>

          <div className="grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={() => onPaymentMethodChange("eSewa")}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                paymentMethod === "eSewa"
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              eSewa
            </button>

            <button
              type="button"
              onClick={() => onPaymentMethodChange("Khalti")}
              className={`rounded-lg border px-4 py-3 text-sm font-medium transition ${
                paymentMethod === "Khalti"
                  ? "border-orange-500 bg-orange-50 text-orange-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Khalti
            </button>

          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex flex-col-reverse gap-3 border-t bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end">

      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        disabled={submitting}
      >
        Back
      </Button>

      <Button
        type="button"
        onClick={onConfirm}
        disabled={submitting}
        className="bg-orange-500 text-white hover:bg-orange-600"
      >
        {submitting ? "Processing..." : "Confirm & Pay"}
      </Button>

    </div>

 
</>

);
}
