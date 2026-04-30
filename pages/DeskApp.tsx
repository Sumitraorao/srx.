import React, { useState, useMemo } from 'react';
import { 
  Inbox, MessageSquare, Clock, CheckCircle2, 
  AlertCircle, Search, Filter, Plus, 
  Settings, User, Phone, Globe, ChevronRight,
  BarChart3, LayoutGrid, MoreHorizontal, X, Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_TICKETS = [
    { id: 'TKT-1024', user: 'Mark Spencer', subject: 'Login issue on mobile app', priority: 'High', status: 'Open', time: '12m ago', desc: "I've been trying to log in manually via the iOS app but it keeps timing out on the MFA screen. This started happening after the last update." },
    { id: 'TKT-1023', user: 'Sarah Connor', subject: 'Invoice #4521 not received', priority: 'Medium', status: 'Pending', time: '45m ago', desc: "My billing cycle renewed on the 15th but I still haven't received the PDF invoice in my email. Can you please resend it?" },
    { id: 'TKT-1022', user: 'John Wick', subject: 'Request for custom integration API', priority: 'Low', status: 'Open', time: '2h ago', desc: "We are looking to integrate our CRM with the SRS platform. Do you have documentation for the webhooks and REST API?" },
    { id: 'TKT-1021', user: 'Ellen Ripley', subject: 'Data export stuck at 99%', priority: 'Urgent', status: 'On-Hold', time: '5h ago', desc: "The bulk CSV export for the 'Q1 Sales' report has been sitting at 99% for over 3 hours now. I need this for a board meeting." },
];

const DeskApp = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState(INITIAL_TICKETS);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeView, setActiveView] = useState('All Tickets');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTicket, setNewTicket] = useState({ user: '', subject: '', priority: 'Medium', desc: '' });

    const filteredTickets = useMemo(() => {
        return tickets.filter(t => {
            const matchesSearch = t.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 t.id.toLowerCase().includes(searchTerm.toLowerCase());
            if (activeView === 'Open') return matchesSearch && t.status === 'Open';
            if (activeView === 'Closed') return matchesSearch && t.status === 'Closed';
            return matchesSearch;
        });
    }, [tickets, searchTerm, activeView]);

    const handleAddTicket = (e: React.FormEvent) => {
        e.preventDefault();
        const ticket = {
            id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
            user: newTicket.user,
            subject: newTicket.subject,
            priority: newTicket.priority,
            status: 'Open',
            time: 'Just now',
            desc: newTicket.desc
        };
        setTickets([ticket, ...tickets]);
        setIsAddModalOpen(false);
        setNewTicket({ user: '', subject: '', priority: 'Medium', desc: '' });
    };

    return (
        <div className="flex h-screen bg-[#f1f3f6] font-sans overflow-hidden">
            {/* Minimal Side Rail */}
            <aside className="w-16 bg-[#2c3e50] flex flex-col items-center py-6 gap-8 shrink-0">
                <div onClick={() => navigate('/dashboard')} className="w-10 h-10 bg-brand-red rounded flex items-center justify-center font-black text-white cursor-pointer hover:scale-110 transition-transform">D</div>
                <nav className="flex flex-col gap-6">
                    <div className="p-2 bg-white/10 rounded-lg text-white"><Inbox size={24} /></div>
                    <div className="p-2 text-gray-400 hover:text-white cursor-pointer"><MessageSquare size={24} /></div>
                    <div className="p-2 text-gray-400 hover:text-white cursor-pointer"><BarChart3 size={24} /></div>
                    <div className="p-2 text-gray-400 hover:text-white cursor-pointer"><Settings size={24} /></div>
                </nav>
                <div className="mt-auto">
                    <div className="w-8 h-8 rounded-full bg-blue-500 overflow-hidden ring-2 ring-white/10">
                        <img src="https://ui-avatars.com/api/?name=Agent&background=random" alt="Agent" />
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 flex flex-col">
                <header className="h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center gap-6">
                        <h1 className="text-xl font-bold text-gray-800">Support Desk</h1>
                        <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-gray-50 h-9">
                            <span className="px-3 text-xs font-bold text-gray-500 border-r border-gray-200 flex items-center justify-center bg-gray-100">Views</span>
                            {['All Tickets', 'Open', 'Closed'].map(view => (
                                <button 
                                    key={view}
                                    onClick={() => setActiveView(view)}
                                    className={`px-4 text-xs font-bold transition-all ${activeView === view ? 'bg-white text-gray-700' : 'text-gray-400 hover:text-gray-700'}`}
                                >
                                    {view}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search tickets..." 
                                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none w-64 focus:ring-1 focus:ring-brand-blue" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-brand-red text-white px-6 py-2 rounded font-bold text-xs shadow hover:bg-brand-dark-red transition-all flex items-center gap-2"
                        >
                             <Plus size={16} /> Add Ticket
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Ticket List */}
                    <div className="w-[450px] bg-white border-r border-gray-200 flex flex-col shrink-0">
                        <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Showing {filteredTickets.length} {activeView}</span>
                            <Filter size={14} className="text-gray-400 cursor-pointer" />
                        </div>
                        <div className="flex-1 overflow-auto divide-y divide-gray-100">
                            {filteredTickets.map((ticket) => (
                                <div 
                                    key={ticket.id} 
                                    onClick={() => setSelectedTicket(ticket)}
                                    className={`p-6 cursor-pointer hover:bg-blue-50/20 transition-all border-l-4 group relative ${selectedTicket?.id === ticket.id ? 'border-brand-blue bg-blue-50/30' : 'border-transparent'}`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-[10px] font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded uppercase tracking-tighter">{ticket.id}</span>
                                        <span className="text-[10px] text-gray-400 font-medium">{ticket.time}</span>
                                    </div>
                                    <h4 className="font-bold text-gray-900 group-hover:text-brand-blue transition-colors mb-1">{ticket.subject}</h4>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center">
                                            <User size={12} className="text-gray-400" />
                                        </div>
                                        <span className="text-xs text-gray-600 font-medium">{ticket.user}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${ticket.priority === 'Urgent' || ticket.priority === 'High' ? 'text-red-500' : 'text-gray-400'}`}>
                                            {ticket.priority} Priority
                                        </span>
                                        <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${ticket.status === 'Open' ? 'text-green-600' : 'text-gray-500'}`}>{ticket.status}</span>
                                    </div>
                                </div>
                            ))}
                            {filteredTickets.length === 0 && (
                                <div className="p-10 text-center text-gray-400 text-sm italic font-medium">No tickets found</div>
                            )}
                        </div>
                    </div>

                    {/* Ticket View Placeholder */}
                    <div className="flex-1 bg-gray-50 flex flex-col overflow-hidden">
                        {selectedTicket ? (
                            <div className="flex-1 flex flex-col overflow-hidden bg-white">
                                <header className="p-8 border-b border-gray-100 bg-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2 py-1 rounded tracking-wide">{selectedTicket.id}</span>
                                        <span className="text-xs text-gray-400">• Created {selectedTicket.time}</span>
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-900 mb-6">{selectedTicket.subject}</h2>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><User size={16} /></div>
                                                <div className="text-left">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">CONSUMER</p>
                                                    <p className="text-sm font-bold text-gray-800">{selectedTicket.user}</p>
                                                </div>
                                            </div>
                                            <div className="h-8 w-px bg-gray-100"></div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">STATUS</p>
                                                <p className={`text-sm font-bold ${selectedTicket.status === 'Resolved' ? 'text-gray-400' : 'text-green-600'}`}>{selectedTicket.status}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: 'Resolved' } : t))}
                                            className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors"
                                        >
                                            Resolve Ticket
                                        </button>
                                    </div>
                                </header>
                                <div className="flex-1 overflow-auto p-8 space-y-8">
                                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                        <p className="text-sm text-gray-700 leading-relaxed font-medium">{selectedTicket.desc}</p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Thread Activity</h4>
                                        <div className="bg-blue-50/30 rounded-2xl p-6 border border-blue-50 relative">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white scale-90"><User size={16} /></div>
                                                <div>
                                                    <p className="text-xs font-black text-brand-blue mb-1">Support Agent • <span className="font-medium text-gray-400 uppercase">Automated Response</span></p>
                                                    <p className="text-sm text-gray-600">Hi {selectedTicket.user.split(' ')[0]}, thanks for reaching out. We've received your ticket and an agent will be assigned shortly. Your ticket ID is {selectedTicket.id}.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-8 border-t border-gray-100 flex items-center gap-4 bg-white">
                                    <input 
                                        type="text" 
                                        placeholder="Type a reply..." 
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const val = e.currentTarget.value;
                                                if (!val) return;
                                                setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, desc: `${t.desc}\n\n[You]: ${val}` } : t));
                                                e.currentTarget.value = '';
                                            }
                                        }}
                                    />
                                    <button className="bg-brand-blue text-white p-3 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"><Send size={20} /></button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
                                <div className="max-w-md">
                                    <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-gray-300 mb-8 mx-auto ring-1 ring-gray-100 animate-pulse">
                                        <AlertCircle size={40} />
                                    </div>
                                    <h2 className="text-2xl font-black text-gray-800 mb-4">No Ticket Selected</h2>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                        Please select a ticket from the left panel to view its details, customer history, and begin troubleshooting.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 transition-transform hover:scale-105 cursor-default">
                                            <CheckCircle2 size={24} className="text-green-500" />
                                            <div className="text-left">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SLA PASS</p>
                                                <p className="text-sm font-black text-gray-900">98%</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 transition-transform hover:scale-105 cursor-default">
                                            <Clock size={24} className="text-blue-500" />
                                            <div className="text-left">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AVG TIME</p>
                                                <p className="text-sm font-black text-gray-900">2.4 hrs</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Add Ticket Modal */}
                <AnimatePresence>
                    {isAddModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsAddModalOpen(false)}
                                className="absolute inset-0 bg-[#2c3e50]/40 backdrop-blur-sm"
                            />
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                                className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden p-10"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white scale-90"><Plus size={20} /></div>
                                        <h3 className="text-2xl font-black text-gray-900">Create New Ticket</h3>
                                    </div>
                                    <button onClick={() => setIsAddModalOpen(false)} className="text-gray-300 hover:text-gray-600 transition-colors"><X size={24} /></button>
                                </div>
                                <form onSubmit={handleAddTicket} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Customer Name</label>
                                            <input 
                                                required
                                                className="w-full px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                                                placeholder="e.g. Ellen Ripley"
                                                value={newTicket.user}
                                                onChange={e => setNewTicket({...newTicket, user: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Priority Level</label>
                                            <select 
                                                className="w-full px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none"
                                                value={newTicket.priority}
                                                onChange={e => setNewTicket({...newTicket, priority: e.target.value})}
                                            >
                                                <option>Urgent</option>
                                                <option>High</option>
                                                <option>Medium</option>
                                                <option>Low</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                                        <input 
                                            required
                                            className="w-full px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all" 
                                            placeholder="Brief summary of the issue"
                                            value={newTicket.subject}
                                            onChange={e => setNewTicket({...newTicket, subject: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                                        <textarea 
                                            required
                                            rows={4}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none" 
                                            placeholder="Detailed information..."
                                            value={newTicket.desc}
                                            onChange={e => setNewTicket({...newTicket, desc: e.target.value})}
                                        />
                                    </div>
                                    <button type="submit" className="w-full py-4 bg-[#2c3e50] text-white rounded-2xl font-black text-sm shadow-xl hover:bg-[#1a252f] active:scale-95 transition-all mt-4">
                                        Generate Ticket
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default DeskApp;
