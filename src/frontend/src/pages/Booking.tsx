import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useConfirmBookingAfterPayment } from "@/hooks/useConfirmBookingAfterPayment";
import { useCreateStripeCheckoutSession } from "@/hooks/useCreateStripeCheckoutSession";
import { useServices } from "@/hooks/useServices";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import type { CheckoutRequest } from "@/types";
import {
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Clock,
  CreditCard,
  Loader2,
  Scissors,
  Sparkles,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

// ── Helpers ───────────────────────────────────────────────────────────────────

interface FormState {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  teamMemberId: string;
  preferredDateTime: string;
}

interface FormErrors {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  services?: string;
  preferredDateTime?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: FormState, selectedServiceIds: number[]): FormErrors {
  const errors: FormErrors = {};
  if (!fields.customerName.trim()) errors.customerName = "Name is required.";
  if (!fields.customerEmail.trim()) {
    errors.customerEmail = "Email is required.";
  } else if (!EMAIL_RE.test(fields.customerEmail)) {
    errors.customerEmail = "Enter a valid email address.";
  }
  if (!fields.customerPhone.trim())
    errors.customerPhone = "Phone number is required.";
  if (selectedServiceIds.length === 0)
    errors.services = "Please select at least one service.";
  if (!fields.preferredDateTime.trim())
    errors.preferredDateTime = "Please choose a date and time.";
  return errors;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-sm mt-1.5 text-destructive font-medium">
      {message}
    </p>
  );
}

function SectionHeading({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-base font-semibold text-accent uppercase tracking-widest pb-3 border-b border-border flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 inline-flex items-center justify-center text-[10px] font-black">
          {step}
        </span>
        {children}
      </h2>
    </div>
  );
}

function nowLocalStr() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${date}T${hours}:${minutes}`;
}

// ── URL param helpers ─────────────────────────────────────────────────────────
function getSessionIdFromUrl(): string | null {
  return new URLSearchParams(window.location.search).get("session_id");
}
function isCancelledFromUrl(): boolean {
  return (
    new URLSearchParams(window.location.search).get("cancelled") === "true"
  );
}
function clearUrlParams() {
  const url = new URL(window.location.href);
  url.search = "";
  window.history.replaceState({}, "", url.toString());
}

// ── Success Screen ────────────────────────────────────────────────────────────
interface SuccessScreenProps {
  referenceCode: string;
  customerName: string;
  preferredDateTime: string;
  serviceNames: string[];
  totalAmount: number;
  onBookAnother: () => void;
}

function SuccessScreen({
  referenceCode,
  customerName,
  preferredDateTime,
  serviceNames,
  totalAmount,
  onBookAnother,
}: SuccessScreenProps) {
  return (
    <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-background">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.74 0.14 68), transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg w-full mx-auto px-6 text-center"
      >
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-accent/10 border border-accent/30 shadow-gold">
              <CheckCircle className="w-11 h-11 text-accent" />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-destructive flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-destructive-foreground" />
            </div>
          </div>
        </div>

        <div className="badge-gold mb-4 mx-auto w-fit">
          <Scissors className="w-3 h-3" /> Booking Confirmed
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
          You're All <span className="text-gradient-gold">Set!</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Payment received. Your appointment with Master Deepak is confirmed.
        </p>

        <div className="card-premium mb-8 text-left">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-1">
            Booking Reference
          </div>
          <div
            className="font-display text-4xl font-bold mb-1 text-gradient-gold"
            data-ocid="booking.success.ref"
          >
            {referenceCode}
          </div>
          <p className="text-xs text-muted-foreground mb-5">
            Save this code — you can use it to track or verify your booking with
            us at any time.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-border/40">
              <span className="text-muted-foreground">Name</span>
              <span className="text-foreground font-semibold">
                {customerName}
              </span>
            </div>
            <div className="py-2 border-b border-border/40">
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Services</span>
                <div className="text-right space-y-0.5">
                  {serviceNames.map((name) => (
                    <div
                      key={name}
                      className="text-foreground font-semibold text-xs"
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/40">
              <span className="text-muted-foreground">Date &amp; Time</span>
              <span className="text-foreground font-semibold">
                {preferredDateTime
                  ? new Date(preferredDateTime).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : ""}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border/40">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="text-accent font-bold">
                ₹{totalAmount.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Payment Status</span>
              <span className="text-accent font-bold uppercase tracking-wider text-xs">
                ✓ Paid
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            className="btn-cta"
            onClick={onBookAnother}
            data-ocid="booking.book-another.button"
          >
            <Scissors className="w-4 h-4" />
            Book Another
          </button>
          <a
            href="https://wa.me/918828104056"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            WhatsApp Us
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function Booking() {
  const { data: services = [], isLoading: loadingServices } = useServices();
  const { data: team = [], isLoading: loadingTeam } = useTeamMembers();
  const checkoutMutation = useCreateStripeCheckoutSession();

  // URL state detection
  const [sessionId] = useState<string | null>(getSessionIdFromUrl);
  const [wasCancelled] = useState<boolean>(isCancelledFromUrl);

  // Confirmation query (runs when session_id is in URL)
  const confirmQuery = useConfirmBookingAfterPayment(sessionId);

  // Form state
  const [form, setForm] = useState<FormState>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    teamMemberId: "",
    preferredDateTime: "",
  });
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Clear URL params once we've read them
  useEffect(() => {
    if (sessionId || wasCancelled) clearUrlParams();
  }, [sessionId, wasCancelled]);

  const errors = validate(form, selectedServiceIds);
  const hasErrors = Object.keys(errors).length > 0;
  const isFormValid =
    selectedServiceIds.length > 0 &&
    form.customerName.trim() !== "" &&
    form.customerEmail.trim() !== "" &&
    EMAIL_RE.test(form.customerEmail) &&
    form.customerPhone.trim() !== "" &&
    form.preferredDateTime.trim() !== "";

  const total = useMemo(() => {
    return selectedServiceIds.reduce((sum, id) => {
      const svc = services.find((s) => s.id === id);
      return sum + (svc?.price ?? 0);
    }, 0);
  }, [selectedServiceIds, services]);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function toggleService(id: number) {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
    setTouched((prev) => ({ ...prev, services: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      services: true,
      preferredDateTime: true,
    });
    if (hasErrors) return;

    const req: CheckoutRequest = {
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      customerPhone: form.customerPhone,
      serviceIds: selectedServiceIds,
      teamMemberId: form.teamMemberId ? Number(form.teamMemberId) : null,
      preferredDateTime: form.preferredDateTime,
      successUrl: `${window.location.origin}/booking`,
      cancelUrl: `${window.location.origin}/booking?cancelled=true`,
    };

    try {
      const result = await checkoutMutation.mutateAsync(req);
      // Redirect to Stripe-hosted checkout (or mock redirect in dev)
      window.location.href = result.checkoutUrl;
    } catch {
      // error handled via checkoutMutation.isError
    }
  }

  function resetForm() {
    setForm({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      teamMemberId: "",
      preferredDateTime: "",
    });
    setSelectedServiceIds([]);
    setTouched({});
    checkoutMutation.reset();
  }

  // ── Post-payment confirmation screen ─────────────────────────────────────────
  if (sessionId) {
    if (confirmQuery.isLoading) {
      return (
        <Layout>
          <div
            className="min-h-screen flex items-center justify-center bg-background"
            data-ocid="booking.confirm.loading_state"
          >
            <div className="text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-accent mx-auto" />
              <p className="text-muted-foreground font-medium">
                Confirming your payment…
              </p>
            </div>
          </div>
        </Layout>
      );
    }

    if (confirmQuery.isError) {
      return (
        <Layout>
          <div
            className="min-h-screen flex items-center justify-center bg-background"
            data-ocid="booking.confirm.error_state"
          >
            <div className="max-w-md mx-auto px-6 text-center space-y-5">
              <XCircle className="w-14 h-14 text-destructive mx-auto" />
              <h2 className="font-display text-2xl font-bold text-foreground">
                Confirmation Failed
              </h2>
              <p className="text-muted-foreground">
                {confirmQuery.error?.message ??
                  "We couldn't confirm your booking. Please contact us via WhatsApp."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  className="btn-cta"
                  onClick={resetForm}
                  data-ocid="booking.retry.button"
                >
                  Try Again
                </button>
                <a
                  href="https://wa.me/918058564056"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </Layout>
      );
    }

    if (confirmQuery.data) {
      const booking = confirmQuery.data;
      const serviceNames = booking.serviceIds
        .map(
          (id) => services.find((s) => s.id === id)?.name ?? `Service #${id}`,
        )
        .filter(Boolean);

      return (
        <Layout>
          <SuccessScreen
            referenceCode={booking.referenceCode}
            customerName={booking.customerName}
            preferredDateTime={booking.preferredDateTime}
            serviceNames={serviceNames}
            totalAmount={booking.totalAmount}
            onBookAnother={resetForm}
          />
        </Layout>
      );
    }
  }

  // ── Booking Form ──────────────────────────────────────────────────────────────
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Banner */}
        <div className="relative pt-24 pb-14 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, oklch(0.74 0.14 68) 0, oklch(0.74 0.14 68) 1px, transparent 0, transparent 50%)",
                backgroundSize: "20px 20px",
              }}
            />
            <div
              className="absolute top-0 right-0 w-[500px] h-[400px] opacity-10"
              style={{
                background:
                  "radial-gradient(ellipse at top right, oklch(0.74 0.14 68), transparent 60%)",
              }}
            />
          </div>

          <div className="relative max-w-2xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="badge-gold mb-5 mx-auto w-fit">
                <Scissors className="w-3 h-3" /> Master Deepak Hair Expert
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none tracking-tight mb-4">
                Book Your
                <br />
                <span className="text-gradient-gold">Appointment</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                Reserve your session at Andheri West, Mumbai or Bhilwara,
                Rajasthan — premium cuts, colors &amp; chemical treatments.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Gold divider */}
        <div className="max-w-2xl mx-auto px-6 mb-10">
          <div className="divider-gold">
            <Sparkles className="w-4 h-4 text-accent shrink-0" />
          </div>
        </div>

        {/* Cancelled notice */}
        {wasCancelled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto px-6 mb-6"
          >
            <div
              className="flex items-start gap-3 rounded-md px-4 py-3 bg-muted border border-border text-sm text-muted-foreground"
              data-ocid="booking.cancelled.notice"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
              <span>
                Payment was cancelled. Your time slot is still open — fill in
                the form below to try again.
              </span>
            </div>
          </motion.div>
        )}

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-xl mx-auto px-6 pb-20"
        >
          <div className="rounded-sm border border-border bg-card shadow-elevated overflow-hidden">
            {/* Form header strip */}
            <div className="bg-accent/8 border-b border-border px-8 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                <Scissors className="w-4 h-4 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">
                  Fill in your details
                </div>
                <div className="text-foreground font-semibold text-sm">
                  Appointment Request Form
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="px-8 py-8 space-y-8"
            >
              {/* Section 1 — Personal Info */}
              <div>
                <SectionHeading step={1}>Your Details</SectionHeading>
                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor="customerName"
                      className="text-foreground font-semibold text-sm mb-2 block"
                    >
                      Full Name <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="customerName"
                      type="text"
                      placeholder="Your full name"
                      value={form.customerName}
                      onChange={(e) =>
                        handleChange("customerName", e.target.value)
                      }
                      onBlur={() => handleBlur("customerName")}
                      data-ocid="booking.name.input"
                      aria-invalid={
                        touched.customerName && !!errors.customerName
                      }
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-accent h-11"
                    />
                    {touched.customerName && (
                      <FieldError message={errors.customerName} />
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="customerEmail"
                      className="text-foreground font-semibold text-sm mb-2 block"
                    >
                      Email Address <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={form.customerEmail}
                      onChange={(e) =>
                        handleChange("customerEmail", e.target.value)
                      }
                      onBlur={() => handleBlur("customerEmail")}
                      data-ocid="booking.email.input"
                      aria-invalid={
                        touched.customerEmail && !!errors.customerEmail
                      }
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-accent h-11"
                    />
                    {touched.customerEmail && (
                      <FieldError message={errors.customerEmail} />
                    )}
                  </div>

                  <div>
                    <Label
                      htmlFor="customerPhone"
                      className="text-foreground font-semibold text-sm mb-2 block"
                    >
                      Phone Number <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="customerPhone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.customerPhone}
                      onChange={(e) =>
                        handleChange("customerPhone", e.target.value)
                      }
                      onBlur={() => handleBlur("customerPhone")}
                      data-ocid="booking.phone.input"
                      aria-invalid={
                        touched.customerPhone && !!errors.customerPhone
                      }
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-accent h-11"
                    />
                    {touched.customerPhone && (
                      <FieldError message={errors.customerPhone} />
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2 — Services */}
              <div>
                <SectionHeading step={2}>Services &amp; Barber</SectionHeading>
                <div className="space-y-5">
                  {/* Service checkboxes */}
                  <div>
                    <p className="text-foreground font-semibold text-sm mb-3">
                      Select Services <span className="text-accent">*</span>{" "}
                      <span className="text-muted-foreground font-normal text-xs ml-1">
                        (choose one or more)
                      </span>
                    </p>
                    {loadingServices ? (
                      <div
                        className="space-y-2"
                        data-ocid="booking.services.loading_state"
                      >
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-14 rounded-md bg-muted animate-pulse"
                          />
                        ))}
                      </div>
                    ) : (
                      <fieldset
                        className="space-y-2 border-0 p-0 m-0"
                        data-ocid="booking.services.list"
                      >
                        <legend className="sr-only">Select services</legend>
                        {services.map((service, idx) => {
                          const checked = selectedServiceIds.includes(
                            service.id,
                          );
                          return (
                            <label
                              key={service.id}
                              htmlFor={`service-${service.id}`}
                              data-ocid={`booking.services.item.${idx + 1}`}
                              className={[
                                "flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-smooth select-none",
                                checked
                                  ? "border-accent/60 bg-accent/8 shadow-sm"
                                  : "border-border bg-background hover:border-accent/30 hover:bg-accent/4",
                              ].join(" ")}
                            >
                              {/* Hidden native checkbox for a11y */}
                              <input
                                id={`service-${service.id}`}
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleService(service.id)}
                                className="sr-only"
                              />
                              {/* Custom checkbox */}
                              <div
                                className={[
                                  "w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-smooth",
                                  checked
                                    ? "bg-accent border-accent"
                                    : "border-input bg-background",
                                ].join(" ")}
                                aria-hidden="true"
                              >
                                {checked && (
                                  <svg
                                    aria-hidden="true"
                                    className="w-3 h-3 text-accent-foreground"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="1.5,6 4.5,9 10.5,3" />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={[
                                      "text-sm font-semibold truncate",
                                      checked
                                        ? "text-foreground"
                                        : "text-foreground/80",
                                    ].join(" ")}
                                  >
                                    {service.name}
                                  </span>
                                  <span
                                    className={[
                                      "text-sm font-bold shrink-0",
                                      checked
                                        ? "text-accent"
                                        : "text-muted-foreground",
                                    ].join(" ")}
                                  >
                                    ₹{service.price.toLocaleString("en-IN")}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 mt-0.5">
                                  <Clock className="w-3 h-3 text-muted-foreground shrink-0" />
                                  <span className="text-xs text-muted-foreground truncate">
                                    {service.durationMinutes} min
                                  </span>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </fieldset>
                    )}
                    {touched.services && (
                      <FieldError message={errors.services} />
                    )}

                    {/* Running total */}
                    {selectedServiceIds.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 px-4 py-3 rounded-md bg-accent/8 border border-accent/30 flex items-center justify-between"
                        data-ocid="booking.total.panel"
                      >
                        <div className="text-sm text-muted-foreground">
                          {selectedServiceIds.length} service
                          {selectedServiceIds.length > 1 ? "s" : ""} selected
                        </div>
                        <div className="font-display font-bold text-lg text-accent">
                          Total: ₹{total.toLocaleString("en-IN")}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Preferred Barber */}
                  <div>
                    <Label
                      htmlFor="teamMemberId"
                      className="text-foreground font-semibold text-sm mb-2 block"
                    >
                      Preferred Barber{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </Label>
                    <div className="relative">
                      <select
                        id="teamMemberId"
                        value={form.teamMemberId}
                        onChange={(e) =>
                          handleChange("teamMemberId", e.target.value)
                        }
                        data-ocid="booking.barber.select"
                        disabled={loadingTeam}
                        className="w-full h-11 rounded-md pl-3 pr-10 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-smooth disabled:opacity-50 disabled:cursor-not-allowed bg-background border border-input"
                      >
                        <option value="" className="bg-card text-foreground">
                          {loadingTeam
                            ? "Loading barbers…"
                            : "No preference — any barber"}
                        </option>
                        {team.map((m) => (
                          <option
                            key={m.id}
                            value={m.id}
                            className="bg-card text-foreground"
                          >
                            {m.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 — Date & Time */}
              <div>
                <SectionHeading step={3}>Date &amp; Time</SectionHeading>
                <div>
                  <Label
                    htmlFor="preferredDateTime"
                    className="text-foreground font-semibold text-sm mb-2 block"
                  >
                    Preferred Date &amp; Time{" "}
                    <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="preferredDateTime"
                    type="datetime-local"
                    value={form.preferredDateTime}
                    min={nowLocalStr()}
                    onChange={(e) =>
                      handleChange("preferredDateTime", e.target.value)
                    }
                    onBlur={() => handleBlur("preferredDateTime")}
                    data-ocid="booking.datetime.input"
                    aria-invalid={
                      touched.preferredDateTime && !!errors.preferredDateTime
                    }
                    className="bg-background border-border text-foreground focus-visible:ring-accent h-11 [color-scheme:light]"
                  />
                  {touched.preferredDateTime && (
                    <FieldError message={errors.preferredDateTime} />
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    Available: Mon–Sat, 10am–7pm IST · Mumbai &amp; Bhilwara
                    locations
                  </p>
                </div>
              </div>

              {/* Error summary */}
              {checkoutMutation.isError && (
                <div
                  className="rounded-md px-4 py-3 text-sm bg-destructive/10 border border-destructive/40 text-destructive font-medium"
                  role="alert"
                  data-ocid="booking.submit.error_state"
                >
                  {checkoutMutation.error?.message ??
                    "Something went wrong. Please try again or WhatsApp us at +91-8058564056."}
                </div>
              )}

              {/* Submit */}
              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={checkoutMutation.isPending || !isFormValid}
                  data-ocid="booking.submit.primary_button"
                  className="btn-cta w-full h-12"
                >
                  {checkoutMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting to payment…
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Proceed to Payment
                      {total > 0 && (
                        <span className="ml-1 opacity-80">
                          · ₹{total.toLocaleString("en-IN")}
                        </span>
                      )}
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  You'll be taken to Stripe's secure payment page to complete
                  your booking.
                </p>
              </div>
            </form>
          </div>

          {/* Alt contact strip */}
          <div className="mt-6 p-5 rounded-sm border border-border bg-card/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <div className="text-muted-foreground text-center sm:text-left">
              Prefer to book directly?
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="tel:+918828104056"
                className="btn-secondary py-2 px-5 text-xs"
                data-ocid="booking.call.button"
              >
                📞 Call Mumbai
              </a>
              <a
                href="https://wa.me/918058564056"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2 px-5 text-xs"
                data-ocid="booking.whatsapp.button"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
