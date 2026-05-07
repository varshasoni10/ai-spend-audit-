import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center text-center py-20">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
        Stop Overpaying for AI Tools
      </div>
      
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 max-w-3xl">
        Are you wasting money on the wrong AI subscriptions?
      </h1>
      
      <p className="text-xl text-slate-600 mb-10 max-w-2xl">
        Most startups overspend by 30% due to unused seats and sub-optimal tiers. 
        Run a free 30-second audit to find your savings.
      </p>
      
      <Link 
        to="/audit"
        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all hover:shadow hover:-translate-y-0.5 gap-2"
      >
        Run Free Audit <ArrowRight className="w-5 h-5" />
      </Link>

      <div className="mt-20 pt-10 border-t border-slate-200 w-full max-w-4xl text-left flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 mb-4">How it works</h3>
          <ul className="space-y-3 text-slate-600">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Input your current tools and spend</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Our engine calculates optimal tiers based on 2026 pricing</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> See your potential annual savings instantly</li>
          </ul>
        </div>
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="text-sm font-medium text-slate-500 mb-2">Example Audit Result</div>
          <div className="text-2xl font-bold text-slate-900 mb-1">$3,240 saved annually</div>
          <div className="text-slate-600">By downgrading 12 users from Copilot Enterprise to Business.</div>
        </div>
      </div>
    </div>
  );
}
