import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Shield, Gem, Wrench, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const features = [
  {
    icon: Gem,
    title: 'Премиум Материали',
    desc: 'Висококачествени суровини с естетика и издръжливост.',
  },
  {
    icon: Wrench,
    title: 'Прецизна Изработка',
    desc: 'Внимание към детайла за перфектно прилягане.',
  },
  {
    icon: Shield,
    title: 'Доказана Сигурност',
    desc: 'Сертифицирани системи за защита на вашия дом.',
  },
  {
    icon: Clock,
    title: 'Дълготрайност',
    desc: 'Инвестиция, запазваща стойността си с времето.',
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<{title: string, desc: string, img: string}[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*').order('name');
      if (data) {
        // Fallback to defaults if needed, but try to use db data
        const mapped = data.map(c => ({
          title: c.name,
          desc: 'Разгледайте нашите продукти', // Fallback desc since it's not in db for main cat
          img: c.homepage_image_url || 'https://images.pexels.com/photos/1827054/pexels-photo-1827054.jpeg?auto=compress&cs=tinysrgb&w=800'
        }));
        if (mapped.length > 0) {
          setCategories(mapped);
          return;
        }
      }
      
      // Fallback if db is empty
      setCategories([
        { title: 'Входни Врати', desc: 'Сигурност и стил за входа на вашия дом', img: 'https://images.pexels.com/photos/1827054/pexels-photo-1827054.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Интериорни Врати', desc: 'Елегантни решения за всяко помещение', img: 'https://images.pexels.com/photos/6585759/pexels-photo-6585759.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Гаражни Врати', desc: 'Надеждни и модерни гаражни системи', img: 'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { title: 'Други Врати', desc: 'Специализирани решения за всяка нужда', img: 'https://images.pexels.com/photos/6585751/pexels-photo-6585751.jpeg?auto=compress&cs=tinysrgb&w=800' },
      ]);
    };
    
    fetchCategories();

    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.35}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* Background image with parallax — entire bg layer moves */}
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img
            src="/Hero_bg_image.jpg"
            alt="Костови Комфорт Шоурум"
            className="w-full h-full object-cover scale-110"
          />
          {/* Overlays inside parallax layer so they move with background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </div>

        {/* Content — also parallaxes with background for unified movement */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
          <div
            className="inline-block border border-gold-500/60 px-4 py-1.5 mb-8"
            style={{ animation: 'fadeInUp 0.7s ease-out forwards' }}
          >
            <span className="font-sans text-gold-400 text-xs tracking-[0.25em] uppercase">
              Официални партньори · Solid55 · Hörmann
            </span>
          </div>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white font-normal leading-tight mb-5"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.15s forwards', opacity: 0 }}
          >
            Професионални Врати
            <br />
            <span className="text-gold-400 italic">за Вашия Дом</span>
          </h1>

          <p
            className="font-sans text-white/65 text-sm lg:text-base mb-10 max-w-md mx-auto leading-relaxed tracking-wide"
            style={{ animation: 'fadeInUp 0.8s ease-out 0.3s forwards', opacity: 0 }}
          >
            Ексклузивни партньори на Solid55 и Hörmann в България. Над 20 години опит и хиляди доволни клиенти.
          </p>

          <div
            style={{ animation: 'fadeInUp 0.8s ease-out 0.45s forwards', opacity: 0 }}
          >
            <Link to="/products" className="btn-gold">
              Разгледайте Продуктите
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ animation: 'fadeIn 1s ease-out 1s forwards', opacity: 0 }}
        >
          <span className="font-sans text-white/40 text-xs tracking-widest uppercase">Разгледайте</span>
          <ChevronDown size={16} className="text-gold-500 animate-bounce" />
        </div>
      </section>

      {/* Products Preview */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14 reveal">
            <p className="font-sans text-gold-600 text-xs tracking-[0.25em] uppercase mb-3">Нашите Продукти</p>
            <h2 className="section-heading mb-4">Открийте Нашата Гама</h2>
            <div className="gold-divider mx-auto" />
            <p className="font-sans text-charcoal-800/60 text-sm mt-5 max-w-md mx-auto leading-relaxed">
              Богат асортимент от висококачествени врати, съчетаващи сигурност, елегантен дизайн и дълготрайност.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.title}
                to="/products"
                style={{ animation: `fadeInUp 0.6s ease-out ${i * 0.15}s forwards`, opacity: 0 }}
                className={`group bg-white border border-cream-200 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8 hover:border-gold-500/40`}
              >
                <div className="overflow-hidden aspect-[3/4]">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-xl text-charcoal-900 font-medium mb-1.5">{cat.title}</h3>
                  <p className="font-sans text-charcoal-800/55 text-xs leading-relaxed mb-4 flex-1">{cat.desc}</p>
                  <span className="font-sans text-gold-600 text-xs tracking-widest uppercase flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200">
                    Разгледай <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <Link to="/products" className="btn-outline-gold">
              Всички Продукти
            </Link>
          </div>
        </div>
      </section>

      {/* Quality & Details */}
      <section className="bg-cream-50 py-10 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
            <div>
              <p className="font-sans text-gold-600 text-xs tracking-[0.25em] uppercase mb-2 lg:mb-3 text-center lg:text-left reveal">Защо Нас</p>
              <h2 className="section-heading mb-3 lg:mb-4 text-center lg:text-left reveal">Качество и Детайли</h2>
              <div className="gold-divider reveal mx-auto lg:mx-0" />
              <p className="font-sans text-charcoal-800/60 text-sm leading-relaxed mt-3 mb-5 lg:mt-5 lg:mb-10 text-center lg:text-left reveal">
                Всяка врата е създадена с внимание към детайла, съчетавайки безупречно качество с издръжливи материали.
              </p>

              <div className="grid grid-cols-2 gap-3 lg:gap-5">
                {features.map((f, i) => (
                  <div
                    key={f.title}
                    className={`reveal reveal-delay-${i + 1} group relative bg-white border border-cream-200 p-4 lg:p-7 overflow-hidden hover:border-gold-500/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    <div className="absolute top-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-500" />

                    <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-4">
                      <div className="shrink-0 w-9 h-9 lg:w-11 lg:h-11 bg-gold-500/10 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/15 transition-colors duration-300">
                        <f.icon size={16} className="text-gold-600 lg:text-[19px]" />
                      </div>
                      <div>
                        <h4 className="font-display text-sm lg:text-base font-semibold text-charcoal-900 mb-1 leading-snug">{f.title}</h4>
                        <p className="font-sans text-charcoal-800/55 text-xs leading-relaxed">{f.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative reveal hidden lg:block">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/door_quality_section.jpg"
                  alt="Качество на вратите"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-3/4 h-3/4 border border-gold-500/30 -z-10" />
            </div>

            {/* Mobile-only image — shown compactly below features */}
            <div className="relative reveal lg:hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="/door_quality_section.jpg"
                  alt="Качество на вратите"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="relative bg-charcoal-900 py-24 grain-overlay overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="font-sans text-gold-500/70 text-xs tracking-[0.25em] uppercase mb-3 reveal">Работим с най-добрите</p>
          <h2 className="font-display text-4xl lg:text-5xl text-white font-normal mb-4 reveal">Нашите Партньори</h2>
          <div className="gold-divider mx-auto reveal" />
          <p className="font-sans text-white/40 text-sm mt-5 mb-16 max-w-md mx-auto leading-relaxed reveal">
            Работим с водещи европейски производители, за да ви предложим решения без компромис в качеството.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-12">
            <a
              href="https://solid55.com"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal reveal-delay-1 group border border-white/10 hover:border-gold-500/50 px-12 py-8 transition-all duration-300 hover:bg-white/5"
            >
              <p className="font-display text-4xl lg:text-5xl text-white font-semibold tracking-tight group-hover:text-gold-400 transition-colors duration-200">
                Solid<span className="text-gold-500">55</span>
              </p>
              <p className="font-sans text-white/30 text-xs tracking-widest uppercase mt-2">Смарт Врати</p>
            </a>

            <div className="w-px h-16 bg-white/10 hidden sm:block" />

            <a
              href="https://www.hormann.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="reveal reveal-delay-2 group border border-white/10 hover:border-gold-500/50 px-12 py-8 transition-all duration-300 hover:bg-white/5"
            >
              <p className="font-display text-4xl lg:text-5xl text-white font-semibold tracking-tight group-hover:text-gold-400 transition-colors duration-200">
                Hörmann
              </p>
              <p className="font-sans text-white/30 text-xs tracking-widest uppercase mt-2">Немско Качество</p>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center reveal">
          <p className="font-sans text-gold-600 text-xs tracking-[0.25em] uppercase mb-3">Готови за следващата стъпка?</p>
          <h2 className="section-heading mb-4">Готови ли сте за Вашия нов проект?</h2>
          <div className="gold-divider mx-auto" />
          <p className="font-sans text-charcoal-800/55 text-sm mt-5 mb-10 leading-relaxed">
            Свържете се с нас или разгледайте нашите услуги, за да намерим перфектното решение за вашия дом.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold">Свържете се с нас</Link>
            <Link to="/products" className="btn-outline-gold">Към Продуктите</Link>
          </div>
        </div>
      </section>
    </>
  );
}
