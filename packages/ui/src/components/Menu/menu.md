---
title: Menu
subtitle: Dropdown actions, selections, and nested branches built on the moduix menu wrapper.
description: moduix wrapper around Base UI menu primitives with a default popup composition, trigger styling, submenu helpers, detached-trigger support, and stable styling hooks.
---

# Menu

Upstream primitive docs: https://base-ui.com/react/components/menu

`Menu` is the moduix dropdown menu wrapper. It keeps Base UI interaction behavior, but exposes our
own composition helpers, slot names, CSS variables, and a small amount of DX sugar that matches the
rest of the library.

## Purpose

Use `Menu` for command lists anchored to a trigger: action menus, overflow menus, lightweight
selection menus, and nested option groups.

Use:

- `MenuItem` for imperative actions
- `MenuLinkItem` for navigation
- `MenuCheckboxItem` and `MenuRadioItem` for persistent app state
- `MenuSubmenu` for secondary branches

## What is specific to moduix

This component is **not** a direct re-export of the Base UI API.

moduix adds and standardizes:

- `MenuContent` as the default high-level composition. It renders `MenuPortal`, `MenuPositioner`,
  and `MenuPopup` for you.
- `MenuSubmenuContent` with submenu-specific default offsets.
- `showArrow` on content wrappers.
- `createMenuHandle` for detached trigger/root composition.
- `MenuTriggerIcon`, `MenuSubmenuTriggerIcon`, `MenuItemText`, `MenuItemTextContent`,
  `MenuItemTextIcon`, `MenuItemTextLabel`, and `MenuItemShortcut` helpers for common row layouts.
- `indicator="start" | "end"` on checkbox and radio rows.
- stable `data-slot` attributes and CSS variable names under the `--menu-*` namespace.
- exported wrapper types: `MenuPositionerProps`, `MenuContentProps`, `MenuIndicatorPosition`,
  `MenuRadioItemProps`, and `MenuCheckboxItemProps`.

## Recommended composition

Use `MenuContent` unless you explicitly need a custom portal structure, a backdrop, or a manual
viewport.

```tsx
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger, MenuTriggerIcon } from 'moduix';

export function Example() {
  return (
    <Menu>
      <MenuTrigger>
        Actions
        <MenuTriggerIcon />
      </MenuTrigger>
      <MenuContent>
        <MenuItem closeOnClick>Edit</MenuItem>
        <MenuItem closeOnClick>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem closeOnClick disabled>
          Delete
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
```

If you pass `render` to `MenuTrigger`, moduix does **not** merge the default trigger class. You own
the rendered element, its styling, and its spacing completely.

## Parts

| Export                      | Role                                                         |
| --------------------------- | ------------------------------------------------------------ |
| `Menu`                      | Root state and interaction controller.                       |
| `MenuSubmenu`               | Nested menu root used inside another menu.                   |
| `createMenuHandle`          | Shared handle factory for detached trigger/root composition. |
| `MenuTrigger`               | Opens the menu from click or keyboard interaction.           |
| `MenuTriggerIcon`           | Trailing trigger icon helper. Defaults to `ChevronDownIcon`. |
| `MenuPortal`                | Low-level portal part.                                       |
| `MenuBackdrop`              | Optional overlay behind the menu.                            |
| `MenuPositioner`            | Low-level positioning part.                                  |
| `MenuPopup`                 | Low-level popup surface.                                     |
| `MenuArrow`                 | Popup arrow. Renders the moduix arrow icon by default.       |
| `MenuViewport`              | Optional viewport for custom scroll or clipping behavior.    |
| `MenuContent`               | Recommended wrapper around portal + positioner + popup.      |
| `MenuSubmenuContent`        | Same as `MenuContent`, but with submenu-tuned offsets.       |
| `MenuItem`                  | Action row.                                                  |
| `MenuLinkItem`              | Link row for navigation actions.                             |
| `MenuSeparator`             | Visual divider between groups of actions.                    |
| `MenuGroup`                 | Container for labeled sets of controls.                      |
| `MenuGroupLabel`            | Label for a group.                                           |
| `MenuSubmenuTrigger`        | Row that opens a nested submenu.                             |
| `MenuSubmenuTriggerIcon`    | Trailing submenu chevron helper.                             |
| `MenuRadioGroup`            | Exclusive selection container.                               |
| `MenuRadioItem`             | Radio row with optional indicator placement helper.          |
| `MenuRadioItemIndicator`    | Indicator cell for radio rows. Defaults to `CheckIcon`.      |
| `MenuCheckboxItem`          | Checkbox row with optional indicator placement helper.       |
| `MenuCheckboxItemIndicator` | Indicator cell for checkbox rows. Defaults to `CheckIcon`.   |
| `MenuItemText`              | Grid/text wrapper for checkbox and radio labels.             |
| `MenuItemTextContent`       | Inline layout helper for icon + label content.               |
| `MenuItemTextIcon`          | Leading icon cell inside `MenuItemTextContent`.              |
| `MenuItemTextLabel`         | Text label inside `MenuItemTextContent`.                     |
| `MenuItemShortcut`          | Shortcut hint aligned to the trailing edge.                  |

## Public props

All parts forward the matching Base UI primitive props. The table below covers the parts where
moduix adds behavior, defaults, or styling expectations.

### `MenuTrigger`

| Prop          | Type         | Notes                                                                                                             |
| ------------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| `className`   | `string`     | Applied to the trigger root when `render` is not used.                                                            |
| `render`      | `RenderProp` | If you use `render`, moduix does **not** merge the default trigger class. You own the DOM and styling completely. |
| `openOnHover` | `boolean`    | Enables hover-open behavior while keeping keyboard interaction.                                                   |
| `delay`       | `number`     | Delay before hover-open activates when `openOnHover` is enabled.                                                  |
| `disabled`    | `boolean`    | Disables menu interactions and applies disabled trigger styling.                                                  |
| `handle`      | `MenuHandle` | Connects the trigger to a detached `Menu` root created with `createMenuHandle`.                                   |

### `Menu`

`Menu` forwards Base UI root props such as `open`, `defaultOpen`, `onOpenChange`, `modal`, and
`handle`.

### `MenuContent`

`MenuContentProps` is exported from `moduix`.

| Prop                 | Type                                      | Default         | Notes                                |
| -------------------- | ----------------------------------------- | --------------- | ------------------------------------ |
| `className`          | `string`                                  | -               | Applied to the popup surface.        |
| `showArrow`          | `boolean`                                 | `false`         | Renders `MenuArrow` before children. |
| `sideOffset`         | `number \| ((args) => number)`            | `8`             | Gap between trigger and popup.       |
| `side`               | `PositionerSide`                          | Base UI default | Forwarded to `MenuPositioner`.       |
| `align`              | `PositionerAlign`                         | Base UI default | Forwarded to `MenuPositioner`.       |
| `alignOffset`        | `number \| ((args) => number)`            | Base UI default | Forwarded to `MenuPositioner`.       |
| `arrowPadding`       | `number`                                  | Base UI default | Limits arrow collision near edges.   |
| `collisionAvoidance` | `CollisionAvoidance`                      | Base UI default | Forwarded to `MenuPositioner`.       |
| `collisionBoundary`  | `Boundary`                                | Base UI default | Forwarded to `MenuPositioner`.       |
| `collisionPadding`   | `number \| Partial<Record<Side, number>>` | Base UI default | Forwarded to `MenuPositioner`.       |

`MenuContent` also forwards popup props such as event handlers, id, and accessibility attributes to
`MenuPopup`.

### `MenuSubmenuContent`

Uses the same exported `MenuContentProps` type.

| Prop          | Default                        | Notes                                                   |
| ------------- | ------------------------------ | ------------------------------------------------------- | ---------------------------- | --------------------------------------------------------- |
| `sideOffset`  | `({ side }) => (side === 'top' |                                                         | side === 'bottom' ? 4 : -4)` | Keeps nested menus visually connected to the parent item. |
| `alignOffset` | same as `sideOffset`           | Keeps submenu alignment consistent with the parent row. |

### Action rows

| Part               | Extra moduix API               | Notes                                                                          |
| ------------------ | ------------------------------ | ------------------------------------------------------------------------------ |
| `MenuItem`         | no extra props                 | Use for command-style actions. `closeOnClick` is commonly enabled in examples. |
| `MenuLinkItem`     | no extra props                 | Use for navigation; forwards link props such as `href`.                        |
| `MenuCheckboxItem` | `indicator?: 'start' \| 'end'` | Exported as `MenuCheckboxItemProps`. Controls indicator column placement.      |
| `MenuRadioItem`    | `indicator?: 'start' \| 'end'` | Exported as `MenuRadioItemProps`. Controls indicator column placement.         |

`MenuIndicatorPosition` is exported for wrapper utilities and shared typing.

## Composition patterns

### Nested submenu

```tsx
<Menu>
  <MenuTrigger>
    Export
    <MenuTriggerIcon />
  </MenuTrigger>
  <MenuContent>
    <MenuItem closeOnClick>Copy link</MenuItem>

    <MenuSubmenu>
      <MenuSubmenuTrigger>
        Export as
        <MenuSubmenuTriggerIcon />
      </MenuSubmenuTrigger>

      <MenuSubmenuContent>
        <MenuItem closeOnClick>PDF</MenuItem>
        <MenuItem closeOnClick>PNG</MenuItem>
      </MenuSubmenuContent>
    </MenuSubmenu>
  </MenuContent>
</Menu>
```

### Checkbox and radio rows

```tsx
<MenuGroup>
  <MenuGroupLabel>Workspace</MenuGroupLabel>

  <MenuCheckboxItem checked={showSearch} onCheckedChange={setShowSearch}>
    <MenuCheckboxItemIndicator />
    <MenuItemText>Search</MenuItemText>
  </MenuCheckboxItem>

  <MenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar} indicator="end">
    <MenuItemText>
      <MenuItemTextContent>
        <MenuItemTextIcon>
          <SidebarIcon />
        </MenuItemTextIcon>
        <MenuItemTextLabel>Sidebar</MenuItemTextLabel>
      </MenuItemTextContent>
    </MenuItemText>
    <MenuCheckboxItemIndicator />
  </MenuCheckboxItem>
</MenuGroup>
```

### Detached trigger

```tsx
const menuHandle = useMemo(() => createMenuHandle(), []);

return (
  <>
    <MenuTrigger handle={menuHandle}>
      Actions
      <MenuTriggerIcon />
    </MenuTrigger>

    <Menu handle={menuHandle}>
      <MenuContent>
        <MenuItem closeOnClick>Edit</MenuItem>
        <MenuItem closeOnClick>Archive</MenuItem>
      </MenuContent>
    </Menu>
  </>
);
```

### Low-level custom composition

Use the low-level parts only when you need a custom backdrop, a manual viewport, or direct access
to `MenuPortal`, `MenuPositioner`, and `MenuPopup`.

```tsx
<Menu>
  <MenuTrigger className={styles.trigger}>
    Places
    <MenuTriggerIcon />
  </MenuTrigger>
  <MenuPortal>
    <MenuBackdrop className={styles.backdrop} />
    <MenuPositioner sideOffset={12}>
      <MenuPopup className={styles.popup}>
        <MenuArrow />
        <MenuViewport className={styles.viewport}>
          <MenuItem closeOnClick>Open map</MenuItem>
          <MenuItem closeOnClick>Copy location</MenuItem>
        </MenuViewport>
      </MenuPopup>
    </MenuPositioner>
  </MenuPortal>
</Menu>
```

Do not place `MenuPortal`, `MenuPositioner`, `MenuPopup`, or `MenuViewport` inside `MenuContent`;
`MenuContent` already renders the first three parts, and `MenuViewport` is only needed in the
manual path.

## Styling API

### `className`

Every exported part accepts `className`.

For the higher-level wrappers:

- `MenuTrigger.className` styles the interactive trigger when `render` is not used.
- `MenuContent.className` styles the popup surface.
- `MenuSubmenuContent.className` styles the submenu popup surface.
- `MenuViewport.className` is only relevant in manual popup composition.

### `data-slot`

moduix applies stable `data-slot` values to every exported part:

| Part                        | `data-slot`                    |
| --------------------------- | ------------------------------ |
| `MenuTrigger`               | `menu-trigger`                 |
| `MenuTriggerIcon`           | `menu-trigger-icon`            |
| `MenuPortal`                | `menu-portal`                  |
| `MenuBackdrop`              | `menu-backdrop`                |
| `MenuPositioner`            | `menu-positioner`              |
| `MenuPopup`                 | `menu-popup`                   |
| `MenuArrow`                 | `menu-arrow`                   |
| `MenuViewport`              | `menu-viewport`                |
| `MenuItem`                  | `menu-item`                    |
| `MenuLinkItem`              | `menu-link-item`               |
| `MenuSeparator`             | `menu-separator`               |
| `MenuGroup`                 | `menu-group`                   |
| `MenuGroupLabel`            | `menu-group-label`             |
| `MenuSubmenuTrigger`        | `menu-submenu-trigger`         |
| `MenuSubmenuTriggerIcon`    | `menu-submenu-trigger-icon`    |
| `MenuRadioGroup`            | `menu-radio-group`             |
| `MenuRadioItem`             | `menu-radio-item`              |
| `MenuRadioItemIndicator`    | `menu-radio-item-indicator`    |
| `MenuCheckboxItem`          | `menu-checkbox-item`           |
| `MenuCheckboxItemIndicator` | `menu-checkbox-item-indicator` |
| `MenuItemText`              | `menu-item-text`               |
| `MenuItemTextContent`       | `menu-item-text-content`       |
| `MenuItemTextIcon`          | `menu-item-text-icon`          |
| `MenuItemTextLabel`         | `menu-item-text-label`         |
| `MenuItemShortcut`          | `menu-item-shortcut`           |

### State and layout attributes used by moduix styles

The list below covers attributes that our CSS depends on directly.

| Selector target                                                                       | Attributes used by moduix                              |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `MenuTrigger`                                                                         | `data-popup-open`, `data-disabled`, `disabled`         |
| `MenuBackdrop`                                                                        | `data-starting-style`, `data-ending-style`             |
| `MenuPopup`                                                                           | `data-starting-style`, `data-ending-style`             |
| `MenuArrow`                                                                           | `data-side`                                            |
| `MenuItem`, `MenuLinkItem`, `MenuSubmenuTrigger`, `MenuRadioItem`, `MenuCheckboxItem` | `data-highlighted`, `data-popup-open`, `data-disabled` |
| `MenuRadioItem`, `MenuCheckboxItem`                                                   | `data-indicator-position` (`start` or `end`)           |
| `MenuCheckboxItem`                                                                    | `data-checked`                                         |

### CSS variables

All built-in styling hooks are scoped under `--menu-*`.

#### Trigger and shared behavior

| Variable                      | Default                            |
| ----------------------------- | ---------------------------------- |
| `--menu-disabled-opacity`     | `var(--opacity-disabled)`          |
| `--menu-focus-ring-color`     | `var(--color-ring)`                |
| `--menu-focus-ring-width`     | `var(--menu-trigger-border-width)` |
| `--menu-transition`           | `var(--transition-default)`        |
| `--menu-trigger-bg`           | `var(--color-background)`          |
| `--menu-trigger-bg-hover`     | `var(--color-accent)`              |
| `--menu-trigger-bg-active`    | `var(--menu-trigger-bg-hover)`     |
| `--menu-trigger-border-color` | `var(--color-border)`              |
| `--menu-trigger-border-width` | `var(--border-width-sm)`           |
| `--menu-trigger-color`        | `var(--color-foreground)`          |
| `--menu-trigger-gap`          | `0.5rem`                           |
| `--menu-trigger-height`       | `var(--size-lg)`                   |
| `--menu-trigger-icon-size`    | `1rem`                             |
| `--menu-trigger-padding-x`    | `0.875rem`                         |
| `--menu-trigger-padding-y`    | `0.5rem`                           |
| `--menu-trigger-radius`       | `var(--radius-md)`                 |

#### Backdrop, popup, viewport, and arrow

| Variable                     | Default                                               |
| ---------------------------- | ----------------------------------------------------- |
| `--menu-backdrop-bg`         | `var(--backdrop-bg, var(--color-overlay))`            |
| `--menu-backdrop-blur`       | `4px`                                                 |
| `--menu-backdrop-transition` | `var(--transition-default)`                           |
| `--menu-popup-bg`            | `var(--color-popover)`                                |
| `--menu-popup-border-color`  | `var(--color-border)`                                 |
| `--menu-popup-border-width`  | `var(--border-width-sm)`                              |
| `--menu-popup-color`         | `var(--color-popover-foreground)`                     |
| `--menu-popup-max-height`    | `24rem`                                               |
| `--menu-popup-max-width`     | `20rem`                                               |
| `--menu-popup-min-width`     | `12rem`                                               |
| `--menu-popup-padding-y`     | `0.25rem`                                             |
| `--menu-popup-radius`        | `var(--radius-md)`                                    |
| `--menu-popup-scale`         | `var(--scale-popup)`                                  |
| `--menu-popup-shadow`        | `var(--shadow-lg)`                                    |
| `--menu-popup-width`         | `auto`                                                |
| `--menu-popup-height`        | `auto`                                                |
| `--menu-arrow-size`          | `0.5rem`                                              |
| `--menu-arrow-inline-offset` | `0.8125rem`                                           |
| `--menu-arrow-stroke-color`  | `var(--menu-popup-border-color, var(--color-border))` |
| `--menu-arrow-width`         | `1.25rem`                                             |
| `--menu-arrow-height`        | `0.625rem`                                            |

#### Items, highlights, groups, and submenu rows

| Variable                               | Default                                   |
| -------------------------------------- | ----------------------------------------- |
| `--menu-highlight-bg`                  | `var(--color-foreground)`                 |
| `--menu-highlight-color`               | `var(--color-background)`                 |
| `--menu-highlight-inset-x`             | `var(--spacing-1)`                        |
| `--menu-highlight-radius`              | `var(--radius-sm)`                        |
| `--menu-item-bg`                       | `transparent`                             |
| `--menu-item-bg-disabled`              | `var(--menu-item-bg)`                     |
| `--menu-item-disabled-color`           | `var(--color-muted-foreground)`           |
| `--menu-item-gap`                      | `var(--spacing-2)`                        |
| `--menu-item-height`                   | `var(--popup-item-min-height, 2rem)`      |
| `--menu-item-padding-x-start`          | `var(--popup-item-padding-x-start, 1rem)` |
| `--menu-item-padding-x-end`            | `var(--popup-item-padding-x-end, 1rem)`   |
| `--menu-item-padding-y`                | `var(--popup-item-padding-y, 0.5rem)`     |
| `--menu-item-shortcut-color`           | `var(--color-muted-foreground)`           |
| `--menu-item-shortcut-padding-x-start` | `var(--spacing-4)`                        |
| `--menu-item-text-content-gap`         | `var(--spacing-2)`                        |
| `--menu-item-text-icon-size`           | `1rem`                                    |
| `--menu-group-padding-y`               | `0`                                       |
| `--menu-group-label-color`             | `var(--color-muted-foreground)`           |
| `--menu-group-label-padding-y`         | `0.35rem`                                 |
| `--menu-submenu-icon-size`             | `0.875rem`                                |
| `--menu-submenu-open-bg`               | `var(--color-accent)`                     |
| `--menu-submenu-trigger-gap`           | `var(--spacing-3)`                        |

#### Checkbox, radio, and separator styling

| Variable                                         | Default                                        |
| ------------------------------------------------ | ---------------------------------------------- |
| `--menu-check-gap`                               | `var(--popup-check-gap, 0.5rem)`               |
| `--menu-check-indicator-size`                    | `var(--popup-check-indicator-size, 0.75rem)`   |
| `--menu-check-padding-x-start`                   | `var(--popup-check-padding-x-start, 0.625rem)` |
| `--menu-checkbox-indicator-bg`                   | `transparent`                                  |
| `--menu-checkbox-indicator-bg-checked`           | `var(--menu-checkbox-indicator-bg)`            |
| `--menu-checkbox-indicator-border-color`         | `currentColor`                                 |
| `--menu-checkbox-indicator-border-color-checked` | `var(--menu-checkbox-indicator-border-color)`  |
| `--menu-checkbox-indicator-border-width`         | `0`                                            |
| `--menu-checkbox-indicator-radius`               | `var(--radius-xs)`                             |
| `--menu-separator-color`                         | `var(--color-border)`                          |
| `--menu-separator-height`                        | `var(--border-width-sm)`                       |
| `--menu-separator-margin-x-start`                | `var(--popup-separator-margin-x-start, 1rem)`  |
| `--menu-separator-margin-x-end`                  | `var(--popup-separator-margin-x-end, 1rem)`    |
| `--menu-separator-margin-y`                      | `var(--popup-separator-margin-y, 0.375rem)`    |

There are no variant props. Customization is done through composition, `className`, `data-slot`,
state attributes, and `--menu-*` variables.

## UX and accessibility notes

- The root interaction model comes from Base UI, so keyboard navigation, typeahead, submenu
  traversal, dismissal, collision handling, and focus restoration are handled by the primitive
  layer.
- Disabled triggers and rows are non-interactive and receive muted styling.
- `MenuItemShortcut` is visual only; it does not bind or listen for keyboard shortcuts.
- Use `MenuLinkItem` for navigation and `MenuItem` for imperative actions.
- For checkbox and radio rows, keep the label and indicator inside the same row so the whole row
  remains the interactive target.
- `openOnHover` is useful for desktop-style menus, but use it sparingly on touch-heavy flows.
- `MenuTriggerIcon`, `MenuSubmenuTriggerIcon`, and `MenuItemTextIcon` are layout helpers. They do
  not add semantics on their own.

## Recommendations and limitations

- Prefer `MenuContent` over manual portal composition.
- Prefer `MenuSubmenuContent` over plain `MenuContent` for nested menus so the default offsets stay
  aligned with the rest of the library.
- `MenuContent` does **not** render `MenuViewport` for you. Use `MenuViewport` only in manual popup
  composition when you need scroll clipping or a custom max-height behavior.
- Use `indicator="end"` only when the trailing indicator genuinely improves scanability; the default
  start position is still the library norm.
- When you use `render` on `MenuTrigger`, you are opting out of the built-in trigger class.
- `showArrow` only toggles the default `MenuArrow`. Custom arrow structure should stay in explicit
  composition.

## Useful built-in sugar

The current component already has the useful sugar we want for common scenarios:

- `MenuContent` and `MenuSubmenuContent`
- `showArrow`
- `createMenuHandle`
- `indicator="start" | "end"`
- trigger, submenu, and item text helper parts

No additional wrapper sugar is currently justified beyond that surface.

## Agent notes

- Preserve the current `render` behavior on `MenuTrigger`: default trigger styling is skipped
  entirely when consumers supply a custom render target.
- Preserve the current `MenuContent` structure. It renders `MenuPortal`, `MenuPositioner`, and
  `MenuPopup`, but **not** `MenuViewport`.
- Preserve the submenu offset helper defaults in `MenuSubmenuContent`.
- Preserve the stable `data-slot` names and `--menu-*` CSS variable namespace.
- If wrapper-specific props change, update this file, the Storybook stories, and the docs examples in
  the same task.

## Local changelog

- 2026-06-02: Rewrote the local documentation around the actual moduix wrapper contract instead of
  upstream Base UI docs, documented the no-implicit-viewport behavior of `MenuContent`, and recorded
  the exported wrapper prop types.