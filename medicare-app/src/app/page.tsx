import { Navbar } from '@/components/layout/navbar';
import {
  Hero,
  ValueBar,
  Features,
  Demo,
  Roles,
  Alerts,
  FinalCTA,
  Footer,
} from '@/components/landing';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ValueBar />
      <section id="features">
        <Features />
      </section>
      <Demo />
      <section id="about">
        <Roles />
      </section>
      <Alerts />
      <FinalCTA />
      <Footer />
    </div>
  );
}
