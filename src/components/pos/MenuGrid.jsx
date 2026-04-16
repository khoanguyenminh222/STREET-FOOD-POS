import React from 'react';
import { Zap, History, Plus } from 'lucide-react';

export default function MenuGrid({ menuItems, addToCart }) {
  return (
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
          {menuItems.map((item, idx) => (
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
  );
}
