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
