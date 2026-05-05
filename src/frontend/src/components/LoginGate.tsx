import { useEffect, useState } from "react";

const AUTH_KEY = "mdhe_auth";
const VALID_EMAIL = "kuldeepjoya439@gmail.com";
const VALID_PASSWORD = "kuldeepjoya@007";

interface LoginGateProps {
  children: React.ReactNode;
}

export function LoginGate({ children }: LoginGateProps) {
  const [isAuth, setIsAuth] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === "true";
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem(AUTH_KEY, "true");
    }
  }, [isAuth]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Small delay for polish
    setTimeout(() => {
      if (email.trim() === VALID_EMAIL && password === VALID_PASSWORD) {
        localStorage.setItem(AUTH_KEY, "true");
        setIsAuth(true);
      } else {
        setError("Incorrect ID or password");
      }
      setIsLoading(false);
    }, 400);
  };

  if (isAuth) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.004 80) 0%, oklch(0.93 0.008 75) 50%, oklch(0.97 0.004 80) 100%)",
      }}
    >
      {/* Subtle decorative background pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(0.65 0.15 68) 0px, oklch(0.65 0.15 68) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(-45deg, oklch(0.65 0.15 68) 0px, oklch(0.65 0.15 68) 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="relative w-full max-w-md" data-ocid="login_gate.card">
        {/* Card */}
        <div className="bg-card shadow-elevated rounded-sm border border-border overflow-hidden">
          {/* Gold top accent bar */}
          <div
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.55 0.17 68), oklch(0.72 0.14 75), oklch(0.55 0.17 68))",
            }}
          />

          <div className="px-10 py-10">
            {/* Brand header */}
            <div className="flex flex-col items-center gap-4 mb-10">
              <img
                src="/assets/images/logo.png"
                alt="Master Deepak Hair Expert"
                className="h-16 w-16 object-contain"
              />
              <div className="text-center">
                <p className="section-label mb-1">Welcome to</p>
                <h1 className="font-display text-2xl font-bold tracking-tight text-foreground leading-tight">
                  Master Deepak
                </h1>
                <p className="text-gradient-gold font-display text-sm font-semibold tracking-widest uppercase mt-0.5">
                  Hair Expert
                </p>
              </div>
              {/* Decorative gold rule */}
              <span className="gold-rule" />
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
              data-ocid="login_gate.form"
            >
              {/* Email field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-email"
                  className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  Email / ID
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-sm border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-smooth"
                  data-ocid="login_gate.input"
                />
              </div>

              {/* Password field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="login-password"
                  className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-11 rounded-sm border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-smooth"
                    data-ocid="login_gate.password_input"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-smooth focus-visible:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    data-ocid="login_gate.toggle_password"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p
                  className="text-sm text-destructive font-medium text-center -mt-1"
                  data-ocid="login_gate.error_state"
                  role="alert"
                >
                  {error}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading || !email || !password}
                className="btn-primary w-full mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
                data-ocid="login_gate.submit_button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Verifying…
                  </span>
                ) : (
                  "Enter Site"
                )}
              </button>
            </form>

            {/* Private access notice */}
            <p className="text-center text-[11px] text-muted-foreground mt-8 tracking-wide">
              This is a private website. Access is restricted to authorised
              personnel only.
            </p>
          </div>
        </div>

        {/* Bottom branding */}
        <p className="text-center text-[10px] text-muted-foreground/50 mt-6 tracking-widest uppercase">
          © {new Date().getFullYear()} Master Deepak Hair Expert
        </p>
      </div>
    </div>
  );
}

/** Call this to programmatically log out from anywhere in the app */
export function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.reload();
}
