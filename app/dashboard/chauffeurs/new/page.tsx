"use client";

import { useState, useRef } from "react";
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

const CameraIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

// ─── Champ réutilisable ────────────────────────────────────────────────────────

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

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-35 mb-4">{children}</p>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  prenom: string;
  nom: string;
  telephone: string;
  statut: "actif" | "inactif";
};

// ─── Composant principal ──────────────────────────────────────────────────────

export default function CreateChauffeurForm() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    prenom: "",
    nom: "",
    telephone: "",
    statut: "actif",
  });

  // ── État image ──
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // ── Gestion image ──────────────────────────────────────────────────────────

 /*  const processImageFile = (file: File) => {
    setImageError(null);

    if (!file.type.startsWith("image/")) {
      setImageError("Le fichier doit être une image (JPG, PNG, WEBP…)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("L'image ne doit pas dépasser 5 Mo");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImageFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processImageFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
 */
  // ── Formulaire ─────────────────────────────────────────────────────────────

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!form.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!form.telephone.trim()) newErrors.telephone = "Le téléphone est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    // Exemple avec FormData pour envoyer l'image :
    // const payload = new FormData();
    // Object.entries(form).forEach(([k, v]) => payload.append(k, v));
    // if (imageFile) payload.append("photo", imageFile);
    // await fetch("/api/chauffeurs", { method: "POST", body: payload });

    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => router.push("/chauffeurs"), 1500);
  };

  const initiales = `${form.prenom[0] ?? ""}${form.nom[0] ?? ""}`.toUpperCase() || "?";

  // ── Rendu ──────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto w-full">

      {/* En-tête */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-white/10 transition opacity-60 hover:opacity-100"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-semibold">Nouveau chauffeur</h1>
          <p className="text-xs opacity-40 mt-0.5">Remplissez les informations ci-dessous</p>
        </div>
      </div>

      {/* Carte formulaire */}
      <div className="card-dashboard rounded-2xl p-6 md:p-8 space-y-7">

        {/* ── Photo de profil ── 
        <section>
          <SectionTitle>Photo de profil</SectionTitle>

          <div className="flex items-start gap-5"> */}

            {/* Aperçu avatar 
            <div className="relative flex-shrink-0">
              <div className="h-20 w-20 rounded-full overflow-hidden ring-2 ring-white/10">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Aperçu photo de profil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gold-gradient flex items-center justify-center
                                  text-primary-foreground font-bold text-xl select-none">
                    {initiales}
                  </div>
                )}
              </div> */}

              {/* Bouton supprimer 
              {imagePreview && (
                <button
                  onClick={removeImage}
                  title="Supprimer la photo"
                  className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-red-500 hover:bg-red-400
                             flex items-center justify-center transition shadow-lg"
                >
                  <TrashIcon className="h-3 w-3 text-white" />
                </button>
              )}
            </div> */}

            {/* Zone de drop / click 
            <div className="flex-1 min-w-0">
              <div
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl
                           border-2 border-dashed cursor-pointer transition duration-150 select-none"
                style={{
                  borderColor: isDragging
                    ? "rgba(212,175,55,0.6)"
                    : imagePreview
                    ? "rgba(74,222,128,0.35)"
                    : "rgba(255,255,255,0.12)",
                  background: isDragging
                    ? "rgba(212,175,55,0.05)"
                    : "rgba(255,255,255,0.025)",
                }}
              >
                <CameraIcon
                  className="h-7 w-7 transition"
                  style={{
                    opacity: isDragging ? 1 : 0.35,
                    color: isDragging ? "#D4AF37" : "currentColor",
                  }}
                />
                <div className="text-center">
                  <p className="text-sm font-medium opacity-70">
                    {imagePreview ? "Changer la photo" : "Glissez une photo ou cliquez"}
                  </p>
                  <p className="text-xs opacity-35 mt-0.5">JPG, PNG, WEBP · max 5 Mo</p>
                </div> */}

                {/* Input caché 
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>  */}

              {/* Erreur image 
              {imageError && (
                <p className="text-red-400 text-xs mt-2">{imageError}</p>
              )}   */}

              {/* Nom du fichier sélectionné 
              {imageFile && !imageError && (
                <p className="text-xs opacity-40 mt-2 truncate">
                  ✓ {imageFile.name} · {(imageFile.size / 1024).toFixed(0)} Ko
                </p>
              )}
            </div>

          </div>
        </section>  
        */}

        <div className="border-t border-white/[0.07]" />

        {/* ── Identité ── */}
        <section>
          <SectionTitle>Identité</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Field
                label="Prénom" icon={UserIcon} required
                name="prenom" placeholder="Jean"
                value={form.prenom} onChange={handleChange}
              />
              {errors.prenom && <p className="text-red-400 text-xs mt-1">{errors.prenom}</p>}
            </div>
            <div>
              <Field
                label="Nom" icon={UserIcon} required
                name="nom" placeholder="Mbarga"
                value={form.nom} onChange={handleChange}
              />
              {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
            </div>
          </div>
        </section>

        <div className="border-t border-white/[0.07]" />

        {/* ── Contact ── */}
        <section>
          <SectionTitle>Contact</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Field
                label="Téléphone" icon={PhoneIcon} required
                name="telephone" placeholder="+237 6XX XX XX XX"
                value={form.telephone} onChange={handleChange}
              />
              {errors.telephone && <p className="text-red-400 text-xs mt-1">{errors.telephone}</p>}
            </div>
          </div>
        </section>

        <div className="border-t border-white/[0.07]" />

        {/* ── Statut ── */}
        <section>
          <SectionTitle>Statut initial</SectionTitle>
          <div className="flex gap-3">
            {(["actif", "inactif"] as const).map((s) => {
              const isSelected = form.statut === s;
              const isActif = s === "actif";
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, statut: s }))}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl border text-sm font-medium transition duration-150"
                  style={
                    isSelected
                      ? isActif
                        ? { background: "rgba(74,222,128,0.15)", color: "#4ade80", borderColor: "rgba(74,222,128,0.45)" }
                        : { background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", borderColor: "rgba(255,255,255,0.2)" }
                      : { background: "transparent", color: "rgba(255,255,255,0.25)", borderColor: "rgba(255,255,255,0.07)" }
                  }
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: isSelected ? (isActif ? "#4ade80" : "rgba(255,255,255,0.4)") : "rgba(255,255,255,0.12)" }}
                  />
                  {isActif ? "Actif" : "Inactif"}
                </button>
              );
            })}
          </div>
        </section>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => router.back()}
          className="px-5 py-2.5 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
        >
          Annuler
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading || success}
          className="btn-gold relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm shadow-gold
                     disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {success ? (
            <>
              <CheckIcon className="h-4 w-4" />
              Enregistré !
            </>
          ) : loading ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
              Enregistrement…
            </>
          ) : (
            "Créer le chauffeur"
          )}
        </button>
      </div>

    </div>
  );
}