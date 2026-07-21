# Native Select

## Upstream docs

- Ark UI Field: https://ark-ui.com/docs/components/field
- Chakra UI Native Select: https://chakra-ui.com/docs/components/native-select

## Purpose

`NativeSelect` is a styled native `<select>` for simple option lists that should preserve browser
keyboard behavior, autofill, form reset, and platform pickers.

## Upstream model to preserve

`NativeSelect` wraps Ark `Field.Select` directly. The rendered select remains the form control and
inherits disabled, invalid, required, ids, and description relationships from `Field.Root`.
Chakra's Native Select informs the visual relationship with the custom `Select`, but moduix keeps a
single-component public API.

## Current behavior contract

- `NativeSelect` and `NativeSelect.Root` reference the same native select component.
- `controlProps` target the outer layout span; use its `className` or `style` for styling that must
  reach both the select and indicator.
- Native `value`, `defaultValue`, `onChange(event)`, `name`, `required`, `disabled`, `multiple`, and
  `size` props pass through unchanged.
- `multiple` and native `size` values greater than one switch the fixed control height to an
  intrinsic list height.
- Children are native `option` and `optgroup` elements.
- The component adds no local state, collection model, popup, or value transformation.
- The shared `ChevronDownIcon` is shown for collapsed single-select controls and removed for
  native list controls.
- Styling reuses the control variables from `Select`.

## Anatomy and exported parts

```text
NativeSelect / NativeSelect.Root
└─ span[data-scope="native-select"][data-part="control"][data-slot="native-select-control"]
   ├─ select[data-scope="field"][data-part="select"][data-slot="native-select-root"]
   │  ├─ option
   │  └─ optgroup
   └─ span[data-scope="native-select"][data-part="indicator"][data-slot="native-select-indicator"]
      └─ ChevronDownIcon
```

| Export                               | `data-slot`          | Notes                       |
| ------------------------------------ | -------------------- | --------------------------- |
| `NativeSelect` / `NativeSelect.Root` | `native-select-root` | The real native `<select>`. |

## Composition

```tsx
import { NativeSelect } from '@moduix/react';

export function Example() {
  return (
    <NativeSelect defaultValue="" name="framework">
      <option value="" disabled>
        Choose framework
      </option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </NativeSelect>
  );
}
```

Compose it inside `Field.Root` when the control needs a visible label, helper text, error text, or
shared invalid/disabled/required state.

## Upstream feature coverage

- Ark `Field.Select`: preserved as the rendered control.
- Native form submission, autofill, reset, keyboard behavior, and platform picker: preserved.
- Field context state and accessible description ids: preserved.
- Chakra multipart API: intentionally reduced to one public component.
- Ark custom Select collections, popup positioning, item parts, and context hooks: not applicable.

## Accessibility and state

- The forwarded ref targets the real `HTMLSelectElement`.
- Use `Field.Label`, a native `<label>`, `aria-label`, or `aria-labelledby` for an accessible name.
- `Field.Root` supplies ids, `aria-describedby`, `aria-invalid`, and native state props.
- Native options, selection events, required validation, and disabled behavior remain unchanged.
- The component does not implement read-only behavior because HTML select has no `readonly`
  attribute.

## Defaults and styling

The single-select control defaults to `--size-md`; multi-select controls retain their content-driven height.

- The default control width, height, border, radius, colors, focus ring, disabled opacity, and hover
  background use the same `--select-*` variables as `Select`.
- Default control padding and indicator geometry use the shared 4px spacing scale.
- `className` is merged onto the native select. `controlProps.className` and `controlProps.style`
  target the outer layout span, so CSS variables there also reach the indicator.
- Stable hooks are `data-slot="native-select-control"`, `data-slot="native-select-root"`, and
  `data-slot="native-select-indicator"`.
- Native `size` is not repurposed as a visual size prop.
- `ChevronDownIcon` aligns the collapsed control with `Select`; the browser owns the popup
  appearance.
- Forced-colors mode restores the platform indicator.

## Intentional sugar and differences from upstream

- moduix exports the direct `<NativeSelect>` form and an equivalent `NativeSelect.Root` alias.
- `controlProps` is narrow styling sugar for the outer layout span; it does not alter native select
  behavior.
- The indicator is visual only and does not alter native select behavior.
- Unlike custom `Select`, values and changes use native strings and `ChangeEvent`.

## Agent notes

- Keep one real `Field.Select` without local state.
- Do not replace native `onChange(event)` with Ark detail objects.
- Keep visual control variables aligned with `Select`.
- Keep the indicator inside the shared `--select-action-*` spacing contract.
- Do not overload native `size`; add no visual size API without a distinct prop name.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Reduced the default single-select control to `--size-md`.

- 2026-07-20: Removed the native field hover surface and aligned the decorative indicator's spacing and local hover treatment with `Select`; platform interaction stays on the native select.
- 2026-06-30: Added the native select wrapper with Field integration, shared Select control styles,
  the shared `ChevronDownIcon`, and token-based indicator spacing.
- 2026-07-10: Added `controlProps` for styling the shared select-and-indicator layout and documented
  accessible basic usage.