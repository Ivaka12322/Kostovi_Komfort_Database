import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    let observer: IntersectionObserver;
    let idleId: number;

    const setup = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
      );

      document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
      });
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(setup);
    } else {
      // Small timeout ensures the new page's DOM has been painted
      const t = setTimeout(setup, 50);
      return () => clearTimeout(t);
    }

    return () => {
      if (idleId) cancelIdleCallback(idleId);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return null;
}

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <RevealObserver />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer topBorder={pathname === '/about'} />
    </>
  );
}
