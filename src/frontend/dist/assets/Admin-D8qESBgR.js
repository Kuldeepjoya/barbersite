import { j as jsxRuntimeExports, b as useQueryClient, r as reactExports, c as ue } from "./index-hUMo4Dx_.js";
import { a as cn, u as useQuery, m as mockBackend, b as useMutation, t as toggleBookingPayment, I as Input, C as Clock } from "./backend-DkdzDOtH.js";
import { c as createLucideIcon, S as Scissors, P as Phone } from "./scissors-nS2oxIpE.js";
import { C as ChevronRight } from "./chevron-right-C1jcSNr5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5", key: "1osxxc" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M3 10h5", key: "r794hk" }],
  ["path", { d: "M17.5 17.5 16 16.3V14", key: "akvzfd" }],
  ["circle", { cx: "16", cy: "16", r: "6", key: "qoo3c4" }]
];
const CalendarClock = createLucideIcon("calendar-clock", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function fromBackend(b) {
  return {
    id: Number(b.id),
    customerName: b.customerName,
    customerEmail: b.customerEmail,
    customerPhone: b.customerPhone,
    serviceIds: b.serviceIds.map(Number),
    teamMemberId: b.teamMemberId !== void 0 ? Number(b.teamMemberId) : void 0,
    preferredDateTime: b.preferredDateTime,
    status: b.status,
    paymentStatus: b.paymentStatus,
    referenceCode: b.referenceCode,
    createdAt: Number(b.createdAt / BigInt(1e6)),
    totalAmount: Number(b.totalAmount),
    stripeSessionId: b.stripeSessionId ?? null
  };
}
function useAllBookings() {
  return useQuery({
    queryKey: ["admin", "bookings", "all"],
    queryFn: async () => {
      const bookings = await mockBackend.listAllBookings();
      return bookings.map(fromBackend);
    },
    staleTime: 0,
    refetchInterval: 1e4
  });
}
function useBookingsByDate(dateStr) {
  return useQuery({
    queryKey: ["admin", "bookings", "date", dateStr],
    queryFn: async () => {
      if (!dateStr) return [];
      const bookings = await mockBackend.listBookingsByDate(dateStr);
      return bookings.map(fromBackend);
    },
    enabled: dateStr.length > 0,
    staleTime: 0,
    refetchInterval: 1e4
  });
}
function useFutureBookings() {
  return useQuery({
    queryKey: ["admin", "bookings", "future"],
    queryFn: async () => {
      const bookings = await mockBackend.listFutureBookings();
      return bookings.map(fromBackend);
    },
    staleTime: 0,
    refetchInterval: 1e4
  });
}
function useMarkBookingPaid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await toggleBookingPayment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "bookings"] });
    }
  });
}
const ADMIN_KEY = "admin_session_v1";
const VALID_EMAIL = "kuldeepjoya439@gmail.com";
const VALID_PASSWORD = "kuldeepjoya@007";
function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(
    () => localStorage.getItem(ADMIN_KEY) === "1"
  );
  const login = reactExports.useCallback((email, password) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem(ADMIN_KEY, "1");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);
  const logout = reactExports.useCallback(() => {
    localStorage.removeItem(ADMIN_KEY);
    setIsAuthenticated(false);
  }, []);
  return { isAuthenticated, login, logout };
}
function AdminLogin({
  onLogin
}) {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = onLogin(email, password);
      if (!ok) setError("Invalid credentials. Please try again.");
      setLoading(false);
    }, 400);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-1 w-full rounded-t-sm",
        style: { background: "oklch(0.65 0.15 68)" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-b-sm shadow-elevated p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-12 h-12 rounded-full flex items-center justify-center",
            style: {
              background: "oklch(0.65 0.15 68 / 0.12)",
              border: "1px solid oklch(0.65 0.15 68 / 0.3)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Shield,
              {
                className: "w-5 h-5",
                style: { color: "oklch(0.65 0.15 68)" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold text-foreground", children: "Admin Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Master Deepak Hair Expert" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              className: "section-label mb-1.5 block",
              htmlFor: "admin-email",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "admin-email",
              type: "email",
              placeholder: "admin@example.com",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              autoComplete: "username",
              "data-ocid": "admin.email_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              className: "section-label mb-1.5 block",
              htmlFor: "admin-password",
              children: "Password"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "admin-password",
              type: "password",
              placeholder: "••••••••",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              required: true,
              autoComplete: "current-password",
              "data-ocid": "admin.password_input"
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-destructive bg-destructive/8 border border-destructive/20 rounded-sm px-3 py-2",
            "data-ocid": "admin.error_state",
            children: error
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: loading,
            className: "btn-primary w-full mt-2 disabled:opacity-60",
            "data-ocid": "admin.submit_button",
            children: loading ? "Signing in…" : "Sign In"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6", children: "Restricted access · Master Deepak Admin" })
  ] }) });
}
function todayDateStr() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function formatTime(dateStr) {
  try {
    return new Date(dateStr).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return dateStr;
  }
}
function formatDisplayDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch {
    return dateStr;
  }
}
function serviceLabel(serviceIds) {
  const map = {
    1: "Butterfly Haircut",
    2: "Signature Haircut",
    3: "Wolf Haircut",
    4: "Round Layers",
    5: "Rhombus Cut",
    6: "Advanced Hair Color",
    7: "Chemical Treatments"
  };
  if (!serviceIds || serviceIds.length === 0) return "Service TBD";
  return serviceIds.map((id) => map[id] ?? `Service #${id}`).join(", ");
}
function sortByTime(bookings) {
  return [...bookings].sort(
    (a, b) => new Date(a.preferredDateTime).getTime() - new Date(b.preferredDateTime).getTime()
  );
}
function PayToggle({ booking }) {
  const { mutate, isPending } = useMarkBookingPaid();
  const isPaid = booking.paymentStatus === "paid";
  function handleToggle() {
    if (isPending) return;
    mutate(BigInt(booking.id), {
      onSuccess: () => ue.success(
        `Booking ${booking.referenceCode} marked as ${isPaid ? "unpaid" : "paid"}`
      ),
      onError: () => ue.error("Failed to update payment status")
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: handleToggle,
      type: "button",
      disabled: isPending,
      className: `admin-status-badge transition-smooth ${isPaid ? "admin-status-paid hover:opacity-80" : "admin-status-unpaid hover:opacity-80"} ${isPending ? "opacity-60 cursor-wait" : "cursor-pointer"}`,
      title: isPaid ? "Click to mark as unpaid" : "Click to mark as paid",
      "data-ocid": "admin.payment_toggle",
      "aria-label": isPaid ? "Mark as unpaid" : "Mark as paid",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-1.5 h-1.5 rounded-full inline-block",
            style: {
              background: isPaid ? "oklch(0.65 0.15 68)" : "oklch(0.52 0.22 25)"
            }
          }
        ),
        isPending ? "Saving…" : isPaid ? "Paid" : "Unpaid"
      ]
    }
  );
}
function BookingCard({
  booking,
  index,
  showDate = false,
  ocidPrefix = "admin.booking_card"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "admin-booking-card",
      "data-ocid": `${ocidPrefix}.item.${index + 1}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex-shrink-0 w-14 h-14 rounded-sm flex flex-col items-center justify-center text-center",
              style: {
                background: showDate ? "oklch(0.55 0.18 260 / 0.08)" : "oklch(0.65 0.15 68 / 0.08)",
                border: showDate ? "1px solid oklch(0.55 0.18 260 / 0.2)" : "1px solid oklch(0.65 0.15 68 / 0.2)"
              },
              children: showDate ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CalendarClock,
                  {
                    className: "w-3.5 h-3.5 mb-0.5",
                    style: { color: "oklch(0.55 0.18 260)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold leading-tight text-foreground", children: new Date(booking.preferredDateTime).toLocaleDateString(
                  "en-IN",
                  { day: "numeric", month: "short" }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[9px] leading-tight",
                    style: { color: "oklch(0.55 0.18 260)" },
                    children: formatTime(booking.preferredDateTime)
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Clock,
                  {
                    className: "w-3.5 h-3.5 mb-0.5",
                    style: { color: "oklch(0.65 0.15 68)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold leading-tight text-foreground", children: formatTime(booking.preferredDateTime) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground truncate", children: booking.customerName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "admin-reference-code",
                  "data-ocid": `admin.reference_code.${index + 1}`,
                  children: booking.referenceCode
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-3 h-3 flex-shrink-0" }),
                serviceLabel(booking.serviceIds)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-semibold px-1.5 py-0.5 rounded-sm",
                  style: {
                    background: "oklch(0.65 0.15 68 / 0.1)",
                    color: "oklch(0.45 0.12 68)"
                  },
                  "data-ocid": `admin.total_amount.${index + 1}`,
                  children: [
                    "₹",
                    booking.totalAmount.toLocaleString("en-IN")
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3 h-3" }),
                booking.customerPhone
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground truncate", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3" }),
                booking.customerEmail
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PayToggle, { booking }) })
      ] })
    }
  );
}
function TodayBookings() {
  const today = todayDateStr();
  const { data: allBookings, isLoading, isError } = useAllBookings();
  const todayBookings = sortByTime(
    (allBookings ?? []).filter((b) => b.preferredDateTime.startsWith(today))
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "admin.today_bookings.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-sm" }, i)) });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-destructive text-sm bg-destructive/8 border border-destructive/20 rounded-sm px-4 py-3",
        "data-ocid": "admin.today_bookings.error_state",
        children: "Failed to load bookings. Please refresh."
      }
    );
  }
  if (todayBookings.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "admin.today_bookings.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-10 h-10 text-muted-foreground/40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-foreground font-medium", children: "No bookings today" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Appointments for today will appear here" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: todayBookings.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    BookingCard,
    {
      booking,
      index: i,
      ocidPrefix: "admin.booking_card"
    },
    booking.id.toString()
  )) });
}
function PastBookingsTable({ dateStr }) {
  const { data, isLoading, isError } = useBookingsByDate(dateStr);
  const bookings = sortByTime(data ?? []);
  if (!dateStr) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 text-center",
        "data-ocid": "admin.past_bookings.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-8 h-8 text-muted-foreground/40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Select a date to view bookings" })
        ]
      }
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "admin.past_bookings.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-sm" }, i)) });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-destructive text-sm bg-destructive/8 border border-destructive/20 rounded-sm px-4 py-3",
        "data-ocid": "admin.past_bookings.error_state",
        children: "Failed to load bookings for this date. Please try again."
      }
    );
  }
  if (bookings.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 text-center",
        "data-ocid": "admin.past_bookings_date.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No bookings found for this date" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "admin-data-table", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Reference" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Customer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Services" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right", children: "Total" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Payment" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: bookings.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        "data-ocid": `admin.past_booking.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-sm font-mono whitespace-nowrap", children: formatTime(booking.preferredDateTime) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "admin-reference-code", children: booking.referenceCode }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: booking.customerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: booking.customerEmail })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-sm text-muted-foreground whitespace-nowrap", children: booking.customerPhone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-sm max-w-[180px]", children: serviceLabel(booking.serviceIds) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "text-sm font-semibold whitespace-nowrap",
              style: { color: "oklch(0.45 0.12 68)" },
              "data-ocid": `admin.past_total.${i + 1}`,
              children: [
                "₹",
                booking.totalAmount.toLocaleString("en-IN")
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PayToggle, { booking }) })
        ]
      },
      booking.id.toString()
    )) })
  ] }) });
}
function FutureBookingsList({
  fromDate,
  toDate
}) {
  const { data, isLoading, isError } = useFutureBookings();
  const bookings = (data ?? []).filter((b) => {
    const dateOnly = b.preferredDateTime.slice(0, 10);
    if (fromDate && dateOnly < fromDate) return false;
    if (toDate && dateOnly > toDate) return false;
    return true;
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "space-y-3",
        "data-ocid": "admin.future_bookings.loading_state",
        children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-sm" }, i))
      }
    );
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-destructive text-sm bg-destructive/8 border border-destructive/20 rounded-sm px-4 py-3",
        "data-ocid": "admin.future_bookings.error_state",
        children: "Failed to load upcoming bookings. Please refresh."
      }
    );
  }
  if (bookings.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "admin.future_bookings.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-10 h-10 text-muted-foreground/40 mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg text-foreground font-medium", children: "No upcoming bookings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: fromDate || toDate ? "No bookings found for the selected date range" : "Future appointments will appear here" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: bookings.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    BookingCard,
    {
      booking,
      index: i,
      showDate: true,
      ocidPrefix: "admin.future_booking"
    },
    booking.id.toString()
  )) });
}
function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = reactExports.useState("today");
  const [pastDate, setPastDate] = reactExports.useState(
    () => new Date(Date.now() - 864e5).toISOString().slice(0, 10)
  );
  const [futureFrom, setFutureFrom] = reactExports.useState(() => todayDateStr());
  const [futureTo, setFutureTo] = reactExports.useState("");
  const today = todayDateStr();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-card border-b border-border shadow-subtle sticky top-0 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-8 h-8 rounded-sm flex items-center justify-center",
            style: { background: "oklch(0.65 0.15 68)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-4 h-4 text-white" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-foreground text-sm", children: "Master Deepak" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "ml-2 text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm",
              style: {
                background: "oklch(0.65 0.15 68 / 0.1)",
                color: "oklch(0.65 0.15 68)",
                border: "1px solid oklch(0.65 0.15 68 / 0.25)"
              },
              children: "Admin"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: onLogout,
          className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors duration-200",
          "data-ocid": "admin.logout_button",
          "aria-label": "Logout",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Logout" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-8 border-b border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("today"),
            className: `admin-nav-link text-sm font-medium pb-3 px-3 border-b-2 -mb-px transition-colors duration-200 ${activeTab === "today" ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
            "data-ocid": "admin.today_tab",
            children: "Today's Bookings"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("past"),
            className: `admin-nav-link text-sm font-medium pb-3 px-3 border-b-2 -mb-px transition-colors duration-200 ${activeTab === "past" ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
            "data-ocid": "admin.past_tab",
            children: "Past Bookings"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("future"),
            className: `admin-nav-link text-sm font-medium pb-3 px-3 border-b-2 -mb-px transition-colors duration-200 ${activeTab === "future" ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`,
            "data-ocid": "admin.future_tab",
            children: "Future Bookings"
          }
        )
      ] }),
      activeTab === "today" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "admin.today_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-6 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "Today's Appointments" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
              formatDisplayDate(today)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-semibold",
              style: {
                background: "oklch(0.65 0.15 68 / 0.08)",
                color: "oklch(0.65 0.15 68)",
                border: "1px solid oklch(0.65 0.15 68 / 0.2)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                "Sorted by time"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TodayBookings, {})
      ] }),
      activeTab === "past" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "admin.past_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-6 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "Past Bookings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Filter by date to view appointment history" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: pastDate,
                max: today,
                onChange: (e) => setPastDate(e.target.value),
                className: "w-44 text-sm",
                "data-ocid": "admin.date_picker_input"
              }
            )
          ] })
        ] }),
        pastDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            "Showing results for",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatDisplayDate(pastDate) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-sm shadow-subtle p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PastBookingsTable, { dateStr: pastDate }) })
      ] }),
      activeTab === "future" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "admin.future_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 mb-6 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground", children: "Future Bookings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Upcoming appointments — auto-refreshes every 10 seconds" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "From" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: futureFrom,
                  min: today,
                  onChange: (e) => setFutureFrom(e.target.value),
                  className: "w-40 text-sm",
                  "data-ocid": "admin.future_from_date_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "To" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "date",
                  value: futureTo,
                  min: futureFrom || today,
                  onChange: (e) => setFutureTo(e.target.value),
                  className: "w-40 text-sm",
                  "data-ocid": "admin.future_to_date_input"
                }
              )
            ] }),
            (futureFrom || futureTo) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  setFutureFrom(todayDateStr());
                  setFutureTo("");
                },
                className: "text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors duration-200",
                "data-ocid": "admin.future_clear_filter_button",
                children: "Clear"
              }
            )
          ] })
        ] }),
        (futureFrom || futureTo) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: futureFrom && futureTo ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Showing bookings from",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatDisplayDate(futureFrom) }),
            " ",
            "to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatDisplayDate(futureTo) })
          ] }) : futureFrom ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Showing bookings from",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatDisplayDate(futureFrom) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "Showing bookings up to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatDisplayDate(futureTo) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FutureBookingsList, { fromDate: futureFrom, toDate: futureTo })
      ] })
    ] })
  ] });
}
function Admin() {
  const { isAuthenticated, login, logout } = useAdminAuth();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLogin, { onLogin: login });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, { onLogout: logout });
}
export {
  Admin
};
