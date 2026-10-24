---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Tabs: `variant="line"` now works with `orientation="vertical"` and draws the line on the inline-end edge of the list. Previously vertical tabs silently switched to the filled indicator, and `data-variant` reported `default`; now `data-variant` always mirrors the `variant` prop, and `TabsRootProvider` no longer reads orientation from the Ark state.
The indicator is placed from the selected trigger box that Ark measures (`--left`, `--top`, `--width`, `--height`), so it stays aligned when a trigger is taller or shorter than the default. It sits behind the triggers with `z-index: -1`, so triggers no longer set `position` and `z-index`.
A focused panel keeps its rounded corners; before, `border-radius: inherit` squared them while the focus ring was visible. Trigger focus rings are inset outlines, so the scrolling list no longer clips them at the edges of a `line` list. The vertical list is `min(12rem, 40%)` wide instead of switching width with a viewport media query.
In the Tailwind packages the trigger height uses `h-control-sm` like the CSS Modules packages.
The CSS Modules packages keep 7 `--moduix-tabs-*` variables instead of 47: `bg`, `border-color`, `indicator-bg`, `list-bg`, `list-border-color`, `tab-color`, and `tab-color-active` (also the hover and line-indicator color). Size, spacing, radius, typography, focus-ring, disabled, icon, transition, vertical list width, and separate line-indicator variables are removed in favor of foundation tokens; override those with a class on the part, and set indicator motion with Ark `--transition-duration` and `--transition-timing-function` on `TabsIndicator`.
React and Solid export `TabsRootProps`, `TabsRootProviderProps`, `TabsVariant`, and the Ark types `TabContentProps`, `TabIndicatorProps`, `TabListProps`, `TabTriggerProps`, `TabsContextProps`, `TabsFocusChangeDetails`, `TabsValueChangeDetails`, `UseTabsContext`, `UseTabsProps`, and `UseTabsReturn`; Vue exports `TabsVariant`, and its `TabsRootProps` and `TabsRootProviderProps` now include `variant`.
New: `size` (`sm`, `md`, `lg`, default `md`) on `Tabs` and `TabsRootProvider` makes the tab list as tall as a `Button` or `Input` of the same size, like `SegmentGroup`. The default list is now 36px tall instead of 42px (triggers 26px instead of 32px). New: `fitted` stretches a horizontal tab list across the root and shares its width equally between the triggers. `TabsSize` is exported in every framework, and `TabsRootProps` and `TabsRootProviderProps` include `size` and `fitted`.