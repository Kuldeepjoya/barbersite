import { r as reactExports, j as jsxRuntimeExports, R as React } from "./index-hUMo4Dx_.js";
import { L as Layout, m as motion } from "./proxy-B0G_686g.js";
import { c as clsx, a as cn, u as useQuery, m as mockBackend, b as useMutation, I as Input, C as Clock } from "./backend-DkdzDOtH.js";
import { c as createLucideIcon, S as Scissors } from "./scissors-nS2oxIpE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = React[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = /* @__PURE__ */ createSlot(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
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
function useConfirmBookingAfterPayment(stripeSessionId) {
  return useQuery({
    queryKey: ["confirm-booking", stripeSessionId],
    queryFn: async () => {
      if (!stripeSessionId) throw new Error("No session ID provided");
      const result = await mockBackend.confirmBookingAfterPayment(stripeSessionId);
      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }
      return fromBackend(result.ok);
    },
    enabled: !!stripeSessionId,
    retry: false
  });
}
function useCreateStripeCheckoutSession() {
  return useMutation({
    mutationFn: async (req) => {
      const result = await mockBackend.createStripeCheckoutSession({
        customerName: req.customerName,
        customerEmail: req.customerEmail,
        customerPhone: req.customerPhone,
        serviceIds: req.serviceIds.map((id) => BigInt(id)),
        teamMemberId: req.teamMemberId != null ? BigInt(req.teamMemberId) : void 0,
        preferredDateTime: req.preferredDateTime,
        successUrl: req.successUrl,
        cancelUrl: req.cancelUrl
      });
      if (result.__kind__ === "err") {
        throw new Error(result.err);
      }
      return {
        sessionId: result.ok.sessionId,
        checkoutUrl: result.ok.checkoutUrl
      };
    }
  });
}
const MASTER_DEEPAK_SERVICES = [
  {
    id: 1,
    name: "Butterfly Haircut",
    description: "Master Deepak's signature layered butterfly cut — featherlight layers that frame the face with dramatic flair. A showstopper transformation.",
    price: 1500,
    durationMinutes: 60,
    category: "haircut"
  },
  {
    id: 2,
    name: "Signature Haircut",
    description: "The original Master Deepak signature — precision scissor work crafted for your bone structure. A cut that speaks confidence.",
    price: 1200,
    durationMinutes: 50,
    category: "haircut"
  },
  {
    id: 3,
    name: "Wolf Haircut",
    description: "Edgy textured wolf cut with layered volume and lived-in movement. Perfect for bold personalities who own every room.",
    price: 1400,
    durationMinutes: 55,
    category: "haircut"
  },
  {
    id: 4,
    name: "Round Layers",
    description: "Soft, bouncy round layers that add body and movement. Timeless elegance meets modern technique.",
    price: 1100,
    durationMinutes: 50,
    category: "haircut"
  },
  {
    id: 5,
    name: "Rhombus Cut",
    description: "The innovative rhombus cut — geometric precision and artistic shaping unique to Master Scissor Academy's curriculum.",
    price: 1800,
    durationMinutes: 65,
    category: "haircut"
  },
  {
    id: 6,
    name: "Advanced Hair Color",
    description: "Balayage, highlights, ombre, and vivid color transformations. Ammonia-free options available. Results that stop traffic.",
    price: 3500,
    durationMinutes: 120,
    category: "combo"
  },
  {
    id: 7,
    name: "Chemical Treatments",
    description: "Keratin smoothing, rebonding, and protein treatments for salon-glossy hair that lasts months. Approved professional products only.",
    price: 4e3,
    durationMinutes: 150,
    category: "combo"
  }
];
function useServices(category) {
  return useQuery({
    queryKey: ["services", category],
    queryFn: async () => {
      return MASTER_DEEPAK_SERVICES;
    },
    staleTime: 1e3 * 60 * 5
  });
}
const STATIC_TEAM = [
  {
    id: 1,
    name: "Marcus Webb",
    specialty: "Skin fades, textured crops, and modern styling"
  },
  {
    id: 2,
    name: "Dario Reyes",
    specialty: "Classic cuts, hot towel shaves, beard sculpting"
  },
  {
    id: 3,
    name: "Theo Okafor",
    specialty: "Afro textures, waves, creative designs"
  },
  {
    id: 4,
    name: "James Calloway",
    specialty: "Precision tapers, pompadours, vintage styles"
  }
];
function useTeamMembers() {
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      return STATIC_TEAM;
    },
    staleTime: 1e3 * 60 * 10
  });
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validate(fields, selectedServiceIds) {
  const errors = {};
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
function FieldError({ message }) {
  if (!message) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "alert", className: "text-sm mt-1.5 text-destructive font-medium", children: message });
}
function SectionHeading({
  step,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-base font-semibold text-accent uppercase tracking-widest pb-3 border-b border-border flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-accent/15 border border-accent/30 inline-flex items-center justify-center text-[10px] font-black", children: step }),
    children
  ] }) });
}
function nowLocalStr() {
  const now = /* @__PURE__ */ new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${date}T${hours}:${minutes}`;
}
function getSessionIdFromUrl() {
  return new URLSearchParams(window.location.search).get("session_id");
}
function isCancelledFromUrl() {
  return new URLSearchParams(window.location.search).get("cancelled") === "true";
}
function clearUrlParams() {
  const url = new URL(window.location.href);
  url.search = "";
  window.history.replaceState({}, "", url.toString());
}
function SuccessScreen({
  referenceCode,
  customerName,
  preferredDateTime,
  serviceNames,
  totalAmount,
  onBookAnother
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-24 pb-20 min-h-screen flex items-center justify-center bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 pointer-events-none overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-5",
        style: {
          background: "radial-gradient(ellipse, oklch(0.74 0.14 68), transparent 70%)"
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        className: "max-w-lg w-full mx-auto px-6 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full flex items-center justify-center bg-accent/10 border border-accent/30 shadow-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-11 h-11 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 w-7 h-7 rounded-full bg-destructive flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-destructive-foreground" }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "badge-gold mb-4 mx-auto w-fit", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-3 h-3" }),
            " Booking Confirmed"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight", children: [
            "You're All ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "Set!" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8 leading-relaxed", children: "Payment received. Your appointment with Master Deepak is confirmed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-premium mb-8 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.2em] text-accent font-bold mb-1", children: "Booking Reference" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "font-display text-4xl font-bold mb-1 text-gradient-gold",
                "data-ocid": "booking.success.ref",
                children: referenceCode
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5", children: "Save this code — you can use it to track or verify your booking with us at any time." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 border-b border-border/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: customerName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 border-b border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Services" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right space-y-0.5", children: serviceNames.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "text-foreground font-semibold text-xs",
                    children: name
                  },
                  name
                )) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 border-b border-border/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Date & Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: preferredDateTime ? new Date(preferredDateTime).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short"
                }) : "" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2 border-b border-border/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total Paid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent font-bold", children: [
                  "₹",
                  totalAmount.toLocaleString("en-IN")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Payment Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-bold uppercase tracking-wider text-xs", children: "✓ Paid" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                className: "btn-cta",
                onClick: onBookAnother,
                "data-ocid": "booking.book-another.button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-4 h-4" }),
                  "Book Another"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "https://wa.me/918828104056",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "btn-secondary",
                children: "WhatsApp Us"
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Booking() {
  var _a, _b;
  const { data: services = [], isLoading: loadingServices } = useServices();
  const { data: team = [], isLoading: loadingTeam } = useTeamMembers();
  const checkoutMutation = useCreateStripeCheckoutSession();
  const [sessionId] = reactExports.useState(getSessionIdFromUrl);
  const [wasCancelled] = reactExports.useState(isCancelledFromUrl);
  const confirmQuery = useConfirmBookingAfterPayment(sessionId);
  const [form, setForm] = reactExports.useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    teamMemberId: "",
    preferredDateTime: ""
  });
  const [selectedServiceIds, setSelectedServiceIds] = reactExports.useState([]);
  const [touched, setTouched] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (sessionId || wasCancelled) clearUrlParams();
  }, [sessionId, wasCancelled]);
  const errors = validate(form, selectedServiceIds);
  const hasErrors = Object.keys(errors).length > 0;
  const isFormValid = selectedServiceIds.length > 0 && form.customerName.trim() !== "" && form.customerEmail.trim() !== "" && EMAIL_RE.test(form.customerEmail) && form.customerPhone.trim() !== "" && form.preferredDateTime.trim() !== "";
  const total = reactExports.useMemo(() => {
    return selectedServiceIds.reduce((sum, id) => {
      const svc = services.find((s) => s.id === id);
      return sum + ((svc == null ? void 0 : svc.price) ?? 0);
    }, 0);
  }, [selectedServiceIds, services]);
  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }
  function toggleService(id) {
    setSelectedServiceIds(
      (prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setTouched((prev) => ({ ...prev, services: true }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({
      customerName: true,
      customerEmail: true,
      customerPhone: true,
      services: true,
      preferredDateTime: true
    });
    if (hasErrors) return;
    const req = {
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      customerPhone: form.customerPhone,
      serviceIds: selectedServiceIds,
      teamMemberId: form.teamMemberId ? Number(form.teamMemberId) : null,
      preferredDateTime: form.preferredDateTime,
      successUrl: `${window.location.origin}/booking`,
      cancelUrl: `${window.location.origin}/booking?cancelled=true`
    };
    try {
      const result = await checkoutMutation.mutateAsync(req);
      window.location.href = result.checkoutUrl;
    } catch {
    }
  }
  function resetForm() {
    setForm({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      teamMemberId: "",
      preferredDateTime: ""
    });
    setSelectedServiceIds([]);
    setTouched({});
    checkoutMutation.reset();
  }
  if (sessionId) {
    if (confirmQuery.isLoading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "min-h-screen flex items-center justify-center bg-background",
          "data-ocid": "booking.confirm.loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-10 h-10 animate-spin text-accent mx-auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Confirming your payment…" })
          ] })
        }
      ) });
    }
    if (confirmQuery.isError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "min-h-screen flex items-center justify-center bg-background",
          "data-ocid": "booking.confirm.error_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto px-6 text-center space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-14 h-14 text-destructive mx-auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: "Confirmation Failed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: ((_a = confirmQuery.error) == null ? void 0 : _a.message) ?? "We couldn't confirm your booking. Please contact us via WhatsApp." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "btn-cta",
                  onClick: resetForm,
                  "data-ocid": "booking.retry.button",
                  children: "Try Again"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "https://wa.me/918058564056",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "btn-secondary",
                  children: "WhatsApp Support"
                }
              )
            ] })
          ] })
        }
      ) });
    }
    if (confirmQuery.data) {
      const booking = confirmQuery.data;
      const serviceNames = booking.serviceIds.map(
        (id) => {
          var _a2;
          return ((_a2 = services.find((s) => s.id === id)) == null ? void 0 : _a2.name) ?? `Service #${id}`;
        }
      ).filter(Boolean);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SuccessScreen,
        {
          referenceCode: booking.referenceCode,
          customerName: booking.customerName,
          preferredDateTime: booking.preferredDateTime,
          serviceNames,
          totalAmount: booking.totalAmount,
          onBookAnother: resetForm
        }
      ) });
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-24 pb-14 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 opacity-[0.03]",
            style: {
              backgroundImage: "repeating-linear-gradient(45deg, oklch(0.74 0.14 68) 0, oklch(0.74 0.14 68) 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 right-0 w-[500px] h-[400px] opacity-10",
            style: {
              background: "radial-gradient(ellipse at top right, oklch(0.74 0.14 68), transparent 60%)"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative max-w-2xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "badge-gold mb-5 mx-auto w-fit", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-3 h-3" }),
              " Master Deepak Hair Expert"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl font-black text-foreground leading-none tracking-tight mb-4", children: [
              "Book Your",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-gold", children: "Appointment" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-md mx-auto leading-relaxed", children: "Reserve your session at Andheri West, Mumbai or Bhilwara, Rajasthan — premium cuts, colors & chemical treatments." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-6 mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divider-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-accent shrink-0" }) }) }),
    wasCancelled && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        className: "max-w-xl mx-auto px-6 mb-6",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 rounded-md px-4 py-3 bg-muted border border-border text-sm text-muted-foreground",
            "data-ocid": "booking.cancelled.notice",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Payment was cancelled. Your time slot is still open — fill in the form below to try again." })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay: 0.15 },
        className: "max-w-xl mx-auto px-6 pb-20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-sm border border-border bg-card shadow-elevated overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/8 border-b border-border px-8 py-4 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scissors, { className: "w-4 h-4 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-widest font-semibold", children: "Fill in your details" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground font-semibold text-sm", children: "Appointment Request Form" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                noValidate: true,
                className: "px-8 py-8 space-y-8",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { step: 1, children: "Your Details" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Label,
                          {
                            htmlFor: "customerName",
                            className: "text-foreground font-semibold text-sm mb-2 block",
                            children: [
                              "Full Name ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "*" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "customerName",
                            type: "text",
                            placeholder: "Your full name",
                            value: form.customerName,
                            onChange: (e) => handleChange("customerName", e.target.value),
                            onBlur: () => handleBlur("customerName"),
                            "data-ocid": "booking.name.input",
                            "aria-invalid": touched.customerName && !!errors.customerName,
                            className: "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-accent h-11"
                          }
                        ),
                        touched.customerName && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.customerName })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Label,
                          {
                            htmlFor: "customerEmail",
                            className: "text-foreground font-semibold text-sm mb-2 block",
                            children: [
                              "Email Address ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "*" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "customerEmail",
                            type: "email",
                            placeholder: "your@email.com",
                            value: form.customerEmail,
                            onChange: (e) => handleChange("customerEmail", e.target.value),
                            onBlur: () => handleBlur("customerEmail"),
                            "data-ocid": "booking.email.input",
                            "aria-invalid": touched.customerEmail && !!errors.customerEmail,
                            className: "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-accent h-11"
                          }
                        ),
                        touched.customerEmail && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.customerEmail })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Label,
                          {
                            htmlFor: "customerPhone",
                            className: "text-foreground font-semibold text-sm mb-2 block",
                            children: [
                              "Phone Number ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "*" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "customerPhone",
                            type: "tel",
                            placeholder: "+91 98765 43210",
                            value: form.customerPhone,
                            onChange: (e) => handleChange("customerPhone", e.target.value),
                            onBlur: () => handleBlur("customerPhone"),
                            "data-ocid": "booking.phone.input",
                            "aria-invalid": touched.customerPhone && !!errors.customerPhone,
                            className: "bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-accent h-11"
                          }
                        ),
                        touched.customerPhone && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.customerPhone })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { step: 2, children: "Services & Barber" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground font-semibold text-sm mb-3", children: [
                          "Select Services ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "*" }),
                          " ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal text-xs ml-1", children: "(choose one or more)" })
                        ] }),
                        loadingServices ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "space-y-2",
                            "data-ocid": "booking.services.loading_state",
                            children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "div",
                              {
                                className: "h-14 rounded-md bg-muted animate-pulse"
                              },
                              i
                            ))
                          }
                        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "fieldset",
                          {
                            className: "space-y-2 border-0 p-0 m-0",
                            "data-ocid": "booking.services.list",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Select services" }),
                              services.map((service, idx) => {
                                const checked = selectedServiceIds.includes(
                                  service.id
                                );
                                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "label",
                                  {
                                    htmlFor: `service-${service.id}`,
                                    "data-ocid": `booking.services.item.${idx + 1}`,
                                    className: [
                                      "flex items-center gap-3 px-4 py-3 rounded-md border cursor-pointer transition-smooth select-none",
                                      checked ? "border-accent/60 bg-accent/8 shadow-sm" : "border-border bg-background hover:border-accent/30 hover:bg-accent/4"
                                    ].join(" "),
                                    children: [
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "input",
                                        {
                                          id: `service-${service.id}`,
                                          type: "checkbox",
                                          checked,
                                          onChange: () => toggleService(service.id),
                                          className: "sr-only"
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                                        "div",
                                        {
                                          className: [
                                            "w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-smooth",
                                            checked ? "bg-accent border-accent" : "border-input bg-background"
                                          ].join(" "),
                                          "aria-hidden": "true",
                                          children: checked && /* @__PURE__ */ jsxRuntimeExports.jsx(
                                            "svg",
                                            {
                                              "aria-hidden": "true",
                                              className: "w-3 h-3 text-accent-foreground",
                                              viewBox: "0 0 12 12",
                                              fill: "none",
                                              stroke: "currentColor",
                                              strokeWidth: "2",
                                              strokeLinecap: "round",
                                              strokeLinejoin: "round",
                                              children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "1.5,6 4.5,9 10.5,3" })
                                            }
                                          )
                                        }
                                      ),
                                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                                            "span",
                                            {
                                              className: [
                                                "text-sm font-semibold truncate",
                                                checked ? "text-foreground" : "text-foreground/80"
                                              ].join(" "),
                                              children: service.name
                                            }
                                          ),
                                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                            "span",
                                            {
                                              className: [
                                                "text-sm font-bold shrink-0",
                                                checked ? "text-accent" : "text-muted-foreground"
                                              ].join(" "),
                                              children: [
                                                "₹",
                                                service.price.toLocaleString("en-IN")
                                              ]
                                            }
                                          )
                                        ] }),
                                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [
                                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-muted-foreground shrink-0" }),
                                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground truncate", children: [
                                            service.durationMinutes,
                                            " min"
                                          ] })
                                        ] })
                                      ] })
                                    ]
                                  },
                                  service.id
                                );
                              })
                            ]
                          }
                        ),
                        touched.services && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.services }),
                        selectedServiceIds.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.div,
                          {
                            initial: { opacity: 0, y: -6 },
                            animate: { opacity: 1, y: 0 },
                            className: "mt-4 px-4 py-3 rounded-md bg-accent/8 border border-accent/30 flex items-center justify-between",
                            "data-ocid": "booking.total.panel",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
                                selectedServiceIds.length,
                                " service",
                                selectedServiceIds.length > 1 ? "s" : "",
                                " selected"
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-lg text-accent", children: [
                                "Total: ₹",
                                total.toLocaleString("en-IN")
                              ] })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Label,
                          {
                            htmlFor: "teamMemberId",
                            className: "text-foreground font-semibold text-sm mb-2 block",
                            children: [
                              "Preferred Barber",
                              " ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "select",
                            {
                              id: "teamMemberId",
                              value: form.teamMemberId,
                              onChange: (e) => handleChange("teamMemberId", e.target.value),
                              "data-ocid": "booking.barber.select",
                              disabled: loadingTeam,
                              className: "w-full h-11 rounded-md pl-3 pr-10 text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-smooth disabled:opacity-50 disabled:cursor-not-allowed bg-background border border-input",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", className: "bg-card text-foreground", children: loadingTeam ? "Loading barbers…" : "No preference — any barber" }),
                                team.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "option",
                                  {
                                    value: m.id,
                                    className: "bg-card text-foreground",
                                    children: m.name
                                  },
                                  m.id
                                ))
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" })
                        ] })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { step: 3, children: "Date & Time" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Label,
                        {
                          htmlFor: "preferredDateTime",
                          className: "text-foreground font-semibold text-sm mb-2 block",
                          children: [
                            "Preferred Date & Time",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "preferredDateTime",
                          type: "datetime-local",
                          value: form.preferredDateTime,
                          min: nowLocalStr(),
                          onChange: (e) => handleChange("preferredDateTime", e.target.value),
                          onBlur: () => handleBlur("preferredDateTime"),
                          "data-ocid": "booking.datetime.input",
                          "aria-invalid": touched.preferredDateTime && !!errors.preferredDateTime,
                          className: "bg-background border-border text-foreground focus-visible:ring-accent h-11 [color-scheme:light]"
                        }
                      ),
                      touched.preferredDateTime && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { message: errors.preferredDateTime }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "Available: Mon–Sat, 10am–7pm IST · Mumbai & Bhilwara locations" })
                    ] })
                  ] }),
                  checkoutMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "rounded-md px-4 py-3 text-sm bg-destructive/10 border border-destructive/40 text-destructive font-medium",
                      role: "alert",
                      "data-ocid": "booking.submit.error_state",
                      children: ((_b = checkoutMutation.error) == null ? void 0 : _b.message) ?? "Something went wrong. Please try again or WhatsApp us at +91-8058564056."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        disabled: checkoutMutation.isPending || !isFormValid,
                        "data-ocid": "booking.submit.primary_button",
                        className: "btn-cta w-full h-12",
                        children: checkoutMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                          "Redirecting to payment…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                          "Proceed to Payment",
                          total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 opacity-80", children: [
                            "· ₹",
                            total.toLocaleString("en-IN")
                          ] })
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-3", children: "You'll be taken to Stripe's secure payment page to complete your booking." })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-5 rounded-sm border border-border bg-card/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-center sm:text-left", children: "Prefer to book directly?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "tel:+918828104056",
                  className: "btn-secondary py-2 px-5 text-xs",
                  "data-ocid": "booking.call.button",
                  children: "📞 Call Mumbai"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "https://wa.me/918058564056",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "btn-primary py-2 px-5 text-xs",
                  "data-ocid": "booking.whatsapp.button",
                  children: "💬 WhatsApp"
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  Booking
};
