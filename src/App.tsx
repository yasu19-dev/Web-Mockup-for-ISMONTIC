import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DashboardSidebar } from './components/DashboardSidebar';
import { DashboardTopbar } from './components/DashboardTopbar';

// Public pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Presentation } from './pages/Presentation';
import { Filieres } from './pages/Filieres';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Staff } from './pages/Staff';

// Stagiaire pages
import { StagiaireDashboard } from './pages/stagiaire/StagiaireDashboard';
import { StagiaireNotes } from './pages/stagiaire/StagiaireNotes';
import { StagiaireSchedule } from './pages/stagiaire/StagiaireSchedule';
import { StagiaireComplaints } from './pages/stagiaire/StagiaireComplaints';
import { StagiaireAppointments } from './pages/stagiaire/StagiaireAppointments';
import { StagiaireElearning } from './pages/stagiaire/StagiaireElearning';
import { StagiaireDocuments } from './pages/stagiaire/StagiaireDocuments';
import { StagiaireAnnouncements } from './pages/stagiaire/StagiaireAnnouncements';
import { StagiaireProfile } from './pages/stagiaire/StagiaireProfile';

// Formateur pages
import { FormateurDashboard } from './pages/formateur/FormateurDashboard';
import { FormateurAbsences } from './pages/formateur/FormateurAbsences';
import { FormateurStatistics } from './pages/formateur/FormateurStatistics';
import { FormateurProfile } from './pages/formateur/FormateurProfile';

// Admin pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAttestations } from './pages/admin/AdminAttestations';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminAbsenceStats } from './pages/admin/AdminAbsenceStats';
import { AdminSettings } from './pages/admin/AdminSettings';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#141820]">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardTopbar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role!)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/presentation" element={<Presentation />} />
      <Route path="/filieres" element={<Filieres />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />

      {/* Stagiaire routes */}
      <Route
        path="/stagiaire/dashboard"
        element={
          <ProtectedRoute allowedRoles={['stagiaire']}>
            <DashboardLayout>
              <StagiaireDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stagiaire/profile"
        element={
          <ProtectedRoute allowedRoles={['stagiaire']}>
            <DashboardLayout>
              <StagiaireProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stagiaire/notes"
        element={
          <ProtectedRoute allowedRoles={['stagiaire']}>
            <DashboardLayout>
              <StagiaireNotes />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stagiaire/schedule"
        element={
          <ProtectedRoute allowedRoles={['stagiaire']}>
            <DashboardLayout>
              <StagiaireSchedule />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stagiaire/documents"
        element={
          <ProtectedRoute allowedRoles={['stagiaire']}>
            <DashboardLayout>
              <StagiaireDocuments />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stagiaire/announcements"
        element={
          <ProtectedRoute allowedRoles={['stagiaire']}>
            <DashboardLayout>
              <StagiaireAnnouncements />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stagiaire/complaints"
        element={
          <ProtectedRoute allowedRoles={['stagiaire']}>
            <DashboardLayout>
              <StagiaireComplaints />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stagiaire/appointments"
        element={
          <ProtectedRoute allowedRoles={['stagiaire']}>
            <DashboardLayout>
              <StagiaireAppointments />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stagiaire/elearning"
        element={
          <ProtectedRoute allowedRoles={['stagiaire']}>
            <DashboardLayout>
              <StagiaireElearning />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Formateur routes */}
      <Route
        path="/formateur/dashboard"
        element={
          <ProtectedRoute allowedRoles={['formateur']}>
            <DashboardLayout>
              <FormateurDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/formateur/absences"
        element={
          <ProtectedRoute allowedRoles={['formateur']}>
            <DashboardLayout>
              <FormateurAbsences />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/formateur/statistics"
        element={
          <ProtectedRoute allowedRoles={['formateur']}>
            <DashboardLayout>
              <FormateurStatistics />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/formateur/profile"
        element={
          <ProtectedRoute allowedRoles={['formateur']}>
            <DashboardLayout>
              <FormateurProfile />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/absences-stats"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout>
              <AdminAbsenceStats />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/attestations"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout>
              <AdminAttestations />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout>
              <AdminUsers />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout>
              <AdminSettings />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
