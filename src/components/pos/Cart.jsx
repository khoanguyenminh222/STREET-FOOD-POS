import React from "react";
import { ShoppingBag, Circle, QrCode, Minus, Plus, X } from "lucide-react";

export const TAG_LABELS = {
  no_onion: { label: "Không hành" },
  no_garlic: { label: "Không tỏi" },
  spicy: { label: "Thêm cay" },
  no_spicy: { label: "Không cay" },
  less_sweet: { label: "Ít ngọt" },
  less_ice: { label: "Ít đá" },
  no_ice: { label: "Không đá" },
  extra_fat: { label: "Thêm tóp mỡ" },
  extra_sauce: { label: "Thêm sốt" },
  takeaway: { label: "Mang về" },
};

function CartItem({ item, updateQuantity, onEditTags }) {
  return (
    <div className="p-3 bg-background rounded-[1.25rem] sm:rounded-[1.5rem] border border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <span className="text-xl sm:text-3xl shrink-0">{item.image}</span>
          <div className="truncate">
            <p className="font-black text-xs uppercase truncate text-accent max-w-[100px] sm:max-w-[120px]">
              {item.name}
            </p>
            <p className="text-primary font-bold text-[11px] sm:text-xs mt-0.5">
              {item.price.toLocaleString("vi-VN")}đ
            </p>
            <button
              onClick={() => onEditTags(item)}
              className="mt-0.5 text-[9px] sm:text-[10px] text-primary/70 hover:text-primary font-bold uppercase tracking-widest flex items-center gap-1"
            >
              + Ghi chú
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-1">
          <button
            onClick={() => updateQuantity(item.uid, -1)}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="text-[10px] sm:text-sm font-black w-3 sm:w-4 text-center text-accent">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.uid, 1)}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-surface border border-border flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      {(item.tags?.length > 0 || item.customNote) && (
        <div className="flex flex-wrap gap-1 mt-2.5 sm:ml-2">
          {item.tags?.map(
            (t) =>
              TAG_LABELS[t] && (
                <span
                  key={t}
                  className="text-[9px] sm:text-[10px] font-bold bg-primary/10 text-primary px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-primary/20"
                >
                  {TAG_LABELS[t].label}
                </span>
              ),
          )}
          {item.customNote && (
            <span className="text-[9px] sm:text-[10px] font-bold bg-secondary/50 text-accent px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-border italic mb-0.5">
              " {item.customNote} "
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function CartFooter({
  cart,
  total,
  subtotal,
  discountPercent,
  setDiscountPercent,
  paymentMethod,
  setPaymentMethod,
  checkout,
}) {
  return (
    <div className="p-4 sm:p-5 lg:p-5 bg-background border-t border-border space-y-4">
      <div className="flex items-center justify-between gap-2 border border-border bg-surface p-2 rounded-2xl lg:rounded-2xl">
        <span className="text-[10px] sm:text-xs font-black uppercase px-2 text-accent tracking-widest">
          Giảm giá (%)
        </span>
        <input
          type="number"
          min="0"
          max="100"
          value={discountPercent || ""}
          onChange={(e) => setDiscountPercent(Number(e.target.value))}
          placeholder="0"
          className="w-16 sm:w-20 bg-background text-right font-black text-sm sm:text-xl lg:text-base text-primary p-2 rounded-xl focus:outline-none border-2 border-transparent focus:border-primary/30"
        />
      </div>
      <div className="flex justify-between items-end sm:items-center lg:items-end px-1">
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs lg:text-[10px] font-black opacity-40 uppercase tracking-widest">
            Tổng cộng
          </span>
          {discountPercent > 0 && (
            <span className="text-[10px] font-bold text-red-500 line-through">
              {subtotal.toLocaleString("vi-VN")}đ
            </span>
          )}
        </div>
        <span className="text-3xl sm:text-4xl lg:text-3xl font-black text-primary tracking-tighter">
          {total.toLocaleString("vi-VN")}đ
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button 
          onClick={() => setPaymentMethod('vietqr')}
          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl lg:rounded-[1.5rem] border-2 transition-all active:scale-95 group 
            ${paymentMethod === 'vietqr' ? 'border-primary bg-primary/10' : 'border-border bg-surface hover:border-primary/50'}`}
        >
          <QrCode
            size={20}
            className={`mb-1 transition-transform ${paymentMethod === 'vietqr' ? 'text-primary' : 'text-accent/50 group-hover:text-primary'} group-hover:scale-110`}
          />
          <span className={`text-[10px] font-black uppercase ${paymentMethod === 'vietqr' ? 'text-primary' : 'text-accent/50'}`}>
            VietQR
          </span>
        </button>
        <button 
          onClick={() => setPaymentMethod('cash')}
          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl lg:rounded-[1.5rem] border-2 transition-all active:scale-95 group 
            ${paymentMethod === 'cash' ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30' : 'border-border bg-surface text-accent/50 hover:border-primary/50'}`}
        >
          <div className="text-xl mb-1 group-hover:rotate-12 transition-transform">
            💵
          </div>
          <span className={`text-[10px] font-black uppercase ${paymentMethod === 'cash' ? 'text-white' : 'text-accent/50'}`}>Tiền mặt</span>
        </button>
      </div>
      <button
        disabled={cart.length === 0}
        onClick={checkout}
        className="w-full py-4 text-base lg:text-sm bg-accent text-white rounded-2xl lg:rounded-[1.5rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all disabled:opacity-30 hover:opacity-90 flex items-center justify-center gap-2"
      >
        <span>Xác nhận</span>
        {cart.length > 0 && <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">{paymentMethod === 'vietqr' ? 'VietQR' : 'Cash'}</span>}
      </button>
    </div>
  );
}

export default function Cart({
  isCartOpen,
  setIsCartOpen,
  cart,
  total,
  subtotal,
  discountPercent,
  setDiscountPercent,
  paymentMethod,
  setPaymentMethod,
  updateQuantity,
  clearCart,
  checkout,
  onEditTags,
}) {
  return (
    <>
      {/* Desktop Cart */}
      <aside className="hidden lg:flex w-80 xl:w-96 bento-box border-2 border-primary/10 flex-col overflow-hidden">
        <div className="p-5 border-b border-border flex items-center justify-between shrink-0">
          <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
            <Circle
              size={8}
              className="fill-primary text-primary animate-pulse"
            />{" "}
            Đơn hàng
          </h3>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[10px] font-black text-red-500 uppercase hover:underline"
              >
                Xóa hết
              </button>
            )}
            <span className="text-[10px] font-black opacity-30">#POS-001</span>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-2 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-10 py-12">
              <ShoppingBag size={56} />
              <p className="text-xs font-black uppercase mt-4">Khay trống</p>
            </div>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.uid}
                item={item}
                updateQuantity={updateQuantity}
                onEditTags={onEditTags}
              />
            ))
          )}
        </div>

        <CartFooter
          cart={cart}
          total={total}
          subtotal={subtotal}
          discountPercent={discountPercent}
          setDiscountPercent={setDiscountPercent}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          checkout={checkout}
        />
      </aside>

      {/* Mobile Cart Sheet */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full sm:max-w-md h-full bg-surface shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="p-4 sm:p-6 border-b border-border flex justify-between items-center bg-secondary/20 shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-black uppercase text-accent leading-none">
                  Giỏ hàng của bạn
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
                    Street Food POS
                  </p>
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-[10px] font-black text-red-500 uppercase hover:underline"
                    >
                      Xóa hết
                    </button>
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

            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-3 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-10 py-20">
                  <ShoppingBag size={64} />
                  <p className="text-sm font-black uppercase mt-4 tracking-widest">
                    Trống khay
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <CartItem
                    key={item.uid}
                    item={item}
                    updateQuantity={updateQuantity}
                    onEditTags={onEditTags}
                  />
                ))
              )}
            </div>

            <CartFooter
              cart={cart}
              total={total}
              subtotal={subtotal}
              discountPercent={discountPercent}
              setDiscountPercent={setDiscountPercent}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              checkout={checkout}
            />
          </div>
        </div>
      )}
    </>
  );
}
