import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SpendForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tool: 'ChatGPT',
    plan: 'Team',
    spend: '',
    users: '2',
    useCase: 'Coding'
  });

  useEffect(() => {
    const saved = localStorage.getItem('auditFormData');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const newData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newData);
    localStorage.setItem('auditFormData', JSON.stringify(newData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.spend || isNaN(Number(formData.spend))) {
      alert("Please enter a valid monthly spend.");
      return;
    }
    navigate('/results');
  };

  const tools = ['ChatGPT', 'Claude', 'Cursor', 'Copilot', 'Gemini'];
  const plans: Record<string, string[]> = {
    'ChatGPT': ['Plus', 'Team', 'Enterprise'],
    'Claude': ['Pro', 'Team'],
    'Cursor': ['Pro', 'Business'],
    'Copilot': ['Individual', 'Business', 'Enterprise'],
    'Gemini': ['Advanced']
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">What are you currently paying for?</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tool</label>
          <select name="tool" value={formData.tool} onChange={handleChange} className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2.5 bg-slate-50">
            {tools.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Current Plan</label>
          <select name="plan" value={formData.plan} onChange={handleChange} className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2.5 bg-slate-50">
            {plans[formData.tool]?.map(p => <option key={p} value={p}>{p}</option>) || <option value="Standard">Standard</option>}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Spend ($)</label>
            <input type="number" name="spend" value={formData.spend} onChange={handleChange} placeholder="e.g. 120" className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2.5 bg-slate-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Number of Users</label>
            <input type="number" name="users" value={formData.users} onChange={handleChange} min="1" className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2.5 bg-slate-50" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Primary Use Case</label>
          <select name="useCase" value={formData.useCase} onChange={handleChange} className="w-full border-slate-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2.5 bg-slate-50">
            <option value="Coding">Coding</option>
            <option value="Writing">Writing</option>
            <option value="Data">Data Analysis</option>
            <option value="Research">Research</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-slate-900 text-white font-medium py-3 rounded-xl hover:bg-slate-800 transition-colors mt-4">
          Calculate Savings
        </button>
      </form>
    </div>
  );
}
