import React, { useState, useMemo } from 'react';
import { 
  Inbox, Send, Star, Trash2, Archive, 
  Menu, Search, Plus, Bell, Settings,
  ChevronLeft, ChevronRight, MoreVertical, ChevronDown,
  Paperclip, Reply, Forward, User, X, Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_EMAILS = [
  { id: 1, sender: 'SRXHUB Announcements', subject: 'Welcome to your new enterprise workspace', preview: 'Get started with our unified cloud suite and boost your productivity...', time: '10:24 AM', read: false, folder: 'Inbox', starred: false },
  { id: 2, sender: 'Financial Dept', subject: 'Monthly Revenue Report - March 2024', preview: 'The reports for the current month are ready for review. Please check...', time: 'Yesterday', read: true, folder: 'Inbox', starred: true },
  { id: 3, sender: 'Google Cloud Team', subject: 'Security update for your workspace', preview: 'We have updated our terms of service to better reflect our commitment...', time: 'Mar 22', read: true, folder: 'Inbox', starred: false },
  { id: 4, sender: 'John Doe', subject: 'Meeting regarding CRM migration', preview: 'Can we schedule a quick call to discuss the migration details?', time: 'Mar 21', read: false, folder: 'Inbox', starred: false },
];

const MailApp = () => {
    const navigate = useNavigate();
    const [emails, setEmails] = useState(INITIAL_EMAILS);
    const [selectedEmail, setSelectedEmail] = useState<any>(null);
    const [activeFolder, setActiveFolder] = useState('Inbox');
    const [searchTerm, setSearchTerm] = useState('');
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    
    // Compose state
    const [composeMail, setComposeMail] = useState({ to: '', subject: '', body: '' });

    const toggleStar = (e: React.BaseSyntheticEvent, id: number) => {
        e.stopPropagation();
        setEmails(emails.map(mail => mail.id === id ? { ...mail, starred: !mail.starred } : mail));
        if (selectedEmail?.id === id) {
            setSelectedEmail({ ...selectedEmail, starred: !selectedEmail.starred });
        }
    };

    const filteredEmails = useMemo(() => {
        return emails.filter(e => {
            const matchesSearch = e.sender.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 e.subject.toLowerCase().includes(searchTerm.toLowerCase());
            if (activeFolder === 'Starred') return matchesSearch && e.starred;
            return matchesSearch && e.folder === activeFolder;
        });
    }, [emails, activeFolder, searchTerm]);

    const handleSendMail = (e: React.FormEvent) => {
        e.preventDefault();
        const newMail = {
            id: Date.now(),
            sender: 'Me',
            subject: composeMail.subject,
            preview: composeMail.body,
            time: 'Just now',
            read: true,
            folder: 'Sent',
            starred: false
        };
        setEmails([newMail, ...emails]);
        setIsComposeOpen(false);
        setComposeMail({ to: '', subject: '', body: '' });
    };

    const deleteEmail = (e: React.BaseSyntheticEvent, id: number) => {
        e.stopPropagation();
        setEmails(emails.map(mail => mail.id === id ? { ...mail, folder: 'Trash' } : mail));
        if (selectedEmail?.id === id) setSelectedEmail(null);
    };

    const archiveEmail = (e: React.BaseSyntheticEvent, id: number) => {
        e.stopPropagation();
        setEmails(emails.map(mail => mail.id === id ? { ...mail, folder: 'Archive' } : mail));
        if (selectedEmail?.id === id) setSelectedEmail(null);
    };

    const handleSendReply = () => {
        setIsComposeOpen(true);
        setComposeMail({
            to: selectedEmail.sender,
            subject: `Re: ${selectedEmail.subject}`,
            body: `\n\n--- Original Message ---\n${selectedEmail.preview}`
        });
    };

    return (
        <div className="flex h-screen bg-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#f8f9fa] border-r border-gray-200 flex flex-col shrink-0">
                <div className="p-4 flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center font-black text-white text-sm">M</div>
                    <span className="font-bold text-lg text-gray-800">Mail</span>
                </div>

                <div className="px-4 mb-6">
                    <button 
                        onClick={() => {
                            setIsComposeOpen(true);
                            setComposeMail({ to: '', subject: '', body: '' });
                        }}
                        className="w-full bg-brand-blue text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        <Plus size={18} /> New Mail
                    </button>
                </div>

                <nav className="flex-1 px-2 space-y-0.5">
                    {[
                        { icon: Inbox, label: 'Inbox', count: emails.filter(e => e.folder === 'Inbox' && !e.read).length },
                        { icon: Star, label: 'Starred', count: emails.filter(e => e.starred).length },
                        { icon: Send, label: 'Sent', count: emails.filter(e => e.folder === 'Sent').length },
                        { icon: Trash2, label: 'Trash', count: 0 },
                        { icon: Archive, label: 'Archive', count: 0 },
                    ].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => {
                                setActiveFolder(item.label);
                                setSelectedEmail(null);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                                activeFolder === item.label ? 'bg-blue-50 text-brand-blue font-bold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={18} className={activeFolder === item.label ? 'text-brand-blue' : 'text-gray-500'} />
                                <span>{item.label}</span>
                            </div>
                            {item.count > 0 && <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full border border-gray-200">{item.count}</span>}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                     <button onClick={() => navigate('/dashboard')} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-2">
                         <ChevronLeft size={14} /> Back to Hub
                     </button>
                </div>
            </aside>

            {/* Email List */}
            <div className="w-96 border-r border-gray-200 flex flex-col shrink-0">
                <header className="h-14 border-b border-gray-200 flex items-center px-4 shrink-0">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search mail..." 
                            className="w-full bg-gray-100 border-none rounded-md pl-10 pr-4 py-1.5 text-sm outline-none focus:ring-1 focus:ring-brand-blue transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                <div className="flex-1 overflow-auto divide-y divide-gray-100">
                    {filteredEmails.map((email) => (
                        <div 
                            key={email.id}
                            onClick={() => {
                                setSelectedEmail(email);
                                setEmails(emails.map(e => e.id === email.id ? { ...e, read: true } : e));
                            }}
                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors relative group ${selectedEmail?.id === email.id ? 'bg-blue-50/50' : ''}`}
                        >
                            <div className="flex items-start justify-between mb-1">
                                <span className={`text-sm ${email.read ? 'text-gray-600' : 'text-gray-900 font-bold'}`}>{email.sender}</span>
                                <span className="text-[10px] text-gray-400 font-medium">{email.time}</span>
                            </div>
                            <h4 className={`text-sm truncate mb-1 pr-6 ${email.read ? 'text-gray-500 font-medium' : 'text-gray-900 font-bold'}`}>{email.subject}</h4>
                            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{email.preview}</p>
                            
                            <div className="absolute right-4 bottom-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={(e) => toggleStar(e, email.id)}>
                                    <Star size={14} className={email.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-400'} />
                                </button>
                                <button onClick={(e) => archiveEmail(e, email.id)}>
                                    <Archive size={14} className="text-gray-300 hover:text-blue-500" />
                                </button>
                                <button onClick={(e) => deleteEmail(e, email.id)}>
                                    <Trash2 size={14} className="text-gray-300 hover:text-red-500" />
                                </button>
                            </div>

                            {!email.read && <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-brand-blue rounded-full"></div>}
                        </div>
                    ))}
                    {filteredEmails.length === 0 && (
                        <div className="p-10 text-center text-gray-400 text-sm italic">No messages found in {activeFolder}</div>
                    )}
                </div>
            </div>

            {/* Email Reader */}
            <main className="flex-1 flex flex-col bg-white overflow-hidden">
                {selectedEmail ? (
                    <>
                        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={(e) => deleteEmail(e, selectedEmail.id)}
                                    className="p-2 hover:bg-gray-100 rounded text-gray-500"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button 
                                    onClick={(e) => archiveEmail(e, selectedEmail.id)}
                                    className="p-2 hover:bg-gray-100 rounded text-gray-500"
                                >
                                    <Archive size={18} />
                                </button>
                                <button 
                                    onClick={(e) => toggleStar(e as any, selectedEmail.id)}
                                    className="p-2 hover:bg-gray-100 rounded text-gray-500"
                                >
                                    <Star size={18} className={selectedEmail.starred ? 'fill-yellow-400 text-yellow-400' : ''} />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400 font-medium">1 of 124</span>
                                <button className="p-2 hover:bg-gray-100 rounded text-gray-500"><ChevronLeft size={18} /></button>
                                <button className="p-2 hover:bg-gray-100 rounded text-gray-500"><ChevronRight size={18} /></button>
                            </div>
                        </header>
                        <div className="flex-1 overflow-auto p-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">{selectedEmail.subject}</h2>
                            
                            <div className="flex items-start gap-4 mb-8">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                    <User size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-gray-900">{selectedEmail.sender}</span>
                                        <span className="text-sm text-gray-400">{selectedEmail.time}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">to me <ChevronDown size={12} className="inline ml-1" /></span>
                                </div>
                            </div>

                            <div className="text-gray-700 leading-relaxed space-y-4 max-w-2xl">
                                <p>Hi there,</p>
                                <p>{selectedEmail.preview}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non eros magna. Etiam vitae eros eu libero varius pellentesque. Proin pellentesque neque non magna aliquet, et tempus purus euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur tincidunt eros in ante viverra, nec egestas eros gravida.</p>
                                <p>Best regards,<br />{selectedEmail.sender}</p>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4">
                                <button 
                                    onClick={handleSendReply}
                                    className="flex items-center gap-2 px-6 py-2 border border-blue-200 text-brand-blue font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors"
                                >
                                    <Reply size={16} /> Reply
                                </button>
                                <button 
                                    onClick={() => alert("Forward functionality coming soon!")}
                                    className="flex items-center gap-2 px-6 py-2 border border-gray-200 text-gray-600 font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors"
                                >
                                    <Forward size={16} /> Forward
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-20 text-gray-400">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
                            <Inbox size={40} className="opacity-20" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">No email selected</h3>
                        <p className="mt-2 text-sm max-w-xs">Select an item to read its contents or compose a new mail to get started.</p>
                    </div>
                )}
            </main>

            {/* Compose Modal */}
            <AnimatePresence>
                {isComposeOpen && (
                    <div className="fixed inset-0 z-50 flex items-end justify-end p-6 pointer-events-none">
                        <motion.div 
                            initial={{ y: 400, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 400, opacity: 0 }}
                            className="bg-white w-[540px] rounded-t-xl shadow-2xl border border-gray-200 pointer-events-auto flex flex-col overflow-hidden"
                        >
                            <div className="bg-[#0b162c] text-white px-4 py-3 flex items-center justify-between shrink-0">
                                <span className="text-sm font-bold">New Message</span>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setIsComposeOpen(false)} className="hover:text-gray-400"><X size={18} /></button>
                                </div>
                            </div>
                            <form onSubmit={handleSendMail} className="flex flex-col h-[400px]">
                                <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                                    <span className="text-sm text-gray-400 w-8">To</span>
                                    <input 
                                        required
                                        type="email" 
                                        className="flex-1 text-sm outline-none border-none py-1.5 focus:ring-0" 
                                        value={composeMail.to}
                                        onChange={e => setComposeMail({...composeMail, to: e.target.value})}
                                    />
                                </div>
                                <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                                    <span className="text-sm text-gray-400 w-8">Sub</span>
                                    <input 
                                        required
                                        type="text" 
                                        className="flex-1 text-sm outline-none border-none py-1.5 focus:ring-0 font-medium" 
                                        value={composeMail.subject}
                                        onChange={e => setComposeMail({...composeMail, subject: e.target.value})}
                                    />
                                </div>
                                <textarea 
                                    required
                                    className="flex-1 p-4 text-sm outline-none resize-none" 
                                    placeholder="Type your message here..."
                                    value={composeMail.body}
                                    onChange={e => setComposeMail({...composeMail, body: e.target.value})}
                                />
                                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                                    <div className="flex items-center gap-2">
                                        <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded font-bold text-sm hover:bg-blue-700 shadow-sm">Send</button>
                                        <button type="button" className="p-2 text-gray-500 hover:bg-gray-200 rounded transition-colors"><Paperclip size={18} /></button>
                                    </div>
                                    <button type="button" onClick={() => setIsComposeOpen(false)} className="p-2 text-gray-400 hover:text-red-500 rounded transition-colors"><Trash2 size={18} /></button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MailApp;
