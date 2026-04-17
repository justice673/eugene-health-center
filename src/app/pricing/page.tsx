'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

/**
 * Pricing Page
 * Subscription plans and consultation fees
 */
export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 1,
      name: 'Basic Plan',
      description: 'Perfect for occasional consultations',
      monthlyPrice: 29,
      yearlyPrice: 290,
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      features: [
        '2 Online Consultations/month',
        'Access to General Practitioners',
        'Prescription Services',
        'Basic Health Records',
        'Email Support',
        '24/7 Emergency Hotline',
      ],
      popular: false,
    },
    {
      id: 2,
      name: 'Standard Plan',
      description: 'Most popular for regular healthcare',
      monthlyPrice: 59,
      yearlyPrice: 590,
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      features: [
        '5 Online Consultations/month',
        'Access to All Specialists',
        'Priority Prescription Services',
        'Advanced Health Records',
        'Lab Test Coordination',
        'Mental Health Support',
        'Priority Support',
        '24/7 Emergency Hotline',
        '10% Discount on Medications',
      ],
      popular: true,
    },
    {
      id: 3,
      name: 'Premium Plan',
      description: 'Comprehensive healthcare coverage',
      monthlyPrice: 99,
      yearlyPrice: 990,
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      color: 'from-yellow-500 to-yellow-600',
      features: [
        'Unlimited Online Consultations',
        'Access to All Specialists',
        'Dedicated Health Coordinator',
        'Complete Health Records',
        'Priority Lab Test Coordination',
        'Mental Health & Wellness Programs',
        'Nutrition Counseling',
        'Chronic Disease Management',
        '24/7 Priority Support',
        '20% Discount on Medications',
        'Free Home Sample Collection',
        'Annual Health Checkup',
      ],
      popular: false,
    },
  ];

  const payPerConsultation = {
    general: 25,
    specialist: 45,
    emergency: 75,
  };

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Simple, Transparent <span className="text-blue-200">Pricing</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Choose a plan that fits your healthcare needs. All plans include access to certified doctors and secure online consultations.
              </p>
            </div>
          </div>
        </section>

        {/* Billing Toggle */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-lg font-semibold ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative w-16 h-8 bg-blue-600 rounded-full transition-colors"
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    billingCycle === 'yearly' ? 'transform translate-x-8' : ''
                  }`}
                />
              </button>
              <span className={`text-lg font-semibold ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-gray-500'}`}>
                Yearly
              </span>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                Save 20%
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 ${
                    plan.popular ? 'ring-4 ring-purple-500 scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 font-bold text-sm">
                      🔥 MOST POPULAR
                    </div>
                  )}
                  
                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <div className="flex justify-center mb-4 text-white">{plan.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="flex items-end justify-center mb-2">
                        <span className="text-5xl font-bold text-gray-900">
                          ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </span>
                        <span className="text-gray-600 ml-2 mb-2">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <p className="text-sm text-green-600 font-semibold">
                          Save ${(plan.monthlyPrice * 12) - plan.yearlyPrice} per year
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href="/signup"
                      className={`block w-full text-center py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pay Per Consultation */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Pay Per <span className="text-blue-600">Consultation</span>
              </h2>
              <p className="text-xl text-gray-600">
                Not ready for a subscription? Pay only when you need care.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">👨‍⚕️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">General Consultation</h3>
                <p className="text-gray-600 mb-6">Connect with a general practitioner</p>
                <div className="text-4xl font-bold text-blue-600 mb-6">${payPerConsultation.general}</div>
                <Link
                  href="/consultation"
                  className="block bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🩺</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Specialist Consultation</h3>
                <p className="text-gray-600 mb-6">Consult with medical specialists</p>
                <div className="text-4xl font-bold text-purple-600 mb-6">${payPerConsultation.specialist}</div>
                <Link
                  href="/consultation"
                  className="block bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                >
                  Book Now
                </Link>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">🚨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Emergency Consultation</h3>
                <p className="text-gray-600 mb-6">Urgent care within 15 minutes</p>
                <div className="text-4xl font-bold text-red-600 mb-6">${payPerConsultation.emergency}</div>
                <Link
                  href="/consultation"
                  className="block bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold"
                >
                  Get Help Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What's Included in <span className="text-blue-600">Every Plan</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🔒', title: 'HIPAA Compliant', description: 'Your data is secure and private' },
                { icon: '📱', title: 'Mobile App Access', description: 'iOS and Android apps available' },
                { icon: '💊', title: 'E-Prescriptions', description: 'Digital prescriptions sent instantly' },
                { icon: '📊', title: 'Health Records', description: 'Access your medical history anytime' },
                { icon: '🎥', title: 'HD Video Calls', description: 'Crystal clear consultations' },
                { icon: '📧', title: 'Secure Messaging', description: 'Chat with your doctor anytime' },
                { icon: '🔔', title: 'Reminders', description: 'Medication and appointment alerts' },
                { icon: '🌍', title: 'Nationwide Coverage', description: 'Licensed doctors across the US' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked <span className="text-blue-600">Questions</span>
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes! You can cancel your subscription at any time. Your access will continue until the end of your billing period.',
                },
                {
                  q: 'Do you accept insurance?',
                  a: 'We accept most major insurance plans. You can check with our support team to verify your coverage.',
                },
                {
                  q: 'How quickly can I see a doctor?',
                  a: 'Most consultations are available within 15-30 minutes. Emergency consultations are prioritized and typically start within 15 minutes.',
                },
                {
                  q: 'Are the doctors licensed?',
                  a: 'Yes! All our doctors are board-certified and licensed to practice medicine in their respective states.',
                },
                {
                  q: 'What if I need a prescription?',
                  a: 'If medically appropriate, your doctor can send e-prescriptions directly to your preferred pharmacy.',
                },
              ].map((faq, idx) => (
                <details
                  key={idx}
                  className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors group"
                >
                  <summary className="font-bold text-gray-900 cursor-pointer flex items-center justify-between">
                    <span>{faq.q}</span>
                    <svg className="w-5 h-5 text-blue-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-gray-600 mt-4">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of patients who trust Eugene Online Health Center for their healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Sign Up Now
              </Link>
              <Link
                href="/contact"
                className="bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-800 transition-all duration-300 shadow-lg border-2 border-white"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

