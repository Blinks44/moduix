---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Steps: The root now fills its container instead of stopping at `52rem`, and no longer forces `--moduix-color-foreground`, so it inherits the surrounding text color. Limit the width with `max-width` in your own class.
The vertical separator now ends `spacing-2` before the next indicator, matching the gap below the current one, instead of touching it. The next trigger now darkens on hover; before, its hover color equaled its background.
The CSS Modules packages keep 2 `--moduix-steps-*` variables instead of 65: `indicator-size` and `gap`, which also position the vertical separator. The root, list, item, trigger, indicator, separator, content, completed content, action button, progress, and focus ring variables are removed in favor of foundation tokens; override them with a class on the part.
Remove styles with no effect: list resets on Ark's `div`, the default `row` and `stretch` flex values, the current indicator background equal to the base one, the indicator opacity transition, the `[data-disabled]` checks on the previous and next triggers (Ark sets only `disabled`), and the Tailwind progress `motion-reduce` override that the duration token already covers.
React and Solid now re-export the Ark Steps part prop, details, and hook types; all adapters export `StepInvalidDetails`. The Vue root takes its emits from Ark instead of a hand-written copy.