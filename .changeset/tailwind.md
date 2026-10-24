---
'@moduix/react-tailwind': minor
'@moduix/solid-tailwind': minor
'@moduix/vue-tailwind': minor
---

Tailwind: Component classes read the same foundation tokens as the CSS Modules packages.

- Tailwind packages: focus rings use the new `outline-focus`, `outline-focus-inset`, `outline-offset-focus`, and `outline-offset-focus-inset` theme utilities instead of fixed `outline-2`, `outline-1`, `outline-offset-2`, and `-outline-offset-1`. They read `--moduix-focus-ring-width`, `--moduix-focus-ring-inset-width`, `--moduix-focus-ring-offset`, and `--moduix-focus-ring-inset-offset`, the same tokens the CSS Modules packages use, so overriding those tokens now changes focus rings in both styling tracks. Default visuals are unchanged. `cn` knows the new utilities, so a consumer class such as `focus-visible:outline-4` still replaces the default. Outlines that draw a border rather than a focus ring (Menu, Navigation Menu, and Popover content) keep `outline-1`.
- Tailwind packages: disabled and read-only states use the new `opacity-disabled` theme utility instead of a fixed `opacity-50`. It reads `--moduix-opacity-disabled`, the same token the CSS Modules packages use, so overriding that token now dims both styling tracks. The default stays 0.5. `cn` knows the new utility, so a consumer class such as `disabled:opacity-75` still replaces the default.
- Tailwind: the default border width (`border`, `border-t`, `border-x`, `divide-y`, and similar) now comes from `--moduix-border-width-sm` through the `--default-border-width` theme variable, as in the CSS Modules packages. Overriding the token now changes borders in both styling tracks. Default visuals are unchanged (1px).
- A size utility on an icon you pass, such as `<StarIcon class="size-5" />`, now overrides the default icon size in `Badge`, `CommandPaletteItemIcon`, `InputGroupAddon`, `InputGroupText`, `NavigationMenuLink`, the `Sidebar` menu buttons and `SidebarGroupAction`, `TabsTrigger`, `Tag`, `TagStartElement`, and `TagEndElement`, as it already did in `Button`. Parts that render their own default icons keep the parent-level `[&>svg]:size-*` override.
- Use the Tailwind v4 `utility-(--variable)` shorthand instead of `utility-[var(--variable)]` for CSS variable values in component classes. The generated CSS and class merging are unchanged.