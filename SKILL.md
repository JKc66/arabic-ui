---
name: arabic-ui
description: >-
  Arabic copywriting, UX microcopy, and engineering rules for webapps and digital products. Use when writing, reviewing, or localizing Arabic UI text, handling Arabic counting/pluralization rules (المعدود والأشكال الستة), eliminating العرنجية (translationese/calques), fixing BiDi and punctuation issues, or building RTL interfaces. Triggers on arabic, عربي, عربية, عرنجية, تعريب, localization, i18n, l10n, rtl, counting, pluralization, معدود, arabic ui, arabic copy, arabic webapps.
---

# Arabic UI Writing & Localization

Natural, concise Arabic copy engineered for digital interfaces, dashboards, and webapps. Enforces native Arabic grammar, 6-category pluralization, bidirectional text isolation, and strict anti-calque vocabulary.

## Operational Workflow

Follow this sequence for any Arabic copy or interface review:

1. **Map Element Type to Grammatical Form**: Match each UI element to its target inflection via Section 1.
2. **Draft Target Copy with Leading Words**: Formulate concise Arabic; eliminate calques via `references/aranjiya-glossary.md`.
3. **Format Counts & Plural Categories**: Route dynamic numbers through `scripts/pluralize.ts` with correct dual case inflection (`nominative` vs `oblique`).
4. **Isolate Mixed BiDi Strings & Punctuation**: Attach proclitics (`و`) without whitespace; isolate numbers and neutral characters (`/`, `-`) with `<bdi>` or `dir="ltr"`.
5. **Verify Against Checklist**: Run the binary criteria in Section 4 before completing the task.

---

## 1. The Golden UI Grammar Table

| UI Element Type | Target Grammatical Form | Correct Exemplar |
|---|---|---|
| **Buttons, Action Triggers, Tabs, Navigation** | **المصدر (Verbal Noun)** | `حفظ`، `تعديل`، `تسجيل الدخول`، `إضافة إلى السلة` |
| **Field Placeholders, Hints, Input Instructions** | **فعل الأمر (Imperative)** | `أدخل بريدك الإلكتروني`، `اختر طريقة الدفع` |
| **Status Badges, Indicators, Toast Outcomes** | **اسم الفاعل / المفعول / المبني للمجهول** | `مكتمل`، `معلّق`، `أُرسلت الرسالة`، `نَشِط` |

*Buttons exclusively take the verbal noun (المصدر). Never place imperative verbs on buttons (use `حفظ`, not `احفظ`).*

---

## 2. Affirmative Language Guardrails (Anti-العرنجية)

Replace English syntactic transfer with direct native Arabic phrasing:

- **Past Passive Actions**: Use the internal passive voice (`حُذف الملف` or `أُرسل الرابط`), not helper verbs (`تم حذف`).
- **User Instructions**: Use direct imperative verbs (`اضغط هنا`, `أدخل بياناتك`), not auxiliary constructs (`قم بالضغط`, `يرجى القيام بـ`).
- **Possession**: Use the pronominal suffix كاف الخطاب (`حسابك`, `ملفك`, `طلبك`), not periphrastic adjectives (`الخاص بك`).
- **Adverbs & States**: Use the direct accusative adverb or verbal noun (`تلقائيًا`, `فوريًا`, `باستمرار`), not prepositional phrases (`بشكل تلقائي`, `بصورة مستمرة`).
- **Errors & Incapacity**: Use affirmative incapacity verbs (`تعذّر الاتصال`, `لم نتمكن من الحفظ`), not literal failure calques (`فشل في الاتصال`).
- **Polite Noise**: Drop ceremonial filler (`يرجى`, `الرجاء`) in everyday interactive microcopy. Politeness in software is clarity and speed.

*For complete 40+ term lookup mappings, inspect [references/aranjiya-glossary.md](references/aranjiya-glossary.md).*

---

## 3. Counting, Pluralization & BiDi Rules

### 3.1 The 6 Plural Categories
Every dynamic counter must handle all 6 CLDR categories:
- **Zero (0)**: `لا توجد ملفات` أو `0 ملف`
- **One (1)**: `ملف واحد` (مفرد + نعت)
- **Two (2)**: **المثنى** — inflect by grammatical position:
  - *Nominative (مرفوع بالألف)*: `تطبيقان متبقيان` / `ملفان` (subject, predicate, standalone badge)
  - *Oblique (منصوب/مجرور بالياء)*: `قبل دقيقتين` / `حذف تطبيقين` (post-preposition, direct object)
- **Few (3–10)**: **جمع قلة مجرور** (`3 تطبيقات`, `5 دقائق`)
- **Many (11–99)**: **مفرد منصوب تمييز** (`11 تطبيقًا`, `25 دقيقةً`)
- **Other (100+)**: **مفرد مجرور** (`100 تطبيق`, `1000 مستخدم`)

*Implementation helper*: Route counts through `formatArabicPlural()` in [scripts/pluralize.ts](scripts/pluralize.ts). Never concatenate strings manually (`count + " " + noun`).

### 3.2 Proclitics & Punctuation
- **The Conjunction Waw (`و`)**: Connects to the following word with **zero whitespace** (`الملفات والمجلدات`).
- **Punctuation Glyphs**: Use Arabic comma `،` (`U+060C`), semicolon `؛` (`U+061B`), and question mark `؟` (`U+061F`). Never precede with a space (`أهلاً بك، هل تود المتابعة؟`).

### 3.3 Neutral Character BiDi Isolation
Neutral characters (`/`, `-`, `:`) between numbers reverse under RTL paragraph direction (e.g. `2 GB / 10 GB` flips to `10 GB / 2 GB`). Wrap expressions with `<bdi>` or `<span dir="ltr">`.

*For detailed CSS logical layout, form control insets, and SSR setup, inspect [references/rtl-engineering.md](references/rtl-engineering.md).*

---

## 4. Binary Completion Checklist

Before completing any Arabic copy or UI task, verify:
- [ ] Buttons and action triggers use **المصدر** (`حفظ`, `تعديل`), not imperative verbs.
- [ ] Form instructions and hints use **فعل الأمر** (`أدخل`, `اختر`), without `قم بـ` or `يرجى`.
- [ ] Completed system actions use native passive (`حُذف`, `أُضيف`) without `تم + مصدر`.
- [ ] Possessive forms use attached suffixes (`حسابك`) without `الخاص بك`.
- [ ] Adverbs use direct accusative form (`تلقائيًا`) without `بشكل + صفة`.
- [ ] The dual (المثنى) is used for 2 items (`تطبيقان` / `تطبيقين`), never `2 تطبيق` or `2 تطبيقات`.
- [ ] Plural counters account for 3–10 (`تطبيقات`) and 11–99 (`تطبيقًا`).
- [ ] Waw `و` attaches directly to the following word with zero whitespace (`والمستخدم`).
- [ ] Arabic punctuation marks (`،`, `؛`, `؟`) are used with no leading space.
- [ ] Neutral characters between numbers (`/`, `-`) are isolated with `<bdi>` or `dir="ltr"`.
- [ ] Interactive trailing inputs (password visibility toggle) use `inset-inline-end`, not physical `right`.
