import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Hero Component
 * Main landing section with heading, description, and call-to-action
 */
const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-white min-h-screen flex items-center pt-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-1 bg-blue-600"></div>
              <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
                Committed to Success
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              WE CARE ABOUT
              <br />
              YOUR{' '}
              <span className="text-blue-600">HEALTH</span>
            </h1>

            {/* Description */}
            <div className="space-y-4 text-gray-600 text-lg">
              <p>
                Access quality healthcare from the comfort of your home with our online 
                medical consultations and telemedicine services available 24/7.
              </p>
              <p>
                Connect with certified doctors virtually for medical advice, prescriptions, 
                and health monitoring - anytime, anywhere.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/consultation" className="group relative bg-blue-600 text-white px-10 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-2xl transform hover:-translate-y-1 overflow-hidden inline-flex items-center">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Start Online Consultation</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link href="/symptom-checker" className="group bg-white text-blue-600 px-10 py-4 rounded-xl border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-base shadow-md hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center">
                <span className="flex items-center space-x-2">
                  <span>Check Symptoms</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-gray-600 text-sm">Online Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-600 text-sm">Online Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-gray-600 text-sm">Virtual Visits</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Doctor Image */}
              <Image
                src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Professional Healthcare Doctor"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Decorative elements */}
              <div className="absolute top-10 right-10 bg-white p-4 rounded-lg shadow-lg z-10">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 rounded-full p-2">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Online 24/7</div>
                    <div className="text-sm text-gray-600">Virtual Care</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

