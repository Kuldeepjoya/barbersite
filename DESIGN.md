# Design Brief

## Purpose
Professional website for Master Deepak Hair Expert — Indian hair education brand showcasing haircuts, color, chemical treatments, academy courses, and appointment booking. Theatrical, high-energy premium positioning.

## Tone & Differentiation
Bold, dramatic, high-contrast masculine energy with Indian salon authority. Gold accent aggressive on CTAs—creates perceived value and urgency. Deep charcoal base + vibrant gold + red destructive = premium, not corporate. Every structural zone elevated with intentional depth.

## Palette (OKLCH)

| Token | Light | Dark | Purpose |
| --- | --- | --- | --- |
| background | 0.99 0 0 | 0.11 0 0 | Page base, near-black charcoal |
| foreground | 0.15 0 0 | 0.94 0 0 | Body text, maximum contrast |
| card | 0.98 0 0 | 0.155 0 0 | Service/profile cards, elevated |
| primary | 0.25 0 0 | 0.88 0 0 | Secondary interactions |
| accent | 0.72 0.15 53 | 0.72 0.16 54 | CTAs, gold warmth, premium |
| muted | 0.88 0 0 | 0.23 0 0 | Borders, subtle UI |
| destructive | 0.55 0.22 25 | 0.66 0.2 25 | Errors, cancel states, red accent |

## Typography

| Role | Font | Usage | Weight |
| --- | --- | --- | --- |
| Display | Fraunces (serif) | Hero, section titles, taglines | 600–900 |
| Body | Satoshi (sans-serif) | Copy, nav, form labels, descriptions | 400–700 |
| Mono | Geist Mono | Code, technical details, pricing | 400 |

## Structural Zones

- **Header**: `bg-card` with `border-b border-muted/30`, logo + nav in body font, no shadow
- **Hero**: `bg-background` full-width, Fraunces tagline "Cut, Color & Chemical", gold `.btn-primary` CTA, high-contrast white text
- **Services**: `bg-background` with `.card-premium` service cards in grid, gold accent on borders
- **Team**: `bg-muted/5` with barber profile `.card-premium` cards, gold "Book with [Name]" CTAs
- **Gallery**: `bg-background` Instagram-style grid 3–4 columns, minimal spacing
- **YouTube**: `bg-card` section with channel link (external), no embedded feeds
- **Academy**: `bg-muted/5` courses grid with pricing, `.btn-primary` enrollment CTAs
- **Contact**: `bg-card` form section, inputs `bg-muted/40` with `border-accent/20`
- **Footer**: `bg-card` with `border-t border-muted/30`, hours, address, social links

## Spacing & Rhythm
- Section padding: 4.5rem vertical, 2rem horizontal (mobile: 2.5rem / 1.5rem)
- Card gap: 1.5rem between grid items
- Text spacing: 1.6 line-height for body, 1.2 for headings

## Component Patterns

| Pattern | Treatment |
| --- | --- |
| Primary CTA | `.btn-primary` — gold bg, bold uppercase, hover:brightness-125 |
| Gold badge | `.badge-gold` — subtle gold bg/text, accent label |
| Premium card | `.card-premium` — elevated shadow, gold border accent on hover |
| Input | `bg-muted/40 border border-accent/20 rounded px-4 py-2 focus:border-accent` |
| Link | `text-accent hover:underline` |

## Motion
- Transitions: `.transition-smooth` (0.3s cubic-bezier)
- Button press: active:scale-95 for tactile feedback
- Card hover: border-accent/40 + shadow-gold-sm for premium lift
- No animation—professional restraint

## Constraints
- Gold accent **only** on CTAs, interactive states, and premium badges—establishes action hierarchy
- No decorative gradients or blur—premium minimalism
- Dark theme mandatory (brand assertion)
- Type scale: 12px, 14px, 16px, 18px, 24px, 32px, 48px, 64px
- Satoshi replaces General Sans for warmer, friendlier body text

## Signature Detail
Deep charcoal + vibrant gold + high-contrast white = theatrical luxury barber energy. Every CTA burns. Gold glow on cards creates premium aura without gimmickry.

---

# Admin Dashboard Design

## Purpose
Internal management interface for admin (owner) to view bookings, toggle payment status, track customer details, prevent double bookings, and manage booking reference codes. Accessible via secret URL only.

## Tone & Differentiation
Data-focused, minimal decoration. Inherits premium salon aesthetic but prioritizes information clarity and rapid admin workflows. No theatrical elements—pure function within trusted brand context.

## Palette (inherited from main site)
Reuses all existing OKLCH tokens: warm off-white background, deep charcoal foreground, gold accent, destructive red. No new colors.

## Typography
- Display: Fraunces (section titles, dashboard header)
- Body: Satoshi (labels, customer info, descriptions)
- Mono: Geist Mono (booking reference codes for copyability)

## Structural Zones (Admin Dashboard)

| Zone | Styling | Purpose |
| --- | --- | --- |
| Sidebar | `bg-sidebar` white, `border-r border-sidebar-border`, nav links with gold active state | Navigation: Today, Past, Payment tracking, Logout |
| Header | `bg-card border-b`, admin email display, logout button | Quick navigation and session status |
| Today's Bookings | `bg-background` with `.admin-booking-card` grid (2–3 cols), sorted by time | Primary workflow—all today's appointments |
| Booking Card | `.admin-booking-card` with customer name, email, contact, time, reference code (mono), payment toggle | Single appointment data + quick actions |
| Payment Toggle | Simple checkbox input, `.admin-toggle-paid`, paired with `.admin-status-badge` (paid/unpaid visual) | Quick paid/unpaid switching without form |
| Reference Code | `.admin-reference-code` monospace display, easily copyable | Unique identifier per booking |
| Past Bookings | Secondary section with date range filter, expandable list or table view | Historical data retrieval by date |
| Footer | Minimal text-only, copyright | Internal tool—no social links |

## Component Patterns

| Pattern | Treatment |
| --- | --- |
| Sidebar nav link | Satoshi body, gray hover state, gold underline + bold on active |
| Booking card | White card, subtle shadow, time + name + email + contact + reference code + toggle |
| Payment toggle | Checkbox with accent color, paired badge (green "Paid" / red "Unpaid") |
| Reference code | Geist Mono `text-xs`, muted gray bg, rounded px, easily distinguishable |
| Filter button | `.btn-secondary` style for past bookings date range |
| Date input | `bg-muted/40 border border-accent/20`, inherit from main site form styling |

## Information Density
- No whitespace waste; compact but readable layout
- Card-based today's bookings (visual chunking)
- Table view for past bookings (high information density)
- Status badges (color + text for redundancy)

## Motion
- Transitions: `.transition-smooth` (0.3s) on all interactive elements
- Card hover: subtle shadow elevation
- Toggle interaction: immediate visual feedback (checkbox checked state)
- No animations—professional, data-focused environment

## Constraints
- Gold accent **only** on navigation active state, payment status, and CTA buttons—maintains main site consistency
- Sidebar navigation always visible on desktop, collapsed on mobile
- Booking reference codes never editable by admin (generated server-side)
- Double-booking prevention: system prevents same time slot from being booked twice
- Payment status: simple toggle (no amount or date entry per user preference)
- Customer confirmation: booking reference code shown in confirmation message post-booking
