import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  FiHeart,
  FiClock,
  FiShoppingBag,
  FiEye,
  FiCheck,
  FiMapPin,
  FiAward
} from 'react-icons/fi';

export default function ProductCard({ saree }) {
  const {
    user,
    isInWishlist,
    toggleWishlist,
    prebookSaree,
    getActivePrebookingForSaree,
    setSelectedSareeDetail,
    initiatePurchase
  } = useStore();

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const isFavorited = isInWishlist(saree.id);
  const activePrebooking = getActivePrebookingForSaree(saree.id);
  const isPrebookedByMe = user && activePrebooking && activePrebooking.userId === user.id;
  const isPrebookedByOther = activePrebooking && (!user || activePrebooking.userId !== user.id);

  // Time remaining on prebooking if prebooked
  const now = Date.now();
  const timeRemainingMs = activePrebooking ? Math.max(0, activePrebooking.expiresAt - now) : 0;
  const daysRemaining = Math.floor(timeRemainingMs / (24 * 60 * 60 * 1000));
  const hoursRemaining = Math.floor((timeRemainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  const images = saree.images && saree.images.length > 0
    ? saree.images
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'];

  return (
    <div
      className="saree-card"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'var(--transition-base)',
        position: 'relative',
        boxShadow: 'var(--shadow-sm)'
      }}
      onMouseEnter={() => {
        if (images.length > 1) setActiveImgIndex(1);
      }}
      onMouseLeave={() => setActiveImgIndex(0)}
    >
      {/* Media Container */}
      <div
        style={{
          position: 'relative',
          paddingTop: '130%',
          backgroundColor: '#F5EFEB',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onClick={() => setSelectedSareeDetail(saree)}
      >
        <img
          src={images[activeImgIndex] || images[0]}
          alt={saree.name}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          className="saree-img"
        />

        {/* Badges on Image */}
        <div
          style={{
            position: 'absolute',
            top: '0.65rem',
            left: '0.65rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            zIndex: 2
          }}
        >
          {saree.isSilkMarkCertified && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: 'rgba(27, 67, 50, 0.92)',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-xs)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <FiAward /> Silk Mark
            </span>
          )}

          {activePrebooking && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                backgroundColor: isPrebookedByMe ? '#7B1123' : '#B45309',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: 'var(--radius-xs)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}
            >
              <FiClock /> {isPrebookedByMe ? `Reserved (${daysRemaining}d ${hoursRemaining}h)` : 'Pre-booked'}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(saree.id);
          }}
          style={{
            position: 'absolute',
            top: '0.65rem',
            right: '0.65rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isFavorited ? '#7B1123' : '#4A3E3D',
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            transition: 'var(--transition-fast)',
            zIndex: 3
          }}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <FiHeart style={{ fill: isFavorited ? '#7B1123' : 'none' }} />
        </button>

        {/* Quick View Button on Hover */}
        <div
          className="quick-view-overlay"
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            left: '0.75rem',
            right: '0.75rem',
            zIndex: 2,
            opacity: 0,
            transition: 'opacity 0.25s ease'
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSareeDetail(saree);
            }}
            style={{
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#231815',
              padding: '0.55rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <FiEye /> View Drape &amp; Craft Story
          </button>
        </div>
      </div>

      {/* Saree Information */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Origin & Category Tag */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span
            style={{
              fontSize: '0.72rem',
              color: '#7B1123',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}
          >
            {saree.category}
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            <FiMapPin style={{ color: '#C99738' }} /> {saree.origin.split(',')[0]}
          </span>
        </div>

        {/* Saree Title */}
        <h4
          onClick={() => setSelectedSareeDetail(saree)}
          style={{
            fontSize: '0.98rem',
            lineHeight: 1.35,
            color: '#231815',
            fontWeight: 600,
            marginBottom: '0.4rem',
            cursor: 'pointer',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
          title={saree.name}
        >
          {saree.name}
        </h4>

        {/* Material */}
        <p
          style={{
            fontSize: '0.78rem',
            color: '#71635D',
            marginBottom: '0.75rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {saree.material}
        </p>

        {/* Price & Stock info */}
        <div style={{ marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span
              style={{
                fontSize: '1.18rem',
                fontWeight: 800,
                color: '#231815',
                fontFamily: 'var(--font-sans)'
              }}
            >
              ₹{saree.price.toLocaleString('en-IN')}
            </span>
            {saree.mrp && saree.mrp > saree.price && (
              <>
                <span
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    textDecoration: 'line-through'
                  }}
                >
                  ₹{saree.mrp.toLocaleString('en-IN')}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#2D7D5F',
                    fontWeight: 700
                  }}
                >
                  {saree.discount || Math.round(((saree.mrp - saree.price) / saree.mrp) * 100)}% off
                </span>
              </>
            )}
          </div>

          {/* Stock Count */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span
              style={{
                fontSize: '0.72rem',
                color: saree.stock <= 2 ? '#B91C1C' : '#5E524D',
                fontWeight: saree.stock <= 2 ? 600 : 500
              }}
            >
              {saree.stock <= 0
                ? 'Out of Stock'
                : saree.stock <= 3
                ? `Only ${saree.stock} piece${saree.stock > 1 ? 's' : ''} left in loom`
                : `${saree.stock} available`}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#8C7F78' }}>
              Free 5-Day Hold
            </span>
          </div>

          {/* Action Buttons: Pre-book (5 Days) & Buy Now */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
            
            {/* 5-Day Prebooking Button */}
            <button
              onClick={() => prebookSaree(saree.id)}
              disabled={saree.stock <= 0 || (activePrebooking && !isPrebookedByMe)}
              style={{
                padding: '0.55rem 0.35rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-xs)',
                border: isPrebookedByMe ? '1px solid #C99738' : '1px solid var(--color-border)',
                backgroundColor: isPrebookedByMe ? '#FFFBEB' : '#FFFFFF',
                color: isPrebookedByMe ? '#9A6B1A' : '#3B2F2F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem',
                transition: 'var(--transition-fast)',
                cursor: saree.stock <= 0 || (activePrebooking && !isPrebookedByMe) ? 'not-allowed' : 'pointer',
                opacity: activePrebooking && !isPrebookedByMe ? 0.6 : 1
              }}
              title={
                isPrebookedByMe
                  ? 'Pre-booked by you for 5 days'
                  : isPrebookedByOther
                  ? 'Currently held by another customer'
                  : 'Reserve this saree for 5 days without payment'
              }
            >
              <FiClock style={{ color: isPrebookedByMe ? '#C99738' : 'inherit' }} />
              {isPrebookedByMe ? 'Reserved (5d)' : isPrebookedByOther ? 'Reserved' : 'Pre-book'}
            </button>

            {/* Buy Now Button */}
            <button
              onClick={() => initiatePurchase(saree)}
              disabled={saree.stock <= 0}
              className="btn-primary"
              style={{
                padding: '0.55rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-xs)',
                cursor: saree.stock <= 0 ? 'not-allowed' : 'pointer',
                opacity: saree.stock <= 0 ? 0.5 : 1
              }}
            >
              <FiShoppingBag /> Buy Now
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .saree-card:hover {
          box-shadow: 0 10px 28px rgba(35, 24, 21, 0.12);
          transform: translateY(-2px);
          border-color: #D4AF37;
        }
        .saree-card:hover .quick-view-overlay {
          opacity: 1 !important;
        }
        .saree-card:hover .saree-img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
