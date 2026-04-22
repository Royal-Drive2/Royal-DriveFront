"use client";

type Status = "actif" | "inactif";

type Props = {
  status: Status;
  size?: "sm" | "md";
};

const config: Record<Status, { bg: string; color: string; border: string; label: string; dot: string }> = {
  actif: {
    bg:     "rgba(74,222,128,0.12)",
    color:  "#4ade80",
    border: "rgba(74,222,128,0.35)",
    dot:    "#4ade80",
    label:  "Actif",
  },
  inactif: {
    bg:     "rgba(255,255,255,0.06)",
    color:  "rgba(255,255,255,0.45)",
    border: "rgba(255,255,255,0.15)",
    dot:    "rgba(255,255,255,0.35)",
    label:  "Inactif",
  },
};

export default function StatusBadge({ status, size = "md" }: Props) {
  const s = config[status];
  const px = size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3.5 py-1.5 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${px}`}
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}
