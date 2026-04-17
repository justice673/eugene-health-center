'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

/**
 * Symptom Checker Page
 * AI-powered symptom analysis and consultation recommendation
 */
export default function SymptomCheckerPage() {
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [showResults, setShowResults] = useState(false);

  const commonSymptoms = [
    { id: 'fever', name: 'Fever', icon: '🌡️', category: 'General' },
    { id: 'cough', name: 'Cough', icon: '😷', category: 'Respiratory' },
    { id: 'headache', name: 'Headache', icon: '🤕', category: 'Neurological' },
    { id: 'sore-throat', name: 'Sore Throat', icon: '😣', category: 'Respiratory' },
    { id: 'fatigue', name: 'Fatigue', icon: '😴', category: 'General' },
    { id: 'nausea', name: 'Nausea', icon: '🤢', category: 'Digestive' },
    { id: 'dizziness', name: 'Dizziness', icon: '😵', category: 'Neurological' },
    { id: 'chest-pain', name: 'Chest Pain', icon: '💔', category: 'Cardiovascular' },
    { id: 'shortness-breath', name: 'Shortness of Breath', icon: '😮‍💨', category: 'Respiratory' },
    { id: 'stomach-pain', name: 'Stomach Pain', icon: '🤰', category: 'Digestive' },
    { id: 'back-pain', name: 'Back Pain', icon: '🔙', category: 'Musculoskeletal' },
    { id: 'joint-pain', name: 'Joint Pain', icon: '🦴', category: 'Musculoskeletal' },
    { id: 'skin-rash', name: 'Skin Rash', icon: '🔴', category: 'Dermatological' },
    { id: 'anxiety', name: 'Anxiety', icon: '😰', category: 'Mental Health' },
    { id: 'depression', name: 'Depression', icon: '😔', category: 'Mental Health' },
    { id: 'insomnia', name: 'Insomnia', icon: '😪', category: 'Sleep' },
  ];

  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  const handleAnalyze = () => {
    setShowResults(true);
  };

  // Mock analysis results
  const analysisResults = {
    possibleConditions: [
      { name: 'Common Cold', probability: 85, icon: '🤧' },
      { name: 'Flu (Influenza)', probability: 65, icon: '🤒' },
      { name: 'Viral Infection', probability: 45, icon: '🦠' },
    ],
    recommendedActions: [
      'Rest and stay hydrated',
      'Take over-the-counter pain relievers',
      'Monitor your temperature',
      'Consult a doctor if symptoms worsen',
    ],
    urgencyLevel: 'Moderate',
    recommendedDoctors: [
      { name: 'Dr. Sarah Johnson', specialty: 'General Practitioner', availability: 'Available Now' },
      { name: 'Dr. Michael Chen', specialty: 'Internal Medicine', availability: 'Available in 30 min' },
    ],
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="w-full pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-6xl mb-4">🩺</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                AI-Powered <span className="text-blue-200">Symptom Checker</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Describe your symptoms and get instant AI-powered health insights. Connect with a doctor for personalized care.
              </p>
            </div>
          </div>
        </section>

        {!showResults ? (
          <section className="py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          step >= s ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {s}
                      </div>
                      {s < 4 && (
                        <div
                          className={`flex-1 h-1 mx-2 ${
                            step > s ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Symptoms</span>
                  <span>Details</span>
                  <span>Personal Info</span>
                  <span>Review</span>
                </div>
              </div>

              {/* Step 1: Select Symptoms */}
              {step === 1 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">What symptoms are you experiencing?</h2>
                  <p className="text-gray-600 mb-6">Select all that apply</p>

                  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                    {commonSymptoms.map((symptom) => (
                      <button
                        key={symptom.id}
                        onClick={() => toggleSymptom(symptom.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedSymptoms.includes(symptom.id)
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{symptom.icon}</div>
                        <p className="font-semibold text-gray-900 text-sm">{symptom.name}</p>
                        <p className="text-xs text-gray-500">{symptom.category}</p>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={selectedSymptoms.length === 0}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continue ({selectedSymptoms.length} symptoms selected)
                  </button>
                </div>
              )}

              {/* Step 2: Symptom Details */}
              {step === 2 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us more about your symptoms</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        How severe are your symptoms?
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        {['Mild', 'Moderate', 'Severe'].map((level) => (
                          <button
                            key={level}
                            onClick={() => setSeverity(level)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              severity === level
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <p className="font-semibold text-gray-900">{level}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        How long have you had these symptoms?
                      </label>
                      <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                      >
                        <option value="">Select duration</option>
                        <option value="less-24h">Less than 24 hours</option>
                        <option value="1-3-days">1-3 days</option>
                        <option value="4-7-days">4-7 days</option>
                        <option value="1-2-weeks">1-2 weeks</option>
                        <option value="more-2-weeks">More than 2 weeks</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Additional Information (Optional)
                      </label>
                      <textarea
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                        placeholder="Any other details about your symptoms, medical history, or current medications..."
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!severity || !duration}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Personal Information */}
              {step === 3 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none"
                        placeholder="Enter your age"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                      <div className="grid grid-cols-3 gap-4">
                        {['Male', 'Female', 'Other'].map((g) => (
                          <button
                            key={g}
                            onClick={() => setGender(g)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              gender === g
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <p className="font-semibold text-gray-900">{g}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      disabled={!age || !gender}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Analyze */}
              {step === 4 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Information</h2>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Selected Symptoms ({selectedSymptoms.length})</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSymptoms.map((symptomId) => {
                          const symptom = commonSymptoms.find(s => s.id === symptomId);
                          return (
                            <span key={symptomId} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                              {symptom?.icon} {symptom?.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Severity</h3>
                        <p className="text-gray-600">{severity}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                        <p className="text-gray-600">{duration}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Age</h3>
                        <p className="text-gray-600">{age} years</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Gender</h3>
                        <p className="text-gray-600">{gender}</p>
                      </div>
                    </div>

                    {additionalInfo && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Additional Information</h3>
                        <p className="text-gray-600">{additionalInfo}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleAnalyze}
                      className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Analyze Symptoms
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="py-16 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Analysis Results */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Analysis Results</h2>
                  <span className={`px-4 py-2 rounded-full font-semibold ${
                    analysisResults.urgencyLevel === 'High' ? 'bg-red-100 text-red-600' :
                    analysisResults.urgencyLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {analysisResults.urgencyLevel} Urgency
                  </span>
                </div>

                {/* Possible Conditions */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Possible Conditions</h3>
                  <div className="space-y-4">
                    {analysisResults.possibleConditions.map((condition, idx) => (
                      <div key={idx} className="border-2 border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{condition.icon}</span>
                            <span className="font-semibold text-gray-900">{condition.name}</span>
                          </div>
                          <span className="text-blue-600 font-bold">{condition.probability}% match</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${condition.probability}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Actions */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions</h3>
                  <ul className="space-y-3">
                    {analysisResults.recommendedActions.map((action, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Warning */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">⚠️</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Important Disclaimer</h4>
                      <p className="text-gray-700">
                        This is an AI-powered assessment and should not replace professional medical advice. 
                        Please consult with a licensed healthcare provider for accurate diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommended Doctors */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Consult with a Doctor</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {analysisResults.recommendedDoctors.map((doctor, idx) => (
                      <div key={idx} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-600 transition-colors">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                            {doctor.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{doctor.name}</p>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          </div>
                        </div>
                        <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                          {doctor.availability}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    href="/consultation"
                    className="block w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-center text-lg"
                  >
                    Book Consultation Now - $25
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setStep(1);
                    setSelectedSymptoms([]);
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  ← Start New Assessment
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

