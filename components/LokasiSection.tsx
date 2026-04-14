'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Clock, Car, ExternalLink, MessageCircle, ChevronDown } from 'lucide-react';

/* ── Constants ───────────────────────────────────────────────────────── */
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const WA_NUMBER  = '6287842142997';
const WA_MESSAGE = encodeURIComponent('Halo SA.TUANG! Saya ingin tanya-tanya / reservasi meja.');

/* ── Branch data ─────────────────────────────────────────────────────── */
interface OrderLink {
  platform: string;
  label: string;
  url: string;
  color: string;
  logo: string; // emoji fallback
}

interface Branch {
  id: string;
  name: string;
  badge: string;
  rating: string;
  ratingCount: string;
  address: string;
  addressShort: string;
  area: string;
  hours: string;
  parking: string;
  mapsUrl: string;
  mapsEmbed: string;
  photo: string;
  photoAlt: string;
  orderLinks: OrderLink[];
}

const BRANCHES: Branch[] = [
  {
    id: 'banjar-wijaya',
    name: 'SA.TUANG Coffee',
    badge: 'Cabang Utama',
    rating: '4.6',
    ratingCount: '100+ ulasan',
    address: 'Bulevar Raya Banjar Wijaya Kav. 03, Poris Plawad Indah, Cipondoh, Tangerang 15141',
    addressShort: 'Bulevar Raya Banjar Wijaya Kav. 03',
    area: 'Cipondoh, Tangerang',
    hours: 'Setiap Hari · 09.00 – 23.00 WIB',
    parking: 'Area parkir luas di area ruko bulevar',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=SA.TUANG+Coffee+Banjar+Wijaya+Cipondoh+Tangerang',
    mapsEmbed: 'https://maps.google.com/maps?q=Bulevar+Raya+Banjar+Wijaya+Kav+03+Cipondoh+Tangerang&output=embed&z=16',
    photo: '/foto5.webp',
    photoAlt: 'Tampak depan SA.TUANG Coffee Banjar Wijaya',
    orderLinks: [
      {
        platform: 'GrabFood',
        label: 'GrabFood',
        url: 'https://r.grab.com/g/6-20250624_181601_FB8992F84B6C45EFA8709733CEF3016B_MEXMPS-6-C2NJJGBATYT2L6',
        color: 'bg-[#00B14F] text-white',
        logo: '🟢',
      },
      {
        platform: 'GoFood',
        label: 'GoFood',
        url: 'https://gofood.link/a/BrPhRwG',
        color: 'bg-[#E82529] text-white',
        logo: '🔴',
      },
      {
        platform: 'ShopeeFood',
        label: 'ShopeeFood',
        url: 'https://shopee.co.id/universal-link/now-food/shop/22189004?deep_and_deferred=1&shareChannel=copy_info',
        color: 'bg-[#EE4D2D] text-white',
        logo: '🟠',
      },
    ],
  },
  {
    id: 'mt-haryono',
    name: 'SA.TUANG Concept Store',
    badge: 'Concept Store',
    rating: '4.8',
    ratingCount: 'Rating lebih tinggi',
    address: 'Jl. Mt. Haryono No.32, Sukasari, Kec. Tangerang',
    addressShort: 'Jl. Mt. Haryono No.32',
    area: 'Sukasari, Tangerang',
    hours: 'Setiap Hari · 09.00 – 23.00 WIB',
    parking: 'Tersedia area parkir di sekitar lokasi',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=SA.TUANG+Concept+Store+MT+Haryono+Tangerang',
    mapsEmbed: 'https://maps.google.com/maps?q=Jl+Mt+Haryono+No+32+Sukasari+Tangerang&output=embed&z=16',
    photo: '/foto.webp',
    photoAlt: 'SA.TUANG Concept Store MT. Haryono',
    orderLinks: [
      {
        platform: 'GrabFood',
        label: 'GrabFood',
        url: 'https://r.grab.com/g/6-20250624_181804_FB8992F84B6C45EFA8709733CEF3016B_MEXMPS-6-C6LDECK3TKKJLE',
        color: 'bg-[#00B14F] text-white',
        logo: '🟢',
      },
      {
        platform: 'GoFood',
        label: 'GoFood',
        url: 'https://gofood.link/a/LSw4abq',
        color: 'bg-[#E82529] text-white',
        logo: '🔴',
      },
      {
        platform: 'ShopeeFood',
        label: 'ShopeeFood',
        url: 'https://shopee.co.id/universal-link/now-food/shop/22220482?deep_and_deferred=1&shareChannel=copy_link',
        color: 'bg-[#EE4D2D] text-white',
        logo: '🟠',
      },
    ],
  },
];

/* ── Animation variants ──────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EXPO_OUT, delay: i * 0.1 },
  }),
};

/* ── Branch Card ─────────────────────────────────────────────────────── */
function BranchCard({ branch, inView, index }: { branch: Branch; inView: boolean; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={index + 1}
      className="rounded-3xl overflow-hidden glass border border-amber/15
                 shadow-lg shadow-amber/5"
    >
      {/* Map */}
      <div
        data-lenis-prevent
        className="relative w-full h-52 overflow-hidden"
      >
        <iframe
          src={branch.mapsEmbed}
          title={`Lokasi ${branch.name}`}
          className="absolute inset-0 w-full h-full"
          style={{ border: 0, filter: 'contrast(1.05) saturate(0.85)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />

        {/* Branch badge overlay */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-white
                           bg-amber">
            {branch.badge}
          </span>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3
                        bg-white dark:bg-onyx rounded-xl px-2.5 py-1.5
                        border border-amber/20 shadow-md">
          <div className="flex items-center gap-1">
            <span className="text-amber text-xs">★</span>
            <span className="font-display font-semibold text-xs text-onyx dark:text-parchment">
              {branch.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          <h3 className="font-display font-semibold text-lg text-onyx dark:text-parchment leading-tight">
            {branch.name}
          </h3>
          <div className="flex items-start gap-1.5 mt-1.5">
            <MapPin size={12} className="text-amber shrink-0 mt-0.5" />
            <span className="text-xs text-onyx/55 dark:text-parchment/55 leading-snug">
              {branch.addressShort} · {branch.area}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock size={12} className="text-amber shrink-0" />
            <span className="text-xs text-onyx/55 dark:text-parchment/55">
              {branch.hours}
            </span>
          </div>
        </div>

        {/* Order links */}
        <div>
          <p className="text-[10px] font-semibold text-amber uppercase tracking-widest mb-2">
            Pesan Online
          </p>
          <div className="flex flex-wrap gap-2">
            {branch.orderLinks.map((link) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full
                            text-xs font-semibold cursor-pointer
                            transition-opacity duration-150 hover:opacity-90
                            ${link.color}`}
              >
                {link.label}
                <ExternalLink size={10} className="opacity-75" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Expand / collapse full address */}
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs text-onyx/45 dark:text-parchment/45
                       hover:text-amber transition-colors duration-150 cursor-pointer"
          >
            <span>{expanded ? 'Sembunyikan' : 'Lihat alamat lengkap'}</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={13} />
            </motion.span>
          </button>
          <AnimatePresence>
            {expanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="text-xs text-onyx/55 dark:text-parchment/55 leading-relaxed mt-2 overflow-hidden"
              >
                {branch.address}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Maps CTA */}
        <motion.a
          href={branch.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2
                     py-2.5 rounded-full
                     border border-amber/30
                     text-xs font-semibold text-onyx dark:text-parchment
                     hover:border-amber/60 hover:bg-amber/5
                     transition-all duration-150 cursor-pointer"
        >
          <MapPin size={13} className="text-amber" />
          Buka di Google Maps
          <ExternalLink size={11} className="opacity-50" />
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

export default function LokasiSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="lokasi"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden
                 bg-parchment-dark/40 dark:bg-onyx/95"
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #C87941 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5
                         glass border border-amber/30 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" />
            <span className="text-xs font-medium text-amber tracking-widest uppercase">
              Lokasi Kami
            </span>
          </div>

          <h2 className="font-display font-semibold leading-[1.08] tracking-tight
                         text-[clamp(2rem,5vw,3.8rem)]
                         text-onyx dark:text-parchment max-w-2xl">
            Mampir dan{' '}
            <span className="text-amber">Seduh Bersama Kami.</span>
          </h2>
          <p className="mt-3 text-base text-onyx/55 dark:text-parchment/55 max-w-lg">
            Dua lokasi strategis di Tangerang — atau pesan langsung dari rumah lewat aplikasi favoritmu.
          </p>
        </motion.div>

        {/* Two branch cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {BRANCHES.map((branch, i) => (
            <BranchCard key={branch.id} branch={branch} inView={inView} index={i} />
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={3}
          className="mt-8 flex justify-center"
        >
          <motion.a
            href={`https://web.whatsapp.com/send/?phone=${WA_NUMBER}&text&type=phone_number&app_absent=0`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-7 py-3 rounded-full text-white
                       bg-amber font-semibold text-sm
                       hover:bg-amber-light transition-colors duration-200 cursor-pointer"
          >
            <MessageCircle size={16} />
            Tanya via WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
