import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import Logo from '../common/Logo';
import {
  FiX,
  FiShield,
  FiLock,
  FiCreditCard,
  FiSmartphone,
  FiGlobe,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight
} from 'react-icons/fi';
import { MdOutlineQrCode } from 'react-icons/md';
import confetti from 'canvas-confetti';

export default function RazorpayModal() {
  const {
    isPaymentModalOpen,
    setIsPaymentModalOpen,
    checkoutSaree,
    completePurchase,
    user
  } = useStore();

  const [paymentTab, setPaymentTab] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'wallet'
  const [upiMethod, setUpiMethod] = useState('apps'); // 'apps' | 'id' | 'qr'
  const [upiId, setUpiId] = useState('');
  
  // Card state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(user?.name || 'Meera Sundaram');

  // Netbanking state
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpValue, setOtpValue] = useState('123456');

  if (!isPaymentModalOpen || !checkoutSaree) return null;

  const gstAmount = Math.round(checkoutSaree.price * 0.05);
  const totalAmount = checkoutSaree.price + gstAmount;

  // Format Card Number with spaces
  const handleCardNumberChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 2) {
      setCardExpiry(`${val.slice(0, 2)}/${val.slice(2)}`);
    } else {
      setCardExpiry(val);
    }
  };

  const fillTestCard = () => {
    setCardNumber('4532 8920 1289 4432');
    setCardExpiry('08/29');
    setCardCvv('789');
    setCardName(user?.name || 'Meera Sundaram');
  };

  const triggerPaymentFlow = (methodLabel, details) => {
    setIsProcessing(true);
    setProcessingStep('Connecting securely to Indian Banking Network...');

    setTimeout(() => {
      setProcessingStep('Verifying 3D Secure / RBI Compliant Token...');
      setShowOtpScreen(true);
    }, 1000);
  };

  const handleConfirmOtp = () => {
    setProcessingStep('Authorizing ₹' + totalAmount.toLocaleString('en-IN') + ' with Bank...');
    setShowOtpScreen(false);

    setTimeout(() => {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore if canvas-confetti is not loaded
      }

      completePurchase({
        paymentMethod: paymentTab.toUpperCase(),
        transactionId: `pay_rzp_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        paymentDetails: paymentTab === 'card' ? `RuPay/Visa card ending in ${cardNumber.slice(-4) || '4432'}` : paymentTab === 'upi' ? `UPI (${upiId || 'Google Pay'})` : selectedBank
      });

      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1200 }}>
      <div
        className="modal-content"
        style={{
          maxWidth: '720px',
          width: '100%',
          padding: 0,
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* Gateway Header: Razorpay Styled Indian Gateway */}
        <div
          style={{
            backgroundColor: '#0C2340',
            color: '#FFFFFF',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #C99738'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#540915',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #C99738'
              }}
            >
              <Logo variant="crest" size="small" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '0.04em' }}>
                  Chandra’s Collection
                </span>
                <span
                  style={{
                    backgroundColor: '#1E3A8A',
                    color: '#93C5FD',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}
                >
                  Razorpay India Test Mode
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                Order ID: CC-ORD-{checkoutSaree.id.toUpperCase()} • 256-Bit SSL Encrypted
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: '#94A3B8' }}>Total Payable</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38BDF8' }}>
                ₹{totalAmount.toLocaleString('en-IN')}
              </div>
            </div>

            <button
              onClick={() => setIsPaymentModalOpen(false)}
              style={{
                color: '#94A3B8',
                fontSize: '1.25rem',
                padding: '0.25rem',
                borderRadius: '50%'
              }}
            >
              <FiX />
            </button>
          </div>
        </div>

        {/* Processing Spinner Overlay */}
        {isProcessing && (
          <div
            style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FAFAFA'
            }}
          >
            {!showOtpScreen ? (
              <>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    border: '4px solid #E2E8F0',
                    borderTop: '4px solid #0284C7',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    marginBottom: '1.5rem'
                  }}
                />
                <h3 style={{ fontSize: '1.15rem', color: '#0F172A', marginBottom: '0.5rem' }}>
                  Processing Transaction...
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>{processingStep}</p>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '1.5rem' }}>
                  Do not hit refresh or press the back button.
                </div>
              </>
            ) : (
              <div
                style={{
                  maxWidth: '380px',
                  width: '100%',
                  backgroundColor: '#FFFFFF',
                  padding: '1.75rem',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <FiShield style={{ color: '#0284C7', fontSize: '1.5rem' }} />
                  <strong style={{ fontSize: '1rem', color: '#0F172A' }}>Bank 3D Secure OTP</strong>
                </div>

                <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '1rem' }}>
                  Enter the 6-digit OTP sent to your registered mobile ending in <strong>•••• 4321</strong> for ₹{totalAmount.toLocaleString('en-IN')}:
                </p>

                <input
                  type="text"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  maxLength={6}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '1.5rem',
                    letterSpacing: '0.4em',
                    padding: '0.65rem',
                    borderRadius: '6px',
                    border: '2px solid #0284C7',
                    marginBottom: '1.25rem',
                    fontWeight: 700
                  }}
                />

                <button
                  onClick={handleConfirmOtp}
                  style={{
                    width: '100%',
                    backgroundColor: '#0284C7',
                    color: '#FFFFFF',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <FiCheckCircle /> Confirm &amp; Pay ₹{totalAmount.toLocaleString('en-IN')}
                </button>
              </div>
            )}
            <style>{`
              @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
          </div>
        )}

        {!isProcessing && (
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '380px' }}>
            
            {/* Sidebar with Indian Payment Tabs */}
            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderRight: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {[
                { id: 'upi', label: 'UPI / QR', icon: <FiSmartphone />, sub: 'GPay, PhonePe, Paytm' },
                { id: 'card', label: 'Cards', icon: <FiCreditCard />, sub: 'RuPay, Visa, Master' },
                { id: 'netbanking', label: 'Net Banking', icon: <FiGlobe />, sub: 'All Indian Banks' },
                { id: 'wallet', label: 'Wallets & EMI', icon: <FiShield />, sub: 'Paytm, Mobikwik, Simpl' }
              ].map((tab) => {
                const isActive = paymentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPaymentTab(tab.id)}
                    style={{
                      padding: '1rem 1.15rem',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                      borderLeft: isActive ? '4px solid #0284C7' : '4px solid transparent',
                      borderBottom: '1px solid #F1F5F9',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', color: isActive ? '#0284C7' : '#64748B' }}>
                      {tab.icon}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#0F172A' : '#334155' }}>
                        {tab.label}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{tab.sub}</div>
                    </div>
                  </button>
                );
              })}

              <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: '#64748B' }}>
                  <FiLock style={{ color: '#10B981' }} />
                  <span>RBI Compliant &amp; 100% Insured</span>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              
              {/* TAB 1: UPI */}
              {paymentTab === 'upi' && (
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0F172A', marginBottom: '0.35rem' }}>
                    Pay via UPI (Instant &amp; Zero Fee)
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '1.25rem' }}>
                    Choose your UPI app or enter your Virtual Payment Address (VPA):
                  </p>

                  {/* UPI Apps Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {[
                      { name: 'Google Pay', color: '#4285F4', tag: 'GPay' },
                      { name: 'PhonePe', color: '#5F259F', tag: 'PhonePe' },
                      { name: 'Paytm UPI', color: '#00BAF2', tag: 'Paytm' },
                      { name: 'BHIM UPI', color: '#00796B', tag: 'BHIM' }
                    ].map((app) => (
                      <button
                        key={app.name}
                        onClick={() => triggerPaymentFlow('UPI App', app.name)}
                        style={{
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          padding: '0.85rem 0.5rem',
                          textAlign: 'center',
                          backgroundColor: '#FFFFFF',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: app.color,
                            color: '#FFFFFF',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 0.4rem'
                          }}
                        >
                          {app.tag[0]}
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1E293B' }}>{app.name}</div>
                      </button>
                    ))}
                  </div>

                  {/* UPI ID input */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                      Or Enter UPI ID / VPA
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        placeholder="e.g. mobileNumber@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '0.65rem 0.85rem',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.85rem'
                        }}
                      />
                      <button
                        onClick={() => triggerPaymentFlow('UPI ID', upiId || 'customer@okhdfcbank')}
                        style={{
                          backgroundColor: '#0284C7',
                          color: '#FFFFFF',
                          padding: '0 1.25rem',
                          borderRadius: '6px',
                          fontSize: '0.82rem',
                          fontWeight: 600
                        }}
                      >
                        Verify &amp; Pay
                      </button>
                    </div>
                  </div>

                  {/* QR Code trigger */}
                  <div
                    onClick={() => triggerPaymentFlow('UPI QR Scan', 'Dynamic QR Code')}
                    style={{
                      border: '1px dashed #CBD5E1',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      cursor: 'pointer',
                      backgroundColor: '#F8FAFC'
                    }}
                  >
                    <MdOutlineQrCode style={{ fontSize: '1.75rem', color: '#0284C7' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F172A' }}>
                        Scan UPI QR Code
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Scan with any UPI app on your phone (Paytm, GPay, PhonePe)
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0284C7' }}>
                      Generate QR →
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 2: CREDIT / DEBIT CARDS */}
              {paymentTab === 'card' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '1rem', color: '#0F172A' }}>Credit / Debit Card</h4>
                    <button
                      onClick={fillTestCard}
                      style={{
                        fontSize: '0.72rem',
                        color: '#0284C7',
                        fontWeight: 600,
                        textDecoration: 'underline'
                      }}
                    >
                      Fill Demo Test Card
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4532 8920 1289 4432"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.9rem',
                          letterSpacing: '0.08em'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                          CVV / CVC
                        </label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.65rem 0.85rem',
                            borderRadius: '6px',
                            border: '1px solid #CBD5E1',
                            fontSize: '0.85rem'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.25rem' }}>
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.85rem',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.85rem'
                        }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <input type="checkbox" id="saveCard" defaultChecked />
                      <label htmlFor="saveCard" style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Securely save card with RBI mandated network tokenization
                      </label>
                    </div>

                    <button
                      onClick={() => triggerPaymentFlow('Card', cardNumber || 'RuPay Card')}
                      style={{
                        backgroundColor: '#0284C7',
                        color: '#FFFFFF',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        marginTop: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <FiLock /> Pay ₹{totalAmount.toLocaleString('en-IN')}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: NET BANKING */}
              {paymentTab === 'netbanking' && (
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0F172A', marginBottom: '0.5rem' }}>
                    Net Banking
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Punjab National Bank'].map((b) => (
                      <button
                        key={b}
                        onClick={() => setSelectedBank(b)}
                        style={{
                          padding: '0.65rem 0.5rem',
                          borderRadius: '6px',
                          border: selectedBank === b ? '2px solid #0284C7' : '1px solid #CBD5E1',
                          backgroundColor: selectedBank === b ? '#F0F9FF' : '#FFFFFF',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#1E293B'
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => triggerPaymentFlow('Net Banking', selectedBank)}
                    style={{
                      width: '100%',
                      backgroundColor: '#0284C7',
                      color: '#FFFFFF',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      marginTop: '1rem'
                    }}
                  >
                    Proceed with {selectedBank}
                  </button>
                </div>
              )}

              {/* TAB 4: WALLETS */}
              {paymentTab === 'wallet' && (
                <div>
                  <h4 style={{ fontSize: '1rem', color: '#0F172A', marginBottom: '0.5rem' }}>
                    Wallets &amp; PayLater
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {['Paytm Wallet', 'MobiKwik', 'Simpl PayLater (No Cost EMI)', 'LazyPay'].map((w) => (
                      <div
                        key={w}
                        onClick={() => triggerPaymentFlow('Wallet', w)}
                        style={{
                          padding: '0.85rem 1rem',
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E293B' }}>{w}</span>
                        <FiArrowRight style={{ color: '#0284C7' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
