import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { MessageSquare, LayoutTemplate } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const [stats, setStats] = useState({ inquiries: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { count: inquiriesCount } = await supabase
          .from('inquiries')
          .select('*', { count: 'exact', head: true });
          
        const { count: categoriesCount } = await supabase
          .from('categories')
          .select('*', { count: 'exact', head: true });

        setStats({
          inquiries: inquiriesCount || 0,
          categories: categoriesCount || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="font-display text-2xl text-charcoal-900 mb-6">Табло</h2>
      
      {loading ? (
        <div className="text-charcoal-800/60">Зареждане на статистика...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Inquiries Stat Card */}
          <div className="bg-white p-6 border border-cream-200 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-gold-500/10 flex items-center justify-center text-gold-600">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="font-sans text-xs text-charcoal-800/60 tracking-widest uppercase mb-1">
                Общо запитвания
              </p>
              <h3 className="font-display text-3xl text-charcoal-900">{stats.inquiries}</h3>
              <Link to="/admin/dashboard/inquiries" className="text-xs text-gold-600 hover:underline mt-1 inline-block">
                Виж всички &rarr;
              </Link>
            </div>
          </div>

          {/* Categories Stat Card */}
          <div className="bg-white p-6 border border-cream-200 shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-500/10 flex items-center justify-center text-blue-600">
              <LayoutTemplate size={24} />
            </div>
            <div>
              <p className="font-sans text-xs text-charcoal-800/60 tracking-widest uppercase mb-1">
                Основни категории
              </p>
              <h3 className="font-display text-3xl text-charcoal-900">{stats.categories}</h3>
              <Link to="/admin/dashboard/services" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                Управление на продукти &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
