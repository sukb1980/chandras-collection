import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiClock,
  FiPackage,
  FiDollarSign,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiUser
} from 'react-icons/fi';

export default function AdminDashboard() {
  const {
    sarees,
    deleteSaree,
    updateStock,
    setAdminAddModalOpen,
    setEditingSaree,
    prebookings,
    orders,
    resetToDefaultCatalog
  } = useStore();

  const [adminSearch, setAdminSearch] = useState('');

  // Stats
  const totalStockUnits = sarees.reduce((acc, s) => acc + (Number(s.stock) || 0), 0);
  const now = Date.now();
  const activePrebookings = prebookings.filter(
    (pb) => pb.status === 'active' && pb.expiresAt > now
  );
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalPaid || 0), 0);

  const filteredSarees = sarees.filter(
    (s) =>
      s.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      s.origin.toLowerCase().includes(adminSearch.toLowerCase()) ||
      s.category.toLowerCase().includes(adminSearch.toLowerCase()) ||
      s.material.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#7B1123', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
            <FiShield /> Chandra's Collection Admin Console
          </div>
          <h2 style={{ fontSize: '1.85rem', color: '#231815' }}>
            Artisan Inventory &amp; Catalog Management
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#5E524D' }}>
            Add, update, or remove sarees, adjust real-time stock counts, and monitor 5-day pre-booking reservations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={resetToDefaultCatalog}
            className="btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.6rem 1rem' }}
            title="Restore original 10 authentic Indian handloom sarees"
          >
            <FiRefreshCw /> Reset Demo Catalog
          </button>

          <button
            onClick={() => {
              setEditingSaree(null);
              setAdminAddModalOpen(true);
            }}
            className="btn-gold"
            style={{ fontSize: '0.85rem', padding: '0.65rem 1.25rem' }}
          >
            <FiPlusCircle /> Add New Saree
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FDF2F4', color: '#7B1123', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiPackage />
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748B' }}>Total Weaves</span>
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#231815' }}>{sarees.length}</div>
          <div style={{ fontSize: '0.72rem', color: '#8C7F78' }}>Across {new Set(sarees.map((s) => s.category)).size} Categories</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#E8F5EE', color: '#2D7D5F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiPackage />
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748B' }}>Stock on Loom</span>
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#2D7D5F' }}>{totalStockUnits}</div>
          <div style={{ fontSize: '0.72rem', color: '#8C7F78' }}>Individual handloom pieces</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FFFBEB', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiClock />
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748B' }}>Active 5-Day Holds</span>
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#D97706' }}>{activePrebookings.length}</div>
          <div style={{ fontSize: '0.72rem', color: '#8C7F78' }}>Held under pre-booking</div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiDollarSign />
            </div>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#64748B' }}>Revenue Processed</span>
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#1E293B' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '0.72rem', color: '#8C7F78' }}>{orders.length} Completed Orders</div>
        </div>
      </div>

      {/* Saree Catalog Table Section */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--color-border)', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
        
        {/* Table Top Controls */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#231815' }}>
            Saree Catalog ({filteredSarees.length})
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '0.35rem 0.75rem', width: '280px' }}>
            <FiSearch style={{ color: '#94A3B8', marginRight: '0.5rem' }} />
            <input
              type="text"
              placeholder="Filter by name, origin, material..."
              value={adminSearch}
              onChange={(e) => setAdminSearch(e.target.value)}
              style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '0.82rem' }}
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#F5EFEB', color: '#4A3E3D', borderBottom: '1px solid var(--color-border)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>SAREE</th>
                <th style={{ padding: '0.75rem 1rem' }}>CATEGORY</th>
                <th style={{ padding: '0.75rem 1rem' }}>ORIGIN</th>
                <th style={{ padding: '0.75rem 1rem' }}>MATERIAL</th>
                <th style={{ padding: '0.75rem 1rem' }}>PRICE (INR)</th>
                <th style={{ padding: '0.75rem 1rem' }}>STOCK COUNT</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredSarees.map((saree) => (
                <tr key={saree.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                  
                  {/* Saree & Image */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={saree.images?.[0]}
                        alt={saree.name}
                        style={{ width: '45px', height: '55px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div>
                        <strong style={{ color: '#231815', display: 'block', maxWidth: '200px' }}>{saree.name}</strong>
                        <span style={{ fontSize: '0.7rem', color: '#8C7F78' }}>ID: {saree.id}</span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '0.85rem 1rem', color: '#7B1123', fontWeight: 600 }}>
                    {saree.category}
                  </td>

                  {/* Origin */}
                  <td style={{ padding: '0.85rem 1rem', color: '#5E524D' }}>
                    {saree.origin}
                  </td>

                  {/* Material */}
                  <td style={{ padding: '0.85rem 1rem', color: '#5E524D', maxWidth: '180px' }}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {saree.material}
                    </div>
                  </td>

                  {/* Price */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#231815' }}>
                    ₹{saree.price.toLocaleString('en-IN')}
                  </td>

                  {/* Stock Count Quick Adjuster */}
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        onClick={() => updateStock(saree.id, saree.stock - 1)}
                        disabled={saree.stock <= 0}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#F8FAFC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700
                        }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 700, color: saree.stock <= 2 ? '#B91C1C' : '#1E293B' }}>
                        {saree.stock}
                      </span>
                      <button
                        onClick={() => updateStock(saree.id, saree.stock + 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#F8FAFC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => {
                          setEditingSaree(saree);
                          setAdminAddModalOpen(true);
                        }}
                        style={{
                          padding: '0.35rem 0.6rem',
                          borderRadius: '4px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#FFFFFF',
                          color: '#0284C7',
                          fontSize: '0.78rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                        title="Edit Saree Details"
                      >
                        <FiEdit /> Edit
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${saree.name}"?`)) {
                            deleteSaree(saree.id);
                          }
                        }}
                        style={{
                          padding: '0.35rem 0.6rem',
                          borderRadius: '4px',
                          border: '1px solid #FCA5A5',
                          backgroundColor: '#FEF2F2',
                          color: '#B91C1C',
                          fontSize: '0.78rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem'
                        }}
                        title="Delete Saree"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Prebookings Log */}
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid var(--color-border)', overflow: 'hidden', padding: '1.25rem' }}>
        <h3 style={{ fontSize: '1.15rem', color: '#231815', marginBottom: '0.5rem' }}>
          Customer 5-Day Pre-bookings Registry ({activePrebookings.length})
        </h3>
        <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1rem' }}>
          Sarees currently held exclusively by customers. System automatically revokes hold after 5 days if purchase is not completed.
        </p>

        {activePrebookings.length === 0 ? (
          <div style={{ padding: '1.5rem', textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem' }}>
            No active 5-day pre-booking reservations at the moment.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', color: '#475569', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '0.65rem 0.85rem' }}>CUSTOMER</th>
                  <th style={{ padding: '0.65rem 0.85rem' }}>RESERVED SAREE</th>
                  <th style={{ padding: '0.65rem 0.85rem' }}>PREBOOKED AT</th>
                  <th style={{ padding: '0.65rem 0.85rem' }}>5-DAY EXPIRY</th>
                  <th style={{ padding: '0.65rem 0.85rem' }}>TIME REMAINING</th>
                </tr>
              </thead>
              <tbody>
                {activePrebookings.map((pb) => {
                  const saree = sarees.find((s) => s.id === pb.sareeId);
                  const remMs = Math.max(0, pb.expiresAt - now);
                  const d = Math.floor(remMs / (24 * 60 * 60 * 1000));
                  const h = Math.floor((remMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

                  return (
                    <tr key={pb.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.65rem 0.85rem' }}>
                        <div style={{ fontWeight: 600, color: '#1E293B' }}>{pb.userName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{pb.userEmail}</div>
                      </td>
                      <td style={{ padding: '0.65rem 0.85rem', fontWeight: 600, color: '#7B1123' }}>
                        {saree ? saree.name : pb.sareeId}
                      </td>
                      <td style={{ padding: '0.65rem 0.85rem', color: '#64748B' }}>
                        {new Date(pb.prebookedAt).toLocaleDateString('en-IN')}
                      </td>
                      <td style={{ padding: '0.65rem 0.85rem', color: '#64748B' }}>
                        {new Date(pb.expiresAt).toLocaleDateString('en-IN')}
                      </td>
                      <td style={{ padding: '0.65rem 0.85rem' }}>
                        <span style={{ backgroundColor: '#FFFBEB', color: '#92400E', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                          {d}d {h}h remaining
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

