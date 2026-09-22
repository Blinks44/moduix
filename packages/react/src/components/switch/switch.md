# Switch

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/switch
- Chakra UI: https://chakra-ui.com/docs/components/switch
- shadcn/ui: https://ui.shadcn.com/docs/components/switch

Sources checked: 2026-08-13.

## Purpose

`Switch` is the moduix on/off control for immediate boolean settings such as notifications, dark
mode, or feature flags.

## Upstream model to preserve

The wrapper follows Ark UI React `Switch`. Preserve the Ark anatomy:

```text
Switch
├─ SwitchControl
│  └─ SwitchThumb
├─ SwitchLabel
└─ SwitchHiddenInput (explicit)
```

`Switch` and `SwitchRootProvider` render label elements, while `SwitchControl`, `SwitchThumb`, and
`SwitchLabel` render spans. `Switch` and `SwitchRootProvider` append the native form input used for
form submission, reset, and validation. Ark owns
checked state, keyboard activation, ARIA wiring, ids, field context, data attributes, and
controlled/uncontrolled behavior.

Expose ordinary usage through the visible switch parts and keep `SwitchRootProvider` for state
created outside with moduix `useSwitch()`. Do not render `Switch` and `SwitchRootProvider`
for the same state instance.

## Current behavior contract

- `Switch` is the callable root component.
- `Switch`, `SwitchRootProvider`, `SwitchControl`, `SwitchThumb`, and `SwitchLabel` are
  thin styled wrappers over the matching Ark parts. `SwitchHiddenInput` is explicit.
- `SwitchContext`, `useSwitchContext`, and `useSwitch` preserve Ark state access through moduix
  exports.
- `SwitchControl` renders a default `SwitchThumb` when its children are omitted.
- `Switch` and `SwitchRootProvider` do not render structural children for consumers.
  Compose the visible Ark parts and `SwitchHiddenInput` explicitly.
- `size` is the only moduix root sugar. It defaults to `md` and writes `data-size` on the root.
  Supported values are `xs`, `sm`, `md`, `lg`, and `xl`.
- `className` is accepted on all visible Ark parts and merged with CSS Module classes.
- legacy compatibility is removed. There is no `SwitchField`, `render`, `nativeButton`, `inputRef`,
  raw boolean `onCheckedChange`, or
  `uncheckedValue` wrapper contract.

## Anatomy and exported parts

| Export                   | Ark part / element             | `data-slot`            | Notes                                                   |
| ------------------------ | ------------------------------ | ---------------------- | ------------------------------------------------------- |
| `Switch`            | `SwitchPrimitive.Root`         | `switch-root`          | Root label, state owner, accepts `size`.                |
| `SwitchRootProvider`    | `SwitchPrimitive.RootProvider` | `switch-root-provider` | Root label driven by Ark `useSwitch()`, accepts `size`. |
| `SwitchControl`         | `SwitchPrimitive.Control`      | `switch-control`       | Visual track, focus ring target.                        |
| `SwitchThumb`           | `SwitchPrimitive.Thumb`        | `switch-thumb`         | Movable thumb; supports custom children.                |
| `SwitchLabel`           | `SwitchPrimitive.Label`        | `switch-label`         | Ark-connected label text.                               |
| `SwitchContext`         | `SwitchContext`                | -                      | Render-prop access to the current Ark switch state.     |
| `useSwitchContext`       | `useSwitchContext`             | -                      | Hook access to the current Ark switch state.            |
| `useSwitch`              | `useSwitch`                    | -                      | Creates state for `SwitchRootProvider`.                |

State helpers are imported from `@moduix/react` with `Switch`.

## Composition

Canonical labeled switch:

```tsx
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
} from '@moduix/react/switch';

export function SwitchDemo() {
  return (
    <Switch defaultChecked>
      <SwitchControl />
      <SwitchLabel>Enable notifications</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  );
}
```

Controlled switch:

```tsx
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
} from '@moduix/react/switch';
import { useState } from 'react';

export function ControlledSwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
      <SwitchControl />
      <SwitchLabel>{checked ? 'On' : 'Off'}</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  );
}
```

External state owner:

```tsx
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  useSwitch,
} from '@moduix/react/switch';

export function RootProviderSwitchDemo() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <SwitchRootProvider value={switchApi}>
      <SwitchControl />
      <SwitchLabel>External state owner</SwitchLabel>
      <SwitchHiddenInput />
    </SwitchRootProvider>
  );
}
```

## Upstream feature coverage

- Basic anatomy: supported through `Switch`, `SwitchControl`, `SwitchThumb`, and `SwitchLabel`.
- Initial checked state: supported with Ark `defaultChecked`.
- Controlled state: supported with Ark `checked` and `onCheckedChange(details)`.
- Disabled and read-only states: supported with Ark `disabled` and `readOnly` and styled through Ark
  state attributes.
- Context access: use `SwitchContext` or import `useSwitchContext` from `@moduix/react`.
- Root provider: import `useSwitch` from `@moduix/react` and pair it with `SwitchRootProvider`.
- Field integration: supported by composing with `Field`; configure native form behavior on the root.
- ids and `asChild`: inherited from Ark root and part props.

## Accessibility and state

- Every switch needs an accessible name. The recommended path is `SwitchLabel` inside `Switch`.
- `SwitchHiddenInput` renders the native form input. `name`, `form`, and validation props configure
  its native form participation.
- Read-only switches retain their state; Ark owns native-input semantics.
- Ark `onCheckedChange` receives `{ checked }`. Do not reintroduce a raw boolean adapter.
- `Field` / `Fieldset` context can provide disabled, invalid, required, and read-only
  state through Ark.
- State styling uses Ark attributes: `data-state='checked' | 'unchecked'`, `data-focus-visible`,
  `data-hover`, `data-active`, `data-disabled`, `data-readonly`, `data-invalid`, and
  `data-required`.
- Checked thumbs move toward the inline end, including when the switch inherits RTL direction.
- The track and thumb disable their transitions when the user prefers reduced motion.
- `SwitchControl` is the visual focus ring target. Refs are forwarded to the matching Ark DOM part.

## Defaults and styling

Public CSS variables:

| Variable                                | Default fallback                                                        | Purpose                              |
| --------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------ |
| `--moduix-switch-bg`                    | `var(--moduix-color-muted)`                                             | Unchecked background.                |
| `--moduix-switch-bg-checked`            | `var(--moduix-color-primary)`                                           | Checked background.                  |
| `--moduix-switch-bg-checked-hover`      | `var(--moduix-switch-bg-checked, var(--moduix-color-primary))`          | Checked hover background.            |
| `--moduix-switch-bg-hover`              | `var(--moduix-color-accent)`                                            | Unchecked hover background.          |
| `--moduix-switch-border-color`          | `var(--moduix-color-border)`                                            | Unchecked border color.              |
| `--moduix-switch-border-color-checked`  | `var(--moduix-color-primary)`                                           | Checked border color.                |
| `--moduix-switch-border-color-invalid`  | `var(--moduix-color-destructive)`                                       | Invalid border color.                |
| `--moduix-switch-border-width`          | `var(--moduix-border-width-sm)`                                         | Control border width.                |
| `--moduix-switch-disabled-opacity`      | `var(--moduix-opacity-disabled)`                                        | Disabled root opacity.               |
| `--moduix-switch-focus-ring-color`      | `var(--moduix-color-ring)`                                              | Focus ring color.                    |
| `--moduix-switch-focus-ring-offset`     | `var(--moduix-border-width-sm)`                                         | Focus ring offset.                   |
| `--moduix-switch-focus-ring-width`      | `var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))`   | Focus ring width.                    |
| `--moduix-switch-gap`                   | `var(--moduix-spacing-2)`                                               | Gap between control and label.       |
| `--moduix-switch-height-xs`             | `1rem`                                                                  | Control height for `size="xs"`.      |
| `--moduix-switch-height-sm`             | `1.25rem`                                                               | Control height for `size="sm"`.      |
| `--moduix-switch-height-md`             | `var(--moduix-size-xs)`                                                 | Control height for `size="md"`.      |
| `--moduix-switch-height-lg`             | `1.75rem`                                                               | Control height for `size="lg"`.      |
| `--moduix-switch-height-xl`             | `var(--moduix-size-sm)`                                                 | Control height for `size="xl"`.      |
| `--moduix-switch-label-color`           | `var(--moduix-color-foreground)`                                        | Label text color.                    |
| `--moduix-switch-label-font-size`       | `var(--moduix-text-sm)`                                                 | Label font size.                     |
| `--moduix-switch-label-font-weight`     | `var(--moduix-weight-medium)`                                           | Label font weight.                   |
| `--moduix-switch-label-line-height`     | `var(--moduix-line-height-text-sm)`                                     | Label line height.                   |
| `--moduix-switch-padding`               | `var(--moduix-spacing-0-5)`                                             | Inner track padding.                 |
| `--moduix-switch-radius`                | `var(--moduix-radius-full)`                                             | Control border radius.               |
| `--moduix-switch-thumb-bg`              | `var(--moduix-color-background)`                                        | Shared thumb background fallback.    |
| `--moduix-switch-thumb-bg-checked`      | `var(--moduix-switch-thumb-bg, var(--moduix-color-primary-foreground))` | Checked thumb background.            |
| `--moduix-switch-thumb-bg-unchecked`    | `var(--moduix-switch-thumb-bg, var(--moduix-color-background))`         | Unchecked thumb background.          |
| `--moduix-switch-thumb-border-color`    | `transparent`                                                           | Thumb border color.                  |
| `--moduix-switch-thumb-border-width`    | `0`                                                                     | Thumb border width.                  |
| `--moduix-switch-thumb-color`           | `var(--moduix-color-muted)`                                             | Shared thumb content color fallback. |
| `--moduix-switch-thumb-color-checked`   | `var(--moduix-switch-thumb-color, var(--moduix-color-primary))`         | Checked thumb content color.         |
| `--moduix-switch-thumb-color-unchecked` | `var(--moduix-switch-thumb-color, var(--moduix-color-muted))`           | Unchecked thumb content color.       |
| `--moduix-switch-thumb-icon-size`       | `65%`                                                                   | Custom thumb icon size.              |
| `--moduix-switch-thumb-radius`          | `var(--moduix-radius-full)`                                             | Thumb border radius.                 |
| `--moduix-switch-thumb-shadow`          | `var(--moduix-shadow-sm)`                                               | Thumb shadow.                        |
| `--moduix-switch-thumb-size-xs`         | `var(--moduix-spacing-3)`                                               | Thumb size for `size="xs"`.          |
| `--moduix-switch-thumb-size-sm`         | `var(--moduix-spacing-4)`                                               | Thumb size for `size="sm"`.          |
| `--moduix-switch-thumb-size-md`         | `var(--moduix-spacing-5)`                                               | Thumb size for `size="md"`.          |
| `--moduix-switch-thumb-size-lg`         | `var(--moduix-size-xs)`                                                 | Thumb size for `size="lg"`.          |
| `--moduix-switch-thumb-size-xl`         | `var(--moduix-spacing-7)`                                               | Thumb size for `size="xl"`.          |
| `--moduix-switch-thumb-transition`      | `var(--moduix-switch-transition, var(--moduix-transition-default))`     | Thumb movement transition timing.    |
| `--moduix-switch-thumb-translate`       | Size-dependent control width minus thumb size and borders               | Checked thumb translation distance.  |
| `--moduix-switch-transition`            | `var(--moduix-transition-default)`                                      | State transition timing.             |
| `--moduix-switch-width-xs`              | `1.75rem`                                                               | Control width for `size="xs"`.       |
| `--moduix-switch-width-sm`              | `2.25rem`                                                               | Control width for `size="sm"`.       |
| `--moduix-switch-width-md`              | `2.75rem`                                                               | Control width for `size="md"`.       |
| `--moduix-switch-width-lg`              | `3.25rem`                                                               | Control width for `size="lg"`.       |
| `--moduix-switch-width-xl`              | `3.75rem`                                                               | Control width for `size="xl"`.       |

Hover colors apply only when a switch is neither disabled nor read-only.

## Upstream comparison (checked 2026-08-13)

| Source    | Useful difference                                     | moduix decision                                                                                              |
| --------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Ark UI    | Prescribes state, form, and compositional primitives. | **Required correctness:** preserve the anatomy and expose its native input as an explicit part.              |
| Chakra UI | `Control` can render a default thumb.                 | **Optional sugar adopted:** moduix keeps the same narrow default while retaining explicit thumb composition. |
| Chakra UI | Offers palette and variant props.                     | **Intentional difference:** moduix keeps the public API to `size` and uses CSS variables for visual theming. |
| shadcn/ui | Promotes a closed single-component composition.       | **Rejected complexity:** keep Ark-shaped explicit parts rather than adding a parallel wrapper API.           |

## Intentional sugar and differences from upstream

- `size` is moduix-only and scales `SwitchControl` plus the default thumb.
- `SwitchControl` auto-renders `SwitchThumb` when no children are provided.
- `Switch` and `SwitchRootProvider` require explicit children; this keeps accessible labels,
  hidden inputs, and custom composition visible in consumer code.
- moduix re-exports Ark state helpers through `SwitchContext`, `useSwitchContext`, and `useSwitch`
  without wrapping or translating their contracts.
- Styling is not unstyled: CSS Modules, `data-slot`, `data-size`, and `--moduix-switch-*` variables are
  part of the public wrapper contract.
- The legacy `SwitchField` export and legacy host props (`render`, `nativeButton`) are intentionally
  removed.

## Agent notes

- Keep `Switch`, `Checkbox`, and `RadioGroup` aligned around Ark callback detail objects and
  explicit hidden input parts.
- Do not restore legacy compatibility aliases or raw boolean callback adapters.
- Keep hover and focus styling on Ark attributes, not custom modifier classes.
- Keep advanced Ark state APIs available through moduix without wrapping or translating them.

## Local changelog

- 2026-08-13: Marked read-only native controls with `aria-readonly`, made invalid borders token-
  overridable, disabled switch transitions for reduced motion, corrected the public CSS-variable
  reference, and added form-reset, ref, and state-semantics coverage.

- 2026-09-04: Exposed Ark `HiddenInput` explicitly and removed root child mutation.
- 2026-07-31: Fixed checked-thumb movement in RTL, added invalid control styling, and covered the
  native input, `asChild`, and controlled paths with focused tests.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-13: Native form controls were rendered automatically at this point in the wrapper history.

- 2026-07-11: Re-exported Ark context and state hooks through moduix, and disabled hover styling
  now excludes disabled controls.
- 2026-07-03: Simplified the moduix surface to match `combobox`: kept `RootProvider`, size sugar,
  and default-thumb sugar, while moving Ark context/hooks/types back to direct imports from
  `@ark-ui/react/switch`.
- 2026-06-27: Removed root-level auto composition, exported local root prop types with `size`, and
  simplified switch size CSS variables to quarter-rem steps.
- 2026-06-27: Shortened default switch track widths by `0.25rem` across all sizes while keeping
  the existing heights and thumb sizes.
- 2026-06-21: Migrated `Switch` to Ark UI React, adopted explicit parts,
  the native form input, Ark `onCheckedChange(details)`, `Context`, `useSwitch`, `RootProvider`, `asChild`,
  and Ark state attributes; removed legacy compatibility exports and props.
- 2026-06-03: Rewrote the local documentation to describe the previous moduix `Switch` wrapper,
  exported parts, styling contract, accessibility guidance, and `size`/thumb behavior.
