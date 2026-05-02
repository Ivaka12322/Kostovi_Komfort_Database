import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, MessageSquare, List, LogOut, User, ChevronLeft } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Табло', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Запитвания', path: '/admin/dashboard/inquiries', icon: MessageSquare },
    { name: 'Управление на продукти', path: '/admin/dashboard/services', icon: List },
  ];

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-cream-200 hidden md:flex md:flex-col">
        <div className="p-6 border-b border-cream-200">
          <h1 className="font-display text-xl text-charcoal-900 tracking-wide uppercase">
            Kostovi <span className="text-gold-500">Admin</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 ${
                  isActive 
                    ? 'bg-gold-500/10 text-gold-600 font-medium' 
                    : 'text-charcoal-800/70 hover:bg-cream-100 hover:text-charcoal-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-gold-500' : ''} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-cream-200 px-6 py-4 flex items-center justify-between">
          <div className="md:hidden flex items-center">
            {location.pathname !== '/admin/dashboard' && (
              <Link to="/admin/dashboard" className="flex items-center gap-1 text-sm font-sans text-charcoal-800/70 hover:text-gold-600 mr-3">
                <ChevronLeft size={18} />
                <span>Назад</span>
              </Link>
            )}
            <h1 className="font-display text-lg text-charcoal-900 uppercase">Kostovi Admin</h1>
          </div>
          <div className="hidden md:block"></div> {/* Spacer */}
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-charcoal-800">
              <div className="w-8 h-8 bg-cream-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-charcoal-800/60" />
              </div>
              <span className="hidden sm:block">Администратор</span>
            </div>
            <div className="h-6 w-px bg-cream-200 mx-2"></div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-charcoal-800/70 hover:text-red-500 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:block">Изход</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
