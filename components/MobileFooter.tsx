'use client';

import { motion } from 'framer-motion';
import { MessageCircle, MapPin } from 'lucide-react';
import { useLenis } from 'lenis/react';

const WA_NUMBER = '6287842142997';
const WA_MESSAGE = encodeURIComponent(
  'Halo SA.TUANG! Saya ingin tanya-tanya / berkunjung ke salah satu cabang.'
);

export default function MobileFooter() {
  const lenis = useLenis();

  return (
    <motion.div
      initial={{ y: 110, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe"
    >
      <div
        className="mx-3 mb-3 px-4 py-3
                   glass border border-amber/20
                   rounded-2xl shadow-xl shadow-amber/10
                   flex items-center gap-3"
      >
        {/* WhatsApp CTA */}
        <a
          href={`https://web.whatsapp.com/send/?phone=${WA_NUMBER}&text&type=phone_number&app_absent=0`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2
                     py-3 rounded-xl
                     bg-[#25D366] text-white
                     text-sm font-semibold
                     active:scale-95 transition-transform duration-150"
        >
          <MessageCircle size={16} strokeWidth={2.5} />
          WhatsApp
        </a>

        {/* Divider */}
        <div className="w-px h-8 bg-amber/20 shrink-0" />

        {/* Lokasi CTA */}
        <button
          onClick={() => lenis?.scrollTo('#lokasi', { offset: -80, duration: 1.2 })}
          className="flex flex-1 items-center justify-center gap-2
                     py-3 rounded-xl
                     bg-amber 
                     text-sm font-semibold
                     animate-amber-pulse
                     active:scale-95 transition-transform duration-150
                     cursor-pointer text-white"
        >
          <MapPin size={16} strokeWidth={2.5} />
          Lokasi
        </button>
      </div>
    </motion.div>
  );
}
