---
name: arabic-ui
description: >-
  Authentic, high-fidelity Arabic writing, copywriting, UX microcopy, and RTL engineering. Use whenever writing, reviewing, translating, or localizing Arabic text across BOTH domains: (1) UI/UX microcopy, digital interfaces, dashboards, and RTL layouts; and (2) General Arabic writing, articles, essays, documentation, blog posts, and technical prose. Enforces classical Arabic syntactic flow, eliminates العرنجية (translationese/calques), applies Al-Jahiz's density principle (إجاعة اللفظ وإشباع المعنى), and handles counting/pluralization. Triggers on arabic, عربي, عربية, عرنجية, تعريب, مقال, مقالة, كتابة, محتوى, تدوين, صياغة, تحرير, localization, i18n, rtl, counting, pluralization, معدود, arabic ui, arabic copy, arabic writing, arabic article, arabic essay, arabic blog.
---

# Authentic Arabic Writing & UI Localization (العربية الفصيحة للواجهات والمقالات)

High-fidelity, concise Arabic text engineered for modern digital interfaces, articles, technical documentation, and long-form writing. Enforces native Arabic grammar, 6-category pluralization, verbal sentence momentum, and strict anti-calque vocabulary.

---

## Operational Workflow

Determine the target domain and follow the appropriate path:

### Mode A: UI & Interface Microcopy (Buttons, Alerts, Inputs, Dashboards)
1. **Map Element Type to Grammatical Form**: Match UI elements to their target grammatical forms via Section 1.1 (e.g. المصدر for buttons, فعل الأمر for placeholders).
2. **Draft Concise Microcopy**: Eliminate auxiliary verbs and calques via Section 2 and [references/aranjiya-glossary.md](references/aranjiya-glossary.md).
3. **Format Dynamic Counters**: Route numbers through `formatArabicPlural()` in [scripts/pluralize.ts](scripts/pluralize.ts) with dual case inflection (`nominative` vs `oblique`).
4. **Isolate BiDi & Logical Layout**: Use CSS logical properties (`inset-inline-end`) and isolate neutral characters (`2 GB / 10 GB`) via [references/rtl-engineering.md](references/rtl-engineering.md).
5. **Verify Against Checklist**: Validate with the UI checklist in Section 4.

### Mode B: Long-Form Writing, Articles & Essays (Blog Posts, Docs, Reports)
1. **Establish Verbal Momentum**: Lead sentences with active verbs (الجملة الفعلية) rather than noun-heavy calques (see Section 1.2).
2. **Eliminate Journalistic Fluff**: Strip empty openers (`من الجدير بالذكر أن`, `لا شك في أن`) and calqued connectors (`يلعب دورًا`, `على صعيد آخر`) via [references/editorial-and-articles.md](references/editorial-and-articles.md).
3. **Enforce Semantic Density**: Apply Al-Jahiz's principle: *«إجاعة اللفظ وإشباع المعنى»* (Starve the phrasing, nourish the meaning). Drop any word that adds zero operational or semantic value.
4. **Cohesive Transitions & Typography**: Connect clauses using natural Arabic particles (`إذ`, `حيث`, `بل`, `ثم`, `فـ`), attach the conjunction Waw `و` with zero whitespace, and use Arabic quotes `« »`.
5. **Verify Against Checklist**: Validate with the Editorial checklist in Section 4.

---

## 1. Grammatical Frameworks

### 1.1 The Golden UI Grammar Table
| UI Element Type | Target Grammatical Form | Correct Exemplar | Prohibited Cliché |
|---|---|---|---|
| **Buttons & Action Triggers** | **المصدر (Verbal Noun)** | `حفظ`، `تعديل`، `تسجيل الدخول` | `احفظ` (Never put imperative on buttons) |
| **Field Placeholders & Hints** | **فعل الأمر (Imperative)** | `أدخل بريدك الإلكتروني`، `اختر الخطة` | `قم بإدخال` / `يرجى إدخال` |
| **Status Badges & Outcomes** | **اسم الفاعل / المفعول / المبني للمجهول** | `مكتمل`، `معلّق`، `أُرسلت الرسالة` | `تم الحفظ بنجاح` |

### 1.2 Long-Form Writing & Editorial Framework
| Editorial Pattern | ❌ Translationese Calque (العرنجية) | ✅ Native Authentic Arabic |
|---|---|---|
| **Sentence Opening** | `الشركة قامت بإطلاق تحديث جديد للمنصة.` | **`أطلقت الشركة تحديثًا جديدًا للمنصة.`** (تقديم الفعل) |
| **Empty Filler Openers** | `من الجدير بالذكر أن التقنية تتطور بسرعة.` | **`والحق أن التقنية تتطور تسارعًا.`** أو الدخول المباشر |
| **Auxiliary Actions** | `قام الفريق بإجراء دراسة شاملة للمشروع.` | **`درس الفريق المشروع بعناية.`** (الفعل المباشر) |
| **Metaphorical Calques** | `يلعب الذكاء الاصطناعي دورًا محوريًا في العمل.` | **`يؤثر الذكاء الاصطناعي أثرًا بالغًا في العمل.`** |
| **Contrast Connectors** | `من ناحية أخرى، يجب الانتباه للتكاليف.` | **`وفي المقابل، تجب مراعاة التكاليف.`** |

*(For detailed article writing guidelines and connector lookups, inspect [references/editorial-and-articles.md](references/editorial-and-articles.md))*

---

## 2. Universal Anti-العرنجية Guardrails (UI & Articles)

Eliminate English syntactic transfer across all written Arabic:

- **Past Passive Actions**: Use internal passive voice (`حُذف الملف` or `أُرسل الرابط`), never helper verbs (`تم حذف`).
- **User Instructions**: Use direct imperative verbs (`اضغط هنا`, `أدخل بياناتك`), not auxiliary constructs (`قم بالضغط`, `يرجى القيام بـ`).
- **Possession**: Use the pronominal suffix كاف الخطاب (`حسابك`, `ملفك`), not periphrastic adjectives (`الخاص بك`).
- **Adverbs & States**: Use direct accusative adverbs or verbal nouns (`تلقائيًا`, `فوريًا`, `باستمرار`), not prepositional phrases (`بشكل تلقائي`, `بصورة مستمرة`).
- **Prohibitions vs Optionality**: Never use `لا يجب عليك كذا` to forbid an action (it means "it is optional/not mandatory"). Use direct jussive negative imperative (`لا تُغلق الصفحة`, `يحظر الحذف`).
- **Existential State**: Drop pseudo-existential `هناك` for states/events (`حدث خطأ`, `3 تحديثات معلقة`), not (`هناك خطأ`, `هناك 3 تحديثات`).
- **Direct Verbs vs Copula**: Use direct verbs instead of copula `كن + صفة` (`احذر`, `تأكد`), not (`كن حذرًا`, `كن متأكدًا`).
- **Functional Roles vs Simile ("كـ")**: Drop intrusive `كـ` (simile) when designating functions or destinations (`حفظ في المسودات`, `دخول المشرف`), not (`حفظ كمسودة`, `الدخول كمسؤول`).
- **Duration & Time**: Omit prepositions before adverbs of time (`صالح 3 أيام`, `في 5 دقائق`), not (`لمدة 3 أيام`, `خلال 5 دقائق`).
- **Instrumental Precision**: Use the instrumental Baa `بـ` or direct context (`بالضغط هنا`, `في الإعدادات`), not calqued mediators (`من خلال`, `عبر`).
- **Direct Superlatives**: Use authentic `أَفْعَل` forms (`الأسرع`, `الأكفأ`, `الأضمن`), not periphrastic calques (`الأكثر سرعة`, `الأكثر كفاءة`).
- **Coordinated Annexation**: Annex the first noun to the genitive and suffix a pronoun to the second (`عرض البيانات وتعديلها`), not double construct (`عرض وتعديل البيانات`).
- **Errors & Incapacity**: Use affirmative incapacity verbs (`تعذّر الاتصال`, `لم نتمكن من الحفظ`), not literal failure calques (`فشل في الاتصال`).
- **Polite Noise**: Drop ceremonial filler (`يرجى`, `الرجاء`) in everyday interactive microcopy. Politeness in software is clarity and speed (الجاحظ: *إجاعة اللفظ وإشباع المعنى*).

*(For complete 60+ term lookup mappings and syntactic breakdowns, inspect [references/aranjiya-glossary.md](references/aranjiya-glossary.md))*

---

## 3. Counting, Pluralization & Typography Rules

### 3.1 The 6 Plural Categories (CLDR)
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

### 3.2 Typography, Connectors & BiDi
- **The Conjunction Waw (`و`)**: Connects directly to the following word with **zero whitespace** (`الملفات والمجلدات`).
- **Punctuation Glyphs**: Use Arabic comma `،` (`U+060C`), semicolon `؛` (`U+061B`), and question mark `؟` (`U+061F`). Never precede with a space.
- **Quotation Marks**: Use Arabic chevron quotation marks `« »` for quotes and citations in prose and articles.
- **Neutral Character BiDi Isolation**: Neutral characters (`/`, `-`, `:`) between numbers reverse in RTL (`2 GB / 10 GB` flips to `10 GB / 2 GB`). Wrap expressions with `<bdi>` or `<span dir="ltr">`.

---

## 4. Binary Completion Checklist

Before completing any Arabic UI, copywriting, or article task, verify:

### For All Writing (UI & Articles):
- [ ] Completed system actions and past events use native passive (`حُذف`, `أُطلق`) without `تم + مصدر`.
- [ ] Possessive forms use attached suffixes (`حسابك`, `فكرتك`) without `الخاص بك`.
- [ ] Adverbs use direct accusative form (`تلقائيًا`) without `بشكل + صفة`.
- [ ] Durations drop intrusive prepositions (`صالح 7 أيام`, not `لمدة 7 أيام`).
- [ ] Instrumental actions use direct Baa or context (`بالضغط هنا`), avoiding `من خلال` and `عبر`.
- [ ] Direct superlatives use (أَفْعَل) form (`الأسرع`, `الأكفأ`) instead of `الأكثر + مصدر`.
- [ ] Coordinated annexation attaches pronoun to the second noun (`عرض البيانات وتعديلها`, not `عرض وتعديل البيانات`).
- [ ] Warnings never use `لا يجب` for prohibitions; use direct negative imperative (`لا تُغلق الصفحة`).
- [ ] Events and status omit pseudo-existential `هناك` (`حدث خطأ`, not `هناك خطأ`).
- [ ] Modes and roles avoid intrusive `كـ` (`حفظ في المسودات`, not `حفظ كمسودة`).
- [ ] Direct verbs replace copula `كن + صفة` (`احذر`, `تأكد`, not `كن حذرًا`).
- [ ] Dual (المثنى) is used for 2 items (`ملفان` / `ملفين`), never `2 ملف`.
- [ ] Plural counters account for 3–10 (`ملفات`) and 11–99 (`ملفًا`).
- [ ] Conjunction Waw `و` attaches directly to the succeeding word with zero whitespace.
- [ ] Arabic punctuation marks (`،`, `؛`, `؟`) are used with no leading space.

### For UI / Frontend Specifically:
- [ ] Buttons and action triggers use **المصدر** (`حفظ`, `تعديل`), never imperative verbs.
- [ ] Form instructions and hints use **فعل الأمر** (`أدخل`, `اختر`), without `قم بـ` or `يرجى`.
- [ ] Neutral characters between numbers (`/`, `-`) are isolated with `<bdi>` or `dir="ltr"`.
- [ ] Interactive trailing inputs (password visibility toggle) use `inset-inline-end`, not physical `right`.

### For Articles & Long-Form Writing Specifically:
- [ ] Paragraphs and sentences lead with active verbs (الجملة الفعلية) rather than auxiliary constructs (`قامت بـ`).
- [ ] Empty transitional openers (`من الجدير بالذكر أن`, `لا شك في أن`) are eliminated.
- [ ] Foreign translation clichés (`يلعب دورًا`, `يسلط الضوء على`) are replaced with direct Arabic phrasing.
- [ ] Arabic chevron quotes `« »` are used for quoted speech, book titles, and citations.
- [ ] Every sentence adheres to Al-Jahiz's density principle: *«إجاعة اللفظ وإشباع المعنى»*.
