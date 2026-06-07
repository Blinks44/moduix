# Switch

Upstream primitive docs: https://base-ui.com/react/components/switch

## Purpose

`Switch` is the moduix on/off control for boolean settings. It is a thin styled wrapper over the Base
UI switch root with moduix defaults, exported composition parts, CSS Modules styling, and one small
DX prop: `size`.

Use it for settings that toggle immediately, such as notifications, dark mode, or feature flags.
Prefer `Checkbox` when the control participates in a list of submitted options rather than a direct
on/off setting.

## Current behavior contract

- `Switch` forwards Base UI root behavior and props, including controlled/uncontrolled checked state,
  hidden input form integration, `disabled`, `readOnly`, `required`, `value`, `uncheckedValue`,
  `form`, `inputRef`, `nativeButton`, and `render`.
- `Switch` renders a default `SwitchThumb` when `children` is omitted.
- `size` defaults to `md` and writes `data-size` on the root. Supported values are `xs`, `sm`, `md`,
  `lg`, and `xl`.
- `className` on `Switch` and `SwitchThumb` is merged with moduix classes via `mergeClassName`, so
  Base UI state callback class names continue to work.
- `SwitchField` is a wrapping `<label>` for the common clickable-label layout.
- `SwitchLabel` is a styled `<span>` for label text only. It does not create labeling unless it is
  inside a real label or connected through native label semantics.
- `SwitchField` neutralizes the pointer cursor when the nested switch is `disabled` or `readOnly`.
- Hover styles intentionally do not apply in the `readOnly` state, matching `Checkbox` and `Radio`.
- The default size scaling only applies to the root and the built-in `SwitchThumb`. If you replace
  the thumb with arbitrary children, size-aware visuals become your responsibility.

## Composition

Default labeled switch:

```tsx
import { Switch, SwitchField, SwitchLabel } from 'moduix';

export function SwitchDemo() {
  return (
    <SwitchField>
      <Switch defaultChecked />
      <SwitchLabel>Enable notifications</SwitchLabel>
    </SwitchField>
  );
}
```

Controlled switch:

```tsx
import { Switch, SwitchField, SwitchLabel } from 'moduix';
import { useState } from 'react';

export function ControlledSwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <SwitchField>
      <Switch checked={checked} onCheckedChange={setChecked} />
      <SwitchLabel>{checked ? 'On' : 'Off'}</SwitchLabel>
    </SwitchField>
  );
}
```

Custom thumb content:

```tsx
import { type ComponentProps } from 'react';
import { Switch, SwitchField, SwitchLabel, SwitchThumb } from 'moduix';

function PowerIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M8 2.5V7M5.1 4.3A5 5 0 1 0 10.9 4.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CustomThumbSwitchDemo() {
  return (
    <SwitchField>
      <Switch defaultChecked>
        <SwitchThumb>
          <PowerIcon />
        </SwitchThumb>
      </Switch>
      <SwitchLabel>Use custom thumb content</SwitchLabel>
    </SwitchField>
  );
}
```

Sibling-label pattern with a native button:

```tsx
import { useId } from 'react';
import { Switch } from 'moduix';

export function SiblingLabelSwitchDemo() {
  const id = useId();

  return (
    <div>
      <Switch id={id} nativeButton render={<button />} defaultChecked />
      <label htmlFor={id}>Receive product updates</label>
    </div>
  );
}
```

Field integration:

```tsx
import { Field, FieldDescription, FieldLabel, Switch, SwitchLabel } from 'moduix';

export function NewsletterField() {
  return (
    <Field name="newsletter">
      <FieldLabel>
        <Switch />
        <SwitchLabel>Subscribe to newsletter</SwitchLabel>
      </FieldLabel>
      <FieldDescription>We send updates once per week.</FieldDescription>
    </Field>
  );
}
```

If a native-button switch must stay inside a wrapping label, use the `render` callback so Base UI can
place its hidden input outside the label:

```tsx
import { Switch } from 'moduix';

export function NativeButtonSwitchDemo() {
  return (
    <Switch
      defaultChecked
      nativeButton
      render={(buttonProps) => (
        <label>
          <button {...buttonProps} />
          <span>Enable reminders</span>
        </label>
      )}
    />
  );
}
```

## Exported parts

| Part          | Element/primitive       | Purpose                                                                 |
| ------------- | ----------------------- | ----------------------------------------------------------------------- |
| `Switch`      | `SwitchPrimitive.Root`  | Interactive root, hidden input/form integration, checked state, `size`. |
| `SwitchThumb` | `SwitchPrimitive.Thumb` | Optional thumb part for custom content or thumb-specific styling.       |
| `SwitchField` | `label`                 | Optional inline wrapper that makes the label text clickable.            |
| `SwitchLabel` | `span`                  | Optional text wrapper with switch label typography.                     |

## Public props

`Switch` accepts `SwitchPrimitive.Root.Props` plus:

| Prop   | Type                                   | Default | Notes                                                 |
| ------ | -------------------------------------- | ------- | ----------------------------------------------------- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `md`    | Scales the root and default thumb through CSS values. |

Common forwarded root props:

| Prop              | Notes                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------- |
| `defaultChecked`  | Initial uncontrolled checked state.                                                   |
| `checked`         | Controlled checked state. Use with `onCheckedChange`.                                 |
| `onCheckedChange` | Called by Base UI when the checked state changes.                                     |
| `name`, `value`   | Hidden input form submission props.                                                   |
| `uncheckedValue`  | Value submitted when unchecked, if unchecked submission is needed.                    |
| `disabled`        | Prevents interaction and applies disabled state attributes/styles.                    |
| `readOnly`        | Keeps the current state visible while preventing user changes.                        |
| `required`        | Participates in native/Base UI validation.                                            |
| `form`            | Associates the hidden input with a form rendered elsewhere in the DOM.                |
| `inputRef`        | Ref for the hidden input managed by Base UI.                                          |
| `nativeButton`    | Use with `render={<button />}` for sibling labels or other button-based composition.  |
| `render`          | Base UI element replacement/callback escape hatch.                                    |
| `className`       | Root class name or Base UI state callback class name; merged with moduix root styles. |
| `children`        | Replaces the default `SwitchThumb` composition.                                       |

`SwitchThumb` accepts Base UI thumb props, including `className`, state callback `className`,
`style`, `render`, and `children`.

`SwitchField` and `SwitchLabel` accept native props for their rendered elements.

## Styling API

Public `data-slot` values:

| Part          | `data-slot`    |
| ------------- | -------------- |
| `Switch`      | `switch-root`  |
| `SwitchThumb` | `switch-thumb` |
| `SwitchField` | `switch-field` |
| `SwitchLabel` | `switch-label` |

Important state attributes from Base UI:

- `Switch`: `data-checked`, `data-unchecked`, `data-disabled`, `data-readonly`, `data-required`,
  `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`, `data-focused`, and
  moduix `data-size`.
- `SwitchThumb`: `data-checked`, `data-unchecked`, `data-disabled`, `data-readonly`, `data-required`,
  `data-valid`, `data-invalid`, `data-dirty`, `data-touched`, `data-filled`, and `data-focused`.

Public CSS variables:

| Variable                         | Default fallback                                          | Purpose                              |
| -------------------------------- | --------------------------------------------------------- | ------------------------------------ |
| `--switch-bg`                    | `var(--color-muted)`                                      | Unchecked background.                |
| `--switch-bg-checked`            | `var(--color-primary)`                                    | Checked background.                  |
| `--switch-bg-checked-hover`      | `var(--switch-bg-checked, var(--color-primary))`          | Checked hover background.            |
| `--switch-bg-hover`              | `var(--color-accent)`                                     | Unchecked hover background.          |
| `--switch-border-color`          | `var(--color-border)`                                     | Unchecked border color.              |
| `--switch-border-color-checked`  | `var(--color-primary)`                                    | Checked border color.                |
| `--switch-border-width`          | `var(--border-width-sm)`                                  | Root border width.                   |
| `--switch-disabled-opacity`      | `var(--opacity-disabled)`                                 | Disabled opacity.                    |
| `--switch-focus-ring-color`      | `var(--color-ring)`                                       | Focus ring color.                    |
| `--switch-focus-ring-offset`     | `var(--border-width-sm)`                                  | Focus ring offset.                   |
| `--switch-focus-ring-width`      | `var(--border-width-sm)`                                  | Focus ring width.                    |
| `--switch-gap`                   | `var(--spacing-2)`                                        | Gap between `SwitchField` children.  |
| `--switch-height-xs`             | `1rem`                                                    | Root height for `size="xs"`.         |
| `--switch-height-sm`             | `1.25rem`                                                 | Root height for `size="sm"`.         |
| `--switch-height-md`             | `1.5rem`                                                  | Root height for `size="md"`.         |
| `--switch-height-lg`             | `1.75rem`                                                 | Root height for `size="lg"`.         |
| `--switch-height-xl`             | `2rem`                                                    | Root height for `size="xl"`.         |
| `--switch-label-color`           | `var(--color-foreground)`                                 | `SwitchLabel` text color.            |
| `--switch-label-font-size`       | `var(--text-sm)`                                          | `SwitchLabel` font size.             |
| `--switch-label-font-weight`     | `var(--weight-medium)`                                    | `SwitchLabel` font weight.           |
| `--switch-label-line-height`     | `var(--line-height-text-sm)`                              | `SwitchLabel` line height.           |
| `--switch-padding`               | `0.125rem`                                                | Inner track padding.                 |
| `--switch-radius`                | `var(--radius-full)`                                      | Root border radius.                  |
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
| `--switch-thumb-size-xs`         | `0.625rem`                                                | Thumb size for `size="xs"`.          |
| `--switch-thumb-size-sm`         | `0.875rem`                                                | Thumb size for `size="sm"`.          |
| `--switch-thumb-size-md`         | `1.125rem`                                                | Thumb size for `size="md"`.          |
| `--switch-thumb-size-lg`         | `1.375rem`                                                | Thumb size for `size="lg"`.          |
| `--switch-thumb-size-xl`         | `1.625rem`                                                | Thumb size for `size="xl"`.          |
| `--switch-thumb-transition`      | `var(--switch-transition, var(--transition-default))`     | Thumb movement transition timing.    |
| `--switch-thumb-translate`       | `var(--switch-thumb-translate-default)`                   | Checked thumb translation distance.  |
| `--switch-transition`            | `var(--transition-default)`                               | Root state transition timing.        |
| `--switch-width-xs`              | `1.75rem`                                                 | Root width for `size="xs"`.          |
| `--switch-width-sm`              | `2rem`                                                    | Root width for `size="sm"`.          |
| `--switch-width-md`              | `2.5rem`                                                  | Root width for `size="md"`.          |
| `--switch-width-lg`              | `3rem`                                                    | Root width for `size="lg"`.          |
| `--switch-width-xl`              | `3.5rem`                                                  | Root width for `size="xl"`.          |

Use `className` on the part that owns the visual concern:

- style `Switch` for track shape, color, focus ring, and size-driven states;
- style `SwitchThumb` for thumb content, icon sizing, or thumb-specific animation;
- style `SwitchField` and `SwitchLabel` for layout and text adjustments around the control.

## UX and accessibility

- Every switch needs an accessible name. The recommended default is `SwitchField` + `SwitchLabel`.
- Use `nativeButton render={<button />}` for sibling `label htmlFor` layouts. The default Base UI
  root works best inside wrapping labels.
- Use `readOnly` when the current value should remain visible but must not change. Use `disabled`
  when the control is unavailable.
- `disabled` also disables pointer events on the root, and `SwitchField` removes the pointer cursor
  through `:has()` so the whole labeled row does not look clickable.
- Keyboard interaction, focus management, hidden input behavior, validation state, and ARIA state are
  owned by Base UI and should stay delegated to the primitive.
- Keep thumb content decorative unless it adds meaningful accessible text elsewhere. Icons placed
  inside `SwitchThumb` should usually be `aria-hidden`.

## Intentional differences from Base UI

- moduix exports flat parts (`Switch`, `SwitchThumb`, etc.) instead of the upstream namespaced
  `Switch.Root` / `Switch.Thumb` API.
- Styling is not unstyled: CSS Modules, `data-slot`, `data-size`, and `--switch-*` variables are
  part of the public wrapper contract.
- `Switch` auto-renders a default thumb.
- `size` is a moduix-only convenience prop.
- `SwitchField` and `SwitchLabel` are wrapper-level helper parts for the common labeled-switch layout.
- The local docs describe the moduix wrapper contract, not the full upstream API reference.

## Agent notes

- Keep `Switch`, `Checkbox`, and `Radio` aligned as thin wrappers with explicit parts, one `size`
  prop, default internal visuals, and no slot-prop/class-map customization layer.
- Preserve `mergeClassName` on primitive-backed parts so Base UI state callback class names keep
  working.
- Keep `SwitchThumb` as the only exported visual subpart. Do not add icon props or extra thumb sugar
  unless a repeated moduix use case clearly justifies it.
- If `data-slot` names, CSS variables, stories, docs examples, or recommended label patterns change,
  update this file in the same task.

## Local changelog

- Rewrote the local documentation to describe the actual moduix `Switch` wrapper, exported parts,
  styling contract, accessibility guidance, and current `size`/thumb behavior instead of the upstream
  Base UI API reference.
- Removed hover affordances from the `readOnly` state so the switch matches sibling selection
  controls and looks non-interactive when changes are blocked.