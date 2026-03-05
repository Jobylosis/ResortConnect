/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { TouristHome } from './pages/TouristHome';
import { PropertyDetails } from './pages/PropertyDetails';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { OwnerDashboard } from './pages/OwnerDashboard';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<TouristHome />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Owner Routes */}
          <Route 
            path="/owner/*" 
            element={
              <ProtectedRoute allowedRoles={['OWNER']}>
                <OwnerDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<TouristHome />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
