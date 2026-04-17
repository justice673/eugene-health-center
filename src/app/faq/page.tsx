'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

/**
 * FAQ Page
 * Frequently Asked Questions
 */
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 1,
      name: 'Getting Started',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click on the "Sign Up" button in the top right corner. Fill in your basic information including name, email, and phone number. Choose a secure password and you\'re all set! You can start using our services immediately after registration.',
        },
        {
          question: 'Do I need a subscription to use the platform?',
          answer: 'No, subscriptions are optional. You can choose a monthly or yearly plan for unlimited consultations, or pay per consultation as needed. Our flexible pricing ensures you only pay for what you use.',
        },
        {
          question: 'Is my personal health information secure?',
          answer: 'Absolutely. We use bank-level encryption (256-bit SSL) and are fully HIPAA compliant. Your data is stored on secure servers and never shared with third parties without your explicit consent.',
        },
      ],
    },
    {
      id: 2,
      name: 'Consultations',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      faqs: [
        {
          question: 'How quickly can I see a doctor?',
          answer: 'For general consultations, doctors are typically available within 15-30 minutes. Emergency consultations are prioritized and usually start within 10-15 minutes. You can also schedule appointments in advance.',
        },
        {
          question: 'What types of doctors are available?',
          answer: 'We have general practitioners, specialists in cardiology, dermatology, pediatrics, mental health, gynecology, and more. All our doctors are board-certified and licensed professionals.',
        },
        {
          question: 'Can I choose my own doctor?',
          answer: 'Yes! You can browse our doctor profiles, view their specialties, experience, and patient ratings, then select the one you prefer. You can also request the same doctor for follow-up appointments.',
        },
        {
          question: 'What happens during a video consultation?',
          answer: 'You\'ll join a secure video call with your doctor. They\'ll ask about your symptoms, medical history, and may request to see affected areas. After diagnosis, they\'ll provide treatment recommendations and can send prescriptions directly to your pharmacy.',
        },
      ],
    },
    {
      id: 3,
      name: 'Prescriptions & Medications',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      faqs: [
        {
          question: 'Can doctors prescribe medication online?',
          answer: 'Yes, our doctors can prescribe most medications electronically. Prescriptions are sent directly to your preferred pharmacy. Note: Controlled substances may have restrictions depending on your location.',
        },
        {
          question: 'How do I get my prescription filled?',
          answer: 'After your consultation, your e-prescription is sent to your chosen pharmacy. You can pick it up in-store or request home delivery through our partner pharmacies. We also offer medication delivery services in select areas.',
        },
        {
          question: 'Can I request prescription refills?',
          answer: 'Yes! Log into your dashboard, go to "My Medications," and request a refill. For ongoing prescriptions, your doctor may approve refills without a consultation. New or changed medications require a consultation.',
        },
      ],
    },
    {
      id: 4,
      name: 'Payments & Billing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards (Visa, Mastercard, American Express), PayPal, and health insurance for covered services. All transactions are secure and encrypted.',
        },
        {
          question: 'Do you accept insurance?',
          answer: 'Yes, we work with many major insurance providers. During checkout, you can enter your insurance information. We\'ll verify coverage and let you know what\'s covered. You\'ll only pay your copay or deductible.',
        },
        {
          question: 'What are the consultation fees?',
          answer: 'General consultations start at $25, specialist consultations at $45, and emergency consultations at $75. Subscription plans offer unlimited consultations starting at $29/month, which can save you money if you need regular care.',
        },
        {
          question: 'Can I get a refund?',
          answer: 'If you\'re not satisfied with your consultation, contact our support team within 24 hours. We review each case individually and offer refunds or free follow-up consultations when appropriate.',
        },
      ],
    },
    {
      id: 5,
      name: 'Technical Support',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      faqs: [
        {
          question: 'What devices can I use for video consultations?',
          answer: 'You can use any device with a camera and microphone: smartphones (iOS/Android), tablets, laptops, or desktop computers. We recommend using Chrome, Safari, or Firefox browsers for the best experience.',
        },
        {
          question: 'What if I have connection issues during my consultation?',
          answer: 'If you experience technical difficulties, our system will automatically try to reconnect you. If the issue persists, the doctor will call you on your registered phone number to continue the consultation. You won\'t be charged extra.',
        },
        {
          question: 'How do I access my medical records?',
          answer: 'Log into your dashboard and click on "Medical Records." You\'ll find all your consultation notes, prescriptions, lab results, and health history. You can download or share these records anytime.',
        },
      ],
    },
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="w-full pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Frequently Asked <span className="text-blue-200">Questions</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Find answers to common questions about Eugene Online Health Center
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-14 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  />
                  <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCategories.map((category) => (
              <div key={category.id} className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-blue-600 text-white p-3 rounded-lg">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {category.name}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.faqs.map((faq, index) => {
                    const globalIndex = categories.findIndex(c => c.id === category.id) * 100 + index;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div
                        key={index}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                          className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-lg font-semibold text-gray-900 pr-4">
                            {faq.question}
                          </span>
                          <svg
                            className={`w-6 h-6 text-blue-600 flex-shrink-0 transform transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-5 text-gray-600 leading-relaxed animate-fadeIn">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl text-gray-600">No questions found matching your search.</p>
              </div>
            )}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Support
              </Link>
              <Link
                href="/consultation"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-md"
              >
                Start Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

