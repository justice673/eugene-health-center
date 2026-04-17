'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { api } from '@/lib/api';

/**
 * Medications Page
 * Comprehensive list of medications available through online prescriptions
 * Now fetches real data from backend
 */
export default function MedicationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [medications, setMedications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch medications from backend
  useEffect(() => {
    const loadMedications = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getMedications({
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          search: searchQuery || undefined,
        });
        const data = await res.json();
        setMedications(data.medications || []);
      } catch (err: any) {
        console.error('Error loading medications:', err);
        setError('Failed to load medications. Please try again later.');
        // Fallback to empty array
        setMedications([]);
      } finally {
        setLoading(false);
      }
    };

    loadMedications();
  }, [selectedCategory, searchQuery]);

  // Get unique categories from medications
  const categories = ['All', ...Array.from(new Set(medications.map(m => m.category).filter(Boolean)))];

  // Helper function to get icon based on category
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      'Pain Relief': '💊',
      'Antibiotics': '💉',
      'Cardiovascular': '❤️',
      'Diabetes': '🩸',
      'Mental Health': '🧠',
      'Respiratory': '🫁',
      'Gastrointestinal': '🔥',
      'Dermatology': '✨',
      'Allergy': '🤧',
      'Vitamins & Supplements': '🌞',
      'Hormones': '⚡',
    };
    return iconMap[category] || '💊';
  };

  // Filter is now handled by backend, but we can do client-side filtering too
  const filteredMedications = medications;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="w-full pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-6xl mb-4">💊</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Online <span className="text-blue-200">Medications</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Browse our comprehensive medication database. Get prescriptions online from certified doctors and have them delivered to your doorstep.
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="py-8 bg-gray-50 sticky top-20 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medications by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-gray-900 text-lg"
                />
                <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Browse by Category</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Medications Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-gray-600 text-lg">
                Showing <span className="font-bold text-blue-600">{filteredMedications.length}</span> medications
                {selectedCategory !== 'All' && <span> in <span className="font-bold">{selectedCategory}</span></span>}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading medications...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Medications</h3>
                <p className="text-gray-600">{error}</p>
              </div>
            ) : (
              <>
                {filteredMedications.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No medications found</h3>
                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMedications.map((med) => (
                      <div
                        key={med._id || med.id}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-2"
                      >
                        <div className="p-6">
                          {/* Icon and Category */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-4xl">{getCategoryIcon(med.category)}</div>
                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                              {med.category}
                            </span>
                          </div>

                          {/* Medication Name */}
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {med.name}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            {med.description}
                          </p>

                          {/* Dosage and Price */}
                          <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                            <div className="flex items-center text-sm text-gray-500">
                              <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              <span className="font-semibold">Dosage:</span>
                              <span className="ml-1">{med.dosage}</span>
                            </div>
                            {med.price && (
                              <div className="flex items-center text-sm text-gray-500">
                                <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-semibold">Price:</span>
                                <span className="ml-1 text-green-600 font-bold">${med.price.toFixed(2)}</span>
                              </div>
                            )}
                            {med.stock !== undefined && (
                              <div className="flex items-center text-sm">
                                <span className="font-semibold text-gray-500">Stock:</span>
                                <span className={`ml-1 font-bold ${
                                  med.stock > 50 ? 'text-green-600' :
                                  med.stock > 10 ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  {med.stock} units
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-2">
                            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg flex items-center justify-center space-x-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                              </svg>
                              <span>Consult Doctor</span>
                            </button>
                            <button className="w-full bg-white text-blue-600 py-3 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold flex items-center justify-center space-x-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Learn More</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-16 bg-yellow-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">⚠️</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Important Medical Information</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>All medications require a valid prescription from a licensed healthcare provider</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Consult with our online doctors before starting any new medication</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Always inform your doctor about existing conditions and current medications</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Follow dosage instructions carefully and report any side effects immediately</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>This information is for educational purposes only and not medical advice</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Prescription?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Consult with our certified online doctors to get the medication you need delivered to your door.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 mx-auto">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>Start Online Consultation</span>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

