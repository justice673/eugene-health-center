/**
 * API Utility Functions
 * Centralized API calls to Express.js backend
 */

// Use same-origin API by default (works with Next.js route handlers).
// If NEXT_PUBLIC_API_URL is set, it can target an external backend.
const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').trim();

function buildApiUrl(endpoint: string): string {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (!API_URL) return normalizedEndpoint;
  return `${API_URL.replace(/\/+$/, '')}${normalizedEndpoint}`;
}

// Debug: Log API URL in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔗 Backend API URL:', API_URL);
  console.log('📡 Environment variable:', process.env.NEXT_PUBLIC_API_URL || 'Not set (using default)');
}

/**
 * Get authentication token from localStorage
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

/**
 * Make authenticated API request
 */
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(buildApiUrl(endpoint), {
      ...options,
      headers,
    });
  } catch (error) {
    throw new Error(
      `Network request failed. Check API server and NEXT_PUBLIC_API_URL configuration. ${error instanceof Error ? error.message : ''}`.trim()
    );
  }

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const error = await response.json();
      errorMessage = error.error || error.message || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  return response;
}

/**
 * API Methods
 */
export const api = {
  // Auth
  signup: (data: { fullName: string; email: string; phone: string; password: string }) =>
    apiRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  signin: (data: { email: string; password: string }) =>
    apiRequest('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => apiRequest('/api/auth/me'),

  // Appointments
  getAppointments: (status?: string) =>
    apiRequest(`/api/appointments${status ? `?status=${status}` : ''}`),

  getAppointment: (id: string) => apiRequest(`/api/appointments/${id}`),

  createAppointment: (data: any) =>
    apiRequest('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateAppointment: (id: string, data: any) =>
    apiRequest(`/api/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  cancelAppointment: (id: string) =>
    apiRequest(`/api/appointments/${id}`, {
      method: 'DELETE',
    }),

  // Payments
  processPayment: (data: any) =>
    apiRequest('/api/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getPayments: () => apiRequest('/api/payments'),

  getPayment: (id: string) => apiRequest(`/api/payments/${id}`),

  // Medications
  getMedications: (params?: { category?: string; search?: string; includeInactive?: string }) => {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.search) query.append('search', params.search);
    if (params?.includeInactive) query.append('includeInactive', params.includeInactive);
    return apiRequest(`/api/medications${query.toString() ? `?${query}` : ''}`);
  },

  getMedication: (id: string) => apiRequest(`/api/medications/${id}`),

  // Doctors
  getDoctors: () => apiRequest('/api/doctors'),

  getDoctor: (id: string) => apiRequest(`/api/doctors/${id}`),

  // Dashboard
  getDashboardStats: () => apiRequest('/api/dashboard/stats'),

  getAdminStats: () => apiRequest('/api/dashboard/admin/stats'),

  // Users
  getUsers: () => apiRequest('/api/users'),

  getUser: (id: string) => apiRequest(`/api/users/${id}`),

  updateUser: (id: string, data: any) =>
    apiRequest(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Admin Routes
  admin: {
    // Users
    getUsers: (params?: { role?: string; status?: string; search?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.role) query.append('role', params.role);
      if (params?.status) query.append('status', params.status);
      if (params?.search) query.append('search', params.search);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/api/admin/users${query.toString() ? `?${query}` : ''}`);
    },
    getUser: (id: string) => apiRequest(`/api/admin/users/${id}`),
    updateUser: (id: string, data: any) =>
      apiRequest(`/api/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    suspendUser: (id: string) => apiRequest(`/api/admin/users/${id}/suspend`, { method: 'POST' }),
    deleteUser: (id: string) => apiRequest(`/api/admin/users/${id}`, { method: 'DELETE' }),

    // Doctors
    getDoctors: () => apiRequest('/api/admin/doctors'),
    getDoctor: (id: string) => apiRequest(`/api/admin/doctors/${id}`),

    // Patients
    getPatients: (params?: { search?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.search) query.append('search', params.search);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/api/admin/patients${query.toString() ? `?${query}` : ''}`);
    },
    getPatient: (id: string) => apiRequest(`/api/admin/patients/${id}`),

    // Appointments
    getAppointments: (params?: { status?: string; date?: string; doctorId?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.status) query.append('status', params.status);
      if (params?.date) query.append('date', params.date);
      if (params?.doctorId) query.append('doctorId', params.doctorId);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/api/admin/appointments${query.toString() ? `?${query}` : ''}`);
    },
    updateAppointment: (id: string, data: any) =>
      apiRequest(`/api/admin/appointments/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    cancelAppointment: (id: string) => apiRequest(`/api/admin/appointments/${id}/cancel`, { method: 'POST' }),

    // Prescriptions
    getPrescriptions: (params?: { userId?: string; doctorId?: string; status?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.userId) query.append('userId', params.userId);
      if (params?.doctorId) query.append('doctorId', params.doctorId);
      if (params?.status) query.append('status', params.status);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/api/admin/prescriptions${query.toString() ? `?${query}` : ''}`);
    },
    createPrescription: (data: any) =>
      apiRequest('/api/admin/prescriptions', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    // Medical Records
    getMedicalRecords: (params?: { userId?: string; recordType?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.userId) query.append('userId', params.userId);
      if (params?.recordType) query.append('recordType', params.recordType);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/api/admin/medical-records${query.toString() ? `?${query}` : ''}`);
    },
    uploadMedicalRecord: (data: any) =>
      apiRequest('/api/admin/medical-records', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    // Consultations
    getConsultations: (params?: { userId?: string; doctorId?: string; status?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.userId) query.append('userId', params.userId);
      if (params?.doctorId) query.append('doctorId', params.doctorId);
      if (params?.status) query.append('status', params.status);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/api/admin/consultations${query.toString() ? `?${query}` : ''}`);
    },

    // Payments
    getPayments: (params?: { status?: string; paymentType?: string; startDate?: string; endDate?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.status) query.append('status', params.status);
      if (params?.paymentType) query.append('paymentType', params.paymentType);
      if (params?.startDate) query.append('startDate', params.startDate);
      if (params?.endDate) query.append('endDate', params.endDate);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/api/admin/payments${query.toString() ? `?${query}` : ''}`);
    },
    refundPayment: (id: string) => apiRequest(`/api/admin/payments/${id}/refund`, { method: 'POST' }),

    // Analytics
    getAnalytics: (params?: { startDate?: string; endDate?: string }) => {
      const query = new URLSearchParams();
      if (params?.startDate) query.append('startDate', params.startDate);
      if (params?.endDate) query.append('endDate', params.endDate);
      return apiRequest(`/api/admin/analytics${query.toString() ? `?${query}` : ''}`);
    },

    // Notifications
    getNotifications: (params?: { type?: string; isRead?: boolean; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.type) query.append('type', params.type);
      if (params?.isRead !== undefined) query.append('isRead', params.isRead.toString());
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/api/admin/notifications${query.toString() ? `?${query}` : ''}`);
    },
    createNotification: (data: any) =>
      apiRequest('/api/admin/notifications', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    // Settings
    getSettings: () => apiRequest('/api/admin/settings'),
    updateSettings: (data: any) =>
      apiRequest('/api/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    // Activity Logs
    getActivityLogs: (params?: { userId?: string; resource?: string; startDate?: string; endDate?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.userId) query.append('userId', params.userId);
      if (params?.resource) query.append('resource', params.resource);
      if (params?.startDate) query.append('startDate', params.startDate);
      if (params?.endDate) query.append('endDate', params.endDate);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/api/admin/activity-logs${query.toString() ? `?${query}` : ''}`);
    },

    // Medications Management
    getMedications: (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.search) query.append('search', params.search);
      if (params?.page) query.append('page', params.page.toString());
      if (params?.limit) query.append('limit', params.limit.toString());
      return apiRequest(`/api/medications${query.toString() ? `?${query}` : ''}`);
    },
    getMedication: (id: string) => apiRequest(`/api/medications/${id}`),
    createMedication: (data: any) =>
      apiRequest('/api/medications', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    updateMedication: (id: string, data: any) =>
      apiRequest(`/api/medications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    deleteMedication: (id: string) =>
      apiRequest(`/api/medications/${id}`, {
        method: 'DELETE',
      }),

    // Doctor Management - Add/Edit
    createDoctor: (data: any) =>
      apiRequest('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({ ...data, role: 'doctor' }),
      }),
    updateDoctor: (id: string, data: any) =>
      apiRequest(`/api/admin/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },
};


