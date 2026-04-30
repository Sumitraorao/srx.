import React, { useState, useMemo } from 'react';
import { 
  Users, UserPlus, Heart, Calendar, Clock, 
  MapPin, Phone, Mail, MoreHorizontal, Search,
  Plus, Filter, ChevronDown, CheckCircle2, AlertCircle,
  FileText, Star, X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_EMPLOYEES = [
    { id: 1, name: 'Alice Wilson', role: 'Design Engineer', office: 'SF Office', time: '09:00 AM', status: 'On Time' },
    { id: 2, name: 'Robert Brown', role: 'Product Manager', office: 'Remote', time: '08:45 AM', status: 'On Time' },
    { id: 3, name: 'Michael Chen', role: 'Backend Lead', office: 'NYC Office', time: '09:12 AM', status: 'Late' },
    { id: 4, name: 'Jane Smith', role: 'UX Researcher', office: 'SF Office', time: '08:55 AM', status: 'On Time' },
];

const PeopleApp = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newEmp, setNewEmp] = useState({ name: '', role: '', office: 'SF Office' });
    const [activeView, setActiveView] = useState('Dashboard');

    const filteredEmployees = useMemo(() => {
        return employees.filter(e => 
            e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [employees, searchTerm]);

    const handleAddEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        const emp = {
            id: Date.now(),
            name: newEmp.name,
            role: newEmp.role,
            office: newEmp.office,
            time: '09:00 AM',
            status: 'On Time'
        };
        setEmployees([emp, ...employees]);
        setIsAddModalOpen(false);
        setNewEmp({ name: '', role: '', office: 'SF Office' });
    };

    return (
        <div className="flex flex-col h-screen bg-[#f9fafc] font-sans">
            {/* Top Toolbar */}
            <header className="h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-4">
                    <div 
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <div className="w-9 h-9 bg-brand-red rounded-lg flex items-center justify-center font-black text-white">P</div>
                        <span className="font-bold text-xl tracking-tight text-gray-800">SRS People</span>
                    </div>
                    <nav className="ml-8 hidden lg:flex items-center gap-6">
                        {['Dashboard', 'Team', 'Announcements', 'Policies', 'Requests'].map((it, i) => (
                            <button 
                                key={it} 
                                onClick={() => setActiveView(it)}
                                className={`text-sm font-bold ${activeView === it ? 'text-brand-blue border-b-2 border-brand-blue pb-4 mt-4' : 'text-gray-500 hover:text-gray-900 pb-4 mt-4 border-b-2 border-transparent hover:border-gray-200'}`}
                            >
                                {it}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Find employee..." 
                            className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-100 outline-none w-64 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-brand-red text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:rotate-90 transition-transform"
                    >
                        <Plus size={20} />
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-white ring-1 ring-gray-100">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="User" />
                    </div>
                </div>
            </header>

            {/* Content Space */}
            <main className="flex-1 overflow-auto p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-2xl font-black text-gray-900">Good Morning, Admin</h1>
                            <p className="text-gray-500 font-medium italic mt-1">"Empower your team to reach new heights today."</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="shadow-sm bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 flex items-center gap-2">
                                <FileText size={16} /> Export Reports
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Summary Widgets */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { label: 'Total Employees', value: '142', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                                    { label: 'New This Month', value: '12', icon: UserPlus, color: 'text-green-600', bg: 'bg-green-50' },
                                    { label: 'Happiness Index', value: '4.8/5', icon: Heart, color: 'text-brand-red', bg: 'bg-red-50' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                                            <stat.icon size={24} />
                                        </div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                        <h4 className="text-3xl font-black text-gray-900 mt-1">{stat.value}</h4>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold text-gray-800">Attendance Snapshots</h3>
                                    <button className="text-sm font-bold text-brand-blue flex items-center gap-1">View Logs <ChevronDown size={14} /></button>
                                </div>
                                <div className="space-y-6">
                                    {filteredEmployees.map((emp, i) => (
                                        <div key={emp.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white border border-transparent hover:border-gray-100 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full ring-2 ring-white overflow-hidden">
                                                    <img src={`https://ui-avatars.com/api/?name=${emp.name}&background=random`} alt="User" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-gray-900">{emp.name}</h5>
                                                    <p className="text-xs text-gray-500 font-medium">{emp.role} • {emp.office}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-gray-800">{emp.time}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">LOG IN</p>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${emp.status === 'On Time' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {emp.status}
                                                </div>
                                                <MoreHorizontal size={20} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                                            </div>
                                        </div>
                                    ))}
                                    {filteredEmployees.length === 0 && (
                                        <div className="text-center py-10 text-gray-400 font-medium italic">No employees found matching "{searchTerm}"</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions & Events */}
                        <div className="space-y-8">
                            <div className="bg-brand-dark rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-black mb-2">Announce Something?</h3>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">Broadcast updates, policies, or event details to your entire workforce instantly.</p>
                                    <button 
                                        onClick={() => alert("Announcement feature coming soon!")}
                                        className="bg-white text-brand-dark px-6 py-2.5 rounded-full font-black text-sm hover:scale-105 transition-transform"
                                    >
                                        Post Update
                                    </button>
                                </div>
                                <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-brand-red/20 transition-all"></div>
                            </div>

                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                                <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <Calendar size={18} className="text-brand-red" /> Upcoming Events
                                </h3>
                                <div className="space-y-6">
                                    {[
                                      { color: 'bg-blue-500', title: 'Tech Talk 2024', date: 'Tomorrow, 10:00 AM' },
                                      { color: 'bg-purple-500', title: 'Product Sprint Review', date: 'Fri, 2:00 PM' },
                                      { color: 'bg-orange-500', title: 'Quarterly Townhall', date: 'Mar 28, 9:00 AM' },
                                    ].map((ev, i) => (
                                        <div key={i} className="flex gap-4 border-l-4 border-transparent hover:border-blue-500 pl-4 transition-all cursor-pointer">
                                            <div className={`w-2 h-12 rounded-full ${ev.color}`}></div>
                                            <div>
                                                <h6 className="font-bold text-gray-900 leading-tight">{ev.title}</h6>
                                                <p className="text-xs text-gray-500 mt-1 font-medium italic">{ev.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => alert("Calendar sync starting...")}
                                    className="w-full mt-8 py-3 bg-gray-50 rounded-2xl text-xs font-bold text-gray-400 hover:text-gray-800 transition-colors uppercase tracking-widest"
                                >
                                    View Full Calendar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Add Employee Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black text-gray-900">Add Team Member</h3>
                                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                            </div>
                            <form onSubmit={handleAddEmployee} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                    <input 
                                        required
                                        type="text"
                                        className="w-full px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        placeholder="e.g. Robert Brown"
                                        value={newEmp.name}
                                        onChange={e => setNewEmp({...newEmp, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Position / Role</label>
                                    <input 
                                        required
                                        type="text"
                                        className="w-full px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        placeholder="e.g. Lead Designer"
                                        value={newEmp.role}
                                        onChange={e => setNewEmp({...newEmp, role: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Office Location</label>
                                    <select 
                                        className="w-full px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none"
                                        value={newEmp.office}
                                        onChange={e => setNewEmp({...newEmp, office: e.target.value})}
                                    >
                                        <option>SF Office</option>
                                        <option>NYC Office</option>
                                        <option>London Hub</option>
                                        <option>Remote</option>
                                    </select>
                                </div>
                                <button type="submit" className="w-full py-4 bg-brand-red text-white rounded-2xl font-black text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4">
                                    Confirm Addition
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PeopleApp;
