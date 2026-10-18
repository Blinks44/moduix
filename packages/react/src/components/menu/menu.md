# Menu

Upstream references (accessed 2026-10-18):

- Ark UI: https://ark-ui.com/docs/components/menu
- Chakra UI: https://chakra-ui.com/docs/components/menu
- shadcn/ui: https://ui.shadcn.com/docs/components/dropdown-menu

## Purpose

`Menu` renders trigger-anchored actions, context menus, links, checkbox/radio choices, and nested
command trees.

## Upstream model to preserve

- Uses `@ark-ui/react/menu` directly and keeps the Ark parts: `Root`, `RootProvider`, `Trigger`,
  `ContextTrigger`, `Positioner`, `Content`, `Arrow`, `ArrowTip`, `Item`, `TriggerItem`,
  `Separator`, `ItemGroup`, `ItemGroupLabel`, `CheckboxItem`, `RadioItemGroup`, `RadioItem`,
  `Indicator`, `ItemIndicator`, and `ItemText`.
- Callbacks and state stay Ark-shaped: `onOpenChange(details)`, `onHighlightChange(details)`,
  `onSelect(details)`, `onValueChange(details)`, `onCheckedChange(checked)`, `open`, `defaultOpen`,
  `highlightedValue`, `ids`, `present`, `lazyMount`, and `unmountOnExit`.
- Items are identified by `value`. Do not set item `id`; Ark uses generated IDs for lookup.

## Current behavior contract

- `Menu` and `MenuRootProvider` portal `MenuPositioner` automatically. Set `portalled={false}` to
  render inline, or pass `portalRef` to target a custom container.
- Both default `lazyMount` and `unmountOnExit` to `true` (Ark uses `false`): the content is absent
  until the first open and is removed after the exit animation. Set `unmountOnExit={false}` to
  keep it after the first open.
- `MenuTrigger` and `MenuContextTrigger` are unstyled, like the Dialog and Drawer triggers. Compose
  the trigger with `asChild` and `Button`; style a context area with a class.
- `MenuViewport` is a moduix part (not Ark state) that scrolls the items at
  `--moduix-menu-popup-max-height` or Ark's available height. Keep an optional `MenuArrow` as a
  direct `MenuContent` child, next to the viewport, so the scroll clip does not cut it.
- `MenuContent` and `MenuViewport` support `asChild` without inspecting or reordering children.
- Refs forward to the Ark DOM parts. `useMenu`, `MenuContext`, `useMenuContext`, `MenuItemContext`,
  and `useMenuItemContext` are exported by moduix.
- Types: `MenuRootProps` and `MenuRootProviderProps` add `portalled` and `portalRef`;
  `MenuItemProps` adds `tone`; `MenuCheckboxItemProps` and `MenuRadioItemProps` add `indicator`.
  The other part props, callback details, and hook types are re-exported from Ark, with the same
  list in every adapter.

## Anatomy and exported parts

```text
Menu
├─ MenuTrigger
│  └─ MenuIndicator
├─ MenuContextTrigger
└─ Overlay subtree (automatically portalled)
   └─ MenuPositioner
      └─ MenuContent
         ├─ MenuArrow
         │  └─ MenuArrowTip
         └─ MenuViewport
            ├─ MenuItem
            │  ├─ MenuItemText
            │  │  └─ MenuItemTextContent
            │  │     ├─ MenuItemTextIcon
            │  │     └─ MenuItemTextLabel
            │  └─ MenuItemShortcut
            ├─ MenuCheckboxItem / MenuRadioItem (in MenuRadioItemGroup)
            │  ├─ MenuItemIndicator
            │  └─ MenuItemText
            ├─ MenuItemGroup
            │  └─ MenuItemGroupLabel
            ├─ MenuSeparator
            └─ Menu (nested)
               ├─ MenuTriggerItem
               │  └─ MenuTriggerItemIcon
               └─ MenuPositioner → MenuContent → MenuViewport
```

Every rendered part exposes a kebab-case `data-slot` (`menu-trigger`, `menu-item-text-label`, and
so on). Checkbox and radio items also expose `data-indicator-position`.

## Composition

```tsx
import { Button } from '@moduix/react/button';
import {
  Menu,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@moduix/react/menu';

export function Example() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button>
          Actions
          <MenuIndicator />
        </Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="delete" tone="destructive">
              Delete
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}
```

A nested menu is another `Menu` inside the parent viewport with its own `MenuTriggerItem`,
`MenuPositioner`, and `MenuContent`. Use `MenuRootProvider` with `useMenu()` only when state lives
outside the tree, and never render a second root for the same store.

## Intentional sugar

- Default icons: `MenuIndicator` (chevron down), `MenuTriggerItemIcon` (chevron right, mirrored in
  RTL), and `MenuItemIndicator` (check). Children replace them; a custom direct SVG fills the box.
- `tone="destructive"` on `MenuItem`, mirrored as `data-tone`.
- `indicator="start" | "end" | "none"` on checkbox and radio items, default `start`, mirrored as
  `data-indicator-position`. The indicator column stays reserved, so selection does not move text.
- `MenuItemShortcut` and the row helpers `MenuItemTextContent`, `MenuItemTextIcon`, and
  `MenuItemTextLabel`: the icon does not shrink and only the label gets the ellipsis.

## Styling

- CSS Modules expose three variables: `--moduix-menu-popup-min-width` (12rem, never narrower than
  the trigger), `--moduix-menu-popup-max-width` (20rem), and `--moduix-menu-popup-max-height`
  (24rem, on the viewport). Everything else comes from foundation tokens and the shared
  `--moduix-popup-*` variables for items, check rows, highlight, separators, group labels, list
  padding, and motion; override the rest with a class on the part.
- Content uses an outline as its border so `MenuArrow` paints over the edge and joins it.
- The highlight is an inset `::before`, so the whole row stays clickable. Highlighted rows and a
  trigger item with an open submenu share the accent background and text color.
- Disabled items are muted through the text color, including destructive ones.
- Content motion uses the foundation `moduix-popup-in` and `moduix-popup-out` keyframes; reduced
  motion shortens the animation to 1ms so Ark presence still sees `animationend`.

## Agent notes

Keep `MenuContent` the real Ark content part. Do not reintroduce a wrapper that renders, reorders,
or detects `Positioner`, `Viewport`, or `Arrow`; only portal transport belongs to the root. Do not
add a native skin to `MenuTrigger` or `MenuContextTrigger`. `SplitButton` reuses the menu content
and positioner styles (CSS Modules) and recipes (`Menu.variants.ts` in Tailwind).