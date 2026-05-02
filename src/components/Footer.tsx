import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  topBorder?: boolean;
}

export default function Footer({ topBorder = false }: FooterProps) {
  return (
    <footer className={`bg-charcoal-900 text-white${topBorder ? ' border-t-4 border-gold-500/40' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/Logo_quality_fix.png"
                alt="Костови Комфорт"
                className="h-10 w-auto object-contain"
              />
              <span className="font-display text-white text-lg font-medium tracking-wider">
                Костови Комфорт
              </span>
            </div>
            <p className="font-sans text-white/50 text-sm leading-relaxed mb-6">
              Луксозни решения за врати от 2004 година. Официални дистрибутори на Solid55 и Hörmann в България.
            </p>
            <div className="flex gap-3">
              <a
                href="https://solid55.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-white/40 hover:text-gold-500 text-sm transition-colors duration-200"
              >
                Solid55
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://www.hormann.bg"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-white/40 hover:text-gold-500 text-sm transition-colors duration-200"
              >
                Hörmann
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div>
            <h4 className="font-display text-gold-500 text-sm tracking-widest uppercase mb-6 font-medium">
              Навигация
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Начало' },
                { to: '/products', label: 'Продукти' },
                { to: '/contact', label: 'Контакти' },
                { to: '/about', label: 'За Нас' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-sans text-white/60 hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="font-display text-gold-500 text-sm tracking-widest uppercase mb-6 font-medium">
              Контакти
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:kostovi_komfort@abv.bg"
                  className="flex items-start gap-3 group"
                >
                  <Mail size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <span className="font-sans text-white/60 group-hover:text-white text-sm transition-colors duration-200">
                    kostovi_komfort@abv.bg
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Phone size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <a
                      href="tel:+359886799228"
                      className="block font-sans text-white/60 hover:text-white text-sm transition-colors duration-200"
                    >
                      0886 799 228
                    </a>
                    <a
                      href="tel:+359887740546"
                      className="block font-sans text-white/60 hover:text-white text-sm transition-colors duration-200"
                    >
                      
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin size={14} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-sans text-white/60 text-sm">гр. Монтана</p>
                    <p className="font-sans text-white/60 text-sm">гр. Козлодуй</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-white/30 text-xs">
            © 2026 Костови Комфорт. Всички права запазени.
          </p>
          <p className="font-sans text-white/30 text-xs">
            Партньори:{' '}
            <a
              href="https://solid55.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-500 transition-colors"
            >
              Solid55
            </a>
            {' · '}
            <a
              href="https://www.hormann.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-500 transition-colors"
            >
              Hörmann
            </a>
          </p>
        </div>
      </div>

      {/* Credit banner */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 text-center">
          <p className="font-sans text-white/25 text-xs">
            Сайтът е изготвен от{' '}
            <a
              href="https://avltechsolutions.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold-500 transition-colors duration-200"
            >
              AVL Tech Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
