import React from 'react';

/**
 * Beautiful vector logo for "Chandra's Collection"
 * Chandra (the celestial Moon) meets the sacred Indian handloom weave and royal gold zari.
 */
export default function Logo({ variant = 'header', size = 'default', className = '' }) {
  const isLight = variant === 'light';
  const isStacked = variant === 'stacked';
  const isCrestOnly = variant === 'crest';

  const textColor = isLight ? '#FFFFFF' : '#231815';
  const subtextColor = isLight ? '#E5C07B' : '#7B1123';
  const metaColor = isLight ? '#C5A880' : '#8C7F78';

  // SVG Crest
  const crestSize = size === 'large' ? 56 : size === 'small' ? 36 : 46;

  const CrestSVG = (
    <svg
      width={crestSize}
      height={crestSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-crest-svg"
      style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 8px rgba(201, 151, 56, 0.3))' }}
    >
      <defs>
        <linearGradient id="chandraGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="30%" stopColor="#ECC94B" />
          <stop offset="70%" stopColor="#D69E2E" />
          <stop offset="100%" stopColor="#975A16" />
        </linearGradient>
        <linearGradient id="chandraMaroon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9E1B32" />
          <stop offset="100%" stopColor="#540915" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ECC94B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ECC94B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle Golden Mandala Aura Ring */}
      <circle cx="50" cy="50" r="46" stroke="url(#chandraGold)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="50" r="42" stroke="url(#chandraGold)" strokeWidth="0.75" opacity="0.4" />

      {/* Loom Warp Threads (Weaving Ray Arcs) */}
      <path d="M 50 10 C 65 25 65 75 50 90" stroke="url(#chandraGold)" strokeWidth="0.75" strokeDasharray="1.5 2" opacity="0.5" />
      <path d="M 50 14 C 72 28 72 72 50 86" stroke="url(#chandraGold)" strokeWidth="0.75" strokeDasharray="1.5 2" opacity="0.4" />
      <path d="M 50 18 C 78 32 78 68 50 82" stroke="url(#chandraGold)" strokeWidth="0.75" strokeDasharray="1.5 2" opacity="0.3" />

      {/* Royal Chandra (Crescent Moon) Silhouette */}
      <path
        d="M 62 16 C 36 20 20 40 22 62 C 24 76 36 84 52 84 C 36 80 29 66 30 52 C 31 36 44 24 62 16 Z"
        fill="url(#chandraGold)"
      />

      {/* Delicate Inner Paisley / Mango (Kalka) Flourish */}
      <path
        d="M 40 48 C 39 42 43 38 48 38 C 53 38 56 42 54 48 C 52 54 43 62 43 66 C 43 68 45 70 47 70 C 49 70 51 68 52 64 C 54 67 52 72 46 72 C 40 72 38 66 38 62 C 38 56 41 52 40 48 Z"
        fill="#FFFFFF"
        opacity="0.85"
      />

      {/* Sacred Bindu & Star Radiance */}
      <circle cx="54" cy="30" r="2.5" fill="#FFFFFF" />
      <circle cx="64" cy="40" r="2" fill="url(#chandraGold)" />
      <circle cx="66" cy="54" r="2.2" fill="#FFFFFF" />
      <circle cx="58" cy="68" r="1.8" fill="url(#chandraGold)" />

      {/* Radiance 4-Point Star */}
      <path
        d="M 60 26 Q 60 32 66 32 Q 60 32 60 38 Q 60 32 54 32 Q 60 32 60 26 Z"
        fill="url(#chandraGold)"
      />
    </svg>
  );

  if (isCrestOnly) {
    return CrestSVG;
  }

  return (
    <div
      className={`logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: isStacked ? '0.5rem' : '0.85rem',
        flexDirection: isStacked ? 'column' : 'row',
        textAlign: isStacked ? 'center' : 'left',
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      {CrestSVG}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
          <span
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif",
              fontSize: size === 'large' ? '1.85rem' : size === 'small' ? '1.15rem' : '1.45rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              color: textColor,
              lineHeight: 1.05,
              textTransform: 'uppercase',
            }}
          >
            Chandra’s
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginTop: '0.15rem',
          }}
        >
          <span
            style={{
              height: '1px',
              width: '12px',
              backgroundColor: '#C99738',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: size === 'large' ? '0.78rem' : size === 'small' ? '0.6rem' : '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.28em',
              color: subtextColor,
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Collection
          </span>
          <span
            style={{
              height: '1px',
              width: '12px',
              backgroundColor: '#C99738',
              display: 'inline-block',
            }}
          />
        </div>

        {(size === 'large' || isStacked) && (
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: metaColor,
              textTransform: 'uppercase',
              marginTop: '0.25rem',
            }}
          >
            Handcrafted Weaves of India
          </span>
        )}
      </div>
    </div>
  );
}
