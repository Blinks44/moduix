---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Sidebar: Colors now come from the foundation sidebar tokens (`--moduix-color-sidebar`, `-sidebar-foreground`, `-sidebar-accent`, `-sidebar-accent-foreground`, `-sidebar-border`, `-sidebar-ring`, or `bg-sidebar` and friends in Tailwind), so themes and the dense, soft, and contrast presets restyle the sidebar. The panel background moves from `card` to `sidebar`, slightly darker in the light theme.
The collapsed icon rail keeps the active and hover backgrounds of navigation buttons instead of making them transparent.
The CSS Modules packages keep 3 of the 64 `--moduix-sidebar-*` variables (`width`, `height`, `trigger-offset-y`). Set colors through the sidebar tokens and change spacing, radius, shadow, minimum height, or item sizes with a class on the part.
`SidebarNavigationSubButton` no longer wraps text in a `sidebar-navigation-sub-label` span: put the text in `SidebarLabel`, as in `SidebarNavigationButton`. In Vue this also stops icons from being wrapped together with the text.
In the Tailwind packages the resize trigger gets the same `0.75rem` hit area and keyboard focus ring as the CSS Modules packages, and `size="sm"` buttons in CSS Modules use the `text-xs` line height as in Tailwind.
React and Solid export the `SidebarRootProps`, `SidebarSide`, and `SidebarNavigationButtonSize` types. Vue renames the `SidebarProps` type to `SidebarRootProps` and exports `SidebarSide` and `SidebarNavigationButtonSize`.`SelectIndicator` placed directly in `SidebarNavigationButton` sits at the trailing edge again in the CSS Modules packages (it had moved over the leading icon after the Select cleanup); in every package it now stays in the flex row, so long values truncate before the arrow, and it hides in the collapsed rail regardless of stylesheet order.