import React from "react";
import { X } from "lucide-react";

const QUICK_TAGS = [
  { id: "no_onion", label: "Không hành" },
  { id: "no_garlic", label: "Không tỏi" },
  { id: "spicy", label: "Thêm cay" },
  { id: "no_spicy", label: "Không cay" },
  { id: "less_sweet", label: "Ít ngọt" },
  { id: "less_ice", label: "Ít đá" },
  { id: "no_ice", label: "Không đá" },
  { id: "extra_fat", label: "Thêm tóp mỡ" },
  { id: "extra_sauce", label: "Thêm sốt" },
  { id: "takeaway", label: "Mang về" },
];

export default function QuickTagModal({ item, onClose, onSave }) {
  const [selected, setSelected] = React.useState(item?.tags || []);
  const [customNote, setCustomNote] = React.useState(item?.customNote || "");

  const toggle = (tagId) => {
    setSelected((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId],
    );
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full bg-surface rounded-t-[2rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-border rounded-full opacity-50" />
        </div>

        {/* Header */}
        <div className="px-5 pb-4 flex items-center justify-between border-b border-border">
          <div>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
              Ghi chú cho
            </p>
            <h3 className="font-black text-base text-accent uppercase flex items-center gap-2">
              <span>{item.image}</span> {item.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tags Grid */}
        <div className="p-5 grid grid-cols-3 sm:grid-cols-4 gap-2">
          {QUICK_TAGS.map((tag) => {
            const isOn = selected.includes(tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => toggle(tag.id)}
                className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all active:scale-95
                  ${
                    isOn
                      ? "bg-primary/10 border-primary text-primary shadow-sm"
                      : "bg-background border-border text-foreground opacity-60"
                  }`}
              >
                <span className="text-[10px] font-black uppercase text-center leading-tight">
                  {tag.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Note Input */}
        <div className="px-5 py-2">
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-2 px-1">
            Ghi chú bằng chữ:
          </p>
          <input
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="Nhập ghi chú"
            className="w-full bg-background border border-border p-4 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/40 focus:bg-white transition-all"
          />
        </div>

        {/* Save */}
        <div className="px-5 pb-8 pt-4">
          <button
            onClick={() => {
              onSave(item.uid, selected, customNote);
              onClose();
            }}
            className="w-full py-4 bg-accent text-white rounded-2xl font-black text-base uppercase tracking-widest active:scale-95 transition-all shadow-lg"
          >
            Xong — Lưu ghi chú
          </button>
        </div>
      </div>
    </div>
  );
}
