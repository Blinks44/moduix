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

- Uses `Accordion` as the only public root, alongside `AccordionItem`, `AccordionItemTrigger`,
  `AccordionItemIndicator`, `AccordionItemContent`, and `AccordionItemBody`.
- Supports Ark external state ownership through `AccordionRootProvider` and the moduix-exported
  `useAccordion()`.
- Supports Ark controlled and uncontrolled state with `value`, `defaultValue`, and
  `onValueChange(details)`.
- Supports Ark root behavior props such as `multiple`, `collapsible`, `disabled`, `orientation`,
  `lazyMount`, `unmountOnExit`, `ids`, and `onFocusChange(details)`.
- Uses Ark content animation measurement via `--height` for vertical accordions and `--width`
  for horizontal accordions.
- `AccordionItemIndicator` renders `ChevronDownIcon` by default when no children are passed and
  rotates it 180deg while the item is open.
- `AccordionItemBody` provides the default inner spacing wrapper for panel content.

## Anatomy and exported parts

```text
Accordion
└─ AccordionItem
   ├─ heading element (recommended, for example h3)
   │  └─ AccordionItemTrigger
   │     └─ AccordionItemIndicator
   └─ AccordionItemContent
      └─ AccordionItemBody

AccordionRootProvider
└─ same item tree connected to a useAccordion() store
```

Every styled part accepts `className` and receives a stable `data-slot`:

| Part                     | `data-slot`                | Notes                                                 |
| ------------------------ | -------------------------- | ----------------------------------------------------- |
| `Accordion`              | `accordion-root`           | Styled Ark root.                                      |
| `AccordionRootProvider`  | `accordion-root-provider`  | Styled Ark root provider.                             |
| `AccordionItem`          | `accordion-item`           | Styled Ark item.                                      |
| `AccordionItemTrigger`   | `accordion-item-trigger`   | Styled Ark trigger button.                            |
| `AccordionItemIndicator` | `accordion-item-indicator` | Defaults to `ChevronDownIcon` when no children exist. |
| `AccordionItemContent`   | `accordion-item-content`   | Styled Ark content with Ark size animation.           |
| `AccordionItemBody`      | `accordion-item-body`      | Default inner spacing wrapper for panel body.         |

## Composition

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionItemBody,
  AccordionItemContent,
  AccordionItemIndicator,
  AccordionItemTrigger,
} from '@moduix/react/accordion';

const items = [
  { value: 'shipping', title: 'Shipping', description: 'Delivery times and tracking options.' },
  { value: 'returns', title: 'Returns', description: 'Return windows and refund rules.' },
];

export function AccordionExample() {
  return (
    <Accordion defaultValue={['shipping']}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <h3>
            <AccordionItemTrigger>
              {item.title}
              <AccordionItemIndicator />
            </AccordionItemTrigger>
          </h3>
          <AccordionItemContent>
            <AccordionItemBody>{item.description}</AccordionItemBody>
          </AccordionItemContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

Wrap each trigger in a heading element whose level fits the page outline, as the WAI-ARIA
Accordion pattern asks. Ark does not render the heading, and the trigger does not need to be a direct
child of the item. `reset.css` (or Tailwind Preflight) removes heading margins and font changes, so
the heading adds no visual change.

## Upstream feature coverage

- `Anatomy`: preserved directly through the exported Ark-shaped parts.
- `Controlled`: preserved through `value`, `defaultValue`, and `onValueChange(details)`.
- `Root Provider`: preserved through moduix `useAccordion()` and `AccordionRootProvider`.
- `Multiple` and `Collapsible`: preserved on `Accordion`.
- `Lazy Mount`: preserved through `lazyMount` and `unmountOnExit`.
- `Context` and `Item State`: use `AccordionContext`, `AccordionItemContext`,
  `useAccordionContext()`, and `useAccordionItemContext()` from moduix. `useAccordion()` remains the
  `RootProvider` path. Item state exposes Ark's `expanded`, `focused`, and `disabled` booleans.
- `With Slider`: preserved as normal nested composition; nested Ark widgets keep their own part tree,
  keyboard behavior, and hidden inputs inside `AccordionItemContent`.
- `Content Animation`: preserved through Ark `--height` and `--width` measurement rather than a custom sizing model.

## Accessibility and state

- Ark state/data attributes remain available to consumers:
  - `data-state="open" | "closed"` on item, trigger, indicator, and content
  - `data-disabled`, `data-focus`, `data-controls`, and `data-orientation` on relevant parts
- Every styled part forwards its ref and supports Ark `asChild` for DOM ownership changes.
- Ark callback and focus shapes remain unchanged, including `onValueChange(details)` and
  `onFocusChange(details)`.
- `useAccordion()` is exported from `@moduix/react/accordion` for the recommended
  `AccordionRootProvider` path.
- `RootProvider` must receive the return value from `useAccordion()` and must not be combined with
  `Accordion` for the same accordion instance.
- Ark content sizing variables remain available, especially `--height` and `--width`.
- Trigger alignment uses the logical inline start so labels remain direction-safe in RTL layouts.
- Content animation and indicator transition are disabled when the user requests reduced motion;
  Ark presence completes the exit at once when the animation is `none`.

## Defaults and styling

- Triggers are transparent and use `--moduix-color-muted` on hover and while pressed; items are
  separated by borders.
- Content animation uses the shared foundation keyframes `moduix-accordion-item-content-*`, the same
  ones the Tailwind variants use.
- Horizontal orientation uses fixed defaults (20rem root height, 2.5rem trigger width, 16rem content
  width); override them with `className` on the parts.

CSS variables (the full list lives in `packages/foundation/src/styles/variables-moduix.css`):

| Variable                                 | Default                                |
| ---------------------------------------- | -------------------------------------- |
| `--moduix-accordion-trigger-bg`          | `transparent`                          |
| `--moduix-accordion-trigger-bg-hover`    | `var(--moduix-color-muted)`            |
| `--moduix-accordion-icon-open-transform` | `rotate(180deg)`                       |
| `--moduix-accordion-item-body-gap`       | `var(--moduix-spacing-3)`              |
| `--moduix-accordion-item-body-padding`   | `var(--moduix-spacing-3)`              |
| `--moduix-accordion-item-content-color`  | `var(--moduix-color-muted-foreground)` |

## Intentional sugar and differences from upstream

- moduix ships pre-styled defaults; Ark is intentionally unstyled.
- `AccordionItemIndicator` defaults to `ChevronDownIcon` when children are not provided.
- `AccordionItemBody` removes the need for per-example inner content wrappers just to add spacing.
- `AccordionRootProvider` shares the same default root styling as `Accordion`.
- moduix re-exports `useAccordion()`, `useAccordionContext()`, `useAccordionItemContext()`,
  `AccordionContext`, and `AccordionItemContext` for Ark-shaped provider and context composition.
- Horizontal orientation gets a row layout, opposite-side trigger text rotation, fixed size
  defaults, and `--width`-based content animation in addition to Ark's horizontal keyboard behavior.
- React, Solid, and Vue re-export Ark accordion types such as `AccordionRootProps` and
  `AccordionValueChangeDetails`.

## Agent notes

- Preserve Ark keyboard navigation, focus behavior, and value lifecycle.
- Keep `onValueChange` Ark-style (`details.value`) instead of converting to a custom callback shape.
- Keep `AccordionItemContent` animation based on Ark `--height` and `--width`.
- Keep spacing on `AccordionItemBody`, not on `AccordionItemContent`, so Ark size measurement stays reliable.
- Preserve the moduix `useAccordion()` re-export because docs and `RootProvider` examples depend on it.

## Local changelog

- 2026-10-13: Default look changed to transparent triggers and a rotating chevron. Removed 14 rarely
  used CSS variables (width, line-height, transition, opacity, pressed background, and horizontal
  sizes). CSS Modules now use the shared foundation keyframes. React and Solid re-export Ark types
  like Vue. Docs wrap triggers in headings. Tailwind hover styles on `AccordionItemTrigger` apply
  only on hover-capable devices.
- 2026-09-21: Replaced the compound `Accordion.*` value surface with the shared flat API across
  React, Solid, and Vue. `Accordion` is now the only root value; every other part uses an
  `Accordion`-prefixed named export.
- 2026-08-07: Added direction-safe trigger alignment and reduced-motion handling, expanded regression
  coverage for semantics, refs, `asChild`, provider/context composition, and keyboard endpoints.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through
  foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-09: Re-exported `useAccordion()` from moduix for the recommended `RootProvider` flow.
- 2026-07-06: Added `AccordionItemBody` as a thin inner spacing wrapper.
- 2026-06-24: Added horizontal orientation layout and `--width`-based content animation.
- 2026-06-17: Migrated wrapper internals to Ark UI Accordion and Ark part naming.

Earlier entries described intermediate API shapes that no longer exist; see git history.