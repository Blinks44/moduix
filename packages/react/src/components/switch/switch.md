# Switch

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/switch
- Chakra UI: https://chakra-ui.com/docs/components/switch

## Purpose

`Switch` is the moduix on/off control for immediate boolean settings such as notifications, dark
mode, or feature flags.

## Upstream model to preserve

The wrapper follows Ark UI React `Switch`. Preserve the Ark anatomy:

```text
Switch / Switch.Root
├─ Switch.Control
│  └─ Switch.Thumb
├─ Switch.Label
└─ Switch.HiddenInput
```

`Root` and `RootProvider` render label elements, `Control`, `Thumb`, and `Label` render spans, and
`HiddenInput` renders the native input used for form submission, reset, and validation. Ark owns
checked state, keyboard activation, ARIA wiring, ids, field context, data attributes, and
controlled/uncontrolled behavior.

Expose ordinary usage through the visible switch parts and keep `Switch.RootProvider` for state
created outside with moduix `useSwitch()`. Do not render `Switch.Root` and `Switch.RootProvider`
for the same state instance.

## Current behavior contract

- `Switch` is the short callable root and is also available as `Switch.Root`.
- `Switch.Root`, `Switch.RootProvider`, `Switch.Control`, `Switch.Thumb`, `Switch.Label`, and
  `Switch.HiddenInput` are thin styled wrappers over the matching Ark parts.
- `Switch.Context`, `useSwitchContext`, and `useSwitch` preserve Ark state access through moduix
  exports.
- `Switch.Control` renders a default `Switch.Thumb` when its children are omitted.
- `Switch` / `Switch.Root` and `Switch.RootProvider` do not render structural children for
  consumers. Compose the Ark parts explicitly so labels and form inputs stay visible in code.
- `size` is the only moduix root sugar. It defaults to `md` and writes `data-size` on the root.
  Supported values are `xs`, `sm`, `md`, `lg`, and `xl`.
- `className` is accepted on all visible Ark parts and merged with CSS Module classes.
- legacy compatibility is removed. There is no `SwitchField`, flat `SwitchThumb`, flat
  `SwitchLabel`, `render`, `nativeButton`, `inputRef`, raw boolean `onCheckedChange`, or
  `uncheckedValue` wrapper contract.

## Anatomy and exported parts

| Export                   | Ark part / element             | `data-slot`            | Notes                                                   |
| ------------------------ | ------------------------------ | ---------------------- | ------------------------------------------------------- |
| `Switch` / `Switch.Root` | `SwitchPrimitive.Root`         | `switch-root`          | Root label, state owner, accepts `size`.                |
| `Switch.RootProvider`    | `SwitchPrimitive.RootProvider` | `switch-root-provider` | Root label driven by Ark `useSwitch()`, accepts `size`. |
| `Switch.Control`         | `SwitchPrimitive.Control`      | `switch-control`       | Visual track, focus ring target.                        |
| `Switch.Thumb`           | `SwitchPrimitive.Thumb`        | `switch-thumb`         | Movable thumb; supports custom children.                |
| `Switch.Label`           | `SwitchPrimitive.Label`        | `switch-label`         | Ark-connected label text.                               |
| `Switch.HiddenInput`     | `SwitchPrimitive.HiddenInput`  | `switch-hidden-input`  | Native input for forms and reset.                       |
| `Switch.Context`         | `SwitchContext`                | —                      | Render-prop access to the current Ark switch state.     |
| `useSwitchContext`       | `useSwitchContext`             | —                      | Hook access to the current Ark switch state.            |
| `useSwitch`              | `useSwitch`                    | —                      | Creates state for `Switch.RootProvider`.                |

State helpers are imported from `@moduix/react` with `Switch`.

## Composition

Canonical labeled switch:

```tsx
import { Switch } from '@moduix/react';

export function SwitchDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control />
      <Switch.Label>Enable notifications</Switch.Label>
      <Switch.HiddenInput />
    </Switch>
  );
}
```

Controlled switch:

```tsx
import { Switch } from '@moduix/react';
import { useState } from 'react';

export function ControlledSwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
      <Switch.Control />
      <Switch.Label>{checked ? 'On' : 'Off'}</Switch.Label>
      <Switch.HiddenInput />
    </Switch>
  );
}
```

External state owner:

```tsx
import { Switch, useSwitch } from '@moduix/react';

export function RootProviderSwitchDemo() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <Switch.RootProvider value={switchApi}>
      <Switch.Control />
      <Switch.Label>External state owner</Switch.Label>
      <Switch.HiddenInput />
    </Switch.RootProvider>
  );
}
```

## Upstream feature coverage

- Basic anatomy: supported through explicit `Root` / `Control` / `Thumb` / `Label` / `HiddenInput`
  parts.
- Initial checked state: supported with Ark `defaultChecked`.
- Controlled state: supported with Ark `checked` and `onCheckedChange(details)`.
- Disabled and read-only states: supported with Ark `disabled` and `readOnly` and styled through Ark
  state attributes.
- Context access: use `Switch.Context` or import `useSwitchContext` from `@moduix/react`.
- Root provider: import `useSwitch` from `@moduix/react` and pair it with `Switch.RootProvider`.
- Field integration: supported by composing with `Field` and including `Switch.HiddenInput`.
- ids and `asChild`: inherited from Ark root and part props.

## Accessibility and state

- Every switch needs an accessible name. The recommended path is `Switch.Label` inside `Switch`.
- Include `Switch.HiddenInput` when native form submission, reset, `name`, `value`, `required`, or
  validation matters.
- Ark `onCheckedChange` receives `{ checked }`. Do not reintroduce a raw boolean adapter.
- `Field.Root` / `Fieldset.Root` context can provide disabled, invalid, required, and read-only
  state through Ark.
- State styling uses Ark attributes: `data-state='checked' | 'unchecked'`, `data-focus-visible`,
  `data-hover`, `data-active`, `data-disabled`, `data-readonly`, `data-invalid`, and
  `data-required`.
- `Switch.Control` is the visual focus ring target. Refs are forwarded to the matching Ark DOM part.

## Defaults and styling

Public CSS variables:

| Variable                         | Default fallback                                          | Purpose                              |
| -------------------------------- | --------------------------------------------------------- | ------------------------------------ |
| `--switch-bg`                    | `var(--color-muted)`                                      | Unchecked background.                |
| `--switch-bg-checked`            | `var(--color-primary)`                                    | Checked background.                  |
| `--switch-bg-checked-hover`      | `var(--switch-bg-checked, var(--color-primary))`          | Checked hover background.            |
| `--switch-bg-hover`              | `var(--color-accent)`                                     | Unchecked hover background.          |
| `--switch-border-color`          | `var(--color-border)`                                     | Unchecked border color.              |
| `--switch-border-color-checked`  | `var(--color-primary)`                                    | Checked border color.                |
| `--switch-border-width`          | `var(--border-width-sm)`                                  | Control border width.                |
| `--switch-disabled-opacity`      | `var(--opacity-disabled)`                                 | Disabled root opacity.               |
| `--switch-focus-ring-color`      | `var(--color-ring)`                                       | Focus ring color.                    |
| `--switch-focus-ring-offset`     | `var(--border-width-sm)`                                  | Focus ring offset.                   |
| `--switch-focus-ring-width`      | `var(--border-width-sm)`                                  | Focus ring width.                    |
| `--switch-gap`                   | `var(--spacing-2)`                                        | Gap between control and label.       |
| `--switch-height-xs`             | `1rem`                                                    | Control height for `size="xs"`.      |
| `--switch-height-sm`             | `1.25rem`                                                 | Control height for `size="sm"`.      |
| `--switch-height-md`             | `1.5rem`                                                  | Control height for `size="md"`.      |
| `--switch-height-lg`             | `1.75rem`                                                 | Control height for `size="lg"`.      |
| `--switch-height-xl`             | `2rem`                                                    | Control height for `size="xl"`.      |
| `--switch-label-color`           | `var(--color-foreground)`                                 | Label text color.                    |
| `--switch-label-font-size`       | `var(--text-sm)`                                          | Label font size.                     |
| `--switch-label-font-weight`     | `var(--weight-medium)`                                    | Label font weight.                   |
| `--switch-label-line-height`     | `var(--line-height-text-sm)`                              | Label line height.                   |
| `--switch-padding`               | `0.125rem`                                                | Inner track padding.                 |
| `--switch-radius`                | `var(--radius-full)`                                      | Control border radius.               |
| `--switch-thumb-bg`              | `var(--color-background)`                                 | Shared thumb background fallback.    |
| `--switch-thumb-bg-checked`      | `var(--switch-thumb-bg, var(--color-primary-foreground))` | Checked thumb background.            |
| `--switch-thumb-bg-unchecked`    | `var(--switch-thumb-bg, var(--color-background))`         | Unchecked thumb background.          |
| `--switch-thumb-border-color`    | `transparent`                                             | Thumb border color.                  |
| `--switch-thumb-border-width`    | `0`                                                       | Thumb border width.                  |
| `--switch-thumb-color`           | `var(--color-muted)`                                      | Shared thumb content color fallback. |
| `--switch-thumb-color-checked`   | `var(--switch-thumb-color, var(--color-primary))`         | Checked thumb content color.         |
| `--switch-thumb-color-unchecked` | `var(--switch-thumb-color, var(--color-muted))`           | Unchecked thumb content color.       |
| `--switch-thumb-icon-size`       | `65%`                                                     | Custom thumb icon size.              |
| `--switch-thumb-radius`          | `var(--radius-full)`                                      | Thumb border radius.                 |
| `--switch-thumb-shadow`          | `var(--shadow-sm)`                                        | Thumb shadow.                        |
| `--switch-thumb-size-xs`         | `0.75rem`                                                 | Thumb size for `size="xs"`.          |
| `--switch-thumb-size-sm`         | `1rem`                                                    | Thumb size for `size="sm"`.          |
| `--switch-thumb-size-md`         | `1.25rem`                                                 | Thumb size for `size="md"`.          |
| `--switch-thumb-size-lg`         | `1.5rem`                                                  | Thumb size for `size="lg"`.          |
| `--switch-thumb-size-xl`         | `1.75rem`                                                 | Thumb size for `size="xl"`.          |
| `--switch-thumb-transition`      | `var(--switch-transition, var(--transition-default))`     | Thumb movement transition timing.    |
| `--switch-thumb-translate`       | `var(--switch-thumb-translate-default)`                   | Checked thumb translation distance.  |
| `--switch-transition`            | `var(--transition-default)`                               | State transition timing.             |
| `--switch-width-xs`              | `1.75rem`                                                 | Control width for `size="xs"`.       |
| `--switch-width-sm`              | `2.25rem`                                                 | Control width for `size="sm"`.       |
| `--switch-width-md`              | `2.75rem`                                                 | Control width for `size="md"`.       |
| `--switch-width-lg`              | `3.25rem`                                                 | Control width for `size="lg"`.       |
| `--switch-width-xl`              | `3.75rem`                                                 | Control width for `size="xl"`.       |

Hover colors apply only when a switch is neither disabled nor read-only.

## Intentional sugar and differences from upstream

- `size` is moduix-only and scales `Switch.Control` plus the default thumb.
- `Switch.Control` auto-renders `Switch.Thumb` when no children are provided.
- `Switch.Root` and `Switch.RootProvider` require explicit children; this keeps accessible labels,
  hidden inputs, and custom composition visible in consumer code.
- moduix re-exports Ark state helpers through `Switch.Context`, `useSwitchContext`, and `useSwitch`
  without wrapping or translating their contracts.
- Styling is not unstyled: CSS Modules, `data-slot`, `data-size`, and `--switch-*` variables are
  part of the public wrapper contract.
- Flat legacy exports (`SwitchThumb`, `SwitchField`, `SwitchLabel`) and legacy host props
  (`render`, `nativeButton`) are intentionally removed.

## Agent notes

- Keep `Switch`, `Checkbox`, and `RadioGroup` aligned around Ark callback detail objects and
  explicit hidden input parts.
- Do not restore legacy compatibility aliases or raw boolean callback adapters.
- Keep hover and focus styling on Ark attributes, not custom modifier classes.
- Keep advanced Ark state APIs available through moduix without wrapping or translating them.

## Local changelog

- 2026-07-11: Re-exported Ark context and state hooks through moduix, and disabled hover styling
  now excludes disabled controls.
- 2026-07-03: Simplified the moduix surface to match `combobox`: kept `RootProvider`, size sugar,
  and default-thumb sugar, while moving Ark context/hooks/types back to direct imports from
  `@ark-ui/react/switch`.
- 2026-06-27: Removed root-level auto composition, exported local root prop types with `size`, and
  simplified switch size CSS variables to quarter-rem steps.
- 2026-06-27: Shortened default switch track widths by `0.25rem` across all sizes while keeping
  the existing heights and thumb sizes.
- 2026-06-21: Migrated `Switch` to Ark UI React, adopted namespace parts,
  `HiddenInput`, Ark `onCheckedChange(details)`, `Context`, `useSwitch`, `RootProvider`, `asChild`,
  and Ark state attributes; removed legacy compatibility exports and props.
- 2026-06-03: Rewrote the local documentation to describe the previous moduix `Switch` wrapper,
  exported parts, styling contract, accessibility guidance, and `size`/thumb behavior.