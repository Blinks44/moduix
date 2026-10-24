# RadioGroup

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/radio-group
- Chakra UI: https://chakra-ui.com/docs/components/radio
- shadcn/ui: https://ui.shadcn.com/docs/components/radio-group

## Purpose

`RadioGroup` lets users choose one value from a visible set of mutually exclusive options.

## Current behavior contract

- The parts are thin Ark wrappers from `@ark-ui/react/radio-group` that add moduix classes and
  stable `data-slot` values. Ark owns state, keyboard navigation, `asChild`, callback details
  (`onValueChange(details)`), and the native inputs.
- `RadioGroup` and `RadioGroupRootProvider` accept Ark props plus the moduix-only
  `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'`. It defaults to `md`, writes `data-size` on the root,
  and sizes every `RadioGroupItemControl` and its checked dot in the group.
- `RadioGroupOption` is the common labelled item: `RadioGroupItem` with
  `RadioGroupItemHiddenInput`, `RadioGroupItemControl`, and `RadioGroupItemText`. It accepts Ark
  item props and `className`, but not `asChild`; use the explicit parts for custom trees.
- Direct `RadioGroupItem` composition must include `RadioGroupItemHiddenInput` for keyboard focus,
  form submission, validation, and reset.
- `RadioGroupItem` renders a `label`. With `asChild`, the direct child must still be a `label`.
- The barrel re-exports `useRadioGroup`, `useRadioGroupContext`, `useRadioGroupItemContext`,
  `RadioGroupContext`, `RadioGroupItemContext`, and `RadioGroupItemHiddenInput` unchanged from Ark.
- Types `RadioGroupRootProps`, `RadioGroupRootProviderProps`, `RadioGroupOptionProps`, and
  `RadioGroupSize` are exported.

## Anatomy and exported parts

```text
RadioGroup[size]
├─ RadioGroupLabel
├─ RadioGroupIndicator (optional)
├─ RadioGroupOption[value]
└─ RadioGroupItem[value]
   ├─ RadioGroupItemControl
   ├─ RadioGroupItemText
   └─ RadioGroupItemHiddenInput (explicit)
```

| Part                     | `data-slot`                 | Notes                                                      |
| ------------------------ | --------------------------- | ---------------------------------------------------------- |
| `RadioGroup`             | `radio-group-root`          | Ark root plus `size`.                                      |
| `RadioGroupRootProvider` | `radio-group-root-provider` | Uses state from `useRadioGroup()`; `size`.                 |
| `RadioGroupLabel`        | `radio-group-label`         | Group label.                                               |
| `RadioGroupItem`         | `radio-group-item`          | Ark item, renders a `label`.                               |
| `RadioGroupOption`       | `radio-group-item`          | Fixed item, control, text, and input.                      |
| `RadioGroupItemControl`  | `radio-group-item-control`  | Circle; the checked dot is its `::before`.                 |
| `RadioGroupItemText`     | `radio-group-item-text`     | Option text.                                               |
| `RadioGroupIndicator`    | `radio-group-indicator`     | Optional highlight measured by Ark under the checked item. |

## Field and Fieldset

`Field` gives a visible label, helper text, and error text only; pass `disabled`, `invalid`,
`readOnly`, and `required` to the group itself. `Fieldset` passes its `disabled` and `invalid`
state to the group.

## Defaults and styling

- Per-size values live in private `--_radio-size` and `--_radio-indicator-size` on the root.
  Public variables: `bg`, `bg-checked` (background and border of a checked control),
  `border-color`, `indicator-color` (checked dot), `gap`, `size`, and `indicator-size`, all with the
  `--moduix-radio-` prefix. `size` and `indicator-size` override every size.
- Focus ring, invalid, hover, transition, disabled opacity, and text styles come from foundation
  tokens; override them with a class over the `moduix.components` layer.
- The root sets the foreground text color; label and item text inherit it.
- The control hover background uses Ark `data-hover`, so it reacts to hovering the whole item.
- An invalid control keeps the destructive border when it is checked.
- `RadioGroupIndicator` is a translucent primary highlight with `--moduix-radius-md` corners. It
  sets Ark `--transition-duration` and `--transition-timing-function` from foundation tokens; Ark
  sets its position inline and the root's `position: relative`.

## Agent notes

- Keep `size` on the root. Do not add per-control or per-option `size` back.
- Keep `RadioGroupOption` as the only sugar; the "Advanced customization" docs example builds the
  item from low-level parts.
- Do not add legacy `Radio`, `RadioField`, `RadioLabel`, or `RadioGroupList` aliases.