import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SpendForm from './pages/SpendForm';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-blue-600">SpendWise AI</div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-12">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/audit" element={<SpendForm />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </main>
    </div>
  );
}
