'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

/**
 * Consultation Booking Page
 * Book appointments and make payments
 */
export default function ConsultationPage() {
  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const consultationTypes = [
    {
      id: 'general',
      name: 'General Consultation',
      price: 25,
      duration: '15-20 min',
      description: 'Connect with a general practitioner for common health concerns',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'specialist',
      name: 'Specialist Consultation',
      price: 45,
      duration: '30 min',
      description: 'Consult with medical specialists for specific conditions',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 'emergency',
      name: 'Emergency Consultation',
      price: 75,
      duration: '10-15 min',
      description: 'Urgent care within 15 minutes for critical situations',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
  ];

  const availableDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'General Practitioner',
      experience: '15 years',
      rating: 4.9,
      patients: '2000+',
      availability: 'Available Now',
      image: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      experience: '12 years',
      rating: 4.8,
      patients: '1800+',
      availability: 'Available in 30 min',
      image: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      specialty: 'Neurologist',
      experience: '18 years',
      rating: 5.0,
      patients: '2500+',
      availability: 'Available in 1 hour',
      image: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  ];

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentSuccess(true);
    }, 1500);
  };

  const selectedConsultation = consultationTypes.find(c => c.id === consultationType);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="w-full pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Book Your <span className="text-blue-200">Consultation</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Connect with certified doctors online. Get medical advice, prescriptions, and treatment plans from the comfort of your home.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step >= s ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 5 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step > s ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Type</span>
                <span>Doctor</span>
                <span>Schedule</span>
                <span>Details</span>
                <span>Payment</span>
              </div>
            </div>

            {/* Step 1: Choose Consultation Type */}
            {step === 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Consultation Type</h2>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {consultationTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setConsultationType(type.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        consultationType === type.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-5xl mb-4">{type.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">${type.price}</span>
                        <span className="text-sm text-gray-500">{type.duration}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!consultationType}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}

            {/* Step 2: Select Doctor */}
            {step === 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Doctor</h2>

                <div className="space-y-4 mb-8">
                  {availableDoctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor)}
                      className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                        selectedDoctor?.id === doctor.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-5xl">{doctor.image}</div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                            <p className="text-gray-600">{doctor.specialty}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>⭐ {doctor.rating}</span>
                              <span>👥 {doctor.patients}</span>
                              <span>📅 {doctor.experience}</span>
                            </div>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                          {doctor.availability}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedDoctor}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Schedule Appointment */}
            {step === 3 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Appointment</h2>

                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Time Slot</label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            selectedTime === time
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <p className="font-semibold text-gray-900 text-sm">{time}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Consultation Details */}
            {step === 4 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Consultation Details</h2>

                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Describe your symptoms and concerns
                    </label>
                    <textarea
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                      placeholder="Please describe your symptoms, medical history, current medications, and any specific concerns you'd like to discuss..."
                    />
                  </div>

                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 mb-3">📋 Appointment Summary</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Type:</span> {selectedConsultation?.name}</p>
                      <p><span className="font-semibold">Doctor:</span> {selectedDoctor?.name}</p>
                      <p><span className="font-semibold">Date:</span> {selectedDate}</p>
                      <p><span className="font-semibold">Time:</span> {selectedTime}</p>
                      <p><span className="font-semibold">Duration:</span> {selectedConsultation?.duration}</p>
                      <p className="text-lg pt-2"><span className="font-semibold">Total:</span> <span className="text-blue-600 font-bold">${selectedConsultation?.price}</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    disabled={!symptoms.trim()}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Payment */}
            {step === 5 && !showPaymentSuccess && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>

                {/* Payment Methods */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Select Payment Method</label>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {[
                      { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
                      { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                      { id: 'insurance', name: 'Insurance', icon: '🏥' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === method.id
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{method.icon}</div>
                        <p className="font-semibold text-gray-900 text-sm">{method.name}</p>
                      </button>
                    ))}
                  </div>

                  {/* Card Payment Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consultation Fee</span>
                      <span className="font-semibold">${selectedConsultation?.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee</span>
                      <span className="font-semibold">$2</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between text-lg">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-blue-600">${(selectedConsultation?.price || 0) + 2}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={!paymentMethod}
                    className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Pay ${(selectedConsultation?.price || 0) + 2}
                  </button>
                </div>
              </div>
            )}

            {/* Payment Success */}
            {showPaymentSuccess && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful! 🎉</h2>
                <p className="text-gray-600 mb-8">
                  Your consultation has been booked successfully. You'll receive a confirmation email with the video call link.
                </p>

                <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
                  <h3 className="font-bold text-gray-900 mb-4">📅 Appointment Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Confirmation ID:</span> #EHC-{Math.floor(Math.random() * 100000)}</p>
                    <p><span className="font-semibold">Doctor:</span> {selectedDoctor?.name}</p>
                    <p><span className="font-semibold">Date:</span> {selectedDate}</p>
                    <p><span className="font-semibold">Time:</span> {selectedTime}</p>
                    <p><span className="font-semibold">Amount Paid:</span> ${(selectedConsultation?.price || 0) + 2}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link
                    href="/dashboard"
                    className="block w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="block w-full bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

