import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

type Inquiry = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  async function fetchInquiries() {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Грешка при обновяване на статуса.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('bg-BG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-charcoal-900 mb-6">Запитвания</h2>

      <div className="bg-white border border-cream-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cream-50 border-b border-cream-200">
                <th className="py-4 px-6 font-sans text-xs text-charcoal-800/60 tracking-widest uppercase">
                  Дата
                </th>
                <th className="py-4 px-6 font-sans text-xs text-charcoal-800/60 tracking-widest uppercase">
                  Име
                </th>
                <th className="py-4 px-6 font-sans text-xs text-charcoal-800/60 tracking-widest uppercase">
                  Контакти
                </th>
                <th className="py-4 px-6 font-sans text-xs text-charcoal-800/60 tracking-widest uppercase">
                  Съобщение
                </th>
                <th className="py-4 px-6 font-sans text-xs text-charcoal-800/60 tracking-widest uppercase">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-charcoal-800/60">
                    Зареждане...
                  </td>
                </tr>
              ) : inquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-charcoal-800/60">
                    Няма намерени запитвания.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm text-charcoal-800 whitespace-nowrap">
                      {formatDate(inquiry.created_at)}
                    </td>
                    <td className="py-4 px-6 text-sm text-charcoal-900 font-medium whitespace-nowrap">
                      {inquiry.name}
                    </td>
                    <td className="py-4 px-6 text-sm text-charcoal-800 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <a href={`mailto:${inquiry.email}`} className="text-gold-600 hover:underline">
                          {inquiry.email}
                        </a>
                        <a href={`tel:${inquiry.phone}`} className="text-charcoal-800 hover:text-gold-600">
                          {inquiry.phone}
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-charcoal-800 max-w-md">
                      <div className="whitespace-pre-wrap">{inquiry.message}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-charcoal-800 whitespace-nowrap">
                      <select
                        value={inquiry.status || 'new'}
                        onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                        className={`form-input py-1.5 px-3 text-sm rounded ${
                          inquiry.status === 'completed'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : inquiry.status === 'in_progress'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }`}
                      >
                        <option value="new">Ново</option>
                        <option value="in_progress">В процес</option>
                        <option value="completed">Приключено</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
