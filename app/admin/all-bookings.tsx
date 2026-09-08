"use client";

import { Maximize2, } from 'lucide-react'
import { useState } from "react";
import { useRouter } from "next/navigation";


import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, RefreshCw, Code, FileText, Settings, Star, IndianRupee, CurrencyIcon, Search, User } from "lucide-react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { IBooking } from '@/models/booking';
import { AllBookingModal } from './booking-expanded';
import { BookingsDetailForm } from './booking-detail';

export function AllBookings() {


const [showAllBookings, setShowAllBookings] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
    const [showBookingDetails, setShowBookingDetails] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);
  

  const handleViewBooking = (booking: IBooking) => {    
    setSelectedBooking(booking);
    setShowBookingDetails(true);
};

const handleEdit = (booking: IBooking) => {
    setSelectedBooking(booking);
    setShowBookingForm(true);
};

const handleAssign = (booking: IBooking) => {
    setSelectedBooking(booking);
    // later open assign-worker modal
};

const handleDelete = (booking: IBooking) => {
    setSelectedBooking(booking);
  
};


    const bookings: IBooking[] = [
        {
            id: "book-10001",
            bookingNo: "BK-2026-0001",

            customer: {
                id: "usr-1001",
                name: "Ronish Karki",
                email: "ronish@example.com",
                phone: "+977 9812345678",
            },

            service: {
                id: "srv-92834",
                title: "Premium House Painting",
            },

            worker: {
                id: "emp-1001",
                name: "Aashish Sharma",
            },

            scheduledDate: "2026-09-02",
            timeSlot: "9:00 AM - 11:00 AM",

            pricing: {
                serviceAmount: 1250,
                discount: 100,
                totalAmount: 1150,
                currency: "NPR",
                promoCode: "WELCOME100",
                paymentStatus: "Paid",
                paymentMethod: "eSewa",
                transactionId: "ESW-92837465",
            },

            status: "Confirmed",

            customerNote:
                "Please call before arriving. Parking is available near the entrance.",

            createdAt: "2026-08-30T09:15:00Z",
            updatedAt: "2026-08-30T09:32:00Z",
        },

        {
            id: "book-10002",
            bookingNo: "BK-2026-0002",

            customer: {
                id: "usr-1002",
                name: "Sujan Thapa",
                email: "sujan@example.com",
                phone: "+977 9801122334",
            },

            service: {
                id: "srv-78123",
                title: "Kitchen Plumbing Repair",
            },

            worker: null,

            scheduledDate: "2026-09-03",
            timeSlot: "11:00 AM - 1:00 PM",

            pricing: {
                serviceAmount: 1800,
                discount: 0,
                totalAmount: 1800,
                currency: "NPR",
                paymentStatus: "Pending",
            },

            status: "Pending",

            customerNote: "Kitchen sink is leaking continuously.",

            createdAt: "2026-08-30T13:40:00Z",
            updatedAt: "2026-08-30T13:40:00Z",
        },

        {
            id: "book-10003",
            bookingNo: "BK-2026-0003",

            customer: {
                id: "usr-1003",
                name: "Pratik Shrestha",
                email: "pratik@example.com",
                phone: "+977 9860123456",
            },

            service: {
                id: "srv-56291",
                title: "Bathroom Pipe Installation",
            },

            worker: {
                id: "emp-1003",
                name: "Bikash Gurung",
            },

            scheduledDate: "2026-09-01",
            timeSlot: "2:00 PM - 4:00 PM",

            pricing: {
                serviceAmount: 2500,
                discount: 250,
                totalAmount: 2250,
                currency: "NPR",
                promoCode: "SAVE250",
                paymentStatus: "Paid",
                paymentMethod: "Khalti",
                transactionId: "KHL-72635182",
            },

            status: "Completed",

            createdAt: "2026-08-29T16:20:00Z",
            updatedAt: "2026-08-30T08:10:00Z",
        },


    ];

    const totalBookings = bookings.length;

    const completedBookings = bookings.filter(
        (booking) => booking.status === "Completed"
    ).length;

    const pendingBookings = bookings.filter(
        (booking) => booking.status === "Pending"
    ).length;

    const cancelledBookings = bookings.filter(
        (booking) => booking.status === "Cancelled"
    ).length;


  


    // const handleFormSuccess = () => {
    //     setShowForm(false);
    //     setEditingBooking(null);
    //     router.refresh();
    // };


    return (
        <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {/* Recent Project Card */}
            <div className=" rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm">
                <div className="mb-3 sm:mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm sm:text-base font-semibold text-black">Recent Bookings</h2>
                        <button 
                         onClick={() => setShowAllBookings(true)}
                        className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg hover:bg-gray-100 bg-gray-50">
                            <Maximize2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                    </div>

                </div>

                {/* Project Content */}
                <div className="relative flex w-full h-70 sm:h-87.5 items-center justify-center rounded-lg sm:rounded-xl bg-gray-50 p-4 sm:p-8 overflow-hidden">
                    {bookings.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                                <Settings className="h-6 w-6 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No services yet
                            </h3>

                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                            {bookings.map((booking) => (
                                <BookingsTile
                                    key={booking.id}
                                    booking={booking}
                                  

                                />
                            ))}
                        </div>
                    )}

                    <Modal
                        title="All Bookings"
                        isOpen={showAllBookings}
                         onClose={() => setShowAllBookings(false)}
                        size="xl"
                    >
                       <AllBookingModal
        bookings={bookings}
        onView={handleViewBooking}
        onEdit={handleEdit}
        onAssign={handleAssign}
        onDelete={handleDelete}
    />
                       
                    </Modal>

                    <Modal
  title="Booking Details"
  isOpen={showBookingDetails}
  onClose={() => setShowBookingDetails(false)}
  size="xl"
>
  <BookingsDetailForm
    booking={selectedBooking}
    onClose={() => setShowBookingDetails(false)}
    onEdit={handleEdit}
    onDelete={handleDelete}
  />
</Modal>





                </div>

                <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-sm">
                    <div className="mb-3 sm:mb-4 flex items-center justify-between">
                        <h2 className="text-sm sm:text-base font-semibold text-black">Booking Stats</h2>
                        <button className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg hover:bg-gray-100">
                            <FileText className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                            <div className="mb-1 text-[10px] text-gray-500">
                                Pending
                            </div>

                            <div className="text-xl font-bold text-gray-900">
                                {pendingBookings}
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 text-[10px] text-gray-500">
                                Assigned
                            </div>

                            <div className="text-xl font-bold text-gray-900">
                                {cancelledBookings}
                            </div>
                        </div>

                        <div>
                            <div className="mb-1 text-[10px] text-gray-500">
                                Completed
                            </div>

                            <div className="text-xl font-bold text-gray-900">
                                {completedBookings}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


function BookingsTile({
    booking,
  
}: {
    booking: IBooking;
   
}) {
    const getStatusStyles = (status?: string) => {
        switch (status) {
            case "Completed":
                return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";

            case "Pending":
                return "bg-amber-50 text-amber-700 ring-amber-600/15";

            case "Confirmed":
                return "bg-blue-50 text-blue-700 ring-blue-600/20";

            case "Assigned":
                return "bg-violet-50 text-violet-700 ring-violet-600/20";

            case "Cancelled":
                return "bg-rose-50 text-rose-700 ring-rose-600/10";

            default:
                return "bg-gray-50 text-gray-600 ring-gray-500/10";
        }
    };

    return (
        <div className="rounded-xl bg-white border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                        {booking.customer.name}
                    </p>

                    <p className="text-[11px] text-gray-400 mt-0.5">
                        {booking.bookingNo}
                    </p>
                </div>

                <span
                    className={`shrink-0 inline-flex items-center rounded-md px-2 py-1 text-[10px] font-semibold ring-1 ring-inset ${getStatusStyles(
                        booking.status
                    )}`}
                >
                    {booking.status}
                </span>
            </div>

            {/* Service */}
            <div className="mt-3">
                <p className="text-xs font-medium text-gray-800 truncate">
                    {booking.service.title}
                </p>

                <p className="text-[11px] text-gray-400 mt-0.5">
                    {booking.scheduledDate} · {booking.timeSlot}
                </p>
            </div>

            {/* Bottom */}
            {/* <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <div>
                    <p className="text-[10px] text-gray-400">
                        Total
                    </p>

                    <p className="text-sm font-semibold text-gray-900">
                        {booking.pricing.currency}{" "}
                        {booking.pricing.totalAmount.toLocaleString()}
                    </p>
                </div>

                
            </div> */}
        </div>
    );
}

