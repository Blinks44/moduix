---
name: component-release-readiness
description: Use when a named moduix component must be audited, polished, or prepared for release across API, composition, Ark behavior, styling, tokens, tests, stories, docs, localization, and registry output.
---

# Component Release Readiness

Bring one named component to a defensible release-ready state. The goal is not abstract perfection or parity by
feature count: make the component understandable, accessible, attractive, easy to compose, and easy to theme while
keeping its API recognizably moduix.

## Invocation contract

- The user supplies a component name, such as `Badge`, `Select`, or `Date Picker`.
- Resolve every consumer-facing surface for that component before editing. Ask only if the name maps to multiple
  unrelated components.
- Default to audit **and implementation**. Do not stop after listing findings when safe, scoped fixes can be made.
- Keep the scope on the named component and directly coupled shared contracts. Do not turn the task into a library-wide
  redesign.
- A changeset is out of scope unless the user explicitly requests one.

## Load the supporting skills

Always apply `engineering-principles`, `ui-component-workflow`, `js-react-conventions`, `css-authoring`,
`upstream-library-docs`, `local-component-docs`, `docs-workflow`, and `rstest-best-practices`.

Also apply:

- `rspress-localization` when the component has localized docs;
- `rspress-description-generator` when adding a page or changing description frontmatter;
- Rspress or Rslib skills only when their configuration is actually involved.

Those skills own their technical rules. This skill owns the cross-surface audit order and release decision.

## Definition of release ready

A component is release ready only when:

1. Its recommended composition is obvious and the lower-level escape hatch remains available.
2. Ark behavior, semantics, keyboard interaction, refs, state, forms, and lifecycle are preserved where applicable.
3. Public styling hooks and CSS variables cover meaningful parts, variants, sizes, and states without requiring
   selector fights or global overrides.
4. Defaults are visually coherent with moduix and hold up across realistic content and interaction states.
5. Tests and stories cover the public contract and important edge cases.
6. Consumer docs teach the happy path, composition, primary use cases, and complete styling contract in clear language.
7. Package exports, local docs, public docs, localized docs, examples, and registry artifacts agree.

Use [the release audit checklist](references/release-audit.md) as the completion gate.

## Workflow

### 1. Map the component contract

Read the implementation, styles, tests, stories, local markdown, package exports, public docs, localized docs,
snippets, CSS-variable reference files, and registry entries. Record the current parts, props, variants, sizes,
states, variables, accessibility behavior, and recommended composition.

Identify existing consumer contracts before changing them. Treat renames, removed variables, changed defaults, and
different DOM composition as migration decisions, not cleanup.

### 2. Compare upstream intentionally

Use current online sources and record their URLs and access date in working notes:

- Ark UI for primitive behavior, accessibility, state, lifecycle, and part anatomy;
- Chakra UI for Ark-aligned ergonomics, recipes, and composition;
- shadcn/ui for discoverability, concise examples, visual expectations, and small convenience patterns.

Create a short comparison matrix of useful differences. Classify each difference as:

- **required correctness** — Ark or accessibility behavior that must be fixed;
- **consumer friction** — a moduix usability or theming gap worth fixing;
- **optional sugar** — useful, low-complexity convenience;
- **intentional difference** — moduix should remain distinct;
- **rejected complexity** — not worth the API, maintenance, or bundle cost.

Do not copy an upstream API or appearance wholesale. Preserve Ark semantics, prefer Chakra-like Ark-shaped ergonomics,
and use shadcn only as evidence of consumer expectations.

### 3. Audit before editing

Audit the named component with the reference checklist. Prioritize findings:

- **P0:** accessibility, semantic, data-loss, form, lifecycle, or broken-contract issue;
- **P1:** release-blocking composition, styling, token, docs, test, or registry gap;
- **P2:** optional ergonomics or visual refinement.

Fix P0 and P1 findings. Implement P2 only when it is non-breaking, small, clearly useful, and does not hide Ark
behavior. Otherwise report it as a concrete proposal with benefit, cost, and API sketch.

### 4. Implement the complete slice

Make the smallest coherent change across all affected surfaces. In particular:

- keep composition explicit and discoverable;
- preserve refs, `asChild`, state attributes, native controls, providers, and context contracts where relevant;
- expose stable `data-slot` and public CSS-variable hooks for meaningful customization;
- give each visually distinct variant or state an independent semantic override path;
- preserve a component-wide override only when it is also useful;
- update variable reference sources and docs whenever the public token contract changes;
- add focused behavior tests and stories/examples for meaningful variants and edge cases;
- synchronize exports and regenerate registry artifacts when the shipped registry contract changes.

Do not create a public variable for every declaration. A variable is justified when consumers reasonably need to
theme a semantic visual decision without replacing the component CSS.

### 5. Make the docs teach the component

Write for a consumer seeing the component for the first time:

- explain what it is and when to use it in direct, grammatical language;
- lead with the recommended happy path;
- show anatomy and explain when lower-level composition is useful;
- include the major realistic examples, not permutations for their own sake;
- document behavior that is not obvious from types;
- list the complete public styling contract, including variant- and state-specific variables;
- keep English and localized pages structurally and semantically aligned.

Every snippet must be copyable, public-API-only, and consistent with the current implementation.

### 6. Apply the release gate

Run focused tests and the repository-required validation from `AGENTS.md`. Run registry generation when relevant.
Re-read the final implementation and docs against the checklist; passing commands alone is not sufficient.

Do not call the component release ready while a P0 or P1 item remains. If blocked, name the exact blocker and avoid a
success-shaped conclusion.

## Final handoff

Lead with whether the component is release ready. Summarize:

1. the meaningful API, behavior, styling, and documentation improvements;
2. any intentional differences from Ark, Chakra, or shadcn;
3. remaining P2 proposals that require a product decision.

Do not dump the full audit when all findings were resolved. Surface only decisions and residual risk useful to the
maintainer.