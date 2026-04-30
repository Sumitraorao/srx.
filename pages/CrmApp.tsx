
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Search, Plus, Filter, MoreHorizontal, 
  ChevronDown, Phone, Mail, MapPin, Calendar,
  ArrowUpRight, Clock, CheckCircle2, Home,
  LayoutGrid, BarChart3, Settings, Bell, HelpCircle,
  X, UserPlus, Briefcase, DollarSign, TrendingUp,
  PieChart as PieChartIcon, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { getLeadStatusData, getMonthlyRevenue, getDealStages } from '../services/crmService';

const INITIAL_LEADS = [
  { id: 1, name: 'John Doe', company: 'TechCorp', email: 'john@techcorp.com', status: 'New', value: '$12,000', source: 'Website', date: '2024-03-24' },
  { id: 2, name: 'Jane Smith', company: 'Global Solutions', email: 'jane@globalsol.com', status: 'In Contact', value: '$8,500', source: 'Referral', date: '2024-03-23' },
  { id: 3, name: 'Robert Brown', company: 'Innovative Inc', email: 'robert@innovative.com', status: 'Qualified', value: '$25,000', source: 'LinkedIn', date: '2024-03-22' },
  { id: 4, name: 'Alice Wilson', company: 'DataFlow', email: 'alice@dataflow.io', status: 'Proposal Sent', value: '$5,000', source: 'Cold Call', date: '2024-03-21' },
  { id: 5, name: 'Michael Chen', company: 'Zenith Logistics', email: 'mchen@zenith.com', status: 'Negotiation', value: '$45,000', source: 'Website', date: '2024-03-20' },
];

const INITIAL_CONTACTS = [
    { id: 101, name: 'Sarah Miller', account: 'TechCorp', email: 'smiller@techcorp.com', phone: '+1 555-0101', title: 'VP Engineering' },
    { id: 102, name: 'David Jones', account: 'Global Solutions', email: 'djones@globalsol.com', phone: '+1 555-0102', title: 'CEO' },
];

const INITIAL_ACCOUNTS = [
    { id: 201, name: 'TechCorp', industry: 'Software', website: 'techcorp.com', location: 'California' },
    { id: 202, name: 'Global Solutions', industry: 'Consulting', website: 'globalsol.com', location: 'New York' },
];

const INITIAL_DEALS = [
    { id: 301, name: 'TechCorp Cloud Migration', account: 'TechCorp', stage: 'Negotiation', value: '$120,000', closingDate: '2024-06-15' },
    { id: 302, name: 'Global Solutions Expansion', account: 'Global Solutions', stage: 'Proposal', value: '$45,000', closingDate: '2024-05-10' },
];

const CrmApp = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeModule, setActiveModule] = useState('Leads');
    const [leads, setLeads] = useState(INITIAL_LEADS);
    const [contacts, setContacts] = useState(INITIAL_CONTACTS);
    const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
    const [deals, setDeals] = useState(INITIAL_DEALS);
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        account: '',
        email: '',
        status: 'New',
        value: '',
        stage: 'Qualification',
        source: 'Website'
    });

    const modules = ['Home', 'Leads', 'Contacts', 'Accounts', 'Deals', 'Tasks', 'Reports'];

    const filteredData = useMemo(() => {
        const term = searchTerm.toLowerCase();
        if (activeModule === 'Leads') return leads.filter(l => l.name.toLowerCase().includes(term) || l.company.toLowerCase().includes(term));
        if (activeModule === 'Contacts') return contacts.filter(c => c.name.toLowerCase().includes(term) || c.account.toLowerCase().includes(term));
        if (activeModule === 'Accounts') return accounts.filter(a => a.name.toLowerCase().includes(term));
        if (activeModule === 'Deals') return deals.filter(d => d.name.toLowerCase().includes(term) || d.account.toLowerCase().includes(term));
        if (activeModule === 'Tasks') return [
            { id: 1, name: 'Follow up with TechCorp', company: 'TechCorp', status: 'Pending', value: 'High' },
            { id: 2, name: 'Send proposal to Jane', company: 'Global Solutions', status: 'Completed', value: 'Medium' }
        ].filter(t => t.name.toLowerCase().includes(term));
        return [];
    }, [leads, contacts, accounts, deals, searchTerm, activeModule]);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const id = Date.now();
        if (activeModule === 'Leads') setLeads([{ ...formData, id, date: new Date().toISOString().split('T')[0] } as any, ...leads]);
        if (activeModule === 'Contacts') setContacts([{ ...formData, id } as any, ...contacts]);
        if (activeModule === 'Accounts') setAccounts([{ ...formData, id } as any, ...accounts]);
        if (activeModule === 'Deals') setDeals([{ ...formData, id } as any, ...deals]);
        
        setIsCreateModalOpen(false);
        setFormData({ name: '', company: '', account: '', email: '', status: 'New', value: '', stage: 'Qualification', source: 'Website' });
    };

    return (
        <div className="flex flex-col h-screen bg-[#f5f7f9] font-sans">
            {/* Top Navigation - Zoho Style */}
            <header className="h-[60px] bg-[#0b162c] text-white flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-6">
                    <div 
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center font-black text-sm">S</div>
                        <span className="font-bold text-lg tracking-tight">SRX CRM</span>
                    </div>
                    
                    <nav className="hidden lg:flex items-center gap-1">
                        {modules.map((mod) => (
                            <button
                                key={mod}
                                onClick={() => setActiveModule(mod)}
                                className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                                    activeModule === mod 
                                    ? 'bg-white/10 text-white' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {mod}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Module Nav */}
                    <div className="lg:hidden flex items-center overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-xs">
                        <div className="flex items-center gap-1">
                            {modules.map((mod) => (
                                <button
                                    key={mod}
                                    onClick={() => setActiveModule(mod)}
                                    className={`px-3 py-1.5 text-xs font-bold rounded transition-colors whitespace-nowrap ${
                                        activeModule === mod 
                                        ? 'bg-white/10 text-white' 
                                        : 'text-gray-400'
                                    }`}
                                >
                                    {mod}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search in CRM..." 
                            className="bg-white/10 border-none rounded-md pl-10 pr-4 py-1.5 text-sm focus:ring-1 focus:ring-brand-red w-64 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                        <Plus 
                            onClick={() => setIsCreateModalOpen(true)}
                            className="cursor-pointer text-gray-400 hover:text-white" 
                            size={20} 
                        />
                        <Bell className="cursor-pointer text-gray-400 hover:text-white" size={20} />
                        <Settings className="cursor-pointer text-gray-400 hover:text-white" size={20} />
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold font-mono">JD</div>
                    </div>
                </div>
            </header>

            {/* Sub-header / Actions */}
            <div className="min-h-14 py-2 sm:h-14 bg-white border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 shrink-0 gap-3">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold text-gray-900">{activeModule}</h2>
                    <div className="h-4 w-[1px] bg-gray-300 hidden sm:block"></div>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-gray-900">
                        <span>All {activeModule}</span>
                        <ChevronDown size={14} />
                    </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <input 
                        type="file" 
                        id="crm-import" 
                        className="hidden" 
                        onChange={(e) => {
                            if (e.target.files?.length) {
                                alert(`Importing ${e.target.files[0].name}... (Simulated)`);
                            }
                        }}
                    />
                    <label 
                        htmlFor="crm-import"
                        className="flex-1 sm:flex-none px-4 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-center cursor-pointer"
                    >
                        Import
                    </label>
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex-[2] sm:flex-none px-4 py-1.5 bg-brand-red text-white rounded text-sm font-bold hover:bg-brand-dark-red transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                    >
                        <Plus size={16} /> <span className="hidden xs:inline">Create {activeModule.slice(0, -1)}</span>
                        <span className="xs:hidden">Create</span>
                    </button>
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden shrink-0">
                        <button 
                            onClick={() => {
                                if (activeModule === 'Reports') {
                                    setActiveModule('Leads'); // Default back to Leads if on Reports
                                }
                            }}
                            className={`p-1.5 ${activeModule !== 'Reports' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'} border-r border-gray-300`}
                            title="Table View"
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button 
                            onClick={() => setActiveModule('Reports')}
                            className={`p-1.5 ${activeModule === 'Reports' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:bg-gray-50'}`}
                            title="Reports View"
                        >
                            <BarChart3 size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto p-4 sm:p-6 pb-20 sm:pb-6">
                {(['Leads', 'Contacts', 'Accounts', 'Deals', 'Tasks'].includes(activeModule)) ? (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[700px] lg:min-w-0">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="w-12 px-4 py-3"><input type="checkbox" className="rounded" /></th>
                                    {activeModule === 'Leads' && (
                                        <>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Lead Name</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Revenue</th>
                                        </>
                                    )}
                                    {activeModule === 'Contacts' && (
                                        <>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Contact Name</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Account</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                                        </>
                                    )}
                                    {activeModule === 'Accounts' && (
                                        <>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Account Name</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Industry</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Website</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                                        </>
                                    )}
                                    {activeModule === 'Deals' && (
                                        <>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Deal Name</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Account</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Stage</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Value</th>
                                        </>
                                    )}
                                    {activeModule === 'Tasks' && (
                                        <>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Task Description</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Related To</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredData.map((item: any) => (
                                    <tr key={item.id} className="hover:bg-blue-50/40 transition-colors cursor-pointer group">
                                        <td className="px-4 py-4"><input type="checkbox" className="rounded" /></td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm font-bold text-brand-blue hover:underline">{item.name}</span>
                                        </td>
                                        {activeModule === 'Leads' && (
                                            <>
                                                <td className="px-4 py-4 text-sm text-gray-600 font-medium">{item.company}</td>
                                                <td className="px-4 py-4">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-gray-50 text-gray-600 border-gray-200">{item.status}</span>
                                                </td>
                                                <td className="px-4 py-4 text-sm font-bold text-gray-900 text-right">{item.value}</td>
                                            </>
                                        )}
                                        {activeModule === 'Contacts' && (
                                            <>
                                                <td className="px-4 py-4 text-sm text-gray-600">{item.account}</td>
                                                <td className="px-4 py-4 text-sm text-gray-500">{item.email}</td>
                                                <td className="px-4 py-4 text-sm text-gray-500">{item.phone}</td>
                                            </>
                                        )}
                                        {activeModule === 'Accounts' && (
                                            <>
                                                <td className="px-4 py-4 text-sm text-gray-600">{item.industry}</td>
                                                <td className="px-4 py-4 text-sm text-brand-blue">{item.website}</td>
                                                <td className="px-4 py-4 text-sm text-gray-500">{item.location}</td>
                                            </>
                                        )}
                                        {activeModule === 'Deals' && (
                                            <>
                                                <td className="px-4 py-4 text-sm text-gray-600">{item.account}</td>
                                                <td className="px-4 py-4 text-sm text-purple-600 font-medium">{item.stage}</td>
                                                <td className="px-4 py-4 text-sm font-bold text-gray-900 text-right">{item.value}</td>
                                            </>
                                        )}
                                        {activeModule === 'Tasks' && (
                                            <>
                                                <td className="px-4 py-4 text-sm text-gray-600">{item.company}</td>
                                                <td className="px-4 py-4 text-sm text-orange-600 font-bold">{item.value}</td>
                                                <td className="px-4 py-4 text-right">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.status === 'Completed' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-yellow-50 text-yellow-600 border-yellow-200'}`}>{item.status}</span>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-medium">Total: {filteredData.length} records</span>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border border-gray-300 rounded text-xs bg-white text-gray-600">Previous</button>
                                <button className="px-3 py-1 border border-gray-300 rounded text-xs bg-white text-gray-600">Next</button>
                            </div>
                        </div>
                    </div>
                ) : activeModule === 'Reports' || activeModule === 'Home' ? (
                    <div className="space-y-6">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { label: 'Total Revenue', value: '$1.2M', change: '+12.5%', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
                                { label: 'Active Leads', value: '458', change: '+8.2%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                                { label: 'Deals Closed', value: '84', change: '+24%', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
                                { label: 'Win Rate', value: '64%', change: '+3.1%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                            <stat.icon size={20} />
                                        </div>
                                        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                                    </div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{stat.label}</h4>
                                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Revenue Chart */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <Activity size={18} className="text-blue-600" /> Revenue vs Leads
                                    </h3>
                                    <select className="text-xs border-none bg-gray-50 rounded px-2 py-1 outline-none">
                                        <option>Last 6 Months</option>
                                        <option>Last Year</option>
                                    </select>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={getMonthlyRevenue()}>
                                            <defs>
                                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                            <Tooltip 
                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                            />
                                            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                            <Area type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={3} fillOpacity={0} />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Lead Status Distribution */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <PieChartIcon size={18} className="text-purple-600" /> Lead Pipeline
                                    </h3>
                                </div>
                                <div className="h-[300px] w-full flex items-center">
                                    <ResponsiveContainer width="60%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={getLeadStatusData()}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="count"
                                            >
                                                {getLeadStatusData().map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="w-[40%] space-y-3">
                                        {getLeadStatusData().map((item, i) => (
                                            <div key={i} className="flex flex-col">
                                                <div className="flex items-center justify-between text-xs mb-1">
                                                    <span className="text-gray-500 font-medium">{item.name}</span>
                                                    <span className="font-bold text-gray-900">{item.count}</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'][i % 5]}`} style={{ width: `${(item.count / 85) * 100}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Deals by Source */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <Filter size={18} className="text-blue-500" /> Deals by Source
                                    </h3>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={[
                                            { source: 'Website', value: 45 },
                                            { source: 'Referral', value: 32 },
                                            { source: 'LinkedIn', value: 28 },
                                            { source: 'Cold call', value: 15 },
                                            { source: 'Partner', value: 10 },
                                        ]} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} width={80} tick={{fontSize: 12, fill: '#64748b'}} />
                                            <Tooltip cursor={{fill: '#f8fafc'}} />
                                            <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={25} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Deal Value by Stage */}
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2 mb-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <BarChart3 size={18} className="text-orange-600" /> Deal Value by Stage
                                    </h3>
                                </div>
                                <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={getDealStages()}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                                            <Tooltip cursor={{fill: '#f8fafc'}} />
                                            <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
                                            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-white rounded-lg border border-gray-200 border-dashed">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                             <LayoutGrid size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">{activeModule} Dashboard</h3>
                        <p className="text-gray-500 mt-2 max-w-md mx-auto">
                            The {activeModule} module is being synced with your enterprise data. 
                            Features like automated workflows and smart assignments will be available shortly.
                        </p>
                        <button className="mt-8 px-6 py-2 bg-brand-dark text-white rounded font-bold hover:opacity-90 transition-opacity">
                            Config Module
                        </button>
                    </div>
                )
}
            </main>

            {/* Create Lead Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCreateModalOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-900">Create {activeModule.slice(0, -1)}</h3>
                                <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                            </div>
                            <form onSubmit={handleCreate} className="p-6 overflow-y-auto space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">{activeModule.slice(0, -1)} Name</label>
                                        <div className="relative">
                                            <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input 
                                                required
                                                type="text" 
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none" 
                                                placeholder="e.g. John Doe"
                                                value={formData.name}
                                                onChange={e => setFormData({...formData, name: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">{activeModule === 'Leads' ? 'Company' : 'Account'}</label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input 
                                                required
                                                type="text" 
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none" 
                                                placeholder="e.g. TechCorp"
                                                value={activeModule === 'Leads' ? formData.company : formData.account}
                                                onChange={e => setFormData({...formData, [activeModule === 'Leads' ? 'company' : 'account']: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                        <input 
                                            required
                                            type="email" 
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none" 
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Status / Stage</label>
                                        <select 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                                            value={activeModule === 'Leads' ? formData.status : formData.stage}
                                            onChange={e => setFormData({...formData, [activeModule === 'Leads' ? 'status' : 'stage']: e.target.value})}
                                        >
                                            {activeModule === 'Leads' ? (
                                                <>
                                                    <option>New</option>
                                                    <option>In Contact</option>
                                                    <option>Qualified</option>
                                                </>
                                            ) : (
                                                <>
                                                    <option>Qualification</option>
                                                    <option>Proposal</option>
                                                    <option>Negotiation</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Value / Revenue</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                            <input 
                                                type="text" 
                                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none" 
                                                placeholder="e.g. 50,000"
                                                value={formData.value}
                                                onChange={e => setFormData({...formData, value: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="flex-1 py-2.5 border border-gray-200 rounded-lg font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 py-2.5 bg-brand-red text-white rounded-lg font-bold hover:bg-brand-dark-red transition-colors shadow-lg"
                                    >
                                        Create {activeModule.slice(0, -1)}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Footer Status */}
            <footer className="h-8 bg-white border-t border-gray-200 flex items-center justify-between px-4 text-[10px] text-gray-400 font-medium shrink-0">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Clock size={10} /> Last synced: Just now</span>
                    <span className="flex items-center gap-1 text-green-600"><CheckCircle2 size={10} /> Online</span>
                </div>
                <div className="flex items-center gap-4 cursor-pointer hover:text-gray-600 transition-colors">
                    <HelpCircle size={12} /> Help & Support
                </div>
            </footer>
        </div>
    );
};

export default CrmApp;

