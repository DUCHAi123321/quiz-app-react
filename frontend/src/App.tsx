import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'
import ProtectedRoute from '@/components/ProtectedRoute'
import { AuthProvider } from '@/contexts/AuthContext'
import HomePage from '@/pages/HomePage'
import QuizzesPage from '@/pages/QuizzesPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'

// Lazy load error pages
const NotFoundPage = lazy(() => import('./pages/error/NotFoundPage'))
const ForbiddenPage = lazy(() => import('./pages/error/ForbiddenPage'))

// Lazy load auth pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))

// Lazy load management pages (admin)
const UserManagementPage = lazy(() => import('./pages/management/UserManagementPage'))
const QuizManagementPage = lazy(() => import('./pages/management/QuizManagementPage'))
const QuestionManagementPage = lazy(() => import('./pages/management/QuestionManagementPage'))
const RoleManagementPage = lazy(() => import('./pages/management/RoleManagementPage'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          {/* Nơi định nghĩa các luồng đi của trang web */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Auth Routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            
            {/* Protected Admin Routes - Require ADMIN role */}
            <Route
              path="/management"
              element={
                <ProtectedRoute requireRoles={['ADMIN']}>
                  <QuizManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/quiz"
              element={
                <ProtectedRoute requireRoles={['ADMIN']}>
                  <QuizManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/question"
              element={
                <ProtectedRoute requireRoles={['ADMIN']}>
                  <QuestionManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/user"
              element={
                <ProtectedRoute requireRoles={['ADMIN']}>
                  <UserManagementPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/management/role"
              element={
                <ProtectedRoute requireRoles={['ADMIN']}>
                  <RoleManagementPage />
                </ProtectedRoute>
              }
            />
        
            
            {/* Error Routes */}
            <Route path="/forbidden" element={<ForbiddenPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AuthProvider>
  )
}

export default App