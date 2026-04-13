import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBooking } from "@/hooks/useCreateBooking";
import { useServices } from "@/hooks/useServices";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import type { BookingRequest } from "@/types";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  Loader2,
  Scissors,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface FormErrors {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceId?: string;
  preferredDateTime?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields: Partial<BookingRequest>): FormErrors {
  const errors: FormErrors = {};
  if (!fields.customerName?.trim()) errors.customerName = "Name is required.";
  if (!fields.customerEmail?.trim()) {
    errors.customerEmail = "Email is required.";
  } else if (!EMAIL_RE.test(fields.customerEmail)) {
    errors.customerEmail = "Enter a valid email address.";
  }
  if (!fields.customerPhone?.trim())
    errors.customerPhone = "Phone number is required.";
  if (!fields.serviceId) errors.serviceId = "Please select a service.";
  if (!fields.preferredDateTime?.trim())
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-base font-semibold text-accent uppercase tracking-widest pb-3 border-b border-border flex items-center gap-2">
        {children}
      </h2>
    </div>
  );
}

export function Booking() {
  const { data: services = [], isLoading: loadingServices } = useServices();
  const { data: team = [], isLoading: loadingTeam } = useTeamMembers();
  const mutation = useCreateBooking();

  const [form, setForm] = useState<Partial<BookingRequest>>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    preferredDateTime: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState<string>("");

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(
    field: keyof BookingRequest,
    value: string | number | undefined,
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      serviceId: true,
      preferredDateTime: true,
    });
    if (hasErrors) return;

    try {
      const booking = await mutation.mutateAsync(form as BookingRequest);
      const ref = `MD-${String(booking.id).slice(-6).padStart(6, "0")}`;
      setBookingRef(ref);
      setSubmitted(true);
    } catch {
      // error handled via mutation.isError
    }
  }

  const selectedService = services.find((s) => s.id === form.serviceId);

  if (submitted) {
    return (
      <Layout>
        <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-background">
          {/* Ambient glow */}
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
              Your appointment with Master Deepak has been received. We'll
              contact you shortly to confirm.
            </p>

            <div className="card-premium mb-8 text-left">
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-3">
                Booking Reference
              </div>
              <div
                className="font-display text-4xl font-bold mb-5 text-gradient-gold"
                data-ocid="booking-ref"
              >
                {bookingRef}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Name</span>
                  <span className="text-foreground font-semibold">
                    {form.customerName}
                  </span>
                </div>
                {selectedService && (
                  <div className="flex justify-between items-center py-2 border-b border-border/40">
                    <span className="text-muted-foreground">Service</span>
                    <span className="text-foreground font-semibold">
                      {selectedService.name}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 border-b border-border/40">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span className="text-foreground font-semibold">
                    {form.preferredDateTime
                      ? new Date(form.preferredDateTime).toLocaleString(
                          "en-IN",
                          {
                            dateStyle: "medium",
                            timeStyle: "short",
                          },
                        )
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-accent font-bold uppercase tracking-wider text-xs">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                className="btn-cta"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    customerName: "",
                    customerEmail: "",
                    customerPhone: "",
                    preferredDateTime: "",
                  });
                  setTouched({});
                  setBookingRef("");
                }}
                data-ocid="book-another"
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
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Banner */}
        <div className="relative pt-24 pb-14 overflow-hidden">
          {/* Background texture */}
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
                Rajasthan — premium cuts, colors & chemical treatments.
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
              {/* Personal Info */}
              <div>
                <SectionHeading>
                  <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 inline-flex items-center justify-center text-[10px] font-black">
                    1
                  </span>
                  Your Details
                </SectionHeading>
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
                      value={form.customerName ?? ""}
                      onChange={(e) =>
                        handleChange("customerName", e.target.value)
                      }
                      onBlur={() => handleBlur("customerName")}
                      data-ocid="input-name"
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
                      value={form.customerEmail ?? ""}
                      onChange={(e) =>
                        handleChange("customerEmail", e.target.value)
                      }
                      onBlur={() => handleBlur("customerEmail")}
                      data-ocid="input-email"
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
                      value={form.customerPhone ?? ""}
                      onChange={(e) =>
                        handleChange("customerPhone", e.target.value)
                      }
                      onBlur={() => handleBlur("customerPhone")}
                      data-ocid="input-phone"
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

              {/* Service & Barber */}
              <div>
                <SectionHeading>
                  <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 inline-flex items-center justify-center text-[10px] font-black">
                    2
                  </span>
                  Service &amp; Barber
                </SectionHeading>
                <div className="space-y-5">
                  <div>
                    <Label
                      htmlFor="serviceId"
                      className="text-foreground font-semibold text-sm mb-2 block"
                    >
                      Select Service <span className="text-accent">*</span>
                    </Label>
                    <div className="relative">
                      <select
                        id="serviceId"
                        value={form.serviceId ?? ""}
                        onChange={(e) =>
                          handleChange(
                            "serviceId",
                            e.target.value ? Number(e.target.value) : undefined,
                          )
                        }
                        onBlur={() => handleBlur("serviceId")}
                        data-ocid="select-service"
                        aria-invalid={touched.serviceId && !!errors.serviceId}
                        disabled={loadingServices}
                        className="w-full h-11 rounded-md pl-3 pr-10 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-smooth disabled:opacity-50 disabled:cursor-not-allowed bg-background border border-input"
                      >
                        <option value="" className="bg-card text-foreground">
                          {loadingServices
                            ? "Loading services…"
                            : "Choose a service"}
                        </option>
                        {services.map((s) => (
                          <option
                            key={s.id}
                            value={s.id}
                            className="bg-card text-foreground"
                          >
                            {s.name} — ₹{s.price} · {s.durationMinutes} min
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    </div>
                    {touched.serviceId && (
                      <FieldError message={errors.serviceId} />
                    )}
                    {selectedService && (
                      <div className="mt-2.5 px-3.5 py-2.5 rounded-md text-sm text-muted-foreground flex items-start gap-2 bg-accent/5 border border-accent/20">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-accent mt-0.5" />
                        <span>{selectedService.description}</span>
                      </div>
                    )}
                  </div>

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
                        value={form.teamMemberId ?? ""}
                        onChange={(e) =>
                          handleChange(
                            "teamMemberId",
                            e.target.value ? Number(e.target.value) : undefined,
                          )
                        }
                        data-ocid="select-barber"
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

              {/* Date & Time */}
              <div>
                <SectionHeading>
                  <span className="w-5 h-5 rounded-full bg-accent/15 border border-accent/30 inline-flex items-center justify-center text-[10px] font-black">
                    3
                  </span>
                  Date &amp; Time
                </SectionHeading>
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
                    value={form.preferredDateTime ?? ""}
                    min={(() => {
                      const now = new Date();
                      const year = now.getFullYear();
                      const month = String(now.getMonth() + 1).padStart(2, "0");
                      const date = String(now.getDate()).padStart(2, "0");
                      const hours = String(now.getHours()).padStart(2, "0");
                      const minutes = String(now.getMinutes()).padStart(2, "0");
                      return `${year}-${month}-${date}T${hours}:${minutes}`;
                    })()}
                    onChange={(e) =>
                      handleChange("preferredDateTime", e.target.value)
                    }
                    onBlur={() => handleBlur("preferredDateTime")}
                    data-ocid="input-datetime"
                    aria-invalid={
                      touched.preferredDateTime && !!errors.preferredDateTime
                    }
                    className="bg-background border-border text-foreground focus-visible:ring-accent h-11 [color-scheme:dark]"
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

              {/* Error Summary */}
              {mutation.isError && (
                <div
                  className="rounded-md px-4 py-3 text-sm bg-destructive/10 border border-destructive/40 text-destructive font-medium"
                  role="alert"
                >
                  Something went wrong. Please try again or WhatsApp us at
                  +91-8058564056.
                </div>
              )}

              {/* Submit */}
              <div className="pt-1">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  data-ocid="submit-booking"
                  className="btn-cta w-full h-12"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Booking…
                    </>
                  ) : (
                    <>
                      <Scissors className="w-4 h-4" />
                      Confirm Appointment
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                  We'll confirm your slot within the hour via call or WhatsApp.
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
                data-ocid="contact-call-1"
              >
                📞 Call Mumbai
              </a>
              <a
                href="https://wa.me/918058564056"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2 px-5 text-xs"
                data-ocid="contact-whatsapp"
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
