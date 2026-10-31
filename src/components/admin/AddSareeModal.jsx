import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { CATEGORIES, CRAFT_ORIGINS, MATERIALS } from '../../data/sareesData';
import { FiX, FiPlus, FiImage, FiSave, FiAward } from 'react-icons/fi';

const PRESET_SAMPLE_IMAGES = [
  { label: 'Royal Crimson Banarasi', url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80' },
  { label: 'Temple Kanjivaram Silk', url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80' },
  { label: 'Handloom Pure Silk Saree', url: 'https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?auto=format&fit=crop&w=900&q=80' },
  { label: 'Golden Tussar Silk Saree', url: 'https://images.unsplash.com/photo-1588140686379-1b76a52103dc?auto=format&fit=crop&w=900&q=80' },
  { label: 'Heritage Paithani Weave', url: 'https://images.unsplash.com/photo-1736568763905-49d82575d936?auto=format&fit=crop&w=900&q=80' },
  { label: 'Dhakai Jamdani Saree', url: 'https://images.unsplash.com/photo-1732381915285-953ce9832512?auto=format&fit=crop&w=900&q=80' }
];

export default function AddSareeModal() {
  const {
    adminAddModalOpen,
    setAdminAddModalOpen,
    editingSaree,
    setEditingSaree,
    addSaree,
    updateSaree
  } = useStore();

  const isEditMode = Boolean(editingSaree);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Banarasi Silk',
    origin: 'Varanasi, Uttar Pradesh',
    material: 'Pure Mulberry Katan Silk with Gold Zari',
    price: '',
    mrp: '',
    stock: '5',
    craftTechnique: 'Traditional Handloom Kadwa Weave',
    weaveTime: '20 Days of artisan handloom work',
    blousePiece: 'Included (0.8m pure silk running)',
    length: '5.5 meters saree + 0.8 meter blouse piece',
    washCare: 'Dry Clean Only. Wrap in mulmul cloth.',
    description: '',
    isSilkMarkCertified: true,
    images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80']
  });

  const [customImageUrl, setCustomImageUrl] = useState('');

  useEffect(() => {
    if (editingSaree) {
      setFormData({
        name: editingSaree.name || '',
        category: editingSaree.category || 'Banarasi Silk',
        origin: editingSaree.origin || 'Varanasi, Uttar Pradesh',
        material: editingSaree.material || 'Pure Mulberry Katan Silk',
        price: editingSaree.price || '',
        mrp: editingSaree.mrp || '',
        stock: editingSaree.stock || '5',
        craftTechnique: editingSaree.craftTechnique || '',
        weaveTime: editingSaree.weaveTime || '',
        blousePiece: editingSaree.blousePiece || '',
        length: editingSaree.length || '5.5 meters + 0.8m blouse',
        washCare: editingSaree.washCare || 'Dry Clean Only',
        description: editingSaree.description || '',
        isSilkMarkCertified: editingSaree.isSilkMarkCertified ?? true,
        images: editingSaree.images || []
      });
    } else {
      setFormData({
        name: '',
        category: 'Banarasi Silk',
        origin: 'Varanasi, Uttar Pradesh',
        material: 'Pure Mulberry Katan Silk with Gold Zari',
        price: '',
        mrp: '',
        stock: '5',
        craftTechnique: 'Traditional Handloom Kadwa Weave',
        weaveTime: '20 Days of artisan handloom work',
        blousePiece: 'Included (0.8m pure silk running)',
        length: '5.5 meters saree + 0.8 meter blouse piece',
        washCare: 'Dry Clean Only. Wrap in mulmul cloth.',
        description: '',
        isSilkMarkCertified: true,
        images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80']
      });
    }
  }, [editingSaree, adminAddModalOpen]);

  if (!adminAddModalOpen && !editingSaree) return null;

  const handleClose = () => {
    setAdminAddModalOpen(false);
    setEditingSaree(null);
  };

  const handleAddImageUrl = () => {
    if (customImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, customImageUrl.trim()]
      }));
      setCustomImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSelectPreset = (url) => {
    if (!formData.images.includes(url)) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, url]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert('Please fill in the saree name and price.');
      return;
    }

    if (isEditMode) {
      updateSaree(editingSaree.id, formData);
    } else {
      addSaree(formData);
    }

    handleClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div
        className="modal-content"
        style={{
          maxWidth: '780px',
          width: '100%',
          padding: '2rem',
          borderRadius: '12px',
          backgroundColor: '#FFFFFF',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7B1123', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Admin Catalog Management
            </span>
            <h3 style={{ fontSize: '1.45rem', color: '#231815' }}>
              {isEditMode ? 'Edit Saree Specifications' : 'Add New Handcrafted Saree'}
            </h3>
          </div>

          <button
            onClick={handleClose}
            style={{
              padding: '0.35rem',
              borderRadius: '50%',
              color: 'var(--text-muted)',
              fontSize: '1.25rem'
            }}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Row 1: Saree Name & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Saree Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Neelambari Katan Silk Banarasi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.88rem',
                  backgroundColor: '#FFFFFF'
                }}
              >
                {CATEGORIES.filter((c) => c !== 'All Sarees').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Origin & Material */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Origin of the Saree (Cluster &amp; State) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Varanasi, Uttar Pradesh"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Material of the Saree *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 100% Pure Mulberry Silk with Gold Zari"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.88rem'
                }}
              />
            </div>
          </div>

          {/* Row 3: Cost & Stock Count */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Selling Cost (₹ INR) *
              </label>
              <input
                type="number"
                required
                min="500"
                placeholder="e.g. 24990"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  fontWeight: 700
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Original MRP (₹ INR)
              </label>
              <input
                type="number"
                min="500"
                placeholder="e.g. 32000"
                value={formData.mrp}
                onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Stock Count (Units) *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="e.g. 5"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* Row 4: Craft Details & Weave Time */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Weaving Craft Technique
              </label>
              <input
                type="text"
                placeholder="e.g. Kadwa Brocade Weaving / Korvai Interlock"
                value={formData.craftTechnique}
                onChange={(e) => setFormData({ ...formData, craftTechnique: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Artisan Weaving Time
              </label>
              <input
                type="text"
                placeholder="e.g. 24 Days on pit loom"
                value={formData.weaveTime}
                onChange={(e) => setFormData({ ...formData, weaveTime: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.88rem'
                }}
              />
            </div>
          </div>

          {/* Details / Story */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
              Details about the Saree &amp; Artisan Lore
            </label>
            <textarea
              rows={3}
              placeholder="Describe the weave history, motif lore (kalga, mayil, paisley), warp and weft density..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                border: '1px solid #CBD5E1',
                fontSize: '0.88rem'
              }}
            />
          </div>

          {/* Silk Mark Assurance */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <input
              type="checkbox"
              id="silkMarkCheck"
              checked={formData.isSilkMarkCertified}
              onChange={(e) => setFormData({ ...formData, isSilkMarkCertified: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: '#1B4332' }}
            />
            <label htmlFor="silkMarkCheck" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1B4332', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <FiAward /> Silk Mark Certified (Pure Silk Authority of India)
            </label>
          </div>

          {/* Images Section */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
              Saree Imagery (Drape, Pallu, and Border Zoom)
            </label>

            {/* Quick preset selector */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748B', alignSelf: 'center' }}>Presets:</span>
              {PRESET_SAMPLE_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.label}
                  onClick={() => handleSelectPreset(preset.url)}
                  style={{
                    fontSize: '0.72rem',
                    padding: '0.25rem 0.6rem',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    borderRadius: '4px',
                    color: '#334155'
                  }}
                >
                  + {preset.label}
                </button>
              ))}
            </div>

            {/* Add Custom Image URL */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <input
                type="url"
                placeholder="Paste Image URL (https://...)"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.55rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.85rem'
                }}
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="btn-outline"
                style={{ padding: '0.55rem 1rem', fontSize: '0.8rem' }}
              >
                <FiPlus /> Add Image
              </button>
            </div>

            {/* Current Images Preview */}
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', padding: '0.35rem 0' }}>
              {formData.images.map((url, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    width: '80px',
                    height: '95px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: '1px solid #CBD5E1',
                    flexShrink: 0
                  }}
                >
                  <img src={url} alt="Saree" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: '#FFFFFF',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem', borderTop: '1px solid var(--color-border-light)', paddingTop: '1.25rem' }}>
            <button
              type="button"
              onClick={handleClose}
              className="btn-outline"
              style={{ padding: '0.65rem 1.25rem' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '0.65rem 1.75rem' }}
            >
              <FiSave /> {isEditMode ? 'Update Saree in Catalog' : 'Publish Saree to Collection'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

