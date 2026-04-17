# Admin Dashboard - Medications & Doctor Management Additions

## ✅ What Needs to be Added

### 1. Medications Management Section
- Full CRUD operations (Create, Read, Update, Delete)
- Search and filter by category
- Stock management
- Add/Edit modals

### 2. Enhanced Doctor Management
- Add new doctors
- Edit existing doctors
- Delete doctors
- View all doctors with stats

## 📝 Code to Add

### In src/lib/api.ts - Already Added ✅
The medication and doctor management endpoints are already in the API.

### In src/app/admin/page.tsx

1. **Add to state (around line 992):**
```typescript
const [medications, setMedications] = useState<any[]>([]);
```

2. **Add fetch function (after fetchActivityLogs):**
```typescript
const fetchMedications = async () => {
  try {
    const res = await api.admin.getMedications();
    const data = await res.json();
    setMedications(data.medications || []);
  } catch (error) {
    console.error('Error fetching medications:', error);
  }
};
```

3. **Add to useEffect (in the switch statement):**
```typescript
case 'medications':
  fetchMedications();
  break;
```

4. **Add Medications Management Component** (before PrescriptionManagementSection)
5. **Add Medications Tab in main render** (after appointments, before prescriptions)
6. **Update Doctor Management** to include Add/Edit/Delete buttons

## 🚀 Quick Fix

The file is very large. The best approach is to:
1. Add the medications state and fetch function
2. Add the medications component
3. Add the medications tab in the render section
4. Update doctor management with full CRUD

All the backend APIs are ready - just need to wire up the frontend!

