"use client";

// ─── Types ────────────────────────────────────────────────────────────────────

type Props = {
  prenom: string;
  nom: string;
  photoUrl?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  sm:  "h-9 w-9 text-sm",
  md:  "h-12 w-12 text-base",
  lg:  "h-20 w-20 text-2xl",
  xl:  "h-32 w-32 text-4xl",
};

// ─── Composant ────────────────────────────────────────────────────────────────

export default function DriverAvatar({ prenom, nom, photoUrl, size = "md", className = "" }: Props) {
  const initiales = `${prenom[0] ?? ""}${nom[0] ?? ""}`.toUpperCase() || "?";

  return (
    <div
      className={`relative flex-shrink-0 rounded-full overflow-hidden ${sizes[size]} ${className}`}
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={`Photo de ${prenom} ${nom}`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-gold-gradient flex items-center justify-center
                        text-primary-foreground font-bold select-none">
          {initiales}
        </div>
      )}
    </div>
  );
}
