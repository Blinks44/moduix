# Accordion

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/accordion

## Purpose

`Accordion` is the moduix wrapper around Ark UI Accordion for stacked disclosure content such as FAQs,
settings groups, and filter sections.

The wrapper keeps Ark state and keyboard behavior intact while adding moduix default styles, CSS
variables, and stable `data-slot` hooks.

## Upstream model to preserve

- Uses the Ark UI accordion primitive directly.
- Keeps Ark anatomy centered on `Root`, `Item`, `ItemTrigger`, `ItemIndicator`, and `ItemContent`.
- Keeps Ark controlled and uncontrolled value flow, lazy mounting, item state lifecycle, and
  `--height`-driven content animation intact.

## Current behavior contract

- Uses Ark composition: `Accordion.Root`, `Accordion.Item`, `Accordion.ItemTrigger`,
  `Accordion.ItemIndicator`, and `Accordion.ItemContent`.
- Supports Ark controlled and uncontrolled state with `value`, `defaultValue`, and
  `onValueChange(details)`.
- Supports Ark root behavior props such as `multiple`, `collapsible`, `disabled`, `orientation`,
  `lazyMount`, `unmountOnExit`, `ids`, and `onFocusChange(details)`.
- Uses Ark content animation measurement via `--height`.
- `Accordion.ItemIndicator` renders `PlusIcon` by default when no children are passed.

## Anatomy and exported parts

```text
Accordion.Root
└─ Accordion.Item
   ├─ Accordion.ItemTrigger
   │  └─ Accordion.ItemIndicator
   └─ Accordion.ItemContent
```

Every exported part accepts `className` and receives a stable `data-slot`:

| Part                      | `data-slot`                | Notes                                          |
| ------------------------- | -------------------------- | ---------------------------------------------- |
| `Accordion.Root`          | `accordion-root`           | Styled Ark root.                               |
| `Accordion.Item`          | `accordion-item`           | Styled Ark item.                               |
| `Accordion.ItemTrigger`   | `accordion-item-trigger`   | Styled Ark trigger button.                     |
| `Accordion.ItemIndicator` | `accordion-item-indicator` | Defaults to `PlusIcon` when no children exist. |
| `Accordion.ItemContent`   | `accordion-item-content`   | Styled Ark content with Ark size animation.    |

## Composition

```tsx
import { Accordion } from 'moduix';

const items = [
  { value: 'shipping', title: 'Shipping', description: 'Delivery times and tracking options.' },
  { value: 'returns', title: 'Returns', description: 'Return windows and refund rules.' },
];

export function AccordionExample() {
  return (
    <Accordion.Root defaultValue={['shipping']}>
      {items.map((item) => (
        <Accordion.Item key={item.value} value={item.value}>
          <Accordion.ItemTrigger>
            {item.title}
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <div className="panelContent">{item.description}</div>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
```

## Upstream feature coverage

- `Anatomy`: preserved directly through the exported Ark-shaped parts.
- `Controlled`: preserved through `value`, `defaultValue`, and `onValueChange(details)`.
- `Multiple` and `Collapsible`: preserved on `Accordion.Root`.
- `Lazy Mount`: preserved through `lazyMount` and `unmountOnExit`.
- `Context`: preserved through Ark context and callback/state flow; moduix does not rename it.
- `Item State`: preserved through Ark item state and data attributes.
- `Content Animation`: preserved through Ark `--height` measurement rather than a custom sizing model.

## Accessibility and state

- Ark state/data attributes remain available to consumers:
  - `data-state="open" | "closed"` on item, trigger, indicator, and content
  - `data-disabled` and `data-orientation` on relevant parts
- All exported parts support Ark `asChild` for DOM ownership changes.
- Ark callback and focus shapes remain unchanged, including `onValueChange(details)` and
  `onFocusChange(details)`.
- Ark content sizing variables remain available, especially `--height`.

## Defaults and styling

Primary CSS variables:

| Variable                              | Default                         |
| ------------------------------------- | ------------------------------- |
| `--accordion-width`                   | `22rem`                         |
| `--accordion-max-width`               | `100%`                          |
| `--accordion-trigger-bg`              | `var(--color-muted)`            |
| `--accordion-trigger-bg-hover`        | `var(--color-accent)`           |
| `--accordion-icon-open-transform`     | `rotate(45deg) scale(1.1)`      |
| `--accordion-item-content-color`      | `var(--color-muted-foreground)` |
| `--accordion-item-content-transition` | `var(--transition-default)`     |

## Intentional sugar and differences from upstream

- moduix ships pre-styled defaults; Ark is intentionally unstyled.
- `Accordion.ItemIndicator` defaults to `PlusIcon` when children are not provided.

## Agent notes

- Preserve Ark keyboard navigation, focus behavior, and value lifecycle.
- Keep `onValueChange` Ark-style (`details.value`) instead of converting to a custom callback shape.
- Keep `Accordion.ItemContent` animation based on Ark `--height`.

## Local changelog

- 2026-06-17: Migrated wrapper internals from Base UI Accordion to Ark UI Accordion, adopted Ark part
  naming (`ItemTrigger`, `ItemIndicator`, `ItemContent`), and moved styling/state hooks to Ark
  data attributes and `--height`-based content animation.
- 2026-06-17: Removed flat named exports (`AccordionRoot`, `AccordionItem`, `AccordionItemTrigger`,
  `AccordionItemIndicator`, `AccordionItemContent`) to keep the public API Ark-shaped (`Accordion.*` only),
  and removed legacy `--accordion-panel-*` theme tokens that were no longer used.