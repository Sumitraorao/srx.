
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Menu, Bell, Settings, Search, LayoutGrid, 
  Clock, ArrowLeft, Construction
} from 'lucide-react';

const AppShell = ({ children, title }: { children: React.ReactNode, title: string }) => {
    const navigate = useNavigate();
    
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Minimal Sidebar */}
            <aside className="w-20 bg-brand-dark flex flex-col items-center py-8 gap-8">
                <div onClick={() => navigate('/dashboard')} className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center font-bold text-white cursor-pointer hover:scale-110 transition-transform">S</div>
                <nav className="flex flex-col gap-6">
                    <LayoutGrid className="text-gray-400 hover:text-white cursor-pointer" size={24} onClick={() => navigate('/dashboard')} />
                    <Settings className="text-gray-400 hover:text-white cursor-pointer" size={24} />
                    <Clock className="text-gray-400 hover:text-white cursor-pointer" size={24} />
                </nav>
                <div className="mt-auto">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white/20">JD</div>
                </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
                             <ArrowLeft size={20} />
                        </button>
                        <h1 className="font-bold text-lg text-gray-800">{title}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-gray-100 border-none rounded-md text-sm outline-none focus:ring-2 focus:ring-brand-blue w-64" />
                        </div>
                        <Bell size={20} className="text-gray-400 cursor-pointer" />
                    </div>
                </header>
                <div className="flex-1 p-8 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

const GenericApp = () => {
    const { appId } = useParams();
    const name = appId ? appId.charAt(0).toUpperCase() + appId.slice(1) : 'Application';

    return (
        <AppShell title={name}>
            <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-blue-50 text-brand-blue rounded-3xl flex items-center justify-center mb-6 animate-pulse">
                    <Construction size={48} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{name} is coming to your workspace</h2>
                <p className="text-gray-500 text-lg mb-8 max-w-lg">
                    We are currently migrating our enterprise-grade {name} module to this environment. Check back soon for full functionality!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {[1,2,3].map(i => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm opacity-50">
                            <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
                            <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                            <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
};

export default GenericApp;
