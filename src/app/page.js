'use client';

import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  X,
  Zap,
  Circle,
  QrCode,
  Leaf,
  History,
  Sun,
  Moon
} from 'lucide-react';

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

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync theme with html data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    if (typeof window !== 'undefined' && window.navigator.vibrate) window.navigator.vibrate(40);
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0)
    );
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

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
            {isDark
              ? <Sun size={18} className="text-primary sm:hidden" />
              : <Moon size={18} className="text-accent opacity-60 sm:hidden" />
            }
            {isDark
              ? <Sun size={20} className="text-primary hidden sm:block" />
              : <Moon size={20} className="text-accent opacity-60 hidden sm:block" />
            }
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="bento-item border-2 border-primary/20 p-2 sm:p-3 px-3 sm:px-5 hover:border-primary hover:bg-white hover:shadow-md transition-all flex items-center gap-2 sm:gap-3 min-w-0 max-w-[120px] sm:max-w-none font-bold text-accent"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span className="text-[10px] sm:text-sm font-black truncate">
              {cart.length > 0 ? `${total.toLocaleString('vi-VN')}đ` : 'Khay'}
            </span>
            {cart.length > 0 && (
              <span className="bg-primary text-white text-[9px] sm:text-xs font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex gap-4 overflow-hidden min-h-0">

        {/* Menu Section */}
        <section className="flex-3 flex flex-col gap-4 min-h-0">
          {/* Category pills */}
          <div className="flex gap-3">
            <div className="bento-box bg-surface px-5 py-3 flex items-center gap-2">
              <Zap size={16} className="text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-accent">Healthy Choice</span>
            </div>
            <div className="bento-box bg-surface px-5 py-3 flex items-center gap-2">
              <History size={16} className="text-primary" />
              <span className="text-xs font-black uppercase tracking-widest text-accent">Best Sellers</span>
            </div>
          </div>

          {/* Menu Grid - Scroll wrapper */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
              {MENU_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => addToCart(item)}
                  className="bento-item animate-bento flex flex-col p-6 text-left hover:-translate-y-1 hover:shadow-xl border-transparent hover:border-primary/40"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="text-5xl mb-5">{item.image}</div>
                  <h3 className="font-black text-base leading-tight uppercase tracking-tighter mb-2 text-accent">{item.name}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-black text-primary tracking-tighter">{(item.price / 1000)}k</span>
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                      <Plus size={18} strokeWidth={3} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Desktop Cart Panel */}
        <aside className="hidden lg:flex w-80 xl:w-96 bento-box border-2 border-primary/10 flex-col overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between shrink-0">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
              <Circle size={8} className="fill-primary text-primary animate-pulse" /> Đơn hàng
            </h3>
            <span className="text-[10px] font-black opacity-30">#POS-001</span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-10 py-12">
                <ShoppingBag size={56} />
                <p className="text-xs font-black uppercase mt-4">Khay trống</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="p-4 rounded-[1.25rem] bg-background border border-border flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="text-2xl shrink-0">{item.image}</span>
                    <div className="truncate">
                      <p className="font-black text-xs uppercase truncate text-accent">{item.name}</p>
                      <p className="text-primary font-bold text-[11px]">{item.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Minus size={12} /></button>
                    <span className="text-sm font-black w-4 text-center text-accent">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="w-7 h-7 rounded-xl bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"><Plus size={12} /></button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-5 border-t border-border space-y-4 bg-background shrink-0">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">Tổng cộng</span>
              <span className="text-3xl font-black text-primary tracking-tighter">{total.toLocaleString('vi-VN')}đ</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex flex-col items-center justify-center p-4 rounded-[1.5rem] border border-border bg-surface hover:border-primary transition-colors">
                <QrCode size={22} className="mb-1 text-primary" />
                <span className="text-[10px] font-black uppercase text-accent">VietQR</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 rounded-[1.5rem] bg-primary text-white hover:opacity-90 transition-all active:scale-95 shadow-lg">
                <div className="text-xl mb-1">💵</div>
                <span className="text-[10px] font-black uppercase">Cash</span>
              </button>
            </div>
            <button
              disabled={cart.length === 0}
              className="w-full py-4 bg-accent text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-20"
            >
              Xác nhận
            </button>
          </div>
        </aside>
      </main>

      {/* Mobile Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full sm:max-w-md h-full bg-surface shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="p-4 sm:p-6 border-b border-border flex justify-between items-center bg-secondary/20">
              <div>
                <h2 className="text-lg sm:text-xl font-black uppercase text-accent leading-none">Giỏ hàng của bạn</h2>
                <p className="text-[10px] font-bold opacity-30 mt-1 uppercase tracking-widest">Street Food POS</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 bento-item flex items-center justify-center bg-surface hover:bg-primary hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10 py-20">
                  <ShoppingBag size={64} />
                  <p className="text-sm font-black uppercase mt-4 tracking-widest">Trống khay</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="p-4 bg-background rounded-[1.5rem] border border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl shrink-0">{item.image}</span>
                      <div>
                        <p className="font-black text-xs uppercase text-accent truncate max-w-[120px]">{item.name}</p>
                        <p className="text-primary font-bold text-xs mt-0.5">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button onClick={() => removeFromCart(item.id)} className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white"><Minus size={14} /></button>
                      <span className="font-black text-accent w-4 text-center text-sm">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white"><Plus size={14} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 sm:p-6 bg-background border-t border-border space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-black opacity-40 uppercase tracking-widest">Tổng tiền</span>
                <span className="text-3xl font-black text-primary tracking-tighter">{total.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border border-border bg-surface hover:border-primary transition-all active:scale-95 group">
                  <QrCode size={20} className="mb-1 text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase text-accent">VietQR</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-primary text-white shadow-lg active:scale-95 transition-all group">
                  <div className="text-xl mb-1 group-hover:rotate-12 transition-transform">💵</div>
                  <span className="text-[10px] font-black uppercase">Tiền mặt</span>
                </button>
              </div>
              <button className="w-full py-4 bg-accent text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl active:scale-95 transition-all disabled:opacity-30">
                Xác nhận & In bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
