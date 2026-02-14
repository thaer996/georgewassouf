
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import Biography from '../components/Biography';
import Discography from '../components/Discography';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle parallax and reveal animations for sections
    const sections = containerRef.current?.querySelectorAll('section');
    sections?.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <Hero />
      <section id="biography">
        <Biography />
      </section>
      <section id="discography">
        <Discography />
      </section>
      <section id="gallery">
        <Gallery />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </div>
  );
};

export default Home;
