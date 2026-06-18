# Menu

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/menu
- Chakra UI: https://chakra-ui.com/docs/components/menu

## Purpose

`Menu` renders trigger-anchored actions, context menus, links, checkbox/radio choices, and nested
command trees.

## Upstream model to preserve

The wrapper follows Ark UI `@ark-ui/react/menu` directly. Preserve the Ark parts:
`Root`, `RootProvider`, `Trigger`, `ContextTrigger`, `Positioner`, `Content`, `Arrow`, `ArrowTip`,
`Item`, `TriggerItem`, `Separator`, `ItemGroup`, `ItemGroupLabel`, `CheckboxItem`,
`RadioItemGroup`, `RadioItem`, `ItemIndicator`, `ItemText`, `Context`, and `ItemContext`.

Callbacks and state shapes must remain Ark-shaped: `onOpenChange(details)`,
`onHighlightChange(details)`, `onSelect(details)`, `onValueChange(details)`,
`onCheckedChange(checked)`, `open`, `defaultOpen`, `highlightedValue`, `defaultHighlightedValue`,
`ids`, `present`, `lazyMount`, and `unmountOnExit`.

## Current behavior contract

The component exports thin styled wrappers over Ark parts and mirrors Ark provider/context hooks
through the package barrel: `useMenu`, `useMenuContext`, and `useMenuItemContext`.

Breaking Base UI-era APIs were removed:

- no `render` prop contract; use Ark `asChild`
- no `closeOnClick`; use Ark `closeOnSelect` or item/root defaults
- no `MenuSubmenu`; nested menus are regular `Menu` roots opened by `MenuTriggerItem`
- no `MenuLinkItem`; use `MenuItem asChild` with an anchor
- no high-level `MenuContent` wrapper that hides `Portal` or `Positioner`
- no `createMenuHandle`, `MenuPopup`, `MenuViewport`, `MenuBackdrop`, or `MenuPortal` aliases

## Anatomy and exported parts

```tsx
<Menu>
  <MenuTrigger />
  <Portal>
    <MenuPositioner>
      <MenuContent>
        <MenuArrow>
          <MenuArrowTip />
        </MenuArrow>
        <MenuItem value="edit" />
        <MenuCheckboxItem value="toolbar" checked={checked}>
          <MenuItemIndicator />
          <MenuItemText />
        </MenuCheckboxItem>
        <MenuRadioItemGroup value={value}>
          <MenuRadioItem value="date" />
        </MenuRadioItemGroup>
        <Menu>
          <MenuTriggerItem />
          <Portal>
            <MenuPositioner>
              <MenuContent />
            </MenuPositioner>
          </Portal>
        </Menu>
      </MenuContent>
    </MenuPositioner>
  </Portal>
</Menu>
```

Stable slots:

- `menu-trigger`, `menu-trigger-icon`, `menu-indicator`, `menu-context-trigger`
- `menu-positioner`, `menu-content`, `menu-arrow`, `menu-arrow-tip`
- `menu-item`, `menu-trigger-item`, `menu-trigger-item-icon`, `menu-separator`
- `menu-item-group`, `menu-item-group-label`
- `menu-radio-item-group`, `menu-radio-item`, `menu-checkbox-item`
- `menu-item-indicator`, `menu-item-text`, `menu-item-text-content`, `menu-item-text-icon`,
  `menu-item-text-label`, `menu-item-shortcut`

## Composition

```tsx
import { Button, Menu, MenuContent, MenuItem, MenuPositioner, MenuTrigger, Portal } from 'moduix';

export function Example() {
  return (
    <Menu positioning={{ placement: 'bottom-start', gutter: 8 }}>
      <MenuTrigger asChild>
        <Button>Actions</Button>
      </MenuTrigger>
      <Portal>
        <MenuPositioner>
          <MenuContent>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  );
}
```

Use `Menu.RootProvider` with `useMenu()` only when state must be controlled from outside the tree.
Do not render `Menu` and `Menu.RootProvider` for the same state instance.

## Upstream feature coverage

Supported Ark examples and guides:

- basic button-triggered menus with `Positioner` and `Content`
- controlled `open` state and `onOpenChange(details)`
- `RootProvider` and `useMenu`
- item grouping and labels
- link items through `MenuItem asChild`
- checkbox items and `onCheckedChange(checked)`
- radio item groups and `onValueChange(details)`
- context menus through `ContextTrigger`
- nested menus through child `Menu` roots and `TriggerItem`
- multiple triggers with trigger `value`
- root `onSelect(details)`
- lazy mounting, `present`, and `unmountOnExit`
- custom IDs through root `ids`

## Accessibility and state

Ark owns ARIA roles, roving focus, typeahead, item highlighting, dismissal, focus restoration,
right-click context behavior, long-press context behavior, and nested menu keyboard traversal.

Use `value` for item identity. Do not set arbitrary item `id` values because Ark uses generated
IDs internally for item lookup.

Refs forward to the corresponding Ark DOM part. `MenuTrigger` targets the trigger button,
`MenuContent` targets the menu content element, and item refs target their item elements.

## Defaults and styling

Visual defaults preserve moduix tokens for trigger density, popup radius, shadow, item highlight,
destructive tone, indicators, and shortcuts.

Styles target Ark state and layout hooks:

- `[data-scope='menu']`, `[data-part='trigger']`, `[data-part='content']`, `[data-part='item']`
- `[data-state='open' | 'closed' | 'checked']`
- `[data-highlighted]`, `[data-disabled]`, `[data-placement]`, `[data-side]`
- `--reference-width`, `--available-width`, `--available-height`, `--transform-origin`,
  `--layer-index`, `--arrow-size`, and `--arrow-background`

Public `--menu-*` variables are declared in `packages/ui/src/styles/theme.css`.

## Intentional sugar and differences from upstream

moduix adds leaf-level styling helpers only:

- `MenuTriggerIcon` defaults to `ChevronDownIcon`
- `MenuTriggerItemIcon` defaults to `ChevronRightIcon`
- `MenuItemIndicator` defaults to `CheckIcon`
- `MenuItemShortcut`, `MenuItemTextContent`, `MenuItemTextIcon`, and `MenuItemTextLabel` support
  common row layouts
- `tone="destructive"` on `MenuItem`
- `indicator="start" | "end" | "none"` on checkbox and radio item wrappers

These helpers must not hide the Ark part tree or remap Ark callback detail objects.

## Agent notes

Keep `MenuContent` as the real Ark content part. Do not reintroduce a wrapper that renders
`Portal`, `Positioner`, or `Arrow` internally. Use the public `Portal` export from `moduix` for
popup composition.

When docs import `useMenu`, `useMenuContext`, or `useMenuItemContext`, verify those hooks remain
exported from `packages/ui/src/components/menu/index.ts` and the root package barrel.

## Local changelog

- 2026-06-19: `MenuTrigger` now skips the internal `.trigger` class when `asChild` is enabled, so
  consumer host components (for example, `Button`) keep their own background styles in
  hover/active/open states.
- 2026-06-19: Removed hardcoded hover/open fallback colors on `MenuTrigger`. Hover/open background
  now applies only when `--menu-trigger-bg-hover` and/or `--menu-trigger-bg-active` are explicitly
  set, so `MenuTrigger asChild` does not override consumer button styling.
- 2026-06-19: Changed `MenuTrigger` open-state background fallback to `--menu-trigger-bg` so
  opening a popup no longer forces the hover accent color unless `--menu-trigger-bg-active` is set.
- 2026-06-18: Migrated `Menu` from Base UI to Ark UI React. Removed Base UI compatibility exports
  and rewrote the public contract around Ark parts, `asChild`, `value` items, `RootProvider`,
  `ContextTrigger`, `TriggerItem`, Ark state attributes, and Ark positioning variables.
- 2026-06-16: Added `tone="destructive"` to `MenuItem` and `MenuLinkItem`, plus dedicated
  destructive highlight tokens for softer destructive hover backgrounds.
- 2026-06-14: Added `indicator="none"` for checkbox and radio rows so menus can opt out of the
  reserved indicator column without causing selection-time layout shift.
- 2026-06-10: Added phase-specific backdrop and popup motion tokens for menu enter/exit motion.
- 2026-06-02: Rewrote the local documentation around the Base UI wrapper contract.