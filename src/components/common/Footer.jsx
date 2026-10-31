import React from 'react';
import Logo from './Logo';
import { useStore } from '../../context/StoreContext';
import {
  FiShield,
  FiAward,
  FiTruck,
  FiClock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart
} from 'react-icons/fi';

export default function Footer() {
  const { setActiveTab, setFilterCategory, setIsAdminMode } = useStore();

  return (
    <footer style={{ backgroundColor: '#231815', color: '#FAF7F2', marginTop: 'auto', borderTop: '3px solid #C99738' }}>
      
      {/* 4 Pillars Strip */}
      <div style={{ backgroundColor: '#18100E', borderBottom: '1px solid rgba(201, 151, 56, 0.25)', padding: '2rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(201, 151, 56, 0.15)', color: '#ECC94B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '0.65rem' }}>
                <FiAward />
              </div>
              <h4 style={{ fontSize: '0.95rem', color: '#FAF7F2', marginBottom: '0.2rem' }}>Silk Mark Certified</h4>
              <p style={{ fontSize: '0.78rem', color: '#A89F91' }}>100% Natural Mulberry &amp; Wild Tussar pure silk purity guaranteed.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(201, 151, 56, 0.15)', color: '#ECC94B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '0.65rem' }}>
                <FiClock />
              </div>
              <h4 style={{ fontSize: '0.95rem', color: '#FAF7F2', marginBottom: '0.2rem' }}>5-Day Pre-Booking</h4>
              <p style={{ fontSize: '0.78rem', color: '#A89F91' }}>Hold any heirloom saree for 5 days with zero deposit before deciding.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(201, 151, 56, 0.15)', color: '#ECC94B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '0.65rem' }}>
                <FiTruck />
              </div>
              <h4 style={{ fontSize: '0.95rem', color: '#FAF7F2', marginBottom: '0.2rem' }}>Free Insured Delivery</h4>
              <p style={{ fontSize: '0.78rem', color: '#A89F91' }}>Complimentary tamper-proof insured express courier across all pin codes in India.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(201, 151, 56, 0.15)', color: '#ECC94B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '0.65rem' }}>
                <FiShield />
              </div>
              <h4 style={{ fontSize: '0.95rem', color: '#FAF7F2', marginBottom: '0.2rem' }}>Direct Artisan Fair Share</h4>
              <p style={{ fontSize: '0.78rem', color: '#A89F91' }}>Sourced straight from 40+ traditional weaving clusters of India.</p>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '3.5rem 1.25rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          
          {/* Brand Col */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <Logo variant="light" size="default" />
            </div>
            <p style={{ fontSize: '0.82rem', color: '#B8ADA3', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              Chandra’s Collection celebrates India's immortal textile heritage. Inspired by royal handlooms, each piece is an ode to the weaver's soul and the luminous moonbeam grace of pure silk.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#ECC94B' }}>
              <FiMapPin /> Handcrafted in Varanasi, Kanchipuram &amp; Chanderi
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 style={{ fontSize: '0.92rem', color: '#ECC94B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Heritage Weaves
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
              {['Banarasi Silk', 'Kanjeevaram Silk', 'Chanderi', 'Tussar Silk', 'Festive & Wedding', 'Everyday Handloom'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setFilterCategory(cat);
                      setActiveTab('catalog');
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    style={{ color: '#D6C8B8', background: 'none', textAlign: 'left', transition: 'color 0.15s ease' }}
                    onMouseEnter={(e) => (e.target.style.color = '#ECC94B')}
                    onMouseLeave={(e) => (e.target.style.color = '#D6C8B8')}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Experience */}
          <div>
            <h4 style={{ fontSize: '0.92rem', color: '#ECC94B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Customer Experience
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('prebookings');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ color: '#D6C8B8', background: 'none', textAlign: 'left' }}
                >
                  5-Day Pre-Booking Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('wishlist');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ color: '#D6C8B8', background: 'none', textAlign: 'left' }}
                >
                  My Saree Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ color: '#D6C8B8', background: 'none', textAlign: 'left' }}
                >
                  Order Receipts &amp; Invoices
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsAdminMode(true);
                    setActiveTab('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ color: '#ECC94B', background: 'none', textAlign: 'left', fontWeight: 600 }}
                >
                  Admin Portal &amp; Add Sarees
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div>
            <h4 style={{ fontSize: '0.92rem', color: '#ECC94B', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Artisan Guild Newsletter
            </h4>
            <p style={{ fontSize: '0.78rem', color: '#B8ADA3', marginBottom: '0.85rem' }}>
              Receive exclusive invitations to new bridal weaves, silk mark drops, and artisan stories.
            </p>
            <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '0.55rem 0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #4A3E3D',
                  backgroundColor: '#18100E',
                  color: '#FFFFFF',
                  fontSize: '0.8rem'
                }}
              />
              <button
                className="btn-gold"
                style={{ padding: '0.55rem 0.85rem', fontSize: '0.75rem' }}
                onClick={() => alert('Thank you for subscribing to Chandra’s Collection!')}
              >
                Join
              </button>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#A89F91' }}>
              Support: care@chandrascollection.com | Mon - Sat (10am - 7pm IST)
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#8C7F78'
          }}
        >
          <div>
            © 2024-2026 Chandra’s Collection Pvt. Ltd. All Rights Reserved. Handcrafted with reverence in India.
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span>Taneira Inspired</span>
            <span>Silk Mark India</span>
            <span>Razorpay Secure</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
