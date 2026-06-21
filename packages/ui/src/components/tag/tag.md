# Tag

Upstream docs:

- Ark UI: no dedicated `Tag` component; use the Ark composition/factory model at https://ark-ui.com/docs/guides/composition and styling model at https://ark-ui.com/docs/guides/styling
- Chakra UI: https://chakra-ui.com/docs/components/tag

## Purpose

`Tag` is a compact value token for selected items, filters, assignments, and other short interface
values that may need inline leading, trailing, or close affordances.

## Upstream model to preserve

Ark does not ship a `Tag` primitive. The moduix wrapper uses `@ark-ui/react/factory` so each part
supports Ark-style `asChild`, ref forwarding, `className`, `data-scope`, and `data-part` attributes.

The public anatomy follows Chakra's Ark-aligned `Tag` recipe: `Root`, `Label`, `StartElement`,
`EndElement`, and `CloseTrigger`. There is no provider, context, state hook, hidden input, managed
keyboard model, or callback details object to mirror.

## Current behavior contract

- `Tag` is the short root form and is equivalent to `Tag.Root`.
- `Tag` accepts Ark factory `span` props plus `variant` and `size`.
- `Tag.Label`, `Tag.StartElement`, and `Tag.EndElement` are Ark factory `span` parts.
- `Tag.CloseTrigger` is an Ark factory `button` part with default `type="button"` and a default
  close icon.
- The component owns no selected or removed state. Parent widgets own list mutation and event
  handling.

## Anatomy and exported parts

```text
Tag / Tag.Root
├─ Tag.StartElement (optional)
├─ Tag.Label
└─ Tag.EndElement (optional)
   └─ Tag.CloseTrigger (optional)
```

| Part               | Element  | Stable hooks                                                                     |
| ------------------ | -------- | -------------------------------------------------------------------------------- |
| `Tag` / `Tag.Root` | `span`   | `data-scope="tag"`, `data-part="root"`, `data-slot="tag-root"`                   |
| `Tag.Label`        | `span`   | `data-scope="tag"`, `data-part="label"`, `data-slot="tag-label"`                 |
| `Tag.StartElement` | `span`   | `data-scope="tag"`, `data-part="start-element"`, `data-slot="tag-start-element"` |
| `Tag.EndElement`   | `span`   | `data-scope="tag"`, `data-part="end-element"`, `data-slot="tag-end-element"`     |
| `Tag.CloseTrigger` | `button` | `data-scope="tag"`, `data-part="close-trigger"`, `data-slot="tag-close-trigger"` |

## Composition

```tsx
import { Tag } from 'moduix';

export function TagDemo() {
  return (
    <Tag variant="outline">
      <Tag.Label>Billing</Tag.Label>
      <Tag.EndElement>
        <Tag.CloseTrigger aria-label="Remove Billing tag" />
      </Tag.EndElement>
    </Tag>
  );
}
```

Use `Tag.StartElement` and `Tag.EndElement` for icons, avatars, or inline actions so `Tag.Label`
can remain the truncation boundary.

Use `asChild` only when the root itself needs native semantics:

```tsx
<Tag asChild>
  <button type="button">
    <Tag.Label>Open filter</Tag.Label>
  </button>
</Tag>
```

## Upstream feature coverage

- Chakra `Usage`: covered by `Tag` / `Tag.Root` plus `Tag.Label`.
- Chakra `Icon`: covered by `Tag.StartElement` and `Tag.EndElement`.
- Chakra `Variants`: mapped to moduix variants `default`, `secondary`, `outline`, `ghost`, and
  `destructive`.
- Chakra `Sizes`: mapped to moduix sizes `sm` and `md`.
- Chakra `Closable`: covered by `Tag.CloseTrigger` inside `Tag.EndElement`.
- Chakra `Overflow`: covered by `Tag.Label` truncation and root `max-width` support.
- Chakra `Avatar`: supported structurally through `Tag.StartElement`; moduix does not add an avatar
  dependency.
- Chakra `Render as button`: covered through Ark factory `asChild`.
- Chakra `Closed Component`: intentionally not exposed as props such as `startElement`, `endElement`,
  `closable`, or `onClose`; explicit composition is the moduix API.

## Accessibility and state

- Root renders a presentational `span` by default and has no ARIA state.
- `Tag.CloseTrigger` renders a `button`, defaults to `type="button"`, and adds fallback
  `aria-label="Remove tag"` only when no children and no `aria-labelledby` are provided.
- Pass a specific accessible name to `Tag.CloseTrigger` when several tags are shown together.
- `Tag.CloseTrigger` prevents click handlers from firing when `disabled` or `aria-disabled` is true.
- `asChild` requires one semantic child. The child owns keyboard, focus, and click behavior.

## Defaults and styling

| Surface            | Prop         | Default      |
| ------------------ | ------------ | ------------ |
| `Tag`              | `variant`    | `default`    |
| `Tag`              | `size`       | `md`         |
| `Tag.CloseTrigger` | `type`       | `button`     |
| `Tag.CloseTrigger` | `children`   | close icon   |
| `Tag.CloseTrigger` | `aria-label` | `Remove tag` |

Public CSS variables live in `packages/ui/src/styles/theme.css` and start with `--tag-*`. Variant
colors intentionally match `Badge` so shared variant names carry the same visual meaning across
compact token components. Close-trigger variables use the `--tag-close-trigger-*` prefix. Consumers
can style parts through `className`, `data-scope`, `data-part`, and `data-slot`.

`Tag` writes `data-size` and `data-variant`. `Tag.CloseTrigger` writes `data-disabled` for disabled
or `aria-disabled` states.

## Intentional sugar and differences from upstream

- moduix keeps local visual variants instead of Chakra `colorPalette` and `surface/subtle/solid`
  variants so the component matches the existing moduix token language.
- moduix exposes explicit namespaced parts only. Flat `TagLabel` and `TagRemove` exports were removed.
- `TagRemove` was renamed to `Tag.CloseTrigger` to match Chakra/Ark part naming.
- `Tag.CloseTrigger` supplies the default close icon and fallback accessible name.

## Agent notes

- Keep `Tag` distinct from `Badge`: tag is for selected values and managed interface entities; badge
  is for metadata.
- Do not add root-level `onClose`, `closable`, `startElement`, or `endElement` props. Use composition.
- If new parts are added, keep `data-scope="tag"`, Ark-style `data-part`, and stable `data-slot`
  hooks synchronized across code, stories, docs, and registry.

## Local changelog

- 2026-06-21: Migrated from legacy button composition to Ark factory parts, added namespace API
  (`Tag.Root`, `Tag.Label`, `Tag.StartElement`, `Tag.EndElement`, `Tag.CloseTrigger`), added
  `asChild`, renamed remove styling variables to `--tag-close-trigger-*`, and removed flat legacy
  exports.
- 2026-06-21: Aligned built-in `Tag` variant colors with `Badge` so `default`, `secondary`,
  `outline`, `ghost`, and `destructive` share the same color semantics.
- Added the first `Tag` component with root, label, and remove parts, compact size variants, and
  public CSS variables for token-style customization.