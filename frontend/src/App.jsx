import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

export default function App() {
  return <div id="top" className="flex min-h-screen flex-col bg-stone-50 text-stone-900">
    <Header />
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8"><AppRoutes /></main>
    <Footer />
  </div>
}

