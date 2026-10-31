import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { FiClock, FiAward, FiArrowRight, FiShield, FiHeart } from 'react-icons/fi';

const SLIDES = [
  {
    title: 'The Royal Banarasi & Kanjivaram Edit',
    subtitle: 'Woven with pure gold tested zari and imperial craftsmanship from ancient looms of Kashi and Kanchipuram.',
    tag: 'Festive & Wedding Splendor',
    cta: 'Explore Pure Silks',
    category: 'Banarasi Silk',
    bgImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=85',
    featureBadge: '100% Silk Mark Certified'
  },
  {
    title: 'Hold Your Dream Saree for 5 Days',
    subtitle: 'Chandra’s Collection signature pre-booking privilege. Reserve handcrafted heirloom sarees for 5 days with zero deposit.',
    tag: 'Complimentary Pre-Booking',
    cta: 'Browse & Pre-book',
    category: 'All Sarees',
    bgImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=85',
    featureBadge: 'Free 5-Day Reservation'
  },
  {
    title: 'Gossamer Chanderi & Wild Tussar Weaves',
    subtitle: 'Hand-reeled natural wild silk and lightweight cotton-silk crafted across the heartland of India.',
    tag: 'Artisanal Handlooms',
    cta: 'Discover Handlooms',
    category: 'Chanderi',
    bgImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=85',
    featureBadge: 'Handcrafted Heritage'
  }
];

export default function HeroBanner() {
  const { setFilterCategory, setActiveTab } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '440px',
        backgroundColor: '#540915',
        overflow: 'hidden',
        color: '#FFFFFF'
      }}
    >
      {/* Background Image with Warm Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to right, rgba(84, 9, 21, 0.94) 0%, rgba(84, 9, 21, 0.8) 45%, rgba(84, 9, 21, 0.4) 100%), url(${slide.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'all 0.8s ease'
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: '4rem',
          paddingBottom: '4rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '440px',
          maxWidth: '820px',
          margin: 0
        }}
      >
        {/* Tag Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <span
            style={{
              backgroundColor: 'rgba(201, 151, 56, 0.25)',
              border: '1px solid #C99738',
              color: '#FFEAA7',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            {slide.tag}
          </span>

          <span
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <FiAward style={{ color: '#FFEAA7' }} /> {slide.featureBadge}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            lineHeight: 1.15,
            color: '#FFFFFF',
            marginBottom: '1rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.3)'
          }}
        >
          {slide.title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            color: '#F7EACD',
            lineHeight: 1.6,
            maxWidth: '620px',
            marginBottom: '2rem'
          }}
        >
          {slide.subtitle}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              setFilterCategory(slide.category);
              setActiveTab('catalog');
            }}
            className="btn-gold"
            style={{ padding: '0.85rem 1.85rem', fontSize: '0.9rem' }}
          >
            {slide.cta} <FiArrowRight />
          </button>

          <button
            onClick={() => setActiveTab('prebookings')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              padding: '0.85rem 1.5rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'var(--transition-fast)'
            }}
          >
            <FiClock style={{ color: '#FFEAA7' }} /> How Pre-Booking Works
          </button>
        </div>

        {/* Carousel indicators */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '2.5rem' }}>
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentSlide === idx ? '#C99738' : 'rgba(255, 255, 255, 0.4)',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
