import React from 'react';
import { useStore } from '../../context/StoreContext';
import { FiShoppingBag, FiPrinter, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function OrdersView() {
  const { orders, setActiveTab, setLastOrder, setIsOrderSuccessOpen } = useStore();

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7B1123', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
          <FiShoppingBag /> Order History
        </div>
        <h2 style={{ fontSize: '1.85rem', color: '#231815', marginBottom: '0.5rem' }}>
          My Handloom Orders &amp; Tax Invoices ({orders.length})
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#5E524D' }}>
          View, print, or download GST invoices for your purchases. All orders include 100% transit insurance.
        </p>
      </div>

      {orders.length === 0 ? (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px dashed var(--color-border)',
            borderRadius: '10px',
            padding: '3.5rem 1.5rem',
            textAlign: 'center'
          }}
        >
          <FiShoppingBag style={{ fontSize: '2.5rem', color: '#CBD5E1', marginBottom: '0.85rem' }} />
          <h4 style={{ fontSize: '1.15rem', color: '#475569', marginBottom: '0.35rem' }}>
            No Orders Placed Yet
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginBottom: '1.5rem' }}>
            When you purchase a saree or complete a 5-day pre-booking, your tax invoices will appear here.
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {orders.map((order) => (
            <div
              key={order.orderId}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                padding: '1.25rem',
                display: 'grid',
                gridTemplateColumns: '90px 1fr auto',
                gap: '1.25rem',
                alignItems: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <img
                src={order.saree.images?.[0]}
                alt={order.saree.name}
                style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '6px' }}
              />

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2D7D5F', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FiCheckCircle /> Confirmed &amp; Insured
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#8C7F78' }}>•</span>
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Order #{order.orderId}</span>
                </div>

                <h4 style={{ fontSize: '1.05rem', color: '#231815', marginBottom: '0.35rem' }}>
                  {order.saree.name}
                </h4>

                <div style={{ fontSize: '0.78rem', color: '#5E524D', marginBottom: '0.4rem' }}>
                  Total Paid: <strong style={{ color: '#231815' }}>₹{order.totalPaid.toLocaleString('en-IN')}</strong> (incl. 5% GST) • via {order.paymentMethod}
                </div>

                <div style={{ fontSize: '0.72rem', color: '#8C7F78' }}>
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • Payment ID: {order.transactionId}
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setLastOrder(order);
                    setIsOrderSuccessOpen(true);
                  }}
                  className="btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.6rem 1rem' }}
                >
                  <FiPrinter /> View Tax Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
