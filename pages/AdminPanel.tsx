
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Users, BarChart3, Settings, Globe, Database, 
  Search, Bell, LogOut, ChevronRight, Activity, Zap, 
  Trash2, Edit, CheckCircle, XCircle, AlertTriangle,
  Monitor, Layout, Layers, Box, Terminal, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Mock Data
const MOCK_REVENUE_DATA = [
  { day: 'Mon', rev: 4500, users: 120 },
  { day: 'Tue', rev: 5200, users: 150 },
  { day: 'Wed', rev: 4800, users: 140 },
  { day: 'Thu', rev: 6100, users: 190 },
  { day: 'Fri', rev: 5900, users: 180 },
  { day: 'Sat', rev: 7200, users: 240 },
  { day: 'Sun', rev: 6800, users: 210 },
];

const MOCK_USERS = [
  { id: '1', name: 'Arun Jeeraraj', email: 'arun@example.com', role: 'Premium', status: 'Active', lastActive: '2 mins ago' },
  { id: '2', name: 'Sarah Jenkins', email: 's.jenkins@startech.io', role: 'Enterprise', status: 'Active', lastActive: '15 mins ago' },
  { id: '3', name: 'Mike Ross', email: 'mike@greenleaf.com', role: 'Free', status: 'Inactive', lastActive: '2 days ago' },
  { id: '4', name: 'Priya Sharma', email: 'priya@urbanstyles.in', role: 'Business', status: 'Active', lastActive: '1 hour ago' },
  { id: '5', name: 'Jessica Pearson', email: 'jessica@pearson.law', role: 'Enterprise', status: 'Active', lastActive: 'Just now' },
];

const AdminPanel: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'crm' | 'settings' | 'logs'>('overview');
    const [admin, setAdmin] = useState<any>(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.email !== 'sr9723612@gmail.com') {
            navigate('/dashboard');
        }
        setAdmin(user);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    if (!admin) return null;

    return (
        <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-72 bg-[#0f172a] text-white flex flex-col shrink-0">
                <div className="p-8 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <Shield size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="font-black text-xl tracking-tight">ADMIN PRO</h1>
                            <p className="text-xs text-indigo-400 font-bold tracking-widest uppercase">Platform Control</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-6 space-y-2">
                    {[
                        { id: 'overview', icon: Layout, label: 'Overview' },
                        { id: 'users', icon: Users, label: 'User Management' },
                        { id: 'crm', icon: Database, label: 'CRM Database' },
                        { id: 'logs', icon: Terminal, label: 'System Logs' },
                        { id: 'settings', icon: Settings, label: 'Configuration' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                activeTab === item.id 
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-6">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Logged in as</p>
                        <p className="text-sm font-bold truncate">{admin.email}</p>
                        <button 
                            onClick={handleLogout}
                            className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold"
                        >
                            <LogOut size={14} /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
                    <div className="flex items-center gap-4 bg-slate-100 rounded-xl px-4 py-2 w-96">
                        <Search size={18} className="text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search records, logs, or users..." 
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-600"
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-black">Sr9723612</p>
                                <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">Super Admin</p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white font-bold">
                                SR
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-10">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight text-slate-900">System Overview</h2>
                                        <p className="text-slate-500 mt-1">Real-time health indicators and performance metrics.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all">Export Report</button>
                                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 transition-all">Generate AI Insight</button>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { label: 'Platform Revenue', value: '$124.5k', change: '+12.5%', icon: BarChart3, color: 'indigo' },
                                        { label: 'Active Sessions', value: '1,429', change: '+8.2%', icon: Activity, color: 'green' },
                                        { label: 'API Calls / min', value: '42.8k', change: '-2.4%', icon: Zap, color: 'orange' },
                                        { label: 'Security Threats', value: '0', change: 'Stable', icon: Shield, color: 'blue' },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                                    <stat.icon size={22} />
                                                </div>
                                                <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'} px-2.5 py-1 rounded-full`}>
                                                    {stat.change}
                                                </span>
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                                            <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Main Chart */}
                                    <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                                        <div className="flex justify-between items-center mb-8">
                                            <h3 className="font-bold text-lg flex items-center gap-2">
                                                <Monitor size={20} className="text-indigo-600" /> Platform Usage & Revenue
                                            </h3>
                                            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                                                <button className="px-3 py-1 bg-white text-indigo-600 rounded-md text-xs font-bold shadow-sm">Revenue</button>
                                                <button className="px-3 py-1 text-slate-500 rounded-md text-xs font-bold">Traffic</button>
                                            </div>
                                        </div>
                                        <div className="h-[350px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={MOCK_REVENUE_DATA}>
                                                    <defs>
                                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                                                    <Tooltip 
                                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                                    />
                                                    <Area type="monotone" dataKey="rev" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    {/* System Health */}
                                    <div className="bg-[#0f172a] p-8 rounded-3xl text-white">
                                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                            <Zap size={20} className="text-yellow-400" /> Server Clusters
                                        </h3>
                                        <div className="space-y-6">
                                            {[
                                                { name: 'AP-South-1 (Mumbai)', status: 'Optimal', load: 42, color: 'bg-green-500' },
                                                { name: 'US-East-1 (Virginia)', status: 'Healthy', load: 68, color: 'bg-yellow-500' },
                                                { name: 'EU-West-1 (Dublin)', status: 'Optimal', load: 31, color: 'bg-green-500' },
                                            ].map((server, i) => (
                                                <div key={i} className="space-y-2">
                                                    <div className="flex justify-between items-center text-xs">
                                                        <span className="font-bold text-slate-400">{server.name}</span>
                                                        <span className={`flex items-center gap-1 font-black ${server.load > 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${server.color}`}></div>
                                                            {server.status}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${server.color}`} style={{ width: `${server.load}%` }}></div>
                                                    </div>
                                                    <p className="text-[10px] text-slate-500 text-right">{server.load}% CPU Load</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Shield size={16} className="text-indigo-400" />
                                                <span className="text-xs font-black uppercase tracking-widest">Active Guard</span>
                                            </div>
                                            <p className="text-xs text-slate-400 leading-relaxed">System-wide encryption is active. AI-driven threat detection processed 12k packets in last 10s.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'users' && (
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight text-slate-900">User Management</h2>
                                        <p className="text-slate-500 mt-1">Audit, modify, and manage platform participants.</p>
                                    </div>
                                    <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 transition-all flex items-center gap-2">
                                        <PlusIcon size={18} /> Add Administrator
                                    </button>
                                </div>

                                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-200">
                                                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Identity</th>
                                                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Tier</th>
                                                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Status</th>
                                                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Last Activity</th>
                                                <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {MOCK_USERS.map((user) => (
                                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-indigo-600">
                                                                {user.name.split(' ').map(n => n[0]).join('')}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-slate-900">{user.name}</p>
                                                                <p className="text-xs text-slate-500">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                                            user.role === 'Enterprise' ? 'bg-purple-100 text-purple-700' :
                                                            user.role === 'Premium' ? 'bg-indigo-100 text-indigo-700' :
                                                            'bg-slate-100 text-slate-700'
                                                        }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                                                            <span className="text-sm font-bold text-slate-700">{user.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                                                        {user.lastActive}
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="p-2 hover:bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                                                                <Edit size={16} />
                                                            </button>
                                                            <button className="p-2 hover:bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 transition-all shadow-sm">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

const PlusIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export default AdminPanel;
