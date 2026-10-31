import React, { useState } from 'react';
import Logo from '../common/Logo';
import { useStore } from '../../context/StoreContext';
import { FiX, FiCheck, FiShield } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export default function AuthModal() {
  const {
    authModalOpen,
    setAuthModalOpen,
    authActionReason,
    loginWithGoogle,
    loginWithFacebook,
    loginAsAdmin
  } = useStore();

  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isSimulatingLogin, setIsSimulatingLogin] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  if (!authModalOpen) return null;

  const handleSocialLogin = (provider) => {
    setSelectedProvider(provider);
    setIsSimulatingLogin(true);
    setTimeout(() => {
      if (provider === 'google') {
        loginWithGoogle(
          customEmail || 'meera.sundaram@gmail.com',
          customName || 'Meera Sundaram'
        );
      } else if (provider === 'facebook') {
        loginWithFacebook(customName || 'Ananya Mukherjee');
      }
      setIsSimulatingLogin(false);
      setSelectedProvider(null);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '2rem 1.75rem',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: 'var(--text-muted)',
            fontSize: '1.25rem',
            padding: '0.25rem',
            borderRadius: '50%'
          }}
          aria-label="Close modal"
        >
          <FiX />
        </button>

        {/* Brand Crest */}
        <div style={{ marginBottom: '1rem' }}>
          <Logo variant="stacked" size="default" />
        </div>

        {/* Heading */}
        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem', color: '#231815' }}>
          Welcome to Heritage Luxury
        </h3>
        <p style={{ fontSize: '0.86rem', color: '#5E524D', marginBottom: '1.4rem' }}>
          {authActionReason
            ? `Please sign in with your account to ${authActionReason}.`
            : 'Sign in to access your Wishlist, 5-Day Pre-booking reservations, and order history.'}
        </p>

        {/* Perks Box */}
        <div
          style={{
            backgroundColor: '#FCFAF7',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem 1rem',
            textAlign: 'left',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            color: '#4A3E3D'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <FiCheck style={{ color: '#10B981', flexShrink: 0 }} />
            <span><strong>Pre-book Sarees for 5 Days</strong> with zero upfront deposit</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <FiCheck style={{ color: '#10B981', flexShrink: 0 }} />
            <span>Curate personal wishlists for weddings & festive occasions</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiCheck style={{ color: '#10B981', flexShrink: 0 }} />
            <span>Exclusive early access to limited artisan masterweaves</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          {/* Gmail / Google Login */}
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={isSimulatingLogin}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              backgroundColor: '#FFFFFF',
              color: '#3C4043',
              border: '1px solid #DADCE0',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.9rem',
              fontWeight: 600,
              boxShadow: '0 1px 3px rgba(60, 64, 67, 0.08)',
              transition: 'var(--transition-fast)',
              cursor: isSimulatingLogin ? 'wait' : 'pointer'
            }}
          >
            <FcGoogle style={{ fontSize: '1.3rem' }} />
            <span>{isSimulatingLogin && selectedProvider === 'google' ? 'Connecting to Google...' : 'Continue with Gmail / Google'}</span>
          </button>

          {/* Facebook Login */}
          <button
            onClick={() => handleSocialLogin('facebook')}
            disabled={isSimulatingLogin}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              backgroundColor: '#1877F2',
              color: '#FFFFFF',
              border: '1px solid #1877F2',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-xs)',
              fontSize: '0.9rem',
              fontWeight: 600,
              boxShadow: '0 2px 6px rgba(24, 119, 242, 0.3)',
              transition: 'var(--transition-fast)',
              cursor: isSimulatingLogin ? 'wait' : 'pointer'
            }}
          >
            <FaFacebook style={{ fontSize: '1.25rem' }} />
            <span>{isSimulatingLogin && selectedProvider === 'facebook' ? 'Connecting to Facebook...' : 'Continue with Facebook'}</span>
          </button>
        </div>

        {/* Quick Demo Switcher */}
        <div style={{ margin: '1.25rem 0 0.85rem', position: 'relative' }}>
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
          <span
            style={{
              position: 'absolute',
              top: '-9px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#FFFFFF',
              padding: '0 0.5rem',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            or test as
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button
            onClick={() => loginWithGoogle('pooja.banerjee@gmail.com', 'Pooja Banerjee')}
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--color-cream)',
              border: '1px solid var(--color-border)',
              color: 'var(--text-secondary)'
            }}
          >
            Pooja (Gmail)
          </button>

          <button
            onClick={() => loginWithFacebook('Ananya Mukherjee')}
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: 'var(--color-cream)',
              border: '1px solid var(--color-border)',
              color: 'var(--text-secondary)'
            }}
          >
            Ananya (Facebook)
          </button>

          <button
            onClick={() => loginAsAdmin()}
            style={{
              padding: '0.35rem 0.65rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-xs)',
              backgroundColor: '#FDF2F4',
              border: '1px solid #7B1123',
              color: '#7B1123',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <FiShield /> Admin Role
          </button>
        </div>

        {/* Guest Note */}
        <div style={{ marginTop: '1.25rem' }}>
          <button
            onClick={() => setAuthModalOpen(false)}
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textDecoration: 'underline'
            }}
          >
            Continue as Guest (Browse Only)
          </button>
        </div>
      </div>
    </div>
  );
}
