import React from 'react';
import { useStore } from '../../context/StoreContext';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  const icons = {
    success: <FiCheckCircle style={{ color: '#10B981', fontSize: '1.25rem' }} />,
    error: <FiAlertCircle style={{ color: '#EF4444', fontSize: '1.25rem' }} />,
    warning: <FiAlertTriangle style={{ color: '#F59E0B', fontSize: '1.25rem' }} />,
    info: <FiInfo style={{ color: '#3B82F6', fontSize: '1.25rem' }} />
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 2000,
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        padding: '0.85rem 1.15rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.18)',
        border: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        maxWidth: '380px',
        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ marginTop: '0.1rem' }}>{icons[toast.type] || icons.info}</div>
      <div style={{ flex: 1 }}>
        {toast.title && (
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.15rem' }}>
            {toast.title}
          </div>
        )}
        <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45 }}>{toast.message}</div>
      </div>
    </div>
  );
}
