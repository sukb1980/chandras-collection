import React, { useState } from 'react';
import Logo from './Logo';
import { useStore } from '../../context/StoreContext';
import {
  FiSearch,
  FiHeart,
  FiClock,
  FiUser,
  FiShield,
  FiLogOut,
  FiMenu,
  FiX,
  FiShoppingBag,
  FiPlusCircle,
  FiCheck
} from 'react-icons/fi';
import { CATEGORIES } from '../../data/sareesData';

export default function Header() {
  const {
    user,
    isAdminMode,
    setIsAdminMode,
    wishlist,
    prebookings,
    logout,
    setAuthModalOpen,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    activeTab,
    setActiveTab,
    setAdminAddModalOpen,
    getUserActivePrebookings
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const activePrebookings = getUserActivePrebookings();

  return (
    <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#FFFFFF', boxShadow: '0 2px 14px rgba(35, 24, 21, 0.06)' }}>
      {/* Top Announcement Bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #540915 0%, #7B1123 50%, #540915 100%)',
          color: '#F7EACD',
          fontSize: '0.75rem',
          padding: '0.45rem 1rem',
          textAlign: 'center',
          letterSpacing: '0.06em',
          fontWeight: 500,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.25rem',
          flexWrap: 'wrap',
          borderBottom: '1px solid rgba(201, 151, 56, 0.3)'
        }}
      >
        <span>✨ 100% Authentic Silk Mark Certified Sarees</span>
        <span style={{ opacity: 0.5 }}>•</span>
        <span>Free Insured Express Delivery Across India</span>
        <span style={{ opacity: 0.5 }}>•</span>
        <span style={{ color: '#FFEAA7', fontWeight: 600 }}>Reserve for 5 Days with Free Pre-Booking</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="container" style={{ padding: '0.75rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          
          {/* Mobile Hamburger & Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-only"
              style={{
                display: 'none',
                padding: '0.4rem',
                color: '#231815',
                fontSize: '1.4rem'
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>

            <div onClick={() => setActiveTab('catalog')} style={{ cursor: 'pointer' }}>
              <Logo size="default" />
            </div>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <div
            className="search-container"
            style={{
              flex: 1,
              maxWidth: '460px',
              margin: '0 1.5rem',
              position: 'relative'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'var(--color-cream)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '0.45rem 1rem',
                transition: 'var(--transition-fast)'
              }}
            >
              <FiSearch style={{ color: 'var(--text-muted)', marginRight: '0.6rem', fontSize: '1.05rem' }} />
              <input
                type="text"
                placeholder="Search Banarasi, Kanjivaram, Chanderi, Tussar..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'catalog') setActiveTab('catalog');
                }}
                style={{
                  width: '100%',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '0 0.25rem' }}
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>

          {/* Action Tools */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            
            {/* Admin Mode Switch Pill */}
            <button
              onClick={() => {
                const nextMode = !isAdminMode;
                setIsAdminMode(nextMode);
                if (nextMode) setActiveTab('admin');
                else if (activeTab === 'admin') setActiveTab('catalog');
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.78rem',
                fontWeight: 600,
                border: isAdminMode ? '1px solid #7B1123' : '1px solid var(--color-border)',
                backgroundColor: isAdminMode ? '#FDF2F4' : '#FFFFFF',
                color: isAdminMode ? '#7B1123' : 'var(--text-secondary)',
                transition: 'var(--transition-fast)'
              }}
              title="Toggle Admin View to add/edit sarees and stock"
            >
              <FiShield style={{ color: isAdminMode ? '#7B1123' : '#8C7F78' }} />
              <span className="hide-on-mobile">{isAdminMode ? 'Admin Console' : 'Admin Mode'}</span>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isAdminMode ? '#10B981' : '#CBD5E1',
                  display: 'inline-block'
                }}
              />
            </button>

            {/* If Admin mode active, quick "Add Saree" CTA */}
            {isAdminMode && (
              <button
                onClick={() => setAdminAddModalOpen(true)}
                className="btn-gold"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}
              >
                <FiPlusCircle /> Add Saree
              </button>
            )}

            {/* Wishlist Icon */}
            <button
              onClick={() => setActiveTab('wishlist')}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: activeTab === 'wishlist' ? '1px solid #7B1123' : '1px solid var(--color-border)',
                backgroundColor: activeTab === 'wishlist' ? '#FDF2F4' : '#FFFFFF',
                color: activeTab === 'wishlist' ? '#7B1123' : '#231815',
                transition: 'var(--transition-fast)'
              }}
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <FiHeart style={{ fontSize: '1.15rem' }} />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: '#7B1123',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* 5-Day Prebookings Counter Tab */}
            <button
              onClick={() => setActiveTab('prebookings')}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: activeTab === 'prebookings' ? '1px solid #C99738' : '1px solid var(--color-border)',
                backgroundColor: activeTab === 'prebookings' ? '#FFFBEB' : '#FFFFFF',
                color: activeTab === 'prebookings' ? '#9A6B1A' : 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                transition: 'var(--transition-fast)'
              }}
              title="My 5-Day Pre-booked Sarees"
            >
              <FiClock style={{ color: activePrebookings.length > 0 ? '#D97706' : 'inherit' }} />
              <span className="hide-on-mobile">Pre-booked</span>
              {activePrebookings.length > 0 && (
                <span
                  style={{
                    backgroundColor: '#D97706',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.1rem 0.45rem',
                    borderRadius: '10px'
                  }}
                >
                  {activePrebookings.length}
                </span>
              )}
            </button>

            {/* User Account / Profile */}
            <div style={{ position: 'relative' }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.25rem 0.6rem 0.25rem 0.35rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1.5px solid #C99738'
                      }}
                    />
                    <span
                      className="hide-on-mobile"
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        maxWidth: '90px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {user.name.split(' ')[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '120%',
                        width: '230px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        boxShadow: 'var(--shadow-lg)',
                        padding: '0.6rem 0',
                        zIndex: 200
                      }}
                    >
                      <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--color-border-light)' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#231815' }}>{user.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#8C7F78', wordBreak: 'break-all' }}>{user.email}</div>
                        <div
                          style={{
                            marginTop: '0.35rem',
                            fontSize: '0.68rem',
                            display: 'inline-block',
                            padding: '0.15rem 0.5rem',
                            backgroundColor: user.provider === 'google' ? '#E8F0FE' : user.provider === 'facebook' ? '#E7F3FF' : '#FDF2F4',
                            color: user.provider === 'google' ? '#1A73E8' : user.provider === 'facebook' ? '#1877F2' : '#7B1123',
                            borderRadius: '4px',
                            fontWeight: 600
                          }}
                        >
                          Logged in with {user.provider === 'google' ? 'Gmail / Google' : user.provider === 'facebook' ? 'Facebook' : 'Admin'}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('wishlist');
                          setUserDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.6rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          fontSize: '0.85rem',
                          color: '#231815'
                        }}
                      >
                        <FiHeart style={{ color: '#7B1123' }} /> My Wishlist ({wishlist.length})
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('prebookings');
                          setUserDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.6rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          fontSize: '0.85rem',
                          color: '#231815'
                        }}
                      >
                        <FiClock style={{ color: '#D97706' }} /> My 5-Day Pre-bookings ({activePrebookings.length})
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('orders');
                          setUserDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.6rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          fontSize: '0.85rem',
                          color: '#231815'
                        }}
                      >
                        <FiShoppingBag style={{ color: '#1B4332' }} /> Orders & Invoices
                      </button>

                      <div style={{ height: '1px', backgroundColor: 'var(--color-border-light)', margin: '0.35rem 0' }} />

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.6rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                          fontSize: '0.85rem',
                          color: '#B91C1C'
                        }}
                      >
                        <FiLogOut /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="btn-primary"
                  style={{
                    padding: '0.45rem 1rem',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <FiUser /> Sign In
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mobile-search-bar" style={{ display: 'none', marginTop: '0.75rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'var(--color-cream)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              padding: '0.45rem 0.85rem'
            }}
          >
            <FiSearch style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
            <input
              type="text"
              placeholder="Search by weave, fabric, city..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeTab !== 'catalog') setActiveTab('catalog');
              }}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                fontSize: '0.85rem'
              }}
            />
          </div>
        </div>
      </div>

      {/* Taneira Category Strip */}
      <nav
        style={{
          borderTop: '1px solid var(--color-border-light)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: '#FCFAF7',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1rem' }}>
          {CATEGORIES.map((cat) => {
            const isSelected = filterCategory === cat && activeTab === 'catalog';
            return (
              <button
                key={cat}
                onClick={() => {
                  setFilterCategory(cat);
                  setActiveTab('catalog');
                }}
                style={{
                  padding: '0.65rem 0.95rem',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? '#7B1123' : '#4A3E3D',
                  letterSpacing: '0.03em',
                  position: 'relative',
                  transition: 'var(--transition-fast)',
                  background: 'none'
                }}
              >
                {cat}
                {isSelected && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '12%',
                      right: '12%',
                      height: '2.5px',
                      backgroundColor: '#C99738',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <style>{`
        @media (max-width: 860px) {
          .search-container { display: none !important; }
          .mobile-search-bar { display: block !important; }
          .hide-on-mobile { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}</style>
    </header>
  );
}
