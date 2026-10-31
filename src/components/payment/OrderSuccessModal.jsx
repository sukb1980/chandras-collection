import React from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import {
  FiCheckCircle,
  FiPrinter,
  FiX,
  FiPackage,
  FiMapPin,
  FiAward,
  FiArrowRight
} from 'react-icons/fi';

export default function OrderSuccessModal() {
  const {
    isOrderSuccessOpen,
    setIsOrderSuccessOpen,
    lastOrder,
    setActiveTab
  } = useStore();

  if (!isOrderSuccessOpen || !lastOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(lastOrder.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="modal-overlay" style={{ zIndex: 1300 }}>
      <div
        className="modal-content"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: 0,
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--color-border)'
        }}
      >
        {/* Success Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1B4332 0%, #2D7D5F 100%)',
            color: '#FFFFFF',
            padding: '1.75rem',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <button
            onClick={() => setIsOrderSuccessOpen(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '1.25rem',
              padding: '0.25rem',
              borderRadius: '50%'
            }}
          >
            <FiX />
          </button>

          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem',
              fontSize: '2rem'
            }}
          >
            <FiCheckCircle />
          </div>

          <h3 style={{ fontSize: '1.45rem', marginBottom: '0.25rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)' }}>
            Payment Successful &amp; Order Placed!
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#D1FAE5', margin: 0 }}>
            Your handcrafted saree is reserved, packed with care in a cedar muslin bag, and insured for transit.
          </p>
        </div>

        {/* Tax Invoice Content (Printable) */}
        <div id="printable-tax-invoice" style={{ padding: '1.75rem' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '1rem' }}>
            <Logo variant="header" size="small" />

            <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#5E524D' }}>
              <div style={{ fontWeight: 700, color: '#231815' }}>TAX INVOICE / RECEIPT</div>
              <div>Invoice No: INV-{lastOrder.orderId}</div>
              <div>Date: {formattedDate}</div>
              <div>GSTIN: 08AABCC9921D1ZB</div>
            </div>
          </div>

          {/* Customer & Transaction details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem', fontSize: '0.82rem' }}>
            <div style={{ backgroundColor: '#FCFAF7', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: '#7B1123', display: 'block', marginBottom: '0.25rem' }}>Billed &amp; Shipped To:</strong>
              <div style={{ fontWeight: 600, color: '#231815' }}>{lastOrder.user.name}</div>
              <div style={{ color: '#5E524D' }}>{lastOrder.user.email}</div>
              <div style={{ color: '#5E524D', marginTop: '0.25rem' }}>{lastOrder.user.shippingAddress}</div>
            </div>

            <div style={{ backgroundColor: '#FCFAF7', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
              <strong style={{ color: '#7B1123', display: 'block', marginBottom: '0.25rem' }}>Payment Gateway Info:</strong>
              <div><strong>Gateway:</strong> Razorpay India</div>
              <div><strong>Transaction ID:</strong> {lastOrder.transactionId}</div>
              <div><strong>Payment Method:</strong> {lastOrder.paymentMethod}</div>
              <div><strong>Status:</strong> <span style={{ color: '#2D7D5F', fontWeight: 600 }}>Captured (Success)</span></div>
            </div>
          </div>

          {/* Saree Line Item */}
          <div style={{ border: '1px solid var(--color-border)', borderRadius: '6px', overflow: 'hidden', marginBottom: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px', backgroundColor: '#F5EFEB', padding: '0.5rem 0.85rem', fontSize: '0.75rem', fontWeight: 700, color: '#4A3E3D' }}>
              <div>ITEM</div>
              <div>DESCRIPTION</div>
              <div style={{ textAlign: 'right' }}>AMOUNT</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 100px', padding: '0.85rem', alignItems: 'center' }}>
              <img
                src={lastOrder.saree.images?.[0]}
                alt={lastOrder.saree.name}
                style={{ width: '60px', height: '75px', objectFit: 'cover', borderRadius: '4px' }}
              />
              <div style={{ paddingRight: '0.75rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#231815' }}>{lastOrder.saree.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#71635D' }}>HSN: 5007 • {lastOrder.saree.material}</div>
                <div style={{ fontSize: '0.72rem', color: '#7B1123' }}>Origin: {lastOrder.saree.origin}</div>
                {lastOrder.saree.isSilkMarkCertified && (
                  <span style={{ fontSize: '0.68rem', color: '#1B4332', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
                    <FiAward /> Silk Mark Guaranteed
                  </span>
                )}
              </div>
              <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '0.92rem', color: '#231815' }}>
                ₹{lastOrder.itemPrice.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Calculation Breakdown */}
          <div style={{ width: '260px', marginLeft: 'auto', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', color: '#5E524D' }}>
              <span>Item Subtotal:</span>
              <span>₹{lastOrder.itemPrice.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', color: '#5E524D' }}>
              <span>Handloom GST (5%):</span>
              <span>₹{lastOrder.gstAmount.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0', color: '#2D7D5F' }}>
              <span>Insured Transit Courier:</span>
              <span>FREE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderTop: '2px solid #231815', fontWeight: 800, fontSize: '1.05rem', color: '#7B1123', marginTop: '0.25rem' }}>
              <span>Total Paid:</span>
              <span>₹{lastOrder.totalPaid.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border-light)', paddingTop: '1rem' }}>
            <button
              onClick={handlePrint}
              className="btn-outline"
              style={{ fontSize: '0.82rem', padding: '0.6rem 1rem' }}
            >
              <FiPrinter /> Print / Download Tax Invoice
            </button>
            <button
              onClick={() => {
                setIsOrderSuccessOpen(false);
                setActiveTab('catalog');
              }}
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '0.6rem 1.25rem' }}
            >
              Continue Exploring Collection <FiArrowRight />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
