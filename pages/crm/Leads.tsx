import React from 'react';
import { 
  MoreHorizontal, 
  Plus, 
  MessageSquare, 
  Clock, 
  TrendingUp,
  User,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';

import { useOutletContext } from 'react-router-dom';

export type Lead = {
    id: string;
    company: string;
    contact: string;
    value: string;
    score: number;
    tasks: number;
    status: 'New' | 'Contacted' | 'Qualified' | 'Nurturing';
    priority: 'Low' | 'Medium' | 'High';
};

const MOCK_LEADS: Lead[] = [
    { id: '1', company: 'Cyberdyne Systems', contact: 'Sarah Connor', value: '$12,500', score: 84, tasks: 3, status: 'New', priority: 'High' },
    { id: '2', company: 'Wayne Enterprises', contact: 'Lucius Fox', value: '$45,000', score: 92, tasks: 5, status: 'Contacted', priority: 'High' },
    { id: '3', company: 'Stark Industries', contact: 'Pepper Potts', value: '$82,000', score: 98, tasks: 2, status: 'Qualified', priority: 'High' },
    { id: '4', company: 'Umbrella Corp', contact: 'Albert Wesker', value: '$9,200', score: 45, tasks: 1, status: 'New', priority: 'Medium' },
    { id: '5', company: 'Hooli', contact: 'Gavin Belson', value: '$22,100', score: 71, tasks: 4, status: 'Contacted', priority: 'Low' },
];

const COLUMNS: Lead['status'][] = ['New', 'Contacted', 'Qualified', 'Nurturing'];

export const LeadsKanban: React.FC = () => {
    const { setIsCreateModalOpen } = useOutletContext<{ setIsCreateModalOpen: (o: boolean) => void }>();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Leads Kanban</h1>
                    <p className="text-slate-500 text-sm">Manage and qualify your active sales leads.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select className="bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs font-bold text-slate-600 appearance-none focus:ring-2 ring-blue-600/20 transition-all cursor-pointer outline-none shadow-sm">
                            <option>All Owners</option>
                            <option>My Leads</option>
                        </select>
                    </div>
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
                    >
                        <Plus className="w-4 h-4" /> Add Lead
                    </button>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar min-h-[70vh]">
                {COLUMNS.map((column) => (
                    <div key={column} className="flex-shrink-0 w-80 flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                             <div className="flex items-center gap-2">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{column}</h3>
                                <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    {MOCK_LEADS.filter(l => l.status === column).length}
                                </span>
                             </div>
                             <button className="text-slate-400 hover:text-slate-900 transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>

                        <div className="flex-1 space-y-4">
                            {MOCK_LEADS.filter(l => l.status === column).map((lead) => (
                                <motion.div 
                                    key={lead.id}
                                    layoutId={lead.id}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className="bg-white border border-slate-200 p-5 rounded-2xl cursor-grab active:cursor-grabbing hover:border-blue-500/30 transition-all group shadow-sm bg-white"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className={cn(
                                            "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                                            lead.priority === 'High' ? "bg-red-50 text-red-600" :
                                            lead.priority === 'Medium' ? "bg-amber-50 text-amber-600" :
                                            "bg-blue-50 text-blue-600"
                                        )}>
                                            {lead.priority}
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-900"><MoreHorizontal className="w-4 h-4" /></button>
                                    </div>

                                    <h4 className="text-slate-900 font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{lead.company}</h4>
                                    <p className="text-slate-500 text-xs mb-4">{lead.contact}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-3">
                                             <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                                <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                                                <span className="font-bold text-slate-900">{lead.score}%</span>
                                             </div>
                                             <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{lead.tasks}</span>
                                             </div>
                                        </div>
                                        <p className="text-sm font-black text-slate-900">{lead.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
