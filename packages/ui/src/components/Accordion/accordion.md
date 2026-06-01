# Accordion

Upstream primitive docs: https://base-ui.com/react/components/accordion.md

## Purpose

`Accordion` is the moduix wrapper around Base UI Accordion. It renders a vertical set of collapsible
sections with moduix defaults, CSS variables, `data-slot` hooks, and an optional trigger icon helper.

Use it when several related sections need to share one compact surface, for example FAQ blocks,
settings groups, or filter sections. The wrapper intentionally keeps Base UI state behavior instead
of introducing a separate item-data API.

## Current behavior contract

- `Accordion` forwards Base UI root props and refs to a `<div>`.
- Open items are controlled by item `value`s. `value`, `defaultValue`, and `onValueChange` all use an
  array of values, even when `multiple` is not set.
- `multiple` allows several items to stay open. Without it, opening one item closes the previous one.
- `disabled` on the root disables the full accordion. `disabled` on `AccordionItem` disables one row.
- `orientation` controls the roving focus direction. The shipped styles are optimized for vertical
  accordions.
- `loopFocus`, `keepMounted`, and `hiddenUntilFound` are passed through from Base UI.
- Panels animate with Base UI's measured `--accordion-panel-height` custom property.

## Composition

```tsx
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  AccordionTriggerIcon,
} from 'moduix';

const items = [
  {
    value: 'shipping',
    title: 'Shipping',
    description: 'Delivery times, prices, and tracking options.',
  },
  {
    value: 'returns',
    title: 'Returns',
    description: 'Return windows and refund rules.',
  },
];

export function AccordionExample() {
  return (
    <Accordion defaultValue={['shipping']}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger>
              {item.title}
              <AccordionTriggerIcon />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionPanel>
            <div className="panelContent">{item.description}</div>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

Recommended structure:

```text
Accordion
└─ AccordionItem[value]
   ├─ AccordionHeader
   │  └─ AccordionTrigger
   │     ├─ label
   │     └─ AccordionTriggerIcon (optional)
   └─ AccordionPanel
      └─ content wrapper
```

Exported parts:

| Part | Renders | Notes |
| --- | --- | --- |
| `Accordion` | `div` | Root state machine. Accepts Base UI root props plus `className`. |
| `AccordionItem` | `div` | Groups one trigger with one panel. `value` is required for predictable controlled state. |
| `AccordionHeader` | `h3` | Semantic heading wrapper. Use `render={<h2 />}` or another heading level when needed. |
| `AccordionTrigger` | `button` | Interactive control. With the default render, moduix trigger styles are applied. |
| `AccordionTriggerIcon` | `span` | Optional visual cue. Renders `PlusIcon` by default and is `aria-hidden` by default. |
| `AccordionPanel` | `div` | Collapsible content region. Put padding on an inner wrapper to keep height animation clean. |

## Public props

The wrappers preserve Base UI props instead of exporting local prop aliases.

Common root props:

| Prop | Default | Description |
| --- | --- | --- |
| `defaultValue` | `[]` | Uncontrolled open item values. |
| `value` | - | Controlled open item values. |
| `onValueChange` | - | Called with the next open value array and Base UI event details. |
| `multiple` | `false` | Allows more than one item to be open. |
| `disabled` | `false` | Disables interaction for the whole accordion. |
| `orientation` | `'vertical'` | Changes keyboard direction semantics. |
| `loopFocus` | `true` | Loops arrow-key focus through triggers. |
| `keepMounted` | `false` | Keeps closed panels in the DOM. |
| `hiddenUntilFound` | `false` | Uses `hidden="until-found"` so browser find-in-page can reveal closed content. |

Common item/panel props:

- `AccordionItem`: `value`, `disabled`, `onOpenChange`, `className`, `render`.
- `AccordionPanel`: `keepMounted`, `hiddenUntilFound`, `className`, `render`.
- `AccordionHeader` and `AccordionTrigger`: Base UI `render`, `className`, and native element props.
- `AccordionTriggerIcon`: accepts `ComponentProps<'span'>`, custom `children`, and defaults
  `aria-hidden` to `true`.

Controlled example:

```tsx
import { useState } from 'react';
import { Accordion } from 'moduix';

function ControlledAccordion() {
  const [value, setValue] = useState(['returns']);

  return (
    <Accordion value={value} onValueChange={setValue}>
      {/* items */}
    </Accordion>
  );
}
```

Multiple-open example:

```tsx
<Accordion multiple defaultValue={['shipping', 'returns']}>
  {/* items */}
</Accordion>
```

## Defaults and styling

Every exported visual part accepts `className` and receives a stable `data-slot`:

| Part | `data-slot` |
| --- | --- |
| `Accordion` | `accordion-root` |
| `AccordionItem` | `accordion-item` |
| `AccordionHeader` | `accordion-header` |
| `AccordionTrigger` | `accordion-trigger` |
| `AccordionTriggerIcon` | `accordion-trigger-icon` |
| `AccordionPanel` | `accordion-panel` |

Base UI also adds state attributes used by styles and available to consumers:

| Attribute | Where it appears | Meaning |
| --- | --- | --- |
| `data-orientation` | root, panel | Current orientation. |
| `data-disabled` | root, item, trigger, panel | Root or item is disabled. |
| `data-open` | item, panel | Item or panel is open. |
| `data-panel-open` | trigger | Matching panel is open. Used by the icon rotation selector. |
| `data-starting-style` | panel | Panel is entering. |
| `data-ending-style` | panel | Panel is leaving. |

The default trigger is a full-width flex button with hover, focus-visible, disabled, and typography
styles. When `AccordionTrigger` receives Base UI's `render` prop, moduix does not attach default
trigger styles; the custom rendered element owns its styling. This matches other trigger wrappers in
the library and avoids leaking button layout onto custom controls.

`AccordionTriggerIcon` can be customized by passing children:

```tsx
<AccordionTrigger>
  Details
  <AccordionTriggerIcon className={styles.chevron}>
    <ChevronDownIcon />
  </AccordionTriggerIcon>
</AccordionTrigger>
```

```css
.chevron {
  --accordion-icon-open-transform: rotate(180deg);
}
```

CSS variables:

| Variable | Default |
| --- | --- |
| `--accordion-color` | `var(--color-foreground)` |
| `--accordion-disabled-opacity` | `var(--opacity-disabled)` |
| `--accordion-focus-ring-color` | `var(--color-ring)` |
| `--accordion-focus-ring-offset` | `var(--border-width-sm)` |
| `--accordion-focus-ring-width` | `var(--border-width-md)` |
| `--accordion-icon-open-transform` | `rotate(45deg) scale(1.1)` |
| `--accordion-icon-size` | `0.75rem` |
| `--accordion-icon-transition` | `var(--transition-default)` |
| `--accordion-item-border-color` | `var(--color-border)` |
| `--accordion-item-border-width` | `var(--border-width-sm)` |
| `--accordion-panel-color` | `var(--color-muted-foreground)` |
| `--accordion-panel-font-size` | `var(--text-md)` |
| `--accordion-panel-line-height` | `var(--line-height-text-md)` |
| `--accordion-panel-transition` | `var(--transition-default)` |
| `--accordion-trigger-bg` | `var(--color-muted)` |
| `--accordion-trigger-bg-hover` | `var(--color-accent)` |
| `--accordion-trigger-font-size` | `var(--text-md)` |
| `--accordion-trigger-gap` | `var(--spacing-4)` |
| `--accordion-trigger-line-height` | `var(--line-height-text-md)` |
| `--accordion-trigger-padding-x` | `var(--spacing-3)` |
| `--accordion-trigger-padding-y` | `var(--spacing-2)` |

## Accessibility and UX notes

- Keep `AccordionTrigger` inside `AccordionHeader` so the button has a semantic heading context.
- Choose the header level with `AccordionHeader render={<h2 />}` or similar when the surrounding
  document hierarchy requires it.
- Do not put another interactive element inside `AccordionTrigger`; compose actions outside the
  trigger row instead.
- The trigger icon is decorative by default. If a custom icon carries meaning, provide visible text
  or override `aria-hidden` intentionally.
- Closed panels are removed from layout with `hidden` unless `keepMounted` or `hiddenUntilFound` is
  used.

## Intentional differences from Base UI

- Consumers import flat moduix parts (`Accordion`, `AccordionItem`, etc.), not
  `Accordion.Root`/`Accordion.Item`.
- The component is styled by default with CSS Modules and theme variables; it is not an unstyled
  primitive.
- `AccordionTriggerIcon` is a moduix-only helper. It is optional and not required for accessibility.
- No local `items` prop, slot prop map, or generated markup shortcut exists. Repeated rows should be
  rendered with normal React composition.

## Agent notes

- Preserve Base UI keyboard navigation, focus management, ARIA wiring, panel measurement, and
  transition lifecycle.
- Preserve `data-slot` values and documented CSS variables as public styling hooks.
- Keep padding on content wrappers in examples rather than on `AccordionPanel` when animated height
  precision matters.
- Do not add broad sugar unless it removes common real boilerplate while keeping explicit
  composition available.
- If trigger `render` behavior changes, compare with `CollapsibleTrigger` and popup trigger wrappers
  for consistency.

## Local changelog

- Rewritten to document the moduix wrapper contract instead of Base UI examples and API tables.
- Documented that `AccordionTrigger` skips default trigger CSS when Base UI `render` is used, matching
  other custom-render trigger wrappers.
