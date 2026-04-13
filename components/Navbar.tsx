'use client';

import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useLenis } from 'lenis/react';
import type Lenis from 'lenis';
import { Coffee } from 'lucide-react';

const NAV_LINKS: { label: string; target: string }[] = [
  { label: 'Tentang', target: '#tentang' },
  { label: 'Lokasi', target: '#lokasi' },
];

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
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.38);
    y.set((e.clientY - cy) * 0.38);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    if (!lenis) return;
    lenis.scrollTo(target, { offset: -80, duration: 1.2 });
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);

  useLenis((lenis) => {
    lenisRef.current = lenis;
    const { scroll } = lenis;
    const isScrolled = scroll > 50;
    setScrolled(isScrolled);

    if (scroll > 180) {
      setHidden(scroll > lastScrollY.current);
    } else {
      setHidden(false);
    }
    lastScrollY.current = scroll;
  });

  return (
    <motion.nav
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className={[
        'fixed top-4 left-1/2 z-50',
        '-translate-x-1/2',
        'flex items-center gap-6 px-5 py-2.5',
        'rounded-full',
        'transition-all duration-300',
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
        <Coffee
          size={18}
          className="text-amber"
          strokeWidth={2.5}
        />
        <span
          className="font-display font-semibold text-base tracking-tight
                     text-onyx dark:text-parchment"
        >
          SA.<span className="text-amber">TUANG</span>
        </span>
      </button>

      {/* Nav links — hidden on mobile */}
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

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => lenisRef.current?.scrollTo('#menu', { offset: -80, duration: 1.2 })}
        className="animate-amber-pulse px-4 py-2 rounded-full
                   bg-amber text-onyx text-xs font-semibold
                   hover:bg-amber-light transition-colors duration-200
                   border border-amber/60 cursor-pointer text-white"
      >
        Lihat Menu
      </motion.button>
    </motion.nav>
  );
}
