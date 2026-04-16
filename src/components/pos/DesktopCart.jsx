import React from 'react';
import { ShoppingBag, Minus, Plus, Circle, QrCode } from 'lucide-react';

export default function DesktopCart({
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
  return (
    <aside className="hidden lg:flex w-80 xl:w-96 bento-box border-2 border-primary/10 flex-col overflow-hidden">
      <div className="p-5 border-b border-border flex items-center justify-between shrink-0">
        <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
          <Circle size={8} className="fill-primary text-primary animate-pulse" /> Đơn hàng
        </h3>
        <div className="flex items-center gap-3">
          {cart.length > 0 && (
            <button onClick={clearCart} className="text-[10px] font-black text-red-500 uppercase hover:underline">Xóa hết</button>
          )}
          <span className="text-[10px] font-black opacity-30">#POS-001</span>
        </div>
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
        <div className="flex items-center justify-between gap-2 border border-border bg-surface p-2 rounded-[1rem]">
          <span className="text-[10px] font-black uppercase px-2 text-accent tracking-widest">Giảm giá (%)</span>
          <input 
            type="number" 
            min="0" max="100" 
            value={discountPercent || ''} 
            onChange={(e) => setDiscountPercent(Number(e.target.value))}
            placeholder="0"
            className="w-16 bg-background text-right font-black text-primary p-2 rounded-xl focus:outline-none border-2 border-transparent focus:border-primary/30"
          />
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">Tổng cộng</span>
            {discountPercent > 0 && <span className="text-[10px] font-bold text-red-500 line-through">{subtotal.toLocaleString('vi-VN')}đ</span>}
          </div>
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
          onClick={checkout}
          className="w-full py-4 bg-accent text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-20"
        >
          Xác nhận
        </button>
      </div>
    </aside>
  );
}
