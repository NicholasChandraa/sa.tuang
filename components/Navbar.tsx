'use client';

import { useRef, useState } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import type Lenis from 'lenis';
import { Coffee, Menu, X } from 'lucide-react';

const NAV_LINKS: { label: string; target: string }[] = [
  { label: 'Menu', target: '#menu' },
  { label: 'Tentang', target: '#tentang' },
  { label: 'Lokasi', target: '#lokasi' },
];

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Magnetic link (desktop) ─────────────────────────────────────────── */
function MagneticLink({
  label,
  target,
  lenis,
}: {
  label: string;
  target: string;
  lenis: Lenis | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 18 });
  const y = useSpring(0, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.38);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.38);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const handleClick = () => {
    lenis?.scrollTo(target, { offset: -80, duration: 1.2 });
  };

  return (
    <motion.span
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative text-sm font-medium cursor-pointer
                 text-onyx/70 dark:text-parchment/70
                 hover:text-amber dark:hover:text-amber
                 transition-colors duration-200 select-none"
    >
      {label}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const lenisRef    = useRef<Lenis | null>(null);

  useLenis((lenis) => {
    lenisRef.current = lenis;
    const { scroll } = lenis;
    setScrolled(scroll > 50);
    if (scroll > 180) {
      setHidden(scroll > lastScrollY.current);
    } else {
      setHidden(false);
    }
    lastScrollY.current = scroll;
  });

  const scrollTo = (target: string) => {
    lenisRef.current?.scrollTo(target, { offset: -80, duration: 1.2 });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── NAVBAR BAR ─────────────────────────────────────────────────── */}
      <motion.nav
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className={[
          'fixed top-4 left-1/2 z-50 -translate-x-1/2',
          'flex items-center gap-4 px-4 py-2.5',
          'rounded-full transition-all duration-300',
          scrolled
            ? 'glass shadow-lg shadow-amber/10'
            : 'bg-parchment/80 dark:bg-onyx/60 border border-amber/10',
        ].join(' ')}
      >
        {/* Logo */}
        <button
          onClick={() => lenisRef.current?.scrollTo(0, { duration: 1.2 })}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Coffee size={18} className="text-amber" strokeWidth={2.5} />
          <span className="font-display font-semibold text-base tracking-tight
                           text-onyx dark:text-parchment">
            SA.<span className="text-amber">TUANG</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <MagneticLink
              key={link.label}
              label={link.label}
              target={link.target}
              lenis={lenisRef.current}
            />
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => scrollTo('#menu')}
          className="hidden md:block animate-amber-pulse px-4 py-2 rounded-full
                     bg-amber text-xs font-semibold
                     hover:bg-amber-light transition-colors duration-200
                     border border-amber/60 cursor-pointer text-white"
        >
          Lihat Menu
        </motion.button>

        {/* Mobile hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden w-8 h-8 flex items-center justify-center
                     rounded-full text-onyx dark:text-parchment
                     hover:bg-amber/10 transition-colors duration-150 cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={17} /> : <Menu size={17} />}
        </motion.button>
      </motion.nav>

      {/* ── MOBILE DROPDOWN ────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 md:hidden"
            />

            {/* Dropdown panel */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: EXPO_OUT }}
              className="fixed top-[4.5rem] left-1/2 -translate-x-1/2 z-50 md:hidden
                         w-[calc(100%-2rem)] max-w-sm
                         bg-parchment dark:bg-onyx
                         border border-amber/15 rounded-2xl
                         shadow-xl shadow-amber/10 overflow-hidden"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2, ease: EXPO_OUT }}
                  onClick={() => scrollTo(link.target)}
                  className="w-full flex items-center px-5 py-4
                             text-sm font-medium text-onyx dark:text-parchment
                             hover:bg-amber/8 hover:text-amber
                             border-b border-amber/8 last:border-0
                             transition-colors duration-150 cursor-pointer text-left"
                >
                  {link.label}
                </motion.button>
              ))}

              {/* Mobile CTA */}
              <div className="p-3">
                <button
                  onClick={() => scrollTo('#menu')}
                  className="w-full py-3 rounded-xl
                             bg-amber text-sm font-semibold
                             hover:bg-amber-light transition-colors duration-150
                             cursor-pointer animate-amber-pulse text-white"
                >
                  Lihat Menu
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
