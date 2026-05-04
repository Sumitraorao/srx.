import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal,
  Mail,
  Phone,
  Building2,
  Tag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';

import { useOutletContext } from 'react-router-dom';

type Contact = {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    role: string;
    tags: string[];
    status: 'Customer' | 'Lead' | 'Partner';
    lastContacted: string;
};

const MOCK_CONTACTS: Contact[] = [
    { id: '1', name: 'Tony Stark', email: 'tony@starkindustries.com', phone: '+1 800-IRON-MAN', company: 'Stark Industries', role: 'CEO', tags: ['Enterprise', 'Tech'], status: 'Customer', lastContacted: '2 hours ago' },
    { id: '2', name: 'Bruce Wayne', email: 'bruce@wayne.com', phone: '+1 000-BAT-CAVE', company: 'Wayne Enterprises', role: 'Chairman', tags: ['Investor'], status: 'Customer', lastContacted: '1 day ago' },
    { id: '3', name: 'Lex Luthor', email: 'lex@lexcorp.com', phone: '+1 555-EVIL', company: 'LexCorp', role: 'Founder', tags: ['Competitor'], status: 'Partner', lastContacted: '3 days ago' },
    { id: '4', name: 'Diana Prince', email: 'diana@themyscira.com', phone: '+1 777-WONDER', company: 'Justice League', role: 'Ambassador', tags: ['Government'], status: 'Lead', lastContacted: '5 mins ago' },
];

export const ContactsList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { setIsCreateModalOpen } = useOutletContext<{ setIsCreateModalOpen: (o: boolean) => void }>();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Contacts</h1>
                    <p className="text-slate-500 text-sm">Organize and manage your professional relationships.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => alert('Exporting Contacts...')}
                        className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
                    >
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                        <Plus className="w-4 h-4" /> New Contact
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-wrap items-center gap-4 shadow-sm">
                <div className="flex-1 relative min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 ring-blue-500/20 transition-all"
                    />
                </div>
                <button className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2 border border-slate-200 hover:bg-slate-50 transition-all">
                    <Filter className="w-4 h-4" /> Status
                </button>
                <button className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2 border border-slate-200 hover:bg-slate-50 transition-all">
                    <Tag className="w-4 h-4" /> Tags
                </button>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Name / Company</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Info</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Last Contact</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_CONTACTS.map((contact) => (
                            <motion.tr 
                                key={contact.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="group hover:bg-slate-50 transition-colors"
                            >
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-sm font-black text-white shadow-xl">
                                            {contact.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{contact.name}</p>
                                            <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                                <Building2 className="w-3 h-3" />
                                                <span>{contact.company} • {contact.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                     <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <Mail className="w-3 h-3 text-slate-400" /> {contact.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <Phone className="w-3 h-3 text-slate-400" /> {contact.phone}
                                        </div>
                                     </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                                        contact.status === 'Customer' ? "bg-green-100 text-green-700" :
                                        contact.status === 'Lead' ? "bg-blue-100 text-blue-700" :
                                        "bg-purple-100 text-purple-700"
                                    )}>
                                        {contact.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <p className="text-xs text-slate-500 font-medium">{contact.lastContacted}</p>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="text-slate-300 hover:text-slate-900 transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
