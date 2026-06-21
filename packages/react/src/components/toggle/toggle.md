# Toggle

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/toggle

## Purpose

`Toggle` is the moduix two-state action button for compact on/off actions such as favorites, saved
states, formatting controls, and toolbar actions.

## Upstream model to preserve

`Toggle` follows Ark UI's React toggle primitive from `@ark-ui/react/toggle`. Preserve the Ark
anatomy:

```tsx
<Toggle.Root>
  <Toggle.Indicator />
  <Toggle.Context>{/* optional state render prop */}</Toggle.Context>
</Toggle.Root>
```

The root renders a `button`. `Indicator` renders inline pressed/fallback content. Ark exposes
`pressed`, `defaultPressed`, `onPressedChange(pressed)`, `disabled`, `asChild`, `Context`,
`useToggle()`, and `useToggleContext()`.

## Current behavior contract

- `Toggle` is the short root form and is equivalent to `Toggle.Root`.
- `Toggle.Root` is a thin styled wrapper over `ArkToggle.Root`.
- `Toggle.Indicator` is a thin styled wrapper over `ArkToggle.Indicator`.
- `Toggle.Context`, `useToggle`, and `useToggleContext` are exported from the public barrel.
- moduix adds two visual props to the root:
  - `variant?: 'default' | 'outline' | 'ghost'`
  - `size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'`
- `variant` defaults to `default`. `size` defaults to `md`.
- The default variant uses `var(--color-background)` and `var(--color-border)` while off, so a
  standalone toggle keeps a visible button outline before it is pressed.
- The root writes `data-slot="toggle-root"`, `data-variant`, and `data-size`.
- The indicator writes `data-slot="toggle-indicator"`.
- legacy `render`, `nativeButton`, state callback `className`, and state callback `style` are removed. Use Ark
  `asChild`, `Toggle.Indicator`, or `Toggle.Context` instead.

## Anatomy and exported parts

```text
Toggle / Toggle.Root
├─ Toggle.Indicator (optional)
└─ Toggle.Context (optional)
```

| Part                     | data-slot          | Purpose                                                          |
| ------------------------ | ------------------ | ---------------------------------------------------------------- |
| `Toggle` / `Toggle.Root` | `toggle-root`      | Ark button root with pressed, disabled, focus, and size styling. |
| `Toggle.Indicator`       | `toggle-indicator` | Pressed content with optional `fallback` for the off state.      |
| `Toggle.Context`         | —                  | Ark render-prop state access for inline content decisions.       |

## Composition

Simple uncontrolled toggle:

```tsx
import { StarIcon, Toggle } from '@moduix/react';

export function ToggleDemo() {
  return (
    <Toggle defaultPressed>
      <StarIcon />
      Favorite
    </Toggle>
  );
}
```

Changing inline content with Ark `Indicator`:

```tsx
import { CheckIcon, StarIcon, Toggle } from '@moduix/react';

export function FavoriteToggleDemo() {
  return (
    <Toggle aria-label="Favorite" size="icon-md" variant="outline">
      <Toggle.Indicator fallback={<StarIcon />}>
        <CheckIcon />
      </Toggle.Indicator>
    </Toggle>
  );
}
```

Controlled pressed state:

```tsx
import { BellIcon, Toggle } from '@moduix/react';
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

Custom host element with Ark `asChild`:

```tsx
import { Toggle } from '@moduix/react';

export function AsChildToggleDemo() {
  return (
    <Toggle asChild variant="outline">
      <button type="button">Custom button</button>
    </Toggle>
  );
}
```

## Upstream feature coverage

- Basic: covered by `<Toggle>` / `<Toggle.Root>` with children.
- Controlled: supported with Ark `pressed` and `onPressedChange(pressed)`.
- Disabled: supported through Ark `disabled` and native button disabled behavior.
- Indicator: supported through `Toggle.Indicator` and its `fallback` prop.
- Context: supported through `Toggle.Context` and `useToggleContext()`.
- RootProvider: not applicable; Ark Toggle does not expose a public `RootProvider`.
- Form state: not applicable; Ark Toggle is a button primitive and does not expose `HiddenInput`.

## Accessibility and state

- The root keeps Ark button semantics and `aria-pressed` behavior.
- Keyboard activation, focus handling, disabled behavior, and pressed state are delegated to Ark.
- Icon-only toggles must provide an accessible name, usually `aria-label`.
- Refs on `Toggle` / `Toggle.Root` target the rendered button.
- Refs on `Toggle.Indicator` target the rendered indicator element.
- Ark state attributes available for styling:
  - `data-scope="toggle"`
  - `data-part="root" | "indicator"`
  - `data-state="on" | "off"`
  - `data-pressed`
  - `data-disabled`

## Defaults and styling

`Toggle` keeps moduix visual identity through CSS Modules and public `--toggle-*` variables. Style
the component through `className`, `data-slot`, Ark data attributes, and CSS variables.

Important hooks:

| Hook                           | Notes                                     |
| ------------------------------ | ----------------------------------------- |
| `data-slot="toggle-root"`      | Stable moduix root selector.              |
| `data-slot="toggle-indicator"` | Stable moduix indicator selector.         |
| `data-variant`                 | Mirrors the moduix `variant` prop.        |
| `data-size`                    | Mirrors the moduix `size` prop.           |
| `data-state="on"`              | Preferred Ark selector for pressed state. |
| `data-pressed`                 | Present when the toggle is pressed.       |

Direct child `svg` elements inherit `--toggle-icon-size`. Icon-only sizes remove padding and size
the root to a square box.

## Intentional sugar and differences from upstream

- The short `Toggle` export is the default consumer path and is also available as `Toggle.Root`.
- `variant` and `size` are moduix visual sugar layered on top of Ark behavior.
- The default variant is intentionally outlined while off; use `variant="ghost"` for a transparent
  no-border toggle.
- `Toggle.Indicator` does not add default icons; consumers pass the pressed content and optional
  `fallback`.
- legacy compatibility APIs are intentionally removed. There is no `render`, `nativeButton`,
  legacy event details object, or legacy state callback styling contract.
- Use Ark `asChild` for custom host composition.

## Agent notes

- Keep the wrapper thin. Do not add local state or remap `onPressedChange`.
- If Ark adds `RootProvider` for Toggle in the future, mirror it through the namespace and barrel.
- Do not reintroduce legacy `render` examples in stories, docs, or local markdown.
- `ToggleGroup` is a separate component family; do not make standalone `Toggle` depend on group context.

## Local changelog

- 2026-06-21: Changed the off-state default variant from transparent/no-border to
  `var(--color-background)` plus `var(--color-border)` so standalone toggles have visible affordance.
- 2026-06-21: Migrated `Toggle` to Ark UI. Added `Toggle.Root`,
  `Toggle.Indicator`, `Toggle.Context`, `useToggle`, and `useToggleContext`; removed legacy
  `render` / `nativeButton` compatibility and updated styling hooks to Ark data attributes.