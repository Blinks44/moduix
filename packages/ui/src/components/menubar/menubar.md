---
title: Menubar
subtitle: Application-style command bars with nested menus, controls, and stable styling hooks.
description: moduix wrapper around Base UI menubar and menu primitives with a default popup composition, built-in viewport, submenu helpers, detached-menu handles, and menu-family styling conventions.
---

# Menubar

Upstream primitive docs: https://base-ui.com/react/components/menubar

`Menubar` is the moduix application menubar wrapper. It keeps Base UI interaction behavior, but it
documents and standardizes our own composition helpers, styling hooks, helper parts, and small DX
additions that match the rest of the menu family.

## Purpose

Use `Menubar` for desktop-style command bars: app menus, editor command rails, and compact vertical
action rails that expose nested menus and stateful command rows.

Use:

- `MenubarItem` for imperative actions
- `MenubarLinkItem` for navigation
- `MenubarCheckboxItem` and `MenubarRadioItem` for persistent app state
- `MenubarSubmenu` for secondary branches

## What is specific to moduix

This component is **not** a direct re-export of the Base UI API.

moduix adds and standardizes:

- `MenubarContent` as the default high-level popup composition. It renders `MenubarPortal`,
  `MenubarPositioner`, `MenubarPopup`, and `MenubarViewport` for you.
- `MenubarSubmenuContent` with submenu-specific default offsets.
- `showArrow` on content wrappers.
- `createMenubarMenuHandle` for detached trigger/menu composition for a single `MenubarMenu`.
- `MenubarSubmenuTriggerIcon`, `MenubarItemText`, `MenubarItemTextContent`,
  `MenubarItemTextIcon`, `MenubarItemTextLabel`, and `MenubarItemShortcut` helpers for common row
  layouts.
- `indicator="start" | "end" | "none"` on checkbox and radio rows.
- stable `data-slot` attributes and CSS variable names under the `--menubar-*` namespace.
- exported wrapper types: `MenubarPositionerProps`, `MenubarContentProps`,
  `MenubarIndicatorPosition`, `MenubarRadioItemProps`, and `MenubarCheckboxItemProps`.

## Recommended composition

Use `MenubarContent` unless you explicitly need a custom backdrop, manual portal structure, manual
arrow placement, or direct control over the viewport element.

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSubmenu,
  MenubarSubmenuContent,
  MenubarSubmenuTrigger,
  MenubarSubmenuTriggerIcon,
  MenubarTrigger,
} from 'moduix';

export function Example() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem closeOnClick>New File</MenubarItem>
          <MenubarItem closeOnClick>Open...</MenubarItem>
          <MenubarSubmenu>
            <MenubarSubmenuTrigger>
              Export
              <MenubarSubmenuTriggerIcon />
            </MenubarSubmenuTrigger>
            <MenubarSubmenuContent>
              <MenubarItem closeOnClick>PDF</MenubarItem>
              <MenubarItem closeOnClick>PNG</MenubarItem>
            </MenubarSubmenuContent>
          </MenubarSubmenu>
          <MenubarSeparator />
          <MenubarItem closeOnClick>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

If you pass `render` to `MenubarTrigger`, moduix does **not** merge the default trigger class. You
own the rendered element, its styling, and its spacing completely.

## Parts

| Export                         | Role                                                                  |
| ------------------------------ | --------------------------------------------------------------------- |
| `Menubar`                      | Visible root container for the menubar and its roving-focus behavior. |
| `MenubarMenu`                  | One top-level menu scope inside the bar.                              |
| `MenubarSubmenu`               | Nested menu scope used inside popup content.                          |
| `createMenubarMenuHandle`      | Shared handle factory for detached trigger/menu composition.          |
| `MenubarTrigger`               | Interactive trigger inside the menubar row or column.                 |
| `MenubarPortal`                | Low-level portal part.                                                |
| `MenubarBackdrop`              | Optional overlay behind the popup.                                    |
| `MenubarPositioner`            | Low-level positioning part.                                           |
| `MenubarPopup`                 | Low-level popup surface.                                              |
| `MenubarArrow`                 | Popup arrow. Renders the moduix arrow icon by default.                |
| `MenubarViewport`              | Scroll/clipping wrapper for popup content.                            |
| `MenubarContent`               | Recommended wrapper around portal + positioner + popup + viewport.    |
| `MenubarSubmenuContent`        | Same as `MenubarContent`, but with submenu-tuned offsets.             |
| `MenubarItem`                  | Action row.                                                           |
| `MenubarLinkItem`              | Link row for navigation actions.                                      |
| `MenubarSeparator`             | Visual divider between groups of actions.                             |
| `MenubarGroup`                 | Container for labeled sets of controls.                               |
| `MenubarGroupLabel`            | Label for a group.                                                    |
| `MenubarSubmenuTrigger`        | Row that opens a nested submenu.                                      |
| `MenubarSubmenuTriggerIcon`    | Trailing submenu chevron helper.                                      |
| `MenubarRadioGroup`            | Exclusive selection container.                                        |
| `MenubarRadioItem`             | Radio row with optional indicator placement helper.                   |
| `MenubarRadioItemIndicator`    | Indicator cell for radio rows. Defaults to `CheckIcon`.               |
| `MenubarCheckboxItem`          | Checkbox row with optional indicator placement helper.                |
| `MenubarCheckboxItemIndicator` | Indicator cell for checkbox rows. Defaults to `CheckIcon`.            |
| `MenubarItemText`              | Grid/text wrapper for checkbox and radio labels.                      |
| `MenubarItemTextContent`       | Inline layout helper for icon + label content.                        |
| `MenubarItemTextIcon`          | Leading icon cell inside `MenubarItemTextContent`.                    |
| `MenubarItemTextLabel`         | Text label inside `MenubarItemTextContent`.                           |
| `MenubarItemShortcut`          | Shortcut hint aligned to the trailing edge.                           |

## Public props

All parts forward the matching Base UI primitive props. The table below covers the parts where
moduix adds behavior, defaults, or styling expectations.

### `Menubar`

`Menubar` forwards Base UI root props such as `orientation`, `modal`, `disabled`, and `loopFocus`.

| Prop          | Type                         | Default        | Notes                                                             |
| ------------- | ---------------------------- | -------------- | ----------------------------------------------------------------- |
| `className`   | `string`                     | -              | Applied to the visible menubar root.                              |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Switches between a row-style menubar and a vertical command rail. |
| `modal`       | `boolean`                    | `true`         | Keeps the Base UI modal interaction model when menus are open.    |
| `disabled`    | `boolean`                    | `false`        | Disables the whole menubar.                                       |
| `loopFocus`   | `boolean`                    | `true`         | Controls arrow-key focus wrapping between top-level triggers.     |

### `MenubarMenu`

`MenubarMenu` forwards Base UI `Menu.Root` props such as `open`, `defaultOpen`, `onOpenChange`,
`onOpenChangeComplete`, `highlightItemOnHover`, `disabled`, and `handle`.

### `MenubarTrigger`

| Prop          | Type         | Notes                                                                                                             |
| ------------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| `className`   | `string`     | Applied to the trigger root when `render` is not used.                                                            |
| `render`      | `RenderProp` | If you use `render`, moduix does **not** merge the default trigger class. You own the DOM and styling completely. |
| `openOnHover` | `boolean`    | Enables hover-open behavior while keeping keyboard interaction.                                                   |
| `delay`       | `number`     | Delay before hover-open activates when `openOnHover` is enabled.                                                  |
| `closeDelay`  | `number`     | Delay before hover-open menus close when pointer-leaving.                                                         |
| `disabled`    | `boolean`    | Disables menu interactions and applies disabled trigger styling.                                                  |
| `handle`      | `MenuHandle` | Connects the trigger to a detached `MenubarMenu` created with `createMenubarMenuHandle`.                          |

### `MenubarContent`

`MenubarContentProps` is exported from `moduix`.

| Prop                 | Type                                      | Default         | Notes                                       |
| -------------------- | ----------------------------------------- | --------------- | ------------------------------------------- |
| `className`          | `string`                                  | -               | Applied to the popup surface.               |
| `showArrow`          | `boolean`                                 | `false`         | Renders `MenubarArrow` before the viewport. |
| `sideOffset`         | `number \| ((args) => number)`            | `6`             | Gap between trigger and popup.              |
| `side`               | `PositionerSide`                          | Base UI default | Forwarded to `MenubarPositioner`.           |
| `align`              | `PositionerAlign`                         | Base UI default | Forwarded to `MenubarPositioner`.           |
| `alignOffset`        | `number \| ((args) => number)`            | Base UI default | Forwarded to `MenubarPositioner`.           |
| `arrowPadding`       | `number`                                  | Base UI default | Limits arrow collision near edges.          |
| `collisionAvoidance` | `CollisionAvoidance`                      | Base UI default | Forwarded to `MenubarPositioner`.           |
| `collisionBoundary`  | `Boundary`                                | Base UI default | Forwarded to `MenubarPositioner`.           |
| `collisionPadding`   | `number \| Partial<Record<Side, number>>` | Base UI default | Forwarded to `MenubarPositioner`.           |

`MenubarContent` also forwards popup props such as event handlers, `id`, and accessibility
attributes to `MenubarPopup`, and it always wraps the children in `MenubarViewport`.

### `MenubarSubmenuContent`

Uses the same exported `MenubarContentProps` type.

| Prop          | Default                                                          | Notes                                                    |
| ------------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| `sideOffset`  | `({ side }) => (side === 'top' \|\| side === 'bottom' ? 4 : -4)` | Keeps nested menus visually connected to the parent row. |
| `alignOffset` | same as `sideOffset`                                             | Keeps submenu alignment consistent with the parent row.  |

### Action rows

| Part                  | Extra moduix API                         | Notes                                                                          |
| --------------------- | ---------------------------------------- | ------------------------------------------------------------------------------ |
| `MenubarItem`         | no extra props                           | Use for command-style actions. `closeOnClick` is commonly enabled in examples. |
| `MenubarLinkItem`     | no extra props                           | Use for navigation; forwards link props such as `href`.                        |
| `MenubarCheckboxItem` | `indicator?: 'start' \| 'end' \| 'none'` | Exported as `MenubarCheckboxItemProps`. Controls indicator column layout.      |
| `MenubarRadioItem`    | `indicator?: 'start' \| 'end' \| 'none'` | Exported as `MenubarRadioItemProps`. Controls indicator column layout.         |

`MenubarIndicatorPosition` is exported for wrapper utilities and shared typing.

## Composition patterns

### Checkbox and radio rows

```tsx
<MenubarGroup>
  <MenubarGroupLabel>Workspace</MenubarGroupLabel>

  <MenubarCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
    <MenubarCheckboxItemIndicator />
    <MenubarItemText>Sidebar</MenubarItemText>
  </MenubarCheckboxItem>

  <MenubarCheckboxItem checked={showPreview} onCheckedChange={setShowPreview} indicator="end">
    <MenubarItemText>
      <MenubarItemTextContent>
        <MenubarItemTextIcon>
          <svg aria-hidden="true" viewBox="0 0 16 16" />
        </MenubarItemTextIcon>
        <MenubarItemTextLabel>Preview</MenubarItemTextLabel>
      </MenubarItemTextContent>
    </MenubarItemText>
    <MenubarCheckboxItemIndicator />
  </MenubarCheckboxItem>
</MenubarGroup>
```

### Low-level custom composition

Use the low-level parts only when you need a custom backdrop, custom DOM structure, or direct access
to `MenubarPortal`, `MenubarPositioner`, `MenubarPopup`, and `MenubarViewport`.

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Window</MenubarTrigger>
    <MenubarPortal>
      <MenubarBackdrop />
      <MenubarPositioner sideOffset={10}>
        <MenubarPopup>
          <MenubarArrow />
          <MenubarViewport>
            <MenubarItem closeOnClick>Minimize</MenubarItem>
            <MenubarItem closeOnClick>Zoom</MenubarItem>
          </MenubarViewport>
        </MenubarPopup>
      </MenubarPositioner>
    </MenubarPortal>
  </MenubarMenu>
</Menubar>
```

Do not place `MenubarPortal`, `MenubarPositioner`, `MenubarPopup`, or `MenubarViewport` inside
`MenubarContent`; `MenubarContent` already renders all four parts.

## Styling API

### `className`

Every exported visual part accepts `className`.

For the higher-level wrappers:

- `Menubar.className` styles the visible menubar root.
- `MenubarTrigger.className` styles the interactive trigger when `render` is not used.
- `MenubarContent.className` styles the popup surface, not the viewport.
- `MenubarSubmenuContent.className` styles the submenu popup surface, not the viewport.
- `MenubarViewport.className` is only relevant in manual popup composition.

### `data-slot`

moduix applies stable `data-slot` values to every exported visual part:

| Part                           | `data-slot`                       |
| ------------------------------ | --------------------------------- |
| `Menubar`                      | `menubar-root`                    |
| `MenubarTrigger`               | `menubar-trigger`                 |
| `MenubarPortal`                | `menubar-portal`                  |
| `MenubarBackdrop`              | `menubar-backdrop`                |
| `MenubarPositioner`            | `menubar-positioner`              |
| `MenubarPopup`                 | `menubar-popup`                   |
| `MenubarArrow`                 | `menubar-arrow`                   |
| `MenubarViewport`              | `menubar-viewport`                |
| `MenubarItem`                  | `menubar-item`                    |
| `MenubarLinkItem`              | `menubar-link-item`               |
| `MenubarSeparator`             | `menubar-separator`               |
| `MenubarGroup`                 | `menubar-group`                   |
| `MenubarGroupLabel`            | `menubar-group-label`             |
| `MenubarSubmenuTrigger`        | `menubar-submenu-trigger`         |
| `MenubarSubmenuTriggerIcon`    | `menubar-submenu-trigger-icon`    |
| `MenubarRadioGroup`            | `menubar-radio-group`             |
| `MenubarRadioItem`             | `menubar-radio-item`              |
| `MenubarRadioItemIndicator`    | `menubar-radio-item-indicator`    |
| `MenubarCheckboxItem`          | `menubar-checkbox-item`           |
| `MenubarCheckboxItemIndicator` | `menubar-checkbox-item-indicator` |
| `MenubarItemText`              | `menubar-item-text`               |
| `MenubarItemTextContent`       | `menubar-item-text-content`       |
| `MenubarItemTextIcon`          | `menubar-item-text-icon`          |
| `MenubarItemTextLabel`         | `menubar-item-text-label`         |
| `MenubarItemShortcut`          | `menubar-item-shortcut`           |

### State and layout attributes used by moduix styles

The list below covers attributes that our CSS depends on directly.

| Selector target                                                                                      | Attributes used by moduix                                          |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `Menubar`                                                                                            | `data-orientation`                                                 |
| `MenubarTrigger`                                                                                     | `data-popup-open`, `data-disabled`, `disabled`                     |
| `MenubarBackdrop`                                                                                    | `data-starting-style`, `data-ending-style`                         |
| `MenubarPopup`                                                                                       | `data-starting-style`, `data-ending-style`                         |
| `MenubarArrow`                                                                                       | `data-side`                                                        |
| `MenubarItem`, `MenubarLinkItem`, `MenubarSubmenuTrigger`, `MenubarRadioItem`, `MenubarCheckboxItem` | `data-highlighted`, `data-popup-open`, `data-disabled`, `disabled` |
| `MenubarRadioItem`, `MenubarCheckboxItem`                                                            | `data-indicator-position` (`start` or `end`)                       |
| `MenubarCheckboxItem`                                                                                | `data-checked`                                                     |

### CSS variables

All built-in styling hooks are scoped under `--menubar-*`.

#### Root, trigger, and shared behavior

| Variable                         | Default                                                 |
| -------------------------------- | ------------------------------------------------------- |
| `--menubar-bg`                   | `var(--color-muted)`                                    |
| `--menubar-border-color`         | `var(--color-border)`                                   |
| `--menubar-border-width`         | `var(--border-width-sm)`                                |
| `--menubar-color`                | `var(--color-foreground)`                               |
| `--menubar-disabled-opacity`     | `var(--opacity-disabled)`                               |
| `--menubar-focus-ring-color`     | `var(--menu-focus-ring-color, var(--color-ring))`       |
| `--menubar-focus-ring-width`     | `var(--menubar-border-width)`                           |
| `--menubar-gap`                  | `var(--spacing-1)`                                      |
| `--menubar-padding-x`            | `0.125rem`                                              |
| `--menubar-padding-y`            | `0.125rem`                                              |
| `--menubar-radius`               | `var(--radius-md)`                                      |
| `--menubar-transition`           | `var(--transition-default)`                             |
| `--menubar-trigger-bg`           | `transparent`                                           |
| `--menubar-trigger-bg-active`    | `var(--menubar-trigger-bg-hover)`                       |
| `--menubar-trigger-bg-hover`     | `var(--color-accent)`                                   |
| `--menubar-trigger-color`        | `var(--color-foreground)`                               |
| `--menubar-trigger-color-active` | `var(--menubar-trigger-color, var(--color-foreground))` |
| `--menubar-trigger-font-size`    | `var(--text-sm)`                                        |
| `--menubar-trigger-gap`          | `0.5rem`                                                |
| `--menubar-trigger-height`       | `var(--size-lg)`                                        |
| `--menubar-trigger-line-height`  | `var(--line-height-text-sm)`                            |
| `--menubar-trigger-padding-x`    | `0.75rem`                                               |
| `--menubar-trigger-padding-y`    | `0.5rem`                                                |
| `--menubar-trigger-radius`       | `var(--radius-sm)`                                      |
| `--menubar-trigger-ring-active`  | `var(--menubar-border-color, var(--color-border))`      |
| `--menubar-trigger-ring-width`   | `var(--menubar-border-width)`                           |
| `--menubar-vertical-width`       | `12rem`                                                 |

#### Backdrop, popup, viewport, and arrow

| Variable                        | Default                                    |
| ------------------------------- | ------------------------------------------ |
| `--menubar-arrow-height`        | `0.625rem`                                 |
| `--menubar-arrow-inline-offset` | `0.8125rem`                                |
| `--menubar-arrow-size`          | `0.5rem`                                   |
| `--menubar-arrow-stroke-color`  | `var(--menubar-popup-border-color)`        |
| `--menubar-arrow-width`         | `1.25rem`                                  |
| `--menubar-backdrop-bg`         | `var(--backdrop-bg, var(--color-overlay))` |
| `--menubar-backdrop-blur`       | `4px`                                      |
| `--menubar-backdrop-transition` | `var(--transition-default)`                |
| `--menubar-popup-bg`            | `var(--color-popover)`                     |
| `--menubar-popup-border-color`  | `var(--color-border)`                      |
| `--menubar-popup-border-width`  | `var(--border-width-sm)`                   |
| `--menubar-popup-color`         | `var(--color-popover-foreground)`          |
| `--menubar-popup-max-height`    | `24rem`                                    |
| `--menubar-popup-max-width`     | `20rem`                                    |
| `--menubar-popup-min-width`     | `12rem`                                    |
| `--menubar-popup-padding-y`     | `0.25rem`                                  |
| `--menubar-popup-radius`        | `var(--radius-md)`                         |
| `--menubar-popup-shadow`        | `var(--shadow-lg)`                         |

#### Items, highlights, groups, and submenu rows

| Variable                                  | Default                         |
| ----------------------------------------- | ------------------------------- |
| `--menubar-group-label-color`             | `var(--color-muted-foreground)` |
| `--menubar-group-label-font-size`         | `var(--text-xs)`                |
| `--menubar-group-label-line-height`       | `var(--line-height-text-xs)`    |
| `--menubar-group-label-padding-x-end`     | `0.75rem`                       |
| `--menubar-group-label-padding-x-start`   | `0.625rem`                      |
| `--menubar-group-label-padding-y`         | `0.35rem`                       |
| `--menubar-group-padding-y`               | `0`                             |
| `--menubar-highlight-bg`                  | `var(--color-foreground)`       |
| `--menubar-highlight-color`               | `var(--color-background)`       |
| `--menubar-highlight-inset-x`             | `var(--spacing-1)`              |
| `--menubar-highlight-radius`              | `var(--radius-sm)`              |
| `--menubar-item-bg`                       | `transparent`                   |
| `--menubar-item-bg-disabled`              | `var(--menubar-item-bg)`        |
| `--menubar-item-disabled-color`           | `var(--color-muted-foreground)` |
| `--menubar-item-font-size`                | `var(--text-sm)`                |
| `--menubar-item-gap`                      | `var(--spacing-2)`              |
| `--menubar-item-height`                   | `2rem`                          |
| `--menubar-item-line-height`              | `var(--line-height-text-sm)`    |
| `--menubar-item-padding-x-end`            | `1rem`                          |
| `--menubar-item-padding-x-start`          | `1rem`                          |
| `--menubar-item-padding-y`                | `0.5rem`                        |
| `--menubar-item-shortcut-color`           | `var(--color-muted-foreground)` |
| `--menubar-item-shortcut-font-size`       | `var(--text-xs)`                |
| `--menubar-item-shortcut-line-height`     | `var(--line-height-text-xs)`    |
| `--menubar-item-shortcut-padding-x-start` | `var(--spacing-4)`              |
| `--menubar-item-text-content-gap`         | `var(--spacing-2)`              |
| `--menubar-item-text-icon-color`          | `currentColor`                  |
| `--menubar-item-text-icon-size`           | `1rem`                          |
| `--menubar-submenu-icon-size`             | `0.875rem`                      |
| `--menubar-submenu-open-bg`               | `var(--color-accent)`           |
| `--menubar-submenu-trigger-gap`           | `var(--spacing-3)`              |
| `--menubar-submenu-trigger-padding-x-end` | `1rem`                          |

#### Checkbox, radio, and separator styling

| Variable                                            | Default                                          |
| --------------------------------------------------- | ------------------------------------------------ |
| `--menubar-check-gap`                               | `0.5rem`                                         |
| `--menubar-check-indicator-size`                    | `0.75rem`                                        |
| `--menubar-check-padding-x-start`                   | `0.625rem`                                       |
| `--menubar-checkbox-indicator-bg`                   | `transparent`                                    |
| `--menubar-checkbox-indicator-bg-checked`           | `var(--menubar-checkbox-indicator-bg)`           |
| `--menubar-checkbox-indicator-border-color`         | `currentColor`                                   |
| `--menubar-checkbox-indicator-border-color-checked` | `var(--menubar-checkbox-indicator-border-color)` |
| `--menubar-checkbox-indicator-border-width`         | `var(--border-width-sm)`                         |
| `--menubar-checkbox-indicator-radius`               | `var(--radius-xs)`                               |
| `--menubar-separator-color`                         | `var(--color-border)`                            |
| `--menubar-separator-height`                        | `var(--border-width-sm)`                         |
| `--menubar-separator-margin-x-end`                  | `1rem`                                           |
| `--menubar-separator-margin-x-start`                | `1rem`                                           |
| `--menubar-separator-margin-y`                      | `0.375rem`                                       |

There are no variant props. Customization is done through composition, `className`, `data-slot`,
state attributes, and `--menubar-*` variables.

## UX and accessibility notes

- The root interaction model comes from Base UI, so roving focus, submenu traversal, dismissal,
  collision handling, typeahead, and focus restoration are handled by the primitive layer.
- `orientation="vertical"` changes both layout and keyboard navigation direction.
- Disabled triggers and rows are non-interactive and receive muted styling.
- `MenubarItemShortcut` is visual only; it does not bind or listen for keyboard shortcuts.
- Use `MenubarLinkItem` for navigation and `MenubarItem` for imperative actions.
- For checkbox and radio rows, keep the label and indicator inside the same row so the whole row
  remains the interactive target.
- `MenubarSubmenuTriggerIcon` and `MenubarItemTextIcon` are layout helpers. They do not add
  semantics on their own.
- `openOnHover` is available on `MenubarTrigger`, but it should be used intentionally; the component
  already supports keyboard-first desktop menubar behavior without extra wrapper logic.

## Recommendations and limitations

- Prefer `MenubarContent` over manual popup composition.
- Prefer `MenubarSubmenuContent` over plain `MenubarContent` for nested menus so the default offsets
  stay aligned with the rest of the library.
- `MenubarContent` always renders `MenubarViewport`. If you need to style or replace the viewport
  itself, switch to the low-level composition path.
- Do **not** place `MenubarViewport` as a direct child of `MenubarContent`; that creates redundant
  nested viewports.
- `createMenubarMenuHandle` links a trigger to a single `MenubarMenu`, not to the `Menubar` root as
  a whole.
- Use `indicator="end"` only when the trailing indicator genuinely improves scanability; the default
  start position is still the library norm.
- When you use `render` on `MenubarTrigger`, you are opting out of the built-in trigger class.
- `showArrow` only toggles the default `MenubarArrow`. Custom arrow structure should stay in explicit
  composition.

## Useful built-in sugar

The current component already has the useful sugar we want for common scenarios:

- `MenubarContent` and `MenubarSubmenuContent`
- `showArrow`
- `createMenubarMenuHandle`
- `indicator="start" | "end" | "none"`
- submenu and item-text helper parts
- exported wrapper prop types for content and indicator rows

No additional wrapper sugar is currently justified beyond that surface.

## Agent notes

- Preserve the current `render` behavior on `MenubarTrigger`: default trigger styling is skipped
  entirely when consumers supply a custom render target.
- Preserve the current `MenubarContent` structure. It renders `MenubarPortal`, `MenubarPositioner`,
  `MenubarPopup`, and `MenubarViewport`.
- Preserve the submenu offset helper defaults in `MenubarSubmenuContent`.
- Preserve the stable `data-slot` names and `--menubar-*` CSS variable namespace.
- If wrapper-specific props change, update this file, the Storybook stories, and the docs examples in
  the same task.

## Motion tokens

`MenubarBackdrop` and `MenubarPopup` now expose phase-specific motion variables. Override the backdrop `starting/ending-opacity` and `starting/ending-blur` tokens, plus the popup `starting/ending-opacity`, `*-scale`, and `*-translate-x/y` tokens to build fade or slide variants while keeping the default scale-in menu behavior.

## Local changelog

- 2026-06-14: Added `indicator="none"` for checkbox and radio rows so menubar menus can opt out of
  the reserved indicator column without causing selection-time layout shift. Reserved start
  placement remains the default and `end` still moves the indicator to the trailing edge.
- 2026-06-10: Added phase-specific backdrop and popup motion tokens so menubar menu enter/exit motion can be retuned to fade, slide, or mixed effects through CSS variables while preserving the shipped default.
- 2026-06-02: Rewrote the local documentation around the actual moduix wrapper contract, documented
  the implicit `MenubarViewport` behavior of `MenubarContent`, and added exported wrapper prop types
  for content and indicator rows to match the rest of the menu family.