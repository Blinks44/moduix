# ToggleGroup

Upstream primitive docs: https://base-ui.com/react/components/toggle-group

## Purpose

`ToggleGroup` is the moduix wrapper for a set of related pressed buttons that share one selection
model.

Use it when several toggles belong to the same choice set:

- single-selection segmented controls such as view mode or alignment
- multi-selection formatting controls such as bold / italic / underline
- compact filter chips that should look and behave like toggles

Prefer:

- `Toggle` for a standalone two-state action
- `Toolbar` when the main concern is roving-focus layout for mixed controls
- `Tabs` when pressed state also swaps associated panels

## Current behavior contract

- `ToggleGroup` is a thin styled wrapper over `@base-ui/react/toggle-group`.
- moduix adds two wrapper props on the root:
  - `variant?: 'default' | 'outline' | 'ghost'`
  - `size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'`
- `variant` defaults to `default`. `size` defaults to `md`.
- `ToggleGroup` writes `data-slot="toggle-group-root"`, `data-variant`, and `data-size` on the root.
- `ToggleGroup` preserves the Base UI selection model:
  - `value` and `defaultValue` are always string arrays
  - `onValueChange` always receives the next string array
  - this stays true even when `multiple` is not set
- `ToggleGroupItem` is the default item part. It renders the moduix `Toggle`, writes
  `data-slot="toggle-group-item"`, and inherits the group `variant` / `size` when the item does not
  override them.
- `ToggleGroupItem` also applies the item CSS contract from `ToggleGroup.module.css`:
  - `flex: 0 0 auto`
  - `border-radius: var(--toggle-group-item-radius, var(--radius-md))`
  - forwards `--toggle-group-color` into the item `Toggle` color tokens
- Item-level `variant`, `size`, `className`, `style`, and `--toggle-*` overrides still work.
- Advanced composition is supported: any moduix `Toggle` inside `ToggleGroup` can participate in
  selection as long as it gets a `value`.
- Raw `Toggle` composition does **not** inherit group `variant`, `size`, or the
  `toggle-group-item` CSS hooks automatically. That inheritance is specific to `ToggleGroupItem`.
- `className` is merged through `mergeClassName`, so plain class names and Base UI state callback
  class names keep working on the root and on `ToggleGroupItem`.

## Composition

Recommended default path:

```tsx
import { ToggleGroup, ToggleGroupItem } from 'moduix';

export function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}
```

Controlled single-selection state still uses an array:

```tsx
import { ToggleGroup, ToggleGroupItem } from 'moduix';
import { useState } from 'react';

export function ControlledToggleGroupDemo() {
  const [value, setValue] = useState(['grid'] as string[]);

  return (
    <ToggleGroup value={value} onValueChange={setValue} aria-label="View mode">
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="map">Map</ToggleGroupItem>
    </ToggleGroup>
  );
}
```

Advanced composition with `ToolbarButton` + `Toggle`:

```tsx
import { Toggle, ToggleGroup, Toolbar, ToolbarButton } from 'moduix';

export function ToolbarFormattingDemo() {
  return (
    <Toolbar aria-label="Editor formatting">
      <ToggleGroup multiple defaultValue={['bold']} aria-label="Text formatting">
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
    </Toolbar>
  );
}
```

Use that path only when another composed component owns the visual surface. If you want group
variant / size inheritance and the default item styling contract, use `ToggleGroupItem`.

## Exported parts

| Part              | Element/primitive      | Purpose                                                                           |
| ----------------- | ---------------------- | --------------------------------------------------------------------------------- |
| `ToggleGroup`     | `ToggleGroupPrimitive` | Shared selected-value state, orientation, disabled state, and roving focus.       |
| `ToggleGroupItem` | `Toggle`               | Styled toggle item that participates in group selection and inherits group props. |

## Public props

`ToggleGroup` accepts `ToggleGroupPrimitive.Props<string>` plus the moduix wrapper props below.

| Prop            | Type                                                                  | Default      | Notes                                                                |
| --------------- | --------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------- |
| `variant`       | `'default' \| 'outline' \| 'ghost'`                                   | `default`    | Sets the default visual treatment for `ToggleGroupItem`.             |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'icon-sm' \| 'icon-md' \| 'icon-lg'` | `md`         | Sets the default item size for `ToggleGroupItem`.                    |
| `defaultValue`  | `readonly string[]`                                                   | `[]`         | Initial uncontrolled selected values.                                |
| `value`         | `readonly string[]`                                                   | -            | Controlled selected values. Still an array in single-selection mode. |
| `onValueChange` | `(value: string[], eventDetails) => void`                             | -            | Called with the next selected values array.                          |
| `multiple`      | `boolean`                                                             | `false`      | Allows more than one pressed item at the same time.                  |
| `orientation`   | `'horizontal' \| 'vertical'`                                          | `horizontal` | Controls layout direction and arrow-key navigation direction.        |
| `loopFocus`     | `boolean`                                                             | `true`       | Wraps arrow-key focus from last to first item and back.              |
| `disabled`      | `boolean`                                                             | `false`      | Disables the whole group.                                            |
| `className`     | string or Base UI callback                                            | -            | Merged with the moduix root class.                                   |
| `style`         | object or Base UI callback                                            | -            | Forwarded to the root.                                               |
| `render`        | Base UI render prop                                                   | -            | Advanced root replacement / composition escape hatch.                |

`ToggleGroupItem` accepts the public `Toggle` props. Common props inside a group:

| Prop            | Notes                                                                                   |
| --------------- | --------------------------------------------------------------------------------------- |
| `value`         | Item value used by the surrounding `ToggleGroup`.                                       |
| `variant`       | Overrides the group `variant` for one item.                                             |
| `size`          | Overrides the group `size` for one item.                                                |
| `disabled`      | Disables one item without disabling the whole group.                                    |
| `className`     | Merged with the `toggle-group-item` class and the underlying `Toggle` class.            |
| `children`      | Regular item content. Use text, icons, or both.                                         |
| `render`        | Advanced replacement / composition path from `Toggle`.                                  |
| `nativeButton`  | Keep `true` for rendered buttons; set `false` when `render` returns a non-button root.  |
| `pressed` props | Available through `Toggle`, but group selection should normally stay on the root value. |

## Styling API

Public `data-slot` values:

| Part              | `data-slot`         |
| ----------------- | ------------------- |
| `ToggleGroup`     | `toggle-group-root` |
| `ToggleGroupItem` | `toggle-group-item` |

Public root hooks:

| Hook               | Notes                                        |
| ------------------ | -------------------------------------------- |
| `data-variant`     | Mirrors the moduix `variant` prop.           |
| `data-size`        | Mirrors the moduix `size` prop.              |
| `data-disabled`    | Added by Base UI when the group is disabled. |
| `data-orientation` | `horizontal` or `vertical`.                  |
| `data-multiple`    | Present when `multiple` is `true`.           |

`ToggleGroupItem` is also a `Toggle`, so item roots keep the `Toggle` styling hooks such as
`data-pressed`, `data-disabled`, `data-variant`, `data-size`, and the public `--toggle-*` CSS
variables documented in `toggle.md`.

Public `--toggle-group-*` CSS variables:

| Variable                            | Default fallback          | Purpose                                    |
| ----------------------------------- | ------------------------- | ------------------------------------------ |
| `--toggle-group-bg`                 | `var(--color-muted)`      | Group background color.                    |
| `--toggle-group-border-color`       | `var(--color-border)`     | Group border color.                        |
| `--toggle-group-border-width`       | `var(--border-width-sm)`  | Group border width.                        |
| `--toggle-group-color`              | `var(--color-foreground)` | Group text color and inherited item color. |
| `--toggle-group-gap`                | `var(--border-width-sm)`  | Gap between items.                         |
| `--toggle-group-ghost-bg`           | `transparent`             | Ghost group background.                    |
| `--toggle-group-ghost-border-color` | `transparent`             | Ghost group border color.                  |
| `--toggle-group-ghost-padding`      | `0`                       | Ghost group inner padding.                 |
| `--toggle-group-item-radius`        | `var(--radius-md)`        | Item corner radius for `ToggleGroupItem`.  |
| `--toggle-group-outline-bg`         | `var(--color-background)` | Outline group background.                  |
| `--toggle-group-padding`            | `0.125rem`                | Group inner padding.                       |
| `--toggle-group-radius`             | `var(--radius-lg)`        | Group corner radius.                       |

Variant behavior on the root:

- `default`: muted group surface with visible border
- `outline`: switches the group background to `--toggle-group-outline-bg`
- `ghost`: removes the visible group chrome by default and collapses inner padding to
  `--toggle-group-ghost-padding`

Orientation behavior:

- `horizontal`: inline row
- `vertical`: items stack in a column
- vertical `ToggleGroupItem` children stretch to full width and left-align their content

## UX and accessibility

- The group needs an accessible name. Use `aria-label` or `aria-labelledby`.
- Every item also needs an accessible name. Text children usually provide it automatically; icon-only
  items should set `aria-label`.
- Keyboard navigation, roving focus, disabled state propagation, and ARIA state are owned by Base UI
  and should stay delegated to the primitive.
- Use `disabled` on the group when the whole choice set is unavailable. Use item-level `disabled`
  when one option should stay visible but unavailable.
- Keep selection state on the group (`value` / `defaultValue`), not on individual
  `ToggleGroupItem` pressed props, unless an advanced custom composition truly requires it.
- When `render` returns a non-button element for a custom item, pass `nativeButton={false}` on the
  rendered `Toggle`.
- Prefer `ToggleGroupItem` for most use cases. Reach for raw `Toggle` composition only when another
  wrapper such as `ToolbarButton` must own the item layout and states.

## Intentional differences from Base UI

- moduix exports a styled `ToggleGroup` + `ToggleGroupItem` pair instead of documenting the unstyled
  upstream primitives directly.
- `variant`, `size`, `data-slot`, `data-variant`, `data-size`, and `--toggle-group-*` variables are
  part of the local wrapper contract.
- `ToggleGroupItem` composes the moduix `Toggle`, so it inherits Toggle visuals and styling hooks.
- moduix keeps an advanced composition path where raw `Toggle` can still participate in group state,
  but that path intentionally does not pretend to be the same contract as `ToggleGroupItem`.
- The local docs describe the moduix wrapper, not the full upstream API reference.

## Agent notes

- Keep `ToggleGroup` a thin wrapper over the Base UI primitive.
- Do not add `itemClassName`, slot-prop bags, class-name maps, or similar parallel customization
  systems. Use `ToggleGroupItem`, `className`, `render`, and raw composition instead.
- Preserve the current distinction between:
  - `ToggleGroupItem`: inherits group `variant` / `size` and gets the item CSS contract
  - raw `Toggle` inside a group: participates in selection but must opt into its own visuals
- If `data-slot` values, CSS variables, item inheritance, or stories/docs examples change, update
  this file in the same task.

## Local changelog

- Rewrote the local documentation to describe the actual moduix `ToggleGroup` wrapper, item
  inheritance model, styling contract, accessibility guidance, and advanced raw-`Toggle`
  composition path instead of the upstream Base UI reference text.