---
name: component-review
description: Temporary. Read-only quality review of one moduix component across every shipped adapter (CSS Modules and Tailwind for each framework), compared with Ark UI, Chakra UI, and shadcn. Use when asked to review or audit a single component.
---

# Component Review (temporary)

Review **one** component family across every shipped adapter and write a report. This skill is
read-only: do not edit source, styles, tests, docs, registries, or configs. Fixes happen in a
separate task after the maintainer picks what to do.

Temporary: delete this skill when the component review round is finished.

## Input

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
2. **Read every source file in full**, all adapters. Do not sample one adapter and infer the rest.
   Imports through `@/lib/moduix/*` resolve to `packages/<adapter>/src/internal/*` (see the
   package `tsconfig.json`); read the shared internals the component uses (portals, close button,
   labels, icons), but review only how this component uses them.
3. **Compare CSS Modules with Tailwind by meaning, not by text.** The script cannot do this. Walk
   each CSS rule and find its Tailwind counterpart; see
   [references/checklist.md](references/checklist.md#css-modules-versus-tailwind).
4. **Check the docs examples** in `website/src/components/examples/<slug>/` (and `snippets/`) to see
   how the component is actually used. Styling or API that no example uses is a candidate for
   removal; an example that has to override a default to work points at a bad default.
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