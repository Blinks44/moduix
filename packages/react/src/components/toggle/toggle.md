# Toggle

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/toggle

## Purpose

`Toggle` is the moduix two-state action button for compact on/off actions such as favorites, saved
states, formatting controls, and toolbar actions.

## Upstream model to preserve

`Toggle` follows Ark UI's React toggle primitive from `@ark-ui/react/toggle`. Preserve the Ark
anatomy with moduix's flat names:

```tsx
<Toggle>
  <ToggleIndicator />
</Toggle>
```

The root renders a `button`. `ToggleIndicator` renders inline pressed/fallback content.
`ToggleContext` is a state reader rather than a DOM part. Ark exposes `pressed`, `defaultPressed`,
`onPressedChange(pressed)`, `disabled`, `asChild`, `Context`, `useToggle()`, and
`useToggleContext()`.

## Current behavior contract

- `Toggle` is the styled wrapper over `ArkToggle.Root`.
- `ToggleIndicator` is the styled wrapper over `ArkToggle.Indicator`.
- `ToggleContext` and `useToggleContext` preserve Ark's custom-descendant state access through
  moduix exports.
- `ToggleRootProps`, `ToggleSize`, and `ToggleVariant` are exported for typed wrappers and shared
  component APIs, together with the Ark types `ToggleContextProps`, `ToggleIndicatorProps`,
  `UseToggleContext`, `UseToggleProps`, and `UseToggleReturn`.
- moduix adds two visual props to the root:
  - `variant?: 'default' | 'outline' | 'ghost'`
  - `size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'`
- `variant` defaults to `default`. `size` defaults to `md`.
- The default variant uses `var(--moduix-color-secondary)` while off; `outline` uses
  `var(--moduix-color-background)` plus `var(--moduix-color-border)`; `ghost` is transparent. Pressed
  `default` and `outline` use `var(--moduix-color-primary)`; pressed `ghost` uses
  `var(--moduix-color-accent)`.
- The root writes `data-slot="toggle-root"`, `data-variant`, and `data-size`.
- The indicator writes `data-slot="toggle-indicator"`.

## Anatomy and exported parts

```text
Toggle
└─ ToggleIndicator (optional)

ToggleContext (state reader, not a DOM part)
```

| Part              | data-slot          | Purpose                                                          |
| ----------------- | ------------------ | ---------------------------------------------------------------- |
| `Toggle`          | `toggle-root`      | Ark button root with pressed, disabled, focus, and size styling. |
| `ToggleIndicator` | `toggle-indicator` | Pressed content with optional `fallback` for the off state.      |
| `ToggleContext`   | -                  | Ark state reader for custom descendants.                         |

## Composition

Simple uncontrolled toggle:

```tsx
import { Toggle } from '@moduix/react/toggle';
import { Star as StarIcon } from 'lucide-react';

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
import { Toggle, ToggleIndicator } from '@moduix/react/toggle';
import { Check as CheckIcon, Star as StarIcon } from 'lucide-react';

export function FavoriteToggleDemo() {
  return (
    <Toggle aria-label="Favorite" size="icon-md" variant="outline">
      <ToggleIndicator fallback={<StarIcon />}>
        <CheckIcon />
      </ToggleIndicator>
    </Toggle>
  );
}
```

Controlled pressed state:

```tsx
import { Toggle } from '@moduix/react/toggle';
import { Bell as BellIcon } from 'lucide-react';
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
import { Toggle } from '@moduix/react/toggle';

export function AsChildToggleDemo() {
  return (
    <Toggle asChild variant="outline">
      <button type="button">Custom button</button>
    </Toggle>
  );
}
```

## Upstream feature coverage

- Basic: covered by `<Toggle>` with children.
- Controlled: supported with Ark `pressed` and `onPressedChange(pressed)`.
- Disabled: supported through Ark `disabled` and native button disabled behavior.
- Indicator: supported through `ToggleIndicator` and its `fallback` prop.
- Advanced Ark state access remains available by importing `useToggleContext()` from
  `@moduix/react/toggle`;
  `ToggleContext` is also available as a direct export.
- RootProvider: not applicable; Ark Toggle does not expose a public `RootProvider`.
- Form state: not applicable; Ark Toggle is a button primitive and does not expose `HiddenInput`.

## Accessibility and state

- The root keeps Ark button semantics and `aria-pressed` behavior.
- Keyboard activation, focus handling, disabled behavior, and pressed state are delegated to Ark.
- Icon-only toggles must provide an accessible name, usually `aria-label`.
- Refs on `Toggle` target the rendered button.
- Refs on `ToggleIndicator` target the rendered indicator element.
- Ark state attributes available for styling:
  - `data-scope="toggle"`
  - `data-part="root" | "indicator"`
  - `data-state="on" | "off"`
  - `data-pressed`
  - `data-disabled`

## Defaults and styling

Sizes follow Button: text sizes use `--moduix-size-*` heights with spacing-token padding, icon-only
sizes are non-shrinking squares of the same height. Direct `svg` children and `svg` children of
`ToggleIndicator` are 16px (`--moduix-spacing-4`); a class on the icon wins.

The CSS Modules packages expose six color variables. Set them on a toggle, on
`[data-slot='toggle-root'][data-variant='<variant>']` to theme one variant, or on a container such as
`ToggleGroup` (which sets `--moduix-toggle-color` for its items). Variant defaults stay private in
`--_toggle-*` properties.

| Variable                        | Default                                    | Notes                                    |
| ------------------------------- | ------------------------------------------ | ---------------------------------------- |
| `--moduix-toggle-bg`            | `var(--moduix-color-secondary)`            | Outline: background; ghost: transparent. |
| `--moduix-toggle-bg-hover`      | `var(--moduix-color-accent)`               | Unpressed hover and `:active`.           |
| `--moduix-toggle-bg-pressed`    | `var(--moduix-color-primary)`              | Also the pressed border; ghost: accent.  |
| `--moduix-toggle-border-color`  | `var(--moduix-color-secondary)`            | Outline: border; ghost: transparent.     |
| `--moduix-toggle-color`         | `var(--moduix-color-secondary-foreground)` | Outline and ghost: foreground.           |
| `--moduix-toggle-color-pressed` | `var(--moduix-color-primary-foreground)`   | Ghost: foreground.                       |

Size, spacing, radius, typography, focus ring, transition, and disabled opacity use foundation tokens
directly; override them with a class. Tailwind packages use the same tokens through utilities.

Important hooks:

| Hook                           | Notes                                     |
| ------------------------------ | ----------------------------------------- |
| `data-slot="toggle-root"`      | Stable moduix root selector.              |
| `data-slot="toggle-indicator"` | Stable moduix indicator selector.         |
| `data-variant`                 | Mirrors the moduix `variant` prop.        |
| `data-size`                    | Mirrors the moduix `size` prop.           |
| `data-state="on"`              | Preferred Ark selector for pressed state. |
| `data-pressed`                 | Present when the toggle is pressed.       |

## Intentional sugar and differences from upstream

- The `Toggle` export is the default consumer path and the only root value export.
- `variant` and `size` are moduix visual sugar layered on top of Ark behavior.
- The default variant is intentionally secondary while off; use `variant="outline"` for a bordered
  surface or `variant="ghost"` for a transparent no-border toggle.
- `ToggleIndicator` does not add default icons; consumers pass the pressed content and optional
  `fallback`.
- moduix re-exports Ark's context surfaces as `ToggleContext` and `useToggleContext` so custom
  descendants do not need direct Ark imports.
- Use Ark `asChild` for custom host composition.

## Agent notes

- Keep the wrapper thin. Do not add local state or remap `onPressedChange`.
- If Ark adds `RootProvider` for Toggle in the future, expose it as `ToggleRootProvider` through the
  flat barrel.
- Do not reintroduce legacy `render` examples in stories, docs, or local markdown.
- `ToggleGroup` is a separate component family; do not make standalone `Toggle` depend on group context.
- `ToggleGroupItem` reuses the Toggle root class (`toggleVariants` in Tailwind). Run the ToggleGroup
  tests after any Toggle style change.