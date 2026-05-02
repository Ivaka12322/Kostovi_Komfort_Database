import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const { pathname } = useLocation();

  const isHomePage = pathname === '/';

  // On non-home pages, always use dark nav. On home, track scroll past hero.
  const isDarkBg = !isHomePage || scrolledPastHero;

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const hero = document.querySelector('section:first-of-type');
      const heroHeight = hero?.clientHeight ?? 600;
      setScrolledPastHero(window.scrollY > heroHeight - 100);
    };

    // Reset when returning to home
    setScrolledPastHero(window.scrollY > (document.querySelector('section:first-of-type')?.clientHeight ?? 600) - 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { to: '/', label: 'Начало' },
    { to: '/products', label: 'Продукти' },
    { to: '/contact', label: 'Контакти' },
    { to: '/about', label: 'За Нас' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isDarkBg
            ? 'bg-charcoal-900/95 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-black/20 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/Logo_quality_fix.png"
                alt="Костови Комфорт"
                className="h-10 w-auto object-contain"
              />
              <div className="hidden sm:block">
                <span className="font-display text-white text-lg tracking-wider font-medium">
                  Костови Комфорт
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `nav-link font-sans font-medium text-xs tracking-widest uppercase transition-colors duration-200 ${
                      isActive ? 'text-gold-500 active' : 'text-white/80 hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link
              to="/contact"
              className="hidden lg:flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-charcoal-900 font-sans font-semibold text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Phone size={13} />
              Свържете се с нас
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white p-1"
              onClick={() => setMenuOpen(true)}
              aria-label="Отвори меню"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          menuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-charcoal-900 transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="font-display text-white text-lg font-medium">Меню</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Затвори меню"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="p-6 flex flex-col gap-6">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `font-display text-2xl font-normal transition-colors duration-200 ${
                    isActive ? 'text-gold-500' : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-gold-500 text-charcoal-900 font-sans font-semibold text-xs tracking-widest uppercase px-5 py-3 w-full transition-all duration-200"
            >
              <Phone size={13} />
              Свържете се с нас
            </Link>
            <div className="mt-4 text-center">
              <p className="text-white/50 text-xs font-sans">0886 799 228 · 0887 740 546</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
