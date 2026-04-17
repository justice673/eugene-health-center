'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import { api } from '@/lib/api';

/**
 * Appointments History Page
 * View past and upcoming appointments
 */
export default function AppointmentsPage() {
  const { user, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch appointments from backend
  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await api.getAppointments();
        const data = await response.json();
        
        if (data.appointments) {
          setAppointments(data.appointments);
        } else {
          setAppointments([]);
        }
      } catch (err: any) {
        console.error('Failed to fetch appointments:', err);
        setError(err.message || 'Failed to load appointments');
        showNotification('error', 'Failed to load appointments. Please try again.');
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [isAuthenticated, showNotification]);

  // Filter appointments based on status and search query
  const upcomingAppointments = appointments.filter(apt => {
    const isUpcoming = 
      new Date(apt.appointmentDate) >= new Date() && 
      ['pending', 'confirmed'].includes(apt.status?.toLowerCase());
    
    const matchesSearch = 
      !searchQuery ||
      apt.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorSpecialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.reasonForVisit?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return isUpcoming && matchesSearch;
  });

  const pastAppointments = appointments.filter(apt => {
    const isPast = 
      new Date(apt.appointmentDate) < new Date() || 
      ['completed', 'cancelled', 'no-show'].includes(apt.status?.toLowerCase());
    
    const matchesSearch = 
      !searchQuery ||
      apt.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorSpecialty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.reasonForVisit?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return isPast && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  // Format status for display
  const formatStatus = (status: string) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const getStatusColor = (status: string) => {
    const statusLower = status?.toLowerCase() || '';
    switch (statusLower) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'no-show':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle appointment cancellation
  const handleCancel = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      await api.cancelAppointment(appointmentId);
      showNotification('success', 'Appointment cancelled successfully');
      
      // Refresh appointments
      const response = await api.getAppointments();
      const data = await response.json();
      if (data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (err: any) {
      console.error('Failed to cancel appointment:', err);
      showNotification('error', err.message || 'Failed to cancel appointment');
    }
  };

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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                My <span className="text-blue-200">Appointments</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                View and manage your healthcare appointments
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Tabs */}
            <div className="mb-8">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search appointments by doctor, specialty, or reason..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-14 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none text-gray-900"
                  />
                  <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-4 border-b border-gray-300">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === 'upcoming'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Upcoming ({upcomingAppointments.length})
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === 'past'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Past ({pastAppointments.length})
                </button>
              </div>
            </div>

              {/* Loading State */}
            {loading && (
              <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 p-6 rounded-2xl shadow-lg text-center">
                <p className="text-red-600 font-semibold mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Not Authenticated */}
            {!isAuthenticated && !loading && (
              <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Please Sign In</h3>
                <p className="text-gray-600 mb-6">You need to be signed in to view your appointments</p>
                <Link
                  href="/signin"
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Upcoming Appointments */}
            {activeTab === 'upcoming' && !loading && isAuthenticated && (
              <div className="space-y-6">
                {upcomingAppointments.length === 0 ? (
                  <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Upcoming Appointments</h3>
                    <p className="text-gray-600 mb-6">You don't have any scheduled appointments yet</p>
                    <Link
                      href="/consultation"
                      className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Book New Appointment
                    </Link>
                  </div>
                ) : (
                  upcomingAppointments.map((appointment) => (
                    <div key={appointment._id || appointment.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start space-x-4 mb-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{appointment.doctorName || 'Dr. Unknown'}</h3>
                              <p className="text-gray-600 mb-2">{appointment.doctorSpecialty || appointment.consultationType || 'General Consultation'}</p>
                              <div className="flex flex-wrap gap-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(appointment.status)}`}>
                                  {formatStatus(appointment.status)}
                                </span>
                                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                                  {appointment.consultationType || 'Video Consultation'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatDate(appointment.appointmentDate)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{appointment.appointmentTime || 'N/A'}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>{appointment.reasonForVisit || appointment.reason || 'General Consultation'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
                          {appointment.meetingLink && (
                            <a
                              href={appointment.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap text-center"
                            >
                              Join Video Call
                            </a>
                          )}
                          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-semibold whitespace-nowrap">
                            Reschedule
                          </button>
                          <button 
                            onClick={() => handleCancel(appointment._id || appointment.id)}
                            className="bg-white text-red-600 px-6 py-2 rounded-lg border-2 border-red-600 hover:bg-red-50 transition-colors font-semibold whitespace-nowrap"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Past Appointments */}
            {activeTab === 'past' && !loading && isAuthenticated && (
              <div className="space-y-6">
                {pastAppointments.length === 0 ? (
                  <div className="bg-white p-12 rounded-2xl shadow-lg text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Past Appointments</h3>
                    <p className="text-gray-600">Your appointment history will appear here</p>
                  </div>
                ) : (
                  pastAppointments.map((appointment) => (
                    <div key={appointment._id || appointment.id} className="bg-white p-6 rounded-2xl shadow-lg">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start space-x-4 mb-4">
                            <div className="bg-gray-100 p-3 rounded-lg">
                              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{appointment.doctorName || 'Dr. Unknown'}</h3>
                              <p className="text-gray-600 mb-2">{appointment.doctorSpecialty || appointment.consultationType || 'General Consultation'}</p>
                              <div className="flex flex-wrap gap-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(appointment.status)}`}>
                                  {formatStatus(appointment.status)}
                                </span>
                                {appointment.prescription && (
                                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                    {Array.isArray(appointment.prescription) ? 'Prescribed' : appointment.prescription}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{formatDate(appointment.appointmentDate)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{appointment.appointmentTime || 'N/A'}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              <span>{appointment.reasonForVisit || appointment.reason || 'General Consultation'}</span>
                            </div>
                          </div>

                          {appointment.diagnosis && (
                            <div className="bg-blue-50 p-4 rounded-lg mb-2">
                              <p className="text-sm font-semibold text-gray-900 mb-1">Diagnosis:</p>
                              <p className="text-sm text-gray-600">{appointment.diagnosis}</p>
                            </div>
                          )}

                          {appointment.prescription && Array.isArray(appointment.prescription) && appointment.prescription.length > 0 && (
                            <div className="bg-green-50 p-4 rounded-lg">
                              <p className="text-sm font-semibold text-gray-900 mb-1">Prescription:</p>
                              <ul className="text-sm text-gray-600 list-disc list-inside">
                                {appointment.prescription.map((med: string, idx: number) => (
                                  <li key={idx}>{med}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
                          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap">
                            View Details
                          </button>
                          <Link
                            href="/consultation"
                            className="bg-white text-blue-600 px-6 py-2 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors font-semibold whitespace-nowrap text-center"
                          >
                            Book Follow-up
                          </Link>
                          <button className="bg-white text-gray-600 px-6 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors font-semibold whitespace-nowrap">
                            Download Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a New Consultation?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Book an appointment with our certified healthcare professionals
            </p>
            <Link
              href="/consultation"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book New Appointment
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


