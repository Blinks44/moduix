---
'@moduix/react': minor
'@moduix/react-tailwind': patch
'@moduix/solid': minor
'@moduix/solid-tailwind': patch
'@moduix/vue': minor
'@moduix/vue-tailwind': patch
---

Accordion: in the Tailwind packages a disabled item's trigger is now dimmed, keeps the default cursor, and no longer gets the hover and pressed background. The trigger styles used `data-disabled`, which Ark sets on the item, indicator, and content but not on the trigger; they now use `:disabled` like the CSS Modules packages.
The CSS Modules packages keep 11 of the 19 `--moduix-accordion-*` variables. The removed `color`, `disabled-opacity`, `focus-ring-color`, `focus-ring-offset`, `focus-ring-width`, `icon-open-transform`, `item-border-width`, and `trigger-bg` variables now use foundation tokens; override them with a class on the part (for example `[data-state='open']` on `AccordionItemIndicator` for a different rotation). Default visuals are unchanged.
Removed the no-op `[hidden]` rule on `AccordionItemContent`: the foundation reset and Tailwind Preflight already hide it.