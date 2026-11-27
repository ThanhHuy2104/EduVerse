import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return <header className="border-b border-stone-200 bg-white">
    <nav aria-label="Điều hướng chính" className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4 sm:px-8">
      <Link to="/" className="mr-auto flex items-center gap-2 text-2xl font-bold">
        <span aria-hidden="true" className="grid size-9 place-items-center rounded-lg bg-teal-800 font-serif text-white">e</span>EduVerse
      </Link>
      <NavLink to="/courses">Khóa học</NavLink>
      <NavLink to="/signin">Đăng nhập</NavLink><Link className="btn" to="/signup">Đăng ký</Link>
    </nav>
  </header>
}
