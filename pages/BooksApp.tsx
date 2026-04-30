import React, { useState, useMemo } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, DollarSign, 
  Receipt, Users, Package, FileText, Settings,
  ChevronRight, Plus, Download, Filter, MoreHorizontal,
  Calendar, Briefcase, X, ArrowUpRight, ArrowDownLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_TRANSACTIONS = [
    { id: 1, name: 'Amazon Web Services', desc: 'Server Hosting', amount: -1240, type: 'Expense', date: '2024-03-24' },
    { id: 2, name: 'Acme Corp', desc: 'SaaS Subscription', amount: 8500, type: 'Sale', date: '2024-03-23' },
    { id: 3, name: 'Upwork Global', desc: 'Freelance Design', amount: -450, type: 'Expense', date: '2024-03-22' },
    { id: 4, name: 'Stripe Payout', desc: 'Service Revenue', amount: 12400, type: 'Sale', date: '2024-03-21' },
    { id: 5, name: 'Apple Inc', desc: 'Hardware Purchase', amount: -2499, type: 'Expense', date: '2024-03-20' },
];

const BooksApp = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    
    // New transaction state
    const [newTransaction, setNewTransaction] = useState({
        name: '',
        desc: '',
        amount: '',
        type: 'Expense'
    });

    const stats = useMemo(() => {
        const sales = transactions.filter(t => t.type === 'Sale').reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + Math.abs(t.amount), 0);
        return {
            sales,
            expenses,
            net: sales - expenses
        };
    }, [transactions]);

    const handleAddTransaction = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = parseFloat(newTransaction.amount);
        const t = {
            id: Date.now(),
            name: newTransaction.name,
            desc: newTransaction.desc,
            amount: newTransaction.type === 'Expense' ? -Math.abs(amount) : Math.abs(amount),
            type: newTransaction.type,
            date: new Date().toISOString().split('T')[0]
        };
        setTransactions([t, ...transactions]);
        setIsTransactionModalOpen(false);
        setNewTransaction({ name: '', desc: '', amount: '', type: 'Expense' });
    };

    return (
        <div className="flex h-screen bg-[#f3f7f8] font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1a2b44] text-white flex flex-col shrink-0 shadow-xl">
                 <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center font-black text-sm">B</div>
                    <span className="font-bold text-lg tracking-tight">SRS Books</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {[
                        { icon: BarChart3, label: 'Dashboard' },
                        { icon: Briefcase, label: 'Items' },
                        { icon: Users, label: 'Banking' },
                        { icon: TrendingUp, label: 'Sales' },
                        { icon: TrendingDown, label: 'Purchases' },
                        { icon: FileText, label: 'Reports' },
                        { icon: Receipt, label: 'Expenses' },
                    ].map((item) => (
                        <button
                            key={item.label}
                            onClick={() => setActiveTab(item.label)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-all ${
                                activeTab === item.label ? 'bg-brand-blue text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <item.icon size={18} className={activeTab === item.label ? 'text-white' : 'text-gray-500'} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button onClick={() => navigate('/dashboard')} className="text-xs text-gray-500 hover:text-white flex items-center gap-2">
                         <ChevronRight size={14} className="rotate-180" /> Dashboard
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-10 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-800">{activeTab}</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded border border-gray-200 text-xs text-gray-500 font-bold">
                            <Calendar size={14} /> Mar 1, 2024 - Mar 31, 2024
                        </div>
                        <button 
                            onClick={() => setIsTransactionModalOpen(true)}
                            className="bg-brand-red text-white px-4 py-2 rounded font-bold text-sm shadow-sm hover:bg-red-600 flex items-center gap-2"
                        >
                             <Plus size={18} /> New Transaction
                        </button>
                    </div>
                </header>

                <div className="p-8">
                    {/* Top Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Sales', value: `$${stats.sales.toLocaleString()}`, change: '+12.5%', color: 'text-green-600', icon: TrendingUp },
                            { label: 'Total Expenses', value: `$${stats.expenses.toLocaleString()}`, change: '+3.2%', color: 'text-red-600', icon: TrendingDown },
                            { label: 'Net Profit', value: `$${stats.net.toLocaleString()}`, change: '+18.1%', color: 'text-blue-600', icon: BarChart3 },
                            { label: 'Cash on Hand', value: '$256,000', change: 'Stable', color: 'text-gray-600', icon: DollarSign },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-transform hover:scale-[1.02]">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        <stat.icon size={20} className="text-gray-400" />
                                    </div>
                                    <span className={`text-xs font-bold ${stat.color}`}>{stat.change}</span>
                                </div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Income Graph Placeholder */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-[400px] flex flex-col">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="font-bold text-gray-800">Income vs Expenses</h3>
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                        <div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Income
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                                        <div className="w-3 h-3 bg-red-400 rounded-sm"></div> Expenses
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex items-end gap-2 pb-2">
                                {[60, 45, 80, 55, 90, 70, 85, 40, 65, 75, 95, 60].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                        <div className="w-full flex flex-col justify-end h-full gap-[2px]">
                                            <div style={{ height: `${h}%` }} className="w-full bg-blue-100 group-hover:bg-blue-200 transition-colors rounded-t-sm relative">
                                                <div style={{ height: '40%' }} className="absolute bottom-0 w-full bg-red-100 group-hover:bg-red-200 transition-colors"></div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-800">Recent Transactions</h3>
                                <Filter size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
                            </div>
                            <div className="flex-1 overflow-auto space-y-4">
                                {transactions
                                    .filter(t => {
                                        if (activeTab === 'Sales') return t.type === 'Sale';
                                        if (activeTab === 'Expenses') return t.type === 'Expense';
                                        if (activeTab === 'Purchases') return t.type === 'Expense' && t.amount < -1000; 
                                        return true;
                                    })
                                    .map((t) => (
                                    <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer rounded px-2 -mx-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'Sale' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                {t.type === 'Sale' ? <ArrowUpRight size={14} /> : <ArrowDownLeft size={14} />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{t.name}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">{t.desc}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-sm font-bold ${t.type === 'Sale' ? 'text-green-600' : 'text-gray-900'}`}>
                                                {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()}
                                            </p>
                                            <p className="text-[10px] text-gray-400 italic">{t.date}</p>
                                        </div>
                                    </div>
                                ))}
                                {transactions.filter(t => {
                                    if (activeTab === 'Sales') return t.type === 'Sale';
                                    if (activeTab === 'Expenses') return t.type === 'Expense';
                                    return true;
                                }).length === 0 && (
                                    <div className="text-center py-20 text-gray-400 italic text-sm font-medium">
                                        No transactions found for this category
                                    </div>
                                )}
                            </div>
                            <button 
                                onClick={() => setActiveTab(activeTab === 'Dashboard' ? 'Sales' : 'Dashboard')}
                                className="w-full mt-6 py-2 text-xs font-bold text-brand-blue hover:underline"
                            >
                                View All Transactions
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Transaction Modal */}
            <AnimatePresence>
                {isTransactionModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsTransactionModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden"
                        >
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-900">New Transaction</h3>
                                <button onClick={() => setIsTransactionModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                            </div>
                            <form onSubmit={handleAddTransaction} className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Vendor/Customer</label>
                                    <input 
                                        required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none" 
                                        placeholder="Name"
                                        value={newTransaction.name}
                                        onChange={e => setNewTransaction({...newTransaction, name: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                                    <input 
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none" 
                                        placeholder="Category or Details"
                                        value={newTransaction.desc}
                                        onChange={e => setNewTransaction({...newTransaction, desc: e.target.value})}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
                                        <select 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                                            value={newTransaction.type}
                                            onChange={e => setNewTransaction({...newTransaction, type: e.target.value})}
                                        >
                                            <option value="Expense">Expense</option>
                                            <option value="Sale">Sale</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase">Amount</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                            <input 
                                                required
                                                type="number"
                                                className="w-full pl-7 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-blue outline-none" 
                                                placeholder="0.00"
                                                value={newTransaction.amount}
                                                onChange={e => setNewTransaction({...newTransaction, amount: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-3 bg-brand-blue text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg mt-4">
                                    Record Transaction
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BooksApp;
