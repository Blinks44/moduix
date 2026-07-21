# Accordion

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/accordion
- Chakra UI: https://chakra-ui.com/docs/components/accordion

## Purpose

`Accordion` is the moduix wrapper around Ark UI Accordion for stacked disclosure content such as FAQs,
settings groups, and filter sections.

The wrapper keeps Ark state and keyboard behavior intact while adding moduix default styles, CSS
variables, and stable `data-slot` hooks.

## Upstream model to preserve

- Uses the Ark UI accordion primitive directly.
- Keeps Ark visual anatomy centered on `Root`, `RootProvider`, `Item`, `ItemTrigger`,
  `ItemIndicator`, and `ItemContent`.
- Keeps Ark controlled and uncontrolled value flow, lazy mounting, item state lifecycle, and
  `--height` / `--width` content animation measurements intact.

## Current behavior contract

- Uses Ark composition: `Accordion.Root`, `Accordion.Item`, `Accordion.ItemTrigger`,
  `Accordion.ItemIndicator`, `Accordion.ItemContent`, and `Accordion.ItemBody`.
- Supports Ark external state ownership through `Accordion.RootProvider` and the moduix-exported
  `useAccordion()`.
- Supports Ark controlled and uncontrolled state with `value`, `defaultValue`, and
  `onValueChange(details)`.
- Supports Ark root behavior props such as `multiple`, `collapsible`, `disabled`, `orientation`,
  `lazyMount`, `unmountOnExit`, `ids`, and `onFocusChange(details)`.
- Uses Ark content animation measurement via `--height` for vertical accordions and `--width`
  for horizontal accordions.
- `Accordion.ItemIndicator` renders `PlusIcon` by default when no children are passed.
- `Accordion.ItemBody` provides the default inner spacing wrapper for panel content.

## Anatomy and exported parts

```text
Accordion.Root
└─ Accordion.Item
   ├─ Accordion.ItemTrigger
   │  └─ Accordion.ItemIndicator
   └─ Accordion.ItemContent
      └─ Accordion.ItemBody

Accordion.RootProvider
└─ same item tree connected to a useAccordion() store
```

Every exported part accepts `className` and receives a stable `data-slot`:

| Part                      | `data-slot`                | Notes                                          |
| ------------------------- | -------------------------- | ---------------------------------------------- |
| `Accordion.Root`          | `accordion-root`           | Styled Ark root.                               |
| `Accordion.RootProvider`  | `accordion-root-provider`  | Styled Ark root provider.                      |
| `Accordion.Item`          | `accordion-item`           | Styled Ark item.                               |
| `Accordion.ItemTrigger`   | `accordion-item-trigger`   | Styled Ark trigger button.                     |
| `Accordion.ItemIndicator` | `accordion-item-indicator` | Defaults to `PlusIcon` when no children exist. |
| `Accordion.ItemContent`   | `accordion-item-content`   | Styled Ark content with Ark size animation.    |
| `Accordion.ItemBody`      | `accordion-item-body`      | Default inner spacing wrapper for panel body.  |

## Composition

```tsx
import { Accordion } from '@moduix/react';

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
            <Accordion.ItemBody>{item.description}</Accordion.ItemBody>
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
- `Root Provider`: preserved through moduix `useAccordion()` and `Accordion.RootProvider`.
- `Multiple` and `Collapsible`: preserved on `Accordion.Root`.
- `Lazy Mount`: preserved through `lazyMount` and `unmountOnExit`.
- `Context` and `Item State`: available directly from `@ark-ui/react/accordion`. moduix only
  re-exports `useAccordion()` for the `RootProvider` path.
- `With Slider`: preserved as normal nested composition; nested Ark widgets keep their own part tree,
  keyboard behavior, and hidden inputs inside `Accordion.ItemContent`.
- `Content Animation`: preserved through Ark `--height` and `--width` measurement rather than a custom sizing model.

## Accessibility and state

- Ark state/data attributes remain available to consumers:
  - `data-state="open" | "closed"` on item, trigger, indicator, and content
  - `data-disabled`, `data-focus`, `data-controls`, and `data-orientation` on relevant parts
- All exported parts support Ark `asChild` for DOM ownership changes.
- Ark callback and focus shapes remain unchanged, including `onValueChange(details)` and
  `onFocusChange(details)`.
- `useAccordion()` is exported from `@moduix/react` for the recommended `RootProvider` path.
- `RootProvider` must receive the return value from `useAccordion()` and must not be combined with
  `Accordion.Root` for the same accordion instance.
- Ark content sizing variables remain available, especially `--height` and `--width`.

## Defaults and styling

Primary CSS variables:

| Variable                               | Default                         |
| -------------------------------------- | ------------------------------- |
| `--accordion-width`                    | `100%`                          |
| `--accordion-max-width`                | `100%`                          |
| `--accordion-horizontal-width`         | `auto`                          |
| `--accordion-horizontal-height`        | `20rem`                         |
| `--accordion-horizontal-max-height`    | `100%`                          |
| `--accordion-horizontal-trigger-width` | `2.5rem`                        |
| `--accordion-horizontal-content-width` | `16rem`                         |
| `--accordion-trigger-bg`               | `var(--color-muted)`            |
| `--accordion-trigger-bg-hover`         | `var(--color-accent)`           |
| `--accordion-icon-open-transform`      | `rotate(45deg) scale(1.1)`      |
| `--accordion-item-body-gap`            | `var(--spacing-3)`              |
| `--accordion-item-body-padding`        | `var(--spacing-3)`              |
| `--accordion-item-content-color`       | `var(--color-muted-foreground)` |
| `--accordion-item-content-transition`  | `var(--transition-default)`     |

## Intentional sugar and differences from upstream

- moduix ships pre-styled defaults; Ark is intentionally unstyled.
- `Accordion.ItemIndicator` defaults to `PlusIcon` when children are not provided.
- `Accordion.ItemBody` removes the need for per-example inner content wrappers just to add spacing.
- `Accordion.RootProvider` shares the same default root styling as `Accordion.Root`.
- `useAccordion()` is re-exported from moduix for provider-driven composition, while Ark context
  parts, remaining state hooks, and type aliases stay on `@ark-ui/react/accordion`.
- Horizontal orientation gets a row layout, opposite-side trigger text rotation, trigger width
  defaults, and `--width`-based content animation in addition to Ark's horizontal keyboard behavior.

## Agent notes

- Preserve Ark keyboard navigation, focus behavior, and value lifecycle.
- Keep `onValueChange` Ark-style (`details.value`) instead of converting to a custom callback shape.
- Keep `Accordion.ItemContent` animation based on Ark `--height` and `--width`.
- Keep spacing on `Accordion.ItemBody`, not on `Accordion.ItemContent`, so Ark size measurement stays reliable.
- Preserve the moduix `useAccordion()` re-export because docs and `RootProvider` examples depend on it.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-06: Added `Accordion.ItemBody` as a thin inner spacing wrapper, moved default panel spacing
  into the component CSS contract, and migrated stories/docs away from ad-hoc content wrapper divs.
- 2026-07-09: Re-exported `useAccordion()` from moduix for the recommended `RootProvider` flow,
  reordered docs examples, and documented `Accordion.ItemBody` as a moduix-owned styling hook.
- 2026-07-02: Removed duplicate Ark type exports, context parts, and state hooks from the moduix
  surface. Kept `RootProvider`, the callable root, every styled visual part, the default indicator,
  and horizontal-layout sugar.
- 2026-06-17: Migrated wrapper internals from legacy Accordion to Ark UI Accordion, adopted Ark part
  naming (`ItemTrigger`, `ItemIndicator`, `ItemContent`), and moved styling/state hooks to Ark
  data attributes and `--height`-based content animation.
- 2026-06-17: Removed flat named exports (`AccordionRoot`, `AccordionItem`, `AccordionItemTrigger`,
  `AccordionItemIndicator`, `AccordionItemContent`) to keep the public API Ark-shaped (`Accordion.*` only),
  and removed legacy `--accordion-panel-*` theme tokens that were no longer used.
- 2026-06-18: Exposed Ark `RootProvider`, `Context`, `ItemContext`, `useAccordion()`,
  `useAccordionContext()`, and `useAccordionItemContext()` through the moduix wrapper and updated
  docs examples to cover the full upstream Ark Accordion example set.
- 2026-06-24: Added horizontal orientation layout, opposite-side trigger text rotation, and
  `--width`-based content animation, documented horizontal CSS variables, removed duplicate docs
  example code, and added the upstream nested Slider composition example.