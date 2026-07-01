---
name: docs-workflow
description: Use for work in apps/docs, including MDX pages, live examples, and CSS variable documentation.
---

# Skill: docs-workflow

Use this skill for work in `apps/docs`.

## Scope

- MDX component pages
- docs site content and routing
- live examples
- CSS properties documentation

## Read First

1. `AGENTS.md`
2. `apps/docs/content/docs/select.mdx` as the current reference implementation for standardized component pages
3. `packages/react` output and local component docs when docs depend on changed UI behavior

## Core Rules

- Import public components from `moduix`. Do not duplicate library components inside the docs app.
- Document the shipped public API only. Remove stale props, examples, styling hooks, and obsolete guidance in the same task.
- Keep MDX consumer-facing. Put interactive logic, bulky example data, and `cssProperties` arrays in example `.tsx` files.
- Prefer `as T` over `useState<T>()` in MDX.
- Prefer short, production-like examples over exhaustive configuration demos.
- Keep demo styles in colocated CSS Modules when that is clearer than inline styles.
- Use existing pages as structure references, not as permission to keep stale complexity.
- Public snippets must show the current consumer path from `moduix`, including Ark composition, callbacks,
  provider/context hooks, data setup, and recursive renderers when those are required to use the component.
- For root-only components whose exported component is the root with `.Root` attached, visible runnable snippets use
  the short root form (`<Component>`) by default; reserve `<Component.Root>` for anatomy, API explanation, or cases
  where the namespace itself is being discussed.
- Live examples may use internal helpers for maintainability, but the visible `Preview.Code` should stay complete and
  consumer-facing.

## Standard Component Page Structure

Every component page in `apps/docs/content/docs/*.mdx` must use this section order:

1. `## API Reference`
2. `## Choosing the right component` (optional)
3. `## Basic`
4. `## Install with shadcn (optional)`
5. `## Anatomy`
6. `## Composition`
7. `## Examples`
8. `## Styling` (optional)

Inside `## Composition`, always use:

1. `### Recommended composition`
2. `### When to go custom`
3. `### Default props` (optional)
4. `### Behavioral notes`

Inside `## Styling`, always use:

1. `### CSS Properties` (optional)
2. `### Styling hooks`

## Section Intent

- `API Reference`: one short upstream reference block, no extra prose.
  - For Ark-backed components, point to the dedicated Ark page.
  - For local-only components, explicitly say there is no dedicated Ark primitive and name the Ark guide/factory model
    and Chakra contract if Chakra informs the public API.
  - For local-only components, keep that reference block to one compact paragraph with inline links. Do not render a
    bullet list of upstream references in `API Reference`.
- `Choosing the right component`: only for components with close alternatives.
- `Basic`: the recommended happy path and the first runnable example.
  - This is the Ark-first default path plus any moduix sugar that is part of the normal public surface.
  - For root-only components whose exported component is the root with `.Root` attached, prefer the shorter
    `<Component />` form in runnable snippets.
- `Install with shadcn`: comes immediately after `Basic`.
- `Anatomy`: structure only. Keep it short: ASCII tree plus concise part roles.
  - Always include a markdown table with `Part` and `Role` columns.
  - The first anatomy row must be `` `Component` / `Component.Root` `` for the root entry.
- `Composition`: public contract, recommended part tree, escape hatches, defaults, and behavioral constraints.
  - Document preserved Ark callback shapes, `ref` targets, form context, `HiddenInput`, provider/context patterns,
    `asChild`, `ids`, and moduix sugar here when relevant.
- `Examples`: start where `Basic` stops. Move into narrower, more specific, or more advanced cases.
  - For Ark-backed components, order examples to follow the relevant Ark docs topics first, then add moduix-only sugar
    or styling examples.
  - Every example heading must be followed by a short explanatory lead-in before the preview. Do not render a preview
    immediately under the heading.
- `Styling`: only when the component has a meaningful styling contract.

## Duplication Rules

- Use `Basic` for the recommended first example.
- Do not duplicate the `Basic` example in `Anatomy` as a full code block unless the structure would otherwise be
  unclear.
- Do not put runnable snippets in `Composition` when the same case is already covered in `Examples`.
- Use `Custom Composition` only as an example label inside `Examples` when a low-level escape hatch is worth showing.
- If an example is named `Custom Composition`, it must show the real low-level composition path rather than only
  styling a high-level sugar wrapper.
- Use `Custom Styling` when the example is only about `className`, local CSS overrides, `--component-*` variables, or
  targeting public slots/state attributes without changing the rendered structure.
- If a component has no meaningful composition escape hatch beyond its normal public path, prefer `Custom Styling` and
  do not add a placeholder `Custom Composition` example.

## Preview Rules

- Put component code in `Preview.Code`.
- Put example-local CSS in `Preview.CSS`.
- Put arrays, mock payloads, and other setup data in `Preview.Data`.
- Keep snippets self-contained and consumer-facing.
- Prefer the Ark UI documentation style: one complete component per visible snippet, with the relevant parts inlined.
  Do not make readers jump between hidden helper components just to understand the example. Keep helpers in the docs
  source only when needed for maintainability, and inline them in the displayed snippet unless the helper itself is the
  public pattern being taught.
- For Ark collection primitives, show the collection setup directly in the visible snippet:
  - Use `create*Collection({ nodeToValue/itemToValue, nodeToString/itemToString, rootNode/items })` inline.
  - Name the root data `rootNode` only when it is passed directly to `create*Collection`; otherwise put the root object
    directly inside the collection call.
  - Render from `collection.rootNode.children?.map(...)` or `collection.items.map(...)` where the consumer sees the
    root shape and the rendered children together.
  - Avoid snippet-only factories like `createFilesCollection(rootNode = treeData)`, `buildCollection(data)`, or
    structural wrappers like `TreeContent` when they hide how Ark's collection and parts fit together.
  - Keep recursive renderers such as `TreeNode` visible when users must write that composition to use the component.
- Do not repeat global setup imports.
- In runnable examples (`Preview` and `Preview.Code`), use the short root form (`<Component>`) instead of
  `<Component.Root>`, while keeping child parts namespaced (for example `<Component.Item>`).
- Do not attach `Preview.CSSProperties` or `Preview.CSSPlayground` to the `Basic` example.
- Prefer removing `Playground` from component pages unless a task explicitly needs interactive token editing.
- Do not add a preview canvas inside `Styling`.

## CSS Properties

- In `### CSS Properties`, prefer the direct CSS variables reference UI over a duplicated prose table.
- Render the CSS variables reference in the same docs wrapper used by `accordion`: a `not-prose` container, docs
  `Tabs` with a single `CSS Variables` tab, and a bounded scroll area on the tab panel.
- Use this pattern even when the table is short so component pages stay visually consistent.
- `CSS Properties` must cover the full public `--<component>-*` contract from
  `packages/react/src/lib/moduix/styles/theme.css`.
- `Styling hooks` should cover meaningful `className`, `data-slot`, and state/data attributes consumers can actually
  target.

## Ark Alignment Rules

- If Ark UI has a dedicated component page, the docs page must cover the relevant upstream:
  - anatomy
  - recommended composition path
  - examples and guides the wrapper still supports
  - public API parts, state hooks, and styling hooks that remain visible to consumers
- Cover Ark guide behavior that the component exposes:
  - `Field.Root` / `Fieldset.Root` state inheritance and visible labels/helper/error text for form controls
  - `HiddenInput` for native form submission and form reset synchronization
  - `ref` forwarding targets for form-library invalid focus and imperative access
  - `asChild` composition and single semantic child constraints
  - shared `ids` props for cross-component accessibility composition
  - `Component.Context`, `use*Context`, and `RootProvider` state access patterns
  - CSS animations on Ark state attributes and `present` for JavaScript exit animations
  - `data-scope`, `data-part`, `data-state`, other Ark state attributes, Ark CSS variables, and moduix `data-slot`
    hooks
- Do not silently omit an upstream concept that the wrapper still exposes.
- If an upstream concept is intentionally unsupported, renamed, or constrained, state that explicitly in
  `Composition` or the relevant example description.
- moduix sugar comes after the upstream explanation:
  - default icons
  - default styling
  - convenience props or wrappers
  - local naming or behavior differences
- If a root-only component exposes both `<Component />` and `<Component.Root />` as the same root, document
  `<Component />` as the default consumer path. Use `<Component.Root />` only when explaining the Ark-aligned namespace
  or when matching a multi-part component anatomy.
- `### Default props` must be documented as a markdown table (for example `Prop | Default | Notes`), not prose.

Popup-like components:

- Teach the explicit Ark/Chakra part tree as the default contract.
- Do not render or import `Portal` in examples. Document that roots portal the structural overlay
  parts automatically, `portalled={false}` renders inline, and `portalRef` selects a custom
  container.
- Treat built-in popup arrows as opt-in unless the component contract explicitly says otherwise.
- Keep structural parts visible in docs examples instead of hiding them behind `*Content` sugar.

Dialog-like components:

- Teach the explicit Ark/Chakra part tree as the default contract.
- Do not teach popup positioning or arrow props.
- Keep workflow sugar narrow and family-specific.

## Registry Docs

- Keep the full shadcn/GitHub registry setup flow in `quick-start.mdx`, not on every component page.
- On component pages, put `Install with shadcn` immediately after `Basic` and show only the `add` commands.
- Keep `index.mdx`, `quick-start.mdx`, `composition-patterns.mdx`, and `tokens.mdx` aligned when install flow, token entrypoints, or ownership guidance changes.
- Treat `registry.json` as the source of truth. `npm run build:registry` generates JSON artifacts into `packages/react/registry/default`.

## Validation

Run the required checks from `AGENTS.md` after changes.