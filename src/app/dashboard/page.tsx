'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/**
 * User Dashboard
 * Personal health dashboard for patients to manage appointments, medications, and records
 */
export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sample user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    memberSince: 'January 2024',
    upcomingAppointments: 2,
    activePrescriptions: 3,
  };

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Dec 2, 2025',
      time: '10:00 AM',
      type: 'Video Consultation',
      status: 'Confirmed',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Pediatrician',
      date: 'Dec 5, 2025',
      time: '2:30 PM',
      type: 'Video Consultation',
      status: 'Pending',
    },
  ];

  const myMedications = [
    {
      id: 1,
      name: 'Lisinopril 10mg',
      category: 'Cardiovascular',
      dosage: 'Once daily',
      prescribedBy: 'Dr. Sarah Johnson',
      refillsLeft: 2,
      nextRefill: 'Dec 15, 2025',
      icon: '❤️',
    },
    {
      id: 2,
      name: 'Metformin 1000mg',
      category: 'Diabetes',
      dosage: 'Twice daily',
      prescribedBy: 'Dr. Emily Williams',
      refillsLeft: 1,
      nextRefill: 'Dec 10, 2025',
      icon: '🩸',
    },
    {
      id: 3,
      name: 'Sertraline 50mg',
      category: 'Mental Health',
      dosage: 'Once daily',
      prescribedBy: 'Dr. David Kim',
      refillsLeft: 3,
      nextRefill: 'Dec 20, 2025',
      icon: '🧠',
    },
  ];

  const availableMedications = [
    { id: 1, name: 'Acetaminophen (Tylenol)', category: 'Pain Relief', price: '$8.99', icon: '💊' },
    { id: 2, name: 'Ibuprofen (Advil)', category: 'Pain Relief', price: '$9.99', icon: '💊' },
    { id: 3, name: 'Amoxicillin', category: 'Antibiotics', price: '$12.99', icon: '💉' },
    { id: 4, name: 'Omeprazole (Prilosec)', category: 'Gastrointestinal', price: '$9.99', icon: '🔥' },
    { id: 5, name: 'Cetirizine (Zyrtec)', category: 'Allergy', price: '$11.99', icon: '🤧' },
    { id: 6, name: 'Vitamin D3', category: 'Vitamins', price: '$7.99', icon: '🌞' },
  ];

  const medicalRecords = [
    { id: 1, title: 'Annual Physical Exam', doctor: 'Dr. Sarah Johnson', date: 'Nov 15, 2025', type: 'Report' },
    { id: 2, title: 'Blood Test Results', doctor: 'Dr. Emily Williams', date: 'Nov 10, 2025', type: 'Lab Result' },
    { id: 3, title: 'Prescription - Lisinopril', doctor: 'Dr. Sarah Johnson', date: 'Nov 5, 2025', type: 'Prescription' },
  ];

  const healthMetrics = [
    { id: 1, title: 'Blood Pressure', value: '120/80', status: 'Normal', icon: '❤️', color: 'text-green-600' },
    { id: 2, title: 'Heart Rate', value: '72 bpm', status: 'Normal', icon: '💓', color: 'text-green-600' },
    { id: 3, title: 'Blood Sugar', value: '95 mg/dL', status: 'Normal', icon: '🩸', color: 'text-green-600' },
    { id: 4, title: 'Weight', value: '165 lbs', status: 'Healthy', icon: '⚖️', color: 'text-blue-600' },
  ];

  const filteredMedications = availableMedications.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Desktop Sidebar Toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="bg-blue-600 rounded-full p-2">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">My Health Dashboard</h1>
                <p className="text-xs lg:text-sm text-gray-500">Eugene Online Health Center</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{userData.name}</p>
                  <p className="text-xs text-gray-500">{userData.email}</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {userData.name.charAt(0)}
                </div>
              </div>
              <Link href="/" className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          ${sidebarCollapsed ? 'w-20' : 'w-64'} 
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)]
          bg-white shadow-lg z-40
          transition-all duration-300 ease-in-out
        `}>
          <nav className="p-4 space-y-2 h-full overflow-y-auto">
            <button
              onClick={() => { setActiveTab('overview'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Overview"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {!sidebarCollapsed && <span className="font-semibold">Overview</span>}
            </button>
            <button
              onClick={() => { setActiveTab('appointments'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'appointments' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Appointments"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {!sidebarCollapsed && <span className="font-semibold">Appointments</span>}
            </button>
            <button
              onClick={() => { setActiveTab('medications'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'medications' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="My Medications"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              {!sidebarCollapsed && <span className="font-semibold">My Medications</span>}
            </button>
            <button
              onClick={() => { setActiveTab('browse'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'browse' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Browse Medications"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {!sidebarCollapsed && <span className="font-semibold">Browse Medications</span>}
            </button>
            <button
              onClick={() => { setActiveTab('records'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'records' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Medical Records"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!sidebarCollapsed && <span className="font-semibold">Medical Records</span>}
            </button>
            <button
              onClick={() => { setActiveTab('health'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'health' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Health Metrics"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {!sidebarCollapsed && <span className="font-semibold">Health Metrics</span>}
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-0'}`}>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userData.name}! 👋</h2>
                <p className="text-gray-600">Here's your health overview for today.</p>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">📅</div>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                      Upcoming
                    </span>
                  </div>
                  <h3 className="text-white text-opacity-90 text-sm mb-1">Next Appointment</h3>
                  <p className="text-2xl font-bold">Dec 2, 10:00 AM</p>
                  <p className="text-sm text-white text-opacity-80 mt-2">Dr. Sarah Johnson</p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">💊</div>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </div>
                  <h3 className="text-white text-opacity-90 text-sm mb-1">Prescriptions</h3>
                  <p className="text-2xl font-bold">{userData.activePrescriptions} Active</p>
                  <p className="text-sm text-white text-opacity-80 mt-2">2 need refills soon</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">📋</div>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                      Recent
                    </span>
                  </div>
                  <h3 className="text-white text-opacity-90 text-sm mb-1">Medical Records</h3>
                  <p className="text-2xl font-bold">3 New</p>
                  <p className="text-sm text-white text-opacity-80 mt-2">Last updated Nov 15</p>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Upcoming Appointments</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-semibold">View All</button>
                </div>
                <div className="space-y-4">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                          {apt.doctor.split(' ')[1].charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{apt.doctor}</p>
                          <p className="text-sm text-gray-600">{apt.specialty} • {apt.type}</p>
                          <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          apt.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {apt.status}
                        </span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                          Join Call
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-6">
                <button className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-left group">
                  <div className="text-4xl mb-4">🩺</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Book Appointment
                  </h3>
                  <p className="text-gray-600 text-sm">Schedule a video consultation with a doctor</p>
                </button>

                <button className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-left group">
                  <div className="text-4xl mb-4">💊</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    Request Refill
                  </h3>
                  <p className="text-gray-600 text-sm">Refill your prescriptions online</p>
                </button>

                <button className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all text-left group">
                  <div className="text-4xl mb-4">📄</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    View Records
                  </h3>
                  <p className="text-gray-600 text-sm">Access your medical history and reports</p>
                </button>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h2>
                  <p className="text-gray-600">Manage your upcoming and past appointments</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold flex items-center space-x-2 shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Book New Appointment</span>
                </button>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                          {apt.doctor.split(' ')[1].charAt(0)}
                        </div>
                        <div>
                          <p className="text-xl font-bold text-gray-900">{apt.doctor}</p>
                          <p className="text-gray-600">{apt.specialty}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {apt.date}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {apt.time}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              {apt.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                          Join Video Call
                        </button>
                        <button className="bg-red-100 text-red-600 px-4 py-3 rounded-xl hover:bg-red-200 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Medications Tab */}
          {activeTab === 'medications' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">My Medications</h2>
                <p className="text-gray-600">Your active prescriptions and medication history</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myMedications.map((med) => (
                  <div key={med.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{med.icon}</div>
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {med.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{med.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{med.dosage}</p>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p>Prescribed by: <span className="font-semibold">{med.prescribedBy}</span></p>
                      <p>Refills left: <span className="font-semibold">{med.refillsLeft}</span></p>
                      <p>Next refill: <span className="font-semibold">{med.nextRefill}</span></p>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                      Request Refill
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Browse Medications Tab */}
          {activeTab === 'browse' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Browse Medications</h2>
                <p className="text-sm sm:text-base text-gray-600">Search and request prescriptions for medications</p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search medications by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-12 sm:pl-14 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-gray-900 text-sm sm:text-base"
                />
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedications.map((med) => (
                  <div key={med.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{med.icon}</div>
                      <span className="text-xl font-bold text-blue-600">{med.price}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{med.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{med.category}</p>
                    <div className="space-y-2">
                      <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                        Consult Doctor
                      </button>
                      <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold">
                        Learn More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Medical Records Tab */}
          {activeTab === 'records' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Medical Records</h2>
                <p className="text-sm sm:text-base text-gray-600">Access your medical history and documents</p>
              </div>

              {/* Search Bar for Records */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search records by title, doctor, or date..."
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 pl-12 sm:pl-14 border-2 border-gray-300 rounded-xl focus:border-blue-600 focus:outline-none text-gray-900 text-sm sm:text-base"
                />
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="space-y-4">
                {medicalRecords.map((record) => (
                  <div key={record.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{record.title}</p>
                          <p className="text-sm text-gray-600">{record.doctor} • {record.date}</p>
                          <span className="inline-block mt-1 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-semibold">
                            {record.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                          View
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold">
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Metrics Tab */}
          {activeTab === 'health' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Health Metrics</h2>
                <p className="text-gray-600">Track your vital signs and health indicators</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {healthMetrics.map((metric) => (
                  <div key={metric.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">{metric.icon}</div>
                    <h3 className="text-sm text-gray-600 mb-2">{metric.title}</h3>
                    <p className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</p>
                    <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                      {metric.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Health Trends</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

