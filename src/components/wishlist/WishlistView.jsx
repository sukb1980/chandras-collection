import React from 'react';
import { useStore } from '../../context/StoreContext';
import ProductCard from '../products/ProductCard';
import { FiHeart, FiArrowRight, FiClock } from 'react-icons/fi';

export default function WishlistView() {
  const {
    wishlist,
    sarees,
    user,
    setAuthModalOpen,
    setActiveTab
  } = useStore();

  if (!user) {
    return (
      <div className="container" style={{ padding: '3.5rem 1.25rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '440px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '2.5rem 1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <FiHeart style={{ fontSize: '2.5rem', color: '#7B1123', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Sign In to View Wishlist</h3>
          <p style={{ fontSize: '0.88rem', color: '#5E524D', marginBottom: '1.5rem' }}>
            Save your favorite handcrafted sarees and pre-book them for 5 days with zero deposit.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="btn-primary"
            style={{ width: '100%' }}
          >
            Sign In with Gmail / Facebook
          </button>
        </div>
      </div>
    );
  }

  const wishlistSarees = sarees.filter((s) => wishlist.includes(s.id));

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7B1123', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
          <FiHeart /> Curated Favorites
        </div>
        <h2 style={{ fontSize: '1.85rem', color: '#231815', marginBottom: '0.5rem' }}>
          My Handloom Wishlist ({wishlistSarees.length})
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#5E524D' }}>
          Pieces you adore. You can pre-book any of these sarees for 5 days to hold them exclusively before they sell out.
        </p>
      </div>

      {wishlistSarees.length === 0 ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px dashed var(--color-border)',
            borderRadius: '10px',
            padding: '3.5rem 1.5rem',
            textAlign: 'center'
          }}
        >
          <FiHeart style={{ fontSize: '2.5rem', color: '#CBD5E1', marginBottom: '0.85rem' }} />
          <h4 style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '0.35rem' }}>
            Your Wishlist is Empty
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
            Click the heart icon on any saree to save it for weddings, festivals, or gifting.
          </p>
          <button
            onClick={() => setActiveTab('catalog')}
            className="btn-primary"
            style={{ padding: '0.7rem 1.5rem', fontSize: '0.85rem' }}
          >
            Explore Handcrafted Sarees <FiArrowRight />
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {wishlistSarees.map((saree) => (
            <ProductCard key={saree.id} saree={saree} />
          ))}
        </div>
      )}
    </div>
  );
}

