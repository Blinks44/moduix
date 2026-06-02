---
title: Context Menu
subtitle: A contextual action menu for right click and long press interactions.
description: moduix wrapper around Base UI context menu primitives with a recommended composition, built-in styling hooks, and convenience helpers for arrows, submenu offsets, and selection indicators.
---

# Context Menu

`ContextMenu` is the moduix context action menu. It keeps Base UI interaction behavior, but exposes
our own composition helpers, slot names, CSS variables, and small DX helpers that match the rest of
the library.

## What is specific to moduix

This component is **not** a direct re-export of the Base UI API.

moduix adds and standardizes:

- `ContextMenuContent` as the default high-level composition. It renders `Portal`, `Positioner`,
  and `Popup` for you.
- `ContextMenuSubmenuContent` with submenu-specific default offsets.
- `showArrow` on content wrappers.
- `indicator="start" | "end"` on checkbox and radio items.
- ready-to-use helpers for structured rows:
  `ContextMenuItemText`, `ContextMenuItemTextContent`, `ContextMenuItemTextIcon`,
  `ContextMenuItemTextLabel`, `ContextMenuItemShortcut`, and `ContextMenuSubmenuTriggerIcon`.
- consistent `data-slot` attributes and CSS variable names under the `--context-menu-*` namespace.

## Recommended composition

Use `ContextMenuContent` unless you explicitly need a custom portal structure or backdrop.

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from 'moduix';

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className={styles.trigger}>Right click here</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem closeOnClick>Open</ContextMenuItem>
        <ContextMenuItem closeOnClick>Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem closeOnClick disabled>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

`ContextMenuTrigger` is intentionally visually light. In product code it should usually wrap an
existing surface such as a card, list row, canvas, or editor area.

## Parts

| Export                             | Role                                                          |
| ---------------------------------- | ------------------------------------------------------------- |
| `ContextMenu`                      | Root state and interaction controller.                        |
| `ContextMenuSubmenu`               | Nested menu root used inside another menu.                    |
| `ContextMenuTrigger`               | Opens the menu on right click or long press.                  |
| `ContextMenuPortal`                | Low-level portal part.                                        |
| `ContextMenuBackdrop`              | Optional overlay behind the menu.                             |
| `ContextMenuPositioner`            | Low-level positioning part.                                   |
| `ContextMenuPopup`                 | Low-level popup surface.                                      |
| `ContextMenuArrow`                 | Popup arrow. Renders the moduix arrow icon by default.        |
| `ContextMenuContent`               | Recommended wrapper around portal + positioner + popup.       |
| `ContextMenuSubmenuContent`        | Same as `ContextMenuContent`, but with submenu-tuned offsets. |
| `ContextMenuItem`                  | Action row.                                                   |
| `ContextMenuLinkItem`              | Link row for navigation actions.                              |
| `ContextMenuSeparator`             | Visual divider between groups of actions.                     |
| `ContextMenuGroup`                 | Container for labeled sets of controls.                       |
| `ContextMenuGroupLabel`            | Label for a group.                                            |
| `ContextMenuSubmenuTrigger`        | Row that opens a nested submenu.                              |
| `ContextMenuSubmenuTriggerIcon`    | Trailing submenu chevron helper.                              |
| `ContextMenuRadioGroup`            | Exclusive selection container.                                |
| `ContextMenuRadioItem`             | Radio row with optional indicator placement helper.           |
| `ContextMenuRadioItemIndicator`    | Indicator cell for radio rows. Defaults to `CheckIcon`.       |
| `ContextMenuCheckboxItem`          | Checkbox row with optional indicator placement helper.        |
| `ContextMenuCheckboxItemIndicator` | Indicator cell for checkbox rows. Defaults to `CheckIcon`.    |
| `ContextMenuItemText`              | Grid/text wrapper for checkbox and radio item labels.         |
| `ContextMenuItemTextContent`       | Inline layout helper for icon + label content.                |
| `ContextMenuItemTextIcon`          | Leading icon cell inside `ContextMenuItemTextContent`.        |
| `ContextMenuItemTextLabel`         | Text label inside `ContextMenuItemTextContent`.               |
| `ContextMenuItemShortcut`          | Shortcut hint aligned to the trailing edge.                   |

## Public props

All parts forward the matching Base UI primitive props. The table below covers the parts where
moduix adds behavior, defaults, or styling expectations.

### `ContextMenuTrigger`

| Prop        | Type         | Notes                                                                                                             |
| ----------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| `className` | `string`     | Applied to the trigger root.                                                                                      |
| `render`    | `RenderProp` | If you use `render`, moduix does **not** merge the default trigger class. You own the DOM and styling completely. |
| `disabled`  | `boolean`    | Disables context-menu interactions and applies disabled trigger styling.                                          |

### `ContextMenuContent`

`ContextMenuContentProps` is exported from `moduix`.

| Prop                 | Type                                      | Default         | Notes                                       |
| -------------------- | ----------------------------------------- | --------------- | ------------------------------------------- |
| `className`          | `string`                                  | -               | Applied to the popup surface.               |
| `showArrow`          | `boolean`                                 | `false`         | Renders `ContextMenuArrow` before children. |
| `sideOffset`         | `number \| ((args) => number)`            | `8`             | Gap between pointer/anchor and popup.       |
| `side`               | `PositionerSide`                          | Base UI default | Forwarded to `ContextMenuPositioner`.       |
| `align`              | `PositionerAlign`                         | Base UI default | Forwarded to `ContextMenuPositioner`.       |
| `alignOffset`        | `number \| ((args) => number)`            | Base UI default | Forwarded to `ContextMenuPositioner`.       |
| `arrowPadding`       | `number`                                  | Base UI default | Limits arrow collision near edges.          |
| `collisionAvoidance` | `CollisionAvoidance`                      | Base UI default | Forwarded to `ContextMenuPositioner`.       |
| `collisionBoundary`  | `Boundary`                                | Base UI default | Forwarded to `ContextMenuPositioner`.       |
| `collisionPadding`   | `number \| Partial<Record<Side, number>>` | Base UI default | Forwarded to `ContextMenuPositioner`.       |

`ContextMenuContent` also forwards popup props such as event handlers, id, and accessibility
attributes to `ContextMenuPopup`.

### `ContextMenuSubmenuContent`

Uses the same exported `ContextMenuContentProps` type.

| Prop          | Default                        | Notes                                                   |
| ------------- | ------------------------------ | ------------------------------------------------------- | ---------------------------- | --------------------------------------------------------- |
| `sideOffset`  | `({ side }) => (side === 'top' |                                                         | side === 'bottom' ? 4 : -4)` | Keeps nested menus visually connected to the parent item. |
| `alignOffset` | same as `sideOffset`           | Keeps submenu alignment consistent with the parent row. |

### Action rows

| Part                      | Extra moduix API               | Notes                                                                            |
| ------------------------- | ------------------------------ | -------------------------------------------------------------------------------- |
| `ContextMenuItem`         | no extra props                 | Use for command-style actions. `closeOnClick` is commonly enabled in examples.   |
| `ContextMenuLinkItem`     | no extra props                 | Use for navigation; forwards link props such as `href`.                          |
| `ContextMenuCheckboxItem` | `indicator?: 'start' \| 'end'` | Exported as `ContextMenuCheckboxItemProps`. Controls indicator column placement. |
| `ContextMenuRadioItem`    | `indicator?: 'start' \| 'end'` | Exported as `ContextMenuRadioItemProps`. Controls indicator column placement.    |

`ContextMenuIndicatorPosition` is exported for typing helper utilities and wrappers.

## Composition patterns

### Simple action menu

```tsx
<ContextMenu>
  <ContextMenuTrigger className={styles.trigger}>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem closeOnClick>Copy</ContextMenuItem>
    <ContextMenuItem closeOnClick>Paste</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem closeOnClick disabled>
      Share
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

### Nested submenu

```tsx
<ContextMenu>
  <ContextMenuTrigger className={styles.trigger}>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem closeOnClick>Add to library</ContextMenuItem>

    <ContextMenuSubmenu>
      <ContextMenuSubmenuTrigger>
        Add to playlist
        <ContextMenuSubmenuTriggerIcon />
      </ContextMenuSubmenuTrigger>

      <ContextMenuSubmenuContent>
        <ContextMenuItem closeOnClick>Inside Out</ContextMenuItem>
        <ContextMenuItem closeOnClick>Night Beats</ContextMenuItem>
      </ContextMenuSubmenuContent>
    </ContextMenuSubmenu>
  </ContextMenuContent>
</ContextMenu>
```

### Checkbox or radio controls

```tsx
<ContextMenuGroup>
  <ContextMenuGroupLabel>Workspace</ContextMenuGroupLabel>

  <ContextMenuCheckboxItem checked={showSearch} onCheckedChange={setShowSearch}>
    <ContextMenuCheckboxItemIndicator />
    <ContextMenuItemText>Search</ContextMenuItemText>
  </ContextMenuCheckboxItem>

  <ContextMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar} indicator="end">
    <ContextMenuItemText>
      <ContextMenuItemTextContent>
        <ContextMenuItemTextIcon>
          <SidebarIcon />
        </ContextMenuItemTextIcon>
        <ContextMenuItemTextLabel>Sidebar</ContextMenuItemTextLabel>
      </ContextMenuItemTextContent>
    </ContextMenuItemText>
    <ContextMenuCheckboxItemIndicator />
  </ContextMenuCheckboxItem>
</ContextMenuGroup>
```

### Low-level custom composition

Use the low-level parts only when you need a custom backdrop, custom DOM structure, or direct access
to `Portal`, `Positioner`, and `Popup`.

```tsx
<ContextMenu>
  <ContextMenuTrigger className={styles.customTrigger}>Right click card</ContextMenuTrigger>
  <ContextMenuPortal>
    <ContextMenuBackdrop className={styles.customBackdrop} />
    <ContextMenuPositioner sideOffset={12}>
      <ContextMenuPopup className={styles.customPopup}>
        <ContextMenuArrow />
        <ContextMenuItem closeOnClick>Open details</ContextMenuItem>
        <ContextMenuItem closeOnClick>Copy link</ContextMenuItem>
      </ContextMenuPopup>
    </ContextMenuPositioner>
  </ContextMenuPortal>
</ContextMenu>
```

Do not place `ContextMenuPortal`, `ContextMenuPositioner`, or `ContextMenuPopup` inside
`ContextMenuContent`; `ContextMenuContent` already renders those parts.

## Styling API

### `className`

Every exported part accepts `className`.

For the higher-level wrappers:

- `ContextMenuContent.className` styles the popup surface.
- `ContextMenuSubmenuContent.className` styles the submenu popup surface.
- `ContextMenuTrigger.className` styles the interactive target.

### `data-slot`

moduix applies stable `data-slot` values to every exported part:

| Part                               | `data-slot`                            |
| ---------------------------------- | -------------------------------------- |
| `ContextMenuTrigger`               | `context-menu-trigger`                 |
| `ContextMenuPortal`                | `context-menu-portal`                  |
| `ContextMenuBackdrop`              | `context-menu-backdrop`                |
| `ContextMenuPositioner`            | `context-menu-positioner`              |
| `ContextMenuPopup`                 | `context-menu-popup`                   |
| `ContextMenuArrow`                 | `context-menu-arrow`                   |
| `ContextMenuItem`                  | `context-menu-item`                    |
| `ContextMenuLinkItem`              | `context-menu-link-item`               |
| `ContextMenuSeparator`             | `context-menu-separator`               |
| `ContextMenuGroup`                 | `context-menu-group`                   |
| `ContextMenuGroupLabel`            | `context-menu-group-label`             |
| `ContextMenuSubmenuTrigger`        | `context-menu-submenu-trigger`         |
| `ContextMenuSubmenuTriggerIcon`    | `context-menu-submenu-trigger-icon`    |
| `ContextMenuRadioGroup`            | `context-menu-radio-group`             |
| `ContextMenuRadioItem`             | `context-menu-radio-item`              |
| `ContextMenuRadioItemIndicator`    | `context-menu-radio-item-indicator`    |
| `ContextMenuCheckboxItem`          | `context-menu-checkbox-item`           |
| `ContextMenuCheckboxItemIndicator` | `context-menu-checkbox-item-indicator` |
| `ContextMenuItemText`              | `context-menu-item-text`               |
| `ContextMenuItemTextContent`       | `context-menu-item-text-content`       |
| `ContextMenuItemTextIcon`          | `context-menu-item-text-icon`          |
| `ContextMenuItemTextLabel`         | `context-menu-item-text-label`         |
| `ContextMenuItemShortcut`          | `context-menu-item-shortcut`           |

### State and layout attributes used by moduix styles

The list below covers attributes that our CSS depends on directly.

| Selector target                                                                                                          | Attributes used by moduix                              |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `ContextMenuTrigger`                                                                                                     | `data-disabled`, `disabled`                            |
| `ContextMenuBackdrop`                                                                                                    | `data-starting-style`, `data-ending-style`             |
| `ContextMenuPopup`                                                                                                       | `data-starting-style`, `data-ending-style`             |
| `ContextMenuArrow`                                                                                                       | `data-side`                                            |
| `ContextMenuItem`, `ContextMenuLinkItem`, `ContextMenuSubmenuTrigger`, `ContextMenuRadioItem`, `ContextMenuCheckboxItem` | `data-highlighted`, `data-popup-open`, `data-disabled` |
| `ContextMenuRadioItem`, `ContextMenuCheckboxItem`                                                                        | `data-indicator-position` (`start` or `end`)           |

### CSS variables

All built-in styling hooks are scoped under `--context-menu-*`.

#### Trigger and shared behavior

| Variable                          | Default                     |
| --------------------------------- | --------------------------- |
| `--context-menu-disabled-opacity` | `var(--opacity-disabled)`   |
| `--context-menu-focus-ring-color` | `var(--color-ring)`         |
| `--context-menu-transition`       | `var(--transition-default)` |

#### Backdrop and arrow

| Variable                             | Default                                                       |
| ------------------------------------ | ------------------------------------------------------------- |
| `--context-menu-backdrop-bg`         | `var(--backdrop-bg, transparent)`                             |
| `--context-menu-backdrop-blur`       | `0`                                                           |
| `--context-menu-backdrop-transition` | `var(--context-menu-transition)`                              |
| `--context-menu-arrow-inline-offset` | `0.8125rem`                                                   |
| `--context-menu-arrow-size`          | `0.5rem`                                                      |
| `--context-menu-arrow-stroke-color`  | `var(--context-menu-popup-border-color, var(--color-border))` |

#### Popup surface

| Variable                            | Default                           |
| ----------------------------------- | --------------------------------- |
| `--context-menu-popup-bg`           | `var(--color-popover)`            |
| `--context-menu-popup-border-color` | `var(--color-border)`             |
| `--context-menu-popup-color`        | `var(--color-popover-foreground)` |
| `--context-menu-popup-max-height`   | `24rem`                           |
| `--context-menu-popup-max-width`    | `20rem`                           |
| `--context-menu-popup-min-width`    | `12rem`                           |
| `--context-menu-popup-padding-y`    | `0.25rem`                         |
| `--context-menu-popup-radius`       | `var(--radius-md)`                |
| `--context-menu-popup-scale`        | `var(--scale-popup)`              |
| `--context-menu-popup-shadow`       | `var(--shadow-lg)`                |

#### Highlight, submenu, and groups

| Variable                                       | Default                         |
| ---------------------------------------------- | ------------------------------- |
| `--context-menu-highlight-bg`                  | `var(--color-foreground)`       |
| `--context-menu-highlight-color`               | `var(--color-background)`       |
| `--context-menu-highlight-inset-x`             | `var(--spacing-1)`              |
| `--context-menu-highlight-radius`              | `var(--radius-sm)`              |
| `--context-menu-submenu-icon-size`             | `0.875rem`                      |
| `--context-menu-submenu-open-bg`               | `var(--color-accent)`           |
| `--context-menu-submenu-trigger-gap`           | `var(--spacing-3)`              |
| `--context-menu-submenu-trigger-padding-x-end` | `1rem`                          |
| `--context-menu-group-padding-y`               | `0`                             |
| `--context-menu-group-label-color`             | `var(--color-muted-foreground)` |
| `--context-menu-group-label-font-size`         | `var(--text-xs)`                |
| `--context-menu-group-label-line-height`       | `var(--line-height-text-xs)`    |
| `--context-menu-group-label-padding-x-start`   | `0.625rem`                      |
| `--context-menu-group-label-padding-x-end`     | `0.75rem`                       |
| `--context-menu-group-label-padding-y`         | `0.35rem`                       |

#### Regular items and shortcuts

| Variable                                       | Default                                                     |
| ---------------------------------------------- | ----------------------------------------------------------- |
| `--context-menu-item-bg`                       | `transparent`                                               |
| `--context-menu-item-disabled-color`           | `var(--color-muted-foreground)`                             |
| `--context-menu-item-font-size`                | `var(--text-sm)`                                            |
| `--context-menu-item-gap`                      | `var(--spacing-2)`                                          |
| `--context-menu-item-height`                   | `var(--popup-item-min-height, 2rem)`                        |
| `--context-menu-item-line-height`              | `var(--popup-item-line-height, var(--line-height-text-sm))` |
| `--context-menu-item-padding-x-start`          | `var(--popup-item-padding-x-start, 1rem)`                   |
| `--context-menu-item-padding-x-end`            | `var(--popup-item-padding-x-end, 1rem)`                     |
| `--context-menu-item-padding-y`                | `var(--popup-item-padding-y, 0.5rem)`                       |
| `--context-menu-item-shortcut-color`           | `var(--color-muted-foreground)`                             |
| `--context-menu-item-shortcut-font-size`       | `var(--text-xs)`                                            |
| `--context-menu-item-shortcut-line-height`     | `var(--line-height-text-xs)`                                |
| `--context-menu-item-shortcut-padding-x-start` | `var(--spacing-4)`                                          |
| `--context-menu-item-text-content-gap`         | `var(--spacing-2)`                                          |
| `--context-menu-item-text-icon-color`          | `currentColor`                                              |
| `--context-menu-item-text-icon-size`           | `1rem`                                                      |

#### Checkbox and radio items

| Variable                                      | Default                                        |
| --------------------------------------------- | ---------------------------------------------- |
| `--context-menu-check-gap`                    | `var(--popup-check-gap, 0.5rem)`               |
| `--context-menu-check-icon-size`              | `100%`                                         |
| `--context-menu-check-indicator-bg`           | `transparent`                                  |
| `--context-menu-check-indicator-border-color` | `transparent`                                  |
| `--context-menu-check-indicator-border-width` | `var(--border-width-sm)`                       |
| `--context-menu-check-indicator-color`        | `currentColor`                                 |
| `--context-menu-check-indicator-padding`      | `0`                                            |
| `--context-menu-check-indicator-radius`       | `var(--radius-xs)`                             |
| `--context-menu-check-indicator-size`         | `var(--popup-check-indicator-size, 0.75rem)`   |
| `--context-menu-check-padding-x-start`        | `var(--popup-check-padding-x-start, 0.625rem)` |

#### Separator

| Variable                                  | Default                                       |
| ----------------------------------------- | --------------------------------------------- |
| `--context-menu-separator-color`          | `var(--color-border)`                         |
| `--context-menu-separator-margin-x-start` | `var(--popup-separator-margin-x-start, 1rem)` |
| `--context-menu-separator-margin-x-end`   | `var(--popup-separator-margin-x-end, 1rem)`   |
| `--context-menu-separator-margin-y`       | `var(--popup-separator-margin-y, 0.375rem)`   |

## UX and accessibility notes

- The root interaction model comes from Base UI, so keyboard navigation, typeahead, submenu
  traversal, dismissal, and focus restoration are handled by the primitive layer.
- `ContextMenuTrigger` supports right click and long press. Make the target visually obvious and big
  enough for touch when you rely on long press.
- Disabled triggers and rows are non-interactive and receive muted styling.
- Use `ContextMenuLinkItem` for navigation and `ContextMenuItem` for imperative actions.
- `ContextMenuItemShortcut` is visual only; it does not bind or listen for keyboard shortcuts.
- For checkbox and radio rows, keep the text and the indicator inside the same row so the whole item
  remains the interactive target.

## Recommendations and limitations

- Prefer `ContextMenuContent` over manual portal composition.
- Prefer `ContextMenuSubmenuContent` over plain `ContextMenuContent` for nested menus so the default
  offsets stay aligned with the rest of the library.
- Use `indicator="end"` only when the trailing indicator genuinely improves scanability; the default
  start position is still the library norm.
- When you use `render` on `ContextMenuTrigger`, you are opting out of the built-in trigger class.
- `ContextMenu` itself does not create a visible trigger surface; examples in docs and Storybook add
  one intentionally.

## Useful built-in sugar

The current component already has the useful sugar we want for common scenarios:

- high-level `ContextMenuContent`;
- submenu-aware `ContextMenuSubmenuContent`;
- `showArrow`;
- default submenu and selection icons;
- `indicator="end"` for checkbox and radio layouts.

No additional helper prop is currently justified without duplicating existing composition patterns or
diverging from `Menu` and `Menubar`.