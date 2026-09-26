# Tag

Upstream docs (accessed 2026-08-13):

- Ark UI: no dedicated `Tag` component; use the Ark factory, composition, styling, and ref guides at https://ark-ui.com/docs/guides/composition#the-ark-factory, https://ark-ui.com/docs/guides/composition, https://ark-ui.com/docs/guides/styling, and https://ark-ui.com/docs/guides/ref
- Chakra UI: https://chakra-ui.com/docs/components/tag
- shadcn/ui: no dedicated Tag; Badge sets the compact-token discoverability baseline at https://ui.shadcn.com/docs/components/badge

## Purpose

`Tag` is a compact value token for selected items, filters, assignments, and other short interface
values that may need inline leading, trailing, or close affordances.

## Upstream model to preserve

Ark UI does not ship a dedicated `tag` primitive. Moduix builds this component with the official
[Ark factory](https://ark-ui.com/docs/guides/composition#the-ark-factory), follows Ark's
[composition](https://ark-ui.com/docs/guides/composition), [styling](https://ark-ui.com/docs/guides/styling), and
[ref](https://ark-ui.com/docs/guides/ref) guidance. The moduix wrapper uses `@ark-ui/react/factory`
so each part supports Ark-style `asChild`, ref forwarding, `className`, `data-scope`, and
`data-part` attributes.

The public anatomy follows Chakra's Ark-aligned `Tag` recipe: `Tag`, `TagLabel`, `TagStartElement`,
`TagEndElement`, and `TagCloseTrigger`. There is no provider, context, state hook, hidden input, managed
keyboard model, or callback details object to mirror.

## Current behavior contract

- `Tag` is the root component.
- `Tag` accepts Ark factory `span` props plus `variant` and `size`.
- `TagLabel`, `TagStartElement`, and `TagEndElement` are Ark factory `span` parts.
- `TagCloseTrigger` composes the shared `CloseButton` while retaining the Tag data hooks, default
  `type="button"`, and close icon when not using `asChild`.
- The component owns no selected or removed state. Parent widgets own list mutation and event
  handling.

## Anatomy and exported parts

```text
Tag
├─ TagStartElement (optional)
├─ TagLabel
└─ TagEndElement (optional)
   └─ TagCloseTrigger (optional)
```

| Part              | Element  | Stable hooks                                                                     |
| ----------------- | -------- | -------------------------------------------------------------------------------- |
| `Tag`             | `span`   | `data-scope="tag"`, `data-part="root"`, `data-slot="tag-root"`                   |
| `TagLabel`        | `span`   | `data-scope="tag"`, `data-part="label"`, `data-slot="tag-label"`                 |
| `TagStartElement` | `span`   | `data-scope="tag"`, `data-part="start-element"`, `data-slot="tag-start-element"` |
| `TagEndElement`   | `span`   | `data-scope="tag"`, `data-part="end-element"`, `data-slot="tag-end-element"`     |
| `TagCloseTrigger` | `button` | `data-scope="tag"`, `data-part="close-trigger"`, `data-slot="tag-close-trigger"` |

## Composition

```tsx
import { Tag, TagCloseTrigger, TagEndElement, TagLabel } from '@moduix/react/tag';

export function TagDemo() {
  return (
    <Tag variant="outline">
      <TagLabel>Billing</TagLabel>
      <TagEndElement>
        <TagCloseTrigger aria-label="Remove Billing tag" />
      </TagEndElement>
    </Tag>
  );
}
```

Use `TagStartElement` and `TagEndElement` for icons, avatars, or inline actions so `TagLabel`
can remain the truncation boundary.

Use `asChild` only when the root itself needs native semantics:

```tsx
<Tag asChild>
  <button type="button">
    <TagLabel>Open filter</TagLabel>
  </button>
</Tag>
```

## Upstream feature coverage

- Chakra `Usage`: covered by `Tag` plus `TagLabel`.
- Chakra `Icon`: covered by `TagStartElement` and `TagEndElement`.
- Chakra `Variants`: mapped to moduix variants `default`, `secondary`, `outline`, `ghost`, and
  `destructive`.
- Chakra `Sizes`: mapped to moduix sizes `sm` and `md`.
- Chakra `Closable`: covered by `TagCloseTrigger` inside `TagEndElement`.
- Chakra `Overflow`: covered by `TagLabel` truncation and root `max-width` support.
- Chakra `Avatar`: supported structurally through `TagStartElement`; moduix does not add an avatar
  dependency.
- Chakra `Render as button`: covered through Ark factory `asChild`.
- Chakra `Closed Component`: intentionally not exposed as props such as `startElement`, `endElement`,
  `closable`, or `onClose`; explicit composition is the moduix API.

## Accessibility and state

- Root renders a presentational `span` by default and has no ARIA state.
- `TagCloseTrigger` renders a `button`, defaults to `type="button"`, and adds fallback
  `aria-label="Remove tag"` only when not using `asChild`, no children, and no `aria-labelledby`
  are provided.
- Pass a specific accessible name to `TagCloseTrigger` when several tags are shown together.
- `TagCloseTrigger` prevents click handlers from firing when `disabled` or `aria-disabled` is true.
- `asChild` requires one semantic child. The child owns keyboard, focus, and click behavior.
- `TagCloseTrigger asChild` requires an explicit semantic child; the default close icon is rendered
  only by the default button host.

## Defaults and styling

| Surface           | Prop         | Default                                                                      |
| ----------------- | ------------ | ---------------------------------------------------------------------------- |
| `Tag`             | `variant`    | `default`                                                                    |
| `Tag`             | `size`       | `md`                                                                         |
| `TagCloseTrigger` | `type`       | `button`                                                                     |
| `TagCloseTrigger` | `children`   | close icon when not using `asChild`                                          |
| `TagCloseTrigger` | `aria-label` | `Remove tag` when not using `asChild`, no children, and no `aria-labelledby` |

Public CSS variables live in `packages/foundation/src/styles/variables-moduix.css` and start with `--moduix-tag-*`. Variant
colors intentionally match `Badge` so shared variant names carry the same visual meaning across
compact token components. Close-trigger variables use the `--moduix-tag-close-trigger-*` prefix. Consumers
can style parts through `className`, `data-scope`, `data-part`, and `data-slot`.

For colors, the component-wide `--moduix-tag-bg`, `--moduix-tag-border-color`, and
`--moduix-tag-color` overrides take precedence. Otherwise, each variant resolves its own background,
border, and foreground through `--moduix-tag-default-*`, `--moduix-tag-secondary-*`,
`--moduix-tag-outline-*`, `--moduix-tag-ghost-*`, or `--moduix-tag-destructive-*` before using
foundation tokens.

| Variable                                | Default                                      | Surface          |
| --------------------------------------- | -------------------------------------------- | ---------------- |
| `--moduix-tag-default-bg`               | `var(--moduix-color-primary)`                | default root     |
| `--moduix-tag-default-border-color`     | `transparent`                                | default root     |
| `--moduix-tag-default-color`            | `var(--moduix-color-primary-foreground)`     | default root     |
| `--moduix-tag-secondary-bg`             | `var(--moduix-color-secondary)`              | secondary root   |
| `--moduix-tag-secondary-border-color`   | `transparent`                                | secondary root   |
| `--moduix-tag-secondary-color`          | `var(--moduix-color-secondary-foreground)`   | secondary root   |
| `--moduix-tag-outline-bg`               | `transparent`                                | outline root     |
| `--moduix-tag-outline-border-color`     | `var(--moduix-color-border)`                 | outline root     |
| `--moduix-tag-outline-color`            | `var(--moduix-color-foreground)`             | outline root     |
| `--moduix-tag-ghost-bg`                 | `transparent`                                | ghost root       |
| `--moduix-tag-ghost-border-color`       | `transparent`                                | ghost root       |
| `--moduix-tag-ghost-color`              | `var(--moduix-color-foreground)`             | ghost root       |
| `--moduix-tag-destructive-bg`           | `var(--moduix-color-destructive)`            | destructive root |
| `--moduix-tag-destructive-border-color` | `transparent`                                | destructive root |
| `--moduix-tag-destructive-color`        | `var(--moduix-color-destructive-foreground)` | destructive root |

`Tag` writes `data-size` and `data-variant`. `TagCloseTrigger` uses the shared `CloseButton` CSS
contract behind the existing `--moduix-tag-close-trigger-*` variables and retains `data-disabled` for
disabled or `aria-disabled` states.

## Intentional sugar and differences from upstream

- moduix keeps local visual variants instead of Chakra `colorPalette` and `surface/subtle/solid`
  variants so the component matches the existing moduix token language.
- moduix exposes flat part values directly from the component subpath.
- `TagCloseTrigger` is the explicit close-action part and matches Chakra/Ark part naming.
- `TagCloseTrigger` supplies the shared `CloseButton` default close icon and fallback accessible name.
- moduix no longer re-exports helper prop/type aliases; consumers rely on the component surface
  directly.

## Agent notes

- Keep `Tag` distinct from `Badge`: tag is for selected values and managed interface entities; badge
  is for metadata.
- Do not add root-level `onClose`, `closable`, `startElement`, or `endElement` props. Use composition.
- If new parts are added, keep `data-scope="tag"`, Ark-style `data-part`, and stable `data-slot`
  hooks synchronized across code, stories, docs, and registry.

## Local changelog

- 2026-08-13: Added independent background, border, and foreground variables for every built-in
  variant while preserving component-wide color overrides.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-17: Composed `TagCloseTrigger` with the shared `CloseButton` and mapped the existing
  `--moduix-tag-close-trigger-*` styling contract to CloseButton variables without changing Tag anatomy.
- 2026-07-11: Updated removable-tag examples to model parent-owned removal state and use specific
  close-trigger labels; documented `asChild` as the final advanced customization path.
- 2026-07-03: Removed public `Tag*Props`, `TagVariant`, and `TagSize` type exports to keep the
  Tag surface component-first.
- 2026-09-22: Completed the flat public API migration by exporting `Tag`, `TagLabel`,
  `TagStartElement`, `TagEndElement`, and `TagCloseTrigger` directly.
- 2026-06-21: Aligned built-in `Tag` variant colors with `Badge` so `default`, `secondary`,
  `outline`, `ghost`, and `destructive` share the same color semantics.
- 2026-06-27: Protected Ark/moduix data hooks from rest-prop overrides, clarified `CloseTrigger`
  `asChild` behavior, and simplified outline/ghost styling.
- Added the first `Tag` component with root, label, and remove parts, compact size variants, and
  public CSS variables for token-style customization.