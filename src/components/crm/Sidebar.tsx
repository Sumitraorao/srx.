import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Briefcase, 
  CheckSquare, 
  Mail, 
  BarChart3, 
  Settings, 
  Zap,
  ChevronLeft,
  Search,
  Plus,
  Home
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils'; // Assuming utils exists or I'll create it
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/app/crm' },
  { icon: Users, label: 'Contacts', path: '/app/crm/contacts' },
  { icon: Target, label: 'Leads', path: '/app/crm/leads' },
  { icon: Briefcase, label: 'Deals', path: '/app/crm/deals' },
  { icon: CheckSquare, label: 'Tasks', path: '/app/crm/tasks' },
  { icon: Mail, label: 'Email', path: '/app/crm/email' },
  { icon: BarChart3, label: 'Reports', path: '/app/crm/reports' },
  { icon: Zap, label: 'Automations', path: '/app/crm/automations' },
];

export const Sidebar: React.FC<{ onNewRecord?: () => void }> = ({ onNewRecord }) => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <motion.aside 
            initial={false}
            animate={{ width: isCollapsed ? 80 : 260 }}
            className="h-screen bg-white text-slate-600 border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out relative group z-20"
        >
            {/* Header / Logo */}
            <div className={cn("p-6 flex items-center justify-between", isCollapsed && "justify-center")}>
                {!isCollapsed && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-black text-xl text-slate-900 tracking-tighter flex items-center gap-2"
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs text-white">SRX</div>
                        <span>HUB CRM</span>
                    </motion.div>
                )}
                <button 
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <ChevronLeft className={cn("w-4 h-4 transition-transform", isCollapsed && "rotate-180")} />
                </button>
            </div>

            {/* Quick Actions */}
            <div className="px-4 mb-6">
                <button 
                    onClick={onNewRecord}
                    className={cn(
                        "w-full bg-blue-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20",
                        isCollapsed && "p-0 h-10 w-10 mx-auto"
                    )}
                >
                    <Plus className="w-5 h-5" />
                    {!isCollapsed && <span className="text-sm">New Record</span>}
                </button>
            </div>

            {/* Search Trigger */}
            <div className="px-4 mb-4">
                 <button className={cn(
                    "w-full bg-slate-50 text-slate-400 rounded-lg py-2 px-3 flex items-center gap-2 border border-slate-200 hover:border-slate-300 transition-all text-xs",
                    isCollapsed && "justify-center px-0"
                )}>
                    <Search className="w-4 h-4" />
                    {!isCollapsed && <span>Quick search (⌘K)</span>}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                {NAV_ITEMS.map((item) => {
                    const isActive = item.path === '/app/crm' 
                        ? location.pathname === '/app/crm' || location.pathname === '/app/crm/'
                        : location.pathname.startsWith(item.path);
                    return (
                        <Link 
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                                isActive ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                                isCollapsed && "justify-center"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-900")} />
                            {!isCollapsed && <span className="text-sm">{item.label}</span>}
                            {isActive && (
                                <motion.div 
                                    layoutId="active-pill"
                                    className="absolute left-[-16px] w-1 h-6 bg-blue-600 rounded-r-full"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* User Profile / Bottom Actions */}
            <div className="p-4 border-t border-slate-100 mt-auto space-y-1">
                 <Link 
                    to="/"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all",
                        isCollapsed && "justify-center"
                    )}
                >
                    <Home className="w-5 h-5" />
                    {!isCollapsed && <span className="text-sm">Main Home</span>}
                </Link>
                 <Link 
                    to="/app/crm/settings"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all",
                        isCollapsed && "justify-center"
                    )}
                >
                    <Settings className="w-5 h-5" />
                    {!isCollapsed && <span className="text-sm">Settings</span>}
                </Link>
            </div>
        </motion.aside>
    );
};
