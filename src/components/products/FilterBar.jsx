import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES, MATERIALS, CRAFT_ORIGINS } from '../../data/sareesData';
import { FiFilter, FiX, FiSliders, FiRotateCcw } from 'react-icons/fi';

export default function FilterBar({ totalMatching }) {
  const {
    filterCategory,
    setFilterCategory,
    filterOrigin,
    setFilterOrigin,
    filterMaterial,
    setFilterMaterial,
    filterMaxPrice,
    setFilterMaxPrice,
    sortBy,
    setSortBy
  } = useStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const hasActiveFilters =
    filterCategory !== 'All Sarees' ||
    filterOrigin !== 'All' ||
    filterMaterial !== 'All Materials' ||
    filterMaxPrice < 60000;

  const handleResetFilters = () => {
    setFilterCategory('All Sarees');
    setFilterOrigin('All');
    setFilterMaterial('All Materials');
    setFilterMaxPrice(60000);
    setSortBy('featured');
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.85rem 1.25rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Left: Filter Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#231815', fontWeight: 700, fontSize: '0.88rem' }}>
            <FiSliders style={{ color: '#7B1123' }} />
            <span>Filters:</span>
          </div>

          {/* Origin Filter */}
          <select
            value={filterOrigin}
            onChange={(e) => setFilterOrigin(e.target.value)}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              border: filterOrigin !== 'All' ? '1.5px solid #7B1123' : '1px solid var(--color-border)',
              backgroundColor: filterOrigin !== 'All' ? '#FDF2F4' : '#FFFFFF',
              color: filterOrigin !== 'All' ? '#7B1123' : '#231815',
              fontSize: '0.82rem',
              fontWeight: 500
            }}
          >
            <option value="All">All Origins</option>
            {CRAFT_ORIGINS.map((o) => (
              <option key={o.name} value={o.name}>
                {o.name} ({o.state})
              </option>
            ))}
          </select>

          {/* Material Filter */}
          <select
            value={filterMaterial}
            onChange={(e) => setFilterMaterial(e.target.value)}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: 'var(--radius-xs)',
              border: filterMaterial !== 'All Materials' ? '1.5px solid #7B1123' : '1px solid var(--color-border)',
              backgroundColor: filterMaterial !== 'All Materials' ? '#FDF2F4' : '#FFFFFF',
              color: filterMaterial !== 'All Materials' ? '#7B1123' : '#231815',
              fontSize: '0.82rem',
              fontWeight: 500
            }}
          >
            {MATERIALS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* Max Price Slider Dropdown / Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#F8FAFC', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--color-border)' }}>
            <span style={{ fontSize: '0.78rem', color: '#5E524D' }}>Max:</span>
            <input
              type="range"
              min="8000"
              max="60000"
              step="2000"
              value={filterMaxPrice}
              onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
              style={{ width: '90px', accentColor: '#7B1123' }}
            />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#231815' }}>
              ₹{filterMaxPrice.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.78rem',
                color: '#B91C1C',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5'
              }}
            >
              <FiRotateCcw /> Clear Filters
            </button>
          )}
        </div>

        {/* Right: Results Count & Sort Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.82rem', color: '#8C7F78' }}>
            Showing <strong>{totalMatching}</strong> Weaves
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#5E524D' }}>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FFFFFF',
                fontSize: '0.82rem',
                color: '#231815',
                fontWeight: 600
              }}
            >
              <option value="featured">Curated &amp; Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="stock">Artisan Stock Remaining</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
}

