# Production Review Checklist

Use this checklist as a working ledger for one component. Mark non-applicable items rather than
silently skipping them. Keep the ledger in working notes; do not add a permanent audit file unless
the user requests one.

## Contents

1. Baseline inventory
2. Primitive integrity
3. Competitive comparison
4. Moduix composition and sugar
5. Design and responsive polish
6. Stories and tests
7. Documentation page
8. Decision matrix
9. Completion evidence

## 1. Baseline Inventory

- [ ] Identify the component directory and every implementation file.
- [ ] Identify CSS Modules, shared styles, recipes, icons, and utilities.
- [ ] Identify package barrels and public exports.
- [ ] Identify stories and tests, including interaction or visual coverage.
- [ ] Read the component-local markdown and changelog.
- [ ] Identify the registry manifest entry and registry-safe dependencies.
- [ ] Identify the Rspress page, all `tsx preview` fences, imported snippets, and snippet styles.
- [ ] Inspect sibling components for established API and design conventions.
- [ ] Record the current simple path, advanced path, and existing moduix sugar.
- [ ] Check the worktree and preserve unrelated user changes.

## 2. Primitive Integrity

### Anatomy and React contract

- [ ] Preserve the required Ark parts and their semantic order.
- [ ] Preserve controlled and uncontrolled behavior plus default values.
- [ ] Preserve callback detail objects without translating their shape.
- [ ] Preserve refs against the actual rendered part.
- [ ] Preserve `asChild` and require one semantic child where applicable.
- [ ] Preserve provider, root-provider, context, and state hooks.
- [ ] Preserve `ids`, lazy mounting, unmount behavior, and presence controls.
- [ ] Preserve native form participation, reset, validity, `name`, `form`, and hidden controls.
- [ ] Preserve useful Ark and moduix data attributes and CSS variables.

### Accessibility and interaction

- [ ] Verify accessible names, descriptions, errors, and relationships.
- [ ] Verify keyboard navigation, activation, escape, roving focus, and typeahead as applicable.
- [ ] Verify initial focus, focus trap, focus return, outside interaction, and nested overlays.
- [ ] Verify disabled, read-only, required, and invalid semantics.
- [ ] Verify pointer and touch interaction without removing keyboard behavior.
- [ ] Verify portal behavior, stacking, scroll locking, and inert or aria-hidden handling as applicable.
- [ ] Check RTL and locale-sensitive direction where the primitive supports it.

### CSS and animation safety

- [ ] Compare local selectors with Ark's documented `data-scope`, `data-part`, and state attributes.
- [ ] Identify styles that override Ark-owned inline styles or runtime variables.
- [ ] Audit `display`, `visibility`, `opacity`, `pointer-events`, and presence-related rules.
- [ ] Audit `position`, inset, transform, transform origin, translate, and scale.
- [ ] Audit inline and block sizing, min/max constraints, overflow, containment, and viewport units.
- [ ] Audit breakpoint rules for different initial transform or placement states.
- [ ] Audit opening and closing keyframes against Ark `data-state` and presence lifecycle.
- [ ] Verify animation end state, fill mode, interrupted transitions, and rapid reopen.
- [ ] Verify reduced-motion behavior without breaking mount or unmount.
- [ ] Ensure directional variants start and finish on the correct physical or logical side.

### Integration and delivery safety

- [ ] Keep public types aligned with the real rendered elements and primitive props.
- [ ] Keep exports, `data-slot`, `className`, style props, and theming hooks consistent with siblings.
- [ ] Verify valid DOM nesting and avoid redundant wrapper elements.
- [ ] Verify SSR and hydration safety for browser-only state, generated ids, portals, and media queries.
- [ ] Avoid reimplementing primitive state or effects that Ark already owns.
- [ ] Keep component imports registry-safe and avoid workspace-only dependency leakage.
- [ ] Check that the registry item includes every new source file and dependency.
- [ ] Check performance only for observed render, layout, or event-listener problems; do not add speculative memoization.

## 3. Competitive Comparison

Use live primary sources and record URLs plus the access date.

### Ark UI

- [ ] Read the exact component page and relevant guides.
- [ ] Compare anatomy, required parts, props, events, state, accessibility, and CSS variables.
- [ ] Compare presence, positioning, measurement, animation, and form behavior where applicable.
- [ ] Inspect current source when the docs do not explain a critical behavior.

### Chakra UI

- [ ] Confirm whether a matching current component exists.
- [ ] Inspect current docs and source or recipe implementation.
- [ ] Compare advanced composition, provider/context usage, defaults, variants, and overlay ergonomics.
- [ ] Identify ideas that stay Ark-shaped and match moduix conventions.
- [ ] Record ideas rejected because they add configuration, hide Ark, or break compatibility.

### shadcn

- [ ] Confirm whether a matching current component exists.
- [ ] Inspect the current docs, examples, and registry source.
- [ ] Compare the recommended simple path, default styling, variants, icons, and example flow.
- [ ] Identify repeated consumer work that a small moduix convenience could remove.
- [ ] Record ideas rejected because they narrow behavior or transplant shadcn anatomy.

Never treat competitor parity as a requirement by itself. Require a concrete moduix user benefit.

## 4. Moduix Composition and Sugar

### Simple path

- [ ] A consumer can complete the common task with one obvious composition.
- [ ] The visible root uses `<Component>`, not `<Component.Root>`.
- [ ] Defaults are safe, accessible, attractive, and consistent with sibling components.
- [ ] Common labels, descriptions, actions, or icons do not require avoidable ceremony.
- [ ] The simple path does not hide important state or form behavior.

### Advanced path

- [ ] Namespaced parts remain composable.
- [ ] Provider/context/state hooks remain usable where Ark exposes them.
- [ ] Consumers can control state and placement without wrapper-specific translations.
- [ ] `asChild`, refs, custom triggers, portals, and custom positioning remain available as applicable.
- [ ] Advanced composition uses the same underlying contract as the simple path.

### Sugar acceptance test

Add or expand sugar only when every answer is yes:

- [ ] Does it solve a frequent, concrete consumer task?
- [ ] Is it smaller and clearer than composition alone?
- [ ] Does it preserve Ark behavior and the advanced escape hatch?
- [ ] Is it consistent with at least one related moduix component?
- [ ] Can it be documented in one short example and tested directly?

## 5. Design and Responsive Polish

- [ ] Typography, spacing, radii, borders, shadows, and color use existing moduix tokens.
- [ ] Icons match the library's size, weight, alignment, and accessible-label conventions.
- [ ] Visual hierarchy makes the primary action and content immediately clear.
- [ ] Hover, active, focus-visible, selected, disabled, invalid, loading, and destructive states are complete.
- [ ] Interactive targets remain usable on touch screens.
- [ ] Long labels, descriptions, validation text, and localized content wrap safely.
- [ ] Narrow viewports do not clip actions, content, focus rings, or dismiss controls.
- [ ] Desktop layout does not merely scale up a mobile compromise.
- [ ] Content overflow and viewport-constrained height remain usable.
- [ ] Zoom and text scaling do not hide essential controls.
- [ ] Light and dark themes have intentional contrast and elevation.
- [ ] Reduced motion keeps the state change understandable.
- [ ] The component feels related to moduix siblings rather than copied from an upstream.

For responsive or animated components, inspect computed styles at each transition stage. A correct
static screenshot does not prove a correct primitive integration.

## 6. Stories and Tests

- [ ] Keep or add a basic recommended-composition story.
- [ ] Cover controlled state and callbacks when supported.
- [ ] Cover provider/context or advanced composition when public.
- [ ] Cover disabled, invalid, loading, or destructive behavior when relevant.
- [ ] Add a regression test for every confirmed behavior bug.
- [ ] Test semantic output and user interaction instead of implementation details.
- [ ] Cover native form behavior when the component participates in forms.
- [ ] Cover opening/closing presence and direction when animation logic changed.
- [ ] Avoid snapshots that obscure the contract under review.

## 7. Documentation Page

### Page copy

- [ ] Read every paragraph, heading, callout, table, and code comment.
- [ ] Keep the introduction short, concrete, and accurate.
- [ ] Teach the recommended simple path before advanced composition.
- [ ] Explain when an advanced path is useful instead of listing APIs mechanically.
- [ ] Replace root prose such as `Component.Root` with `Component`.
- [ ] Mention a `.Root` alias only in an unavoidable compatibility note.
- [ ] Explain intentional moduix sugar and differences without competitor marketing.
- [ ] Remove stale, duplicated, vague, or implementation-inaccurate guidance.
- [ ] Keep frontmatter title and description accurate and useful in search.

### Examples

- [ ] Every heading has an example that demonstrates exactly that concept.
- [ ] Every runnable example imports the shipped component from `moduix`.
- [ ] The root is `<Component>` in every consumer-facing snippet.
- [ ] Snippets are complete, short, runnable, and free of hidden essential setup.
- [ ] Simple and advanced paths are visibly distinct.
- [ ] Controlled examples show the value and Ark detail callback accurately.
- [ ] Accessibility-relevant labels and descriptions appear in the code.
- [ ] Example-only fixtures are realistic but minimal.
- [ ] Obsolete and near-duplicate examples are removed.

### Preview migration

- [ ] Inspect every `tsx preview` fence and its direct snippet root.
- [ ] Put `PreviewFrame` only around the fence in MDX.
- [ ] Move docs-only width limits out of copied TSX and CSS.
- [ ] Preserve layout CSS that genuinely demonstrates the component.
- [ ] Use `PreviewMeta` only for docs-only actions and result feedback.
- [ ] Use moduix `Button` for auxiliary actions.
- [ ] Put labelled native `<output>` before auxiliary actions.
- [ ] Keep the four-backtick MDX fence structure required by the migration skill.

## 8. Decision Matrix

Use a compact table in working notes:

| Area                    | Current moduix | Ark constraint    | Chakra insight          | shadcn insight          | Decision                          |
| ----------------------- | -------------- | ----------------- | ----------------------- | ----------------------- | --------------------------------- |
| Behavior/API/style/docs | Observed fact  | Required contract | Applicable idea or none | Applicable idea or none | Fix, improve, preserve, or reject |

For each implemented change, retain the observed failure and the evidence that supports the fix.
For each rejected upstream idea, state the moduix reason in one sentence.

## 9. Completion Evidence

- [ ] Targeted tests pass.
- [ ] Repository validation from `AGENTS.md` passes in the required order.
- [ ] Registry output is regenerated and inspected when shipped source changed.
- [ ] The real docs page renders every edited preview.
- [ ] Visual states and transitions pass at the recorded viewports when visual inspection is authorized.
- [ ] The final diff contains no unrelated edits or stale generated output.
- [ ] Final handoff lists fixes, preserved differences, rejected ideas, visual coverage, validation, and blockers.
- [ ] Primary comparison sources are linked.
- [ ] Temporary skill cleanup is performed only after every completion gate passes.