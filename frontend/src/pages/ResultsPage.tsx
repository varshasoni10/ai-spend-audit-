import { useEffect, useState } from 'react';
import { runAudit, type AuditResult, type AuditInput } from '../lib/auditEngine';
import { useNavigate } from 'react-router-dom';
import { TrendingDown, AlertTriangle, CheckCircle, Mail } from 'lucide-react';

export default function ResultsPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<AuditResult | null>(null);
  const [input, setInput] = useState<AuditInput | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiSummary, setAiSummary] = useState("Analyzing your usage patterns...");

  useEffect(() => {
    const saved = localStorage.getItem('auditFormData');
    if (!saved) {
      navigate('/audit');
      return;
    }
    try {
      const parsed = JSON.parse(saved);
      const parsedInput = {
        ...parsed,
        spend: Number(parsed.spend),
        users: Number(parsed.users)
      };
      setInput(parsedInput);
      const res = runAudit(parsedInput);
      setResult(res);

      // Simulate AI fetch
      setTimeout(() => {
        if (res.monthlySavings > 0) {
          setAiSummary(`Based on your ${parsedInput.users}-person team using ${parsedInput.tool}, you are significantly over-provisioned on the ${parsedInput.plan} plan. By migrating to a leaner tier, you can reduce your software burn by $${res.yearlySavings} annually without impacting developer velocity. We highly recommend this downgrade.`);
        } else {
          setAiSummary(`Your team's AI infrastructure spend is currently highly optimized. The ${parsedInput.plan} plan for ${parsedInput.tool} is exactly appropriate for your team size and use case. Keep monitoring as your team scales.`);
        }
      }, 1500);

    } catch (e) {
      navigate('/audit');
    }
  }, [navigate]);

  if (!result || !input) return <div className="p-20 text-center">Loading audit...</div>;

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, result, input })
      });
      
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Failed to send email. Ensure the backend is running and configured.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Your AI Spend Audit</h1>
        {result.monthlySavings > 0 ? (
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg font-medium border border-emerald-200">
            <TrendingDown className="w-5 h-5" />
            Optimization Found
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium border border-blue-200">
            <CheckCircle className="w-5 h-5" />
            Spend is Optimal
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm col-span-2">
          <h2 className="text-lg font-semibold mb-4 border-b border-slate-100 pb-2">The Breakdown</h2>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
              <div>
                <div className="text-sm text-slate-500 font-medium">Current Tool & Plan</div>
                <div className="text-lg font-bold text-slate-900">{input.tool} {input.plan}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500 font-medium">Current Spend</div>
                <div className="text-lg font-bold text-red-600">${result.currentSpend}/mo</div>
              </div>
            </div>

            <div className="border-l-4 border-amber-400 pl-4 py-1">
              <div className="text-sm font-semibold text-amber-800 mb-1 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Recommendation
              </div>
              <div className="text-slate-700">{result.reason}</div>
              <div className="font-medium text-slate-900 mt-2">{result.recommendedAction}</div>
            </div>
            
            <div className="bg-slate-900 p-5 rounded-xl text-white">
              <div className="text-slate-400 text-sm mb-2">AI Summary</div>
              <div className="leading-relaxed">{aiSummary}</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-500 text-white p-6 rounded-2xl shadow-sm text-center">
            <div className="text-emerald-100 font-medium mb-1">Total Yearly Savings</div>
            <div className="text-5xl font-extrabold mb-2">${result.yearlySavings}</div>
            <div className="text-emerald-100">(${result.monthlySavings} per month)</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 mb-1">Report Saved</h3>
                <p className="text-sm text-slate-600 mb-4">We've sent a detailed copy to your email.</p>
                <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-500 break-all font-mono">
                  audit-app.com/report/abc123xyz
                </div>
              </div>
            ) : (
              <form onSubmit={handleCapture}>
                <h3 className="font-bold text-slate-900 mb-2">Want the detailed report?</h3>
                <p className="text-sm text-slate-600 mb-4">Get the full breakdown and a shareable link for your finance team.</p>
                <div className="relative mb-3">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="founder@startup.com" 
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Get My Report'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
