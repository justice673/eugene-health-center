import React from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
import Footer from '@/components/Footer';

/**
 * About Page
 * Comprehensive information about the healthcare center
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <main className="w-full pt-20">
        <About />
      </main>
      <Footer />
    </div>
  );
}

