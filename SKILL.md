---
name: arabic-ui
description: >-
  Authentic Arabic writing, UI/UX microcopy, and RTL engineering. Use when writing, translating, or reviewing Arabic interfaces, dashboards, articles, documentation, or copy. Enforces classical syntactic flow, eliminates translationese (العرنجية), applies Al-Jahiz's density principle, and handles Arabic pluralization and bidirectional layout.
---

# Authentic Arabic Writing & UI Localization (العربية الفصيحة للواجهات والمقالات)

High-fidelity, concise Arabic text engineered for modern digital interfaces, articles, technical documentation, and long-form writing. Enforces native Arabic grammar, 6-category pluralization, verbal sentence momentum, and strict anti-calque vocabulary.

---

## Operational Workflow

Determine the target domain and follow the appropriate path:

### Mode A: UI & Interface Microcopy (Buttons, Alerts, Inputs, Dashboards)
1. **Map Element Type to Grammatical Form**: Match UI elements to target grammatical forms via Section 1.1 (e.g., المصدر for buttons, فعل الأمر for placeholders).
2. **Draft Concise Microcopy**: Eliminate auxiliary verbs and calques via Section 3 (Checklist) and [references/aranjiya-glossary.md](references/aranjiya-glossary.md).
3. **Format Dynamic Counters**: Route numbers through `formatArabicPlural()` in [scripts/pluralize.ts](scripts/pluralize.ts) with dual case inflection (`nominative` vs `oblique`).
4. **Isolate BiDi & Logical Layout**: Use CSS logical properties (`inset-inline-end`) and isolate neutral characters (`2 GB / 10 GB`) via [references/rtl-engineering.md](references/rtl-engineering.md).
5. **Verify Against Checklist**: Validate with Section 3.1 & 3.2 gates.

### Mode B: Long-Form Writing, Articles & Essays (Blog Posts, Docs, Reports)
1. **Establish Verbal Momentum**: Lead sentences with active verbs (تقديم الفعل والجملة الفعلية) rather than noun-heavy calques (see Section 1.2 and [references/editorial-and-articles.md](references/editorial-and-articles.md)).
2. **Eliminate Journalistic Fluff**: Strip empty openers (`من الجدير بالذكر أن`, `لا شك في أن`) and calqued connectors (`يلعب دورًا`, `على صعيد آخر`) via [references/editorial-and-articles.md](references/editorial-and-articles.md).
3. **Enforce Semantic Density**: Apply Al-Jahiz's principle: *«إجاعة اللفظ وإشباع المعنى»* (Starve the phrasing, nourish the meaning). Drop any word that adds zero operational or semantic value.
4. **Cohesive Transitions & Typography**: Connect clauses using natural Arabic particles (`إذ`, `حيث`, `بل`, `ثم`, `فـ`), attach the conjunction Waw `و` with zero whitespace, and use Arabic quotes `« »`.
5. **Verify Against Checklist**: Validate with Section 3.1 & 3.3 gates.

---

## 1. Grammatical Frameworks

### 1.1 The Golden UI Grammar Table
| UI Element Type | Target Grammatical Form | Correct Exemplar | Prohibited Cliché |
|---|---|---|---|
| **Buttons & Action Triggers** | **المصدر (Verbal Noun)** | `حفظ`، `تعديل`، `تسجيل الدخول` | `احفظ` (Never put imperative on buttons) |
| **Field Placeholders & Hints** | **فعل الأمر (Imperative)** | `أدخل بريدك الإلكتروني`، `اختر الخطة` | `قم بإدخال` / `يرجى إدخال` |
| **Status Badges & Outcomes** | **اسم الفاعل / المفعول / المبني للمجهول** | `مكتمل`، `معلّق`، `أُرسلت الرسالة` | `تم الحفظ بنجاح` |

### 1.2 Long-Form Writing & Editorial Framework
Authentic Arabic prose leads with active verbal sentences (الجملة الفعلية), drops auxiliary verbs (`قام بـ`, `عمل على`), replaces translation clichés (`يلعب دورًا`, `يسلط الضوء`), and bypasses empty transitional fluff (`من الجدير بالذكر أن`).

*(For comprehensive before/after tables, banned transitional openers, and connector lookups, inspect [references/editorial-and-articles.md](references/editorial-and-articles.md))*

---

## 2. Counting, Pluralization & Typography Rules

### 2.1 The 6 Plural Categories (CLDR)
Every dynamic counter and counting sentence must handle all 6 categories:
- **Zero (0)**: `لا توجد ملفات` أو `0 ملف`
- **One (1)**: `ملف واحد` (مفرد + نعت)
- **Two (2) - المثنى**: Inflect by grammatical position:
  - *Nominative (مرفوع بالألف)*: `تطبيقان متبقيان` / `ملفان` (subject, predicate, headline)
  - *Oblique (منصوب/مجرور بالياء)*: `قبل دقيقتين` / `حذف تطبيقين` (post-preposition, direct object)
- **Few (3–10)**: **جمع قلة مجرور** (`3 تطبيقات`, `5 دقائق`)
- **Many (11–99)**: **مفرد منصوب تمييز** (`11 تطبيقًا`, `25 دقيقةً`)
- **Other (100+)**: **مفرد مجرور** (`100 تطبيق`, `1000 مستخدم`)

*Implementation helper*: In code, route counts through `formatArabicPlural()` in [scripts/pluralize.ts](scripts/pluralize.ts). Never concatenate strings manually (`count + " " + noun`).

### 2.2 Typography, Connectors & BiDi
- **The Conjunction Waw (`و`)**: Connects directly to the following word with **zero whitespace** (`الملفات والمجلدات`).
- **Punctuation Glyphs**: Use Arabic comma `،` (`U+060C`), semicolon `؛` (`U+061B`), and question mark `؟` (`U+061F`). Never precede with a space.
- **Quotation Marks**: Use Arabic chevron quotation marks `« »` for quotes and citations in prose and articles.
- **Neutral Character BiDi Isolation**: Neutral characters (`/`, `-`, `:`) between numbers reverse in RTL (`2 GB / 10 GB` flips to `10 GB / 2 GB`). Wrap expressions with `<bdi>` or `<span dir="ltr">`.

---

## 3. Operational Verification Checklist & Anti-العرنجية Gates

Every Arabic UI string, translation, or long-form passage must satisfy this falsifiable completion gate:

### 3.1 For All Arabic Writing (UI & Articles)
- [ ] **Past Passive Actions**: Uses native internal passive voice (`حُذف الملف`, `أُطلق التحديث`, `أُرسل الرابط`), with zero instances of helper verbs (`تم + مصدر` or `تمت عملية`).
- [ ] **Possession**: Uses attached pronominal suffixes (`حسابك`, `ملفك`, `فكرتك`), with zero occurrences of periphrastic adjectives (`الخاص بك` / `الخاصة بـ`).
- [ ] **Adverbs & States**: Uses direct accusative adverbs or verbal nouns (`تلقائيًا`, `فوريًا`, `باستمرار`), with zero prepositional calques (`بشكل تلقائي`, `بصورة مستمرة`).
- [ ] **Durations & Time**: Omits intrusive prepositions before adverbs of time (`صالح 3 أيام`, `في 5 دقائق`), never (`لمدة 3 أيام`, `خلال 5 دقائق`).
- [ ] **Instrumental Precision**: Uses instrumental Baa `بـ` or direct context (`بالضغط هنا`, `في الإعدادات`), eliminating calqued mediators (`من خلال`, `عبر`).
- [ ] **Direct Superlatives**: Uses authentic `أَفْعَل` forms (`الأسرع`, `الأكفأ`, `الأضمن`), never periphrastic calques (`الأكثر سرعة`, `الأكثر كفاءة`).
- [ ] **Superlative Agreement & Genitives**: Prefers genitive construct for absolute superlatives (`أطول الليالي`, `أجمل الفتيات`) or enforces strict grammatical agreement if adjectival (`الدولتان العُظمَيان`), never frozen masculine singulars (`الدولتان الأعظم`).
- [ ] **Causal Adjectives (النعت السببي)**: Uses agile causal adjectives (`مشاريع باهظة تكاليفها`, `القرية الظالم أهلها`) instead of clunky relative clauses (`المشاريع التي تكاليفها مرتفعة`).
- [ ] **Indefiniteness & Partitivity**: Relies on direct Tanween for indefinite and non-countable nouns (`استغرق وقتاً`, `أعجب ناسٌ`), eliminating calqued mediators (`بعض الوقت`, `بعض الناس`, `أحد المطورين`, `أي مشكلة`).
- [ ] **Coordinated Annexation**: Annexes the first noun to the genitive and suffixes a pronoun to the second (`عرض البيانات وتعديلها`), never double construct (`عرض وتعديل البيانات`).
- [ ] **Negative Disjunction**: Coordinates negative clauses with `ولا` (`لا تعديل ولا حذف`, `لن نترك رجلاً ولا طفلاً`), never calqued `أو`.
- [ ] **Mutual Reciprocal Verbs**: Uses bare reciprocal forms (`تفاعل` like `تحالفوا`, `تعاونوا`), strictly omitting redundant particles (`مع بعضهم البعض`).
- [ ] **Prohibitions vs. Optionality**: Warnings and restrictions never use `لا يجب` (which indicates optionality); use direct jussive negative imperative (`لا تُغلق الصفحة`, `يحظر الحذف`).
- [ ] **Existential States**: Omits pseudo-existential `هناك` for states and events (`حدث خطأ`, `3 تحديثات معلقة`), never (`هناك خطأ`).
- [ ] **Roles & Destinations**: Avoids intrusive `كـ` (simile) when designating functions or destinations (`حفظ في المسودات`, `دخول المشرف`), never (`حفظ كمسودة`, `الدخول كمسؤول`).
- [ ] **Hidden Foreignism Trap**: Avoids substituting calques with bureaucratic pseudo-corrections (never `بوصفه / بصفته مسؤولاً` for `as a`; use `دخول المشرف` directly).
- [ ] **Direct Verbs vs. Copula**: Uses direct verbs instead of copula `كن + صفة` (`احذر`, `تأكد`), never (`كن حذرًا`, `كن متأكدًا`).
- [ ] **Errors & Incapacity**: Uses affirmative incapacity phrasing (`تعذّر الاتصال`, `لم نتمكن من الحفظ`), never failure calques (`فشل في الاتصال`).
- [ ] **Counting Duals (المثنى)**: Uses dual noun forms (`ملفان` / `ملفين`), never numeral prefixing (`2 ملف`).
- [ ] **Plural Categories**: Correctly applies 3–10 plural genitive (`3 ملفات`) and 11–99 singular accusative (`15 ملفًا`).
- [ ] **Conjunction Waw (`و`)**: Attaches directly to the succeeding word with zero whitespace (`الملفات والمجلدات`).
- [ ] **Arabic Typography**: Uses Arabic glyphs (`،`, `؛`, `؟`) with no leading space.

*(For complete 85+ term lookup mappings and syntactic breakdowns, inspect [references/aranjiya-glossary.md](references/aranjiya-glossary.md))*

### 3.2 For UI & Frontend Specifically
- [ ] **Buttons & Action Triggers**: Uses **المصدر (Verbal Noun)** (`حفظ`, `تعديل`, `تسجيل الدخول`), never imperative verbs (`احفظ`).
- [ ] **Field Instructions & Hints**: Uses **فعل الأمر (Imperative)** (`أدخل`, `اختر`), with zero polite noise or auxiliary constructs (`قم بـ`, `يرجى`, `الرجاء`).
- [ ] **BiDi Isolation**: Isolates neutral characters (`/`, `-`, `:`) between numbers using `<bdi>` or `<span dir="ltr">` (`<span dir="ltr">2 GB / 10 GB</span>`).
- [ ] **CSS Logical Insets**: Trailing icons and inputs use `inset-inline-end`, never physical `right`.

*(For layout patterns, SSR direction, and icon mirroring, inspect [references/rtl-engineering.md](references/rtl-engineering.md))*

### 3.3 For Articles & Long-Form Writing Specifically
- [ ] **Verbal Momentum**: Leads sentences with active verbs (الجملة الفعلية) rather than noun-heavy calques (`أطلقت الشركة` vs `الشركة قامت بإطلاق`).
- [ ] **Empty Transitional Openers**: Eliminates filler starters (`من الجدير بالذكر أن`, `لا شك في أن`, `تجدر الإشارة إلى أن`).
- [ ] **Translation Clichés**: Replaces foreign metaphors (`يلعب دورًا`, `يسلط الضوء على`, `على مدار الساعة`) with direct Arabic phrasing (`يؤثر أثرًا بالغًا`, `يُبيّن`, `ليل نهار`).
- [ ] **Quotation Marks**: Encloses quotes, citations, and titles in Arabic chevron marks `« »`, reserving Latin `"` for code.
- [ ] **Al-Jahiz's Density Principle**: Starves phrasing and nourishes meaning (*«إجاعة اللفظ وإشباع المعنى»*); drops any word whose omission leaves meaning intact.

*(For detailed article writing guidelines and connector lookups, inspect [references/editorial-and-articles.md](references/editorial-and-articles.md))*
