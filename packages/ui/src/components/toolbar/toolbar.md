# Toolbar

Upstream primitive docs: https://base-ui.com/react/components/toolbar

## Purpose

`Toolbar` is the moduix wrapper for a roving-focus region that groups related controls.

Use it for mixed action rows such as editor controls, document actions, compact filter bars, or
small metadata/action clusters where arrow-key navigation between items is useful.

Prefer:

- `ToggleGroup` when the main problem is shared pressed-state selection
- `Pagination` when the controls are specifically page navigation
- plain layout containers when the row does not need toolbar keyboard behavior

## Current behavior contract

- `Toolbar`, `ToolbarGroup`, `ToolbarButton`, `ToolbarLink`, `ToolbarInput`, and
  `ToolbarSeparator` are thin styled wrappers over the matching `@base-ui/react/toolbar` parts.
- moduix does **not** add wrapper-level behavior props, variants, or helper slot APIs.
- Every exported part writes a stable `data-slot` attribute:
  - `Toolbar` → `toolbar-root`
  - `ToolbarGroup` → `toolbar-group`
  - `ToolbarButton` → `toolbar-button`
  - `ToolbarLink` → `toolbar-link`
  - `ToolbarInput` → `toolbar-input`
  - `ToolbarSeparator` → `toolbar-separator`
- `className` is merged through `mergeClassName`, so plain class names and Base UI callback
  class names both keep working on all parts.
- Base UI continues to own roving focus, keyboard navigation, orientation handling, disabled
  propagation, and `render`-based composition.
- `ToolbarButton` stays intentionally generic:
  - plain action button by default
  - composition surface for `Toggle`, `Select.Trigger`, and similar trigger-like primitives via
    the composed primitive's `asChild` or the toolbar `render` prop where appropriate
- `ToolbarInput` only wraps the primitive styling contract. It does not add search logic,
  debouncing, clear buttons, or helper props.
- `ToolbarSeparator` keeps the Base UI separator behavior, including its toolbar-aware default
  orientation.

## Composition

Recommended default path:

```tsx
import {
  BellIcon,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarLink,
  ToolbarSeparator,
} from 'moduix';

export function ToolbarDemo() {
  return (
    <Toolbar aria-label="Document actions">
      <ToolbarGroup aria-label="History">
        <ToolbarButton>Undo</ToolbarButton>
        <ToolbarButton>Redo</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Notifications">
        <BellIcon />
      </ToolbarButton>
      <ToolbarLink href="#">Edited 51m ago</ToolbarLink>
    </Toolbar>
  );
}
```

Add the other parts only when they materially help the interaction:

- `ToolbarGroup` for a subgroup that needs its own accessible name
- `ToolbarSeparator` for visual splitting between clusters
- `ToolbarLink` for related navigation or secondary metadata links
- `ToolbarInput` for a compact inline field
- `ToolbarButton render={...}` when another primitive should own the interactive surface

Advanced composition with `Toggle`:

```tsx
import {
  BellIcon,
  Toggle,
  ToggleGroup,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from 'moduix';

export function FormattingToolbar() {
  return (
    <Toolbar aria-label="Editor formatting">
      <ToggleGroup multiple defaultValue={['bold']} aria-label="Text formatting" variant="ghost">
        <ToolbarButton render={<Toggle variant="ghost" />} value="bold" aria-label="Bold">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton render={<Toggle variant="ghost" />} value="italic" aria-label="Italic">
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton render={<Toggle variant="ghost" />} value="underline" aria-label="Underline">
          <u>U</u>
        </ToolbarButton>
      </ToggleGroup>

      <ToolbarSeparator />

      <ToolbarGroup aria-label="Insert">
        <ToolbarButton aria-label="Notifications">
          <BellIcon />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}
```

Use that path only when the rendered primitive should own state and semantics. If the item is just a
toolbar action, keep `ToolbarButton` as a button.

## Exported parts

| Part               | Rendered element / primitive | Purpose                                                                      |
| ------------------ | ---------------------------- | ---------------------------------------------------------------------------- |
| `Toolbar`          | `Toolbar.Root`               | Root roving-focus region and shared orientation/disabled state.              |
| `ToolbarGroup`     | `Toolbar.Group`              | Optional subgroup for related controls.                                      |
| `ToolbarButton`    | `Toolbar.Button`             | Action button or trigger composition surface.                                |
| `ToolbarLink`      | `Toolbar.Link`               | Related anchor that stays in toolbar navigation order.                       |
| `ToolbarInput`     | `Toolbar.Input`              | Native text field integrated with toolbar keyboard behavior.                 |
| `ToolbarSeparator` | `Toolbar.Separator`          | Visual separator with an opposite-orientation default inside toolbar layout. |

## Public props

The wrappers intentionally forward primitive/native props directly instead of exporting extra prop
aliases.

### Root and group

| Part           | Prop          | Type                         | Default      | Notes                                                  |
| -------------- | ------------- | ---------------------------- | ------------ | ------------------------------------------------------ |
| `Toolbar`      | `orientation` | `'horizontal' \| 'vertical'` | `horizontal` | Changes layout and arrow-key navigation direction.     |
| `Toolbar`      | `disabled`    | `boolean`                    | `false`      | Disables the whole toolbar.                            |
| `Toolbar`      | `loopFocus`   | `boolean`                    | `true`       | Wraps keyboard focus from end to start and back.       |
| `Toolbar`      | `className`   | string or Base UI callback   | -            | Merged with the moduix root class.                     |
| `Toolbar`      | `render`      | Base UI render prop          | -            | Advanced root replacement / composition escape hatch.  |
| `ToolbarGroup` | `disabled`    | `boolean`                    | `false`      | Disables all items inside the group.                   |
| `ToolbarGroup` | `className`   | string or Base UI callback   | -            | Merged with the moduix group class.                    |
| `ToolbarGroup` | `render`      | Base UI render prop          | -            | Advanced group replacement / composition escape hatch. |

### Button, link, input, and separator

| Part               | Prop                    | Type                         | Default       | Notes                                                                                  |
| ------------------ | ----------------------- | ---------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| `ToolbarButton`    | `disabled`              | `boolean`                    | `false`       | Disables one item.                                                                     |
| `ToolbarButton`    | `focusableWhenDisabled` | `boolean`                    | `true`        | Keeps the item in roving focus even while disabled.                                    |
| `ToolbarButton`    | `render`                | Base UI render prop          | -             | Use for `Toggle` and similar trigger composition; Ark triggers can also use `asChild`. |
| `ToolbarButton`    | native button props     | native button props          | -             | Includes `type`, `onClick`, `aria-*`, and any primitive props supported by Base UI.    |
| `ToolbarLink`      | anchor props            | native anchor props          | -             | Includes `href`, `target`, `rel`, `download`, and Base UI `render` / styling props.    |
| `ToolbarInput`     | `disabled`              | `boolean`                    | `false`       | Disables the input.                                                                    |
| `ToolbarInput`     | `focusableWhenDisabled` | `boolean`                    | `true`        | Keeps the input in roving focus even while disabled.                                   |
| `ToolbarInput`     | input props             | native input props           | -             | Includes `value`, `defaultValue`, `placeholder`, and normal input event handlers.      |
| `ToolbarSeparator` | `orientation`           | `'horizontal' \| 'vertical'` | auto-opposite | Defaults to the opposite orientation of the surrounding toolbar.                       |

Notes:

- `ToolbarLink` does not have a wrapper `disabled` prop.
- `ToolbarButton` stays composition-first: if another primitive needs extra props such as `value`,
  pass them only when the composed primitive expects them.

## Defaults and styling

Stable `data-slot` hooks:

| Part               | `data-slot`         |
| ------------------ | ------------------- |
| `Toolbar`          | `toolbar-root`      |
| `ToolbarGroup`     | `toolbar-group`     |
| `ToolbarButton`    | `toolbar-button`    |
| `ToolbarLink`      | `toolbar-link`      |
| `ToolbarInput`     | `toolbar-input`     |
| `ToolbarSeparator` | `toolbar-separator` |

Important styling hooks used by the shipped CSS:

| Part               | Hook               | Notes                                                    |
| ------------------ | ------------------ | -------------------------------------------------------- |
| `Toolbar`          | `data-orientation` | Switches between row and column layout.                  |
| `ToolbarGroup`     | `data-orientation` | Stacks grouped controls in vertical toolbars.            |
| `ToolbarButton`    | `data-disabled`    | Disabled visual state.                                   |
| `ToolbarButton`    | `data-popup-open`  | Open-state visuals when composed with popup triggers.    |
| `ToolbarButton`    | `data-pressed`     | Pressed-state visuals when composed with toggle-like UI. |
| `ToolbarInput`     | `data-disabled`    | Disabled visual state.                                   |
| `ToolbarSeparator` | `data-orientation` | Switches separator axis and spacing.                     |

Behavioral styling notes:

- `Toolbar` root uses `inline-flex`.
- In vertical toolbars, `ToolbarButton` and `ToolbarInput` stretch to the toolbar width.
- `ToolbarButton` collapses to a square when it is empty or when its only direct child is an `svg`.
- `ToolbarLink` stays an inline control; it does not auto-align itself to the end of the toolbar.
  Use `className` if one link needs custom alignment.

Public `--toolbar-*` CSS variables:

| Variable                                  | Default fallback                | Purpose                                  |
| ----------------------------------------- | ------------------------------- | ---------------------------------------- |
| `--toolbar-bg`                            | `var(--color-muted)`            | Root background color.                   |
| `--toolbar-border-color`                  | `var(--color-border)`           | Root border color.                       |
| `--toolbar-border-width`                  | `var(--border-width-sm)`        | Root border width.                       |
| `--toolbar-color`                         | `var(--color-foreground)`       | Root text color.                         |
| `--toolbar-control-bg-active`             | `var(--color-accent)`           | Active background for buttons and links. |
| `--toolbar-control-bg-hover`              | `var(--color-accent)`           | Hover background for buttons and links.  |
| `--toolbar-control-bg-pressed`            | `var(--color-background)`       | Pressed/open button background.          |
| `--toolbar-control-border-color-active`   | `transparent`                   | Pressed/open button border color.        |
| `--toolbar-control-border-width`          | `var(--border-width-sm)`        | Button border width.                     |
| `--toolbar-control-color`                 | `var(--color-foreground)`       | Button and link foreground color.        |
| `--toolbar-control-color-pressed`         | `var(--color-foreground)`       | Pressed/open button foreground color.    |
| `--toolbar-control-gap`                   | `var(--spacing-2)`              | Gap between button children.             |
| `--toolbar-control-height`                | `var(--size-lg)`                | Shared button/link/input height.         |
| `--toolbar-control-padding-x`             | `0.75rem`                       | Button and link horizontal padding.      |
| `--toolbar-control-radius`                | `var(--radius-md)`              | Button, link, and input corner radius.   |
| `--toolbar-disabled-opacity`              | `var(--opacity-disabled)`       | Disabled control opacity.                |
| `--toolbar-focus-ring-color`              | `var(--color-ring)`             | Keyboard focus ring color.               |
| `--toolbar-focus-ring-offset`             | `-1px`                          | Keyboard focus ring offset.              |
| `--toolbar-focus-ring-width`              | `var(--border-width-md)`        | Keyboard focus ring width.               |
| `--toolbar-font-size`                     | `var(--text-sm)`                | Shared control font size.                |
| `--toolbar-font-weight`                   | `var(--weight-medium)`          | Shared control font weight.              |
| `--toolbar-gap`                           | `var(--border-width-sm)`        | Gap between top-level toolbar children.  |
| `--toolbar-group-gap`                     | `var(--spacing-1)`              | Gap inside `ToolbarGroup`.               |
| `--toolbar-icon-size`                     | `1rem`                          | Icon size inside buttons.                |
| `--toolbar-input-bg`                      | `var(--color-background)`       | Input background color.                  |
| `--toolbar-input-border-color`            | `var(--color-border)`           | Input border color.                      |
| `--toolbar-input-border-width`            | `var(--border-width-sm)`        | Input border width.                      |
| `--toolbar-input-color`                   | `var(--color-foreground)`       | Input text color.                        |
| `--toolbar-input-padding-x`               | `0.75rem`                       | Input horizontal padding.                |
| `--toolbar-input-placeholder-color`       | `var(--color-muted-foreground)` | Input placeholder color.                 |
| `--toolbar-input-width`                   | `10rem`                         | Input width in horizontal layouts.       |
| `--toolbar-line-height`                   | `var(--line-height-text-sm)`    | Shared control line height.              |
| `--toolbar-padding`                       | `0.125rem`                      | Root inner padding.                      |
| `--toolbar-radius`                        | `var(--radius-lg)`              | Root border radius.                      |
| `--toolbar-separator-color`               | `var(--color-border)`           | Separator color.                         |
| `--toolbar-separator-length-horizontal`   | `100%`                          | Horizontal separator length.             |
| `--toolbar-separator-length-vertical`     | `1rem`                          | Vertical separator length.               |
| `--toolbar-separator-margin-x-vertical`   | `var(--spacing-1)`              | Inline margin for vertical separators.   |
| `--toolbar-separator-margin-y-horizontal` | `var(--spacing-1)`              | Block margin for horizontal separators.  |
| `--toolbar-separator-thickness`           | `1px`                           | Separator thickness.                     |
| `--toolbar-transition`                    | `var(--transition-default)`     | Shared interactive transition timing.    |

## UX and accessibility

- `Toolbar` needs an accessible name. Always set `aria-label` or `aria-labelledby`.
- Icon-only `ToolbarButton` items need their own accessible label.
- Use `ToolbarGroup` only when the subgroup needs its own accessible name. Do not add unlabeled
  groups purely for layout.
- In horizontal toolbars, keep text input usage rare, compact, and at the end of the row. Left/right
  arrow keys are shared between cursor movement and toolbar navigation.
- Use `ToolbarButton render={...}` for popup triggers and toggles so one interactive surface owns the
  semantics. Do not nest `button` inside `button`.
- Use root/group `disabled` when a whole region is unavailable. Use item-level `disabled` when only
  one action or input should stay visible but unavailable.
- `focusableWhenDisabled` exists for parity with Base UI. Keep the default unless a disabled control
  should leave the roving-focus order entirely.
- `ToolbarLink` is for real navigation or related metadata. If the item behaves like an action,
  prefer `ToolbarButton`.

## Intentional differences from Base UI

- moduix exports styled named parts instead of the upstream `Toolbar.Root` namespace API.
- `data-slot` attributes and the `--toolbar-*` variables are part of the local wrapper contract.
- The local docs describe the moduix wrapper contract and preservation notes, not the full upstream
  reference surface.
- moduix intentionally keeps `Toolbar` free of extra workflow sugar such as alignment props,
  class-name maps, or slot-prop bags.

## Agent notes

- Keep `Toolbar` composition-first and thin.
- Do not add parallel customization systems such as `slotProps`, `buttonClassName`, item prop bags,
  or alignment booleans.
- Preserve the stable `data-slot` names and the `--toolbar-*` CSS variable contract when editing the
  component or docs.
- If a future change affects root layout, vertical stretching, pressed/open button styling, or the
  separator/input sizing contract, update stories, docs examples, and this file in the same task.
- Do not turn `Toolbar` into a higher-level editor toolbar abstraction. Toggle groups, selects,
  menus, and application state should stay in consumer composition.

## Local changelog

- Rewrote the local documentation so it describes the actual moduix `Toolbar` wrapper contract,
  styling hooks, composition model, accessibility guidance, and preservation rules instead of the
  upstream Base UI documentation.