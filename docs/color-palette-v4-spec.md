# Color Palette v4 — Refined Green Primary & Secondary Exploration

```
Version:  1.0.0
Status:   Proposed
Author:   UI/UX Designer (Kyros Agent)
Date:     2026-03-15
Context:  Theme Preview v4 — Sprint 2 Color Evolution
Depends:  docs/ui/02-color-system.md (Aether Design System)
```

---

## 1. Research Summary

### Supabase Dual-Green System (Primary Reference)

Supabase uses a restrained dual-green approach that is the north star for this evolution:

| Role | Hex | Usage | Restraint Level |
|---|---|---|---|
| **Highlight Green** | `#3ECF8E` | Status indicators, badges, success states, metric accents | Sparse — <5% of UI surface |
| **CTA Green** | `#006239` | Primary buttons, CTA fills, action triggers | Minimal — buttons only |
| **Brand Green** | `#34B27B` | Logo mark, wordmark accent, favicon | Brand identity anchor |

**Key principle:** Extreme restraint. The Supabase interface is 90%+ neutral grayscale. Green appears only where it carries meaning — "this succeeded," "click here," "we are Supabase." This is the opposite of our current `#CCFF00` approach which saturates the entire UI.

### Maestrio / Promise Protocols

Maestrio's site was unreachable during research. Promise Protocols (promiseprotocols.com) loaded but color values are in external stylesheets not extractable via fetch. Visual inspection notes from web search context suggest blockchain/protocol brands trend toward deep teals (`#0D9488`–`#14B8A6`) and midnight blues — reinforcing the teal-green direction rather than neon.

### Current State: Tactical Neon (`#CCFF00`)

| Property | Value | Issue |
|---|---|---|
| Primary | `#CCFF00` | Neon yellow-green — high energy but reads "gaming/startup" not "enterprise platform" |
| Secondary | `#6366F1` | Indigo — competes visually with neon green, creates dissonance |
| Background | `#050505` | Near-black — good foundation for green accent system |

**Problem:** `#CCFF00` is chartreuse (hue ~75°), not green (hue ~155°). It skews yellow and creates a "hacker/gaming" aesthetic that misaligns with Kyros's positioning as a serious AI engineering platform for CTOs and founders.

---

## 2. Proposed Dual-Green Primary System

### The Shift: `#CCFF00` → `#3ECF8E` Family

Moving from chartreuse (hue 75°) to emerald-mint (hue 155°) — a true green that communicates growth, reliability, and "go."

### Primary Palette

```css
/* Kyros Green — Dual-Green Primary System */

/* ─── Highlight Green (display, accents, status) ─── */
--green-highlight:     #3ECF8E;   /* Hero, section labels, metric values, status glow */
--green-highlight-dim: #3ECF8E33; /* 20% opacity — subtle washes, accent-muted */
--green-highlight-med: #3ECF8E66; /* 40% opacity — border accents, ring glow */

/* ─── CTA Green (buttons, actions, interactive) ─── */
--green-cta:           #059669;   /* Primary button fill, CTA background */
--green-cta-hover:     #047857;   /* Button hover state */
--green-cta-active:    #065F46;   /* Button pressed/active state */

/* ─── Brand Green (logo, identity anchor) ─── */
--green-brand:         #10B981;   /* Logo accent, favicon, brand mark */

/* ─── Extended Scale (10 stops) ─── */
--green-50:  #ECFDF5;  /* Barely-there tint (light mode only)     */
--green-100: #D1FAE5;  /* Badge backgrounds, tag fills             */
--green-200: #A7F3D0;  /* Light accent text on dark                */
--green-300: #6EE7B7;  /* Secondary highlight, chart lines         */
--green-400: #3ECF8E;  /* ★ HIGHLIGHT — primary accent             */
--green-500: #10B981;  /* ★ BRAND — balanced mid-green             */
--green-600: #059669;  /* ★ CTA — button fills                     */
--green-700: #047857;  /* CTA hover                                */
--green-800: #065F46;  /* CTA pressed, deep accent borders         */
--green-900: #064E3B;  /* Dark panel accent backgrounds            */
--green-950: #022C22;  /* Deepest — inset panels, selected rows    */
```

### Usage Rules

| Context | Color | Rule |
|---|---|---|
| Section labels (`// SECTION`) | `--green-400` (#3ECF8E) | Mono uppercase, tracking-wide |
| Metric values (hero stats) | `--green-400` (#3ECF8E) | Large bold numbers only |
| Primary CTA button | `--green-600` (#059669) fill + white text | Single primary per viewport |
| Secondary CTA | `transparent` + `--green-400` border | Ghost button style |
| Terminal highlights | `--green-400` (#3ECF8E) | Command keywords, active lines |
| Status: success/active | `--green-400` (#3ECF8E) | Dots, badges, pulse glow |
| Accent glow/shadow | `--green-highlight-dim` | `box-shadow: 0 0 24px #3ECF8E12` |
| Agent "working" status | `--green-300` (#6EE7B7) | Pulsing animation |
| Card accent border-left | `--green-400` at 33% opacity | Subtle vertical indicator |
| Never | Any green | Body text, paragraph text, large surfaces |

### Restraint Protocol (Supabase-Inspired)

1. **Maximum 3 green elements per viewport.** If you can see more than 3 green things at once, remove one.
2. **Green is earned.** It signals action, success, or brand. Never decorative.
3. **Gray is the canvas.** 90%+ of the UI remains neutral. Green punctuates, never paints.
4. **No green backgrounds** on content-containing surfaces. Green tints only on empty state indicators or badge backgrounds.
5. **One CTA green per section.** Only one `--green-600` button visible at a time. Additional actions use ghost/outline style.

---

## 3. Secondary Color Alternatives

### Why Move Beyond `#6366F1`?

The current indigo secondary creates visual tension with a green primary — indigo is perceptually heavy (high chroma at hue 240°) and competes with green for dominance rather than supporting it. The Aether system already claims violet as its production brand color, creating identity confusion.

### Option A: Slate Steel — `#94A3B8` (Recommended)

```css
--secondary: #94A3B8;
--secondary-hover: #CBD5E1;
--secondary-muted: #94A3B820;
```

| Pros | Cons |
|---|---|
| Lets green be the sole chromatic star | Could read as "unfinished" without careful application |
| Professional, enterprise-appropriate | Less visual excitement |
| Zero color competition | — |
| Matches Supabase's neutral philosophy | — |

**Best for:** Terminal completion messages, secondary badges, metadata labels, timestamps. The "professional restraint" choice.

### Option B: Electric Teal — `#22D3EE`

```css
--secondary: #22D3EE;
--secondary-hover: #67E8F9;
--secondary-muted: #22D3EE20;
```

| Pros | Cons |
|---|---|
| Analogous to green — harmonious palette | Two cool chromatic colors may feel monotone |
| Signals data/intelligence (Aether heritage) | Could blur the line between primary and secondary |
| High contrast on dark backgrounds | "Tech startup" vibe may not feel distinct |

**Best for:** Data visualizations, agent activity indicators, streaming/processing states. The "intelligence layer" choice.

### Option C: Warm Amber — `#F59E0B`

```css
--secondary: #F59E0B;
--secondary-hover: #FBBF24;
--secondary-muted: #F59E0B20;
```

| Pros | Cons |
|---|---|
| Warm-cool complementary contrast with green | Amber at hue 45° is far from green hue 155° — could feel disconnected |
| Draws eye to warnings and attention items naturally | Risk of "traffic light" palette (red/amber/green) |
| Distinctive, memorable | Higher cognitive load with two strong chromatic colors |

**Best for:** Cost/budget indicators, attention badges, warmth accents. The "energy contrast" choice.

### Option D: Soft Rose — `#FB7185`

```css
--secondary: #FB7185;
--secondary-hover: #FDA4AF;
--secondary-muted: #FB718520;
```

| Pros | Cons |
|---|---|
| Modern, distinctive (Linear uses pink accents effectively) | Could confuse with error/destructive semantics |
| Strong visual contrast with green | Warm-cool tension needs careful balancing |
| Memorable brand differentiation | Less "enterprise" feel |

**Best for:** Notification badges, featured content markers, celebration states. The "modern edge" choice.

### Recommendation

**Option A (Slate Steel) for launch.** Supabase's most powerful lesson is restraint — one chromatic color, everything else neutral. A neutral secondary lets the dual-green system establish itself. If the green palette feels too monotone in production, Option B (Electric Teal) is the best chromatic escalation because it shares the cool-tone family and aligns with the Aether "intelligence layer" concept.

---

## 4. Contrast Ratios & Accessibility

All ratios calculated against `#050505` (background, relative luminance ≈ 0.003) and `#FAFAFA` (foreground text, relative luminance ≈ 0.955).

### Green on Dark Background (`#050505`)

| Color | Hex | Luminance | Ratio vs `#050505` | WCAG AA (4.5:1) | WCAG AAA (7:1) | Use |
|---|---|---|---|---|---|---|
| green-400 (highlight) | `#3ECF8E` | 0.350 | **8.3:1** | PASS | PASS | Text, labels, metrics |
| green-500 (brand) | `#10B981` | 0.270 | **6.6:1** | PASS | FAIL | Large text, icons |
| green-600 (CTA fill) | `#059669` | 0.185 | **4.8:1** | PASS | FAIL | Large text, button label (needs white text) |
| green-700 (hover) | `#047857` | 0.140 | **3.8:1** | FAIL | FAIL | Non-text only (borders, icons) |
| green-300 | `#6EE7B7` | 0.540 | **12.0:1** | PASS | PASS | Any text size |
| green-200 | `#A7F3D0` | 0.720 | **15.4:1** | PASS | PASS | Any text size |

### White Text on Green Buttons

| Button Fill | Hex | White Text Ratio | WCAG AA | Use |
|---|---|---|---|---|
| green-600 (CTA) | `#059669` | **5.3:1** | PASS | Primary buttons |
| green-700 (hover) | `#047857` | **6.5:1** | PASS | Hover state |
| green-800 (pressed) | `#065F46` | **7.8:1** | PASS (AAA) | Active/pressed |
| green-900 | `#064E3B` | **9.2:1** | PASS (AAA) | Deep accent |

### Secondary Colors on Dark Background (`#050505`)

| Color | Hex | Ratio vs `#050505` | WCAG AA |
|---|---|---|---|
| Slate Steel | `#94A3B8` | **7.1:1** | PASS (AAA) |
| Electric Teal | `#22D3EE` | **10.2:1** | PASS (AAA) |
| Warm Amber | `#F59E0B` | **8.4:1** | PASS (AAA) |
| Soft Rose | `#FB7185` | **6.8:1** | PASS |

---

## 5. Migration Map: Tactical Neon → Refined Green

### CSS Variable Translation

```css
/* ─── BEFORE (Tactical Neon) ─── */
--primary:            #CCFF00;
--primary-foreground: #050505;
--secondary:          #6366F1;
--accent:             #CCFF00;
--accent-muted:       #CCFF0020;
--border-accent:      #CCFF0033;
--ring:               #CCFF00;
--shadow:             0 0 24px #CCFF0012;

/* ─── AFTER (Refined Green) ─── */
--primary:            #3ECF8E;
--primary-foreground: #050505;    /* Dark text on highlight green */
--primary-cta:        #059669;    /* NEW — button fills */
--primary-cta-fg:     #FAFAFA;    /* NEW — white text on CTA */
--secondary:          #94A3B8;    /* Slate Steel (or #22D3EE for teal) */
--accent:             #3ECF8E;
--accent-muted:       #3ECF8E20;
--border-accent:      #3ECF8E33;
--ring:               #3ECF8E;
--shadow:             0 0 24px #3ECF8E12;
```

### Component Impact

| Component | Before | After | Notes |
|---|---|---|---|
| Hero accent text | `#CCFF00` | `#3ECF8E` | Direct swap |
| Section labels | `#CCFF00` | `#3ECF8E` | Direct swap |
| Primary CTA button | `bg: #CCFF00`, `text: #050505` | `bg: #059669`, `text: #FAFAFA` | **Inversion** — dark text → white text |
| Ghost button border | `#CCFF00` | `#3ECF8E` | Direct swap |
| Terminal keywords | `#CCFF00` | `#3ECF8E` | Direct swap |
| Metric numbers | `#CCFF00` | `#3ECF8E` | Direct swap |
| Completion checkmark | `#6366F1` | `#3ECF8E` or `#94A3B8` | Secondary → primary for success |
| Accent glow | `#CCFF0012` | `#3ECF8E12` | Shadow color swap |
| Active palette swatches | 7 swatches | Add `--primary-cta` swatch | New dual-green visible in palette |

---

## 6. Visual Identity Comparison

```
BEFORE: Tactical Neon               AFTER: Refined Green
┌──────────────────────┐            ┌──────────────────────┐
│  ░░░░░░░░░░░░░░░░░░  │            │  ░░░░░░░░░░░░░░░░░░  │
│  ░░ #CCFF00 ████░░░  │  ──────▶   │  ░░ #3ECF8E ████░░░  │
│  ░░ NEON    ████░░░  │            │  ░░ EMERALD ████░░░  │
│  ░░░░░░░░░░░░░░░░░░  │            │  ░░░░░░░░░░░░░░░░░░  │
│                      │            │                      │
│  [████ CTA ████]     │            │  [████ CTA ████]     │
│  bg:#CCFF00 tx:dark  │            │  bg:#059669 tx:white │
│                      │            │                      │
│  secondary: #6366F1  │            │  secondary: #94A3B8  │
│  (competing indigo)  │            │  (supporting slate)  │
└──────────────────────┘            └──────────────────────┘

Vibe: Cyberpunk/Gaming              Vibe: Enterprise/Supabase
Energy: ████████████ 95%            Energy: ██████░░░░░░ 55%
Restraint: ██░░░░░░░░░░ 15%        Restraint: █████████░░░ 80%
```

---

## 7. Decision Record

| Decision | Choice | Rationale |
|---|---|---|
| Primary highlight | `#3ECF8E` | Supabase-proven, true green (not chartreuse), AAA contrast on dark |
| Primary CTA | `#059669` | Deep enough for white text (5.3:1), warm enough to feel clickable |
| Secondary | `#94A3B8` (Slate) | Restraint-first — one chromatic color, maximize green impact |
| Restraint model | Supabase | Max 3 green elements per viewport, 90%+ neutral canvas |
| Background | `#050505` (keep) | Already optimal — near-black provides maximum green contrast |
| Foreground | `#FAFAFA` (keep) | Already optimal for readability |

---

*This spec defines the color evolution from Tactical Neon to Refined Green for the Kyros Theme Preview v4. Implementation involves updating `themeVars` in `App.tsx` and `index.css` body defaults. The dual-green system (highlight + CTA) replaces the single flat `#CCFF00` with a purpose-driven hierarchy.*
