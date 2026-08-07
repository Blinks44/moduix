# Component release audit

Use this checklist as a risk-based gate, not as a demand to add every possible feature. Mark non-applicable items
explicitly in working notes when their absence could otherwise be mistaken for an oversight.

## 1. API and composition

- The shortest recommended composition is easy to discover and copy.
- Part names, props, defaults, callback payloads, refs, and exports match the implementation and Ark contract.
- Advanced composition remains possible without bypassing accessibility or replacing internal state management.
- Convenience APIs remove recurring consumer ceremony rather than merely aliasing another API.
- `className`, `style`, `asChild`, `data-slot`, and forwarded refs behave consistently with adjacent moduix components.
- Default DOM output has no unnecessary wrappers, invalid nesting, duplicate IDs, or inaccessible interactive nesting.
- A non-breaking upgrade path exists for any changed public default or contract.

### Optional sugar gate

Add a convenience only when all answers are yes:

1. Does it solve a frequent, concrete task visible in upstream usage or local examples?
2. Is it materially clearer than explicit composition?
3. Can it be implemented without translating Ark state, events, or anatomy into a parallel system?
4. Does the lower-level path remain available?
5. Is the convenience independently stylable and testable?
6. Is its maintenance cost proportional to its value?

Otherwise keep the explicit composition or present the idea as a P2 proposal.

## 2. Behavior and accessibility

- Semantic role and native element choice fit every supported composition.
- Keyboard, focus order, focus restoration, disabled/read-only/invalid behavior, and pointer interaction are correct.
- Accessible name, description, error association, live-region behavior, and icon labeling are correct where applicable.
- Controlled and uncontrolled state, default values, reset, callbacks, and external state updates remain synchronized.
- Native form name, value, validity, submission, reset, hidden controls, and `form` ownership work where applicable.
- Open/close, mount/unmount, lazy mounting, portals, positioning, collision, and interrupted animation work where applicable.
- Provider/context APIs, generated IDs, explicit IDs, SSR, and hydration remain stable where applicable.
- Dynamic collections handle empty, disabled, duplicated, reordered, and asynchronously updated items where applicable.

## 3. Styling and token architecture

Build a small matrix for the component:

| Dimension | Examples                                                                  |
| --------- | ------------------------------------------------------------------------- |
| Part      | root, label, icon, indicator, content                                     |
| Variant   | default, secondary, destructive, outline                                  |
| Size      | sm, md, lg                                                                |
| State     | rest, hover, active, focus-visible, disabled, invalid, open, selected     |
| Property  | background, foreground, border, ring, shadow, spacing, radius, typography |

Only include dimensions the component actually supports. Use the matrix to detect shared variables that accidentally
force consumers to recolor unrelated variants or states.

### Variable fallback model

For a visual decision that needs both broad and targeted overrides, use this conceptual order:

```css
property: var(
  --moduix-component-property,
  var(--moduix-component-variant-property, var(--moduix-foundation-token))
);
```

State-specific decisions extend the semantic name, for example
`--moduix-component-destructive-bg-hover`. Follow established repository naming and ordering when it differs.

Check that:

- each visually distinct variant has independent background, foreground, and border hooks when those properties apply;
- meaningful interactive states can be themed without changing every variant;
- part-specific dimensions and colors can be customized without fragile descendant selectors;
- generic component-wide overrides still work when broad theming is useful;
- fallbacks end in stable foundation tokens or intentional literal values;
- public variable reference files, local markdown, and public docs list the exact same contract;
- no internal runtime Ark variable is republished or overridden without confirming its ownership;
- specificity stays low and consumers do not need `!important`;
- state selectors use stable attributes and interactive styles apply only to interactive renderings.

Avoid variable explosion. Do not expose implementation-only layout details, one-off intermediate values, or tokens
that have no plausible semantic consumer use.

## 4. Visual and content resilience

- Typography, spacing, radii, borders, shadows, and icon sizing align with moduix foundations.
- The component remains recognizably moduix rather than a visual copy of Chakra or shadcn.
- Contrast and focus indication remain clear across variants, themes, disabled states, and destructive states.
- Hover, active, focus-visible, selected, invalid, disabled, loading, open/closed, and reduced-motion states are
  deliberate where applicable.
- Long text, narrow containers, empty content, icons, leading/trailing parts, numeric content, and multiline content
  behave intentionally.
- RTL, zoom, high text scaling, touch targets, forced colors, and responsive layout are considered where relevant.
- Motion has a purpose, uses repository timing tokens, and has a reduced-motion path.

Visual review should include realistic examples, not only isolated ideal content.

## 5. Tests and stories

- Tests cover public defaults, variants or state behavior, ref forwarding, composition, and accessibility-critical paths.
- Regression tests capture every fixed P0/P1 bug that can be tested reliably.
- Interactive tests prefer user-observable behavior over internal implementation details.
- Stories show the recommended path, meaningful variants/sizes/states, content stress, and advanced composition.
- Stories and docs do not duplicate large permutation matrices unless each surface teaches something different.
- Snapshots are used only when the serialized public structure itself is the contract.

## 6. Consumer documentation

- The introduction answers what the component is, when to use it, and the nearest alternative if confusion is likely.
- Basic usage is complete, minimal, copyable, and uses `@moduix/react`.
- Installation guidance, anatomy, recommended composition, advanced path, and behavioral notes are accurate.
- Examples cover primary real-world tasks and important integration paths.
- The styling section includes all public CSS variables plus useful `data-slot`, Ark state, and part hooks.
- Props or behavior inherited from Ark are linked to the precise current upstream reference.
- Prose explains decisions and outcomes rather than narrating obvious JSX.
- English and localized pages have matching capabilities, examples, headings, and caveats.
- No stale prop, import, CSS variable, variant, or composition remains in prose or snippets.

## 7. Distribution and synchronization

- Component and package barrel exports are complete and free of accidental internal exports.
- Registry source entries include every required implementation/style dependency and use current paths.
- Generated registry artifacts reflect the source manifest.
- Local component markdown records intentional wrapper differences and public styling contracts.
- Package source, stories, tests, docs snippets, public pages, localization, and registry output describe one contract.
- Required formatting, linting, type checks, focused tests, and relevant builds pass.

## Release decision

- **Ready:** no P0/P1 findings remain; synchronized surfaces and validation are complete.
- **Ready with proposals:** no P0/P1 findings remain; only product-dependent P2 ideas are deferred.
- **Not ready:** at least one P0/P1 issue or required synchronization/validation step remains.