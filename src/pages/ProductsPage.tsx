import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, DoorOpen, Layers, Warehouse, LayoutGrid } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Subcategory {
  title: string;
  img: string;
  description: string;
  features: string[];
}

interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  bg: string;
  subcategories: Subcategory[];
}

// We will fetch these from Supabase now

interface SubcategoryCardProps {
  sub: Subcategory;
  isOpen: boolean;
  onToggle: () => void;
}

function SubcategoryCard({ sub, isOpen, onToggle }: SubcategoryCardProps) {
  return (
    <div className="bg-white border border-cream-200 overflow-hidden flex flex-col">
      <div className="overflow-hidden aspect-[4/3]">
        <img
          src={sub.img}
          alt={sub.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-display text-lg font-medium text-charcoal-900 mb-4">{sub.title}</h4>

        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 font-sans text-gold-600 text-xs tracking-widest uppercase hover:text-gold-500 transition-colors duration-200 mt-auto"
          aria-expanded={isOpen}
        >
          {isOpen ? 'Затвори' : 'Разгледай'}
          <ChevronDown
            size={12}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <div className={`learn-more-content ${isOpen ? 'open' : ''}`}>
          <div className="learn-more-inner">
            <div className="pt-4 border-t border-cream-200 mt-4">
              <p className="font-sans text-charcoal-800/65 text-xs leading-relaxed mb-3">
                {sub.description}
              </p>
              <ul className="space-y-1.5">
                {sub.features?.map((f) => (
                  <li key={f} className="flex items-center gap-2 font-sans text-xs text-charcoal-800/70">
                    <span className="w-1 h-1 bg-gold-500 rounded-full flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 font-sans text-xs tracking-widest uppercase text-charcoal-900 bg-gold-500 hover:bg-gold-600 px-4 py-2 transition-colors duration-200"
              >
                Запитване
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategorySection({ cat }: { cat: Category }) {
  const [open, setOpen] = useState(false);
  // Track which subcategory index is expanded (-1 = none)
  const [openSubIndex, setOpenSubIndex] = useState<number>(-1);
  const Icon = cat.icon;

  const handleSubToggle = (index: number) => {
    setOpenSubIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="mb-4 last:mb-0">
      {/* Category Banner */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          if (open) setOpenSubIndex(-1);
        }}
        className="w-full relative overflow-hidden text-left group focus:outline-none"
        aria-expanded={open}
      >
        {/* Background with stronger overlay for text readability */}
        <div className="absolute inset-0">
          <img
            src={cat.bg}
            alt={cat.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-charcoal-900/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between px-8 py-7">
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 border border-gold-500/60 flex items-center justify-center flex-shrink-0">
              <Icon size={18} className="text-gold-400" />
            </div>
            <div className="text-left">
              <h2 className="font-display text-2xl lg:text-3xl text-white font-medium">{cat.title}</h2>
              <p className="font-sans text-white/55 text-xs mt-1 hidden sm:block">{cat.subtitle}</p>
            </div>
          </div>
          <div className={`w-8 h-8 border border-white/20 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${open ? 'bg-gold-500/20 border-gold-500/40' : ''}`}>
            <ChevronDown
              size={16}
              className={`text-gold-400 transition-transform duration-400 ${open ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div className="accordion-inner">
          <div className="bg-cream-100 border-x border-b border-cream-200 px-6 py-8">
            <p className="font-sans text-charcoal-800/60 text-sm leading-relaxed mb-6 max-w-2xl">
              {cat.subtitle}
            </p>
            {/* Use a non-grid layout to prevent height equalisation causing visual "all open" appearance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
              {cat.subcategories.map((sub, i) => (
                <SubcategoryCard
                  key={sub.title}
                  sub={sub}
                  isOpen={openSubIndex === i}
                  onToggle={() => handleSubToggle(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: cats } = await supabase.from('categories').select('*').order('name');
      const { data: subs } = await supabase.from('subcategories').select('*').order('name');

      if (cats && subs) {
        const mappedCats: Category[] = cats.map(c => {
          let icon = LayoutGrid;
          if (c.name.includes('Входни')) icon = DoorOpen;
          else if (c.name.includes('Интериорни')) icon = Layers;
          else if (c.name.includes('Гаражни')) icon = Warehouse;

          return {
            id: c.id,
            title: c.name,
            subtitle: 'Разгледайте нашите продукти в тази категория',
            icon: icon,
            bg: c.services_image_url || 'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=1200',
            subcategories: subs.filter(s => s.category_id === c.id).map(s => ({
              title: s.name,
              img: s.image_url || 'https://images.pexels.com/photos/1827054/pexels-photo-1827054.jpeg?auto=compress&cs=tinysrgb&w=600',
              description: s.description || '',
              features: [] // Currently not supported in DB directly, skipping
            }))
          };
        });
        setCategories(mappedCats);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden flex items-end min-h-[320px]">
        <div className="absolute inset-0">
          <img
            src="/Product_hero_comproesed.png"
            alt="Нашите Продукти"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/80 via-charcoal-900/70 to-charcoal-900/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full text-center lg:text-left">
          <p className="font-sans text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">Нашият Асортимент</p>
          <h1 className="font-display text-5xl lg:text-6xl text-white font-normal mb-4">Нашите Продукти</h1>
          <div className="w-12 h-px bg-gold-500 mb-5 mx-auto lg:mx-0" />
          <p className="font-sans text-white/60 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
            Разгледайте нашия богат асортимент от висококачествени врати. Предлагаме решения, съчетаващи сигурност, елегантен дизайн и дълготрайност за всеки дом и офис.
          </p>
        </div>
      </section>

      {/* Categories accordion */}
      <section className="bg-cream-50 py-10 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {categories.map((cat) => (
            <CategorySection key={cat.id} cat={cat} />
          ))}
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="bg-cream-100 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="border border-gold-500/30 p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <h3 className="font-display text-3xl text-charcoal-900 font-normal mb-2">
                Нуждаете се от консултация?
              </h3>
              <p className="font-sans text-charcoal-800/55 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
                Нашите експерти са на разположение, за да ви помогнат в избора на най-подходящите врати за вашия проект. Свържете се с нас за индивидуална оферта и професионален съвет.
              </p>
            </div>
            <Link to="/contact" className="btn-gold flex-shrink-0">
              Свържете се с нас
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
