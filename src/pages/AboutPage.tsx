import { Link } from 'react-router-dom';
import { Shield, Award, Users, Gem } from 'lucide-react';

const values = [
  {
    icon: Gem,
    title: 'Качество',
    desc: 'Безкомпромисен подбор на материали и прецизна изработка, гарантиращи дълготрайност и естетика.',
  },
  {
    icon: Award,
    title: 'Професионализъм',
    desc: 'Експертна консултация и безупречен монтаж от нашия висококвалифициран екип с дългогодишен опит.',
  },
  {
    icon: Users,
    title: 'Надеждност',
    desc: 'Коректност и прозрачност в комуникацията. Ние сме партньорът, на когото можете да разчитате.',
  },
  {
    icon: Shield,
    title: 'Гаранция',
    desc: 'Спокойствие за вашия дом с дългосрочна заводска и извънгаранционна поддръжка на всички продукти.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden flex items-end min-h-[340px]">
        <div className="absolute inset-0">
          <img
            src="/about_us_hero.jpg"
            alt="За Нас"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/75 via-charcoal-900/65 to-charcoal-900/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 w-full text-center">
          <h1 className="font-display text-5xl lg:text-6xl text-white font-normal mb-3">За Нас</h1>
          <div className="w-12 h-px bg-gold-500 mx-auto mb-5" />
          <p className="font-display text-xl lg:text-2xl text-gold-400 font-normal italic">
            Вашият доверен партньор от 2004 година
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-cream-50 py-10 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-start">
            <div>
              <p className="font-sans text-gold-600 text-xs tracking-[0.25em] uppercase mb-3 text-center lg:text-left reveal">История</p>
              <h2 className="font-display text-4xl lg:text-5xl text-charcoal-900 font-normal mb-4 text-center lg:text-left reveal">
                Нашата История
              </h2>
              <div className="w-12 h-px bg-gold-500 mb-5 lg:mb-7 reveal mx-auto lg:mx-0" />

              {/* Mobile: condensed single paragraph */}
              <div className="reveal lg:hidden">
                <p className="font-sans text-charcoal-800/65 text-sm leading-relaxed text-center">
                  Създадена през 2004 г., „Костови Комфорт“ предлага висококачествени интериорни и екстериорни решения, утвърждавайки се като символ на сигурност, естетика и дълготрайност.

Вярваме, че домът е усещане за комфорт и защита, затова подбираме всеки детайл според най-високите стандарти за качество и функционалност.

Гордеем се с партньорството си със <strong className="text-charcoal-900">Solid55</strong> и <strong className="text-charcoal-900">Hörmann</strong> като техни ексклузивни дистрибутори в България.
                </p>
              </div>

              {/* Desktop: full text */}
              <div className="space-y-5 reveal hidden lg:block">
                <p className="font-sans text-charcoal-800/65 text-sm leading-relaxed">
                  Създадена през 2004 година, „Костови Комфорт" стартира с ясната визия да предложи на българския пазар безкомпромисно качество в интериорните и екстериорните решения. Повече от две десетилетия ние сме символ на сигурност, естетика и дълготрайност.
                </p>
                <p className="font-sans text-charcoal-800/65 text-sm leading-relaxed">
                  Нашият опит ни научи, че домът не е просто сграда, а усещане за защита и комфорт. Затова всеки детайл, който предлагаме, е внимателно селектиран, за да отговори на най-високите стандарти за лукс и функционалност.
                </p>
                <p className="font-sans text-charcoal-800/65 text-sm leading-relaxed">
                  Гордеем се с нашето дългосрочно партньорство с лидерите в бранша — <strong className="text-charcoal-900">Solid55</strong> и <strong className="text-charcoal-900">Hörmann</strong> — като ексклузивни дистрибутори на техните продукти в България.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-6 lg:gap-10 mt-6 lg:mt-10 reveal justify-center lg:justify-start">
                <div className="text-center lg:text-left">
                  <p className="font-display text-4xl lg:text-5xl text-gold-500 font-semibold">20+</p>
                  <p className="font-sans text-charcoal-800/50 text-xs tracking-widest uppercase mt-1">Години Опит</p>
                </div>
                <div className="w-px bg-cream-200" />
                <div className="text-center lg:text-left">
                  <p className="font-display text-4xl lg:text-5xl text-gold-500 font-semibold">10k+</p>
                  <p className="font-sans text-charcoal-800/50 text-xs tracking-widest uppercase mt-1">Доволни Клиенти</p>
                </div>
                <div className="w-px bg-cream-200" />
                <div className="text-center lg:text-left">
                  <p className="font-display text-4xl lg:text-5xl text-gold-500 font-semibold">2</p>
                  <p className="font-sans text-charcoal-800/50 text-xs tracking-widest uppercase mt-1">Шоурума</p>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative reveal">
              <div className="aspect-[16/9] lg:aspect-[4/5] overflow-hidden">
                <img
                  src="/Hero_bg_image.jpg"
                  alt="Шоурум Костови Комфорт"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-gold-500/40 hidden lg:block" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-gold-500/40 hidden lg:block" />
              <div className="absolute bottom-4 lg:bottom-6 left-0 right-0 mx-4 lg:mx-6">
                <div className="bg-charcoal-900/90 backdrop-blur-sm px-5 py-3">
                  <p className="font-display text-white text-sm italic text-center lg:text-left">Нашият шоурум в Монтана</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14 reveal">
            <p className="font-sans text-gold-600 text-xs tracking-[0.25em] uppercase mb-3">Принципи</p>
            <h2 className="font-display text-4xl lg:text-5xl text-charcoal-900 font-normal mb-4">Нашите Ценности</h2>
            <div className="w-12 h-px bg-gold-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`reveal reveal-delay-${i + 1} bg-white border border-cream-200 p-8 hover:border-gold-500/30 hover:shadow-lg transition-all duration-300`}
              >
                <v.icon size={22} className="text-gold-500 mb-4" />
                <h3 className="font-display text-xl text-charcoal-900 font-medium mb-3">{v.title}</h3>
                <p className="font-sans text-charcoal-800/55 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Distributors */}
      <section className="relative bg-charcoal-900 py-16 lg:py-20 grain-overlay overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="lg:col-span-1 text-center lg:text-left">
              <p className="font-sans text-gold-500/70 text-xs tracking-[0.25em] uppercase mb-2">Партньорство</p>
              <h2 className="font-display text-4xl text-white font-medium mb-3 leading-tight">
                Официални Дистрибутори
              </h2>
              <p className="font-sans text-white/50 text-sm leading-relaxed">
                Гордеем се с дългосрочното ни партньорство с лидерите в бранша, предлагайки ви продукти със световно признато качество и иновации.
              </p>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <a
                href="https://solid55.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-charcoal-900 border border-white/10 hover:border-gold-500/50 p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-white/5 hover:-translate-y-1"
              >
                <p className="font-display text-4xl text-white font-bold mb-1 group-hover:text-gold-400 transition-colors duration-200">
                  Solid<span className="text-gold-500">55</span>
                </p>
                <p className="font-sans text-white/30 text-xs tracking-widest uppercase mb-3">Смарт Врати</p>
                <p className="font-sans text-white/50 text-xs leading-relaxed">
                  Иновативни интелигентни врати с най-съвременни технологии за сигурност и комфорт.
                </p>
              </a>

              <a
                href="https://www.hormann.bg"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-charcoal-900 border border-white/10 hover:border-gold-500/50 p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-white/5 hover:-translate-y-1"
              >
                <p className="font-display text-4xl text-white font-bold mb-1 group-hover:text-gold-400 transition-colors duration-200">Hörmann</p>
                <p className="font-sans text-white/30 text-xs tracking-widest uppercase mb-3">Немско Качество</p>
                <p className="font-sans text-white/50 text-xs leading-relaxed">
                  Германско качество с над 90 години традиция в производството на гаражни и входни врати.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-white py-24 grain-overlay overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center reveal">
          <p className="font-sans text-gold-500/70 text-xs tracking-[0.25em] uppercase mb-3">Свържете се с нас</p>
          <h2 className="font-display text-4xl lg:text-5xl text-black font-normal mb-4">
            Свържете се с нас за консултация
          </h2>
          <div className="w-12 h-px bg-gold-500 mx-auto mb-6" />
          <p className="font-sans text-black/50 text-sm leading-relaxed mb-10 max-w-xl mx-auto">
            Нашият екип е на разположение да отговори на всички ваши въпроси и да ви помогне да вземете най-доброто решение за вашия дом.
          </p>
          <Link to="/contact" className="btn-gold">
            Към Контакти →
          </Link>
        </div>
      </section>
    </>
  );
}
