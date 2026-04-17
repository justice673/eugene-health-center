'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

/**
 * Terms of Service Page
 */
export default function TermsOfServicePage() {
  const sections = [
    {
      id: 1,
      title: 'Acceptance of Terms',
      content: 'By accessing and using Eugene Online Health Center, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users, including patients, healthcare providers, and visitors.',
    },
    {
      id: 2,
      title: 'Services Provided',
      content: 'Eugene Online Health Center is a telemedicine platform that connects patients with licensed healthcare professionals for online consultations, prescriptions, health assessments, and related medical services. Our services are intended to supplement, not replace, the relationship between patients and their primary care physicians.',
    },
    {
      id: 3,
      title: 'User Eligibility',
      items: [
        'You must be at least 18 years old to create an account.',
        'Parents or legal guardians may create accounts for minors under their care.',
        'You must provide accurate and complete information during registration.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'One person may not use another person\'s account.',
      ],
    },
    {
      id: 4,
      title: 'Medical Disclaimer',
      items: [
        'Our services are not for medical emergencies. Call 911 or go to the nearest emergency room for urgent medical needs.',
        'Online consultations have limitations and may not be appropriate for all conditions.',
        'Doctors may decline to treat conditions that require in-person examination.',
        'You are responsible for following medical advice and taking prescribed medications as directed.',
        'We do not guarantee specific medical outcomes.',
      ],
    },
    {
      id: 5,
      title: 'Payment Terms',
      items: [
        'Consultation fees must be paid before or during the appointment.',
        'Subscription plans are billed monthly or annually as selected.',
        'All fees are non-refundable except as required by law or our refund policy.',
        'We reserve the right to change pricing with 30 days notice.',
        'Insurance claims are processed according to your plan\'s coverage.',
      ],
    },
    {
      id: 6,
      title: 'Cancellation and Refunds',
      items: [
        'You may cancel appointments up to 2 hours before the scheduled time for a full refund.',
        'Late cancellations or no-shows may be charged the full consultation fee.',
        'Subscription plans can be cancelled anytime; no refunds for partial months.',
        'Refund requests must be submitted within 24 hours of the consultation.',
        'Refunds are processed within 5-10 business days.',
      ],
    },
    {
      id: 7,
      title: 'User Conduct',
      items: [
        'Treat healthcare providers and staff with respect.',
        'Provide accurate health information to your healthcare provider.',
        'Do not use the platform for illegal purposes.',
        'Do not share, sell, or transfer your account to others.',
        'Do not attempt to hack, disrupt, or compromise platform security.',
        'Abusive behavior may result in account termination without refund.',
      ],
    },
    {
      id: 8,
      title: 'Intellectual Property',
      content: 'All content on Eugene Online Health Center, including text, graphics, logos, images, and software, is owned by us or our licensors. You may not copy, reproduce, distribute, or create derivative works without written permission. Your medical records remain your property.',
    },
    {
      id: 9,
      title: 'Privacy and Data Protection',
      content: 'Your use of our services is also governed by our Privacy Policy. We are committed to protecting your personal and health information in compliance with HIPAA and applicable privacy laws. Please review our Privacy Policy to understand how we collect, use, and protect your data.',
    },
    {
      id: 10,
      title: 'Limitation of Liability',
      items: [
        'We are not liable for medical outcomes resulting from consultations.',
        'We are not responsible for technical issues beyond our control (internet outages, device problems).',
        'Our total liability is limited to the amount you paid for services in the past 12 months.',
        'We do not guarantee uninterrupted or error-free service.',
        'Healthcare providers are independent contractors, not our employees.',
      ],
    },
    {
      id: 11,
      title: 'Termination',
      content: 'We reserve the right to suspend or terminate your account at any time for violation of these terms, fraudulent activity, or abusive behavior. You may terminate your account at any time through your account settings. Upon termination, you will retain access to your medical records.',
    },
    {
      id: 12,
      title: 'Changes to Terms',
      content: 'We may update these Terms of Service periodically. Significant changes will be communicated via email or platform notification. Continued use of our services after changes constitutes acceptance of the new terms. The "Last Updated" date at the bottom indicates when changes were made.',
    },
    {
      id: 13,
      title: 'Governing Law',
      content: 'These Terms of Service are governed by the laws of the United States and the state in which our company is registered. Any disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.',
    },
    {
      id: 14,
      title: 'Contact Information',
      content: 'For questions about these Terms of Service, please contact our legal team at legal@eugeneonlinehealth.com or call 1-800-EUGENE-HC. Our support team is available 24/7 to assist you.',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="w-full pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Terms of <span className="text-blue-200">Service</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Please read these terms carefully before using our platform
              </p>
              <p className="text-sm text-blue-200 mt-4">
                Last Updated: November 29, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Eugene Online Health Center</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of our telemedicine platform and services. By creating an account or using our services, you agree to comply with these Terms.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We recommend reading these Terms in full. If you have questions, please contact our support team before using our services.
              </p>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {sections.map((section) => (
              <div key={section.id} className="bg-gray-50 p-8 rounded-2xl shadow-md">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {section.id}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>

                {section.content && (
                  <p className="text-gray-600 leading-relaxed ml-14">{section.content}</p>
                )}

                {section.items && (
                  <ul className="space-y-3 ml-14">
                    {section.items.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-12 bg-red-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-red-600">
              <div className="flex items-start space-x-4">
                <svg className="w-8 h-8 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Disclaimer</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <strong>This platform is NOT for medical emergencies.</strong> If you are experiencing a life-threatening emergency, call 911 or go to your nearest emergency room immediately. Our services are designed for non-emergency medical consultations and should not be used for urgent or critical medical situations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Agreement Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">By Using Our Services, You Agree</h2>
            <p className="text-xl text-gray-600 mb-8">
              Your continued use of Eugene Online Health Center constitutes acceptance of these Terms of Service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/privacy"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold text-lg shadow-md"
              >
                Read Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Contact Legal Team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

