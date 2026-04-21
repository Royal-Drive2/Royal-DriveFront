"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DriverAvatar from "@/components/dashboard/view/components/DriverAvatar";
import StatusBadge from "@/components/dashboard/view/components/StatusBadge";
import InfoRow from "@/components/dashboard/view/components/InfoRow";
import PhotoLightbox from "@/components/dashboard/view/components/PhotoLightbox";

// ─── Icônes ───────────────────────────────────────────────────────────────────

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const PencilIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const CarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const IdCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const ExpandIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type Chauffeur = {
  id: string;
  prenom: string;
  nom: string;
  telephone: string;
  categoriePermis?: string;
  vehicule?: string;
  immatriculation?: string;
  dateNaissance?: string;
  dateCreation?: string;
  statut: "actif" | "inactif";
  photoUrl?: string;
};

type Props = {
  chauffeur: Chauffeur;
  onDelete?: (id: string) => void;
};

// ─── Modale de confirmation suppression ──────────────────────────────────────

function DeleteModal({ nom, onConfirm, onCancel }: {
  nom: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="card-dashboard rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icône danger */}
        <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 mx-auto"
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
          <TrashIcon className="h-5 w-5 text-red-400" />
        </div>

        <h3 className="text-lg font-semibold text-center mb-1">Supprimer ce chauffeur ?</h3>
        <p className="text-sm opacity-50 text-center mb-6">
          <span className="font-medium opacity-100">{nom}</span> sera définitivement supprimé.
          Cette action est irréversible.
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
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section card ─────────────────────────────────────────────────────────────

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-dashboard rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-white/[0.06]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-35">{title}</p>
      </div>
      <div className="px-5">{children}</div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function ViewChauffeurPage({ chauffeur, onDelete }: Props) {
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fullName = `${chauffeur.prenom} ${chauffeur.nom}`;

  const handleDelete = () => {
    onDelete?.(chauffeur.id);
    router.push("/chauffeurs");
  };

  return (
    <>
      {/* ── Lightbox photo ── */}
      {lightboxOpen && chauffeur.photoUrl && (
        <PhotoLightbox
          src={chauffeur.photoUrl}
          alt={fullName}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* ── Modale suppression ── */}
      {deleteOpen && (
        <DeleteModal
          nom={fullName}
          onConfirm={handleDelete}
          onCancel={() => setDeleteOpen(false)}
        />
      )}

      <div className="max-w-2xl mx-auto w-full">

        {/* ── En-tête ── */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-white/10 transition opacity-60 hover:opacity-100"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-semibold truncate">Fiche chauffeur</h1>
            <p className="text-xs opacity-40 mt-0.5">#{chauffeur.id}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/chauffeurs/${chauffeur.id}/modifier`)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10
                         text-sm hover:bg-white/5 transition"
            >
              <PencilIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Modifier</span>
            </button>

            <button
              onClick={() => setDeleteOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm
                         text-red-400 hover:bg-red-500/10 border border-red-500/20
                         hover:border-red-500/40 transition"
            >
              <TrashIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Supprimer</span>
            </button>
          </div>
        </div>

        {/* ── Carte identité principale ── */}
        <div
          className="card-dashboard rounded-2xl p-6 mb-4 flex flex-col sm:flex-row items-center sm:items-start gap-6"
        >
          {/* Photo / Avatar cliquable */}
          <div className="relative flex-shrink-0 group">
            <DriverAvatar
              prenom={chauffeur.prenom}
              nom={chauffeur.nom}
              photoUrl={chauffeur.photoUrl}
              size="xl"
              className="ring-4 ring-white/10"
            />

            {/* Overlay agrandir — uniquement si photo */}
            {chauffeur.photoUrl && (
              <button
                onClick={() => setLightboxOpen(true)}
                title="Voir la photo en grand"
                className="absolute inset-0 rounded-full flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition duration-200"
                style={{ background: "rgba(0,0,0,0.45)" }}
              >
                <ExpandIcon className="h-7 w-7" />
              </button>
            )}
          </div>

          {/* Infos principales */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h2 className="text-2xl font-semibold">{fullName}</h2>
              <StatusBadge status={chauffeur.statut} />
            </div>

            <p className="opacity-40 text-sm mb-4">{chauffeur.telephone}</p>

            {/* Raccourci appel */}
            <a
              href={`tel:${chauffeur.telephone}`}
              className="btn-gold inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm shadow-gold"
            >
              <PhoneIcon className="h-4 w-4" />
              Appeler
            </a>
          </div>
        </div>

        {/* ── Infos détaillées ── */}
        <div className="grid grid-cols-1 gap-4">

          {/* Identité */}
          <SectionCard title="Identité">
            <InfoRow label="Prénom"          icon={UserIcon}     value={chauffeur.prenom} />
            <InfoRow label="Nom"             icon={UserIcon}     value={chauffeur.nom} />
            <InfoRow label="Date naissance"  icon={CalendarIcon} value={chauffeur.dateNaissance} />
          </SectionCard>

          {/* Contact */}
          <SectionCard title="Contact">
            <InfoRow label="Téléphone" icon={PhoneIcon} value={
              <a
                href={`tel:${chauffeur.telephone}`}
                className="hover:opacity-70 transition"
                style={{ color: "#D4AF37" }}
              >
                {chauffeur.telephone}
              </a>
            } />
          </SectionCard>

          {/* Permis */}
          <SectionCard title="Permis de conduire">
            <InfoRow label="Catégorie" icon={IdCardIcon} value={chauffeur.categoriePermis} />
          </SectionCard>

          {/* Véhicule */}
          <SectionCard title="Véhicule assigné">
            <InfoRow label="Modèle"          icon={CarIcon} value={chauffeur.vehicule} />
            <InfoRow label="Immatriculation" icon={CarIcon} value={chauffeur.immatriculation} />
          </SectionCard>

          {/* Méta */}
          <SectionCard title="Informations système">
            <InfoRow label="ID"              icon={IdCardIcon}   value={
              <span className="font-mono text-xs opacity-60">{chauffeur.id}</span>
            } />
            <InfoRow label="Date création"   icon={CalendarIcon} value={chauffeur.dateCreation} />
            <InfoRow label="Statut"          icon={UserIcon}     value={
              <StatusBadge status={chauffeur.statut} size="sm" />
            } />
          </SectionCard>

        </div>

      </div>
    </>
  );
}