import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAllBookings,
  useBookingsByDate,
  useFutureBookings,
} from "@/hooks/useAdminBookings";
import { useMarkBookingPaid } from "@/hooks/useMarkBookingPaid";
import type { Booking } from "@/types";
import {
  Calendar,
  CalendarClock,
  ChevronRight,
  Clock,
  LogOut,
  Mail,
  Phone,
  Scissors,
  Shield,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

// ─── Auth ────────────────────────────────────────────────────────────────────

const ADMIN_KEY = "admin_session_v1";
const VALID_EMAIL = "kuldeepjoya439@gmail.com";
const VALID_PASSWORD = "kuldeepjoya@007";

function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(ADMIN_KEY) === "1",
  );

  const login = useCallback((email: string, password: string): boolean => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem(ADMIN_KEY, "1");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function AdminLogin({
  onLogin,
}: { onLogin: (e: string, p: string) => boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = onLogin(email, password);
      if (!ok) setError("Invalid credentials. Please try again.");
      setLoading(false);
    }, 400);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Gold accent bar */}
        <div
          className="h-1 w-full rounded-t-sm"
          style={{ background: "oklch(0.65 0.15 68)" }}
        />

        <div className="bg-card border border-border rounded-b-sm shadow-elevated p-8">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.65 0.15 68 / 0.12)",
                border: "1px solid oklch(0.65 0.15 68 / 0.3)",
              }}
            >
              <Shield
                className="w-5 h-5"
                style={{ color: "oklch(0.65 0.15 68)" }}
              />
            </div>
            <div className="text-center">
              <h1 className="font-display text-xl font-semibold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Master Deepak Hair Expert
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="section-label mb-1.5 block"
                htmlFor="admin-email"
              >
                Email
              </label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                data-ocid="admin.email_input"
              />
            </div>
            <div>
              <label
                className="section-label mb-1.5 block"
                htmlFor="admin-password"
              >
                Password
              </label>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                data-ocid="admin.password_input"
              />
            </div>

            {error && (
              <p
                className="text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-sm px-3 py-2"
                data-ocid="admin.error_state"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2 disabled:opacity-60"
              data-ocid="admin.submit_button"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Restricted access · Master Deepak Admin
        </p>
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayDateStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function formatTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return dateStr;
  }
}

function formatDisplayDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function serviceLabel(serviceIds: number[]): string {
  const map: Record<number, string> = {
    1: "Butterfly Haircut",
    2: "Signature Haircut",
    3: "Wolf Haircut",
    4: "Round Layers",
    5: "Rhombus Cut",
    6: "Advanced Hair Color",
    7: "Chemical Treatments",
  };
  if (!serviceIds || serviceIds.length === 0) return "Service TBD";
  return serviceIds.map((id) => map[id] ?? `Service #${id}`).join(", ");
}

function sortByTime(bookings: Booking[]): Booking[] {
  return [...bookings].sort(
    (a, b) =>
      new Date(a.preferredDateTime).getTime() -
      new Date(b.preferredDateTime).getTime(),
  );
}

// ─── Payment Toggle ───────────────────────────────────────────────────────────

function PayToggle({ booking }: { booking: Booking }) {
  const { mutate, isPending } = useMarkBookingPaid();
  const isPaid = booking.paymentStatus === "paid";

  function handleToggle() {
    if (isPending) return;
    mutate(BigInt(booking.id), {
      onSuccess: () =>
        toast.success(
          `Booking ${booking.referenceCode} marked as ${isPaid ? "unpaid" : "paid"}`,
        ),
      onError: () => toast.error("Failed to update payment status"),
    });
  }

  return (
    <button
      onClick={handleToggle}
      type="button"
      disabled={isPending}
      className={`admin-status-badge transition-smooth ${
        isPaid
          ? "admin-status-paid hover:opacity-80"
          : "admin-status-unpaid hover:opacity-80"
      } ${isPending ? "opacity-60 cursor-wait" : "cursor-pointer"}`}
      title={isPaid ? "Click to mark as unpaid" : "Click to mark as paid"}
      data-ocid="admin.payment_toggle"
      aria-label={isPaid ? "Mark as unpaid" : "Mark as paid"}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{
          background: isPaid ? "oklch(0.65 0.15 68)" : "oklch(0.52 0.22 25)",
        }}
      />
      {isPending ? "Saving…" : isPaid ? "Paid" : "Unpaid"}
    </button>
  );
}

// ─── Booking Card (Today's / Future view) ────────────────────────────────────

function BookingCard({
  booking,
  index,
  showDate = false,
  ocidPrefix = "admin.booking_card",
}: {
  booking: Booking;
  index: number;
  showDate?: boolean;
  ocidPrefix?: string;
}) {
  return (
    <div
      className="admin-booking-card"
      data-ocid={`${ocidPrefix}.item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        {/* Time block + details */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-sm flex flex-col items-center justify-center text-center"
            style={{
              background: showDate
                ? "oklch(0.55 0.18 260 / 0.08)"
                : "oklch(0.65 0.15 68 / 0.08)",
              border: showDate
                ? "1px solid oklch(0.55 0.18 260 / 0.2)"
                : "1px solid oklch(0.65 0.15 68 / 0.2)",
            }}
          >
            {showDate ? (
              <>
                <CalendarClock
                  className="w-3.5 h-3.5 mb-0.5"
                  style={{ color: "oklch(0.55 0.18 260)" }}
                />
                <span className="text-[10px] font-bold leading-tight text-foreground">
                  {new Date(booking.preferredDateTime).toLocaleDateString(
                    "en-IN",
                    { day: "numeric", month: "short" },
                  )}
                </span>
                <span
                  className="text-[9px] leading-tight"
                  style={{ color: "oklch(0.55 0.18 260)" }}
                >
                  {formatTime(booking.preferredDateTime)}
                </span>
              </>
            ) : (
              <>
                <Clock
                  className="w-3.5 h-3.5 mb-0.5"
                  style={{ color: "oklch(0.65 0.15 68)" }}
                />
                <span className="text-[11px] font-bold leading-tight text-foreground">
                  {formatTime(booking.preferredDateTime)}
                </span>
              </>
            )}
          </div>

          <div className="min-w-0 flex-1">
            {/* Name + ref code row */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-semibold text-foreground truncate">
                {booking.customerName}
              </span>
              <span
                className="admin-reference-code"
                data-ocid={`admin.reference_code.${index + 1}`}
              >
                {booking.referenceCode}
              </span>
            </div>

            {/* Services + total row */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Scissors className="w-3 h-3 flex-shrink-0" />
                {serviceLabel(booking.serviceIds)}
              </span>
              <span
                className="text-xs font-semibold px-1.5 py-0.5 rounded-sm"
                style={{
                  background: "oklch(0.65 0.15 68 / 0.1)",
                  color: "oklch(0.45 0.12 68)",
                }}
                data-ocid={`admin.total_amount.${index + 1}`}
              >
                ₹{booking.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Contact row */}
            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Phone className="w-3 h-3" />
                {booking.customerPhone}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground truncate">
                <Mail className="w-3 h-3" />
                {booking.customerEmail}
              </span>
            </div>
          </div>
        </div>

        {/* Payment status toggle */}
        <div className="flex-shrink-0">
          <PayToggle booking={booking} />
        </div>
      </div>
    </div>
  );
}

// ─── Today's Bookings ─────────────────────────────────────────────────────────

function TodayBookings() {
  const today = todayDateStr();
  const { data: allBookings, isLoading, isError } = useAllBookings();

  const todayBookings = sortByTime(
    (allBookings ?? []).filter((b) => b.preferredDateTime.startsWith(today)),
  );

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.today_bookings.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-sm" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="text-destructive text-sm bg-destructive/8 border border-destructive/20 rounded-sm px-4 py-3"
        data-ocid="admin.today_bookings.error_state"
      >
        Failed to load bookings. Please refresh.
      </div>
    );
  }

  if (todayBookings.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        data-ocid="admin.today_bookings.empty_state"
      >
        <Calendar className="w-10 h-10 text-muted-foreground/40 mb-3" />
        <p className="font-display text-lg text-foreground font-medium">
          No bookings today
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          Appointments for today will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todayBookings.map((booking, i) => (
        <BookingCard
          key={booking.id.toString()}
          booking={booking}
          index={i}
          ocidPrefix="admin.booking_card"
        />
      ))}
    </div>
  );
}

// ─── Past Bookings Table ──────────────────────────────────────────────────────

function PastBookingsTable({ dateStr }: { dateStr: string }) {
  const { data, isLoading, isError } = useBookingsByDate(dateStr);
  const bookings = sortByTime(data ?? []);

  if (!dateStr) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center"
        data-ocid="admin.past_bookings.empty_state"
      >
        <Calendar className="w-8 h-8 text-muted-foreground/40 mb-3" />
        <p className="text-muted-foreground text-sm">
          Select a date to view bookings
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-2" data-ocid="admin.past_bookings.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 w-full rounded-sm" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="text-destructive text-sm bg-destructive/8 border border-destructive/20 rounded-sm px-4 py-3"
        data-ocid="admin.past_bookings.error_state"
      >
        Failed to load bookings for this date. Please try again.
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-center"
        data-ocid="admin.past_bookings_date.empty_state"
      >
        <p className="text-muted-foreground text-sm">
          No bookings found for this date
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="admin-data-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Reference</th>
            <th>Customer</th>
            <th>Contact</th>
            <th>Services</th>
            <th className="text-right">Total</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, i) => (
            <tr
              key={booking.id.toString()}
              data-ocid={`admin.past_booking.item.${i + 1}`}
            >
              <td className="text-sm font-mono whitespace-nowrap">
                {formatTime(booking.preferredDateTime)}
              </td>
              <td>
                <span className="admin-reference-code">
                  {booking.referenceCode}
                </span>
              </td>
              <td>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {booking.customerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {booking.customerEmail}
                  </p>
                </div>
              </td>
              <td className="text-sm text-muted-foreground whitespace-nowrap">
                {booking.customerPhone}
              </td>
              <td className="text-sm max-w-[180px]">
                {serviceLabel(booking.serviceIds)}
              </td>
              <td className="text-right">
                <span
                  className="text-sm font-semibold whitespace-nowrap"
                  style={{ color: "oklch(0.45 0.12 68)" }}
                  data-ocid={`admin.past_total.${i + 1}`}
                >
                  ₹{booking.totalAmount.toLocaleString("en-IN")}
                </span>
              </td>
              <td>
                <PayToggle booking={booking} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Future Bookings List ─────────────────────────────────────────────────────

function FutureBookingsList({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}) {
  const { data, isLoading, isError } = useFutureBookings();

  const bookings = (data ?? []).filter((b) => {
    const dateOnly = b.preferredDateTime.slice(0, 10);
    if (fromDate && dateOnly < fromDate) return false;
    if (toDate && dateOnly > toDate) return false;
    return true;
  });

  if (isLoading) {
    return (
      <div
        className="space-y-3"
        data-ocid="admin.future_bookings.loading_state"
      >
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-sm" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="text-destructive text-sm bg-destructive/8 border border-destructive/20 rounded-sm px-4 py-3"
        data-ocid="admin.future_bookings.error_state"
      >
        Failed to load upcoming bookings. Please refresh.
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        data-ocid="admin.future_bookings.empty_state"
      >
        <CalendarClock className="w-10 h-10 text-muted-foreground/40 mb-3" />
        <p className="font-display text-lg text-foreground font-medium">
          No upcoming bookings
        </p>
        <p className="text-muted-foreground text-sm mt-1">
          {fromDate || toDate
            ? "No bookings found for the selected date range"
            : "Future appointments will appear here"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((booking, i) => (
        <BookingCard
          key={booking.id.toString()}
          booking={booking}
          index={i}
          showDate
          ocidPrefix="admin.future_booking"
        />
      ))}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

type Tab = "today" | "past" | "future";

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [pastDate, setPastDate] = useState(() =>
    new Date(Date.now() - 86_400_000).toISOString().slice(0, 10),
  );
  const [futureFrom, setFutureFrom] = useState(() => todayDateStr());
  const [futureTo, setFutureTo] = useState("");

  const today = todayDateStr();

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border shadow-subtle sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: "oklch(0.65 0.15 68)" }}
            >
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-display font-semibold text-foreground text-sm">
                Master Deepak
              </span>
              <span
                className="ml-2 text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm"
                style={{
                  background: "oklch(0.65 0.15 68 / 0.1)",
                  color: "oklch(0.65 0.15 68)",
                  border: "1px solid oklch(0.65 0.15 68 / 0.25)",
                }}
              >
                Admin
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors duration-200"
            data-ocid="admin.logout_button"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-border">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`admin-nav-link text-sm font-medium pb-3 px-3 border-b-2 -mb-px transition-colors duration-200 ${
              activeTab === "today"
                ? "border-accent text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="admin.today_tab"
          >
            Today&apos;s Bookings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={`admin-nav-link text-sm font-medium pb-3 px-3 border-b-2 -mb-px transition-colors duration-200 ${
              activeTab === "past"
                ? "border-accent text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="admin.past_tab"
          >
            Past Bookings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("future")}
            className={`admin-nav-link text-sm font-medium pb-3 px-3 border-b-2 -mb-px transition-colors duration-200 ${
              activeTab === "future"
                ? "border-accent text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid="admin.future_tab"
          >
            Future Bookings
          </button>
        </div>

        {/* Today's Bookings Panel */}
        {activeTab === "today" && (
          <section data-ocid="admin.today_section">
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Today&apos;s Appointments
                </h2>
                <p className="text-muted-foreground text-sm mt-1 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDisplayDate(today)}
                </p>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-semibold"
                style={{
                  background: "oklch(0.65 0.15 68 / 0.08)",
                  color: "oklch(0.65 0.15 68)",
                  border: "1px solid oklch(0.65 0.15 68 / 0.2)",
                }}
              >
                <Clock className="w-3.5 h-3.5" />
                Sorted by time
              </div>
            </div>
            <TodayBookings />
          </section>
        )}

        {/* Past Bookings Panel */}
        {activeTab === "past" && (
          <section data-ocid="admin.past_section">
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Past Bookings
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Filter by date to view appointment history
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="date"
                  value={pastDate}
                  max={today}
                  onChange={(e) => setPastDate(e.target.value)}
                  className="w-44 text-sm"
                  data-ocid="admin.date_picker_input"
                />
              </div>
            </div>

            {pastDate && (
              <div className="flex items-center gap-2 mb-4">
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Showing results for{" "}
                  <span className="font-semibold text-foreground">
                    {formatDisplayDate(pastDate)}
                  </span>
                </span>
              </div>
            )}

            <div className="bg-card border border-border rounded-sm shadow-subtle p-4">
              <PastBookingsTable dateStr={pastDate} />
            </div>
          </section>
        )}

        {/* Future Bookings Panel */}
        {activeTab === "future" && (
          <section data-ocid="admin.future_section">
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Future Bookings
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Upcoming appointments — auto-refreshes every 10 seconds
                </p>
              </div>
              {/* Date range filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <CalendarClock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">From</span>
                  <Input
                    type="date"
                    value={futureFrom}
                    min={today}
                    onChange={(e) => setFutureFrom(e.target.value)}
                    className="w-40 text-sm"
                    data-ocid="admin.future_from_date_input"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">To</span>
                  <Input
                    type="date"
                    value={futureTo}
                    min={futureFrom || today}
                    onChange={(e) => setFutureTo(e.target.value)}
                    className="w-40 text-sm"
                    data-ocid="admin.future_to_date_input"
                  />
                </div>
                {(futureFrom || futureTo) && (
                  <button
                    type="button"
                    onClick={() => {
                      setFutureFrom(todayDateStr());
                      setFutureTo("");
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors duration-200"
                    data-ocid="admin.future_clear_filter_button"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {(futureFrom || futureTo) && (
              <div className="flex items-center gap-2 mb-4">
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {futureFrom && futureTo ? (
                    <>
                      Showing bookings from{" "}
                      <span className="font-semibold text-foreground">
                        {formatDisplayDate(futureFrom)}
                      </span>{" "}
                      to{" "}
                      <span className="font-semibold text-foreground">
                        {formatDisplayDate(futureTo)}
                      </span>
                    </>
                  ) : futureFrom ? (
                    <>
                      Showing bookings from{" "}
                      <span className="font-semibold text-foreground">
                        {formatDisplayDate(futureFrom)}
                      </span>
                    </>
                  ) : (
                    <>
                      Showing bookings up to{" "}
                      <span className="font-semibold text-foreground">
                        {formatDisplayDate(futureTo)}
                      </span>
                    </>
                  )}
                </span>
              </div>
            )}

            <FutureBookingsList fromDate={futureFrom} toDate={futureTo} />
          </section>
        )}
      </main>
    </div>
  );
}

// ─── Page Export ──────────────────────────────────────────────────────────────

export function Admin() {
  const { isAuthenticated, login, logout } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return <AdminDashboard onLogout={logout} />;
}
