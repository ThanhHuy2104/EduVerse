import { Link, Route, Routes } from 'react-router-dom'
import CoursesPage from '../features/courses/pages/CoursesPage.jsx'
import CourseDetailPage from '../features/courses/pages/CourseDetailPage.jsx'
import CourseEditorPage from '../features/courses/pages/CourseEditorPage.jsx'
import LessonPage from '../features/courses/pages/LessonPage.jsx'
import SignInPage from '../features/auth/pages/SignInPage.jsx'
import SignUpPage from '../features/auth/pages/SignUpPage.jsx'
import CartPage from '../features/cart/pages/CartPage.jsx'
import MyCoursesPage from '../features/enrollments/pages/MyCoursesPage.jsx'
import ProfilePage from '../features/users/pages/ProfilePage.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CoursesPage />} />
      <Route path="/courses/:courseId" element={<CourseDetailPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/my-courses" element={<MyCoursesPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/courses/new" element={<CourseEditorPage />} />
      <Route path="/courses/:courseId/edit" element={<CourseEditorPage />} />
      <Route path="/lessons/:lessonId" element={<LessonPage />} />
      <Route path="*" element={<Link className="textlink" to="/">Không tìm thấy trang. Về thư viện</Link>} />
    </Routes>
  )
}
