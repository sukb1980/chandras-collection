import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HeroBanner from './components/home/HeroBanner';
import CraftOriginMap from './components/home/CraftOriginMap';
import FilterBar from './components/products/FilterBar';
import ProductCard from './components/products/ProductCard';
import ProductDetailModal from './components/products/ProductDetailModal';
import RazorpayModal from './components/payment/RazorpayModal';
import OrderSuccessModal from './components/payment/OrderSuccessModal';
import AuthModal from './components/auth/AuthModal';
import AddSareeModal from './components/admin/AddSareeModal';
import AdminDashboard from './components/admin/AdminDashboard';
import PrebookingManager from './components/prebooking/PrebookingManager';
import WishlistView from './components/wishlist/WishlistView';
import OrdersView from './components/orders/OrdersView';
import Toast from './components/common/Toast';
import { FiAward, FiShield, FiRotateCcw } from 'react-icons/fi';

function Storefront() {
  const {
    sarees,
    activeTab,
    searchQuery,
    filterCategory,
    filterOrigin,
    filterMaterial,
    filterMaxPrice,
    sortBy,
    setFilterCategory,
    setFilterOrigin,
    setFilterMaterial,
    setFilterMaxPrice
  } = useStore();

  // Filter Sarees
  const filteredSarees = sarees.filter((saree) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = saree.name.toLowerCase().includes(q);
      const matchCat = saree.category.toLowerCase().includes(q);
      const matchOrigin = saree.origin.toLowerCase().includes(q);
      const matchMat = saree.material.toLowerCase().includes(q);
      const matchCraft = (saree.craftTechnique || '').toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchOrigin && !matchMat && !matchCraft) return false;
    }

    // Category filter
    if (filterCategory !== 'All Sarees' && saree.category !== filterCategory) {
      return false;
    }

    // Origin filter
    if (filterOrigin !== 'All' && !saree.origin.toLowerCase().includes(filterOrigin.toLowerCase())) {
      return false;
    }

    // Material filter
    if (filterMaterial !== 'All Materials' && !saree.material.toLowerCase().includes(filterMaterial.toLowerCase())) {
      return false;
    }

    // Price filter
    if (saree.price > filterMaxPrice) {
      return false;
    }

    return true;
  });

  // Sort Sarees
  const sortedSarees = [...filteredSarees].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'stock') return b.stock - a.stock;
    return 0; // 'featured' retains natural curated order
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      <Header />

      <main style={{ flex: 1 }}>
        {/* VIEW 1: Sarees Catalog */}
        {activeTab === 'catalog' && (
          <>
            {!searchQuery && <HeroBanner />}
            <CraftOriginMap />

            <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
              <FilterBar totalMatching={sortedSarees.length} />

              {sortedSarees.length === 0 ? (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px dashed var(--color-border)',
                    borderRadius: '12px',
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    margin: '2rem 0'
                  }}
                >
                  <h3 style={{ fontSize: '1.25rem', color: '#231815', marginBottom: '0.5rem' }}>
                    No Sarees Found Matching Your Selection
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#8C7F78', marginBottom: '1.5rem', maxWidth: '440px', margin: '0 auto 1.5rem' }}>
                    Try broadening your filters, choosing a different craft origin, or searching for broader terms like "Silk", "Banarasi", or "Chanderi".
                  </p>
                  <button
                    onClick={() => {
                      setFilterCategory('All Sarees');
                      setFilterOrigin('All');
                      setFilterMaterial('All Materials');
                      setFilterMaxPrice(60000);
                    }}
                    className="btn-primary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <FiRotateCcw /> Reset All Filters
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.75rem',
                    marginBottom: '4rem'
                  }}
                >
                  {sortedSarees.map((saree) => (
                    <ProductCard key={saree.id} saree={saree} />
                  ))}
                </div>
              )}

              {/* Taneira Craft Editorial Story Section */}
              <section
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid var(--color-border)',
                  padding: '3rem 2rem',
                  marginTop: '3rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2.5rem',
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#7B1123', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    <FiAward /> The Weaves of Immortality
                  </div>
                  <h2 style={{ fontSize: '2rem', lineHeight: 1.25, color: '#231815', marginBottom: '1rem' }}>
                    Crafted with Soul. Woven for Generations.
                  </h2>
                  <p style={{ fontSize: '0.92rem', color: '#5E524D', lineHeight: 1.7, marginBottom: '1rem' }}>
                    Every saree at <strong>Chandra’s Collection</strong> is an authentic chapter in India's textile odyssey. We collaborate directly with master artisans across 40+ recognized handloom clusters — guaranteeing pure silk threads, tested gold zari, and fair compensation to the weavers who preserve our country's living heritage.
                  </p>
                  <p style={{ fontSize: '0.88rem', color: '#71635D', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    Enjoy the privilege of our <strong>5-Day Complimentary Pre-Booking</strong>, allowing you to hold individual handloom masterweaves with total peace of mind.
                  </p>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#7B1123' }}>40+</div>
                      <div style={{ fontSize: '0.78rem', color: '#8C7F78' }}>Weaving Clusters</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#C99738' }}>100%</div>
                      <div style={{ fontSize: '0.78rem', color: '#8C7F78' }}>Silk Mark Certified</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2D7D5F' }}>5 Days</div>
                      <div style={{ fontSize: '0.78rem', color: '#8C7F78' }}>Complimentary Hold</div>
                    </div>
                  </div>
                </div>

                <div style={{ position: 'relative' }}>
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
                    alt="Handloom Artisan Weave"
                    style={{
                      width: '100%',
                      height: '380px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1.25rem',
                      right: '1.25rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#540915'
                    }}
                  >
                    Kadwa Weaving on Pure Katan Silk
                  </div>
                </div>
              </section>
            </div>
          </>
        )}

        {/* VIEW 2: Wishlist View */}
        {activeTab === 'wishlist' && <WishlistView />}

        {/* VIEW 3: 5-Day Prebookings Manager */}
        {activeTab === 'prebookings' && <PrebookingManager />}

        {/* VIEW 4: Admin Portal */}
        {activeTab === 'admin' && <AdminDashboard />}

        {/* VIEW 5: Past Orders & Invoices */}
        {activeTab === 'orders' && <OrdersView />}
      </main>

      <Footer />

      {/* Global Interactive Modals */}
      <AuthModal />
      <ProductDetailModal />
      <RazorpayModal />
      <OrderSuccessModal />
      <AddSareeModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Storefront />
    </StoreProvider>
  );
}
