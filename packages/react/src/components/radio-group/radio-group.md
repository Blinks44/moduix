# RadioGroup

Upstream docs:

- Ark UI: https://ark-ui.com/react/docs/components/radio-group (accessed 2026-08-12)
- Chakra UI: https://chakra-ui.com/docs/components/radio (accessed 2026-08-12)
- shadcn/ui: https://ui.shadcn.com/docs/components/radio-group (accessed 2026-08-12)

## Purpose

`RadioGroup` lets users choose one value from a visible set of mutually exclusive options.

## Upstream model to preserve

The component follows Ark UI's `@ark-ui/react/radio-group` primitive. Keep the Ark anatomy, state
shape, callback detail objects, `RadioGroupRootProvider`, `asChild` behavior, and the native form input
integration intact. `useRadioGroup` is re-exported from moduix for the normal `RadioGroupRootProvider` path;
direct Ark imports remain escape hatches.

## Current behavior contract

`RadioGroup` is the root component. The public parts are thin Ark wrappers that add moduix CSS Modules, stable
`data-slot` values, and
two small conveniences: `RadioGroupItemControl size="xs" | "sm" | "md" | "lg" | "xl"` and
`RadioGroupOption`, which combines one item, control, text, and Ark's native input. When composing
`RadioGroupItem` directly, add `RadioGroupItemHiddenInput` explicitly.

`RadioGroup` forwards Ark props such as `value`, `defaultValue`, `onValueChange(details)`,
`name`, `form`, `orientation`, `disabled`, `invalid`, `readOnly`, `required`, `ids`, and `asChild`.
Do not unpack or remap `onValueChange`; consumers should read `details.value`.

## Anatomy and exported parts

```tsx
<RadioGroup>
  <RadioGroupLabel />
  <RadioGroupOption value="react">React</RadioGroupOption>
  <RadioGroupItem>
    <RadioGroupItemControl />
    <RadioGroupItemText />
  </RadioGroupItem>
  <RadioGroupIndicator />
</RadioGroup>
```

| Part                     | `data-slot`                 | Notes                                     |
| ------------------------ | --------------------------- | ----------------------------------------- |
| `RadioGroup`             | `radio-group-root`          | Ark root, value state, orientation, form. |
| `RadioGroupRootProvider` | `radio-group-root-provider` | Uses state from Ark `useRadioGroup()`.    |
| `RadioGroupLabel`        | `radio-group-label`         | Ark group label.                          |
| `RadioGroupItem`         | `radio-group-item`          | Ark item, renders a `label` by default.   |
| `RadioGroupOption`       | `radio-group-item`          | Styled convenience item; no new DOM part. |
| `RadioGroupItemControl`  | `radio-group-item-control`  | Visual control; accepts moduix `size`.    |
| `RadioGroupItemText`     | `radio-group-item-text`     | Ark item label text.                      |
| `RadioGroupIndicator`    | `radio-group-indicator`     | Optional Ark active-item indicator.       |

## Composition

```tsx
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/react/radio-group';

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroupLabel>Framework</RadioGroupLabel>
      {['React', 'Solid', 'Vue'].map((framework) => (
        <RadioGroupOption key={framework} value={framework}>
          {framework}
        </RadioGroupOption>
      ))}
    </RadioGroup>
  );
}
```

Use `RadioGroupRootProvider` with `useRadioGroup()` from `@moduix/react` when state must be
controlled from outside the rendered tree. Do not render `RadioGroup` and `RadioGroupRootProvider` for the same
state instance. Use the explicit `RadioGroupItem` tree for `asChild` or when nested parts need individual
placement or class names.

## Upstream feature coverage

- Basic, initial value, controlled, disabled, orientation, root provider, field, and fieldset
  examples are supported through the same Ark parts and props.
- `Field` provides visible field context only; pass `disabled`, `invalid`, `readOnly`, and
  `required` directly to the group. `Fieldset` passes its Ark `disabled` and `invalid` state
  to the group. Keep visible field labels, helper text, and error text adjacent to the group; every
  `RadioGroupOption` includes its native input; direct `RadioGroupItem` composition requires
  `RadioGroupItemHiddenInput`.
- `asChild` is supported on Ark parts. `RadioGroupItem` renders a `label` by default; when
  `asChild` is used, the direct child must still be a semantic `label`.
- Compose `RadioGroupItemHiddenInput` inside each direct `RadioGroupItem` for submission, validation, and reset.
- `ids` is forwarded from `RadioGroup`/`RadioGroupRootProvider` for explicit accessibility composition.
- Item, item-control, and item-text expose Ark item state attributes, including
  `data-state`, `data-disabled`, `data-readonly`, `data-invalid`, `data-focus`,
  `data-focus-visible`, and `data-hover`; item-control also exposes `data-active`.
- `RadioGroupIndicator` preserves Ark CSS variables: `--transition-property`, `--left`, `--top`, `--width`,
  and `--height`.

## Accessibility and state

Ark owns the WAI-ARIA radio group behavior, roving focus, keyboard navigation, controlled and
uncontrolled state, and hidden input behavior. Root props control disabled, read-only, invalid, and
required state; `Fieldset` also supplies disabled and invalid state.
Preserve Ark data attributes such as `data-scope="radio-group"`, `data-part`, `data-state`,
`data-orientation`, `data-disabled`, `data-readonly`, `data-invalid`, `data-required`,
`data-focus`, `data-focus-visible`, `data-hover`, and `data-active`.

`RadioGroup`, `RadioGroupRootProvider`, `RadioGroupLabel`, `RadioGroupItem`,
`RadioGroupItemControl`, `RadioGroupItemText`, and `RadioGroupIndicator` forward refs to their
public Ark DOM parts. `RadioGroupItemHiddenInput` forwards its own native-input ref.

## Defaults and styling

The CSS uses Ark state attributes and moduix `--moduix-radio-*` variables. Public selectors should target
the exported part class, `data-slot`, or Ark attributes rather than old legacy state attributes.

The root lays items out vertically by default. For horizontal groups, use `orientation="horizontal"`
and provide an inline item wrapper when you need custom row wrapping. `RadioGroupItemControl` writes
`data-size` for the moduix size token mapping. `RadioGroupOption` applies its `className` to the underlying
`RadioGroupItem`; target nested `data-slot` values from that class when custom styling needs individual parts.

## Intentional sugar and differences from upstream

- The component is named `radio-group` and exports the Ark-shaped parts as flat values; old `Radio`,
  `RadioField`, `RadioLabel`, and `RadioGroupList` aliases are removed.
- `RadioGroupItemControl` accepts a moduix-only `size` prop for control diameter and indicator-dot scale.
- `RadioGroupOption` is a fixed labelled-item shortcut. It accepts the Ark item props, `size`, and `className`,
  but intentionally does not accept `asChild` or nested prop bags; use the explicit parts instead.
- The default checked visual is CSS on `RadioGroupItemControl::before`, not an extra public icon part.
- legacy `render`, `nativeButton`, `inputRef`, and legacy callback signatures are not supported.
  Use Ark `asChild`, Ark refs, and `onValueChange(details)` instead.

## Agent notes

- `RadioGroupOption` includes `RadioGroupItemHiddenInput` in its fixed composition; custom item trees add it explicitly.
- Keep `RadioGroupRootProvider`, `useRadioGroup`, `useRadioGroupContext`, and `useRadioGroupItemContext`
  available from the moduix barrel. Other Ark APIs remain direct-import escape hatches.
- When changing the public namespace, sync stories, docs examples, registry paths, and generated
  registry output in the same task.
- Do not reintroduce flat aliases just for backwards compatibility.

## Local changelog

- 2026-08-12: Made item-label text inherit `--moduix-radio-group-color` unless its own color is
  overridden. Added regression coverage for public refs and slots plus disabled, read-only, invalid,
  and required semantics.

- 2026-09-04: Exposed Ark `RadioGroupItemHiddenInput` for explicit custom item composition.
- 2026-07-30: Added invalid control styling and focused regression coverage for native
  inputs, keyboard navigation, `asChild`, invalid state, and `RadioGroupRootProvider`. Clarified `Field`
  versus `Fieldset` state integration.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-13: Native form controls were rendered automatically at this point in the wrapper history.

- 2026-07-11: Added `RadioGroupOption` for the common labelled-item path, re-exported `useRadioGroup` for
  `RadioGroupRootProvider`, and documented `Field` integration plus the explicit advanced composition.
- 2026-07-03: Simplified the public surface to the callable root, `RadioGroupRootProvider`, visual parts, and
  the `RadioGroupItemControl` size sugar. Advanced Ark hooks and context access now come directly from
  `@ark-ui/react/radio-group`.
- 2026-06-19: Migrated from legacy `radio`/`radio-group` wrappers to Ark UI `radio-group`,
  renamed the component surface to `radio-group`, removed legacy aliases and render contracts, and
  documented the Ark-aligned namespace API.
- 2026-06-27: Re-audited the Ark UI migration, verified the runtime Ark data attributes, and
  aligned docs around the short `<RadioGroup>` root form.