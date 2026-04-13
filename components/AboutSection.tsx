'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Wifi, MapPin, Clock, Coffee, Star } from 'lucide-react';

/* ── Easing ──────────────────────────────────────────────────────────── */
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Fade-up variant with stagger index ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EXPO_OUT, delay: i * 0.1 },
  }),
};

/* ── Data ────────────────────────────────────────────────────────────── */
const HIGHLIGHTS = [
  { icon: Wifi,   label: 'WiFi Kencang',    sub: 'Cocok untuk nugas' },
  { icon: Clock,  label: '08.00 – 22.00',   sub: 'Buka setiap hari' },
  { icon: MapPin, label: '2 Lokasi',         sub: 'Banjar Wijaya & MT. Haryono' },
  { icon: Coffee, label: 'Manual Brew',     sub: 'V60 & pour-over' },
];

const STATS = [
  { value: '2',    label: 'Cabang Aktif' },
  { value: '4.7★', label: 'Rata-rata Rating' },
  { value: '20+',  label: 'Menu Signature' },
  { value: '2022', label: 'Berdiri Sejak' },
];

/* ─────────────────────────────────────────────────────────────────────── */

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden dark:bg-onyx"
      style={{ backgroundColor: '#ffffff' }}
    >

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* ── HEADLINE BLOCK ──────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5
                       glass border border-amber/30 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="text-xs font-medium text-amber tracking-widest uppercase">
              Cerita Kami
            </span>
          </div>

          <h2
            className="font-display font-semibold leading-[1.08] tracking-tight
                       text-[clamp(2rem,5vw,3.8rem)]
                       text-onyx dark:text-parchment max-w-2xl"
          >
            Lebih Dari Sekadar Kopi,{' '}
            <span className="text-amber">Ini Ruang Untuk Ruah.</span>
          </h2>
        </motion.div>

        {/* ── MAIN GRID ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Story ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-8">

            {/* Body copy */}
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={1}
              className="space-y-4"
            >
              <p className="text-base lg:text-lg leading-relaxed text-onyx/65 dark:text-parchment/65">
                Berawal dari satu kedai di Banjar Wijaya, Cipondoh, SA.TUANG
                Coffee Shop tumbuh menjadi dua cabang dengan karakter masing-masing.
                Kini hadir pula SA.TUANG Concept Store di MT. Haryono — ruang yang
                lebih eksperimental dengan konsep lifestyle dan slow bar yang khas.
              </p>
              <p className="text-base lg:text-lg leading-relaxed text-onyx/65 dark:text-parchment/65">
                Dari seduhan manual brew yang otentik hingga racikan signature
                mocktail yang menyegarkan, setiap gelas di SA.TUANG diracik untuk
                menemani setiap suasana hatimu—di mana pun cabang yang kamu kunjungi.
              </p>
            </motion.div>

            {/* Highlights 2×2 */}
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={2}
              className="grid grid-cols-2 gap-3"
            >
              {HIGHLIGHTS.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-2xl
                             glass border border-amber/15
                             hover:border-amber/40 transition-colors duration-200"
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-xl
                               bg-amber/10 dark:bg-amber/15
                               flex items-center justify-center"
                  >
                    <Icon size={15} className="text-amber" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold font-display text-onyx dark:text-parchment">
                      {label}
                    </div>
                    <div className="text-[11px] text-onyx/50 dark:text-parchment/50 mt-0.5 leading-snug">
                      {sub}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={3}
              className="grid grid-cols-4 gap-3 pt-1"
            >
              {STATS.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-display text-xl font-semibold text-amber">
                    {value}
                  </div>
                  <div className="text-[11px] text-onyx/50 dark:text-parchment/50 mt-0.5 leading-snug">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Visual ────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={1}
            className="relative"
          >
            {/* Amber halo */}
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-3xl blur-3xl
                         bg-amber/10 dark:bg-amber/20 pointer-events-none"
            />

            {/* Main photo */}
            <div
              className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden
                         glass border border-amber/20 shadow-2xl shadow-amber/10"
            >
              <Image
                src="/foto-background.png"
                alt="Suasana SA.TUANG Coffee — view area outdoor tribun Banjar Wijaya"
                fill
                className="object-cover"
              />
              {/* Dark gradient for bottom label legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(18,18,18,0.62) 0%, transparent 52%)',
                }}
              />
              {/* Location label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass rounded-2xl px-4 py-2.5 border border-amber/20">
                  <div className="text-xs text-parchment/65 mb-0.5">
                    Area Tribun Outdoor
                  </div>
                  <div className="text-sm font-semibold font-display text-parchment">
                    Banjar Wijaya, Cipondoh
                  </div>
                </div>
              </div>
            </div>

            {/* Floating rating badge */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: -9 }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: 0.4,
              }}
              style={{ willChange: 'transform', backgroundColor: '#ffffff' }}
              className="absolute -top-5 -left-4
                         border border-amber/25 rounded-2xl
                         px-4 py-3 shadow-lg shadow-amber/10 dark:bg-onyx"
            >
              <div className="flex items-center gap-1.5">
                <Star size={13} className="text-amber fill-amber" />
                <span className="font-display font-semibold text-sm text-onyx dark:text-parchment">
                  4.6
                </span>
              </div>
              <div className="text-[10px] text-onyx/50 dark:text-parchment/50 mt-0.5">
                Google Rating
              </div>
            </motion.div>

            {/* Floating WiFi badge */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: -9 }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: 1.1,
              }}
              style={{ willChange: 'transform', backgroundColor: '#ffffff' }}
              className="absolute -bottom-4 -right-4
                         border border-amber/25 rounded-2xl
                         px-4 py-3 shadow-lg shadow-amber/10 dark:bg-onyx"
            >
              <div className="flex items-center gap-2">
                <Wifi size={13} className="text-amber" />
                <span className="text-sm font-semibold font-display text-onyx dark:text-parchment">
                  WiFi Ready
                </span>
              </div>
              <div className="text-[10px] text-onyx/50 dark:text-parchment/50 mt-0.5">
                Cocok untuk nugas
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
