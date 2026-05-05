import type { backendInterface, Booking as BackendBooking } from "../backend";
import { BookingStatus, PaymentStatus, ServiceCategory } from "../backend";

// ── Sample static data ────────────────────────────────────────────────────────

const sampleServices = [
  {
    id: BigInt(1),
    name: "Classic Haircut",
    description: "Precision scissor cut with styling, tailored to your face shape.",
    durationMinutes: BigInt(45),
    category: ServiceCategory.haircut,
    price: BigInt(35),
  },
  {
    id: BigInt(2),
    name: "Skin Fade",
    description: "Clean skin fade blended to perfection.",
    durationMinutes: BigInt(50),
    category: ServiceCategory.fade,
    price: BigInt(45),
  },
  {
    id: BigInt(3),
    name: "Beard Trim & Shape",
    description: "Hot towel shave and beard sculpting.",
    durationMinutes: BigInt(30),
    category: ServiceCategory.beardTrim,
    price: BigInt(25),
  },
  {
    id: BigInt(4),
    name: "Lineup & Edge Up",
    description: "Crisp hairline, temple, and neckline definition.",
    durationMinutes: BigInt(20),
    category: ServiceCategory.lineup,
    price: BigInt(20),
  },
];

const sampleTeamMembers = [
  { id: BigInt(1), name: "Master Deepak", specialty: "Hair Expert" },
  { id: BigInt(2), name: "Rahul Sen", specialty: "Beard Specialist" },
];

// ── Module-level mutable booking store ───────────────────────────────────────

const today = new Date();
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const prevDay = today.getDate() - 1;
const pastDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(prevDay).padStart(2, "0")}`;

// Future dates: tomorrow + day after
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
const dayAfter = new Date(today);
dayAfter.setDate(today.getDate() + 3);
const dayAfterStr = `${dayAfter.getFullYear()}-${String(dayAfter.getMonth() + 1).padStart(2, "0")}-${String(dayAfter.getDate()).padStart(2, "0")}`;

const nowNs = BigInt(Date.now()) * BigInt(1_000_000);

// Price map for mock service price lookup (INR, matching useServices.ts)
const SERVICE_PRICES: Record<number, number> = {
  1: 1500, // Butterfly Haircut
  2: 1200, // Signature Haircut
  3: 1400, // Wolf Haircut
  4: 1100, // Round Layers
  5: 1800, // Rhombus Cut
  6: 3500, // Advanced Hair Color
  7: 4000, // Chemical Treatments
};

const bookingStore: BackendBooking[] = [
  {
    id: BigInt(1),
    customerName: "Arjun Sharma",
    customerEmail: "arjun.sharma@gmail.com",
    customerPhone: "+91 98765 43210",
    serviceIds: [BigInt(1)],
    teamMemberId: BigInt(1),
    preferredDateTime: `${todayStr}T10:00`,
    status: BookingStatus.confirmed,
    paymentStatus: PaymentStatus.paid,
    referenceCode: `MD-${todayStr.replace(/-/g, "")}-001`,
    createdAt: nowNs,
    totalAmount: BigInt(1500),
    stripeSessionId: "cs_mock_001",
  },
  {
    id: BigInt(2),
    customerName: "Priya Mehta",
    customerEmail: "priya.mehta@yahoo.com",
    customerPhone: "+91 87654 32109",
    serviceIds: [BigInt(2), BigInt(6)],
    teamMemberId: BigInt(1),
    preferredDateTime: `${todayStr}T11:30`,
    status: BookingStatus.confirmed,
    paymentStatus: PaymentStatus.unpaid,
    referenceCode: `MD-${todayStr.replace(/-/g, "")}-002`,
    createdAt: nowNs,
    totalAmount: BigInt(4700),
    stripeSessionId: "cs_mock_002",
  },
  {
    id: BigInt(3),
    customerName: "Rajesh Kumar",
    customerEmail: "rajesh.k@hotmail.com",
    customerPhone: "+91 76543 21098",
    serviceIds: [BigInt(3)],
    teamMemberId: BigInt(2),
    preferredDateTime: `${todayStr}T14:00`,
    status: BookingStatus.pending,
    paymentStatus: PaymentStatus.unpaid,
    referenceCode: `MD-${todayStr.replace(/-/g, "")}-003`,
    createdAt: nowNs,
    totalAmount: BigInt(1400),
    stripeSessionId: undefined,
  },
  {
    id: BigInt(4),
    customerName: "Kavya Singh",
    customerEmail: "kavya.s@gmail.com",
    customerPhone: "+91 65432 10987",
    serviceIds: [BigInt(1), BigInt(3)],
    teamMemberId: BigInt(1),
    preferredDateTime: `${pastDate}T09:00`,
    status: BookingStatus.confirmed,
    paymentStatus: PaymentStatus.paid,
    referenceCode: `MD-${pastDate.replace(/-/g, "")}-001`,
    createdAt: nowNs,
    totalAmount: BigInt(2900),
    stripeSessionId: "cs_mock_004",
  },
  {
    id: BigInt(5),
    customerName: "Amit Patel",
    customerEmail: "amit.p@gmail.com",
    customerPhone: "+91 54321 09876",
    serviceIds: [BigInt(2)],
    teamMemberId: BigInt(2),
    preferredDateTime: `${pastDate}T15:00`,
    status: BookingStatus.confirmed,
    paymentStatus: PaymentStatus.unpaid,
    referenceCode: `MD-${pastDate.replace(/-/g, "")}-002`,
    createdAt: nowNs,
    totalAmount: BigInt(1200),
    stripeSessionId: undefined,
  },
  // Future bookings
  {
    id: BigInt(6),
    customerName: "Neha Kapoor",
    customerEmail: "neha.kapoor@gmail.com",
    customerPhone: "+91 99887 66554",
    serviceIds: [BigInt(5), BigInt(6)],
    teamMemberId: BigInt(1),
    preferredDateTime: `${tomorrowStr}T10:30`,
    status: BookingStatus.confirmed,
    paymentStatus: PaymentStatus.paid,
    referenceCode: `MD-${tomorrowStr.replace(/-/g, "")}-001`,
    createdAt: nowNs,
    totalAmount: BigInt(5300),
    stripeSessionId: "cs_mock_006",
  },
  {
    id: BigInt(7),
    customerName: "Rohan Verma",
    customerEmail: "rohan.v@gmail.com",
    customerPhone: "+91 88776 55443",
    serviceIds: [BigInt(2), BigInt(4)],
    teamMemberId: BigInt(2),
    preferredDateTime: `${tomorrowStr}T14:00`,
    status: BookingStatus.confirmed,
    paymentStatus: PaymentStatus.unpaid,
    referenceCode: `MD-${tomorrowStr.replace(/-/g, "")}-002`,
    createdAt: nowNs,
    totalAmount: BigInt(2300),
    stripeSessionId: "cs_mock_007",
  },
  {
    id: BigInt(8),
    customerName: "Sunita Joshi",
    customerEmail: "sunita.j@yahoo.com",
    customerPhone: "+91 77665 44332",
    serviceIds: [BigInt(7)],
    teamMemberId: BigInt(1),
    preferredDateTime: `${dayAfterStr}T11:00`,
    status: BookingStatus.confirmed,
    paymentStatus: PaymentStatus.paid,
    referenceCode: `MD-${dayAfterStr.replace(/-/g, "")}-001`,
    createdAt: nowNs,
    totalAmount: BigInt(4000),
    stripeSessionId: "cs_mock_008",
  },
];

let _nextId = 9;

function nextRefCode(): string {
  const d = new Date();
  const ds =
    String(d.getFullYear()) +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  return `MD-${ds}-${String(_nextId).padStart(3, "0")}`;
}

// ── Pending checkout sessions (waiting for payment confirmation) ──────────────
// Maps sessionId → partial booking info
interface PendingSession {
  sessionId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceIds: bigint[];
  teamMemberId?: bigint;
  preferredDateTime: string;
  totalAmount: bigint;
}
const pendingSessions = new Map<string, PendingSession>();

// ── Mock backend implementation ───────────────────────────────────────────────

export const mockBackend: backendInterface = {
  listServices: async () => sampleServices,
  listTeamMembers: async () => sampleTeamMembers,

  listBookings: async () =>
    bookingStore.filter((b) => b.preferredDateTime.startsWith(todayStr)),

  listAllBookings: async () => [...bookingStore],

  listBookingsByDate: async (dateStr) =>
    bookingStore.filter((b) => b.preferredDateTime.startsWith(dateStr)),

  listFutureBookings: async () => {
    const nowStr = new Date().toISOString().slice(0, 16);
    return bookingStore
      .filter((b) => b.preferredDateTime > nowStr)
      .sort((a, b) => a.preferredDateTime.localeCompare(b.preferredDateTime));
  },

  markBookingPaid: async (id) => {
    const idx = bookingStore.findIndex((b) => b.id === id);
    if (idx === -1) return { __kind__: "err" as const, err: "Booking not found" };
    bookingStore[idx] = { ...bookingStore[idx], paymentStatus: PaymentStatus.paid };
    return { __kind__: "ok" as const, ok: bookingStore[idx] };
  },

  /** Legacy — removed from backendInterface, kept as dead code for reference */
  // createBooking was removed when multi-service Stripe flow was introduced

  /**
   * Mock Stripe checkout session creation.
   * Returns a fake checkout URL that redirects to /booking?session_id=<id>
   * so the confirmation flow can be tested in dev without real Stripe.
   */
  createStripeCheckoutSession: async (req) => {
    const conflict = bookingStore.some(
      (b) => b.preferredDateTime === req.preferredDateTime,
    );
    if (conflict) {
      return {
        __kind__: "err" as const,
        err: "This time slot is already booked. Please choose a different time.",
      };
    }

    const sessionId = `mock_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const total = req.serviceIds.reduce((sum, id) => {
      return sum + BigInt(SERVICE_PRICES[Number(id)] ?? 0);
    }, BigInt(0));

    pendingSessions.set(sessionId, {
      sessionId,
      customerName: req.customerName,
      customerEmail: req.customerEmail,
      customerPhone: req.customerPhone,
      serviceIds: req.serviceIds,
      teamMemberId: req.teamMemberId,
      preferredDateTime: req.preferredDateTime,
      totalAmount: total,
    });

    // In mock mode, "Stripe" immediately returns to success URL with session_id
    const successBase = req.successUrl.split("?")[0];
    const checkoutUrl = `${successBase}?session_id=${sessionId}`;

    return {
      __kind__: "ok" as const,
      ok: { sessionId, checkoutUrl },
    };
  },

  /**
   * Mock payment confirmation.
   * Looks up the pending session and creates the booking with paymentStatus=paid.
   */
  confirmBookingAfterPayment: async (stripeSessionId) => {
    // Already confirmed?
    const existing = bookingStore.find(
      (b) => b.stripeSessionId === stripeSessionId,
    );
    if (existing) return { __kind__: "ok" as const, ok: existing };

    const session = pendingSessions.get(stripeSessionId);
    if (!session) {
      return {
        __kind__: "err" as const,
        err: "Payment session not found or expired.",
      };
    }

    const id = BigInt(_nextId++);
    const newBooking: BackendBooking = {
      id,
      customerName: session.customerName,
      customerEmail: session.customerEmail,
      customerPhone: session.customerPhone,
      serviceIds: session.serviceIds,
      teamMemberId: session.teamMemberId,
      preferredDateTime: session.preferredDateTime,
      status: BookingStatus.confirmed,
      paymentStatus: PaymentStatus.paid,
      referenceCode: nextRefCode(),
      createdAt: BigInt(Date.now()) * BigInt(1_000_000),
      totalAmount: session.totalAmount,
      stripeSessionId,
    };

    bookingStore.push(newBooking);
    pendingSessions.delete(stripeSessionId);
    return { __kind__: "ok" as const, ok: newBooking };
  },

  cancelBooking: async (id) => {
    const idx = bookingStore.findIndex((b) => b.id === id);
    if (idx === -1) return { __kind__: "err" as const, err: "Booking not found" };
    bookingStore[idx] = { ...bookingStore[idx], status: BookingStatus.cancelled };
    return { __kind__: "ok" as const, ok: bookingStore[idx] };
  },

  getBooking: async (id) => bookingStore.find((b) => b.id === id) ?? null,
  getService: async (id) => sampleServices.find((s) => s.id === id) ?? null,
  getTeamMember: async (id) => sampleTeamMembers.find((m) => m.id === id) ?? null,

  // ── Stripe helpers (stubs — real impl is in backend canister) ──────────────
  isStripeConfigured: async () => true,
  setStripeConfiguration: async () => undefined,
  createCheckoutSession: async () => "mock_checkout_url",
  getStripeSessionStatus: async (sessionId) => ({
    __kind__: "completed" as const,
    completed: { response: `mock_paid_${sessionId}` },
  }),
  transform: async (input) => ({
    status: BigInt(200),
    body: input.response.body,
    headers: input.response.headers,
  }),
};

// ── Toggle payment status (bidirectional, not in official interface) ──────────

export async function toggleBookingPayment(id: bigint): Promise<void> {
  const idx = bookingStore.findIndex((b) => b.id === id);
  if (idx === -1) throw new Error("Booking not found");
  bookingStore[idx] = {
    ...bookingStore[idx],
    paymentStatus:
      bookingStore[idx].paymentStatus === PaymentStatus.paid
        ? PaymentStatus.unpaid
        : PaymentStatus.paid,
  };
}
