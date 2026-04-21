"use client";

type Props = {
  label: string;
  value: React.ReactNode;
  icon?: React.FC<{ className?: string }>;
};

export default function InfoRow({ label, value, icon: Icon }: Props) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-white/[0.06] last:border-0">
      <div className="flex items-center gap-2 min-w-0">
        {Icon && <Icon className="h-4 w-4 opacity-30 flex-shrink-0" />}
        <span className="text-xs font-medium opacity-40 uppercase tracking-widest whitespace-nowrap">
          {label}
        </span>
      </div>
      <div className="text-sm font-medium text-right">
        {value ?? <span className="opacity-25 italic font-normal">—</span>}
      </div>
    </div>
  );
}
