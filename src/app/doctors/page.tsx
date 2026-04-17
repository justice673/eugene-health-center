import React from 'react';
import Header from '@/components/Header';
import Doctors from '@/components/Doctors';
import Footer from '@/components/Footer';
import Image from 'next/image';

/**
 * Doctors Page
 * Complete list of all medical professionals
 */
export default function DoctorsPage() {
  const allDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '15 Years Experience',
      rating: 4.9,
      patients: '2000+',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
      education: 'MD, Harvard Medical School',
      languages: 'English, Spanish',
      availability: 'Mon-Fri: 9AM-5PM',
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrician',
      experience: '12 Years Experience',
      rating: 4.8,
      patients: '1800+',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600',
      education: 'MD, Johns Hopkins University',
      languages: 'English, Mandarin',
      availability: 'Mon-Sat: 8AM-6PM',
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      specialty: 'Neurologist',
      experience: '18 Years Experience',
      rating: 5.0,
      patients: '2500+',
      image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=600',
      education: 'MD, Stanford University',
      languages: 'English, French',
      availability: 'Tue-Sat: 10AM-7PM',
    },
    {
      id: 4,
      name: 'Dr. James Anderson',
      specialty: 'Orthopedic Surgeon',
      experience: '20 Years Experience',
      rating: 4.9,
      patients: '3000+',
      image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=600',
      education: 'MD, Yale School of Medicine',
      languages: 'English',
      availability: 'Mon-Thu: 9AM-4PM',
    },
    {
      id: 5,
      name: 'Dr. Maria Garcia',
      specialty: 'Dermatologist',
      experience: '10 Years Experience',
      rating: 4.7,
      patients: '1500+',
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=600',
      education: 'MD, Columbia University',
      languages: 'English, Spanish, Portuguese',
      availability: 'Mon-Fri: 10AM-6PM',
    },
    {
      id: 6,
      name: 'Dr. David Kim',
      specialty: 'Psychiatrist',
      experience: '14 Years Experience',
      rating: 4.9,
      patients: '2200+',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=600',
      education: 'MD, PhD, MIT',
      languages: 'English, Korean',
      availability: 'Mon-Fri: 11AM-8PM',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="w-full pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Our Medical <span className="text-blue-600">Professionals</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with our certified online doctors through secure video consultations. Expert medical care from the comfort of your home.
              </p>
            </div>
          </div>
        </section>

        {/* All Doctors Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                >
                  {/* Doctor Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center space-x-1 z-10">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-gray-800">{doctor.rating}</span>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-3">{doctor.specialty}</p>
                    
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        {doctor.experience}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {doctor.patients} Patients
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {doctor.availability}
                      </div>
                    </div>

                    <button className="group w-full bg-blue-600 text-white py-3.5 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-base shadow-md hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2">
                      <span>Start Video Consultation</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

