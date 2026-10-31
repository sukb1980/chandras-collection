import React, { useState, useEffect } from 'react';
import { useStore, PREBOOKING_DURATION_MS } from '../../context/StoreContext';
import {
  FiClock,
  FiShoppingBag,
  FiTrash2,
  FiAlertTriangle,
  FiCheckCircle,
  FiFastForward,
  FiArrowRight,
  FiInfo
} from 'react-icons/fi';

export default function PrebookingManager() {
  const {
    user,
    prebookings,
    sarees,
    cancelPrebooking,
    simulateFastForward5Days,
    initiatePurchase,
    setAuthModalOpen,
    setActiveTab
  } = useStore();

  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update clock every second for live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!user) {
    return (
      <div className="container" style={{ padding: '3rem 1.25rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '440px', margin: '0 auto', backgroundColor: '#FFFFFF', padding: '2.5rem 1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <FiClock style={{ fontSize: '2.5rem', color: '#D97706', marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem' }}>Sign In to View Pre-bookings</h3>
          <p style={{ fontSize: '0.88rem', color: '#5E524D', marginBottom: '1.5rem' }}>
            Logged-in users can reserve any handcrafted saree for 5 days with zero deposit.
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

  // Prebookings belonging to this user
  const userPrebookings = prebookings.filter((pb) => pb.userId === user.id);
  const activeBookings = userPrebookings.filter(
    (pb) => pb.status === 'active' && pb.expiresAt > currentTime
  );
  const pastBookings = userPrebookings.filter(
    (pb) => pb.status !== 'active' || pb.expiresAt <= currentTime
  );

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      
      {/* Title & Explanation */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7B1123', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
          <FiClock /> 5-Day Reservation Desk
        </div>
        <h2 style={{ fontSize: '1.85rem', color: '#231815', marginBottom: '0.5rem' }}>
          My Pre-booked Sarees
        </h2>
        <p style={{ maxWidth: '750px', fontSize: '0.9rem', color: '#5E524D' }}>
          Under Chandra’s Collection policy, you can pre-book and hold rare handloom sarees for up to <strong>5 days</strong> without any payment.
          If 5 days expire before you complete your purchase, the reservation is <strong>automatically revoked</strong> and returned to public stock.
        </p>
      </div>

      {/* Testing Callout Banner */}
      <div
        style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FCD34D',
          borderRadius: '8px',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          marginBottom: '2rem'
        }}
      >
        <FiInfo style={{ color: '#D97706', fontSize: '1.4rem', flexShrink: 0 }} />
        <div style={{ fontSize: '0.82rem', color: '#92400E' }}>
          <strong>Testing Tip:</strong> Use the <strong>"Simulate 5 Days Passed"</strong> button on any active card to test the auto-revocation rule without waiting 5 calendar days!
        </div>
      </div>

      {/* Active Prebookings List */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#231815' }}>
          Active Reservations ({activeBookings.length})
        </h3>

        {activeBookings.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px dashed var(--color-border)',
              borderRadius: '10px',
              padding: '3rem 1.5rem',
              textAlign: 'center'
            }}
          >
            <FiClock style={{ fontSize: '2.5rem', color: '#CBD5E1', marginBottom: '0.85rem' }} />
            <h4 style={{ fontSize: '1.1rem', color: '#475569', marginBottom: '0.35rem' }}>
              No Active 5-Day Pre-bookings
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.25rem' }}>
              Browse our heritage sarees and click "Pre-book for 5 Days" to reserve any piece.
            </p>
            <button
              onClick={() => setActiveTab('catalog')}
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
            >
              Explore Saree Collection <FiArrowRight />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeBookings.map((pb) => {
              const saree = sarees.find((s) => s.id === pb.sareeId);
              if (!saree) return null;

              const remainingMs = Math.max(0, pb.expiresAt - currentTime);
              const totalDurationMs = pb.expiresAt - pb.prebookedAt;
              const percentElapsed = Math.min(
                100,
                Math.max(0, Math.round(((currentTime - pb.prebookedAt) / totalDurationMs) * 100))
              );

              const days = Math.floor(remainingMs / (24 * 60 * 60 * 1000));
              const hours = Math.floor((remainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
              const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
              const seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);

              const isUrgent = days === 0;

              return (
                <div
                  key={pb.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: isUrgent ? '1.5px solid #F59E0B' : '1px solid var(--color-border)',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    display: 'grid',
                    gridTemplateColumns: '110px 1fr auto',
                    gap: '1.25rem',
                    alignItems: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  className="prebook-item"
                >
                  {/* Saree Thumbnail */}
                  <img
                    src={saree.images?.[0]}
                    alt={saree.name}
                    style={{
                      width: '100%',
                      height: '135px',
                      objectFit: 'cover',
                      borderRadius: '6px'
                    }}
                  />

                  {/* Details & Timer */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7B1123', textTransform: 'uppercase' }}>
                        {saree.category}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#8C7F78' }}>•</span>
                      <span style={{ fontSize: '0.72rem', color: '#5E524D' }}>Origin: {saree.origin}</span>
                    </div>

                    <h4 style={{ fontSize: '1.05rem', color: '#231815', marginBottom: '0.35rem' }}>
                      {saree.name}
                    </h4>

                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#231815', marginBottom: '0.75rem' }}>
                      ₹{saree.price.toLocaleString('en-IN')}
                    </div>

                    {/* Remaining Time Display */}
                    <div
                      style={{
                        backgroundColor: isUrgent ? '#FEF2F2' : '#FFFBEB',
                        border: isUrgent ? '1px solid #FCA5A5' : '1px solid #FDE68A',
                        borderRadius: '6px',
                        padding: '0.5rem 0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.65rem'
                      }}
                    >
                      <FiClock style={{ color: isUrgent ? '#DC2626' : '#D97706', fontSize: '1.1rem' }} />
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isUrgent ? '#991B1B' : '#92400E' }}>
                        Time Remaining to Purchase: {days}d {hours}h {minutes}m {seconds}s
                      </div>
                    </div>

                    {/* Progress Bar of 5 days */}
                    <div style={{ marginTop: '0.5rem', width: '100%', maxWidth: '340px' }}>
                      <div style={{ height: '6px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${100 - percentElapsed}%`,
                            backgroundColor: isUrgent ? '#DC2626' : '#C99738',
                            transition: 'width 1s linear'
                          }}
                        />
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '0.2rem' }}>
                        Reserved on {new Date(pb.prebookedAt).toLocaleDateString('en-IN')} • Expires {new Date(pb.expiresAt).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '180px' }}>
                    <button
                      onClick={() => initiatePurchase(saree)}
                      className="btn-primary"
                      style={{ padding: '0.65rem 1rem', fontSize: '0.82rem', width: '100%' }}
                    >
                      <FiShoppingBag /> Complete Purchase
                    </button>

                    <button
                      onClick={() => cancelPrebooking(pb.id)}
                      className="btn-outline"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.78rem', width: '100%' }}
                    >
                      <FiTrash2 /> Release Saree
                    </button>

                    {/* Fast Forward 5 Days Simulation Button */}
                    <button
                      onClick={() => simulateFastForward5Days(pb.id)}
                      style={{
                        padding: '0.45rem 0.75rem',
                        fontSize: '0.72rem',
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        border: '1px dashed #D97706',
                        borderRadius: 'var(--radius-xs)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem',
                        cursor: 'pointer'
                      }}
                      title="Simulate 5 calendar days passing to verify automatic reservation revocation"
                    >
                      <FiFastForward /> Simulate 5 Days Passed
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past / Revoked / Purchased History */}
      {pastBookings.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.85rem', color: '#475569' }}>
            Past Pre-booking History ({pastBookings.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {pastBookings.map((pb) => {
              const saree = sarees.find((s) => s.id === pb.sareeId);
              const isPurchased = pb.status === 'purchased';
              const isExpired = pb.status === 'expired' || pb.expiresAt <= currentTime;

              return (
                <div
                  key={pb.id}
                  style={{
                    backgroundColor: '#FAFAFA',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: isPurchased ? '#D1FAE5' : '#FEE2E2',
                        color: isPurchased ? '#065F46' : '#991B1B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {isPurchased ? <FiCheckCircle /> : <FiAlertTriangle />}
                    </div>
                    <div>
                      <strong style={{ color: '#1E293B' }}>{saree ? saree.name : 'Handcrafted Saree'}</strong>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Prebooked on {new Date(pb.prebookedAt).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: isPurchased ? '#E8F5EE' : '#FEE2E2',
                        color: isPurchased ? '#2D7D5F' : '#B91C1C'
                      }}
                    >
                      {isPurchased ? 'PURCHASE COMPLETED' : '5-DAY HOLD EXPIRED & REVOKED'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .prebook-item {
            grid-template-columns: 1fr !important;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}
