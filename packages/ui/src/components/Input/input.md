# Input

`Input` is a thin styled wrapper over Base UI `Input`.

## Parts

- `Input` renders the native input element and keeps `data-slot="input-root"` as the styling hook.

## Props

- All Base UI `Input` props pass through directly.
- `size`: `xs` | `sm` | `md` | `lg` | `xl` (default: `md`) controls the visual scale.
- `htmlSize`: native `input[size]` attribute when it is needed alongside the visual `size` prop.
- `className`: direct styling entry point for the root element.

## Behavior

- Works on its own or inside `Field` for labels, descriptions, and validation.
- Keeps Base UI controlled and uncontrolled input behavior.
- Forwards its ref to the native `<input>`.

## Styling

- Base UI state attributes such as `data-invalid`, `data-focused`, and `data-filled` remain
  available on the root element.
- The component exposes `--input-*` CSS variables in `src/styles/theme.css` for consumer overrides.
- `size` maps to `data-size` on the root for the built-in size presets.