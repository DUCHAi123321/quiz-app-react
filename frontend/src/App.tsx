import { Routes, Route } from 'react-router-dom'
import NotFoundPage from './pages/error/NotFoundPage'
import ForbiddenPage from './pages/error/ForbiddenPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import HomePage from '@/pages/HomePage'
import QuizzesPage from '@/pages/QuizzesPage'
import UserManagementPage from '@/pages/management/UserManagementPage'
import QuizManagementPage from '@/pages/management/QuizManagementPage'
import QuestionManagementPage from '@/pages/management/QuestionManagementPage'
import RoleManagementPage from '@/pages/management/RoleManagementPage'

function App() {
  return (
    <>
      {/* Nơi định nghĩa các luồng đi của trang web */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/management/quiz" element={<QuizManagementPage />} />
        <Route path="/management/question" element={<QuestionManagementPage />} />
        <Route path="/management/user" element={<UserManagementPage />} />
        <Route path="/management/role" element={<RoleManagementPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        
        {/* Route 403 - Không có quyền truy cập */}
        <Route path="/forbidden" element={<ForbiddenPage />} />
        
        {/* Route 404 - Khi user nhập linh tinh */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App