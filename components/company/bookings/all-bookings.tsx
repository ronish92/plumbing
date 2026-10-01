"use client";


import { useState } from "react";
import { Calendar, Clock, Eye, Pencil, Phone, Trash2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileText, Settings, Search, User } from "lucide-react";
import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { IBooking } from '@/models/booking';
import { BookingsDetailForm } from './booking-detail';

export function AllBookings() {

    const [searchQuery, setSearchQuery] = useState("");
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


    const filteredBookings = bookings.filter((booking) => {
        const query = searchQuery.toLowerCase().trim();

        if (!query) return true;

        return (
            booking.service.title.toLowerCase().includes(query)
            // ||
            // service.worker.toLowerCase().includes(query)
        );
    });



    // const handleFormSuccess = () => {
    //     setShowForm(false);
    //     setEditingBooking(null);
    //     router.refresh();
    // };


    return (
        <div className="space-y-6">
            {/* Recent Project Card */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                    <p className="text-sm text-gray-600 sm:text-base">
                        Manage your Bookings
                    </p>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                        {totalBookings} bookings
                    </span>
                </div>

                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                    {/* Search */}
                    <div className="relative w-full sm:w-64 lg:w-72">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                        <Input
                            type="search"
                            placeholder="Search bookings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9"
                        />
                    </div>

                </div>
            </div>



            {/* Project Content */}

            {bookings.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Settings className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No bookings yet
                    </h3>

                </div>
            ) :

                (
                    <div className="space-y-3">
                        {filteredBookings.map((booking) => (
                            <BookingTile
                                key={booking.id}
                                booking={booking}
                                onView={handleViewBooking}
                                onAssign={handleAssign}
                            />
                        ))}
                    </div>

                )}


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
    )
}
function BookingTile({
  booking,
  onView,
  onAssign,
}: {
  booking: IBooking;
  onView: (booking: IBooking) => void;
  onAssign: (booking: IBooking) => void;
}) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center md:justify-between">
      {/* Primary Info & Metadata */}
      <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
        {/* Service & Date */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold text-gray-900">{booking.service.title}</h3>
            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              {booking.status}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-gray-500">{booking.scheduledDate}</p>
        </div>

        {/* Details Grid */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Worker */}
          <div className="min-w-[100px]">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Worker</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <User className="h-3.5 w-3.5 shrink-0 text-orange-500" />
              <span className="truncate text-sm font-medium text-gray-700">
                {booking.worker?.name || "Unassigned"}
              </span>
            </div>
          </div>

          {/* Timeslot */}
          <div className="min-w-[80px]">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Timeslot</p>
            <div className="flex items-center gap-1.5 mt-0.5 text-sm font-semibold text-gray-900">
              <Clock className="h-3.5 w-3.5 text-orange-500" />
              {booking.timeSlot}
            </div>
          </div>

          {/* Contact */}
          <div className="min-w-[100px]">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Contact</p>
            <div className="flex items-center gap-1.5 mt-0.5 text-sm font-medium text-gray-700">
              <Phone className="h-3.5 w-3.5 text-gray-400" />
              {booking.customer.phone}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2 border-t pt-3 md:border-t-0 md:border-l md:pl-4 md:pt-0">
        <Button type="button" variant="outline" size="sm" title="View" onClick={() => onView(booking)}>
          <Eye className="h-4 w-4" />
        </Button>
        {booking.status !== "Completed" && (
          <Button type="button" variant="outline" size="sm" title="Assign" onClick={() => onAssign(booking)}>
            <UserRound className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}





