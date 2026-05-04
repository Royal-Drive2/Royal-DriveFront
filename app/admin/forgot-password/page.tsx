"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const sendCode = async () => {
    setError("");
    if (!email || !email.includes("@")) {
      setError("Entrez une adresse email valide.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Email introuvable.");
      }
    } catch {
      setError("Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform:rotate(360deg); } }
        .fp-card { animation: fadeUp 0.5s ease both; }
        .fp-input {
          width:100%; background:rgba(255,255,255,0.04);
          border:1px solid rgba(212,175,55,0.2); color:white;
          font-size:14px; padding:13px 16px 13px 44px;
          outline:none; transition:border-color 0.2s, background 0.2s;
          border-radius:6px; font-family:inherit;
        }
        .fp-input::placeholder { color:rgba(255,255,255,0.2); }
        .fp-input:focus { border-color:rgba(212,175,55,0.6); background:rgba(212,175,55,0.05); }
        .fp-btn {
          width:100%; padding:13px;
          background:linear-gradient(135deg,#D4AF37,#a07820);
          color:#0a0a0a; font-weight:700; font-size:12px;
          letter-spacing:0.15em; text-transform:uppercase;
          border:none; border-radius:6px; cursor:pointer;
          transition:opacity 0.2s, transform 0.15s; font-family:inherit;
          display:flex; align-items:center; justify-content:center; gap:8px;
        }
        .fp-btn:hover:not(:disabled) { opacity:0.9; transform:translateY(-1px); }
        .fp-btn:disabled { opacity:0.6; cursor:not-allowed; }
        .fp-spinner { width:16px; height:16px; border:2px solid rgba(0,0,0,0.3); border-top-color:#0a0a0a; border-radius:50%; animation:spin 0.7s linear infinite; }
        .fp-back { display:flex; align-items:center; gap:6px; font-size:11px; color:rgba(255,255,255,0.25); background:none; border:none; cursor:pointer; width:100%; justify-content:center; margin-top:20px; transition:color 0.2s; font-family:inherit; }
        .fp-back:hover { color:rgba(212,175,55,0.6); }
        .corner-tl { position:absolute; top:0; left:0; width:48px; height:48px; border-top:1px solid rgba(212,175,55,0.5); border-left:1px solid rgba(212,175,55,0.5); border-radius:12px 0 0 0; }
        .corner-br { position:absolute; bottom:0; right:0; width:48px; height:48px; border-bottom:1px solid rgba(212,175,55,0.5); border-right:1px solid rgba(212,175,55,0.5); border-radius:0 0 12px 0; }
      `}</style>

      <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#080808 0%,#0f0f0f 50%,#080808 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"system-ui,sans-serif" }}>
        <div style={{ position:"fixed", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 60% 50% at 50% 50%,rgba(212,175,55,0.07) 0%,transparent 70%)" }} />

        <div className="fp-card" style={{ position:"relative", width:"100%", maxWidth:"420px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,175,55,0.15)", borderRadius:"12px", padding:"44px 40px", backdropFilter:"blur(12px)" }}>
          <div className="corner-tl" />
          <div className="corner-br" />

          {/* Icône */}
          <div style={{ width:"56px", height:"56px", borderRadius:"50%", border:"1px solid rgba(212,175,55,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", background:"rgba(212,175,55,0.05)" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="1.5" width="26" height="26">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>

          <h2 style={{ fontSize:"16px", fontWeight:600, color:"white", textAlign:"center", marginBottom:"8px" }}>Mot de passe oublié</h2>

          {/* ── État succès ── */}
          {success ? (
            <>
              <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", textAlign:"center", marginBottom:"28px", lineHeight:1.6 }}>
                Un code de réinitialisation a été envoyé à<br />
                <span style={{ color:"rgba(212,175,55,0.7)" }}>{email}</span><br />
                <span style={{ marginTop:"6px", display:"block" }}>Vérifiez votre boîte mail et suivez les instructions.</span>
              </p>
              <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)", marginBottom:"28px" }} />
              <button className="fp-btn" onClick={() => router.push("/dashboard/register")}>
                Retour à la connexion
              </button>
            </>
          ) : (
            <>
              <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", textAlign:"center", marginBottom:"28px", lineHeight:1.6 }}>
                Entrez votre adresse email. Vous recevrez un code pour réinitialiser votre mot de passe.
              </p>
              <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)", marginBottom:"28px" }} />

              {error && (
                <div style={{ background:"rgba(220,50,50,0.1)", border:"1px solid rgba(220,50,50,0.3)", color:"#ff8080", borderRadius:"6px", padding:"11px 14px", fontSize:"12px", marginBottom:"16px" }}>
                  ⚠ {error}
                </div>
              )}

              <label style={{ display:"block", fontSize:"10px", letterSpacing:"0.15em", color:"rgba(212,175,55,0.6)", textTransform:"uppercase", marginBottom:"8px", fontWeight:600 }}>
                Adresse email
              </label>
              <div style={{ position:"relative", marginBottom:"20px" }}>
                <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:"rgba(212,175,55,0.4)", display:"flex" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  type="email"
                  className="fp-input"
                  placeholder="admin@royaldrive.cm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendCode()}
                />
              </div>

              <button className="fp-btn" onClick={sendCode} disabled={loading}>
                {loading ? <span className="fp-spinner" /> : "Envoyer le code"}
              </button>

              <button className="fp-back" onClick={() => router.push("/dashboard/register")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Retour à la connexion
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}





// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useRef } from "react";

// type Step = 1 | 2 | 3 | 4;

// export default function ForgotPasswordPage() {
//   const router = useRouter();
//   const [step, setStep] = useState<Step>(1);
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [newPass, setNewPass] = useState("");
//   const [confPass, setConfPass] = useState("");
//   const [showNew, setShowNew] = useState(false);
//   const [showConf, setShowConf] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

//   const clearError = () => setError("");

//   const strength = (() => {
//     let s = 0;
//     if (newPass.length >= 8) s++;
//     if (/[A-Z]/.test(newPass)) s++;
//     if (/[0-9]/.test(newPass)) s++;
//     if (/[^A-Za-z0-9]/.test(newPass)) s++;
//     return s;
//   })();
//   const strengthColor = strength <= 1 ? "#e05252" : strength <= 2 ? "#e0a252" : "#52c97a";
//   const strengthLabel = ["", "Faible", "Moyen", "Fort", "Très fort"][strength] || "";

//   const handleOtpChange = (i: number, val: string) => {
//     const v = val.replace(/\D/g, "").slice(0, 1);
//     const next = [...otp];
//     next[i] = v;
//     setOtp(next);
//     if (v && i < 5) otpRefs.current[i + 1]?.focus();
//   };

//   const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
//   };

//   const handleOtpPaste = (e: React.ClipboardEvent) => {
//     e.preventDefault();
//     const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
//     const next = [...otp];
//     paste.split("").forEach((c, i) => { next[i] = c; });
//     setOtp(next);
//     otpRefs.current[Math.min(paste.length, 5)]?.focus();
//   };

//   // ── Step 1 : Envoyer le code ──────────────────────────
//   const sendCode = async () => {
//     clearError();
//     if (!email || !email.includes("@")) { setError("Entrez une adresse email valide."); return; }
//     setLoading(true);
//     try {
//       // TODO: brancher l'endpoint réel
//       // const res = await fetch("/api/admin/auth/oublie-mot-de-passe", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ email }),
//       // });
//       // if (!res.ok) { const d = await res.json(); setError(d.message || "Erreur."); return; }
//       await new Promise((r) => setTimeout(r, 1200)); // à supprimer quand endpoint prêt
//       setStep(2);
//     } catch {
//       setError("Impossible de joindre le serveur.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Step 2 : Vérifier le code ─────────────────────────
//   const verifyCode = async () => {
//     clearError();
//     const code = otp.join("");
//     if (code.length < 6) { setError("Entrez le code complet à 6 chiffres."); return; }
//     setLoading(true);
//     try {
//       // TODO: brancher l'endpoint réel
//       // const res = await fetch("/api/admin/auth/verify-token", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ token: code }),
//       // });
//       // if (!res.ok) { const d = await res.json(); setError(d.message || "Code invalide."); return; }
//       await new Promise((r) => setTimeout(r, 1200));
//       setStep(3);
//     } catch {
//       setError("Impossible de joindre le serveur.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Step 3 : Nouveau mot de passe ─────────────────────
//   const resetPassword = async () => {
//     clearError();
//     if (newPass.length < 8) { setError("Le mot de passe doit contenir au moins 8 caractères."); return; }
//     if (newPass !== confPass) { setError("Les mots de passe ne correspondent pas."); return; }
//     setLoading(true);
//     try {
//       // TODO: brancher l'endpoint réel
//       // const res = await fetch("/api/admin/auth/reset-password", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ email, newPassword: newPass }),
//       // });
//       // if (!res.ok) { const d = await res.json(); setError(d.message || "Erreur."); return; }
//       await new Promise((r) => setTimeout(r, 1200));
//       setStep(4);
//     } catch {
//       setError("Impossible de joindre le serveur.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
//         @keyframes shimmer { 0% { background-position:-200% center; } 100% { background-position:200% center; } }
//         @keyframes spin { to { transform:rotate(360deg); } }
//         @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }

//         .fp-card { animation: fadeUp 0.5s ease both; }
//         .fp-step { animation: slideIn 0.35s ease both; }

//         .fp-input {
//           width:100%; background:rgba(255,255,255,0.04);
//           border:1px solid rgba(212,175,55,0.2); color:white;
//           font-size:14px; padding:13px 16px 13px 44px;
//           outline:none; transition:border-color 0.2s, background 0.2s;
//           border-radius:6px; font-family:inherit;
//         }
//         .fp-input::placeholder { color:rgba(255,255,255,0.2); }
//         .fp-input:focus { border-color:rgba(212,175,55,0.6); background:rgba(212,175,55,0.05); }

//         .fp-otp {
//           width:48px; height:56px; text-align:center;
//           font-size:20px; font-weight:600;
//           background:rgba(255,255,255,0.04);
//           border:1px solid rgba(212,175,55,0.2);
//           color:white; border-radius:6px; outline:none;
//           transition:border-color 0.2s, background 0.2s; font-family:inherit;
//         }
//         .fp-otp:focus { border-color:rgba(212,175,55,0.6); background:rgba(212,175,55,0.05); }

//         .fp-btn {
//           width:100%; padding:13px;
//           background:linear-gradient(135deg,#D4AF37,#a07820);
//           color:#0a0a0a; font-weight:700; font-size:12px;
//           letter-spacing:0.15em; text-transform:uppercase;
//           border:none; border-radius:6px; cursor:pointer;
//           transition:opacity 0.2s, transform 0.15s; font-family:inherit;
//           display:flex; align-items:center; justify-content:center; gap:8px;
//         }
//         .fp-btn:hover:not(:disabled) { opacity:0.9; transform:translateY(-1px); }
//         .fp-btn:active:not(:disabled) { transform:translateY(0); }
//         .fp-btn:disabled { opacity:0.6; cursor:not-allowed; }

//         .fp-spinner {
//           width:16px; height:16px;
//           border:2px solid rgba(0,0,0,0.3); border-top-color:#0a0a0a;
//           border-radius:50%; animation:spin 0.7s linear infinite;
//         }
//         .fp-back {
//           display:flex; align-items:center; gap:6px;
//           font-size:11px; color:rgba(255,255,255,0.25);
//           background:none; border:none; cursor:pointer;
//           width:100%; justify-content:center; margin-top:20px;
//           transition:color 0.2s; font-family:inherit;
//         }
//         .fp-back:hover { color:rgba(212,175,55,0.6); }
//         .fp-label {
//           display:block; font-size:10px; letter-spacing:0.15em;
//           color:rgba(212,175,55,0.6); text-transform:uppercase;
//           margin-bottom:8px; font-weight:600;
//         }
//         .corner-tl { position:absolute; top:0; left:0; width:48px; height:48px; border-top:1px solid rgba(212,175,55,0.5); border-left:1px solid rgba(212,175,55,0.5); border-radius:12px 0 0 0; }
//         .corner-br { position:absolute; bottom:0; right:0; width:48px; height:48px; border-bottom:1px solid rgba(212,175,55,0.5); border-right:1px solid rgba(212,175,55,0.5); border-radius:0 0 12px 0; }
//       `}</style>

//       <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#080808 0%,#0f0f0f 50%,#080808 100%)", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"system-ui,sans-serif" }}>

//         <div style={{ position:"fixed", inset:0, pointerEvents:"none", background:"radial-gradient(ellipse 60% 50% at 50% 50%,rgba(212,175,55,0.07) 0%,transparent 70%)" }} />

//         <div className="fp-card" style={{ position:"relative", width:"100%", maxWidth:"420px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,175,55,0.15)", borderRadius:"12px", padding:"44px 40px", backdropFilter:"blur(12px)" }}>
//           <div className="corner-tl" />
//           <div className="corner-br" />

//           {/* Step indicators */}
//           {step !== 4 && (
//             <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", marginBottom:"32px" }}>
//               {[1, 2, 3].map((s) => (
//                 <>
//                   <div key={`d${s}`} style={{ width:"8px", height:"8px", borderRadius:"50%", background: step > s ? "rgba(212,175,55,0.5)" : step === s ? "#D4AF37" : "rgba(212,175,55,0.2)", transform: step === s ? "scale(1.2)" : "scale(1)", transition:"all 0.3s" }} />
//                   {s < 3 && <div key={`l${s}`} style={{ width:"24px", height:"1px", background: step > s ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.2)", transition:"background 0.3s" }} />}
//                 </>
//               ))}
//             </div>
//           )}

//           {/* ── Step 1 : Email ── */}
//           {step === 1 && (
//             <div className="fp-step">
//               <div style={{ width:"56px", height:"56px", borderRadius:"50%", border:"1px solid rgba(212,175,55,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", background:"rgba(212,175,55,0.05)" }}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="1.5" width="26" height="26">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
//                 </svg>
//               </div>
//               <h2 style={{ fontSize:"16px", fontWeight:600, color:"white", textAlign:"center", marginBottom:"8px" }}>Mot de passe oublié</h2>
//               <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", textAlign:"center", marginBottom:"28px", lineHeight:1.6 }}>Entrez votre adresse email. Nous vous enverrons un code de vérification.</p>
//               <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)", marginBottom:"28px" }} />
//               {error && <div style={{ background:"rgba(220,50,50,0.1)", border:"1px solid rgba(220,50,50,0.3)", color:"#ff8080", borderRadius:"6px", padding:"11px 14px", fontSize:"12px", marginBottom:"16px" }}>⚠ {error}</div>}
//               <label className="fp-label">Adresse email</label>
//               <div style={{ position:"relative", marginBottom:"20px" }}>
//                 <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:"rgba(212,175,55,0.4)", display:"flex" }}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
//                 </span>
//                 <input type="email" className="fp-input" placeholder="admin@royaldrive.cm" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendCode()} />
//               </div>
//               <button className="fp-btn" onClick={sendCode} disabled={loading}>
//                 {loading ? <span className="fp-spinner" /> : "Envoyer le code"}
//               </button>
//               <button className="fp-back" onClick={() => router.push("/dashboard/register")}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
//                 Retour à la connexion
//               </button>
//             </div>
//           )}

//           {/* ── Step 2 : OTP ── */}
//           {step === 2 && (
//             <div className="fp-step">
//               <div style={{ width:"56px", height:"56px", borderRadius:"50%", border:"1px solid rgba(212,175,55,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", background:"rgba(212,175,55,0.05)" }}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="1.5" width="26" height="26">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
//                 </svg>
//               </div>
//               <h2 style={{ fontSize:"16px", fontWeight:600, color:"white", textAlign:"center", marginBottom:"8px" }}>Vérification</h2>
//               <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", textAlign:"center", marginBottom:"28px", lineHeight:1.6 }}>
//                 Un code à 6 chiffres a été envoyé à<br />
//                 <span style={{ color:"rgba(212,175,55,0.7)" }}>{email}</span>
//               </p>
//               <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)", marginBottom:"28px" }} />
//               {error && <div style={{ background:"rgba(220,50,50,0.1)", border:"1px solid rgba(220,50,50,0.3)", color:"#ff8080", borderRadius:"6px", padding:"11px 14px", fontSize:"12px", marginBottom:"16px" }}>⚠ {error}</div>}
//               <div style={{ display:"flex", gap:"10px", justifyContent:"center", marginBottom:"24px" }}>
//                 {otp.map((val, i) => (
//                   <input
//                     key={i}
//                     ref={(el) => { otpRefs.current[i] = el; }}
//                     className="fp-otp"
//                     type="text"
//                     inputMode="numeric"
//                     maxLength={1}
//                     value={val}
//                     onChange={(e) => handleOtpChange(i, e.target.value)}
//                     onKeyDown={(e) => handleOtpKey(i, e)}
//                     onPaste={handleOtpPaste}
//                   />
//                 ))}
//               </div>
//               <button className="fp-btn" onClick={verifyCode} disabled={loading}>
//                 {loading ? <span className="fp-spinner" /> : "Vérifier le code"}
//               </button>
//               <p style={{ fontSize:"11px", textAlign:"center", color:"rgba(255,255,255,0.3)", marginTop:"14px" }}>
//                 Pas reçu ?{" "}
//                 <span onClick={sendCode} style={{ color:"rgba(212,175,55,0.6)", cursor:"pointer", textDecoration:"underline" }}>Renvoyer le code</span>
//               </p>
//               <button className="fp-back" onClick={() => { clearError(); setStep(1); }}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="14" height="14"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
//                 Modifier l'email
//               </button>
//             </div>
//           )}

//           {/* ── Step 3 : Nouveau mot de passe ── */}
//           {step === 3 && (
//             <div className="fp-step">
//               <div style={{ width:"56px", height:"56px", borderRadius:"50%", border:"1px solid rgba(212,175,55,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", background:"rgba(212,175,55,0.05)" }}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="1.5" width="26" height="26">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
//                 </svg>
//               </div>
//               <h2 style={{ fontSize:"16px", fontWeight:600, color:"white", textAlign:"center", marginBottom:"8px" }}>Nouveau mot de passe</h2>
//               <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", textAlign:"center", marginBottom:"28px", lineHeight:1.6 }}>Choisissez un mot de passe sécurisé pour votre compte.</p>
//               <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)", marginBottom:"28px" }} />
//               {error && <div style={{ background:"rgba(220,50,50,0.1)", border:"1px solid rgba(220,50,50,0.3)", color:"#ff8080", borderRadius:"6px", padding:"11px 14px", fontSize:"12px", marginBottom:"16px" }}>⚠ {error}</div>}

//               <label className="fp-label">Nouveau mot de passe</label>
//               <div style={{ position:"relative", marginBottom:"8px" }}>
//                 <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:"rgba(212,175,55,0.4)", display:"flex" }}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
//                 </span>
//                 <input type={showNew ? "text" : "password"} className="fp-input" placeholder="••••••••" value={newPass} onChange={(e) => setNewPass(e.target.value)} style={{ paddingRight:"44px" }} />
//                 <button type="button" onClick={() => setShowNew(!showNew)} style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"rgba(212,175,55,0.4)", padding:0, display:"flex" }}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                 </button>
//               </div>
//               {/* Barre de force */}
//               <div style={{ display:"flex", gap:"4px", marginBottom:"4px" }}>
//                 {[1,2,3,4].map((s) => (
//                   <div key={s} style={{ height:"3px", flex:1, borderRadius:"2px", background: newPass && strength >= s ? strengthColor : "rgba(255,255,255,0.1)", transition:"background 0.3s" }} />
//                 ))}
//               </div>
//               <p style={{ fontSize:"10px", color: newPass ? strengthColor : "rgba(255,255,255,0.35)", marginBottom:"16px" }}>{newPass ? strengthLabel : "Entrez un mot de passe"}</p>

//               <label className="fp-label">Confirmer le mot de passe</label>
//               <div style={{ position:"relative", marginBottom:"20px" }}>
//                 <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:"rgba(212,175,55,0.4)", display:"flex" }}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
//                 </span>
//                 <input type={showConf ? "text" : "password"} className="fp-input" placeholder="••••••••" value={confPass} onChange={(e) => setConfPass(e.target.value)} style={{ paddingRight:"44px" }} />
//                 <button type="button" onClick={() => setShowConf(!showConf)} style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"rgba(212,175,55,0.4)", padding:0, display:"flex" }}>
//                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
//                 </button>
//               </div>
//               <button className="fp-btn" onClick={resetPassword} disabled={loading}>
//                 {loading ? <span className="fp-spinner" /> : "Réinitialiser le mot de passe"}
//               </button>
//             </div>
//           )}

//           {/* ── Step 4 : Succès ── */}
//           {step === 4 && (
//             <div className="fp-step" style={{ textAlign:"center" }}>
//               <div style={{ width:"64px", height:"64px", borderRadius:"50%", background:"rgba(55,180,120,0.1)", border:"1px solid rgba(55,180,120,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
//                 <svg viewBox="0 0 24 24" fill="none" stroke="rgba(55,180,120,0.8)" strokeWidth="1.5" width="30" height="30">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <h2 style={{ fontSize:"16px", fontWeight:600, color:"#7dffc0", textAlign:"center", marginBottom:"8px" }}>Mot de passe réinitialisé !</h2>
//               <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", textAlign:"center", marginBottom:"28px", lineHeight:1.6 }}>
//                 Votre mot de passe a été mis à jour avec succès.<br />Connectez-vous avec votre nouveau mot de passe.
//               </p>
//               <div style={{ height:"1px", background:"linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent)", marginBottom:"28px" }} />
//               <button className="fp-btn" onClick={() => router.push("/admin/login")}>
//                 Se connecter maintenant
//               </button>
//             </div>
//           )}

//         </div>
//       </div>
//     </>
//   );
// }