import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      {/* Nơi định nghĩa các luồng đi của trang web */}
      <Routes>
        <Route path="/" element={<div className="p-4">Trang chủ (Home Page)</div>} />
        <Route path="/quizzes" element={<div className="p-4">Danh sách bài thi (Quiz List)</div>} />
        <Route path="/auth/login" element={<div className="p-4">Trang đăng nhập (Login)</div>} />
        
        {/* Route 404 - Khi user nhập linh tinh */}
        <Route path="*" element={<div className="p-4 text-red-500">404 - Không tìm thấy trang</div>} />
      </Routes>
    </>
  )
}

export default App