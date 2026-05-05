"use client";

import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HouseIcon,
  CarIcon,
  UsersIcon,
  CalendarCheckIcon,
  Building2Icon,
  SettingsIcon,
} from "./icons";

const navItems = [
  { href: "/dashboard",              label: "Accueil",      Icon: HouseIcon },
  { href: "/dashboard/vehicules",    label: "Véhicules",    Icon: CarIcon },
  { href: "/dashboard/chauffeurs",   label: "Chauffeurs",   Icon: UsersIcon },
  { href: "/dashboard/reservations", label: "Réservations", Icon: CalendarCheckIcon },
  { href: "/dashboard/logements",    label: "Logements",    Icon: Building2Icon },
  { href: "/dashboard/parametres",   label: "Paramètres",   Icon: SettingsIcon },
];

// ─── Modale déconnexion ───────────────────────────────────────────────────────

function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="card-dashboard rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icône */}
        <div
          className="h-12 w-12 rounded-full flex items-center justify-center mb-4 mx-auto"
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
        >
          <FiLogOut className="h-5 w-5 text-red-400" />
        </div>

        <h3 className="text-lg font-semibold text-center mb-1">Se déconnecter ?</h3>
        <p className="text-sm opacity-50 text-center mb-6">
          Vous allez quitter votre session admin. Vous devrez vous reconnecter pour accéder au dashboard.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition"
            style={{ background: "rgba(239,68,68,0.85)", color: "#fff" }}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("rd_token");
    router.push("/dashboard/register");
  };

  return (
    <>
      {/* Modale déconnexion */}
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col bg-sidebar border-r border-sidebar-border">

        {/* Logo */}
        <div className="px-6 py-7 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="relative h-20 w-20">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-contain p-1"
              />
            </span>
            <span>
              <span className="block font-display text-lg leading-tight text-gold-gradient font-semibold">
                Royal Drive
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Cameroun
              </span>
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                isActive(href)
                  ? "bg-gold-gradient text-primary-foreground shadow-gold"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
              aria-current={isActive(href) ? "page" : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-sidebar-border">
          <div className="flex flex-col gap-2">
            <div className="text-xs text-muted-foreground">Connecté en tant que</div>
            <div className="text-sm font-medium text-sidebar-foreground">Admin</div>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition mt-2"
            >
              <FiLogOut className="h-4 w-4" />
              Déconnexion
            </button>
          </div>
        </div>

      </aside>
    </>
  );
}