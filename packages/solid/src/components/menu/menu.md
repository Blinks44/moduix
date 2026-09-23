# Menu

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/menu

## Purpose

`Menu` provides trigger and context menus, including nested, checkbox, and radio choices.

## Public contract

The flat API includes `Menu`, `MenuRootProvider`, `MenuTrigger`, `MenuContextTrigger`, `MenuPositioner`, `MenuContent`, `MenuViewport`, `MenuArrow`, `MenuArrowTip`, `MenuItem`, `MenuTriggerItem`, `MenuSeparator`, `MenuItemGroup`, `MenuItemGroupLabel`, `MenuCheckboxItem`, `MenuRadioItemGroup`, `MenuRadioItem`, `MenuIndicator`, `MenuItemIndicator`, `MenuItemText`, `MenuItemTextContent`, `MenuItemTextIcon`, `MenuItemTextLabel`, `MenuItemShortcut`, `MenuTriggerIcon`, `MenuTriggerItemIcon`, `MenuContext`, `MenuItemContext`, `useMenu`, `useMenuContext`, and `useMenuItemContext`.

## Preservation notes

- Keep Ark menu state, roving focus, typeahead, dismissal, focus restoration, and nested-menu keyboard traversal.
- The popup is portalled by default. Preserve `portalled`, `portalRef`, `lazyMount`, and `unmountOnExit` options.
- Keep Solid child resolution and native `class` prop behavior.

## Styling and accessibility

Ark owns menu roles and state. The wrapper adds default icons, item indicator placement, and stable `data-slot` hooks.