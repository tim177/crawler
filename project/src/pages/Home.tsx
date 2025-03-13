import { PageTransition } from '../components/PageTransition';
import { HeroSection } from '../components/home/HeroSection';

export function Home() {
  return (
    <PageTransition>
      <HeroSection />
    </PageTransition>
  );
}