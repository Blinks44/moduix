# Accordion

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/accordion

## Purpose

`Accordion` presents stacked disclosure panels while preserving Ark's state and keyboard behavior.

## Public contract

The flat API is `Accordion`, `AccordionRootProvider`, `AccordionItem`, `AccordionItemTrigger`, `AccordionItemIndicator`, `AccordionItemContent`, `AccordionItemBody`, `AccordionContext`, `AccordionItemContext`, `useAccordion`, `useAccordionContext`, and `useAccordionItemContext`. Controlled and uncontrolled values, `multiple`, `collapsible`, orientation, and Ark detail callbacks remain available.

## Preservation notes

- Keep Ark lazy mounting, item state, and `--height` / `--width` content measurements intact.
- `AccordionItemIndicator` defaults to `ChevronDownIcon` and turns it 180deg while open; `AccordionItemBody` owns inner spacing.
- Preserve Solid accessors, native children, and the `class` prop.

## Styling and accessibility

Parts expose `data-slot` hooks and Ark state attributes. Keep trigger focus behavior and reduced-motion handling: content animation is `animation: none`, and Ark presence completes the exit at once. Wrap each trigger in a heading element, as the React notes and docs describe. The full contract lives in `packages/react/src/components/accordion/accordion.md`.