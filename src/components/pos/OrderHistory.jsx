import React from "react";
import { X, Clock, CheckCircle, Edit3 } from "lucide-react";

export default function OrderHistory({
  isOpen,
  onClose,
  orders,
  onMarkAsPaid,
  onEditOrder,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-80 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Sidebar Sheet */}
      <div className="relative w-full sm:max-w-md h-full bg-surface shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        <div className="p-4 sm:p-6 border-b border-border flex justify-between items-center bg-secondary/20 shrink-0">
          <div>
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
              Street Food POS
            </p>
            <h2 className="text-xl font-black uppercase text-accent leading-none mt-1">
              Lịch sử đơn hàng
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bento-item flex items-center justify-center bg-surface hover:bg-primary hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
          {orders.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
              <Clock size={64} className="mb-4" />
              <p className="text-sm font-black uppercase tracking-widest">
                Chưa có đơn nào
              </p>
            </div>
          ) : (
            [...orders].reverse().map((order) => (
              <div
                key={order.id}
                className="bg-background rounded-[1.5rem] p-4 border border-border shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-black text-sm uppercase text-accent tracking-tight">
                        #{order.id}
                      </p>
                      {order.status === "pending" && (
                        <button
                          title="Sửa đơn này"
                          onClick={() => onEditOrder(order.id)}
                          className="text-primary hover:bg-primary/10 p-1 rounded-md transition-colors"
                        >
                          <Edit3 size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] font-bold text-accent/50 mt-0.5">
                      {new Date(order.timestamp).toLocaleTimeString("vi-VN")} -{" "}
                      {new Date(order.timestamp).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    {order.status === "pending" ? (
                      <span className="text-[10px] font-black uppercase text-yellow-600 bg-yellow-500/10 px-2 py-1 rounded-md flex items-center gap-1 border border-yellow-500/20">
                        <Clock size={10} /> Chờ thanh toán
                      </span>
                    ) : (
                      <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-2 py-1 rounded-md flex items-center gap-1 border border-primary/20">
                        <CheckCircle size={10} /> Đã xong
                      </span>
                    )}
                    <span className="text-[9px] font-bold mt-1 text-accent/60 uppercase">
                      {order.paymentMethod === "vietqr" ? "VietQR" : "Tiền mặt"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start">
                      <div className="flex gap-2 min-w-0">
                        <span className="font-black text-xs text-accent/50 bg-secondary px-1.5 py-0.5 rounded-md h-fit">
                          {item.quantity}x
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-accent truncate">
                            {item.name}
                          </p>
                          {(item.tags?.length > 0 || item.customNote) && (
                            <p className="text-[10px] text-accent/60 italic truncate mt-0.5">
                              {item.tags
                                ?.map((t) =>
                                  typeof t === "string" ? t : t.label,
                                )
                                .join(", ")}
                              {item.customNote ? ` - ${item.customNote}` : ""}
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="font-bold text-xs text-accent/70 shrink-0 ml-2">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-end border-t border-border/50 pt-3 mt-3">
                  {order.discountAmount > 0 ? (
                    <p className="text-[10px] font-bold text-red-500">
                      Đã giảm {order.discountAmount.toLocaleString("vi-VN")}đ
                    </p>
                  ) : (
                    <div />
                  )}
                  <div className="flex items-center gap-3">
                    {order.status === "pending" && (
                      <button
                        onClick={() => onMarkAsPaid(order.id)}
                        className="bg-primary text-white text-[10px] font-black uppercase px-3 py-2 rounded-xl active:scale-95 transition-all shadow-md animate-pulse hover:animate-none"
                      >
                        Thu tiền ngay
                      </button>
                    )}
                    <h3 className="font-black text-lg text-primary">
                      {order.total.toLocaleString("vi-VN")}đ
                    </h3>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
