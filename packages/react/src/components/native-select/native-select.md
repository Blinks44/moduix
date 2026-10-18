# Native Select

Upstream docs:

- Ark UI Field: https://ark-ui.com/docs/components/field
- Chakra UI: https://chakra-ui.com/docs/components/native-select
- shadcn/ui: https://ui.shadcn.com/docs/components/native-select

`NativeSelect` is a styled native `<select>` for simple option lists that should keep browser
keyboard behavior, autofill, form reset, and platform pickers. It renders Ark `FieldSelect`, so
inside `Field` it gets ids, `aria-describedby`, and the disabled, invalid, and required state.

## Contract

```tsx
import { NativeSelect } from '@moduix/react/native-select';

export function Example() {
  return (
    <NativeSelect defaultValue="" name="framework" aria-label="Framework">
      <option value="" disabled>
        Choose framework
      </option>
      <option value="react">React</option>
      <option value="vue">Vue</option>
    </NativeSelect>
  );
}
```

```text
span[data-slot="native-select-control"]
├─ select[data-scope="field"][data-part="select"][data-slot="native-select-root"]
└─ span[data-slot="native-select-indicator"]  (aria-hidden, ChevronDownIcon)
```

| Export         | `data-slot`          | Notes                                    |
| -------------- | -------------------- | ---------------------------------------- |
| `NativeSelect` | `native-select-root` | The real `<select>`; the ref targets it. |

- All props go to the select unchanged: native `value`, `defaultValue`, `onChange(event)`, `name`,
  `required`, `disabled`, `multiple`, and `size`. No local state or value transformation.
- Children are native `option` and `optgroup` elements.
- `controlProps` go to the outer span. Use it for layout and for `--moduix-select-*` variables that
  must reach the indicator too.
- Ark `asChild` is kept; the child must be a `<select>`.
- Give it a name with `FieldLabel`, a `<label>`, `aria-label`, or `aria-labelledby`. HTML select has
  no `readonly`, so there is no read-only state.

## Styling

- The control reads the same `--moduix-select-*` variables as `Select` (width, height, border,
  radius, colors, focus ring, invalid color, indicator geometry, disabled opacity, transition), so
  both selects look and theme alike.
- Text starts at `--moduix-select-trigger-padding-x-start` (14px). The indicator sits
  `--moduix-select-action-offset-right` from the end, and the text end padding reserves offset,
  indicator size, and the same start padding (46px by default).
- `multiple` or `size > 1` makes a list: content height, platform appearance, no indicator.
- Forced-colors mode restores the platform arrow and hides the indicator.
- Native `size` is not a visual size prop.

## Agent notes

- Keep one `FieldSelect` without local state; do not replace `onChange(event)` with Ark details.
- Keep the control variables aligned with `Select` until Select itself changes them.
- Tailwind decides list mode from props, not attribute selectors: a variant such as
  `[&[multiple]]:h-auto` would beat consumer classes like `h-20`, which `cn` cannot remove.