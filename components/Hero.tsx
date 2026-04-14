'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useLenis } from 'lenis/react';
import type Lenis from 'lenis';
import Image from 'next/image';
import { MapPin, Star, ArrowDown, MessageCircle, X } from 'lucide-react';

const WA_NUMBER  = '6287842142997';
const WA_MESSAGE = encodeURIComponent('Halo SA.TUANG! Saya ingin tanya-tanya / reservasi meja.');

/* ── Cubic bezier easing (typed as tuple for Framer Motion v12) ──────── */
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Framer Motion variants ──────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.25 },
  },
};

const lineVariants = {
  hidden: { y: 90, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease: EXPO_OUT },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EXPO_OUT },
  },
};

/* ── Heading lines ───────────────────────────────────────────────────── */
const HEADLINE_LINES = ['Kopi Seduh', 'Untuk Setiap', 'Suasana Hati.'];

export default function Hero() {
  /* Scroll-driven parallax via Lenis (avoids useScroll conflict) */
  const scrollMV = useMotionValue(0);
  const lenisRef = useRef<Lenis | null>(null);
  useLenis((lenis) => {
    lenisRef.current = lenis;
    scrollMV.set(lenis.scroll);
  });

  const [showDialog, setShowDialog] = useState(false);

  const scrollTo = (target: string) => {
    lenisRef.current?.scrollTo(target, { offset: -80, duration: 1.2 });
  };

  const coffeeY = useTransform(scrollMV, [0, 700], ['0%', '-22%']);
  const coffeeRotate = useTransform(scrollMV, [0, 700], [0, -7]);
  const bgBlobsY = useTransform(scrollMV, [0, 700], ['0%', '14%']);

  const springCoffeeY = useSpring(coffeeY, { stiffness: 80, damping: 20 });
  const springRotate = useSpring(coffeeRotate, { stiffness: 80, damping: 20 });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden
                 bg-parchment dark:bg-onyx px-6 pt-28 pb-20"
    >
      {/* ── AURORA BACKGROUND BLOBS (dark mode only) ─────────────────── */}
      <motion.div
        style={{ y: bgBlobsY }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Blob 1 — warm amber */}
        <div
          className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full
                     opacity-0 dark:opacity-100 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(200,121,65,0.38) 0%, transparent 70%)',
            animation: 'aurora-1 18s ease-in-out infinite',
          }}
        />
        {/* Blob 2 — deep brown */}
        <div
          className="absolute -bottom-32 -right-16 w-[500px] h-[500px] rounded-full
                     opacity-0 dark:opacity-100 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(100,58,18,0.32) 0%, transparent 70%)',
            animation: 'aurora-2 24s ease-in-out infinite',
          }}
        />
        {/* Blob 3 — subtle center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[400px] h-[400px] rounded-full
                     opacity-0 dark:opacity-30 blur-2xl"
          style={{
            background:
              'radial-gradient(circle, rgba(200,121,65,0.22) 0%, transparent 70%)',
            animation: 'aurora-3 20s ease-in-out infinite 4s',
          }}
        />
      </motion.div>

      {/* ── MAIN GRID ────────────────────────────────────────────────── */}
      <div
        className="relative z-10 max-w-6xl w-full mx-auto
                   grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
      >
        {/* ── LEFT: Text content ──────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-7"
        >
          {/* Open badge */}
          <motion.div variants={fadeUp}>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                         glass border border-amber/30 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <span className="text-xs font-medium text-amber">
                2 Cabang di Tangerang · Buka Setiap Hari
              </span>
            </div>
          </motion.div>

          {/* Heading — text-reveal masking */}
          <div
            className="font-display text-[clamp(2.6rem,7vw,5rem)] font-semibold
                       leading-[1.06] tracking-tight
                       text-onyx dark:text-parchment"
          >
            {HEADLINE_LINES.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.span
                  variants={lineVariants}
                  className={`block ${
                    i === HEADLINE_LINES.length - 1
                      ? 'text-amber'
                      : ''
                  }`}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-base lg:text-lg leading-relaxed
                       text-onyx/60 dark:text-parchment/60 max-w-md"
          >
            Nikmati signature coffee mocktail dan racikan manual brew terbaik
            di dua lokasi kami — Banjar Wijaya dan MT. Haryono, Tangerang.
          </motion.p>

          {/* USP pills */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-2"
          >
            {[
              { label: 'Signature Mocktails', icon: '☕' },
              { label: 'Premium V60 Brew', icon: '♨' },
              { label: '2 Cabang Tangerang', icon: '📍' },
            ].map(({ label, icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                           text-xs font-medium
                           bg-amber/10 dark:bg-amber/15
                           text-amber-dark dark:text-amber
                           border border-amber/20"
              >
                {icon && <span>{icon}</span>}
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTA row */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('#menu')}
              className="animate-amber-pulse px-7 py-3.5 rounded-full
                         bg-amber font-semibold text-sm
                         hover:bg-amber-light transition-colors duration-200
                         cursor-pointer text-white"
            >
              Lihat Menu
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowDialog(true)}
              className="px-7 py-3.5 rounded-full glass border border-amber/30
                         text-onyx dark:text-parchment font-semibold text-sm
                         hover:border-amber/60 transition-all duration-200
                         cursor-pointer"
            >
              Hubungi Kami
            </motion.button>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-2 text-xs text-onyx/45 dark:text-parchment/45"
          >
            <MapPin size={13} />
            <span>Banjar Wijaya · MT. Haryono, Tangerang</span>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Coffee image + floating elements ──────────────────── */}
        <div className="relative hidden lg:flex justify-center items-center">
          {/* Amber halo */}
          <div
            className="absolute w-80 h-80 rounded-full blur-3xl
                       bg-amber/15 dark:bg-amber/25"
          />

          {/* Coffee image card */}
          <motion.div
            style={{ y: springCoffeeY, rotate: springRotate }}
            className="relative w-[360px] h-[420px] rounded-3xl overflow-hidden
                       glass border border-amber/20 shadow-2xl shadow-amber/10"
          >
            <Image
              src="/foto.webp"
              alt="SA.TUANG Coffee Shop — eksterior malam Banjar Wijaya"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(18,18,18,0.55) 0%, transparent 50%)',
              }}
            />
            {/* Bottom label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div
                className="glass rounded-2xl px-4 py-2.5
                           border border-amber/20"
              >
                <div className="text-xs text-parchment/70 mb-0.5">
                  Signature Series
                </div>
                <div className="text-sm font-semibold text-parchment font-display">
                  Satuang Bken
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating rating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: 'transform', backgroundColor: '#ffffff' }}
            className="absolute -top-4 -right-4
                       border border-amber/25 rounded-2xl
                       px-4 py-3 shadow-lg shadow-amber/10 dark:bg-onyx"
          >
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-amber fill-amber" />
              <span className="font-display font-semibold text-sm text-onyx dark:text-parchment">
                4.8
              </span>
            </div>
            <div className="text-[10px] text-onyx/50 dark:text-parchment/50 mt-0.5">
              Concept Store
            </div>
          </motion.div>

          {/* Floating rating badge – Banjar Wijaya */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -8 }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: 0.8,
            }}
            style={{ willChange: 'transform', backgroundColor: '#ffffff' }}
            className="absolute -bottom-6 -left-8
                       border border-amber/25 rounded-2xl
                       px-4 py-3 shadow-lg shadow-amber/10 dark:bg-onyx"
          >
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-amber fill-amber" />
              <span className="font-display font-semibold text-sm text-onyx dark:text-parchment">
                4.6
              </span>
            </div>
            <div className="text-[10px] text-onyx/50 dark:text-parchment/50 mt-0.5">
              Banjar Wijaya
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ─────────────────────────────────────────── */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 8 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2
                   text-onyx/35 dark:text-parchment/35"
      >
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} />
      </motion.div>

      {/* ── WHATSAPP DIALOG ──────────────────────────────────────────── */}
      <AnimatePresence>
        {showDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowDialog(false)}
              className="fixed inset-0 z-[60] bg-onyx/50 backdrop-blur-sm"
            />

            {/* Dialog card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.25, ease: EXPO_OUT }}
              className="fixed z-[61] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                         w-[calc(100%-2rem)] max-w-sm
                         bg-parchment dark:bg-onyx
                         border border-amber/20 rounded-3xl
                         p-6 shadow-2xl shadow-onyx/30"
            >
              {/* Close */}
              <button
                onClick={() => setShowDialog(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full
                           flex items-center justify-center
                           text-onyx/40 dark:text-parchment/40
                           hover:text-onyx dark:hover:text-parchment
                           hover:bg-onyx/8 transition-colors duration-150 cursor-pointer"
              >
                <X size={15} />
              </button>

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-amber/10 flex items-center justify-center mb-4">
                <MessageCircle size={22} className="text-amber" />
              </div>

              {/* Copy */}
              <h3 className="font-display font-semibold text-lg text-onyx dark:text-parchment mb-1">
                Hubungi SA.TUANG
              </h3>
              <p className="text-sm text-onyx/55 dark:text-parchment/55 leading-relaxed mb-5">
                Kamu akan diarahkan ke WhatsApp untuk chat langsung dengan tim kami. Siap membantu reservasi dan pertanyaan seputar menu.
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDialog(false)}
                  className="flex-1 py-2.5 rounded-full border border-amber/25
                             text-sm font-semibold text-onyx/60 dark:text-parchment/60
                             hover:border-amber/50 transition-colors duration-150 cursor-pointer"
                >
                  Batal
                </button>
                <motion.a
                  href={`https://web.whatsapp.com/send/?phone=${WA_NUMBER}&text&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowDialog(false)}
                  className="flex-1 py-2.5 rounded-full
                             bg-amber text-onyx text-sm font-semibold text-center
                             hover:bg-amber-light transition-colors duration-150 cursor-pointer"
                >
                  Buka WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
