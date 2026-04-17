import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Doctors from '@/components/Doctors';
import Footer from '@/components/Footer';

/**
 * Home Page
 * Main landing page for the healthcare website
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="w-full">
        <Hero />
        <Services />
        <About />
        <Doctors />
      </main>
      <Footer />
    </div>
  );
}
