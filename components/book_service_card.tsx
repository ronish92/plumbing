'use client'

import { useState } from 'react';
import { format } from "date-fns";
import {
    Calendar,
    Conv,
    type DualDate,
} from "react-bs-ad-datepicker";
import Calender from '@iconify/icons-lucide/calendar-check'

import "react-bs-ad-datepicker/dist/calendar.css";
import { Icon } from './ui/icon';



// Define the shape of our component properties
interface BookServiceCardProps {
    initialPrice?: number;
    currency?: string;
    unitLabel?: string;
    onBookingSubmit?: (bookingData: { date: string; time: string; promoCode: string }) => void;
}

export default function BookServiceCard({
    initialPrice = 1200,
    currency = 'Rs',
    unitLabel = 'Unit',
    onBookingSubmit
}: BookServiceCardProps) {


    const today = Conv.today();

    const [selectedDate, setSelectedDate] = useState<DualDate | null>(today);

    const [calendarType, setCalendarType] = useState<"AD" | "BS">("BS");
    const [calendarOpen, setCalendarOpen] = useState(false);



    const [selectedTime, setSelectedTime] = useState<string>('9AM - 11AM');
    const [promoCode, setPromoCode] = useState<string>('');
    const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false);

    const formatAdDate = (date: DualDate) => {
        const { year, month, day } = date.ad;

        return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
            2,
            "0"
        )}`;
    };

    // Sample time slots array
    const timeSlots = [
        '9AM - 11AM',
        '11AM - 1PM', '1PM - 3PM', '3PM - 5PM',
        '5PM -8PM'
    ];

    const handleBookNow = () => {
        if (!selectedDate) {
            alert("Please select a booking date.");
            return;
        }

        onBookingSubmit?.({
            date: formatAdDate(selectedDate),
            time: selectedTime,
            promoCode,
        });
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-stretch p-6 gap-6 font-sans">

            {/* LEFT SECTION: Pricing and Policy Details */}
            <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Book a Service</h2>

                {/* Dynamic Price Display Tag */}
                <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
                    <span className="text-gray-500 font-medium">Price</span>
                    <span className="text-xl font-bold text-gray-900">
                        {currency} {initialPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })} / {unitLabel}
                    </span>
                </div>

                {/* Warning Policy Content Alert Box */}
               

                {/* Coupon Form Input Area */}
                <div className="flex gap-2 mt-auto pt-4 md:pt-0">
                    <input
                        type="text"
                        placeholder="eg: FREE20"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={isPromoApplied}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
                    />
                    <button
                        type="button"
                        onClick={() => setIsPromoApplied(true)}
                        className="bg-lime hover:bg-pineapple transition text-white px-4 py-2 rounded-md text-sm font-semibold tracking-wide"
                    >
                        {isPromoApplied ? 'APPLIED' : 'APPLY'}
                    </button>
                </div>
            </div>

            {/* RIGHT SECTION: Interactive Selection Calendar/Slots */}
            <div className="flex-[1.3] flex flex-col gap-5 md:border-l md:border-gray-200 md:pl-6">

                {/* Date Row Selection List */}
                {/* DATE SELECTION */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select booking date
                    </label>

                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs text-gray-500">
                            Choose your preferred date
                        </div>

                        <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                            <button
                                type="button"
                                onClick={() => setCalendarType("AD")}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${calendarType === "AD"
                                    ? "bg-[#AFFF00] text-[#121212]"
                                    : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                English
                            </button>

                            <button
                                type="button"
                                onClick={() => setCalendarType("BS")}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${calendarType === "BS"
                                    ? "bg-[#AFFF00] text-[#121212]"
                                    : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                नेपाली
                            </button>
                        </div>
                    </div>

                    <Calendar
                        type={calendarType}
                        mode="single"
                        value={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                            setCalendarOpen(false);
                        }}
                        locale={calendarType === "BS" ? "ne" : "en"}
                        theme="light"
                        variant="outlined"
                        showToday
                        highlightToday
                        animate
                        portal
                        placement="bottom-start"
                        open={calendarOpen}
                        onOpenChange={setCalendarOpen}
                        isDateDisabled={(date) => Conv.cmp(date, today) < 0}
                        className="w-full"
                        ariaLabel="Select booking date"
                        trigger={
                            <div
                               
                                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition text-left"
                            >
                                <div>
                                    <div className="text-xs text-gray-500">
                                        Booking date
                                    </div>

                                    <div className="text-xs font-semibold text-gray-900 mt-1">
                                        {selectedDate
                                            ? calendarType === "BS"
                                                ? Conv.fmtBS(selectedDate)
                                                : Conv.fmtAD(selectedDate)
                                            : "Select a date"}
                                    </div>
                                </div>
                             <span className=' ml-5'
                             >
                                🗓️</span> 
                                
                            </div>
                        }
                    />

                    {/* {selectedDate && (
                        <div className="mt-3 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
                            <div className="text-xs text-gray-500">
                                Selected date
                            </div>

                            <div className="text-sm font-semibold text-gray-900 mt-0.5">
                                {calendarType === "BS"
                                    ? Conv.fmtBS(selectedDate)
                                    : Conv.fmtAD(selectedDate)}
                            </div>

                            <div className="text-xs text-gray-400 mt-0.5">
                                {calendarType === "BS"
                                    ? `AD: ${Conv.fmtAD(selectedDate)}`
                                    : `BS: ${Conv.fmtBS(selectedDate)}`}
                            </div>
                        </div>
                    )} */}
                </div>


                {/* Time Grid Matrix Blocks */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Choose a time period</label>
                    <p className="text-[11px] text-gray-400 mb-2">Team will arrive within the selected time slot</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {timeSlots.map((time) => {
                            const isSelected = selectedTime === time;
                            return (
                                <button
                                    key={time}
                                    type="button"
                                    onClick={() => setSelectedTime(time)}
                                    className={`py-2 px-1 text-center rounded-full text-xs transition font-medium border ${isSelected
                                        ? 'border-lime bg-orange-50/50 text-slate-900 font-bold'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        }`}
                                >
                                    {isSelected ? `✓ ${time}` : time}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Final Execution Form Submit CTA Trigger */}
                <button
                    type="button"
                    onClick={handleBookNow}
                    className="w-full bg-lime hover:bg-pineapple text-white font-bold py-3.5 px-4 rounded-lg shadow-sm transition text-center mt-auto cursor-pointer"
                >
                    Book Now
                </button>
            </div>

        </div>
    );
}
