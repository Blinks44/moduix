# Accordion

Upstream primitive docs: https://ark-ui.com/docs/components/accordion

## Purpose

`Accordion` is the moduix wrapper around Ark UI Accordion for stacked disclosure content such as FAQs,
settings groups, and filter sections.

The wrapper keeps Ark state/keyboard behavior and adds moduix default styles, CSS variables, and
`data-slot` hooks.

## Current behavior contract

- Uses Ark composition: `Accordion.Root`, `Accordion.Item`, `Accordion.ItemTrigger`,
  `Accordion.ItemIndicator`, and `Accordion.ItemContent`.
- Supports Ark controlled/uncontrolled state with `value`, `defaultValue`, and `onValueChange(details)`.
- Supports Ark root behavior props such as `multiple`, `collapsible`, `disabled`, `orientation`,
  `lazyMount`, and `unmountOnExit`.
- Uses Ark content animation measurement via `--height`.
- `Accordion.ItemIndicator` renders `PlusIcon` by default when no children are passed.

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

## Defaults and styling

Every exported part accepts `className` and receives a stable `data-slot`:

| Part                      | `data-slot`                |
| ------------------------- | -------------------------- |
| `Accordion.Root`          | `accordion-root`           |
| `Accordion.Item`          | `accordion-item`           |
| `Accordion.ItemTrigger`   | `accordion-item-trigger`   |
| `Accordion.ItemIndicator` | `accordion-item-indicator` |
| `Accordion.ItemContent`   | `accordion-item-content`   |

Ark state/data attributes remain available to consumers:

- `data-state="open" | "closed"` on item, trigger, indicator, and content.
- `data-disabled` and `data-orientation` on relevant parts.

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

## Intentional differences from Ark UI

- moduix ships pre-styled defaults; Ark is unstyled.
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