'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Component Imports (will be defined below)
const UserManagementSection = ({ users, onFetch, onUpdate, onSuspend, onDelete, filters, onFilterChange }: {
  users: any[];
  onFetch: () => void;
  onUpdate: (id: string, data: any) => Promise<void>;
  onSuspend: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  filters: any;
  onFilterChange: (filters: any) => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editData, setEditData] = useState({ role: '', subscriptionStatus: '', isEmailVerified: false });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage all users, roles, and permissions</p>
        </div>
        <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search users..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
          <select
            value={filters.role}
            onChange={(e) => onFilterChange({ ...filters, role: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Roles</option>
            <option value="user">User</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button onClick={onFetch} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user: any) => (
              <tr key={user._id || user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">{user.fullName?.charAt(0) || 'U'}</span>
                    </div>
                    <span className="font-semibold">{user.fullName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' ? 'bg-red-100 text-red-600' :
                    user.role === 'doctor' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.subscriptionStatus === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.subscriptionStatus || 'inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.isEmailVerified ? (
                    <span className="text-green-600">✓ Verified</span>
                  ) : (
                    <span className="text-gray-400">Not verified</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setEditData({ role: user.role, subscriptionStatus: user.subscriptionStatus, isEmailVerified: user.isEmailVerified });
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onSuspend(user._id || user.id)}
                      className="text-yellow-600 hover:text-yellow-700"
                    >
                      {user.subscriptionStatus === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this user?')) {
                          onDelete(user._id || user.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Role</label>
                <select
                  value={editData.role}
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="user">User</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Status</label>
                <select
                  value={editData.subscriptionStatus}
                  onChange={(e) => setEditData({ ...editData, subscriptionStatus: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editData.isEmailVerified}
                    onChange={(e) => setEditData({ ...editData, isEmailVerified: e.target.checked })}
                  />
                  <span>Email Verified</span>
                </label>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    onUpdate(selectedUser._id || selectedUser.id, editData);
                    setShowModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DoctorManagementSection = ({ doctors, onFetch, onViewDetails, selectedDoctor, onCreate, onUpdate, onDelete }: {
  doctors: any[];
  onFetch: () => Promise<void>;
  onViewDetails: (id: string) => Promise<void>;
  selectedDoctor: any;
  onCreate: (data: any) => Promise<void>;
  onUpdate: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ fullName: '', email: '', phone: '', specialty: '' });
  const [newDoctor, setNewDoctor] = useState({ fullName: '', email: '', phone: '', password: '', specialty: '' });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Doctor Management</h2>
          <p className="text-gray-600">Manage doctor profiles, schedules, and earnings</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Doctor
          </button>
          <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor: any) => (
          <div key={doctor._id || doctor.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-blue-600 font-bold text-xl">{doctor.fullName?.charAt(0) || 'D'}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Dr. {doctor.fullName}</h3>
                <p className="text-gray-600 text-sm">{doctor.email}</p>
              </div>
            </div>
            {doctor.stats && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Appointments:</span>
                  <span className="font-semibold">{doctor.stats.totalAppointments || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed:</span>
                  <span className="font-semibold">{doctor.stats.completedAppointments || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Earnings:</span>
                  <span className="font-semibold text-green-600">${(doctor.stats.totalEarnings || 0).toFixed(2)}</span>
                </div>
              </div>
            )}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => onViewDetails(doctor._id || doctor.id)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  setEditData({
                    fullName: doctor.fullName,
                    email: doctor.email,
                    phone: doctor.phone || '',
                    specialty: doctor.specialty || '',
                  });
                  onViewDetails(doctor._id || doctor.id);
                  setShowEditModal(true);
                }}
                className="px-3 bg-yellow-600 text-white py-2 rounded-lg hover:bg-yellow-700"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this doctor?')) {
                    onDelete(doctor._id || doctor.id);
                  }
                }}
                className="px-3 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && !showEditModal && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Doctor Details</h3>
            <button onClick={() => onViewDetails('')} className="text-gray-500">✕</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-semibold">{selectedDoctor.doctor?.fullName}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{selectedDoctor.doctor?.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Earnings</p>
              <p className="font-semibold text-green-600">${(selectedDoctor.totalEarnings || 0).toFixed(2)}</p>
            </div>
            {selectedDoctor.appointments && (
              <div>
                <p className="text-gray-600">Total Appointments</p>
                <p className="font-semibold">{selectedDoctor.appointments.length}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Add New Doctor</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  value={newDoctor.fullName}
                  onChange={(e) => setNewDoctor({ ...newDoctor, fullName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Dr. John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="doctor@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  value={newDoctor.phone}
                  onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="+1234567890"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Specialty</label>
                <input
                  type="text"
                  value={newDoctor.specialty}
                  onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Cardiology, General, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Password *</label>
                <input
                  type="password"
                  value={newDoctor.password}
                  onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Minimum 8 characters"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={async () => {
                    await onCreate(newDoctor);
                    setShowAddModal(false);
                    setNewDoctor({ fullName: '', email: '', phone: '', password: '', specialty: '' });
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Create Doctor
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewDoctor({ fullName: '', email: '', phone: '', password: '', specialty: '' });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Doctor Modal */}
      {showEditModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Doctor</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Specialty</label>
                <input
                  type="text"
                  value={editData.specialty}
                  onChange={(e) => setEditData({ ...editData, specialty: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={async () => {
                    if (selectedDoctor?.doctor?._id || selectedDoctor?._id) {
                      await onUpdate(selectedDoctor.doctor?._id || selectedDoctor._id, editData);
                    }
                    setShowEditModal(false);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PatientManagementSection = ({ patients, onFetch, onViewDetails, selectedPatient, filters, onFilterChange }: {
  patients: any[];
  onFetch: () => Promise<void>;
  onViewDetails: (id: string) => Promise<void>;
  selectedPatient: any;
  filters: any;
  onFilterChange: (filters: any) => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Patient Management</h2>
          <p className="text-gray-600">Manage patient profiles and medical history</p>
        </div>
        <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <input
          type="text"
          placeholder="Search patients..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appointments</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {patients.map((patient: any) => (
              <tr key={patient._id || patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">{patient.fullName?.charAt(0) || 'P'}</span>
                    </div>
                    <span className="font-semibold">{patient.fullName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{patient.email}</td>
                <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                <td className="px-6 py-4">{patient.appointments?.length || 0}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewDetails(patient._id || patient.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPatient && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Patient Details</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-semibold">{selectedPatient.patient?.fullName}</p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{selectedPatient.patient?.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Medical History</p>
              <p className="font-semibold">{selectedPatient.patient?.medicalHistory?.join(', ') || 'None'}</p>
            </div>
            <div>
              <p className="text-gray-600">Allergies</p>
              <p className="font-semibold">{selectedPatient.patient?.allergies?.join(', ') || 'None'}</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-2">Appointments ({selectedPatient.appointments?.length || 0})</h4>
            <div className="space-y-2">
              {selectedPatient.appointments?.slice(0, 5).map((apt: any) => (
                <div key={apt._id} className="p-3 bg-gray-50 rounded">
                  <p className="font-semibold">{new Date(apt.appointmentDate).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{apt.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AppointmentManagementSection = ({ appointments, onFetch, onUpdate, onCancel, filters, onFilterChange, doctors }: {
  appointments: any[];
  onFetch: () => Promise<void>;
  onUpdate: (id: string, data: any) => Promise<void>;
  onCancel: (id: string) => Promise<void>;
  filters: any;
  onFilterChange: (filters: any) => void;
  doctors: any[];
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Appointments Management</h2>
          <p className="text-gray-600">Manage all appointments</p>
        </div>
        <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
            className="px-4 py-2 border rounded-lg"
          />
          <button onClick={onFetch} className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
            Apply Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((apt: any) => (
              <tr key={apt._id || apt.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{apt.userId?.fullName || apt.patientName || 'N/A'}</td>
                <td className="px-6 py-4">{apt.doctorName || apt.doctorId?.fullName || 'N/A'}</td>
                <td className="px-6 py-4">
                  {new Date(apt.appointmentDate).toLocaleDateString()} {apt.appointmentTime}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    apt.status === 'completed' ? 'bg-green-100 text-green-600' :
                    apt.status === 'confirmed' ? 'bg-blue-100 text-blue-600' :
                    apt.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onUpdate(apt._id || apt.id, { status: 'confirmed' })}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => onCancel(apt._id || apt.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MedicationManagementSection = ({ medications, onFetch, onCreate, onUpdate, onDelete }: {
  medications: any[];
  onFetch: () => Promise<void>;
  onCreate: (data: any) => Promise<void>;
  onUpdate: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [prescriptionOnlyFilter, setPrescriptionOnlyFilter] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    genericName: '',
    category: '',
    form: 'Tablet',
    strength: '',
    description: '',
    price: '',
    stock: '',
    manufacturer: '',
    prescriptionRequired: true,
    sideEffects: '',
    contraindications: '',
  });
  const [editData, setEditData] = useState({
    name: '',
    genericName: '',
    category: '',
    form: 'Tablet',
    strength: '',
    description: '',
    price: '',
    stock: '',
    manufacturer: '',
    prescriptionRequired: true,
    sideEffects: '',
    contraindications: '',
  });

  const filteredMedications = medications.filter((med: any) => {
    const matchesSearch = !searchQuery || 
      med.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || med.category === categoryFilter;
    const matchesPrescription = !prescriptionOnlyFilter || med.prescriptionRequired === true;
    return matchesSearch && matchesCategory && matchesPrescription;
  });

  const categories = [
    'Pain & Inflammation',
    'Antibiotics',
    'Antimalarial',
    'Antiviral',
    'Antifungal',
    'Cardiovascular',
    'Diabetes',
    'Respiratory',
    'Gastrointestinal',
    'Mental Health',
    'Allergy',
    'Vitamins & Supplements',
    'Women\'s Health',
    'Dermatology',
    'Emergency',
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Medications Management</h2>
          <p className="text-gray-600">Add, edit, and manage all medications in the system</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Medication</span>
          </button>
          <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by name or generic name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            {categories.map((cat: string) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <label className="flex items-center space-x-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="checkbox"
              checked={prescriptionOnlyFilter}
              onChange={(e) => setPrescriptionOnlyFilter(e.target.checked)}
              className="w-4 h-4 text-blue-600"
            />
            <span className="text-sm font-semibold">Prescription Only</span>
          </label>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('');
              setPrescriptionOnlyFilter(false);
            }}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Medications Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Generic Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Form</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Strength</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prescription</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMedications.map((med: any) => (
              <tr key={med._id || med.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900">{med.name}</p>
                    <p className="text-xs text-gray-500">{med.description?.substring(0, 40)}...</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600">{med.genericName || 'N/A'}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-semibold">
                    {med.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{med.form || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-600">{med.strength || med.dosage || 'N/A'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    med.prescriptionRequired !== false ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {med.prescriptionRequired !== false ? 'Required' : 'OTC'}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">${med.price?.toFixed(2) || '0.00'}</td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${
                    (med.stock || 0) > 50 ? 'text-green-600' :
                    (med.stock || 0) > 10 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {med.stock || 0}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditData({
                          name: med.name,
                          genericName: med.genericName || '',
                          category: med.category,
                          form: med.form || 'Tablet',
                          strength: med.strength || med.dosage || '',
                          description: med.description,
                          price: med.price?.toString() || '0',
                          stock: med.stock?.toString() || '0',
                          manufacturer: med.manufacturer || '',
                          prescriptionRequired: med.prescriptionRequired !== false,
                          sideEffects: med.sideEffects?.join(', ') || '',
                          contraindications: med.contraindications?.join(', ') || '',
                        });
                        setSelectedMedication(med);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-700"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this medication?')) {
                          onDelete(med._id || med.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-700"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredMedications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No medications found. Click "Add Medication" to add one.
          </div>
        )}
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add New Medication</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Medication Name (Brand) *</label>
                  <input
                    type="text"
                    value={newMedication.name}
                    onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., Paracetamol"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Generic Name *</label>
                  <input
                    type="text"
                    value={newMedication.genericName}
                    onChange={(e) => setNewMedication({ ...newMedication, genericName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., Acetaminophen"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category *</label>
                  <select
                    value={newMedication.category}
                    onChange={(e) => setNewMedication({ ...newMedication, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Form *</label>
                  <select
                    value={newMedication.form}
                    onChange={(e) => setNewMedication({ ...newMedication, form: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Cream">Cream</option>
                    <option value="Drops">Drops</option>
                    <option value="Spray">Spray</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description *</label>
                <textarea
                  value={newMedication.description}
                  onChange={(e) => setNewMedication({ ...newMedication, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={2}
                  placeholder="Brief description of the medication"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Strength *</label>
                  <input
                    type="text"
                    value={newMedication.strength}
                    onChange={(e) => setNewMedication({ ...newMedication, strength: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="500mg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newMedication.price}
                    onChange={(e) => setNewMedication({ ...newMedication, price: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="12.99"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Stock *</label>
                  <input
                    type="number"
                    value={newMedication.stock}
                    onChange={(e) => setNewMedication({ ...newMedication, stock: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="100"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Manufacturer</label>
                <input
                  type="text"
                  value={newMedication.manufacturer}
                  onChange={(e) => setNewMedication({ ...newMedication, manufacturer: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Manufacturer name"
                />
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newMedication.prescriptionRequired}
                    onChange={(e) => setNewMedication({ ...newMedication, prescriptionRequired: e.target.checked })}
                  />
                  <span className="font-semibold">Prescription Required</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Side Effects (comma separated)</label>
                <input
                  type="text"
                  value={newMedication.sideEffects}
                  onChange={(e) => setNewMedication({ ...newMedication, sideEffects: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Nausea, Dizziness, Headache"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Contraindications (comma separated)</label>
                <input
                  type="text"
                  value={newMedication.contraindications}
                  onChange={(e) => setNewMedication({ ...newMedication, contraindications: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Pregnancy, Allergies"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={async () => {
                    const medicationData = {
                      name: newMedication.name,
                      genericName: newMedication.genericName,
                      category: newMedication.category,
                      form: newMedication.form,
                      strength: newMedication.strength,
                      description: newMedication.description,
                      price: parseFloat(newMedication.price) || 0,
                      stock: parseInt(newMedication.stock) || 0,
                      manufacturer: newMedication.manufacturer || undefined,
                      prescriptionRequired: newMedication.prescriptionRequired,
                      sideEffects: newMedication.sideEffects ? newMedication.sideEffects.split(',').map(s => s.trim()).filter(Boolean) : [],
                      contraindications: newMedication.contraindications ? newMedication.contraindications.split(',').map(c => c.trim()).filter(Boolean) : [],
                    };
                    await onCreate(medicationData);
                    setShowAddModal(false);
                    setNewMedication({
                      name: '',
                      genericName: '',
                      category: '',
                      form: 'Tablet',
                      strength: '',
                      description: '',
                      price: '',
                      stock: '',
                      manufacturer: '',
                      prescriptionRequired: true,
                      sideEffects: '',
                      contraindications: '',
                    });
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Medication
                </button>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewMedication({
                      name: '',
                      genericName: '',
                      category: '',
                      form: 'Tablet',
                      strength: '',
                      description: '',
                      price: '',
                      stock: '',
                      manufacturer: '',
                      prescriptionRequired: true,
                      sideEffects: '',
                      contraindications: '',
                    });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Medication Modal */}
      {showEditModal && selectedMedication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Medication</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Medication Name (Brand) *</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Generic Name *</label>
                  <input
                    type="text"
                    value={editData.genericName}
                    onChange={(e) => setEditData({ ...editData, genericName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category *</label>
                  <select
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Form *</label>
                  <select
                    value={editData.form}
                    onChange={(e) => setEditData({ ...editData, form: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Cream">Cream</option>
                    <option value="Drops">Drops</option>
                    <option value="Spray">Spray</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Description *</label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={2}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Strength *</label>
                  <input
                    type="text"
                    value={editData.strength}
                    onChange={(e) => setEditData({ ...editData, strength: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editData.price}
                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Stock *</label>
                  <input
                    type="number"
                    value={editData.stock}
                    onChange={(e) => setEditData({ ...editData, stock: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Manufacturer</label>
                <input
                  type="text"
                  value={editData.manufacturer}
                  onChange={(e) => setEditData({ ...editData, manufacturer: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editData.prescriptionRequired}
                    onChange={(e) => setEditData({ ...editData, prescriptionRequired: e.target.checked })}
                  />
                  <span className="font-semibold">Prescription Required</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Side Effects (comma separated)</label>
                <input
                  type="text"
                  value={editData.sideEffects}
                  onChange={(e) => setEditData({ ...editData, sideEffects: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Contraindications (comma separated)</label>
                <input
                  type="text"
                  value={editData.contraindications}
                  onChange={(e) => setEditData({ ...editData, contraindications: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={async () => {
                    const medicationData = {
                      name: editData.name,
                      genericName: editData.genericName,
                      category: editData.category,
                      form: editData.form,
                      strength: editData.strength,
                      description: editData.description,
                      price: parseFloat(editData.price) || 0,
                      stock: parseInt(editData.stock) || 0,
                      manufacturer: editData.manufacturer || undefined,
                      prescriptionRequired: editData.prescriptionRequired,
                      sideEffects: editData.sideEffects ? editData.sideEffects.split(',').map(s => s.trim()).filter(Boolean) : [],
                      contraindications: editData.contraindications ? editData.contraindications.split(',').map(c => c.trim()).filter(Boolean) : [],
                    };
                    await onUpdate(selectedMedication._id || selectedMedication.id, medicationData);
                    setShowEditModal(false);
                    setSelectedMedication(null);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedMedication(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PrescriptionManagementSection = ({ prescriptions, onFetch, onCreate }: {
  prescriptions: any[];
  onFetch: () => Promise<void>;
  onCreate: (data: any) => Promise<void>;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Prescriptions Management</h2>
          <p className="text-gray-600">Manage all prescriptions</p>
        </div>
        <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medications</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {prescriptions.map((pres: any) => (
              <tr key={pres._id || pres.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{pres.userId?.fullName || 'N/A'}</td>
                <td className="px-6 py-4">{pres.doctorId?.fullName || 'N/A'}</td>
                <td className="px-6 py-4">
                  {pres.medications?.map((m: any) => m.name).join(', ') || 'N/A'}
                </td>
                <td className="px-6 py-4">{new Date(pres.issuedDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    pres.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {pres.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ConsultationManagementSection = ({ consultations, onFetch }: {
  consultations: any[];
  onFetch: () => Promise<void>;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Consultations</h2>
          <p className="text-gray-600">View all consultation logs</p>
        </div>
        <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {consultations.map((cons: any) => (
              <tr key={cons._id || cons.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{cons.userId?.fullName || 'N/A'}</td>
                <td className="px-6 py-4">{cons.doctorId?.fullName || 'N/A'}</td>
                <td className="px-6 py-4 capitalize">{cons.consultationType}</td>
                <td className="px-6 py-4">{new Date(cons.startTime).toLocaleDateString()}</td>
                <td className="px-6 py-4">{cons.duration || 'N/A'} min</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    cons.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {cons.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PaymentManagementSection = ({ payments, onFetch, onRefund }: {
  payments: any[];
  onFetch: () => Promise<void>;
  onRefund: (id: string) => Promise<void>;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Payments & Billing</h2>
          <p className="text-gray-600">Manage all payments and refunds</p>
        </div>
        <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment: any) => (
              <tr key={payment._id || payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{payment.userId?.fullName || 'N/A'}</td>
                <td className="px-6 py-4 font-semibold">${payment.amount?.toFixed(2)}</td>
                <td className="px-6 py-4 capitalize">{payment.paymentType}</td>
                <td className="px-6 py-4 capitalize">{payment.paymentMethod}</td>
                <td className="px-6 py-4">{new Date(payment.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    payment.status === 'completed' ? 'bg-green-100 text-green-600' :
                    payment.status === 'refunded' ? 'bg-red-100 text-red-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {payment.status === 'completed' && (
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to refund this payment?')) {
                          onRefund(payment._id || payment.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Refund
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AnalyticsSection = ({ analytics, onFetch }: {
  analytics: any;
  onFetch: () => Promise<void>;
}) => {
  useEffect(() => {
    onFetch();
  }, []);

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Analytics & Reports</h2>
          <p className="text-gray-600">Comprehensive platform analytics</p>
        </div>
        <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{analytics.users?.total || 0}</p>
          <p className="text-sm text-gray-600 mt-2">New: {analytics.users?.new || 0}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-2">Appointments</h3>
          <p className="text-3xl font-bold text-green-600">{analytics.appointments?.total || 0}</p>
          <p className="text-sm text-gray-600 mt-2">Success Rate: {analytics.appointments?.successRate || 0}%</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-purple-600">${(analytics.revenue?.total || 0).toFixed(2)}</p>
        </div>
      </div>

      {analytics.revenue?.daily && analytics.revenue.daily.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.revenue.daily}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

const NotificationManagementSection = ({ notifications, onFetch, onCreate }: {
  notifications: any[];
  onFetch: () => Promise<void>;
  onCreate: (data: any) => Promise<void>;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-600">Manage system notifications</p>
        </div>
        <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Read</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {notifications.map((notif: any) => (
              <tr key={notif._id || notif.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{notif.userId?.fullName || 'N/A'}</td>
                <td className="px-6 py-4 capitalize">{notif.type}</td>
                <td className="px-6 py-4">{notif.title}</td>
                <td className="px-6 py-4">{new Date(notif.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  {notif.isRead ? (
                    <span className="text-green-600">✓ Read</span>
                  ) : (
                    <span className="text-gray-400">Unread</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SettingsSection = ({ settings, onFetch, onUpdate }: {
  settings: any;
  onFetch: () => Promise<void>;
  onUpdate: (data: any) => Promise<void>;
}) => {
  const [editSettings, setEditSettings] = useState<any>(settings || {});

  useEffect(() => {
    if (settings) {
      setEditSettings(settings);
    }
  }, [settings]);

  if (!settings) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">System Settings</h2>
          <p className="text-gray-600">Configure system settings</p>
        </div>
        <button
          onClick={() => {
            onUpdate(editSettings);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold mb-4">Clinic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Clinic Name</label>
              <input
                type="text"
                value={editSettings.clinicName || ''}
                onChange={(e) => setEditSettings({ ...editSettings, clinicName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Clinic Email</label>
              <input
                type="email"
                value={editSettings.clinicEmail || ''}
                onChange={(e) => setEditSettings({ ...editSettings, clinicEmail: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Consultation Fees</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">General</label>
              <input
                type="number"
                value={editSettings.consultationFees?.general || 0}
                onChange={(e) => setEditSettings({
                  ...editSettings,
                  consultationFees: { ...editSettings.consultationFees, general: parseFloat(e.target.value) }
                })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Specialist</label>
              <input
                type="number"
                value={editSettings.consultationFees?.specialist || 0}
                onChange={(e) => setEditSettings({
                  ...editSettings,
                  consultationFees: { ...editSettings.consultationFees, specialist: parseFloat(e.target.value) }
                })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Emergency</label>
              <input
                type="number"
                value={editSettings.consultationFees?.emergency || 0}
                onChange={(e) => setEditSettings({
                  ...editSettings,
                  consultationFees: { ...editSettings.consultationFees, emergency: parseFloat(e.target.value) }
                })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecuritySection = ({ activityLogs, onFetch }: {
  activityLogs: any[];
  onFetch: () => Promise<void>;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Security & Compliance</h2>
          <p className="text-gray-600">View activity logs and security audit trail</p>
        </div>
        <button onClick={onFetch} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resource</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {activityLogs.map((log: any) => (
              <tr key={log._id || log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{log.userId?.fullName || 'System'}</td>
                <td className="px-6 py-4">{log.action}</td>
                <td className="px-6 py-4 capitalize">{log.resource}</td>
                <td className="px-6 py-4">{new Date(log.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    log.status === 'success' ? 'bg-green-100 text-green-600' :
                    log.status === 'failure' ? 'bg-red-100 text-red-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Admin Dashboard - Redesigned to match Rhythm Admin style
 * Complete management system with charts and real-time data
 */
export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    appointmentsToday: 0,
    totalMedications: 0,
    monthlyRevenue: 0,
  });
  const [appointments, setAppointments] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Management section states
  const [users, setUsers] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  
  // Filters and pagination
  const [userFilters, setUserFilters] = useState({ role: '', status: '', search: '', page: 1 });
  const [patientFilters, setPatientFilters] = useState({ search: '', page: 1 });
  const [appointmentFilters, setAppointmentFilters] = useState({ status: '', date: '', doctorId: '', page: 1 });
  
  // Selected items for detail views
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
      return;
    }
    if (user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated, user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch admin stats
      const statsRes = await api.getAdminStats();
      const statsData = await statsRes.json();
      setStats(statsData.stats);

      // Fetch appointments
      const appointmentsRes = await api.getAppointments();
      const appointmentsData = await appointmentsRes.json();
      setAppointments(appointmentsData.appointments || []);

      // Fetch payments
      const paymentsRes = await api.getPayments();
      const paymentsData = await paymentsRes.json();
      setPayments(paymentsData.payments || []);

      // Fetch doctors
      try {
        const doctorsRes = await api.admin.getDoctors();
        const doctorsData = await doctorsRes.json();
        setDoctors(doctorsData.doctors || []);
      } catch (e) {
        setDoctors([]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch functions for each management section
  const fetchUsers = async () => {
    try {
      const res = await api.admin.getUsers(userFilters);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.admin.getPatients(patientFilters);
      const data = await res.json();
      setPatients(data.patients || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const res = await api.admin.getPrescriptions();
      const data = await res.json();
      setPrescriptions(data.prescriptions || []);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const fetchConsultations = async () => {
    try {
      const res = await api.admin.getConsultations();
      const data = await res.json();
      setConsultations(data.consultations || []);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await api.admin.getNotifications();
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await api.admin.getAnalytics();
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await api.admin.getSettings();
      const data = await res.json();
      setSettings(data.settings);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const fetchActivityLogs = async () => {
    try {
      const res = await api.admin.getActivityLogs();
      const data = await res.json();
      setActivityLogs(data.logs || []);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    }
  };

  const fetchMedications = async () => {
    try {
      // Fetch all medications including inactive ones for admin
      const res = await api.getMedications({ includeInactive: 'true' });
      const data = await res.json();
      const meds = data.medications || [];
      setMedications(meds);
      
      // Update stats with medication count
      setStats(prev => ({
        ...prev,
        totalMedications: meds.length,
      }));
    } catch (error) {
      console.error('Error fetching medications:', error);
      setMedications([]);
    }
  };

  // Load data when tab changes
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') return;
    
    switch (activeTab) {
      case 'users':
        fetchUsers();
        break;
      case 'patients':
        fetchPatients();
        break;
      case 'prescriptions':
        fetchPrescriptions();
        break;
      case 'consultations':
        fetchConsultations();
        break;
      case 'notifications':
        fetchNotifications();
        break;
      case 'analytics':
        fetchAnalytics();
        break;
      case 'settings':
        fetchSettings();
        break;
      case 'security':
        fetchActivityLogs();
        break;
      case 'medications':
        fetchMedications();
        break;
    }
  }, [activeTab, userFilters, patientFilters, appointmentFilters]);

  // Format date for display
  const formatDate = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}${getOrdinal(date.getDate())} ${date.getFullYear()}`;
  };

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  // Get upcoming appointments for selected date
  const getUpcomingAppointments = () => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    return appointments
      .filter(apt => {
        const aptDate = new Date(apt.appointmentDate).toISOString().split('T')[0];
        return aptDate === selectedDateStr && ['pending', 'confirmed'].includes(apt.status);
      })
      .slice(0, 5);
  };

  // Prepare revenue chart data (last 7 days)
  const getRevenueData = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayPayments = payments.filter(p => {
        const paymentDate = new Date(p.createdAt).toISOString().split('T')[0];
        return paymentDate === dateStr && p.status === 'completed';
      });
      
      const income = dayPayments.reduce((sum, p) => sum + (p.amount || 0), 0);
      const expense = income * 0.3; // Simulated expense (30% of income)
      
      days.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        income,
        expense,
      });
    }
    return days;
  };

  // Prepare appointments overview data
  const getAppointmentsOverview = () => {
    const total = appointments.length;
    if (total === 0) return [{ name: 'No Data', value: 100 }];
    
    const male = appointments.filter(a => a.gender === 'male').length;
    const female = appointments.filter(a => a.gender === 'female').length;
    const child = appointments.filter(a => a.age && a.age < 18).length;
    const other = total - male - female - child;
    
    return [
      { name: 'Male', value: male },
      { name: 'Female', value: female },
      { name: 'Child', value: child },
      { name: 'Other', value: other },
    ];
  };

  const COLORS = ['#FFA500', '#EF4444', '#3B82F6', '#FBBF24'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 rounded-lg p-2">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">Eugene Health</span>
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 pl-10 pr-4 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right: Icons and User */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">ADMIN</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || 'A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <aside className={`
          ${sidebarCollapsed ? 'w-20' : 'w-64'}
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)]
          bg-gray-800 text-white z-40
          transition-all duration-300 ease-in-out
          overflow-y-auto
        `}>
          <nav className="p-4 space-y-2">
            {/* Emergency Help */}
            <div className="bg-red-600 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                {!sidebarCollapsed && <span className="font-semibold">Emergency help</span>}
              </div>
            </div>

            {/* Dashboard Section */}
            <div>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {!sidebarCollapsed && <span>Dashboard</span>}
                </div>
                {!sidebarCollapsed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>

            {/* Navigation Items */}
            {[
              { id: 'users', label: 'User Management', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { id: 'doctors', label: 'Doctor Management', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { id: 'patients', label: 'Patient Management', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { id: 'appointments', label: 'Appointments', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
              { id: 'medications', label: 'Medications', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
              { id: 'prescriptions', label: 'Prescriptions', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
              { id: 'consultations', label: 'Consultations', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
              { id: 'payments', label: 'Payments & Billing', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
              { id: 'analytics', label: 'Analytics & Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
              { id: 'settings', label: 'System Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
              { id: 'security', label: 'Security & Compliance', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </div>
                {!sidebarCollapsed && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}

            {/* Bottom Card */}
            {!sidebarCollapsed && (
              <div className="mt-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white text-sm">Make an Appointment</h4>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <p className="text-xs text-blue-100">Best Health Care here →</p>
              </div>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-0'}`}>
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Patients', value: stats.totalUsers.toLocaleString(), icon: '👥', color: 'bg-blue-500' },
                  { title: 'Consultation', value: stats.appointmentsToday.toString(), icon: '🩺', color: 'bg-green-500' },
                  { title: 'Staff', value: doctors.length.toString(), icon: '👨‍⚕️', color: 'bg-purple-500' },
                  { title: 'Total Rooms', value: '12', icon: '🏥', color: 'bg-orange-500' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                        {stat.icon}
                      </div>
                    </div>
                    <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Charts and Lists Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Daily Revenue Report */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Daily Revenue Report</h3>
                  </div>
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-blue-600">${stats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Current Revenue</p>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={getRevenueData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="income" fill="#3B82F6" name="Income" />
                      <Bar dataKey="expense" fill="#1E40AF" name="Expense" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Payments History */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Payments history</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {payments.slice(0, 5).map((payment, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">Dr. {payment.doctorName || 'Unknown'}</p>
                          <p className="text-xs text-gray-600">{payment.paymentType || 'Consultation'}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${payment.amount?.toFixed(2) || '0.00'}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                    {payments.length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-4">No payments yet</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments and Doctor List */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Appointments */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Upcoming Appointments</h3>
                  </div>
                  
                  {/* Date Navigation */}
                  <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg">
                    <button
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(newDate.getDate() - 1);
                        setSelectedDate(newDate);
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-sm font-semibold text-blue-600">
                      {formatDate(selectedDate)}
                    </span>
                    <button
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(newDate.getDate() + 1);
                        setSelectedDate(newDate);
                      }}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {getUpcomingAppointments().map((apt, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-sm">
                              {apt.patientName?.charAt(0) || 'P'}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm">{apt.patientName || 'Patient'}</p>
                            <p className="text-xs text-gray-600">{apt.reasonForVisit || 'Consultation'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 text-sm">
                            {new Date(apt.appointmentTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-xs text-gray-500">${apt.amount || '0'}</p>
                        </div>
                        <button className="ml-2 p-2 hover:bg-gray-200 rounded">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {getUpcomingAppointments().length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-4">No appointments for this date</p>
                    )}
                  </div>
                </div>

                {/* Doctor List */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Doctor List</h3>
                    <span className="text-sm text-gray-500">Today</span>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {doctors.slice(0, 5).map((doctor, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-bold text-sm">
                              {doctor.name?.charAt(0) || 'D'}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">Dr. {doctor.name || 'Unknown'}</p>
                            <p className="text-xs text-gray-600">{doctor.specialty || 'General'}</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-200 rounded">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {doctors.length === 0 && (
                      <p className="text-gray-500 text-sm text-center py-4">No doctors available</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Balance and Appointments Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Balance */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Balance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-semibold text-gray-700">Income</span>
                        </div>
                        <span className="text-lg font-bold text-green-600">${stats.monthlyRevenue.toLocaleString()}</span>
                      </div>
                      <ResponsiveContainer width="100%" height={60}>
                        <LineChart data={getRevenueData()}>
                          <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                          <span className="text-sm font-semibold text-gray-700">Outcome</span>
                        </div>
                        <span className="text-lg font-bold text-pink-600">${(stats.monthlyRevenue * 0.3).toLocaleString()}</span>
                      </div>
                      <ResponsiveContainer width="100%" height={60}>
                        <LineChart data={getRevenueData()}>
                          <Line type="monotone" dataKey="expense" stroke="#EC4899" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Appointments Overview */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Appointments Overview</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={getAppointmentsOverview()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getAppointmentsOverview().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* User Management */}
          {activeTab === 'users' && (
            <UserManagementSection 
              users={users}
              onFetch={fetchUsers}
              onUpdate={async (id, data) => {
                await api.admin.updateUser(id, data);
                fetchUsers();
              }}
              onSuspend={async (id) => {
                await api.admin.suspendUser(id);
                fetchUsers();
              }}
              onDelete={async (id) => {
                await api.admin.deleteUser(id);
                fetchUsers();
              }}
              filters={userFilters}
              onFilterChange={setUserFilters}
            />
          )}

          {/* Doctor Management */}
          {activeTab === 'doctors' && (
            <DoctorManagementSection 
              doctors={doctors}
              onFetch={async () => {
                const res = await api.admin.getDoctors();
                const data = await res.json();
                setDoctors(data.doctors || []);
              }}
              onViewDetails={async (id) => {
                if (id) {
                  const res = await api.admin.getDoctor(id);
                  const data = await res.json();
                  setSelectedDoctor(data);
                } else {
                  setSelectedDoctor(null);
                }
              }}
              selectedDoctor={selectedDoctor}
              onCreate={async (data) => {
                await api.admin.createDoctor(data);
                const res = await api.admin.getDoctors();
                const data2 = await res.json();
                setDoctors(data2.doctors || []);
              }}
              onUpdate={async (id, data) => {
                await api.admin.updateDoctor(id, data);
                const res = await api.admin.getDoctors();
                const data2 = await res.json();
                setDoctors(data2.doctors || []);
              }}
              onDelete={async (id) => {
                await api.admin.deleteUser(id);
                const res = await api.admin.getDoctors();
                const data = await res.json();
                setDoctors(data.doctors || []);
              }}
            />
          )}

          {/* Patient Management */}
          {activeTab === 'patients' && (
            <PatientManagementSection 
              patients={patients}
              onFetch={fetchPatients}
              onViewDetails={async (id) => {
                const res = await api.admin.getPatient(id);
                const data = await res.json();
                setSelectedPatient(data);
              }}
              selectedPatient={selectedPatient}
              filters={patientFilters}
              onFilterChange={setPatientFilters}
            />
          )}

          {/* Appointments Management */}
          {activeTab === 'appointments' && (
            <AppointmentManagementSection 
              appointments={appointments}
              onFetch={async () => {
                const res = await api.admin.getAppointments(appointmentFilters);
                const data = await res.json();
                setAppointments(data.appointments || []);
              }}
              onUpdate={async (id, data) => {
                await api.admin.updateAppointment(id, data);
                const res = await api.admin.getAppointments(appointmentFilters);
                const data2 = await res.json();
                setAppointments(data2.appointments || []);
              }}
              onCancel={async (id) => {
                await api.admin.cancelAppointment(id);
                const res = await api.admin.getAppointments(appointmentFilters);
                const data = await res.json();
                setAppointments(data.appointments || []);
              }}
              filters={appointmentFilters}
              onFilterChange={setAppointmentFilters}
              doctors={doctors}
            />
          )}

          {/* Medications Management */}
          {activeTab === 'medications' && (
            <MedicationManagementSection 
              medications={medications}
              onFetch={fetchMedications}
              onCreate={async (data) => {
                await api.admin.createMedication(data);
                fetchMedications();
              }}
              onUpdate={async (id, data) => {
                await api.admin.updateMedication(id, data);
                fetchMedications();
              }}
              onDelete={async (id) => {
                await api.admin.deleteMedication(id);
                fetchMedications();
              }}
            />
          )}

          {/* Prescriptions */}
          {activeTab === 'prescriptions' && (
            <PrescriptionManagementSection 
              prescriptions={prescriptions}
              onFetch={fetchPrescriptions}
              onCreate={async (data) => {
                await api.admin.createPrescription(data);
                fetchPrescriptions();
              }}
            />
          )}

          {/* Consultations */}
          {activeTab === 'consultations' && (
            <ConsultationManagementSection 
              consultations={consultations}
              onFetch={fetchConsultations}
            />
          )}

          {/* Payments & Billing */}
          {activeTab === 'payments' && (
            <PaymentManagementSection 
              payments={payments}
              onFetch={async () => {
                const res = await api.admin.getPayments();
                const data = await res.json();
                setPayments(data.payments || []);
              }}
              onRefund={async (id) => {
                await api.admin.refundPayment(id);
                const res = await api.admin.getPayments();
                const data = await res.json();
                setPayments(data.payments || []);
              }}
            />
          )}

          {/* Analytics & Reports */}
          {activeTab === 'analytics' && (
            <AnalyticsSection 
              analytics={analytics}
              onFetch={fetchAnalytics}
            />
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <NotificationManagementSection 
              notifications={notifications}
              onFetch={fetchNotifications}
              onCreate={async (data) => {
                await api.admin.createNotification(data);
                fetchNotifications();
              }}
            />
          )}

          {/* System Settings */}
          {activeTab === 'settings' && (
            <SettingsSection 
              settings={settings}
              onFetch={fetchSettings}
              onUpdate={async (data) => {
                await api.admin.updateSettings(data);
                fetchSettings();
              }}
            />
          )}

          {/* Security & Compliance */}
          {activeTab === 'security' && (
            <SecuritySection 
              activityLogs={activityLogs}
              onFetch={fetchActivityLogs}
            />
          )}
        </main>
      </div>
    </div>
  );
}
