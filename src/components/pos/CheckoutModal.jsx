import React from 'react';
import { X, CheckCircle, QrCode } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart, total, paymentMethod, onConfirm }) {
  if (!isOpen) return null;

  // Fake bank credentials - can be updated later in an admin settings page
  const BANK_ID = "MB";
  const ACCOUNT_NO = "0123456789"; 
  const ACCOUNT_NAME = "CHU QUAN";
  const DESCRIPTION = encodeURIComponent("Thanh toan don POS");

  const vietQrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-print.png?amount=${total}&addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface rounded-[2rem] shadow-2xl p-6 sm:p-8 flex flex-col items-center animate-in zoom-in-95 duration-300 border border-border">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 bg-background border border-border rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-black uppercase text-accent mt-2 tracking-tight">Xác nhận đơn hàng</h2>
        <p className="text-[10px] sm:text-xs font-bold opacity-50 uppercase tracking-widest mt-1 mb-8">
          {paymentMethod === 'vietqr' ? 'Thanh toán chuyển khoản' : 'Thanh toán tiền mặt'}
        </p>

        {paymentMethod === 'vietqr' ? (
          <div className="w-full flex flex-col items-center p-6 sm:p-8 bg-white rounded-[1.5rem] shadow-inner border border-border/50 mb-8">
            <div className="relative w-full max-w-[260px] sm:max-w-[320px] aspect-square rounded-xl overflow-hidden mb-4">
               <img src={vietQrUrl} alt="VietQR" className="w-full h-full object-contain" />
            </div>
            <p className="text-[10px] font-black uppercase text-accent/50 bg-secondary px-3 py-1.5 rounded-full">Quét mã bằng App Ngân Hàng</p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center p-6 bg-primary/10 rounded-[1.5rem] border border-primary/20 mb-8 py-12">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 shadow-xl">
              <span className="text-4xl text-white">💵</span>
            </div>
            <p className="text-xs font-bold uppercase text-primary/70 mb-2 tracking-widest">Thu của khách</p>
            <h3 className="text-5xl font-black text-primary tracking-tighter">{total.toLocaleString('vi-VN')}đ</h3>
          </div>
        )}

        <div className="w-full flex gap-2 sm:gap-3">
          <button
            onClick={() => onConfirm('pending')}
            className="flex-1 py-4 sm:py-5 bg-background text-accent border-2 border-border rounded-[1.5rem] font-black text-[10px] sm:text-xs uppercase tracking-widest active:scale-95 transition-all hover:bg-secondary/50 flex flex-col items-center justify-center"
          >
            Lưu chờ
          </button>
          <button
            onClick={() => onConfirm('paid')}
            className="flex-[2] py-4 sm:py-5 bg-accent text-white rounded-[1.5rem] font-black text-lg sm:text-lg uppercase tracking-widest active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2 hover:opacity-90"
          >
            <CheckCircle size={20} /> ĐÃ NHẬN TIỀN
          </button>
        </div>
      </div>
    </div>
  );
}
