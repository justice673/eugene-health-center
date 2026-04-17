'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Privacy Policy Page
 */
export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: 1,
      title: 'Information We Collect',
      content: [
        'Personal Information: Name, email address, phone number, date of birth, and address.',
        'Health Information: Medical history, symptoms, diagnoses, prescriptions, and consultation records.',
        'Technical Information: IP address, browser type, device information, and usage data.',
        'Payment Information: Credit card details and billing information (processed securely through encrypted payment gateways).',
      ],
    },
    {
      id: 2,
      title: 'How We Use Your Information',
      content: [
        'Provide Healthcare Services: To facilitate online consultations, prescriptions, and medical care.',
        'Improve Our Platform: To enhance user experience and develop new features.',
        'Communication: To send appointment reminders, health tips, and important updates.',
        'Legal Compliance: To comply with healthcare regulations and legal obligations.',
        'Security: To protect against fraud and unauthorized access.',
      ],
    },
    {
      id: 3,
      title: 'Information Sharing',
      content: [
        'Healthcare Providers: Your information is shared with doctors and specialists providing your care.',
        'Pharmacies: Prescriptions are sent to your chosen pharmacy for fulfillment.',
        'Service Providers: Trusted third parties who help us operate our platform (payment processors, cloud storage).',
        'Legal Requirements: When required by law, court order, or government request.',
        'We NEVER sell your personal or health information to third parties for marketing purposes.',
      ],
    },
    {
      id: 4,
      title: 'Data Security',
      content: [
        '256-bit SSL Encryption: All data transmission is encrypted using bank-level security.',
        'HIPAA Compliance: We follow strict HIPAA guidelines to protect your health information.',
        'Secure Servers: Data is stored on secure, encrypted servers with regular security audits.',
        'Access Controls: Only authorized personnel can access your information on a need-to-know basis.',
        'Regular Updates: We continuously update our security measures to protect against new threats.',
      ],
    },
    {
      id: 5,
      title: 'Your Rights',
      content: [
        'Access: You can view and download your medical records anytime.',
        'Correction: Request corrections to inaccurate information.',
        'Deletion: Request deletion of your account and data (subject to legal retention requirements).',
        'Opt-Out: Unsubscribe from marketing communications at any time.',
        'Data Portability: Request a copy of your data in a portable format.',
      ],
    },
    {
      id: 6,
      title: 'Cookies and Tracking',
      content: [
        'We use cookies to improve your experience and analyze platform usage.',
        'Essential Cookies: Required for platform functionality.',
        'Analytics Cookies: Help us understand how users interact with our platform.',
        'You can control cookie preferences through your browser settings.',
      ],
    },
    {
      id: 7,
      title: 'Children\'s Privacy',
      content: [
        'Our services are not intended for children under 13 without parental consent.',
        'Parents/guardians must create accounts for minors.',
        'We take extra precautions to protect children\'s health information.',
      ],
    },
    {
      id: 8,
      title: 'Changes to This Policy',
      content: [
        'We may update this privacy policy periodically.',
        'You will be notified of significant changes via email.',
        'Continued use of our services after changes constitutes acceptance.',
        'Last Updated: November 2025',
      ],
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Privacy <span className="text-blue-200">Policy</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Your privacy and security are our top priorities. Learn how we protect your information.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                At Eugene Online Health Center, we understand the sensitive nature of your health information. This Privacy Policy explains how we collect, use, protect, and share your personal and medical data.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By using our services, you agree to the terms outlined in this policy. We are fully compliant with HIPAA (Health Insurance Portability and Accountability Act) and other applicable privacy regulations.
              </p>
            </div>
          </div>
        </section>

        {/* Policy Sections */}
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
                <ul className="space-y-3 ml-14">
                  {section.content.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Your Privacy?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our Privacy Officer is available to address your concerns
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">privacy@eugeneonlinehealth.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600">1-800-EUGENE-HC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

