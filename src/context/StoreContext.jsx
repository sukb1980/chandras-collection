import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_SAREES } from '../data/sareesData';

const StoreContext = createContext(null);

const SAREES_STORAGE_KEY = 'chandras_collection_sarees_v3';
const USER_STORAGE_KEY = 'chandras_collection_user_v2';
const WISHLIST_STORAGE_KEY = 'chandras_collection_wishlist_v2';
const PREBOOKINGS_STORAGE_KEY = 'chandras_collection_prebookings_v2';
const ORDERS_STORAGE_KEY = 'chandras_collection_orders_v2';

// 5 Days in Milliseconds: 5 * 24 * 60 * 60 * 1000 = 432,000,000 ms
export const PREBOOKING_DURATION_MS = 5 * 24 * 60 * 60 * 1000;

export function StoreProvider({ children }) {
  // ---- Sarees Catalog ----
  const [sarees, setSarees] = useState(() => {
    try {
      const saved = localStorage.getItem(SAREES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SAREES;
    } catch {
      return INITIAL_SAREES;
    }
  });

  // ---- User Authentication ----
  // Default is guest (null). If logged in: { id, name, email, avatar, provider, role }
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Admin switch mode (Admin can add, edit, delete, update stock)
  const [isAdminMode, setIsAdminMode] = useState(false);

  // ---- Wishlist (Array of saree IDs) ----
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ---- Pre-bookings ----
  // Array of { id, sareeId, userId, userName, userEmail, prebookedAt, expiresAt, status: 'active' | 'purchased' | 'expired' }
  const [prebookings, setPrebookings] = useState(() => {
    try {
      const saved = localStorage.getItem(PREBOOKINGS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ---- Orders History ----
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ---- UI Modals & State ----
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authActionReason, setAuthActionReason] = useState(''); // e.g. 'prebook' or 'wishlist'
  const [selectedSareeDetail, setSelectedSareeDetail] = useState(null);
  const [checkoutSaree, setCheckoutSaree] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [adminAddModalOpen, setAdminAddModalOpen] = useState(false);
  const [editingSaree, setEditingSaree] = useState(null);
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'wishlist' | 'prebookings' | 'admin' | 'orders'

  // ---- Filters & Search ----
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Sarees');
  const [filterOrigin, setFilterOrigin] = useState('All');
  const [filterMaterial, setFilterMaterial] = useState('All Materials');
  const [filterMaxPrice, setFilterMaxPrice] = useState(60000);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'stock'

  // ---- Toast Notifications ----
  const [toast, setToast] = useState(null);
  const showToast = useCallback((message, type = 'info', title = '') => {
    setToast({ id: Date.now(), message, type, title });
    setTimeout(() => {
      setToast((current) => (current && current.message === message ? null : current));
    }, 4500);
  }, []);

  // Save Sarees to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAREES_STORAGE_KEY, JSON.stringify(sarees));
    } catch (e) {
      console.error('Failed to save sarees', e);
    }
  }, [sarees]);

  // Save User to LocalStorage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        if (user.role === 'admin') {
          setIsAdminMode(true);
        }
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user', e);
    }
  }, [user]);

  // Save Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Save Prebookings to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(PREBOOKINGS_STORAGE_KEY, JSON.stringify(prebookings));
    } catch (e) {
      console.error('Failed to save prebookings', e);
    }
  }, [prebookings]);

  // Save Orders to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  // ============================================================
  // PREBOOKING EXPIRATION & AUTO-REVOCATION ENGINE
  // User Requirement: "Once the 5 days are over and the saree
  // is not purchased yet the prebooking will be revoked."
  // ============================================================
  const checkAndRevokeExpiredPrebookings = useCallback(() => {
    const now = Date.now();
    let hasRevocations = false;
    const revokedSareeNames = [];

    setPrebookings((prevPrebookings) => {
      const updated = prevPrebookings.map((pb) => {
        if (pb.status === 'active' && now >= pb.expiresAt) {
          hasRevocations = true;
          const saree = sarees.find((s) => s.id === pb.sareeId);
          if (saree) revokedSareeNames.push(saree.name);
          return { ...pb, status: 'expired', revokedAt: now };
        }
        return pb;
      });
      return hasRevocations ? updated : prevPrebookings;
    });

    if (hasRevocations && revokedSareeNames.length > 0) {
      showToast(
        `5-day prebooking reservation expired and was revoked for: ${revokedSareeNames.join(', ')}.`,
        'warning',
        'Prebooking Expired'
      );
    }
  }, [sarees, showToast]);

  // Periodic check every 15 seconds + immediately on load
  useEffect(() => {
    checkAndRevokeExpiredPrebookings();
    const interval = setInterval(checkAndRevokeExpiredPrebookings, 15000);
    return () => clearInterval(interval);
  }, [checkAndRevokeExpiredPrebookings]);

  // ============================================================
  // AUTH METHODS
  // ============================================================
  const loginWithGoogle = (customEmail, customName, customAvatar) => {
    const newUser = {
      id: `google_${Date.now()}`,
      name: customName || 'Meera Sundaram',
      email: customEmail || 'meera.sundaram@gmail.com',
      avatar: customAvatar || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=200&q=80',
      provider: 'google',
      role: 'user'
    };
    setUser(newUser);
    setAuthModalOpen(false);
    showToast(`Welcome back, ${newUser.name}! Signed in via Google.`, 'success', 'Signed In');
  };

  const loginWithFacebook = (customName, customAvatar) => {
    const newUser = {
      id: `fb_${Date.now()}`,
      name: customName || 'Ananya Mukherjee',
      email: 'ananya.mukherjee@facebook.user',
      avatar: customAvatar || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=200&q=80',
      provider: 'facebook',
      role: 'user'
    };
    setUser(newUser);
    setAuthModalOpen(false);
    showToast(`Welcome, ${newUser.name}! Signed in via Facebook.`, 'success', 'Signed In');
  };

  const loginAsAdmin = () => {
    const adminUser = {
      id: 'admin_root',
      name: 'Chandra Admin',
      email: 'admin@chandrascollection.com',
      avatar: 'https://images.unsplash.com/photo-1618901185975-d59f7091bcfe?auto=format&fit=crop&w=200&q=80',
      provider: 'admin',
      role: 'admin'
    };
    setUser(adminUser);
    setIsAdminMode(true);
    setAuthModalOpen(false);
    showToast('Switched to Chandra Admin Master Console.', 'success', 'Admin Mode Active');
  };

  const logout = () => {
    setUser(null);
    setIsAdminMode(false);
    showToast('You have been signed out. Browsing as Guest.', 'info');
  };

  // Require auth trigger
  const requireAuth = (actionReason = 'continue') => {
    if (!user) {
      setAuthActionReason(actionReason);
      setAuthModalOpen(true);
      return false;
    }
    return true;
  };

  // ============================================================
  // WISHLIST METHODS
  // ============================================================
  const toggleWishlist = (sareeId) => {
    if (!requireAuth('save items to your Wishlist')) return;

    setWishlist((prev) => {
      const exists = prev.includes(sareeId);
      if (exists) {
        showToast('Removed saree from your wishlist.', 'info');
        return prev.filter((id) => id !== sareeId);
      } else {
        showToast('Added to your Wishlist. You can pre-book it for 5 days!', 'success', 'Wishlist Updated');
        return [...prev, sareeId];
      }
    });
  };

  const isInWishlist = (sareeId) => wishlist.includes(sareeId);

  // ============================================================
  // PREBOOKING METHODS
  // ============================================================
  const getActivePrebookingForSaree = (sareeId) => {
    const now = Date.now();
    return prebookings.find((pb) => pb.sareeId === sareeId && pb.status === 'active' && pb.expiresAt > now);
  };

  const getUserActivePrebookings = () => {
    if (!user) return [];
    const now = Date.now();
    return prebookings.filter(
      (pb) => pb.userId === user.id && pb.status === 'active' && pb.expiresAt > now
    );
  };

  const prebookSaree = (sareeId) => {
    if (!requireAuth('pre-book this handcrafted saree for 5 days')) return;

    const saree = sarees.find((s) => s.id === sareeId);
    if (!saree) return;

    // Check if already active
    const existing = getActivePrebookingForSaree(sareeId);
    if (existing) {
      if (existing.userId === user.id) {
        showToast('You have already pre-booked this saree! Check your Pre-bookings tab.', 'info');
      } else {
        showToast('This saree is currently reserved by another customer under 5-day pre-booking.', 'warning');
      }
      return;
    }

    if (saree.stock <= 0) {
      showToast('This saree is currently out of stock.', 'error');
      return;
    }

    const now = Date.now();
    const newPrebooking = {
      id: `pb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      sareeId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      prebookedAt: now,
      expiresAt: now + PREBOOKING_DURATION_MS, // exactly 5 days from now
      status: 'active'
    };

    setPrebookings((prev) => [newPrebooking, ...prev]);

    // Also add to wishlist if not already there
    if (!wishlist.includes(sareeId)) {
      setWishlist((prev) => [...prev, sareeId]);
    }

    showToast(
      `Pre-booked for 5 Days! We have reserved "${saree.name}" exclusively for you until ${new Date(newPrebooking.expiresAt).toLocaleDateString('en-IN')}.`,
      'success',
      '5-Day Reservation Confirmed'
    );
  };

  const cancelPrebooking = (prebookingId) => {
    setPrebookings((prev) =>
      prev.map((pb) => (pb.id === prebookingId ? { ...pb, status: 'cancelled' } : pb))
    );
    showToast('Your pre-booking reservation has been cancelled.', 'info');
  };

  // Test Simulation helper: fast-forward 5 days to demonstrate auto-revocation
  const simulateFastForward5Days = (prebookingId) => {
    const now = Date.now();
    setPrebookings((prev) =>
      prev.map((pb) => {
        if (pb.id === prebookingId) {
          return {
            ...pb,
            expiresAt: now - 1000,
            status: 'expired',
            revokedAt: now
          };
        }
        return pb;
      })
    );
    showToast(
      'Simulated 5 Days Elapsed: Saree pre-booking expired without purchase and was automatically revoked!',
      'warning',
      'Auto-Revocation Tested'
    );
  };

  // ============================================================
  // PURCHASE & PAYMENT GATEWAY INTEGRATION
  // ============================================================
  const initiatePurchase = (saree) => {
    if (!requireAuth('complete your saree purchase')) return;
    setCheckoutSaree(saree);
    setIsPaymentModalOpen(true);
  };

  const completePurchase = ({ paymentMethod, transactionId, paymentDetails }) => {
    if (!checkoutSaree) return;

    const now = Date.now();
    const orderId = `CHANDRA-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
    const gstAmount = Math.round(checkoutSaree.price * 0.05); // 5% Handloom GST
    const totalAmount = checkoutSaree.price + gstAmount;

    const newOrder = {
      orderId,
      transactionId: transactionId || `pay_${Math.random().toString(36).substring(2, 11)}`,
      paymentMethod,
      paymentDetails,
      saree: checkoutSaree,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: '+91 98765 43210',
        shippingAddress: '42, Heritage Enclave, Lake Palace Road, Jaipur, Rajasthan 302001'
      },
      itemPrice: checkoutSaree.price,
      gstAmount,
      shippingFee: 0, // Free insured delivery
      totalPaid: totalAmount,
      createdAt: now,
      status: 'Confirmed & Insured'
    };

    // If this saree was prebooked by current user, mark the prebooking as completed/purchased!
    setPrebookings((prev) =>
      prev.map((pb) =>
        pb.sareeId === checkoutSaree.id && pb.userId === user.id && pb.status === 'active'
          ? { ...pb, status: 'purchased', orderId }
          : pb
      )
    );

    // Reduce stock by 1
    setSarees((prev) =>
      prev.map((s) => (s.id === checkoutSaree.id ? { ...s, stock: Math.max(0, s.stock - 1) } : s))
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setIsPaymentModalOpen(false);
    setIsOrderSuccessOpen(true);
  };

  // ============================================================
  // ADMIN ACTIONS (Add, Edit, Delete, Stock Update)
  // User Requirement: "admin can add new types of sarees with
  // category, new images, details about the saree, origin of the
  // saree, material of the saree, stock count and cost."
  // ============================================================
  const addSaree = (newSaree) => {
    const id = `saree-${Date.now().toString().slice(-5)}`;
    const fullSaree = {
      id,
      rating: 5.0,
      reviewsCount: 1,
      isSilkMarkCertified: newSaree.isSilkMarkCertified ?? true,
      isHandloom: true,
      blousePiece: newSaree.blousePiece || 'Running blouse piece (0.8m)',
      length: '5.5 meters saree + 0.8 meter blouse piece',
      washCare: 'Dry Clean Only',
      tags: ['New Arrival', newSaree.category],
      ...newSaree,
      price: Number(newSaree.price),
      mrp: Number(newSaree.mrp || Math.round(Number(newSaree.price) * 1.25)),
      stock: Number(newSaree.stock || 1),
    };

    setSarees((prev) => [fullSaree, ...prev]);
    showToast(`"${fullSaree.name}" successfully added to the collection!`, 'success', 'Saree Added');
    setAdminAddModalOpen(false);
  };

  const updateSaree = (id, updatedFields) => {
    setSarees((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
    showToast('Saree details updated successfully.', 'success', 'Catalog Updated');
    setEditingSaree(null);
  };

  const deleteSaree = (id) => {
    setSarees((prev) => prev.filter((s) => s.id !== id));
    showToast('Saree removed from catalog.', 'info', 'Removed');
  };

  const updateStock = (id, newStock) => {
    setSarees((prev) =>
      prev.map((s) => (s.id === id ? { ...s, stock: Math.max(0, Number(newStock)) } : s))
    );
    showToast('Stock count updated.', 'success');
  };

  const resetToDefaultCatalog = () => {
    setSarees(INITIAL_SAREES);
    localStorage.removeItem(SAREES_STORAGE_KEY);
    showToast('Catalog restored to original Taneira-style curated collection.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        sarees,
        user,
        isAdminMode,
        setIsAdminMode,
        wishlist,
        prebookings,
        orders,
        toast,
        showToast,

        // Auth
        authModalOpen,
        setAuthModalOpen,
        authActionReason,
        requireAuth,
        loginWithGoogle,
        loginWithFacebook,
        loginAsAdmin,
        logout,

        // Wishlist
        toggleWishlist,
        isInWishlist,

        // Prebookings
        prebookSaree,
        cancelPrebooking,
        getActivePrebookingForSaree,
        getUserActivePrebookings,
        simulateFastForward5Days,
        checkAndRevokeExpiredPrebookings,

        // Purchase
        initiatePurchase,
        checkoutSaree,
        setCheckoutSaree,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        completePurchase,
        lastOrder,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,

        // Admin
        addSaree,
        updateSaree,
        deleteSaree,
        updateStock,
        resetToDefaultCatalog,
        adminAddModalOpen,
        setAdminAddModalOpen,
        editingSaree,
        setEditingSaree,

        // Modals & Navigation
        selectedSareeDetail,
        setSelectedSareeDetail,
        activeTab,
        setActiveTab,

        // Search & Filters
        searchQuery,
        setSearchQuery,
        filterCategory,
        setFilterCategory,
        filterOrigin,
        setFilterOrigin,
        filterMaterial,
        setFilterMaterial,
        filterMaxPrice,
        setFilterMaxPrice,
        sortBy,
        setSortBy
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

