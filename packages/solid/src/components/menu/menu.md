# Menu

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/menu

## Purpose

`Menu` provides trigger and context menus, including nested, checkbox, and radio choices.

## Public contract

The flat API includes `Menu`, `MenuRootProvider`, `MenuTrigger`, `MenuContextTrigger`, `MenuPositioner`, `MenuContent`, `MenuViewport`, `MenuArrow`, `MenuArrowTip`, `MenuItem`, `MenuTriggerItem`, `MenuSeparator`, `MenuItemGroup`, `MenuItemGroupLabel`, `MenuCheckboxItem`, `MenuRadioItemGroup`, `MenuRadioItem`, `MenuIndicator`, `MenuItemIndicator`, `MenuItemText`, `MenuItemTextContent`, `MenuItemTextIcon`, `MenuItemTextLabel`, `MenuItemShortcut`, `MenuTriggerItemIcon`, `MenuContext`, `MenuItemContext`, `useMenu`, `useMenuContext`, and `useMenuItemContext`, plus the same type exports as React.

## Preservation notes

- Keep Ark menu state, roving focus, typeahead, dismissal, focus restoration, and nested-menu keyboard traversal.
- The popup is portalled by default. Preserve `portalled`, `portalRef`, and the `lazyMount` and `unmountOnExit` defaults of `true`.
- Keep Solid child resolution and native `class` prop behavior. `asChild` takes a render function, and a ref on a part is not forwarded through it.

## Styling and accessibility

Ark owns menu roles and state. `MenuTrigger` and `MenuContextTrigger` are unstyled; compose them with `asChild`. The styling contract (three CSS variables, shared `--moduix-popup-*` variables, default icons, `tone`, `indicator`) is described in the React `menu.md`.