'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

/* ── Review data ─────────────────────────────────────────────────────── */
interface Review {
  name: string;
  handle: string;
  text: string;
  rating: number;
  avatar: string;
}

const REVIEWS: Review[] = [
  {
    name: 'Rizky Pratama',
    handle: '@rizkyp_jkt',
    text: 'Kopi mocktail-nya juara, tempatnya enak buat WFC! Moonlight cold brew-nya bikin nagih banget.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
  {
    name: 'Anisa Dewi',
    handle: '@anisadewi_',
    text: 'V60 manual brew mantap, harga sangat bersahabat di Cipondoh. Salah satu cafe terbaik di area Tangerang!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name: 'Budi Santoso',
    handle: '@budis_works',
    text: 'Satuang Bken adalah kopi susu terenak yang pernah saya coba. Gula arennya terasa natural, tidak terlalu manis.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    name: 'Sari Indah',
    handle: '@sariindahhh',
    text: 'Mix Platter-nya sempurna untuk nemenin ngopi sore. Suasana cafe-nya cozy banget, recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
  {
    name: 'Dimas Arya',
    handle: '@dimasarya21',
    text: 'Pertama kali coba V60 Premium Beans di sini, langsung jatuh cinta. Biji kopinya terasa premium banget!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
  },
  {
    name: 'Maya Putri',
    handle: '@mayaputri_',
    text: 'Tempat WFC favorit baru! WiFi kenceng, kopi enak, dan staffnya ramah. Pasti balik lagi.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
];

/* ── Star rating ─────────────────────────────────────────────────────── */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="text-amber fill-amber" />
      ))}
    </div>
  );
}

/* ── Review card ─────────────────────────────────────────────────────── */
function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="shrink-0 w-72 sm:w-80 mx-3
                 glass border border-amber/12
                 rounded-2xl p-5 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <StarRating count={review.rating} />
        <Quote size={16} className="text-amber/40" />
      </div>
      <p className="text-sm text-onyx/78 dark:text-parchment/78 leading-relaxed italic flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-amber/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={review.avatar}
          alt={review.name}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full object-cover border border-amber/25"
        />
        <div>
          <div className="text-sm font-semibold text-onyx dark:text-parchment leading-tight">
            {review.name}
          </div>
          <div className="text-xs text-onyx/45 dark:text-parchment/45">
            {review.handle}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────── */
export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  /* Duplicate for seamless loop */
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden
                 bg-parchment-dark/40 dark:bg-onyx/95"
    >
      {/* Decorative amber blob */}
      <div
        className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full
                   opacity-[0.06] dark:opacity-[0.08] blur-3xl pointer-events-none
                   bg-amber"
      />

      <div className="max-w-6xl mx-auto px-6 mb-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full
                          border border-amber/25 bg-amber/8">
            <span className="text-xs font-semibold text-amber uppercase tracking-[0.18em]">
              Testimoni
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5vw,3.75rem)]
                       text-onyx dark:text-parchment leading-tight"
          >
            Kata <span className="text-amber">Mereka</span>
          </h2>
          <p className="mt-3 text-base text-onyx/55 dark:text-parchment/55 max-w-md">
            Lebih dari ratusan pelanggan telah merasakan keunikan setiap seduhan kami.
          </p>
        </motion.div>
      </div>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <div
        className="relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="flex animate-marquee w-max py-3">
          {doubled.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="max-w-6xl mx-auto px-6 mt-12"
      >
        <div
          className="glass border border-amber/15 rounded-3xl
                     p-7 grid grid-cols-3 gap-6 text-center"
        >
          {[
            { value: '4.6', label: 'Rating Rata-rata', suffix: '/5' },
            { value: '500', label: 'Pelanggan Puas', suffix: '+' },
            { value: '4', label: 'Tahun Melayani', suffix: 'th' },
          ].map(({ value, label, suffix }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="font-display font-semibold text-3xl text-amber">
                {value}
                <span className="text-lg">{suffix}</span>
              </div>
              <div className="text-xs text-onyx/55 dark:text-parchment/55">
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
