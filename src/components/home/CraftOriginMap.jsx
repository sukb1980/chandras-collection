import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CRAFT_ORIGINS } from '../../data/sareesData';
import { FiMapPin, FiCompass } from 'react-icons/fi';

export default function CraftOriginMap() {
  const { filterOrigin, setFilterOrigin, setActiveTab } = useStore();

  const handleSelectOrigin = (originName) => {
    setFilterOrigin(filterOrigin === originName ? 'All' : originName);
    setActiveTab('catalog');
  };

  return (
    <section style={{ backgroundColor: '#FAF7F2', borderBottom: '1px solid var(--color-border)', padding: '2.5rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#7B1123', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
            <FiCompass /> India's Weaving Clusters
          </div>
          <h2 style={{ fontSize: '1.75rem', color: '#231815' }}>
            Explore Handlooms by Craft &amp; Origin
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#5E524D', maxWidth: '640px', margin: '0.25rem auto 0' }}>
            From the ghats of Varanasi to the temple town of Kanchipuram, every weave represents centuries of unbroken artisan heritage.
          </p>
        </div>

        {/* Origin Clusters Chips */}
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            justifyContent: 'flex-start',
            scrollbarWidth: 'thin'
          }}
        >
          <button
            onClick={() => handleSelectOrigin('All')}
            style={{
              padding: '0.65rem 1.15rem',
              borderRadius: 'var(--radius-full)',
              border: filterOrigin === 'All' ? '1.5px solid #7B1123' : '1px solid var(--color-border)',
              backgroundColor: filterOrigin === 'All' ? '#7B1123' : '#FFFFFF',
              color: filterOrigin === 'All' ? '#FFFFFF' : '#231815',
              fontSize: '0.82rem',
              fontWeight: 600,
              flexShrink: 0,
              boxShadow: filterOrigin === 'All' ? 'var(--shadow-maroon)' : 'var(--shadow-sm)',
              transition: 'all 0.2s ease'
            }}
          >
            All Clusters ({CRAFT_ORIGINS.length}+)
          </button>

          {CRAFT_ORIGINS.map((cluster) => {
            const isSelected = filterOrigin === cluster.name;
            return (
              <button
                key={cluster.name}
                onClick={() => handleSelectOrigin(cluster.name)}
                style={{
                  padding: '0.65rem 1.15rem',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1.5px solid #7B1123' : '1px solid var(--color-border)',
                  backgroundColor: isSelected ? '#FDF2F4' : '#FFFFFF',
                  color: isSelected ? '#7B1123' : '#231815',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  flexShrink: 0,
                  boxShadow: isSelected ? '0 2px 8px rgba(123, 17, 35, 0.15)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                <FiMapPin style={{ color: isSelected ? '#7B1123' : '#C99738' }} />
                <span>{cluster.name}</span>
                <span style={{ fontSize: '0.72rem', color: isSelected ? '#7B1123' : '#8C7F78' }}>
                  ({cluster.state})
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

