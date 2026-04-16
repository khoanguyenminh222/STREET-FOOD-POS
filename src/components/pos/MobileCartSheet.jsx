import React from 'react';
import { ShoppingBag, Minus, Plus, X, QrCode } from 'lucide-react';

export default function MobileCartSheet({
  isCartOpen,
  setIsCartOpen,
  cart,
  total,
  subtotal,
  discountPercent,
  setDiscountPercent,
  addToCart,
  removeFromCart,
  clearCart,
  checkout
}) {
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsCartOpen(false)} />
      <div className="relative w-full sm:max-w-md h-full bg-surface shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        <div className="p-4 sm:p-6 border-b border-border flex justify-between items-center bg-secondary/20">
          <div>
            <h2 className="text-lg sm:text-xl font-black uppercase text-accent leading-none">Giỏ hàng của bạn</h2>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Street Food POS</p>
              {cart.length > 0 && (
                <button onClick={clearCart} className="text-[10px] font-black text-red-500 uppercase hover:underline">Xóa hết</button>
              )}
            </div>
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
          <div className="flex items-center justify-between gap-2 border border-border bg-surface p-2 rounded-2xl">
            <span className="text-xs font-black uppercase px-2 text-accent tracking-widest">Giảm giá (%)</span>
            <input 
              type="number" 
              min="0" max="100" 
              value={discountPercent || ''} 
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              placeholder="0"
              className="w-20 bg-background text-right font-black text-xl text-primary p-2 rounded-xl focus:outline-none border-2 border-transparent focus:border-primary/30"
            />
          </div>
          <div className="flex justify-between items-center px-1">
            <div className="flex flex-col">
              <span className="text-xs font-black opacity-40 uppercase tracking-widest">Tổng tiền</span>
              {discountPercent > 0 && <span className="text-[10px] font-bold text-red-500 line-through">{subtotal.toLocaleString('vi-VN')}đ</span>}
            </div>
            <span className="text-3xl sm:text-4xl font-black text-primary tracking-tighter">{total.toLocaleString('vi-VN')}đ</span>
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
          <button 
            disabled={cart.length === 0}
            onClick={checkout}
            className="w-full py-4 bg-accent text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl active:scale-95 transition-all disabled:opacity-30">
            Xác nhận & In bill
          </button>
        </div>
      </div>
    </div>
  );
}
