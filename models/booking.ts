export interface IBooking {
  id: string;
  bookingNo: string;

  // Customer
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };

 
  service: {
    id: string;
    title: string;
  };


  worker: {
    id: string;
    name: string;
  } | null;

 
  scheduledDate: string; // YYYY-MM-DD
  timeSlot: string;

  pricing: {
    serviceAmount: number;
    discount: number;
    totalAmount: number;
    currency: string;
    promoCode?: string;
    paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
    paymentMethod?: "eSewa" | "Khalti" | "Cash" | "Card";
    transactionId?: string;
  };


  status:
    | "Pending"
    | "Confirmed"
    | "Assigned"
    | "In Progress"
    | "Completed"
    | "Cancelled";


  customerNote?: string;

  createdAt: string;
  updatedAt: string;
}