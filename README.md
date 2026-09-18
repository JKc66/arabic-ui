# Arabic UI (`arabic-ui`)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178c6.svg)](scripts/pluralize.ts)
[![Agent Skill](https://img.shields.io/badge/Agent%20Skill-Compatible-8a2be2.svg)](SKILL.md)

**Natural, high-fidelity Arabic UI microcopy and RTL engineering for AI agents and modern web applications.**

Most Arabic digital interfaces suffer from **العرنجية** (clumsy English syntactic calques like *"تم الحفظ بنجاح"*, *"الخاص بك"*, *"قم بالضغط"*), broken pluralization (ignoring the 6 grammatical categories or the dual *المثنى*), and bidirectional layout defects.

`arabic-ui` is an **Agent Skill** and engineering reference designed to instruct AI coding assistants (Claude Code, Antigravity, Cursor, Copilot) and product teams to author concise, native Arabic UI copy and clean RTL code.

---

## ⚡ Key Pillars

### 1. Anti-العرنجية Guardrails (محاربة الرطانة والترجمة الحرفية)
Eliminates translationese in favor of direct, punchy Arabic:

| English / Feature | Clumsy Translationese (العرنجية) | Natural Arabic (الفصيح السليم) |
|---|---|---|
| Successfully saved | تم الحفظ بنجاح / تم حفظ التغييرات بنجاح | **حُفظت التغييرات** |
| Enter your email | قم بإدخال البريد الإلكتروني الخاص بك | **أدخل بريدك الإلكتروني** |
| Click here to view details | يرجى القيام بالنقر هنا لمشاهدة التفاصيل | **اضغط لعرض التفاصيل** |
| Updated automatically | يتم التحديث بشكل تلقائي | **يُحدّث تلقائيًا** |
| Failed to connect | فشل في الاتصال بالخادم | **تعذّر الاتصال بالخادم** |
| 2 hours ago | منذ 2 ساعات | **قبل ساعتين** |

*(Explore the full 40+ term lookup table in [`references/aranjiya-glossary.md`](references/aranjiya-glossary.md))*

---

### 2. The Golden UI Grammar Matrix

| UI Element Type | Target Grammatical Form | Correct Exemplar |
|---|---|---|
| **Buttons & Action Triggers** | **المصدر (Verbal Noun)** | `حفظ`، `تعديل`، `تسجيل الدخول`، `إضافة إلى السلة` |
| **Input Hints & Placeholders** | **فعل الأمر (Imperative)** | `أدخل بريدك الإلكتروني`، `اختر طريقة الدفع` |
| **Status Badges & Outcomes** | **اسم الفاعل / المفعول / المبني للمجهول** | `مكتمل`، `معلّق`، `أُرسلت الرسالة`، `نَشِط` |

> ⚠️ **Rule**: Never use imperative verbs on buttons (use `حفظ`, not `احفظ`). Buttons represent an action/concept, while placeholders direct the user.

---

### 3. CLDR 6-Form Pluralization Engine
Arabic does not have simple singular/plural forms—it defines **6 distinct grammatical categories**:
1. **Zero (0)**: `لا توجد ملفات`
2. **One (1)**: `ملف واحد`
3. **Two (2) - المثنى**: `ملفان` (Nominative / مرفوع) أو `ملفين` (Oblique / منصوب أو مجرور)
4. **Few (3–10)**: **جمع قلة مجرور** (`3 ملفات`)
5. **Many (11–99)**: **مفرد منصوب تمييز** (`15 ملفًا`)
6. **Other (100+)**: **مفرد مجرور** (`100 ملف`)

Includes a zero-dependency TypeScript implementation in [`scripts/pluralize.ts`](scripts/pluralize.ts):

```typescript
import { formatArabicPlural, COMMON_ARABIC_NOUNS } from './scripts/pluralize';

formatArabicPlural(0, COMMON_ARABIC_NOUNS.app);   // "لا توجد تطبيقات"
formatArabicPlural(1, COMMON_ARABIC_NOUNS.app);   // "تطبيق واحد"
formatArabicPlural(2, COMMON_ARABIC_NOUNS.app);   // "تطبيقان"
formatArabicPlural(5, COMMON_ARABIC_NOUNS.app);   // "5 تطبيقات"
formatArabicPlural(15, COMMON_ARABIC_NOUNS.app);  // "15 تطبيقًا"
formatArabicPlural(100, COMMON_ARABIC_NOUNS.app); // "100 تطبيق"
```

---

### 4. RTL & BiDi Engineering Guardrails

- **CSS Logical Properties**: Always use logical properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`) instead of physical directions (`left`, `right`).
- **Inherently LTR Controls**: Passwords, emails, phone numbers, and code tokens must enforce `dir="ltr"` and `text-align: start`.
- **BiDi Isolation**: Isolate mixed numbers and neutral characters (`/`, `-`, `:`) with `<bdi>` or `<span dir="ltr">` to prevent bidirectional flip (e.g. preventing `2 GB / 10 GB` from rendering backwards as `10 GB / 2 GB`).
- **Proclitic Typography**: The conjunction Waw (`و`) must connect directly to the succeeding word with **zero whitespace** (`الملفات والمجلدات`).

*(Read full technical specifications in [`references/rtl-engineering.md`](references/rtl-engineering.md))*

---

## 📁 Repository Structure

```
arabic-ui/
├── SKILL.md                          # AI Agent skill definition & execution instructions
├── README.md                         # Documentation & guidelines
├── LICENSE                           # MIT License
├── references/
│   ├── aranjiya-glossary.md          # 40+ term translationese lookup table
│   └── rtl-engineering.md            # CSS logical properties & layout specs
└── scripts/
    └── pluralize.ts                  # Production-ready CLDR Arabic pluralization engine
```

---

## 🚀 Installation & Usage

### Quick Install (Recommended)

To add this skill to your agent environment (Antigravity, Claude Code, Cursor, Codex):

```bash
npx skills add jkc66/arabic-ui
```

or with `bunx`:

```bash
bunx skills add jkc66/arabic-ui
```

### Manual / Git Clone

```bash
# Global installation:
git clone https://github.com/JKc66/arabic-ui.git ~/.agents/skills/arabic-ui

# Project-level installation:
git clone https://github.com/JKc66/arabic-ui.git .agents/skills/arabic-ui
```

Once installed, AI agents will automatically trigger this skill whenever you ask to:
- Translate, review, or write Arabic UI microcopy
- Localize web applications, buttons, alerts, or dashboards
- Implement RTL layouts, logical CSS, or bidirectional isolation
- Handle Arabic plural counters and number formatting

---

## 📄 License

MIT © [JKc66](https://github.com/JKc66)
