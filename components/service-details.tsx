'use client'

import { useState, useRef } from 'react';
import Form from 'next/form';
import { Navigation } from "@/components/navigation"
import {
  Calendar,
  Conv,
  type DualDate,
} from "react-bs-ad-datepicker";

import ReCAPTCHA from 'react-google-recaptcha';
import { verifyCaptcha } from '@/app/captcha/actions';
import "react-bs-ad-datepicker/dist/calendar.css";

import Image from 'next/image';
import { Star, MapPin, Clock, Shield, CheckCircle, Phone, Mail, CalendarX2Icon, Users, Wrench, Award } from 'lucide-react';

import type { Service } from "@/data/service";





interface ServiceBookingPageProps {
  service: Service;

}

const ServiceBookingPage = ({ service }: ServiceBookingPageProps) => {
  const {
    title,
    provider,
    rating,
    reviews,
    price,
    description,
    image
  } = service;

  // Booking info data
  const bookingInfo = {
    duration: '2-3 hours',
    availability: 'Mon-Sat, 8AM - 8PM',
    warranty: '12 months',
    includes: [
      'Free inspection',
      'Professional equipment',
      'Cleanup after service',
      'Safety certification'
    ],
    paymentOptions: ['Credit Card', 'PayPal', 'Cash'],
    cancellation: 'Free cancellation up to 24hrs before'
  };

  const today = Conv.today();

  const [selectedDate, setSelectedDate] = useState<DualDate | null>(today);
  const [promoCode, setPromoCode] = useState<string>('');
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [calendarType, setCalendarType] = useState<"AD" | "BS">("BS");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);



  const [selectedTime, setSelectedTime] = useState<string>('9AM - 11AM');

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

  const handlePromoApply = () => {
    const trimmedCode = promoCode.trim();

    if (!trimmedCode) {
      setStatus('Enter a promo code first.');
      return;
    }

    setIsPromoApplied(true);
    setStatus('Promo code applied.');
  };

  async function handleBookNow() {
    if (!selectedDate) {
      setStatus('Please select a booking date.');
      return;
    }

    const token = captchaRef.current?.getValue();

    if (!token) {
      setStatus('Please complete the CAPTCHA.');
      return;
    }

    try {

      setIsBooking(true);
      setStatus('');
      // const result = await verifyCaptcha(token);

      // if (!result.success) {
      //   setStatus('CAPTCHA verification failed. Try again.');
      //   captchaRef.current?.reset();
      //   return;
      // }

      // Booking data ready for your API
      const bookingData = {
        serviceId: service.id,
        serviceTitle: service.title,
        date: formatAdDate(selectedDate),
        time: selectedTime,
        promoCode: isPromoApplied ? promoCode : '',
      };

      console.log('Booking data:', bookingData);

      setStatus('Form submitted successfully!');
      captchaRef.current?.reset();
    } catch (error) {
      console.error('Booking failed:', error);
      setStatus('Something went wrong. Please try again.');
    } finally {
      setIsBooking(false);
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-linear-to-br mt-30 from-gray-50 via-white to-gray-100">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">

            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* Image */}
              <div className="relative h-65 md:h-80">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/20 to-black/40" />
              </div>

              {/* Details */}
              <div className="relative flex flex-col justify-center p-6 md:p-8">

                {/* Availability - top right */}
                <div className="absolute top-5 right-5">
                  <span className="inline-flex items-center gap-2 bg-orange-400 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                    {/* <span className="w-2 h-2 rounded-full bg-green-700 animate-pulse" /> */}
                    Available
                  </span>
                </div>

                {/* Top rated */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Award className="w-5 h-5 text-orange-400" />
                  <span className="font-medium">Top Rated Service</span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 pr-28">
                  {title}
                </h1>

                {/* Provider */}
                <p className="text-base md:text-lg text-gray-500 mb-4">
                  {provider}
                </p>

                {/* Rating + price */}
                <div className="flex flex-wrap items-center gap-5">

                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(rating)
                            ? 'fill-yellow-400'
                            : 'fill-gray-300'
                            }`}
                        />
                      ))}
                    </div>

                    <span className="font-semibold text-gray-900">
                      {rating}
                    </span>

                    <span className="text-sm text-gray-500">
                      ({reviews})
                    </span>
                  </div>

                  <div className="text-xl font-bold text-lime-600">
                    {price}
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2 mt-5 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-lime-600" />
                  <span>{bookingInfo.duration}</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12 -mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-orange-400 w-1.5 h-8 rounded-full" />
                  Service Overview
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">{description}</p>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-xs text-gray-600">{bookingInfo.duration}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                    <p className="text-sm font-medium">Warranty</p>
                    <p className="text-xs text-gray-600">{bookingInfo.warranty}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                    <p className="text-sm font-medium">Team Size</p>
                    <p className="text-xs text-gray-600">2-3 Experts</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <CheckCircle className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                    <p className="text-sm font-medium">Response</p>
                    <p className="text-xs text-gray-600">Within 2hrs</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50/60 border border-red-100 rounded-lg p-4 text-xs leading-relaxed text-red-800">
                <span className="font-bold block mb-1 text-red-700">* Price Description</span>
                Labor Charge: Rs. {service.price} Service Type: Per Point | 30 days service warranty on workmanship. This is a per unit basis charge. If your work includes multiple points, the total cost matches Rs. {service.price} × number of units.
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold mb-4">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {bookingInfo.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3">
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Provider Info */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold mb-4">About {provider}</h3>
                <div className="flex justify-left mt-5 mb-5 gap-6 text-xs text-gray-600">
                  <span>✓ Trusted Service</span>
                  <span>✓ Insured</span>
                  <span>✓ Licensed</span>
                </div>
                <div className="flex items-start gap-4">
                  {/* <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-yellow-300 rounded-2xl flex items-center justify-center text-2xl font-bold text-black">
                    {provider.split(' ').map(word => word[0]).join('')}
                  </div> */}
                  <div>
                    <p className="text-gray-700 mb-2">
                      Certified professionals with over 10 years of experience in water heater services.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-4 h-4" /> 1-800-555-0123
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <Mail className="w-4 h-4" /> support@flowfix.com
                      </span>


                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">


                  {/* Booking Info */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">

                      <div>
                        <p className="text-sm font-medium">Availability</p>
                        <p className="text-xs text-gray-600">{bookingInfo.availability}</p>
                      </div>
                    </div>
                   
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">

                      <div className="flex-[1.3] flex flex-col gap-5 md:border-l md:border-gray-200 md:pl-6">

                        {/* Date Row Selection List */}
                        {/* DATE SELECTION */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Select booking date
                          </label>

                          <div className="flex items-center justify-between mb-3">
                            {/* <div className="text-xs text-gray-500">
                            Choose your preferred date
                        </div> */}

                            <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                              <button
                                type="button"
                                onClick={() => setCalendarType("AD")}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${calendarType === "AD"
                                  ? "bg-orange-400 text-[#121212]"
                                  : "text-gray-500 hover:text-gray-900"
                                  }`}
                              >
                                English
                              </button>

                              <button
                                type="button"
                                onClick={() => setCalendarType("BS")}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${calendarType === "BS"
                                  ? "bg-orange-400 text-white"
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
                                    ? 'border-orange-500 bg-orange-50/50 text-slate-900 font-bold'
                                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                    }`}
                                >
                                  {isSelected ? `✓ ${time}` : time}
                                </button>
                              );
                            })}
                          </div>


                        </div>

                        <Form
                          action=""
                          className="flex w-66 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden"
                        >
                          <input
                            name="query"
                            type="text"
                            placeholder="Promo codes"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            disabled={isPromoApplied}
                            className="flex-1 px-6 py-4 text-gray-700 placeholder-gray-400 focus:outline-none text-base bg-transparent min-w-0"
                          />

                          <button
                            type="button"
                            onClick={handlePromoApply}
                            disabled={!promoCode.trim() || isPromoApplied}
                            aria-label="Submit Search"
                            className="flex items-center justify-center px-6 bg-orange-400 hover:bg-lime text-white transition-colors cursor-pointer group"
                          >

                            <span className="text-xs font-medium tracking-wide">
                              {isPromoApplied ? 'APPLIED' : 'APPLY'}
                            </span>

                          </button>
                        </Form>
                        <div className="w-full overflow-hidden flex justify-center">
                          <div className="origin-top scale-[0.9] mb-1">
                            <ReCAPTCHA
                              ref={captchaRef}
                              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                              onChange={() => setStatus('')}
                            />
                          </div>
                        </div>

                         <p className="text-xs text-gray-600">*{bookingInfo.cancellation}</p>

                        {/* Final Execution Form Submit CTA Trigger */}
                        <button
                          type="button"
                          onClick={handleBookNow}
                          disabled={isBooking}
                          className="w-full bg-orange-400 hover:bg-lime text-white font-bold py-3.5 px-4 rounded-lg shadow-sm transition text-center mt-auto cursor-pointer"
                        >
                          {isBooking ? 'Booking...' : 'Book Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

        </div>


      </main>
    </>
  );
};

export default ServiceBookingPage;