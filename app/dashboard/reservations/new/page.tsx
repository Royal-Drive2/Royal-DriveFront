"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Icônes ───────────────────────────────────────────────────────────────────

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const MapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);

const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
  </svg>
);

const CarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const CurrencyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h1.5m-1.5 0h-1.5m-7.5 0H4.5m1.5 0H4.5" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

// ─── Composants réutilisables ─────────────────────────────────────────────────

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-35 mb-4">{children}</p>
);

type FieldProps = {
  label: string;
  icon: React.FC<{ className?: string }>;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Field = ({ label, icon: Icon, required, ...props }: FieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium opacity-50 uppercase tracking-widest">
      {label}{required && <span className="text-gold ml-1">*</span>}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-35 pointer-events-none" />
      <input
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm
                   placeholder:opacity-25 focus:outline-none focus:border-gold/50 focus:bg-white/[0.07]
                   transition duration-150"
      />
    </div>
  </div>
);

type SelectFieldProps = {
  label: string;
  icon: React.FC<{ className?: string }>;
  required?: boolean;
  children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectField = ({ label, icon: Icon, required, children, ...props }: SelectFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-medium opacity-50 uppercase tracking-widest">
      {label}{required && <span className="text-gold ml-1">*</span>}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-35 pointer-events-none" />
      <select
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm
                   focus:outline-none focus:border-gold/50 focus:bg-white/[0.07]
                   transition duration-150 appearance-none"
      >
        {children}
      </select>
    </div>
  </div>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  client: string;
  telephone: string;
  depart: string;
  arrivee: string;
  date: string;
  heure: string;
  categorie: string;
  pax: string;
  bagages: string;
  chauffeur: string;
  montant: string;
  statut: "en_cours" | "terminee" | "annulee";
  notes: string;
};

// ─── Page principale ──────────────────────────────────────────────────────────

export default function CreateReservationForm() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    client: "", telephone: "", depart: "", arrivee: "",
    date: "", heure: "", categorie: "", pax: "1",
    bagages: "0", chauffeur: "", montant: "",
    statut: "en_cours", notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.client.trim())    e.client    = "Nom du client requis";
    if (!form.telephone.trim()) e.telephone = "Téléphone requis";
    if (!form.depart.trim())    e.depart    = "Ville de départ requise";
    if (!form.arrivee.trim())   e.arrivee   = "Ville d'arrivée requise";
    if (!form.date)             e.date      = "Date requise";
    if (!form.heure)            e.heure     = "Heure requise";
    if (!form.categorie)        e.categorie = "Catégorie requise";
    if (!form.montant.trim())   e.montant   = "Montant requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    // TODO: POST /api/reservations
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/reservations"), 1500);
  };

  // ── Rendu ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto w-full">

      {/* En-tête */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-white/10 transition opacity-60 hover:opacity-100">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold">Nouvelle réservation</h1>
          <p className="text-xs opacity-40 mt-0.5">Remplissez les informations ci-dessous</p>
        </div>
      </div>

      <div className="card-dashboard rounded-2xl p-6 md:p-8 space-y-7">

        {/* ── Client ── */}
        <section>
          <SectionTitle>Client</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Field label="Nom complet" icon={UserIcon} required
                name="client" placeholder="Jean Mballa"
                value={form.client} onChange={handleChange} />
              {errors.client && <p className="text-red-400 text-xs mt-1">{errors.client}</p>}
            </div>
            <div>
              <Field label="Téléphone" icon={PhoneIcon} required
                name="telephone" placeholder="+237 6XX XX XX XX"
                value={form.telephone} onChange={handleChange} />
              {errors.telephone && <p className="text-red-400 text-xs mt-1">{errors.telephone}</p>}
            </div>
          </div>
        </section>

        <div className="border-t border-white/[0.07]" />

        {/* ── Trajet ── */}
        <section>
          <SectionTitle>Trajet</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Field label="Ville de départ" icon={MapIcon} required
                name="depart" placeholder="Douala"
                value={form.depart} onChange={handleChange} />
              {errors.depart && <p className="text-red-400 text-xs mt-1">{errors.depart}</p>}
            </div>
            <div>
              <Field label="Ville d'arrivée" icon={MapIcon} required
                name="arrivee" placeholder="Yaoundé"
                value={form.arrivee} onChange={handleChange} />
              {errors.arrivee && <p className="text-red-400 text-xs mt-1">{errors.arrivee}</p>}
            </div>
            <div>
              <Field label="Date" icon={CalendarIcon} required
                name="date" type="date"
                value={form.date} onChange={handleChange} />
              {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
            </div>
            <div>
              <Field label="Heure" icon={CalendarIcon} required
                name="heure" type="time"
                value={form.heure} onChange={handleChange} />
              {errors.heure && <p className="text-red-400 text-xs mt-1">{errors.heure}</p>}
            </div>
          </div>
        </section>

        <div className="border-t border-white/[0.07]" />

        {/* ── Détails course ── */}
        <section>
          <SectionTitle>Détails de la course</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <SelectField label="Catégorie" icon={CarIcon} required
                name="categorie" value={form.categorie} onChange={handleChange}>
                <option value="">Sélectionner…</option>
                <option value="Confort">Confort</option>
                <option value="Confort Plus">Confort Plus</option>
                <option value="VIP">VIP</option>
              </SelectField>
              {errors.categorie && <p className="text-red-400 text-xs mt-1">{errors.categorie}</p>}
            </div>
            <SelectField label="Chauffeur" icon={UserIcon}
              name="chauffeur" value={form.chauffeur} onChange={handleChange}>
              <option value="">Non assigné</option>
              <option value="Paul Nkomo">Paul Nkomo</option>
              <option value="Eric Tagne">Eric Tagne</option>
              <option value="Marc Bilé">Marc Bilé</option>
              <option value="Joseph Mefiro">Joseph Mefiro</option>
              <option value="André Toko">André Toko</option>
            </SelectField>
            <Field label="Passagers" icon={UsersIcon}
              name="pax" type="number" min="1" max="20"
              value={form.pax} onChange={handleChange} />
            <Field label="Bagages" icon={BriefcaseIcon}
              name="bagages" type="number" min="0" max="30"
              value={form.bagages} onChange={handleChange} />
          </div>
        </section>

        <div className="border-t border-white/[0.07]" />

        {/* ── Paiement ── */}
        <section>
          <SectionTitle>Paiement</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Field label="Montant (FCFA)" icon={CurrencyIcon} required
                name="montant" placeholder="45 000"
                value={form.montant} onChange={handleChange} />
              {errors.montant && <p className="text-red-400 text-xs mt-1">{errors.montant}</p>}
            </div>
          </div>
        </section>

        <div className="border-t border-white/[0.07]" />

        {/* ── Statut ── */}
        <section>
          <SectionTitle>Statut initial</SectionTitle>
          <div className="flex flex-wrap gap-3">
            {([
              { val: "en_cours", label: "En cours",  color: "#D4AF37", bg: "rgba(212,175,55,0.15)",  border: "rgba(212,175,55,0.45)"  },
              { val: "terminee", label: "Terminée",  color: "#4ade80", bg: "rgba(74,222,128,0.15)",  border: "rgba(74,222,128,0.45)"  },
              { val: "annulee",  label: "Annulée",   color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.45)" },
            ] as const).map(s => {
              const isSelected = form.statut === s.val;
              return (
                <button key={s.val} type="button"
                  onClick={() => setForm(prev => ({ ...prev, statut: s.val }))}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition duration-150"
                  style={isSelected
                    ? { background: s.bg, color: s.color, borderColor: s.border }
                    : { background: "transparent", color: "rgba(255,255,255,0.3)", borderColor: "rgba(255,255,255,0.08)" }
                  }>
                  <span className="h-2 w-2 rounded-full" style={{ background: isSelected ? s.color : "rgba(255,255,255,0.15)" }} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </section>

        <div className="border-t border-white/[0.07]" />

        {/* ── Notes ── */}
        <section>
          <SectionTitle>Notes internes</SectionTitle>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Instructions particulières, remarques…"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm
                       placeholder:opacity-25 focus:outline-none focus:border-gold/50 focus:bg-white/[0.07]
                       transition duration-150 resize-none"
          />
        </section>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button onClick={() => router.back()}
          className="px-5 py-2.5 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition">
          Annuler
        </button>
        <button onClick={handleSubmit} disabled={loading || success}
          className="btn-gold flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm shadow-gold
                     disabled:opacity-60 disabled:cursor-not-allowed transition">
          {success ? (
            <><CheckIcon className="h-4 w-4" />Enregistré !</>
          ) : loading ? (
            <><span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />Enregistrement…</>
          ) : "Créer la réservation"}
        </button>
      </div>

    </div>
  );
}