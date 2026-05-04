"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
     const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        const token = data.token || data.accessToken;
        if (token) sessionStorage.setItem("rd_token", token);
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Identifiants incorrects.");
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .anim-fadeup  { animation: fadeUp 0.6s ease both; }
        .anim-delay1  { animation-delay: 0.1s; }
        .anim-delay2  { animation-delay: 0.2s; }
        .anim-delay3  { animation-delay: 0.3s; }
        .anim-delay4  { animation-delay: 0.4s; }

        .gold-shimmer {
          background: linear-gradient(90deg, #b8962e, #D4AF37, #f5d98b, #D4AF37, #b8962e);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .input-field {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(212,175,55,0.2);
          color: white;
          font-size: 14px;
          padding: 14px 16px;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          border-radius: 6px;
          font-family: inherit;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.25); }
        .input-field:focus {
          border-color: rgba(212,175,55,0.6);
          background: rgba(212,175,55,0.05);
        }

        .btn-login {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #D4AF37, #a07820);
          color: #0a0a0a;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }
        .btn-login:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .btn-login:active:not(:disabled) { transform: translateY(0); }
        .btn-login:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(0,0,0,0.3);
          border-top-color: #0a0a0a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }

        .corner-tl { position: absolute; top: 0; left: 0; width: 48px; height: 48px; border-top: 1px solid rgba(212,175,55,0.5); border-left: 1px solid rgba(212,175,55,0.5); }
        .corner-br { position: absolute; bottom: 0; right: 0; width: 48px; height: 48px; border-bottom: 1px solid rgba(212,175,55,0.5); border-right: 1px solid rgba(212,175,55,0.5); }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #080808 0%, #0f0f0f 50%, #080808 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px", fontFamily: "system-ui, sans-serif",
      }}>

        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)",
        }} />

        <div style={{
          position: "relative", width: "100%", maxWidth: "420px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(212,175,55,0.15)",
          borderRadius: "12px", padding: "48px 40px", backdropFilter: "blur(12px)",
        }}>
          <div className="corner-tl" />
          <div className="corner-br" />

          <div className="anim-fadeup" style={{ textAlign: "center", marginBottom: "36px" }}>
            <img src="/images/logo.png" alt="Royal Drive"
              style={{ height: "56px", width: "auto", objectFit: "contain", marginBottom: "16px" }} />
            <h1 className="gold-shimmer" style={{ fontSize: "11px", letterSpacing: "0.3em", fontWeight: 600, textTransform: "uppercase", margin: 0 }}>
              Espace Administrateur
            </h1>
          </div>

          <div className="anim-fadeup anim-delay1" style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
            marginBottom: "32px",
          }} />

          {error && (
            <div style={{
              background: "rgba(220,50,50,0.1)",
              border: "1px solid rgba(220,50,50,0.3)",
              color: "#ff8080", borderRadius: "6px",
              padding: "12px 16px", fontSize: "12px", marginBottom: "20px",
            }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="anim-fadeup anim-delay2" style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(212,175,55,0.6)", textTransform: "uppercase", marginBottom: "8px", fontWeight: 600 }}>
                Email
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email" required placeholder="admin@royaldrive.cm"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="input-field" style={{ paddingLeft: "44px" }}
                />
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(212,175,55,0.4)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="anim-fadeup anim-delay3" style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(212,175,55,0.6)", textTransform: "uppercase", marginBottom: "8px", fontWeight: 600 }}>
                Mot de passe
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"} required placeholder="••••••••"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="input-field" style={{ paddingLeft: "44px", paddingRight: "44px" }}
                />
                <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "rgba(212,175,55,0.4)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(212,175,55,0.4)", padding: 0, display: "flex" }}>
                  {showPass ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="anim-fadeup anim-delay4">
              <button type="submit" disabled={loading} className="btn-login">
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <span className="spinner" />
                    Connexion...
                  </span>
                ) : "Se connecter"}
              </button>
            </div>

            {/* Après le bouton submit */}
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <a href="/admin/forgot-password" style={{fontSize: "11px", color: "rgba(212,175,55,0.5)",
                                                       textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.2s" }}
               onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(212,175,55,0.9)")}
               onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(212,175,55,0.5)")}>
                 Mot de passe oublié ?
             </a>
          </div>

          </form>

          <div className="anim-fadeup anim-delay4" style={{ marginTop: "28px", textAlign: "center" }}>
            <a href="/" style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(212,175,55,0.6)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}>
              ← Retour au site
            </a>
          </div>

        </div>
      </div>
    </>
  );
}