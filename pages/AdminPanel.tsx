
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Users, BarChart3, Settings, Globe, Database, 
  Search, Bell, LogOut, ChevronRight, Activity, Zap, 
  Trash2, Edit, CheckCircle, XCircle, AlertTriangle,
  Monitor, Layout, Layers, Box, Terminal, Lock, Stars, X
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
  { id: '6', name: 'Louis Litt', email: 'louis@litt.com', role: 'Partner', status: 'Active', lastActive: '5 mins ago' },
  { id: '7', name: 'Rachel Zane', email: 'rachel@zane.io', role: 'Free', status: 'Active', lastActive: '10 mins ago' },
  { id: '8', name: 'Donna Paulsen', email: 'donna@specterlitt.com', role: 'Enterprise', status: 'Active', lastActive: '8 mins ago' },
  { id: '9', name: 'Harvey Specter', email: 'harvey@specter.com', role: 'Owner', status: 'Active', lastActive: '1 min ago' },
  { id: '10', name: 'Siddharth Rao', email: 'sr9723612@gmail.com', role: 'Super Admin', status: 'Active', lastActive: 'Now' },
];

const AdminPanel: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'crm' | 'settings' | 'logs'>('overview');
    const [admin, setAdmin] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const filteredUsers = MOCK_USERS.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [settings, setSettings] = useState([
        { id: '2fa', label: 'Two-Factor Auth', desc: 'Enforce 2FA for all admin roles', active: true },
        { id: 'rate', label: 'API Rate Limiting', desc: 'Protect system from spam/bot traffic', active: true },
        { id: 'geo', label: 'Geo-IP Blocking', desc: 'Restricted high-risk country access', active: false },
    ]);

    const toggleSetting = (id: string) => {
        setSettings(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
    };

    const [logEntries, setLogEntries] = useState([
        { t: '10:42:01', l: 'INFO', m: 'Inbound request to /api/v1/auth/validate from 192.168.1.1', c: 'text-blue-400' },
        { t: '10:42:04', l: 'WARN', m: 'High memory usage detected on Web Server Cluster B (84%)', c: 'text-yellow-400' },
        { t: '10:42:05', l: 'ERROR', m: 'CORS policy violation on domain: unknown-host.xyz', c: 'text-red-400 font-bold' },
        { t: '10:42:10', l: 'INFO', m: 'User jessica@pearson.law initiated secure session', c: 'text-green-400' },
        { t: '10:42:15', l: 'TRACE', m: 'Database query executed in 12ms: SELECT * FROM deals WHERE status = "pending"', c: 'text-slate-500' },
        { t: '10:42:20', l: 'INFO', m: 'SRX AI Engine: Analyzing traffic patterns for anomaly detection...', c: 'text-indigo-400 animate-pulse' },
        { t: '10:42:25', l: 'DEBUG', m: 'GC cleanup finished. Reclaimed 1.4GB heap memory', c: 'text-slate-500' },
        { t: '10:42:30', l: 'CRIT', m: 'DDoS mitigation shield activated for AP-South-1', c: 'text-red-500 font-black underline' },
        { t: '10:42:32', l: 'INFO', m: 'Automatic system backup completed successfully to S3 Storage', c: 'text-green-400' },
        { t: '10:42:35', l: 'WARN', m: 'Payment Gateway (Stripe) reported latency increase: +400ms', c: 'text-yellow-400' },
    ]);

    const [command, setCommand] = useState('');
    const handleCommand = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && command.trim()) {
            const newLog = {
                t: new Date().toLocaleTimeString([], { hour12: false }),
                l: 'ROOT',
                m: `Executed command successfully: ${command}`,
                c: 'text-green-400 font-bold'
            };
            setLogEntries(prev => [...prev, newLog]);
            setCommand('');
        }
    };

    const [isExporting, setIsExporting] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiInsight, setAiInsight] = useState<string | null>(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.email !== 'sr9723612@gmail.com') {
            navigate('/dashboard');
        }
        setAdmin(user);
    }, [navigate]);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            setIsExporting(false);
            alert('Platform Performance Report (PDF) has been generated and is ready for download.');
        }, 2000);
    };

    const handleAiInsight = () => {
        setIsAnalyzing(true);
        setAiInsight(null);
        setTimeout(() => {
            setIsAnalyzing(false);
            setAiInsight("SrxAI Analysis: User growth is up 12% this week, primarily driven by the new AI Chat feature. Retention for 'Enterprise' users remains at 98%, however, 'Free' tier API usage is hitting upper limits in AP-South-1 region. Recommendation: Upgrade cluster capacity in Mumbai.");
        }, 3000);
    };

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
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${
                                activeTab === item.id 
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <item.icon size={18} className={`${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
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
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
                    <div className="flex items-center gap-4 bg-slate-100 rounded-xl px-4 py-2 w-96 group focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                        <Search size={18} className={isSearching ? "text-indigo-600 animate-pulse" : "text-slate-400"} />
                        <input 
                            type="text" 
                            placeholder="Search records, logs, or users..." 
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setIsSearching(true);
                                setTimeout(() => setIsSearching(false), 500);
                            }}
                            className="bg-transparent border-none outline-none text-sm w-full text-slate-600"
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={() => alert('No new notifications for Super Admin.')}
                            className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors active:scale-95"
                        >
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
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-end">
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <h2 className="text-3xl font-black tracking-tight text-slate-900">System Overview</h2>
                                        <p className="text-slate-500 mt-1">Real-time health indicators and performance metrics.</p>
                                    </motion.div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={handleExport}
                                            disabled={isExporting}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-2 ${
                                                isExporting ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                                            }`}
                                        >
                                            {isExporting ? <Activity size={14} className="animate-spin" /> : null}
                                            {isExporting ? 'Exporting...' : 'Export Report'}
                                        </button>
                                        <button 
                                            onClick={handleAiInsight}
                                            disabled={isAnalyzing}
                                            className={`px-4 py-2 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 transition-all flex items-center gap-2 active:scale-95 ${
                                                isAnalyzing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600'
                                            }`}
                                        >
                                            <Zap size={14} className={isAnalyzing ? 'animate-bounce' : 'animate-pulse'} /> 
                                            {isAnalyzing ? 'Analyzing Trends...' : 'Generate AI Insight'}
                                        </button>
                                    </div>
                                </div>

                                {aiInsight && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="bg-indigo-600 text-white p-6 rounded-3xl shadow-xl shadow-indigo-600/20 flex items-start gap-6 relative overflow-hidden"
                                    >
                                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                            <Stars size={24} className="text-yellow-300" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-black text-lg mb-2">Smart Analysis Results</h4>
                                            <p className="text-sm text-indigo-50 leading-relaxed font-medium">{aiInsight}</p>
                                        </div>
                                        <button 
                                            onClick={() => setAiInsight(null)}
                                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </motion.div>
                                )}


                                <div className="space-y-6">
                                    {/* Stats Grid */}
                                    <motion.div 
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: { opacity: 0 },
                                            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
                                        }}
                                    >
                                        {[
                                            { label: 'Platform Revenue', value: '$124.5k', change: '+12.5%', icon: BarChart3, color: 'indigo' },
                                            { label: 'Active Sessions', value: '1,429', change: '+8.2%', icon: Activity, color: 'green' },
                                            { label: 'API Calls / min', value: '42.8k', change: '-2.4%', icon: Zap, color: 'orange' },
                                            { label: 'Security Threats', value: '0', change: 'Stable', icon: Shield, color: 'blue' },
                                        ].map((stat, i) => (
                                            <motion.div 
                                                key={i} 
                                                variants={{
                                                    hidden: { opacity: 0, y: 20 },
                                                    visible: { opacity: 1, y: 0 }
                                                }}
                                                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                                        <stat.icon size={22} />
                                                    </div>
                                                    <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-500 bg-green-50' : stat.change === 'Stable' ? 'text-blue-500 bg-blue-50' : 'text-red-500 bg-red-50'} px-2.5 py-1 rounded-full`}>
                                                        {stat.change}
                                                    </span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                                                <h4 className="text-2xl font-black text-slate-900">{stat.value}</h4>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Main Chart */}
                                    <motion.div 
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
                                    >
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
                                    </motion.div>

                                    {/* System Health */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-[#0f172a] p-8 rounded-3xl text-white shadow-2xl"
                                    >
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
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${server.load}%` }}
                                                            transition={{ duration: 1, delay: 0.6 + (i * 0.1) }}
                                                            className={`h-full rounded-full ${server.color}`}
                                                        ></motion.div>
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
                                            <p className="text-xs text-slate-400 leading-relaxed italic">"System-wide encryption is active. AI-driven threat detection processed 1.2M packets in last 10s."</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                        )}

                        {activeTab === 'users' && (
                            <motion.div 
                                key="users"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight text-slate-900">User Management</h2>
                                        <p className="text-slate-500 mt-1">Audit, modify, and manage platform participants.</p>
                                    </div>
                                    <button 
                                        onClick={() => alert('New administrative account onboarding initiated.')}
                                        className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        <PlusIcon size={18} /> Add Administrator
                                    </button>
                                </div>

                                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
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
                                            {filteredUsers.length > 0 ? filteredUsers.map((user, i) => (
                                                <motion.tr 
                                                    key={user.id} 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="hover:bg-slate-50 transition-colors group"
                                                >
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center font-bold text-indigo-600">
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
                                                            user.role === 'Enterprise' || user.role === 'Super Admin' ? 'bg-purple-100 text-purple-700' :
                                                            user.role === 'Premium' || user.role === 'Owner' ? 'bg-indigo-100 text-indigo-700' :
                                                            'bg-slate-100 text-slate-700'
                                                        }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-1.5">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></div>
                                                            <span className="text-sm font-bold text-slate-700">{user.status}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-sm text-slate-500 font-medium">
                                                        {user.lastActive}
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => alert(`Editing user: ${user.name}`)}
                                                                className="p-2 hover:bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-indigo-600 transition-all shadow-sm"
                                                            >
                                                                <Edit size={16} />
                                                            </button>
                                                            <button 
                                                                onClick={() => confirm(`Are you sure you want to delete ${user.name}?`) && alert('User deleted (Simulated)')}
                                                                className="p-2 hover:bg-white rounded-lg border border-slate-200 text-slate-400 hover:text-red-500 transition-all shadow-sm"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold italic">
                                                        No users found matching "{searchTerm}"
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'crm' && (
                            <motion.div 
                                key="crm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight text-slate-900">CRM Master Database</h2>
                                        <p className="text-slate-500 mt-1">Direct access to sales funnels, deals, and lead generation data.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => alert('Lead filters updated.')}
                                            className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                                        >
                                            Lead Filters
                                        </button>
                                        <button 
                                            onClick={() => alert('Creating new marketing campaign...')}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 transition-all active:scale-95"
                                        >
                                            New Campaign
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { label: 'Total Leads', value: '24,812', trend: '+15.2%', sub: 'Last 30 days' },
                                        { label: 'Conversion Rate', value: '18.4%', trend: '+2.1%', sub: 'Target: 20%' },
                                        { label: 'Pipeline Value', value: '$8.4M', trend: '+$1.2M', sub: 'Projected Q4' },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                                            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform">
                                                <Database size={120} />
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                            <div className="flex items-baseline gap-3 mt-2">
                                                <h3 className="text-3xl font-black">{stat.value}</h3>
                                                <span className="text-xs font-bold text-green-500">{stat.trend}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-1 font-bold italic">{stat.sub}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
                                    <h3 className="font-black text-xl mb-6">Recent Deal Activity</h3>
                                <div className="space-y-4">
                                         {[
                                             { company: 'Global Logistics Inc.', value: '$45,000', stage: 'Negotiation', color: 'bg-indigo-500' },
                                             { company: 'Urban Styles Retail', value: '$12,800', stage: 'Closed Won', color: 'bg-green-500' },
                                             { company: 'Starlight Media', value: '$84,000', stage: 'Prospecting', color: 'bg-blue-500' },
                                             { company: 'Nexus Group', value: '$5,200', stage: 'Proposal', color: 'bg-yellow-500' },
                                         ].map((deal, i) => (
                                             <div 
                                                 key={i} 
                                                 onClick={() => alert(`Drilling down into ${deal.company} pipeline data...`)}
                                                 className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer group active:scale-[0.99]"
                                             >
                                                 <div className="flex items-center gap-4">
                                                     <div className={`w-10 h-10 rounded-xl ${deal.color} flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform`}>
                                                         {deal.company[0]}
                                                     </div>
                                                     <div>
                                                         <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase text-sm tracking-tight">{deal.company}</h4>
                                                         <p className="text-xs font-bold text-slate-500">{deal.value} • {deal.stage}</p>
                                                     </div>
                                                 </div>
                                                 <ChevronRight size={20} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                             </div>
                                         ))}
                                     </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'logs' && (
                            <motion.div 
                                key="logs"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="space-y-8 h-full"
                            >
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight text-slate-900">System Logs</h2>
                                        <p className="text-slate-500 mt-1">Live telemetry and event tracking across all microservices.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => alert('Log stream cleared.')}
                                            className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-100 transition-all active:scale-95"
                                        >
                                            Clear Stream
                                        </button>
                                        <button 
                                            onClick={() => alert('Telemetry paused.')}
                                            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-black/20 active:scale-95"
                                        >
                                            Pause Real-time
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] rounded-3xl p-6 font-mono text-sm overflow-hidden shadow-2xl border border-white/10 h-[500px] flex flex-col">
                                    <div className="flex items-center gap-2 mb-4 p-2 border-b border-white/5">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                                        </div>
                                        <span className="text-slate-500 ml-4 text-[10px] font-bold uppercase tracking-widest">system@admin-panel: ~/telemetry</span>
                                    </div>
                                    <div className="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar pr-2 leading-relaxed">
                                        {logEntries.map((log, i) => (
                                            <motion.div 
                                                key={i} 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex gap-4 group"
                                            >
                                                <span className="text-slate-500 select-none">{log.t}</span>
                                                <span className={`${log.c} w-16`}>[{log.l}]</span>
                                                <span className="text-slate-300 group-hover:text-white transition-colors">{log.m}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2">
                                        <span className="text-indigo-400 font-bold">$</span>
                                        <input 
                                            type="text" 
                                            value={command}
                                            onChange={(e) => setCommand(e.target.value)}
                                            onKeyDown={handleCommand}
                                            className="bg-transparent border-none outline-none text-slate-300 w-full" 
                                            placeholder="Execute remote command..." 
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div 
                                key="settings"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight text-slate-900">Platform Settings</h2>
                                        <p className="text-slate-500 mt-1">Configure global application behavior and security protocols.</p>
                                    </div>
                                    <button 
                                        onClick={() => alert('Global platform settings saved successfully.')}
                                        className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Save Changes
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                <Lock size={18} className="text-indigo-600" /> Security Controls
                                            </h3>
                                            <div className="space-y-6">
                                                {settings.map((opt) => (
                                                    <div key={opt.id} className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-800">{opt.label}</p>
                                                            <p className="text-xs text-slate-500">{opt.desc}</p>
                                                        </div>
                                                        <div 
                                                            onClick={() => toggleSetting(opt.id)}
                                                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300 active:scale-95 ${opt.active ? 'bg-indigo-600' : 'bg-slate-200'}`}
                                                        >
                                                            <motion.div 
                                                                layout
                                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm ${opt.active ? 'left-7' : 'left-1'}`}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                <Bell size={18} className="text-indigo-600" /> Notifications
                                            </h3>
                                            <div className="space-y-4">
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Alerts</p>
                                                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20">
                                                    <option>Immediate (Critical Only)</option>
                                                    <option>Daily Digest (All events)</option>
                                                    <option>Weekly Report</option>
                                                    <option>Disabled</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                <Layers size={18} className="text-indigo-600" /> branding & UI
                                            </h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Platform Primary Color</label>
                                                    <div className="flex gap-4">
                                                        {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444'].map(c => (
                                                            <div key={c} className="w-8 h-8 rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-sm border-2 border-white" style={{ backgroundColor: c }}></div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="pt-4">
                                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Internal Project Name</label>
                                                    <input type="text" placeholder="SRX HUB MASTER" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
                                            <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                                <Activity size={100} />
                                            </div>
                                            <h4 className="text-xl font-black mb-2 leading-tight">Advanced Platform Analytics</h4>
                                            <p className="text-indigo-100 text-xs mb-6 max-w-[200px]">Upgrade to Enterprise Plus for deeper user heatmaps and predictive churn modeling.</p>
                                            <button 
                                                onClick={() => window.open('https://ais-dev-yavm5lzurrwhyymp65wqji-714933679563.asia-east1.run.app/enterprise', '_blank')}
                                                className="px-6 py-2 bg-white text-indigo-600 rounded-xl text-xs font-black shadow-lg hover:scale-105 active:scale-95 transition-all"
                                            >
                                                Go Enterprise
                                            </button>
                                        </div>
                                    </div>
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
