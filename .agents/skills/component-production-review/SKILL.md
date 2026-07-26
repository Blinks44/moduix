---
name: component-production-review
description: Complete an implementation-bearing production review of one moduix React component and its matching Rspress documentation page. Use when Codex must compare the current implementation with live Ark UI, Chakra UI, and shadcn sources; preserve and improve moduix sugar; verify simple and advanced composition paths; find primitive-breaking CSS or behavior; polish design and responsive interactions; rewrite docs and examples; migrate previews; implement justified fixes; and validate package, docs, and registry parity.
---

# Component Production Review

Take one component from its current state to a production-ready moduix result. Finish with working
code, synchronized documentation, verified behavior, and a concise decision record. Do not stop at
an audit or a list of recommendations unless the user explicitly requests a read-only review.

## Read First

Read [the review checklist](references/review-checklist.md) completely and use it as the working
completion ledger. Then read the applicable project skills in this order:

1. `../engineering-principles/SKILL.md`
2. `../css-authoring/SKILL.md` when CSS or CSS Modules are in scope
3. `../js-react-conventions/SKILL.md` for JS or TS work
4. `../rstest-best-practices/SKILL.md` when tests are created or changed
5. `../upstream-library-docs/SKILL.md`
6. `../ui-component-workflow/SKILL.md`
7. `../local-component-docs/SKILL.md` when component-local markdown changes
8. `../cross-package-sync/SKILL.md`
9. `../docs-workflow/SKILL.md`
10. `../rspress-best-practices/SKILL.md`
11. `../preview-frame-migration/SKILL.md`

Treat `AGENTS.md` as the source of truth for repository rules and validation. Do not duplicate or
weaken its requirements here.

## Operating Contract

- Review exactly one component family and its directly related package, story, test, registry, and
  documentation surfaces.
- Resolve the target from the request. If no single component can be inferred, ask one concise
  question before editing.
- Preserve the existing public API and useful moduix sugar by default. Ask before an intentional
  breaking change, even when an upstream library uses a different contract.
- Fix confirmed defects and low-risk, evidence-backed gaps in the same task. Keep speculative ideas
  out of the implementation and report only the valuable ones.
- Derive ideas from competitors, but do not copy their code, anatomy, naming, or visual treatment
  wholesale. The result must remain recognizably moduix.
- Do not create a changeset unless the user explicitly asks for one.
- Do not start a dev server. Use the existing project server.
- Treat explicit invocation for a full visual production review as a request for browser-based
  visual inspection. Otherwise follow the browser authorization rule in `AGENTS.md`.

## Phase 1: Establish the Baseline

Inventory the complete target surface before changing anything:

- component implementation, styles, exports, stories, and tests
- component-local markdown and changelog
- registry manifest entry and registry-shipped dependencies
- Rspress page, every imported preview snippet, and example-local styles
- related components whose established API or design language constrains the target

Record the current public contract, Ark anatomy, controlled and uncontrolled paths, refs, callbacks,
provider and context surfaces, `asChild`, native form participation, data attributes, CSS variables,
and existing convenience APIs. Distinguish intentional moduix behavior from accidental drift.

Reproduce reported bugs first. For visual or responsive defects, capture the failing viewport,
state transition, interaction, and relevant computed styles so the fix has a concrete baseline.

## Phase 2: Research Current Upstreams

Use `upstream-library-docs` and browse current primary sources. Inspect actual implementation or
registry source where available, not only screenshots or prose.

- Use Ark UI as the authority for primitive behavior, accessibility, anatomy, state, presence,
  positioning, measurement, form behavior, and runtime CSS variables.
- Use Chakra UI to evaluate Ark-aligned advanced composition, recipe defaults, overlay ergonomics,
  and higher-level APIs.
- Use shadcn to evaluate the simple path, focused convenience APIs, visual polish, example clarity,
  and migration friction.
- If an equivalent does not exist, record that fact and continue from the remaining sources and
  established moduix patterns.

Keep source URLs and the access date in working notes. Resolve conflicts in this order:

1. Ark behavior and accessibility
2. the compatible moduix public contract and existing useful sugar
3. consistency with related moduix components and design tokens
4. Chakra ergonomics that remain Ark-shaped
5. shadcn convenience and presentation ideas

## Phase 3: Decide What Changes

Build a compact evidence matrix from the checklist. Classify every finding as:

- **Defect** — violates Ark, accessibility, the documented moduix contract, or expected responsive
  behavior; fix it.
- **Parity improvement** — a proven shadcn or Chakra idea that fits moduix without hiding Ark;
  implement it when the value is clear and the compatibility risk is low.
- **Intentional moduix difference** — useful local sugar or identity; preserve it and make the docs
  clearer when needed.
- **Speculation** — lacks a concrete user benefit or evidence; do not implement it.

Accept new sugar only when it shortens a common task, stays consistent with sibling components,
preserves the advanced Ark-shaped escape hatch, and can be explained and tested simply. Prefer one
excellent default over several configuration props.

## Phase 4: Implement the Production Fixes

Work from primitive integrity outward:

1. Repair anatomy, state, refs, callbacks, focus, forms, presence, positioning, and accessibility.
2. Remove or narrow CSS that overrides Ark-owned layout, transforms, measurements, or state.
3. Make responsive behavior and mount/unmount animation correct in every supported direction.
4. Preserve and refine the simple path, then verify the advanced compositional path.
5. Polish visual defaults using existing moduix tokens and neighboring components.
6. Add or update focused tests and stories for each meaningful behavior or regression.

For overlay-like components, inspect computed styles before opening, while opening, while open, while
closing, and after unmount. Test mobile and desktop separately. Pay special attention to `position`,
insets, transforms, block and inline sizing, overflow, transition or animation fill state, Ark
runtime variables, media queries, and direction-specific selectors. A visually plausible final
frame is not enough if the transition starts from the wrong side or bypasses Ark presence.

Keep the two consumer paths coherent:

- Teach a concise default composition with `<Component>` as the root.
- Keep namespaced parts, provider/context hooks, and low-level control available for advanced
  composition.
- Do not force two artificial APIs when the existing component already expresses both paths through
  the same composition. Improve clarity instead.

## Phase 5: Rewrite and Migrate the Documentation

Read the entire target page and every referenced snippet. Rewrite text when it is stale, vague,
mechanical, or harder to understand than the implementation.

- Lead with the recommended simple path and explain the advanced path after it.
- Use `<Component>` and `Component` for the root in visible code and prose. Do not teach
  `<Component.Root>`; mention that alias only when an exact compatibility note is unavoidable.
- Make each example prove the promise of its heading with the smallest production-like fixture.
- Keep runnable snippets complete, self-contained, consumer-facing, and aligned with the shipped
  package API.
- Remove duplicate, obsolete, or near-identical examples. Add missing examples only for an important
  behavior, composition path, or accessibility contract.
- Explain intentional moduix differences and useful sugar without marketing filler.
- Keep frontmatter, page structure, CSS-variable documentation, installation guidance, and local
  component markdown accurate.

Apply `preview-frame-migration` to every preview on the page. Keep `PreviewFrame` in MDX only; keep
docs-only width constraints out of copied TSX and CSS; and use `PreviewMeta` plus native `<output>`
for auxiliary actions and interaction results where required.

## Phase 6: Verify the Result

Run targeted tests while iterating, then run the current validation required by `AGENTS.md` in its
specified order. When registry-shipped source changes, regenerate the registry and inspect the
relevant artifact rather than assuming generation succeeded.

When visual inspection is authorized, verify at minimum:

- initial, hover, focus-visible, active, disabled, invalid, open, and closed states as applicable
- keyboard operation, focus movement and return, escape, outside interaction, and nested use
- narrow mobile, wider mobile, and desktop layout
- opening, closing, interrupted transitions, and reduced motion
- light and dark themes plus long content, overflow, zoom, and RTL where relevant
- both the simple and advanced examples on the real documentation page

Compare before and after at the same viewports. Re-open edited examples after formatting and builds
to catch preview compiler and generated-output regressions.

## Completion Gate

Do not call the component production-ready until:

- every confirmed Ark-contract or accessibility defect is fixed or explicitly blocked
- simple and advanced composition paths are coherent and documented
- existing sugar is preserved or intentionally improved
- responsive layout and interaction transitions pass
- visual states fit the moduix design system with no obvious unfinished edges
- stories, tests, local docs, site docs, snippets, exports, and registry output agree
- the target page uses the short root form and passes the preview migration contract
- all required validation succeeds

In the final handoff, summarize implemented fixes, intentional moduix differences, upstream ideas
that were deliberately rejected, visual scenarios checked, validation run, and any genuine blocker.
Link the current primary sources used for comparison.