import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Bell, Command, Sun, Moon, Sparkles, X, Plus } from 'lucide-react';
import { AiAssistantModal } from './AiAssistantModal';

export const CrmLayout: React.FC = () => {
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    return (
        <div className={`flex min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
            <AiAssistantModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
            
            {/* Create Record Modal Placeholder */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCreateModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-200"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-black text-xl tracking-tight text-slate-900">Create New Record</h3>
                                <button onClick={() => setIsCreateModalOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <button className="w-full p-4 rounded-2xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center gap-4 group text-slate-900">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"><Plus className="w-5 h-5" /></div>
                                    <div className="text-left font-bold text-sm">Add New Contact</div>
                                </button>
                                <button className="w-full p-4 rounded-2xl border border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex items-center gap-4 group text-slate-900">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all"><Plus className="w-5 h-5" /></div>
                                    <div className="text-left font-bold text-sm">Create New Lead</div>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Left Sidebar */}
            <Sidebar onNewRecord={() => setIsCreateModalOpen(true)} />

            {/* Main Wrapper */}
            <div className={`flex-1 flex flex-col h-screen overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
                {/* Header / Top Bar */}
                <header className={`h-16 border-b flex items-center justify-between px-8 backdrop-blur-xl sticky top-0 z-10 transition-colors ${isDarkMode ? 'border-white/5 bg-slate-950/80' : 'border-slate-200 bg-white/80'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border group cursor-pointer transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-slate-100 border-slate-200 hover:border-slate-300'}`}>
                             <Command className={`w-4 h-4 transition-colors ${isDarkMode ? 'text-slate-500 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                             <span className={`text-[10px] uppercase font-bold tracking-widest transition-colors ${isDarkMode ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-400 group-hover:text-slate-600'}`}>Workspace / General</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* SrxAI Magic Trigger */}
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsAiModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
                        >
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            ASK SRXAI
                        </motion.button>

                        <div className={`flex items-center gap-4 transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                             <button className={`${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'} transition-colors`} onClick={() => alert('Notifications coming soon!')}><Bell className="w-5 h-5" /></button>
                             <div className={`h-4 w-[1px] ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
                             <button 
                                onClick={toggleTheme}
                                className={`${isDarkMode ? 'hover:text-white' : 'hover:text-slate-900'} transition-colors`}
                             >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                             </button>
                        </div>

                        {/* Profile Junk */}
                        <div className={`flex items-center gap-3 pl-2 border-l ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
                             <div className="text-right">
                                <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Srx Admin</p>
                                <p className="text-[10px] text-slate-500">sr9723612@gmail.com</p>
                             </div>
                             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border border-slate-200" />
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
                     <AnimatePresence mode="wait">
                        <motion.div
                            key="crm-content"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Outlet context={{ setIsAiModalOpen, setIsCreateModalOpen }} />
                        </motion.div>
                     </AnimatePresence>
                </main>
            </div>
        </div>
    );
};
