import React from 'react';
import Header from '@/components/Header';
import Section1 from '@/components/content/section1';
import Section2 from '@/components/content/section2';
import Section3 from '@/components/content/section3';
import Section4 from '@/components/content/section4';
import Section5 from '@/components/content/section5';

const Page = () => {
  return (
    <main className="relative">
      <Header />
      
      {/* The Header.tsx scrollspy looks for these specific IDs.
        We wrap each component in a section tag with the matching id.
      */}
      
      <section id="section-1">
        <Section1 />
      </section>

      <section id="section-2">
        <Section2 />
      </section>

      <section id="section-3">
        <Section3 />
      </section>

      <section id="section-4">
        <Section4 />
      </section>

      <section id="section-5">
        <Section5 />
      </section>

    </main>
  );
};

export default Page;