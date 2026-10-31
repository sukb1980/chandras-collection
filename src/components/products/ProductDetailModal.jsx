import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  FiX,
  FiHeart,
  FiClock,
  FiShoppingBag,
  FiAward,
  FiMapPin,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCheckCircle
} from 'react-icons/fi';

export default function ProductDetailModal() {
  const {
    selectedSareeDetail,
    setSelectedSareeDetail,
    isInWishlist,
    toggleWishlist,
    prebookSaree,
    getActivePrebookingForSaree,
    user,
    initiatePurchase
  } = useStore();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);

  if (!selectedSareeDetail) return null;

  const saree = selectedSareeDetail;
  const isFavorited = isInWishlist(saree.id);
  const activePrebooking = getActivePrebookingForSaree(saree.id);
  const isPrebookedByMe = user && activePrebooking && activePrebooking.userId === user.id;
  const isPrebookedByOther = activePrebooking && (!user || activePrebooking.userId !== user.id);

  // Time remaining
  const now = Date.now();
  const timeRemainingMs = activePrebooking ? Math.max(0, activePrebooking.expiresAt - now) : 0;
  const daysLeft = Math.floor(timeRemainingMs / (24 * 60 * 60 * 1000));
  const hoursLeft = Math.floor((timeRemainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  const images = saree.images && saree.images.length > 0
    ? saree.images
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80'];

  return (
    <div className="modal-overlay" onClick={() => setSelectedSareeDetail(null)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '960px',
          width: '100%',
          padding: '0',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedSareeDetail(null)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid var(--color-border)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#231815',
            fontSize: '1.2rem',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          aria-label="Close"
        >
          <FiX />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          
          {/* Left Column: Image Showcase */}
          <div style={{ backgroundColor: '#F5EFEB', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                position: 'relative',
                paddingTop: '120%',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                backgroundColor: '#EDE5DB',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <img
                src={images[selectedImgIndex] || images[0]}
                alt={saree.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              {saree.isSilkMarkCertified && (
                <div
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    backgroundColor: 'rgba(27, 67, 50, 0.95)',
                    color: '#FFFFFF',
                    padding: '0.3rem 0.75rem',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <FiAward /> Silk Mark Certified
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    style={{
                      width: '68px',
                      height: '80px',
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      border: selectedImgIndex === idx ? '2px solid #7B1123' : '1px solid var(--color-border)',
                      flexShrink: 0,
                      opacity: selectedImgIndex === idx ? 1 : 0.7
                    }}
                  >
                    <img src={img} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Saree Details & Action Suite */}
          <div style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column' }}>
            
            {/* Category & Origin */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#7B1123',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                {saree.category}
              </span>
              <span
                style={{
                  fontSize: '0.8rem',
                  color: '#5E524D',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <FiMapPin style={{ color: '#C99738' }} /> {saree.origin}
              </span>
            </div>

            {/* Saree Title */}
            <h2 style={{ fontSize: '1.45rem', lineHeight: 1.3, marginBottom: '0.6rem', color: '#231815' }}>
              {saree.name}
            </h2>

            {/* Price Box */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.65rem', fontWeight: 800, color: '#231815' }}>
                ₹{saree.price.toLocaleString('en-IN')}
              </span>
              {saree.mrp && saree.mrp > saree.price && (
                <>
                  <span style={{ fontSize: '1rem', color: '#8C7F78', textDecoration: 'line-through' }}>
                    ₹{saree.mrp.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#2D7D5F', fontWeight: 700 }}>
                    {saree.discount || Math.round(((saree.mrp - saree.price) / saree.mrp) * 100)}% Off
                  </span>
                </>
              )}
              <span style={{ fontSize: '0.72rem', color: '#8C7F78', marginLeft: 'auto' }}>
                Inclusive of 5% Handloom GST
              </span>
            </div>

            {/* 5-Day Prebooking Highlight Banner */}
            <div
              style={{
                backgroundColor: isPrebookedByMe ? '#FEF3C7' : '#FCFAF7',
                border: isPrebookedByMe ? '1px solid #F59E0B' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <FiClock style={{ color: '#D97706', fontSize: '1.1rem' }} />
                <strong style={{ fontSize: '0.88rem', color: '#92400E' }}>
                  {isPrebookedByMe
                    ? `Exclusive 5-Day Reservation Active (${daysLeft}d ${hoursLeft}h left)`
                    : 'Complimentary 5-Day Pre-Booking'}
                </strong>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#78350F', margin: 0, lineHeight: 1.5 }}>
                {isPrebookedByMe
                  ? `You have reserved this saree! Complete your purchase before the 5 days end to claim it. Once 5 days pass without purchase, the pre-booking will automatically be revoked.`
                  : isPrebookedByOther
                  ? 'This piece is currently reserved under a customer’s 5-day pre-booking hold. You can add it to your wishlist to be alerted if released.'
                  : 'Reserve this one-of-a-kind handcrafted saree for 5 full days with zero upfront payment. If not purchased within 5 days, the reservation is revoked and made available to others.'}
              </p>
            </div>

            {/* Saree Craft & Fabric Specifications */}
            <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: '#231815' }}>Material: </strong>
                <span style={{ color: '#5E524D' }}>{saree.material}</span>
              </div>
              <div>
                <strong style={{ color: '#231815' }}>Craft Technique: </strong>
                <span style={{ color: '#5E524D' }}>{saree.craftTechnique || 'Traditional Handloom Weaving'}</span>
              </div>
              <div>
                <strong style={{ color: '#231815' }}>Artisan Weave Time: </strong>
                <span style={{ color: '#5E524D' }}>{saree.weaveTime || '14 Days of master weaver handloom work'}</span>
              </div>
              <div>
                <strong style={{ color: '#231815' }}>Dimensions & Blouse: </strong>
                <span style={{ color: '#5E524D' }}>{saree.length} • {saree.blousePiece}</span>
              </div>
              <div>
                <strong style={{ color: '#231815' }}>Stock Availability: </strong>
                <span style={{ color: saree.stock <= 2 ? '#B91C1C' : '#2D7D5F', fontWeight: 600 }}>
                  {saree.stock > 0 ? `${saree.stock} piece(s) available in artisan stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1.5rem', borderTop: '1px solid var(--color-border-light)', paddingTop: '0.85rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.4rem', color: '#231815' }}>Artisan Story</h4>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: '#5E524D' }}>
                {saree.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {/* Pre-book Button */}
                <button
                  onClick={() => prebookSaree(saree.id)}
                  disabled={saree.stock <= 0 || (activePrebooking && !isPrebookedByMe)}
                  className="btn-gold"
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '0.82rem',
                    cursor: saree.stock <= 0 || (activePrebooking && !isPrebookedByMe) ? 'not-allowed' : 'pointer',
                    opacity: activePrebooking && !isPrebookedByMe ? 0.6 : 1
                  }}
                >
                  <FiClock /> {isPrebookedByMe ? 'Reserved (5 Days)' : 'Pre-book for 5 Days'}
                </button>

                {/* Buy Now Button */}
                <button
                  onClick={() => initiatePurchase(saree)}
                  disabled={saree.stock <= 0}
                  className="btn-primary"
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '0.82rem',
                    cursor: saree.stock <= 0 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <FiShoppingBag /> Buy Now (Gateway)
                </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(saree.id)}
                className="btn-outline"
                style={{
                  width: '100%',
                  color: isFavorited ? '#7B1123' : '#4A3E3D',
                  borderColor: isFavorited ? '#7B1123' : 'var(--color-border)'
                }}
              >
                <FiHeart style={{ fill: isFavorited ? '#7B1123' : 'none' }} />
                {isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Assurance Trust Badges */}
            <div
              style={{
                marginTop: '1.25rem',
                paddingTop: '0.85rem',
                borderTop: '1px solid var(--color-border-light)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                textAlign: 'center',
                fontSize: '0.72rem',
                color: '#5E524D'
              }}
            >
              <div>
                <FiTruck style={{ color: '#C99738', fontSize: '1.1rem', marginBottom: '0.2rem' }} />
                <div>Free Insured Delivery</div>
              </div>
              <div>
                <FiShield style={{ color: '#1B4332', fontSize: '1.1rem', marginBottom: '0.2rem' }} />
                <div>100% Genuine Handloom</div>
              </div>
              <div>
                <FiRefreshCw style={{ color: '#7B1123', fontSize: '1.1rem', marginBottom: '0.2rem' }} />
                <div>7-Day Easy Exchange</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
