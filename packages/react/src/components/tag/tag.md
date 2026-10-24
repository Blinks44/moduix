# Tag

Upstream docs:

- Ark UI: no `Tag` primitive; the parts use the Ark factory
  (https://ark-ui.com/docs/guides/composition#the-ark-factory).
- Chakra UI: https://chakra-ui.com/docs/components/tag
- shadcn/ui: no Tag; Badge is the closest compact token (https://ui.shadcn.com/docs/components/badge).

## Purpose

`Tag` is a compact token for selected values, filters, assignments, and other short interface values,
with optional leading and trailing content and a close action. Use `Badge` for metadata such as
status, category, or count.

## Anatomy

```text
Tag
├─ TagStartElement (optional)
├─ TagLabel
└─ TagEndElement (optional)
   └─ TagCloseTrigger (optional)
```

| Export            | Element                | `data-slot`         | Notes                                    |
| ----------------- | ---------------------- | ------------------- | ---------------------------------------- |
| `Tag`             | `ark.span`             | `tag-root`          | Accepts `variant` and `size`.            |
| `TagLabel`        | `ark.span`             | `tag-label`         | Truncation boundary with an ellipsis.    |
| `TagStartElement` | `ark.span`             | `tag-start-element` | Leading icon, avatar, or indicator.      |
| `TagEndElement`   | `ark.span`             | `tag-end-element`   | Trailing icon or action.                 |
| `TagCloseTrigger` | `CloseButton` (button) | `tag-close-trigger` | Shared close button with the close icon. |

Every part writes `data-scope="tag"` and the matching `data-part`. The barrel also exports the types
`TagRootProps`, `TagSize`, and `TagVariant`.

## Behavior contract

- The component owns no state. The parent keeps the list and removes an item from the close
  trigger's `onClick`.
- `variant` (`default` | `secondary` | `outline` | `ghost` | `destructive`, default `default`) and
  `size` (`sm` | `md` | `lg`, default `md`; 20, 24, and 28px minimum height, `lg` with 14px text) are written to `data-variant` and `data-size`. Variant colors
  match `Badge`.
- `TagCloseTrigger` inherits `CloseButton` behavior: `type="button"`, the default close icon when it
  has no children, and no click handlers while `disabled` or `aria-disabled`. It is named
  `Remove tag` unless it receives `aria-label` or `aria-labelledby`, also with custom children or
  `asChild`. Pass a name with the value when several tags are shown.
- `asChild` replaces the host of any part; the child provides the semantics.

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

## Styling

- A `button` or `a` root (through `asChild`) gets `cursor: pointer`; the root has no other interactive
  styles.
- Direct SVG children of the root, `TagStartElement`, and `TagEndElement` are 12px. The close trigger
  is a 16px round button with a 12px icon, like item deletion in `TagsInput`; it inherits the tag
  color and uses a `currentColor` hover background and an inset focus ring.
- Public CSS Modules variables: `--moduix-tag-bg`, `--moduix-tag-border-color`, and
  `--moduix-tag-color`. They override every variant. Size, spacing, typography, radius, and close
  trigger geometry use foundation tokens; override them with a class on the part.

## Agent notes

- Keep `Tag` distinct from `Badge`: tag is for interface values, badge for metadata.
- Do not add root-level `onClose`, `closable`, `startElement`, or `endElement` props; use composition.