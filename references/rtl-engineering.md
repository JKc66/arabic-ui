# RTL Engineering & Architectural Guardrails

Reference specifications for bidirectional layout, form controls, SSR direction, and type-safe internationalization.

---

## 1. CSS Logical Properties
Always construct RTL layouts using CSS logical properties. Never hardcode physical directions:

| Physical (Avoid in RTL) | Logical (Always Use) |
|---|---|
| `margin-left`, `margin-right` | `margin-inline-start`, `margin-inline-end` |
| `padding-left`, `padding-right` | `padding-inline-start`, `padding-inline-end` |
| `left: 0`, `right: 0` | `inset-inline-start: 0`, `inset-inline-end: 0` |
| `text-align: left` | `text-align: start` |
| `border-left`, `border-right` | `border-inline-start`, `border-inline-end` |

---

## 2. Form Controls & Interactive Positioning

### 2.1 Trailing Buttons & Adornments
Pin trailing buttons (e.g. password visibility eye, clear button) using logical insets:
```css
/* ❌ Wrong: sits over password text in RTL */
.password-toggle { position: absolute; right: 8px; }

/* ✅ Correct: stays on trailing side in both LTR and RTL */
.password-toggle { position: absolute; inset-inline-end: 8px; }
.form-input { padding-inline-end: 2.5rem; }
```

### 2.2 Inherently LTR Input Fields
Data that is inherently LTR (passwords, emails, phone numbers, domain names, API keys, IBANs, numbers) must explicitly declare `dir="ltr"` and `text-align: start`:
```html
<input type="password" dir="ltr" class="form-input" />
<input type="email" dir="ltr" class="form-input" />
<input type="tel" dir="ltr" class="form-input" />
```

### 2.3 Form Accessibility & Live Announcements
Provide standard autocomplete tokens and announce validation errors via live regions:
```html
<input 
  type="email" 
  dir="ltr" 
  id="email" 
  autocomplete="email"
  aria-invalid={hasError ? "true" : undefined}
  aria-describedby={hasError ? "email-error" : undefined} 
/>
{#if hasError}
  <span id="email-error" role="alert" aria-live="polite">
    أدخل عنوان بريد إلكتروني صالحًا.
  </span>
{/if}
```

---

## 3. BiDi Neutral Character & Range Isolation (Unicode UAX #9)

Neutral characters (`/`, `-`, `+`, `:`, `.`) lack intrinsic directionality and inherit the surrounding paragraph's RTL direction, reversing numbers and ranges:

| Expression | Flawed RTL Display | Isolated Fix |
|---|---|---|
| Quotas (`2 GB / 10 GB`) | `10 GB / 2 GB` | `<span dir="ltr">2 GB / 10 GB</span>` |
| Pagination (`1 / 5`) | `5 / 1` | `<span dir="ltr">1 / 5</span>` |
| Date ranges (`2024 - 2026`) | `2026 - 2024` | `<span dir="ltr">2024 – 2026</span>` |
| Time intervals (`09:00 - 17:00`) | `17:00 - 09:00` | `<span dir="ltr">09:00 – 17:00</span>` |

Use `<bdi>` (Bidirectional Isolate) when interpolating dynamic units:
```html
<span><bdi>{used}</bdi> / <bdi>{total}</bdi></span>
```

---

## 4. Icon Mirroring Specification

- **Mirror in RTL**: Directional controls representing chronological forward/backward progression (`chevron-right`, `arrow-back`, search submit arrow, pagination arrows, breadcrumb separators).
- **Do Not Mirror**: Universal physical objects and non-directional tools (magnifying glass, camera, heart, sliders, checkmarks, clocks, audio volume controls, code brackets).

---

## 5. SSR First-Byte & Direction Resolution

- Emit `<html lang="ar" dir="rtl">` on the very first byte of HTML delivered by the server.
- Prohibit client-side direction toggles (`onMount`, `useEffect`) which trigger Flash of Wrong Direction (FOWD).

---

## 6. Type-Safe Translation Contracts

Enforce 100% dictionary completeness at build time via TypeScript schemas:
```typescript
// en.ts
export const en = {
  auth: { signIn: 'Sign In', welcome: 'Welcome, {name}' }
} as const;
export type TranslationSchema = typeof en;

// ar.ts
export const ar = {
  auth: { signIn: 'تسجيل الدخول', welcome: 'مرحبًا، {name}' }
} satisfies TranslationSchema; // Missing keys trigger build errors
```

---

## 7. AST Static Extraction vs. Regex Search

- Do not use regex to verify translation coverage. Regex searching for quoted strings misses bare template text nodes.
- Use AST parsers (TypeScript Compiler API, Svelte AST, ESLint `no-raw-text`) to inspect syntax trees (`JSXText`, Svelte `Text` nodes) and verify that zero un-localized text exists in production templates.
