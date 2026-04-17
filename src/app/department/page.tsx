import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Department Page
 * All medical departments and specialties
 */
export default function DepartmentPage() {
  const departments = [
    {
      id: 1,
      name: 'Cardiology',
      description: 'Expert care for heart and cardiovascular conditions with advanced diagnostic tools.',
      icon: '❤️',
      services: ['ECG', 'Echocardiography', 'Stress Testing', 'Heart Disease Management'],
      doctors: 8,
      color: 'from-red-50 to-red-100',
    },
    {
      id: 2,
      name: 'Pediatrics',
      description: 'Comprehensive healthcare for infants, children, and adolescents.',
      icon: '👶',
      services: ['Child Check-ups', 'Vaccinations', 'Growth Monitoring', 'Pediatric Care'],
      doctors: 12,
      color: 'from-pink-50 to-pink-100',
    },
    {
      id: 3,
      name: 'Neurology',
      description: 'Specialized treatment for brain, spine, and nervous system disorders.',
      icon: '🧠',
      services: ['Brain Scans', 'Neurological Exams', 'Migraine Treatment', 'Epilepsy Care'],
      doctors: 6,
      color: 'from-purple-50 to-purple-100',
    },
    {
      id: 4,
      name: 'Orthopedics',
      description: 'Treatment for bone, joint, and musculoskeletal conditions.',
      icon: '🦴',
      services: ['Joint Replacement', 'Sports Injuries', 'Fracture Care', 'Spine Surgery'],
      doctors: 10,
      color: 'from-orange-50 to-orange-100',
    },
    {
      id: 5,
      name: 'Dermatology',
      description: 'Expert skin, hair, and nail care with modern treatment options.',
      icon: '✨',
      services: ['Skin Treatments', 'Acne Care', 'Cosmetic Procedures', 'Hair Loss Treatment'],
      doctors: 7,
      color: 'from-yellow-50 to-yellow-100',
    },
    {
      id: 6,
      name: 'Mental Health',
      description: 'Compassionate care for mental health and emotional well-being.',
      icon: '🧘',
      services: ['Therapy', 'Counseling', 'Stress Management', 'Depression Treatment'],
      doctors: 15,
      color: 'from-green-50 to-green-100',
    },
    {
      id: 7,
      name: 'General Medicine',
      description: 'Primary care for common illnesses and health maintenance.',
      icon: '🏥',
      services: ['Health Check-ups', 'Disease Management', 'Preventive Care', 'Consultations'],
      doctors: 20,
      color: 'from-blue-50 to-blue-100',
    },
    {
      id: 8,
      name: 'Women\'s Health',
      description: 'Specialized care for women\'s health needs at every life stage.',
      icon: '👩‍⚕️',
      services: ['Pregnancy Care', 'Gynecology', 'Fertility Services', 'Menopause Care'],
      doctors: 9,
      color: 'from-pink-50 to-pink-100',
    },
    {
      id: 9,
      name: 'Men\'s Health',
      description: 'Comprehensive healthcare services tailored for men.',
      icon: '👨‍⚕️',
      services: ['Prostate Care', 'Testosterone Therapy', 'Sexual Health', 'Fitness Guidance'],
      doctors: 5,
      color: 'from-indigo-50 to-indigo-100',
    },
    {
      id: 10,
      name: 'Emergency Care',
      description: '24/7 emergency medical services for urgent health conditions.',
      icon: '🚑',
      services: ['Emergency Triage', 'Urgent Care', 'Trauma Care', 'Critical Care'],
      doctors: 18,
      color: 'from-red-50 to-red-100',
    },
    {
      id: 11,
      name: 'Nutrition & Wellness',
      description: 'Expert guidance for healthy eating and lifestyle management.',
      icon: '🥗',
      services: ['Diet Planning', 'Weight Management', 'Nutrition Counseling', 'Wellness Coaching'],
      doctors: 6,
      color: 'from-green-50 to-green-100',
    },
    {
      id: 12,
      name: 'Laboratory Services',
      description: 'Advanced diagnostic testing with accurate and timely results.',
      icon: '🔬',
      services: ['Blood Tests', 'Urine Analysis', 'Pathology', 'Diagnostic Imaging'],
      doctors: 8,
      color: 'from-teal-50 to-teal-100',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="w-full pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our Medical <span className="text-blue-200">Departments</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Comprehensive healthcare services across multiple specialties with expert medical professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Departments Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                >
                  {/* Department Header */}
                  <div className={`bg-gradient-to-r ${dept.color} p-6 text-center`}>
                    <div className="text-6xl mb-3">{dept.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900">{dept.name}</h3>
                  </div>

                  {/* Department Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">{dept.description}</p>

                    {/* Services List */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        Services Offered
                      </h4>
                      <ul className="space-y-1">
                        {dept.services.map((service, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Doctors Count */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="font-semibold">{dept.doctors} Doctors</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center group">
                        <span>View Details</span>
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help Choosing a Department?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our healthcare coordinators are available 24/7 to guide you to the right specialist.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Contact Healthcare Coordinator</span>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

