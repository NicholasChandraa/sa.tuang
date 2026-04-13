import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MenuSection from '@/components/MenuSection';
import AboutSection from '@/components/AboutSection';
import SocialProof from '@/components/SocialProof';
import LokasiSection from '@/components/LokasiSection';
import MobileFooter from '@/components/MobileFooter';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MenuSection />
        <AboutSection />
        <SocialProof />
        <LokasiSection />
      </main>
      <MobileFooter />
    </>
  );
}
