---
name: component-review
description: Temporary. Quality review of one moduix component across every shipped adapter (CSS Modules and Tailwind for each framework), compared with Ark UI, Chakra UI, and shadcn, with an optional fix mode for objective findings. Use when asked to review, audit, or review-and-fix a single component.
---

# Component Review (temporary)

Review **one** component family across every shipped adapter and write a report. Two modes:

- **review** (default): read-only. Do not edit source, styles, tests, docs, registries, or configs.
- **fix**: when the request says to fix, correct, or apply ("отревьюй и поправь"). Write the report
  first, then apply only the objective findings described in [Fix mode](#fix-mode). Everything
  else stays in the report for the maintainer to decide.

Temporary: delete this skill when the component review round is finished.

## Input

- Mode: `review` unless the request asks for fixes.
- Component slug, for example `accordion`. If none is given, ask for one; do not review several
  components in one run.
- Report language: the language the maintainer used in the request (Russian by default).

## Output

One file: `audits/<slug>.md` (the directory is gitignored). Overwrite a previous report for the same
slug. In the chat, return only the verdict and the top 3–5 findings with a link to the file.
Finished reports from earlier rounds live in `audits/`; read one before starting to match the depth
and tone, and reuse its "Library-wide" section instead of rediscovering the same issues.

## Procedure

1. **Run the parity script** from the repository root:
   `node .agents/skills/component-review/scripts/parity.mjs <slug>`. It lists adapters and files
   with correct line counts, CSS Modules byte parity, Tailwind class-string parity across
   frameworks (all quote styles, Vue templates included), hard-coded user-facing labels, browser
   test titles per adapter, and which adapters have `<slug>.md`. Paste its key facts into the report.
   `scripts/tw-css.mjs '<class>' ...` prints the CSS Tailwind emits for a class with the moduix
   theme; use it whenever a finding depends on a media query, selector, or specificity.
2. **Read every source file in full**, all adapters. Do not sample one adapter and infer the rest.
   Imports through `@/lib/moduix/*` resolve to `packages/<adapter>/src/internal/*` (see the
   package `tsconfig.json`); read the shared internals the component uses (portals, close button,
   labels, icons), but review only how this component uses them.
3. **Compare CSS Modules with Tailwind by meaning, not by text.** The script cannot do this. Walk
   each CSS rule and find its Tailwind counterpart; see
   [references/checklist.md](references/checklist.md#css-modules-versus-tailwind).
4. **Check the docs examples** in `website/src/components/examples/<slug>/` (and `snippets/`) to see
   how the component is actually used. Styling or API that no example uses is a candidate for
   removal; an example that has to override a default to work points at a bad default. If the
   component has sugar parts, one example must still build it fully from low-level parts; see
   [references/checklist.md](references/checklist.md#docs-and-contract).
5. **Research upstream** with the `research-upstream-libraries` skill. Docs pages often omit the
   implementation, so also read source:
   - shadcn: `https://ui.shadcn.com/r/styles/new-york-v4/<slug>.json` (full component source);
   - Chakra UI v3: the docs page lists props such as `size`, `placement`, `scrollBehavior`,
     `motionPreset` and mount defaults; read the recipe source on GitHub if styling details matter;
   - Ark UI: the docs page for anatomy, defaults, and data attributes.
     Record URLs and the access date. If a source is unavailable, say so; do not fill gaps from memory.
6. **Walk the checklist** in [references/checklist.md](references/checklist.md). Every finding needs
   evidence: `file:line`, a command output, or an upstream URL. A visual conclusion drawn from CSS
   without rendering is marked "по CSS" (or "from CSS" in English); render it in a playground story
   when you can, and say which you did.
7. **Write the report** using the template below.

## Judgement rules

- moduix is a thin, pre-styled Ark wrapper with a flat API (see `AGENTS.md`). Judge against that
  goal, not against a different library design. Do not recommend compound `Component.Part` APIs or
  hiding parts that the component-local `<slug>.md` agent notes deliberately keep explicit.
- "Overengineering" means cost without user value: tokens nobody will override, styling for rare
  modes or for paths the docs never use, duplicated sources of truth, wrapper logic that
  re-implements Ark. Name the concrete thing to remove and what it would cost a user.
- Resolve upstream disagreements the way `research-upstream-libraries` says: Ark behavior first,
  Chakra ergonomics second, shadcn for convenience and migration friction.
- Separate **bugs** (wrong behavior today, including a bad default that every user hits) from
  **design opinions**. Never present an opinion as a bug.
- Every default moduix changes relative to Ark (for example `lazyMount`) must be documented and
  tested; a missing test or doc is a finding.
- Also list what is good and should stay, so a later fix task does not remove it.
- Put issues that repeat across components in "Library-wide" and keep them short there; do not
  re-argue them per component.
- Before stating a count ("all examples", "N variables"), get it from a command and keep the command
  output in your notes.

## Report template

```markdown
# Ревью <Component> (moduix <version>)

Просмотрено: <paths>. Источники: <Ark URL>, <Chakra URL>, <shadcn URL> (дата).
<One line on what was rendered versus inferred from CSS.>

## Итог

<3–5 sentences: overall quality, where complexity sits, the 2–3 most important changes.>

## Что сделано хорошо

## Сравнение с Chakra UI и shadcn/ui

<table: parts in a typical usage, built-in versus explicit parts, default icon/visuals, semantics,
variants/sizes/placement, scrolling, animation, mount defaults, theming, narrow screens>

## Баги

<numbered; each: what, evidence, affected adapters, suggested fix>

## Оверинжиниринг и лишнее

## Чего не хватает

## Что не трогать

## Library-wide

## Приоритеты

<ordered list, bugs first>
```

## Fix mode

Run the whole review first and write the report. Then sort every finding into one of two groups and
record the group in the report.

**Fix now** (objective, no public contract change):

- bugs: behavior or layout that is wrong today with default usage;
- parity drift between adapters or between CSS Modules and Tailwind (hard-coded values where a
  token exists, different animations, different reduced-motion strategy, several sources for the
  same label);
- stale or contradicting component-local docs (`<slug>.md`) and missing tests for behavior the
  wrapper already promises (changed Ark defaults, classes, slots).

Before fixing a "drift" finding, check whether the library does the same thing everywhere
(`grep -rho '<utility>' packages/<adapter>/src/components | sort | uniq -c`). A pattern used in
dozens of components (Tailwind `opacity-50`, Tailwind packages without `a11yLabels`) is a
library-wide convention: do not change it in one component; list it under "Library-wide". When
fixing a real drift, copy the library's existing pattern (for example
`[@media(hover:hover)]:[&:not([data-disabled]):hover]:` in Tailwind) instead of inventing one.

**Needs a decision** (leave in the report under "Ждёт решения"):

- removing or renaming public parts, props, exports, or CSS variables;
- changing default visuals (icons, fills, sizes, motion) beyond fixing a defect;
- new features (variants, sizes, new parts);
- anything listed under "Library-wide".

If a fix needs a decision to be done well, apply the smallest correct fix and note the better
option under "Ждёт решения".

How to apply fixes:

1. Follow `component-workflow`, the matching `conventions-*` skills, `conventions-css`, and
   `conventions-tests`. Change every affected adapter in the same run; never fix one adapter only.
2. Keep public names, CSS variables, and defaults intact unless the fix itself is the default (for
   example removing a `max-height` that makes content spill).
3. Add or adjust tests in every adapter for each bug fixed, assertion-for-assertion by behavior.
   Prove each new test is meaningful: stash the source changes (`git stash push -- packages/*/src
packages/foundation`), run the tests, confirm they fail, then `git stash pop`. A test that passes
   on the old code does not cover the bug; redesign it (Dialog: a footer test with fixed-width
   buttons passed on old code because flex items shrink; real labels exposed the overflow).
   Layout bugs are testable in browser mode with `getBoundingClientRect()`; allow 1px for subpixel
   rounding. A CSS-only fix that a browser test cannot observe (hover media, reduced motion) is
   verified with `scripts/tw-css.mjs` or by reading the CSS, and the report says so.
   Framework test idioms differ: Solid `asChild` takes a render function, so use a plain trigger in
   Solid tests.
4. Update `<slug>.md`, the docs page, `variables-moduix.css`, and stories only where the fixed
   behavior is described there. `website/docs/public/r` is generated and gitignored.
5. Validate from the repository root: `pnpm run fmt:fix`, `pnpm run lint:check`,
   `pnpm run tsc:check`, focused tests for the component in every changed package (for example
   `pnpm --filter @moduix/<adapter> test <slug>`), and `pnpm run build:registry` if
   registry-shipped sources changed. Re-run `scripts/parity.mjs <slug>` and confirm parity holds.
6. Do not commit. Leave the changes in the working tree for the maintainer.
7. Add an "Исправлено" section to the report: each fix with files and the check that proves it, and
   the validation results. In the chat, list what was fixed and what waits for a decision.

### Applying "Needs a decision" items

When the maintainer approves the "Ждёт решения" list ("сделай всё, что предлагаешь"), apply it in a
second round on top of the first and add an "Исправлено, раунд 2" section. Extra rules for that round:

- Before removing a CSS variable family, search the docs pages for it (`grep -rn '<prefix>'
website/docs`). A family documented as a library mechanism (Dialog `--moduix-dialog-content-*`
  in "Animations" → "Add a local exception", shared with Popover, Select, Navigation Menu) stays;
  report it as a library-wide question instead.
- Before removing a pattern from one component, grep sibling components for the same pattern
  (Dialog native trigger styles also exist in Drawer and Popover) and report the new inconsistency.
- Mark each change that alters default visuals or removes public API as **breaking** or **меняет
  внешний вид** in the report.
- New props follow the library pattern: a prop with a default, mirrored as `data-<prop>`, styled
  with `&[data-<prop>='…']` in CSS Modules and `data-[<prop>=…]:` in Tailwind, types exported as in
  `Switch` (`SwitchSize`). Private per-variant values use `--_<component>-*` custom properties.
- Removing a variable updates `variables-moduix.css`, `website/src/components/examples/<slug>/
css-properties.tsx`, `<slug>.md`, and every docs language (`website/docs/{en,ru,fr}`).
- A shared internal file new to a package (for example `a11yLabels.ts` in Tailwind packages) also
  needs a registry item and `registryDependencies` on every item that imports it; then
  `build:registry`.
- After many-component edits run the full test suite of every changed package, not only `<slug>`.

Browser-test pitfalls seen in round 2:

- `@rstest/browser` locators have no `.element()`; read DOM nodes with `document.querySelector`.
- `element.click()` does not toggle an Ark accordion trigger; use `await locator.click()`.
- `getBoundingClientRect()` includes transforms: a parent dialog scales when a nested dialog opens.
  Use `offsetWidth`/`offsetHeight` for layout sizes.
- Tailwind v4 `rotate-*` sets the `rotate` property, CSS Modules usually set `transform`; check
  both when asserting a turned icon.