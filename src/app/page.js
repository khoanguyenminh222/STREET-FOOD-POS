'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Leaf, Sun, Moon } from 'lucide-react';
import MenuGrid from '../components/pos/MenuGrid';
import Cart from '../components/pos/Cart';
import QuickTagModal from '../components/pos/QuickTagModal';

const MENU_ITEMS = [
  { id: 1, name: 'Gỏi Cuốn Tôm Thịt', price: 25000, category: 'Healthy', image: '🥗' },
  { id: 2, name: 'Bánh Mì Ngũ Cốc', price: 35000, category: 'Healthy', image: '🥪' },
  { id: 3, name: 'Salad Hoa Quả', price: 30000, category: 'Healthy', image: '🍓' },
  { id: 4, name: 'Nước Ép Cần Tây', price: 25000, category: 'Drink', image: '🥤' },
  { id: 5, name: 'Trà Xanh Mật Ong', price: 15000, category: 'Drink', image: '🍵' },
  { id: 6, name: 'Sinh Tố Bơ', price: 30000, category: 'Drink', image: '🥑' },
  { id: 7, name: 'Nước Cam Ép', price: 20000, category: 'Drink', image: '🍊' },
  { id: 8, name: 'Hạt Ngũ Cốc', price: 10000, category: 'Snack', image: '🥜' },
];

let uidCounter = 0;

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [editingItem, setEditingItem] = useState(null); // item being tag-edited

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Check if identical row exists (same id, no tags, no customNote)
  const addToCart = (item) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(i => i.id === item.id && (!i.tags || i.tags.length === 0) && !i.customNote);
      if (existingIdx >= 0) {
        const newCart = [...prev];
        newCart[existingIdx].quantity += 1;
        return newCart;
      }
      return [...prev, { ...item, uid: `${item.id}-${++uidCounter}`, quantity: 1, tags: [], customNote: '' }];
    });
    if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(40);
  };

  const updateQuantity = (uid, delta) => {
    setCart(prev => prev.map(i => {
      if (i.uid === uid) return { ...i, quantity: i.quantity + delta };
      return i;
    }).filter(i => i.quantity > 0));
  };

  const updateItemTags = (uid, tags, customNote) => {
    setCart(prev => {
      const updated = prev.map(i => i.uid === uid ? { ...i, tags, customNote } : i);

      // Consolidate: Merge items that now have identical ID, Tags, and CustomNote
      const merged = [];
      updated.forEach(item => {
        const tagsStr = [...(item.tags || [])].sort().join(',');
        const noteStr = (item.customNote || '').trim().toLowerCase();
        
        const existing = merged.find(m => 
          m.id === item.id && 
          [...(m.tags || [])].sort().join(',') === tagsStr &&
          (m.customNote || '').trim().toLowerCase() === noteStr
        );

        if (existing) {
          existing.quantity += item.quantity;
        } else {
          merged.push({ ...item });
        }
      });
      return merged;
    });
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
    uidCounter = 0;
  };

  const checkout = () => {
    if (cart.length === 0) return;
    clearCart();
    setIsCartOpen(false);
    if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(100);
    alert('Đơn hàng đã được xác nhận!');
  };

  const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const discountAmount = subtotal * ((discountPercent || 0) / 100);
  const total = subtotal - discountAmount;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="h-dvh w-full overflow-hidden overflow-x-hidden bg-background text-foreground flex flex-col p-4 md:p-8 gap-4 max-w-[1600px] mx-auto">

      {/* Bento Header */}
      <header className="bento-box p-3 sm:p-5 flex items-center justify-between overflow-hidden gap-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 shrink">
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <Leaf size={18} className="text-white sm:hidden" />
            <Leaf size={22} className="text-white hidden sm:block" />
          </div>
          <div className="min-w-0 shrink">
            <h1 className="text-base sm:text-xl font-black uppercase leading-none tracking-tight truncate">
              FRESH<span className="text-primary italic">MINT</span>
            </h1>
            <p className="text-[8px] sm:text-[10px] font-bold opacity-30 tracking-widest uppercase mt-0.5 truncate">
              {isDark ? 'Rừng Tối' : 'Tươi Sáng'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="bento-item p-2 sm:p-3 flex items-center justify-center hover:border-primary hover:shadow-md hover:bg-white transition-all shrink-0"
            title="Đổi sáng/tối"
          >
            {isDark ? <Sun size={18} className="text-primary sm:hidden" /> : <Moon size={18} className="text-accent opacity-60 sm:hidden" />}
            {isDark ? <Sun size={20} className="text-primary hidden sm:block" /> : <Moon size={20} className="text-accent opacity-60 hidden sm:block" />}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="lg:hidden bento-item border-2 border-primary/20 p-2 sm:p-3 px-3 sm:px-5 hover:border-primary hover:bg-white hover:shadow-md transition-all flex items-center gap-2 sm:gap-3 min-w-0 max-w-[120px] sm:max-w-none font-bold text-accent"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="text-[10px] sm:text-sm font-black truncate">
              {totalItems > 0 ? `${total.toLocaleString('vi-VN')}đ` : 'Khay'}
            </span>
            {totalItems > 0 && (
              <span className="bg-primary text-white text-[9px] sm:text-xs font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex gap-4 overflow-hidden min-h-0">
        <MenuGrid menuItems={MENU_ITEMS} addToCart={addToCart} />

        <Cart
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          cart={cart}
          total={total}
          subtotal={subtotal}
          discountPercent={discountPercent}
          setDiscountPercent={setDiscountPercent}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          checkout={checkout}
          onEditTags={setEditingItem}
        />
      </main>

      {/* Quick Tag Modal — shared for desktop and mobile */}
      {editingItem && (
        <QuickTagModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={updateItemTags}
        />
      )}
    </div>
  );
}
