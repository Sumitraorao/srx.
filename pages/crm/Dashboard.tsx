import React from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles,
  Search,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts';

import { useNavigate, useOutletContext } from 'react-router-dom';

const REVENUE_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const TEAM_PERFORMANCE = [
  { name: 'Sameer Raj', role: 'Sales Lead', revenue: '$42k', deals: 12, avatar: 'SR', color: 'bg-blue-500' },
  { name: 'Anjali Sharma', role: 'Account Executive', revenue: '$38k', deals: 9, avatar: 'AS', color: 'bg-green-500' },
  { name: 'Rahul Varma', role: 'Business Dev', revenue: '$31k', deals: 15, avatar: 'RV', color: 'bg-purple-500' },
  { name: 'Priya Singh', role: 'Sales rep', revenue: '$28k', deals: 8, avatar: 'PS', color: 'bg-amber-500' },
];

const KPI_CARDS = [
  { label: 'Total Revenue', value: '$128,430', change: '+12.5%', trend: 'up', icon: DollarSign },
  { label: 'Active Leads', value: '1,240', change: '+18.2%', trend: 'up', icon: Users },
  { label: 'Conversion Rate', value: '3.2%', change: '-0.4%', trend: 'down', icon: TrendingUp },
];

export const CrmDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAiModalOpen } = useOutletContext<{ setIsAiModalOpen: (o: boolean) => void }>();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sales Overview</h1>
           <p className="text-slate-500 text-sm">Welcome back, Srx Admin. Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
            <button 
              onClick={() => alert('Exporting report as PDF...')}
              className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
                Download Report
            </button>
            <button 
              onClick={() => navigate('/app/crm/leads')}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
            >
                Manage Pipeline
            </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {KPI_CARDS.map((card, idx) => (
          <motion.div 
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white border border-slate-200 p-6 rounded-2xl group hover:border-blue-500/30 transition-all cursor-default shadow-sm"
          >
             <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <card.icon className="w-5 h-5" />
                </div>
                <div className={cn(
                    "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
                    card.trend === 'up' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                    {card.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {card.change}
                </div>
             </div>
             <div>
                <p className="text-slate-500 text-xs font-medium mb-1">{card.label}</p>
                <p className="text-2xl font-black text-slate-900">{card.value}</p>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Charts & Team */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-slate-900">Revenue Growth</h3>
                <select className="bg-slate-50 border border-slate-200 text-[10px] uppercase tracking-widest font-bold text-slate-500 rounded-lg py-1 px-2 focus:ring-2 ring-blue-500/20 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                </select>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_DATA}>
                       <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                             <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                       <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
                       <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#0f172a', fontSize: '12px' }}
                       />
                       <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Top Sales Reps</h3>
                <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">View All</button>
            </div>
            <div className="space-y-5">
                {TEAM_PERFORMANCE.map((user, idx) => (
                    <div key={user.name} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md", user.color)}>
                                {user.avatar}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</p>
                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tight">{user.role}</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className="text-sm font-black text-slate-900">{user.revenue}</p>
                             <p className="text-[10px] text-slate-500">{user.deals} deals</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center gap-2">
                 <TrendingUp className="w-4 h-4" /> TEAM LEADERBOARD
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Insight Sidebar */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-3xl p-8 relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 p-4">
                <Sparkles className="w-8 h-8 text-blue-500/10 group-hover:scale-125 transition-transform duration-700" />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                 <Sparkles className="w-4 h-4 text-blue-500" />
                 SrxAI Insights
            </h3>
            
            <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-blue-500/30 transition-all cursor-pointer">
                    <p className="text-xs text-blue-600 font-bold mb-1">Conversion Alert</p>
                    <p className="text-sm text-slate-600 leading-relaxed">Three leads from <span className="text-slate-900 font-bold">Initech Corp</span> have high intent signals. Recommend immediate follow-up.</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-purple-500/30 transition-all cursor-pointer">
                    <p className="text-xs text-purple-600 font-bold mb-1">Risk Detection</p>
                    <p className="text-sm text-slate-600 leading-relaxed">The <span className="text-slate-900 font-bold">$42k Acrue Deal</span> has been stagnant for 12 days. Probability decreased by 15%.</p>
                </div>
            </div>

            <button 
                onClick={() => setIsAiModalOpen(true)}
                className="mt-8 w-full bg-slate-900 text-white text-xs font-black py-3 rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
            >
                CHAT WITH ASSISTANT
            </button>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-slate-900">Recent Activity</h3>
                  <button className="text-xs text-blue-600 font-bold hover:underline">View All Tasks</button>
             </div>
             <div className="space-y-6">
                {[
                    { user: 'Sameer Raj', action: 'closed the Enterprise deal', time: '12 mins ago' },
                    { user: 'Rahul Varma', action: 'added 5 new lead contacts', time: '1 hour ago' },
                    { user: 'Anjali Sharma', action: 'scheduled a demo with Tesla', time: '3 hours ago' },
                    { user: 'Priya Singh', action: 'sent 12 proposals today', time: '5 hours ago' },
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all overflow-hidden border border-slate-100">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    <span className="text-blue-600 hover:underline cursor-pointer">{item.user}</span> {item.action}
                                </p>
                                <p className="text-xs text-slate-500 font-medium">{item.time}</p>
                            </div>
                        </div>
                        <button className="text-slate-400 hover:text-slate-900 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
};

// Simple utility if not imported
function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
