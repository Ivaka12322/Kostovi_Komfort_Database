import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';

type Subcategory = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  image_url: string;
};

type Category = {
  id: string;
  name: string;
  homepage_image_url: string;
  services_image_url: string;
  subcategories?: Subcategory[];
};

export default function ServicesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: cats, error: catsError } = await supabase.from('categories').select('*').order('name');
      if (catsError) throw catsError;

      const { data: subs, error: subsError } = await supabase.from('subcategories').select('*').order('name');
      if (subsError) throw subsError;

      const combined = cats?.map((c) => ({
        ...c,
        subcategories: subs?.filter((s) => s.category_id === c.id) || [],
      }));

      setCategories(combined || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const uploadImage = async (file: File, path: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${path}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('site-assets').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Грешка при качване на изображението.');
      return null;
    }
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'homepage' | 'services' | 'subcategory',
    id: string
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploadingImage(`${type}-${id}`);
    
    const publicUrl = await uploadImage(file, type);
    
    if (publicUrl) {
      try {
        if (type === 'homepage' || type === 'services') {
          const updateField = type === 'homepage' ? { homepage_image_url: publicUrl } : { services_image_url: publicUrl };
          const { error } = await supabase.from('categories').update(updateField).eq('id', id);
          if (error) throw error;
        } else if (type === 'subcategory') {
          const { error } = await supabase.from('subcategories').update({ image_url: publicUrl }).eq('id', id);
          if (error) throw error;
        }
        await fetchData();
      } catch (error) {
        console.error('Error updating DB:', error);
        alert('Грешка при запазване в базата данни.');
      }
    }
    
    setUploadingImage(null);
  };

  const editCategoryName = async (id: string, currentName: string) => {
    const newName = prompt('Въведете ново име за категорията:', currentName);
    if (!newName || newName === currentName) return;
    
    try {
      const { error } = await supabase.from('categories').update({ name: newName }).eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert('Грешка при обновяване.');
    }
  };

  const createCategory = async () => {
    const name = prompt('Име на новата категория:');
    if (!name) return;
    
    try {
      const { error } = await supabase.from('categories').insert([{ name }]);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert('Грешка при създаване.');
    }
  };

  const createSubcategory = async (categoryId: string) => {
    const name = prompt('Име на новата подкатегория:');
    if (!name) return;
    
    try {
      const { error } = await supabase.from('subcategories').insert([{ name, category_id: categoryId }]);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert('Грешка при създаване.');
    }
  };

  const editSubcategory = async (id: string, currentName: string, currentDesc: string) => {
    const newName = prompt('Име:', currentName) || currentName;
    const newDesc = prompt('Описание:', currentDesc || '') || currentDesc;
    
    try {
      const { error } = await supabase.from('subcategories').update({ name: newName, description: newDesc }).eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert('Грешка при обновяване.');
    }
  };

  const deleteItem = async (table: 'categories' | 'subcategories', id: string) => {
    if (!confirm('Сигурни ли сте, че искате да изтриете този запис?')) return;
    
    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert('Грешка при изтриване.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl text-charcoal-900">Управление на продукти</h2>
        <button onClick={createCategory} className="btn-gold py-2 px-4 flex items-center gap-2">
          <Plus size={16} /> Добави Категория
        </button>
      </div>

      {loading ? (
        <div className="text-charcoal-800/60">Зареждане...</div>
      ) : categories.length === 0 ? (
        <div className="bg-white p-8 text-center border border-cream-200 shadow-sm text-charcoal-800/60">
          Няма намерени категории.
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-white border border-cream-200 shadow-sm">
              <div className="bg-cream-50 p-5 border-b border-cream-200 flex flex-wrap gap-4 items-start justify-between">
                <div>
                  <h3 className="font-display text-xl text-charcoal-900 flex items-center gap-3">
                    {category.name}
                    <button onClick={() => editCategoryName(category.id, category.name)} className="text-charcoal-800/40 hover:text-gold-600 transition-colors">
                      <Edit2 size={16} />
                    </button>
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <label className="cursor-pointer bg-white border border-cream-200 p-2 rounded hover:border-gold-500/50 transition-colors flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-charcoal-800/80">
                      {uploadingImage === `homepage-${category.id}` ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
                      Снимка: Начало
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'homepage', category.id)} />
                    </label>
                    {category.homepage_image_url && <a href={category.homepage_image_url} target="_blank" rel="noreferrer" className="text-[10px] text-blue-500 hover:underline">Преглед</a>}
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <label className="cursor-pointer bg-white border border-cream-200 p-2 rounded hover:border-gold-500/50 transition-colors flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-charcoal-800/80">
                      {uploadingImage === `services-${category.id}` ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
                      Снимка: Услуги
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'services', category.id)} />
                    </label>
                    {category.services_image_url && <a href={category.services_image_url} target="_blank" rel="noreferrer" className="text-[10px] text-blue-500 hover:underline">Преглед</a>}
                  </div>
                  <button onClick={() => deleteItem('categories', category.id)} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded transition-colors ml-2">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-sans text-sm font-medium text-charcoal-800/60 uppercase tracking-widest">Подкатегории</h4>
                  <button onClick={() => createSubcategory(category.id)} className="text-xs text-gold-600 hover:underline flex items-center gap-1">
                    <Plus size={12} /> Добави Подкатегория
                  </button>
                </div>

                {category.subcategories && category.subcategories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.subcategories.map((sub) => (
                      <div key={sub.id} className="border border-cream-200 p-4 rounded hover:border-gold-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-display text-lg text-charcoal-900">{sub.name}</h5>
                          <div className="flex gap-1">
                            <button onClick={() => editSubcategory(sub.id, sub.name, sub.description)} className="p-1 text-charcoal-800/40 hover:text-gold-600 transition-colors">
                              <Edit2 size={14} />
                            </button>
                            <button onClick={() => deleteItem('subcategories', sub.id)} className="p-1 text-red-400 hover:text-red-600 transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-charcoal-800/70 mb-4 line-clamp-2" title={sub.description}>
                          {sub.description || 'Няма описание'}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          {sub.image_url ? (
                            <img src={sub.image_url} alt={sub.name} className="w-12 h-12 object-cover rounded" />
                          ) : (
                            <div className="w-12 h-12 bg-cream-100 rounded flex items-center justify-center text-charcoal-800/30">
                              <ImageIcon size={16} />
                            </div>
                          )}
                          <label className="cursor-pointer text-xs text-gold-600 hover:underline flex items-center gap-1">
                            {uploadingImage === `subcategory-${sub.id}` ? 'Качване...' : 'Смени снимка'}
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'subcategory', sub.id)} />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-charcoal-800/50 italic">Няма добавени подкатегории.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
