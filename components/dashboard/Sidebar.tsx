"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CrownIcon,
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

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col bg-sidebar border-r border-sidebar-border">

      {/* Logo */}
      <div className="px-6 py-7 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient shadow-gold">
            <CrownIcon className="h-5 w-5 text-primary-foreground" />
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
        <div className="text-xs text-muted-foreground">Connecté en tant que</div>
        <div className="text-sm font-medium text-sidebar-foreground">Admin</div>
      </div>

    </aside>
  );
}