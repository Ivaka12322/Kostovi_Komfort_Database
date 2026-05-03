import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, ChevronRight, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Location = 'montana' | 'kozloduy';

const mapUrls: Record<Location, string> = {
  montana:
    'https://maps.google.com/maps?q=%D1%83%D0%BB.+%D0%9A%D0%BB%D0%B8%D0%BC%D0%B5%D0%BD%D1%82+%D0%9E%D1%85%D1%80%D0%B8%D0%B4%D1%81%D0%BA%D0%B8+10,+%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%BD%D0%B0,+%D0%91%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F&t=m&z=16&output=embed&iwloc=near',
  kozloduy:
    'https://maps.google.com/maps?q=%D0%B6.%D0%BA.+2%D0%90,+%D0%91%D0%BB%D0%BE%D0%BA+79,+%D0%9A%D0%BE%D0%B7%D0%BB%D0%BE%D0%B4%D1%83%D0%B9,+%D0%91%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F&t=m&z=16&output=embed&iwloc=near',
};

export default function ContactPage() {
  const [activeLocation, setActiveLocation] = useState<Location>('montana');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalMessage = form.subject ? `Относно: ${form.subject}\n\n${form.message}` : form.message;
      const { error } = await supabase.from('inquiries').insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: finalMessage,
        }
      ]);
      
      if (error) {
        console.error('Error inserting inquiry:', error);
        alert('Възникна грешка при изпращане на запитването.');
        return;
      }
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Възникна грешка при изпращане на запитването.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden flex items-end min-h-[320px]">
        <div className="absolute inset-0">
          <img
            src="/contact_us_hero.jpg"
            alt="Свържете се с нас"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/80 via-charcoal-900/70 to-charcoal-900/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full text-center lg:text-left">
          <p className="font-sans text-gold-400 text-xs tracking-[0.25em] uppercase mb-3">Контакти</p>
          <h1 className="font-display text-5xl lg:text-6xl text-white font-normal mb-4">
            Свържете се с нас
          </h1>
          <div className="w-12 h-px bg-gold-500 mb-5 mx-auto lg:mx-0" />
          <p className="font-sans text-white/60 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
            Ние сме тук, за да отговорим на вашите въпроси и да ви помогнем да изберете най-доброто решение за вашия дом.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="bg-cream-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              {/* Contact info card */}
              <div className="bg-white border border-cream-200 p-7">
                <h2 className="font-display text-2xl text-charcoal-900 font-medium mb-6">
                  Контактна Информация
                </h2>

                <div className="space-y-5">
                  <a
                    href="mailto:kostovi_komfort@abv.bg"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-8 h-8 border border-gold-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-500/10 transition-colors duration-200">
                      <Mail size={14} className="text-gold-500" />
                    </div>
                    <div>
                      <p className="font-sans text-charcoal-800/40 text-xs tracking-widest uppercase mb-0.5">Имейл</p>
                      <p className="font-sans text-charcoal-800 text-sm group-hover:text-gold-600 transition-colors duration-200">
                        kostovi_komfort@abv.bg
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                      <Phone size={14} className="text-gold-500" />
                    </div>
                    <div>
                      <p className="font-sans text-charcoal-800/40 text-xs tracking-widest uppercase mb-0.5">Телефони</p>
                      <a href="tel:+359886799228" className="block font-sans text-charcoal-800 text-sm hover:text-gold-600 transition-colors duration-200">
                        0886 799 228
                      </a>
                      <a href="tel:+359887740546" className="block font-sans text-charcoal-800 text-sm hover:text-gold-600 transition-colors duration-200">
                        0887 740 546
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-gold-500" />
                    </div>
                    <div>
                      <p className="font-sans text-charcoal-800/40 text-xs tracking-widest uppercase mb-1">Локации</p>
                      <button
                        onClick={() => setActiveLocation('montana')}
                        className={`block text-left w-full group mb-2 p-2 -ml-2 transition-colors duration-200 ${activeLocation === 'montana' ? 'bg-gold-500/8' : 'hover:bg-cream-100'}`}
                      >
                        <p className={`font-sans text-sm font-medium ${activeLocation === 'montana' ? 'text-gold-600' : 'text-charcoal-800'} transition-colors duration-200`}>
                          Монтана
                        </p>
                        <p className="font-sans text-charcoal-800/50 text-xs">ул. „Климент Охридски" №10</p>
                      </button>
                      <button
                        onClick={() => setActiveLocation('kozloduy')}
                        className={`block text-left w-full group p-2 -ml-2 transition-colors duration-200 ${activeLocation === 'kozloduy' ? 'bg-gold-500/8' : 'hover:bg-cream-100'}`}
                      >
                        <p className={`font-sans text-sm font-medium ${activeLocation === 'kozloduy' ? 'text-gold-600' : 'text-charcoal-800'} transition-colors duration-200`}>
                          Козлодуй
                        </p>
                        <p className="font-sans text-charcoal-800/50 text-xs">ж.к. 2А, Блок 79 (партер)</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Working hours card */}
              <div className="bg-white border border-cream-200 p-7">
                <div className="flex items-center gap-3 mb-5">
                  <Clock size={16} className="text-gold-500" />
                  <h3 className="font-display text-xl text-charcoal-900 font-medium">Работно Време</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: 'Понеделник – Петък', hours: '09:00 – 18:00' },
                    { day: 'Събота', hours: '10:00 – 14:00' },
                    { day: 'Неделя', hours: 'Почивен ден' },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="font-sans text-charcoal-800/60 text-sm">{day}</span>
                      <span className={`font-sans text-sm font-medium ${hours === 'Почивен ден' ? 'text-red-400' : 'text-charcoal-900'}`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-cream-200 p-7 lg:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <CheckCircle size={48} className="text-gold-500 mb-5" />
                    <h3 className="font-display text-3xl text-charcoal-900 font-normal mb-3">
                      Съобщението е изпратено!
                    </h3>
                    <p className="font-sans text-charcoal-800/55 text-sm leading-relaxed max-w-sm">
                      Благодарим ви за запитването. Ще се свържем с вас в рамките на работния ден.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', subject: '', message: '' }); }}
                      className="mt-8 btn-outline-gold"
                    >
                      Ново запитване
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl text-charcoal-900 font-medium mb-2">
                      Изпратете ни запитване
                    </h2>
                    <p className="font-sans text-charcoal-800/50 text-xs mb-7 leading-relaxed">
                      Попълнете формата и ние ще се свържем с вас.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-sans text-xs text-charcoal-800/60 tracking-widest uppercase mb-1.5">
                            Име и Фамилия *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Вашето ime"
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="block font-sans text-xs text-charcoal-800/60 tracking-widest uppercase mb-1.5">
                            Телефон
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="0888 123 456"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-sans text-xs text-charcoal-800/60 tracking-widest uppercase mb-1.5">
                          Имейл *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="вашият@email.com"
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-xs text-charcoal-800/60 tracking-widest uppercase mb-1.5">
                          Относно
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className="form-input"
                        >
                          <option value="">Изберете тема на запитването</option>
                          <option value="Входни врати">Входни врати</option>
                          <option value="Интериорни врати">Интериорни врати</option>
                          <option value="Гаражни врати">Гаражни врати</option>
                          <option value="Други врати">Други врати</option>
                          <option value="Общ въпрос">Общ въпрос</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-sans text-xs text-charcoal-800/60 tracking-widest uppercase mb-1.5">
                          Съобщение *
                        </label>
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Как можем да ви помогнем?"
                          className="form-input resize-none"
                        />
                      </div>

                      <button type="submit" className="btn-gold flex items-center gap-2">
                        Изпрати Запитване
                        <ChevronRight size={14} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="bg-white border border-cream-200 overflow-hidden">
            <div className="p-6 border-b border-cream-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="font-display text-2xl text-charcoal-900 font-medium">Нашите Шоуруми</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveLocation('montana')}
                  className={`font-sans text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-200 ${
                    activeLocation === 'montana'
                      ? 'bg-gold-500 border-gold-500 text-charcoal-900'
                      : 'border-cream-200 text-charcoal-800/60 hover:border-gold-500/50'
                  }`}
                >
                  Монтана
                </button>
                <button
                  onClick={() => setActiveLocation('kozloduy')}
                  className={`font-sans text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-200 ${
                    activeLocation === 'kozloduy'
                      ? 'bg-gold-500 border-gold-500 text-charcoal-900'
                      : 'border-cream-200 text-charcoal-800/60 hover:border-gold-500/50'
                  }`}
                >
                  Козлодуй
                </button>
              </div>
            </div>

            <div className="relative h-96 lg:h-[480px] bg-charcoal-800">
              <iframe
                key={activeLocation}
                src={mapUrls[activeLocation]}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Шоурум ${activeLocation === 'montana' ? 'Монтана' : 'Козлодуй'}`}
                className="w-full h-full"
              />
            </div>

            <div className="p-5 bg-cream-50 flex items-center gap-3">
              <MapPin size={14} className="text-gold-500 flex-shrink-0" />
              <p className="font-sans text-charcoal-800/60 text-sm">
                {activeLocation === 'montana'
                  ? 'гр. Монтана, ул. „Климент Охридски" №10'
                  : 'гр. Козлодуй'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
