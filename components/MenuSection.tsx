'use client';

import { useRef, useCallback, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import Image from 'next/image';
import { ShoppingBag, Flame, Sparkles, Leaf, X } from 'lucide-react';

/* ── Menu data ───────────────────────────────────────────────────────── */
interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  tag: string;
  tagColor: string;
  image: string;
  icon: React.ElementType;
  span: 'normal' | 'wide' | 'tall';
}

const MENU: MenuItem[] = [
  {
    id: 'satuang-bken',
    name: 'Satuang Bken',
    tagline: 'Signature',
    description:
      'Kopi Susu Gula Aren dengan perpaduan sempurna antara espresso dan manisnya gula aren pilihan.',
    price: 'Rp 25.000',
    tag: 'Best Seller',
    tagColor: 'bg-amber text-onyx',
    image: '/foto7.jpg',
    icon: Flame,
    span: 'tall',
  },
  {
    id: 'moonlight',
    name: 'Moonlight',
    tagline: 'Coffee Mocktail',
    description: 'Perpaduan cold brew, peach, dan lime yang segar dan unik.',
    price: 'Rp 30.000',
    tag: 'New',
    tagColor: 'bg-emerald-500 text-white',
    image: '/foto1.webp',
    icon: Sparkles,
    span: 'normal',
  },
  {
    id: 'v60-premium',
    name: 'V60 Premium Beans',
    tagline: 'Japanese / Hot',
    description:
      'Single origin premium beans diseduh V60, nuansa floral dan fruity yang kaya.',
    price: 'Rp 40.000',
    tag: 'Premium',
    tagColor: 'bg-violet-500 text-white',
    image: '/foto2.webp',
    icon: Leaf,
    span: 'normal',
  },
  {
    id: 'mix-platter',
    name: 'Mix Platter',
    tagline: 'Food',
    description:
      'Kentang goreng, nugget, dan sosis — teman sempurna untuk sesi ngopi santai.',
    price: 'Rp 30.000',
    tag: 'Food',
    tagColor: 'bg-orange-400 text-onyx',
    image: '/foto3.webp',
    icon: ShoppingBag,
    span: 'wide',
  },
];

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Menu Detail Modal ───────────────────────────────────────────────── */
function MenuModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const Icon = item.icon;

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-onyx/60 backdrop-blur-sm"
        />

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 24 }}
          transition={{ duration: 0.3, ease: EXPO_OUT }}
          className="fixed z-[61] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[calc(100%-2rem)] max-w-md
                     bg-parchment dark:bg-onyx
                     rounded-3xl overflow-hidden
                     shadow-2xl shadow-onyx/40
                     border border-amber/15"
        >
          {/* Image */}
          <div className="relative w-full h-56 sm:h-64">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 448px"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(18,18,18,0.55) 0%, transparent 50%)',
              }}
            />
            {/* Tag */}
            <div
              className={`absolute top-3 left-4 px-2.5 py-1 rounded-full
                          text-[11px] font-semibold ${item.tagColor}`}
            >
              {item.tag}
            </div>
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full
                         bg-onyx/50 backdrop-blur-sm
                         flex items-center justify-center
                         text-parchment hover:bg-onyx/70
                         transition-colors duration-150 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Icon size={13} className="text-amber" strokeWidth={2.5} />
              <span className="text-[10px] font-semibold text-amber uppercase tracking-widest">
                {item.tagline}
              </span>
            </div>

            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display font-semibold text-2xl text-onyx dark:text-parchment leading-tight">
                {item.name}
              </h3>
              <span className="font-display font-semibold text-xl text-amber shrink-0">
                {item.price}
              </span>
            </div>

            <p className="text-sm text-onyx/60 dark:text-parchment/60 leading-relaxed">
              {item.description}
            </p>

            <button
              onClick={onClose}
              className="mt-2 w-full py-3 rounded-full
                         border border-amber/30 text-onyx dark:text-parchment
                         text-sm font-semibold
                         hover:border-amber/60 transition-colors duration-150 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}

/* ── Individual card ─────────────────────────────────────────────────── */
function MenuCard({
  item,
  index,
  onOpen,
}: {
  item: MenuItem;
  index: number;
  onOpen: (item: MenuItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
  }, []);

  /* 3D tilt */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    stiffness: 160,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    stiffness: 160,
    damping: 22,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      cardRef.current.style.setProperty('--spotlight-x', `${e.clientX - rect.left}px`);
      cardRef.current.style.setProperty('--spotlight-y', `${e.clientY - rect.top}px`);
    },
    [isTouch, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const inView = useInView(cardRef, { once: true, margin: '-70px' });
  const Icon = item.icon;

  const imgHeight =
    item.span === 'tall'
      ? 'h-52 sm:h-64'
      : item.span === 'wide'
      ? 'h-44'
      : 'h-40';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      style={isTouch ? {} : { rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(item)}
      className={[
        'spotlight-card tilt-card group relative flex flex-col',
        'rounded-3xl overflow-hidden cursor-pointer',
        'glass border border-parchment-dark/10 dark:border-amber/10',
        'transition-shadow duration-300',
        'hover:shadow-2xl hover:shadow-amber/10',
        'h-full',
      ].join(' ')}
    >
      {/* Image */}
      <div className={`relative w-full overflow-hidden shrink-0 ${imgHeight}`}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(18,18,18,0.45) 0%, transparent 55%)',
          }}
        />
        <div
          className={`absolute top-3 right-3 px-2.5 py-1 rounded-full
                      text-[11px] font-semibold ${item.tagColor}`}
        >
          {item.tag}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        <div className="flex items-center gap-2">
          <Icon size={13} className="text-amber" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold text-amber uppercase tracking-widest">
            {item.tagline}
          </span>
        </div>
        <h3 className="font-display font-semibold text-xl text-onyx dark:text-parchment leading-tight">
          {item.name}
        </h3>
        <p className="text-sm text-onyx/58 dark:text-parchment/58 leading-relaxed flex-1">
          {item.description}
        </p>
        <div className="flex items-center pt-3 mt-auto border-t border-amber/10">
          <span className="font-display font-semibold text-lg text-amber">
            {item.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────── */
export default function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [selected, setSelected] = useState<MenuItem | null>(null);

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative py-28 px-6 bg-parchment dark:bg-onyx overflow-hidden"
    >
      {/* Subtle background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(200,121,65,1) 0px, rgba(200,121,65,1) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(200,121,65,1) 0px, rgba(200,121,65,1) 1px, transparent 1px, transparent 48px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full
                          border border-amber/25 bg-amber/8">
            <span className="text-xs font-semibold text-amber uppercase tracking-[0.18em]">
              Menu Pilihan
            </span>
          </div>
          <h2
            className="font-display font-semibold text-[clamp(2rem,5vw,3.75rem)]
                       text-onyx dark:text-parchment leading-tight"
          >
            Yang Kami{' '}
            <span className="text-amber">Sajikan</span>
          </h2>
          <p className="mt-3 text-base text-onyx/55 dark:text-parchment/55 max-w-md">
            Setiap cangkir dibuat dengan penuh perhatian, dari biji kopi
            pilihan hingga sajian yang memanjakan lidah.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          <div className="sm:row-span-2 lg:row-span-2">
            <MenuCard item={MENU[0]} index={0} onOpen={setSelected} />
          </div>
          <MenuCard item={MENU[1]} index={1} onOpen={setSelected} />
          <MenuCard item={MENU[2]} index={2} onOpen={setSelected} />
          <div className="sm:col-span-1 lg:col-span-2">
            <MenuCard item={MENU[3]} index={3} onOpen={setSelected} />
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <MenuModal item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
