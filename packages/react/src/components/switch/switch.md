# Switch

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/switch
- Chakra UI: https://chakra-ui.com/docs/components/switch
- shadcn/ui: https://ui.shadcn.com/docs/components/switch

## Purpose

`Switch` is the moduix on/off control for immediate boolean settings such as notifications, dark
mode, or feature flags.

## Anatomy

```text
Switch
├─ SwitchControl
│  └─ SwitchThumb (default)
├─ SwitchLabel
└─ SwitchHiddenInput (explicit)
```

| Export               | Ark part                       | `data-slot`            | Notes                                                 |
| -------------------- | ------------------------------ | ---------------------- | ----------------------------------------------------- |
| `Switch`             | `SwitchPrimitive.Root`         | `switch-root`          | Root `label`, state owner, accepts `size`.            |
| `SwitchRootProvider` | `SwitchPrimitive.RootProvider` | `switch-root-provider` | Root `label` driven by `useSwitch()`, accepts `size`. |
| `SwitchControl`      | `SwitchPrimitive.Control`      | `switch-control`       | Track and focus-ring target; default thumb.           |
| `SwitchThumb`        | `SwitchPrimitive.Thumb`        | `switch-thumb`         | Movable thumb; accepts custom children.               |
| `SwitchLabel`        | `SwitchPrimitive.Label`        | `switch-label`         | Ark-connected label text.                             |
| `SwitchHiddenInput`  | `SwitchPrimitive.HiddenInput`  | -                      | Native input; compose it explicitly.                  |
| `SwitchContext`      | `SwitchPrimitive.Context`      | -                      | Render-prop access to Ark switch state.               |

The barrel also re-exports `useSwitch`, `useSwitchContext`, the moduix types `SwitchRootProps`,
`SwitchRootProviderProps`, and `SwitchSize`, and the Ark types `SwitchCheckedChangeDetails`,
`SwitchContextProps`, `SwitchControlProps`, `SwitchHiddenInputProps`, `SwitchLabelProps`,
`SwitchThumbProps`, `UseSwitchContext`, `UseSwitchProps`, and `UseSwitchReturn`.

## Behavior contract

- Ark owns checked state, keyboard activation, ARIA wiring, ids, field context, form reset, and
  `onCheckedChange(details)`. Do not add a raw boolean adapter.
- `Switch` and `SwitchRootProvider` render only their children. Compose `SwitchHiddenInput`
  explicitly, including outside forms: Ark uses it for focus and keyboard interaction.
- `SwitchControl` renders a default `SwitchThumb` when it has no children.
- `size` (`xs` | `sm` | `md` | `lg` | `xl`, default `md`) is the only moduix prop. It writes
  `data-size` on the root.
- `asChild` takes one element compatible with `label`; the root classes merge onto it.
- Right-to-left direction comes from Ark `LocaleProvider`. Ark writes `dir` on every part, so the
  styles match `[dir='rtl']` on the thumb instead of `:dir()`, which bundlers may lower to `:lang()`.

```tsx
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';

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

## Styling

- The root sets the text color; `SwitchLabel` inherits it.
- Sizes set `width` and `height` on `SwitchControl`. The thumb is absolutely positioned against the
  track: its height is the track content height minus the `spacing-0-5` inset, `aspect-ratio: 1`
  makes it square, and the checked state moves it with `inset-inline-start` plus `translate`. A plain
  `width` or `height` override on the control keeps the thumb aligned without extra variables.
- Hover applies only to an unchecked switch that is neither disabled nor read-only.
- Invalid sets the track border and focus ring to the destructive color, like Checkbox and RadioGroup;
  the checked track keeps its primary background.
- Transitions use foundation duration tokens, which drop to near zero for reduced motion.
- Public CSS Modules variables: `--moduix-switch-bg`, `--moduix-switch-bg-checked` (background and
  border of the checked track), `--moduix-switch-border-color`, `--moduix-switch-gap`, and
  `--moduix-switch-thumb-bg` (both states). Everything else uses foundation tokens; override it with a
  class on the part.

## Agent notes

- Keep `Switch`, `Checkbox`, and `RadioGroup` aligned around Ark callback detail objects and
  explicit hidden input parts.
- Keep hover and focus styling on Ark attributes, not custom modifier classes.
- Keep the default thumb sugar narrow: one `SwitchThumb`, replaced by any children.