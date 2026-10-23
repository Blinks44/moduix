---
'@moduix/react-tailwind': patch
'@moduix/solid-tailwind': patch
'@moduix/vue-tailwind': patch
---

A size utility on an icon you pass, such as `<StarIcon class="size-5" />`, now overrides the default icon size in `Badge`, `CommandPaletteItemIcon`, `InputGroupAddon`, `InputGroupText`, `NavigationMenuLink`, the `Sidebar` menu buttons and `SidebarGroupAction`, `TabsTrigger`, `Tag`, `TagStartElement`, and `TagEndElement`, as it already did in `Button`. Parts that render their own default icons keep the parent-level `[&>svg]:size-*` override.