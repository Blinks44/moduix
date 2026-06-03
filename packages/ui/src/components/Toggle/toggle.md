# Toggle

Upstream primitive docs: https://base-ui.com/react/components/toggle

## Purpose

`Toggle` is the moduix two-state action button for compact on/off actions such as favorites, saved
states, formatting controls, and toolbar actions.

Use it when the control is still a button that exposes a pressed state. Prefer:

- `Switch` for setting-like on/off controls that read as a setting row.
- `Checkbox` for submitted options in a list or form.
- `ToggleGroup` when several toggles share one selection model.

## Current behavior contract

- `Toggle` is a thin styled wrapper over the Base UI toggle root. It preserves the primitive pressed
  state model, keyboard behavior, focus handling, ARIA state, `render`, `nativeButton`, and controlled
  / uncontrolled usage.
- moduix adds two wrapper props:
  - `variant?: 'default' | 'outline' | 'ghost'`
  - `size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'`
- `variant` defaults to `default`. `size` defaults to `md`.
- `Toggle` writes `data-variant`, `data-size`, and, when pressed, `data-pressed` on the root.
- A standalone `Toggle` writes `data-slot="toggle-root"`. When the same button is rendered through
  `ToggleGroupItem`, that slot is intentionally overridden to `toggle-group-item`.
- `className` is merged through `mergeClassName`, so plain class names and Base UI state callback
  class names both keep working.
- There are no exported visual subparts. Children are rendered directly and stay the main composition
  path for icons, text, or custom inline markup.
- Direct child `svg` elements inherit the shared icon size token.
- Icon-only sizes remove padding and content gap, then size the root to a square box.
- `value` is only meaningful when the toggle participates in `ToggleGroup` selection. On a standalone
  `Toggle`, it has no effect.

## Composition

Simple uncontrolled toggle:

```tsx
import { StarIcon, Toggle } from 'moduix';

export function ToggleDemo() {
  return (
    <Toggle defaultPressed>
      <StarIcon />
      Favorite
    </Toggle>
  );
}
```

Controlled pressed state:

```tsx
import { BellIcon, Toggle } from 'moduix';
import { useState } from 'react';

export function ControlledToggleDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <Toggle pressed={pressed} onPressedChange={setPressed}>
      <BellIcon />
      {pressed ? 'Notifications on' : 'Notifications off'}
    </Toggle>
  );
}
```

Group composition:

```tsx
import { ToggleGroup, ToggleGroupItem } from 'moduix';

export function TextFormattingToggleDemo() {
  return (
    <ToggleGroup multiple defaultValue={['bold']} aria-label="Text formatting" variant="ghost">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <strong>B</strong>
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <em>I</em>
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <u>U</u>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

Advanced render callback:

```tsx
import { Toggle } from 'moduix';

export function BookmarkToggleDemo() {
  return (
    <Toggle
      aria-label="Save article"
      size="icon-md"
      variant="outline"
      render={(buttonProps, state) => (
        <button type="button" {...buttonProps}>
          {state.pressed ? <BookmarkFilledIcon /> : <BookmarkIcon />}
        </button>
      )}
    />
  );
}

function BookmarkIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M4.5 2.75h7v10.5L8 11l-3.5 2.25V2.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookmarkFilledIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M4 2.75A.75.75 0 0 1 4.75 2h6.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.16.63L8 12.03l-2.84 1.85A.75.75 0 0 1 4 13.25V2.75Z" />
    </svg>
  );
}
```

If `render` returns a non-button element, pass `nativeButton={false}` so the primitive does not apply
native button semantics to the replacement element.

## Exported parts

| Part     | Element/primitive | Purpose                                                                |
| -------- | ----------------- | ---------------------------------------------------------------------- |
| `Toggle` | `TogglePrimitive` | Interactive root with pressed state, variants, sizes, and styling API. |

## Public props

`Toggle` accepts `TogglePrimitive.Props<string>` plus:

| Prop      | Type                                                                  | Default   | Notes                                          |
| --------- | --------------------------------------------------------------------- | --------- | ---------------------------------------------- |
| `variant` | `'default' \| 'outline' \| 'ghost'`                                   | `default` | Chooses the built-in visual treatment.         |
| `size`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'icon-sm' \| 'icon-md' \| 'icon-lg'` | `md`      | Controls spacing or square icon-only geometry. |

Common forwarded root props:

| Prop              | Notes                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------- |
| `defaultPressed`  | Initial uncontrolled pressed state.                                                    |
| `pressed`         | Controlled pressed state. Use with `onPressedChange`.                                  |
| `onPressedChange` | Called when the pressed state changes.                                                 |
| `disabled`        | Disables interaction, applies disabled styling, and keeps native button semantics.     |
| `value`           | Only used when the toggle participates in `ToggleGroup` selection.                     |
| `className`       | Accepts a string or Base UI state callback; merged with moduix root styles.            |
| `style`           | Forwarded Base UI style prop. Can also be a state callback.                            |
| `render`          | Advanced element replacement / composition escape hatch.                               |
| `nativeButton`    | Keep `true` for rendered buttons; set `false` when `render` returns a non-button root. |
| `children`        | Regular button content. Use icons, text, or both.                                      |

## Styling API

`Toggle` is a single-root component. Style it through `className`, `style`, `data-*` attributes, and
`--toggle-*` CSS variables.

Public root hooks:

| Hook                      | Notes                                                                            |
| ------------------------- | -------------------------------------------------------------------------------- |
| `data-slot="toggle-root"` | Standalone toggle root. `ToggleGroupItem` overrides this to `toggle-group-item`. |
| `data-variant`            | Mirrors the moduix `variant` prop.                                               |
| `data-size`               | Mirrors the moduix `size` prop.                                                  |
| `data-pressed`            | Present when the toggle is pressed.                                              |
| `[disabled]`              | Native disabled button attribute.                                                |

Base UI `className` / `style` callbacks receive `{ pressed, disabled }`, which is the recommended
way to branch on primitive state beyond the documented attributes above.

Public CSS variables:

| Variable                                | Default fallback                  | Purpose                            |
| --------------------------------------- | --------------------------------- | ---------------------------------- |
| `--toggle-border-width`                 | `var(--border-width-sm)`          | Root border width.                 |
| `--toggle-content-gap`                  | `var(--spacing-2)`                | Gap between inline children.       |
| `--toggle-disabled-opacity`             | `var(--opacity-disabled)`         | Disabled opacity.                  |
| `--toggle-focus-ring-color`             | `var(--color-ring)`               | Focus ring color.                  |
| `--toggle-focus-ring-offset`            | `-1px`                            | Focus ring offset.                 |
| `--toggle-focus-ring-width`             | `var(--border-width-md)`          | Focus ring width.                  |
| `--toggle-font-size`                    | `var(--text-sm)`                  | Base font size.                    |
| `--toggle-font-size-xs`                 | `var(--text-xs)`                  | `size="xs"` font size.             |
| `--toggle-font-size-lg`                 | `var(--text-md)`                  | `size="lg"` font size.             |
| `--toggle-font-weight`                  | `var(--weight-medium)`            | Root font weight.                  |
| `--toggle-icon-size`                    | `1rem`                            | Direct child SVG size.             |
| `--toggle-line-height`                  | `var(--line-height-text-sm)`      | Base line height.                  |
| `--toggle-line-height-xs`               | `var(--line-height-text-xs)`      | `size="xs"` line height.           |
| `--toggle-line-height-lg`               | `var(--line-height-text-md)`      | `size="lg"` line height.           |
| `--toggle-padding-x-xs`                 | `0.625rem`                        | `size="xs"` horizontal padding.    |
| `--toggle-padding-x-sm`                 | `0.75rem`                         | `size="sm"` horizontal padding.    |
| `--toggle-padding-x-md`                 | `1rem`                            | `size="md"` horizontal padding.    |
| `--toggle-padding-x-lg`                 | `1.25rem`                         | `size="lg"` horizontal padding.    |
| `--toggle-padding-y-xs`                 | `0.25rem`                         | `size="xs"` vertical padding.      |
| `--toggle-padding-y-sm`                 | `0.375rem`                        | `size="sm"` vertical padding.      |
| `--toggle-padding-y-md`                 | `0.5rem`                          | `size="md"` vertical padding.      |
| `--toggle-padding-y-lg`                 | `0.625rem`                        | `size="lg"` vertical padding.      |
| `--toggle-radius`                       | `var(--radius-md)`                | Root corner radius.                |
| `--toggle-size-xs`                      | `var(--size-xs)`                  | `size="xs"` min-height.            |
| `--toggle-size-sm`                      | `var(--size-sm)`                  | `size="sm"` min-height.            |
| `--toggle-size-md`                      | `var(--size-lg)`                  | `size="md"` min-height.            |
| `--toggle-size-lg`                      | `var(--size-xl)`                  | `size="lg"` min-height.            |
| `--toggle-size-icon-sm`                 | `var(--size-sm)`                  | `size="icon-sm"` width and height. |
| `--toggle-size-icon-md`                 | `var(--size-lg)`                  | `size="icon-md"` width and height. |
| `--toggle-size-icon-lg`                 | `var(--size-xl)`                  | `size="icon-lg"` width and height. |
| `--toggle-transition`                   | `var(--transition-default)`       | Shared state transition timing.    |
| `--toggle-default-bg`                   | `transparent`                     | Default variant background.        |
| `--toggle-default-bg-hover`             | `var(--color-accent)`             | Default hover background.          |
| `--toggle-default-bg-active`            | `var(--color-accent)`             | Default active background.         |
| `--toggle-default-bg-pressed`           | `var(--color-primary)`            | Default pressed background.        |
| `--toggle-default-border-color`         | `transparent`                     | Default border color.              |
| `--toggle-default-border-color-pressed` | `var(--color-primary)`            | Default pressed border color.      |
| `--toggle-default-color`                | `var(--color-foreground)`         | Default text/icon color.           |
| `--toggle-default-color-pressed`        | `var(--color-primary-foreground)` | Default pressed text/icon color.   |
| `--toggle-outline-bg`                   | `var(--color-background)`         | Outline background.                |
| `--toggle-outline-bg-hover`             | `var(--color-accent)`             | Outline hover background.          |
| `--toggle-outline-bg-active`            | `var(--color-accent)`             | Outline active background.         |
| `--toggle-outline-bg-pressed`           | `var(--color-primary)`            | Outline pressed background.        |
| `--toggle-outline-border-color`         | `var(--color-border)`             | Outline border color.              |
| `--toggle-outline-border-color-pressed` | `var(--color-primary)`            | Outline pressed border color.      |
| `--toggle-outline-color`                | `var(--color-foreground)`         | Outline text/icon color.           |
| `--toggle-outline-color-pressed`        | `var(--color-primary-foreground)` | Outline pressed text/icon color.   |
| `--toggle-ghost-bg`                     | `transparent`                     | Ghost background.                  |
| `--toggle-ghost-bg-hover`               | `var(--color-accent)`             | Ghost hover background.            |
| `--toggle-ghost-bg-active`              | `var(--color-accent)`             | Ghost active background.           |
| `--toggle-ghost-bg-pressed`             | `var(--color-accent)`             | Ghost pressed background.          |
| `--toggle-ghost-border-color`           | `transparent`                     | Ghost border color.                |
| `--toggle-ghost-color`                  | `var(--color-foreground)`         | Ghost text/icon color.             |
| `--toggle-ghost-color-pressed`          | `var(--color-foreground)`         | Ghost pressed text/icon color.     |

The ghost variant intentionally does not expose `--toggle-ghost-border-color-pressed`. Its pressed
state keeps the current border color. If a pressed ghost toggle needs a border, override
`--toggle-border-color-pressed-current` from `className`.

## UX and accessibility

- Every toggle needs an accessible name. Text children usually provide it automatically. Icon-only
  toggles should set `aria-label`.
- `Toggle` keeps button semantics and `aria-pressed` behavior through Base UI. Keyboard activation and
  focus-visible behavior should stay delegated to the primitive.
- Use `disabled` when the control should stay visible but unavailable.
- Use `ToggleGroup` for related formatting or mode choices instead of manually coordinating several
  standalone toggles with shared state and `value` props.
- Use `render` to avoid nesting interactive elements. For example, `ToolbarButton render={<Toggle />}`
  is preferred over placing a toggle button inside another button-like control.
- Keep inline icons decorative unless they add text elsewhere. Custom SVG children should usually be
  `aria-hidden`.

## Intentional differences from Base UI

- moduix exports a single styled `Toggle` wrapper instead of the unstyled Base UI reference API.
- `variant`, `size`, `data-slot`, `data-variant`, `data-size`, and `--toggle-*` CSS variables are
  part of the local wrapper contract.
- The local docs describe the moduix wrapper, recommended composition, and styling hooks rather than
  duplicating the upstream API reference.
- `ToggleGroupItem` intentionally reuses `Toggle` styling but changes the slot hook to
  `toggle-group-item`.

## Agent notes

- Keep `Toggle` a single-root component. Do not add helper label props, icon props, slot prop bags, or
  other configuration layers when children already express the composition clearly.
- Preserve `mergeClassName` so Base UI state callback class names keep working.
- Keep `Toggle` and `ToggleGroupItem` aligned on `variant` and `size` vocabulary.
- If slot names, CSS variables, stories, or docs examples change, update this file in the same task.

## Local changelog

- Rewrote the local documentation to describe the actual moduix `Toggle` wrapper, composition model,
  styling hooks, accessibility guidance, and the `ToggleGroupItem` slot override instead of the
  upstream Base UI reference text.