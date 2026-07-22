# RadioGroup

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/radio-group
- Chakra UI: https://chakra-ui.com/docs/components/radio-card

## Purpose

`RadioGroup` lets users choose one value from a visible set of mutually exclusive options.

## Upstream model to preserve

The component follows Ark UI's `@ark-ui/react/radio-group` primitive. Keep the Ark anatomy, state
shape, callback detail objects, `RootProvider`, `asChild` behavior, and the native form input form
integration intact. `useRadioGroup` is re-exported from moduix for the normal `RootProvider` path;
direct Ark imports remain escape hatches.

## Current behavior contract

`RadioGroup` is the root component and also exposes `RadioGroup.Root` for namespace consistency.
The public parts are thin Ark wrappers that add moduix CSS Modules, stable `data-slot` values, and
two small conveniences: `RadioGroup.ItemControl size="xs" | "sm" | "md" | "lg" | "xl"` and
`RadioGroup.Option`, which combines one item, control, and text. The item renders the native form input automatically.

`RadioGroup.Root` forwards Ark props such as `value`, `defaultValue`, `onValueChange(details)`,
`name`, `form`, `orientation`, `disabled`, `invalid`, `readOnly`, `required`, `ids`, and `asChild`.
Do not unpack or remap `onValueChange`; consumers should read `details.value`.

## Anatomy and exported parts

```tsx
<RadioGroup.Root>
  <RadioGroup.Label />
  <RadioGroup.Option value="react">React</RadioGroup.Option>
  <RadioGroup.Item>
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText />
  </RadioGroup.Item>
  <RadioGroup.Indicator />
</RadioGroup.Root>
```

| Part                      | `data-slot`                 | Notes                                     |
| ------------------------- | --------------------------- | ----------------------------------------- |
| `RadioGroup` / `Root`     | `radio-group-root`          | Ark root, value state, orientation, form. |
| `RadioGroup.RootProvider` | `radio-group-root-provider` | Uses state from Ark `useRadioGroup()`.    |
| `RadioGroup.Label`        | `radio-group-label`         | Ark group label.                          |
| `RadioGroup.Item`         | `radio-group-item`          | Ark item, renders a `label` by default.   |
| `RadioGroup.Option`       | `radio-group-item`          | Styled convenience item; no new DOM part. |
| `RadioGroup.ItemControl`  | `radio-group-item-control`  | Visual control; accepts moduix `size`.    |
| `RadioGroup.ItemText`     | `radio-group-item-text`     | Ark item label text.                      |
| `RadioGroup.Indicator`    | `radio-group-indicator`     | Optional Ark active-item indicator.       |

## Composition

```tsx
import { RadioGroup } from '@moduix/react';

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {['React', 'Solid', 'Vue'].map((framework) => (
        <RadioGroup.Option key={framework} value={framework}>
          {framework}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}
```

Use `RadioGroup.RootProvider` with `useRadioGroup()` from `@moduix/react` when state must be
controlled from outside the rendered tree. Do not render `Root` and `RootProvider` for the same
state instance. Use the explicit `Item` tree for `asChild` or when nested parts need individual
placement or class names.

## Upstream feature coverage

- Basic, initial value, controlled, disabled, orientation, root provider, field, and fieldset
  examples are supported through the same Ark parts and props.
- `Field.Root` and `Fieldset.Root` propagate form state to the group. Keep the visible field label,
  helper text, and error text adjacent to the group; every `Item` renders its native form input
  automatically.
- `asChild` is supported on Ark parts. `RadioGroup.Item` renders a `label` by default; when
  `asChild` is used, the direct child must still be a semantic `label`.
- Each `RadioGroup.Item` renders its native form input automatically for submission, validation, and reset.
- `ids` is forwarded from `Root`/`RootProvider` for explicit accessibility composition.
- Item, item-control, and item-text expose Ark item state attributes, including
  `data-state`, `data-disabled`, `data-readonly`, `data-invalid`, `data-focus`,
  `data-focus-visible`, and `data-hover`; item-control also exposes `data-active`.
- `Indicator` preserves Ark CSS variables: `--transition-property`, `--left`, `--top`, `--width`,
  and `--height`.

## Accessibility and state

Ark owns the WAI-ARIA radio group behavior, roving focus, keyboard navigation, controlled and
uncontrolled state, disabled/read-only/invalid/required propagation, and hidden input behavior.
Preserve Ark data attributes such as `data-scope="radio-group"`, `data-part`, `data-state`,
`data-orientation`, `data-disabled`, `data-readonly`, `data-invalid`, `data-required`,
`data-focus`, `data-focus-visible`, `data-hover`, and `data-active`.

`Root`, `RootProvider`, `Label`, `Item`, `ItemControl`, `ItemText`, and `Indicator` forward refs
to their public Ark DOM parts. The internal native input is not a separate ref target.

## Defaults and styling

The CSS uses Ark state attributes and moduix `--moduix-radio-*` variables. Public selectors should target
the exported part class, `data-slot`, or Ark attributes rather than old legacy state attributes.

The root lays items out vertically by default. For horizontal groups, use `orientation="horizontal"`
and provide an inline item wrapper when you need custom row wrapping. `ItemControl` writes
`data-size` for the moduix size token mapping. `Option` applies its `className` to the underlying
`Item`; target nested `data-slot` values from that class when custom styling needs individual parts.

## Intentional sugar and differences from upstream

- The component is named `radio-group` and exports only the Ark-shaped namespace; old `Radio`,
  `RadioField`, `RadioLabel`, `RadioGroupLabel`, and `RadioGroupList` aliases are removed.
- `ItemControl` accepts a moduix-only `size` prop for control diameter and indicator-dot scale.
- `Option` is a fixed labelled-item shortcut. It accepts the Ark item props, `size`, and `className`,
  but intentionally does not accept `asChild` or nested prop bags; use the explicit parts instead.
- The default checked visual is CSS on `ItemControl::before`, not an extra public icon part.
- legacy `render`, `nativeButton`, `inputRef`, and legacy callback signatures are not supported.
  Use Ark `asChild`, Ark refs, and `onValueChange(details)` instead.

## Agent notes

- Every `RadioGroup.Item`, including the item used by `RadioGroup.Option`, renders its native form input automatically.
- Keep `RootProvider` and its `useRadioGroup` companion available from the moduix barrel. Ark
  contexts and less common hooks remain direct-import escape hatches.
- When changing the public namespace, sync stories, docs examples, registry paths, and generated
  registry output in the same task.
- Do not reintroduce flat aliases just for backwards compatibility.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-13: Native form controls are now rendered automatically; the former public form-control part was removed.

- 2026-07-11: Added `Option` for the common labelled-item path, re-exported `useRadioGroup` for
  `RootProvider`, and documented `Field.Root` integration plus the explicit advanced composition.
- 2026-07-03: Simplified the public surface to the callable root, `RootProvider`, visual parts, and
  the `ItemControl` size sugar. Advanced Ark hooks and context access now come directly from
  `@ark-ui/react/radio-group`.
- 2026-06-19: Migrated from legacy `radio`/`radio-group` wrappers to Ark UI `radio-group`,
  renamed the component surface to `radio-group`, removed legacy aliases and render contracts, and
  documented the Ark-aligned namespace API.
- 2026-06-27: Re-audited the Ark UI migration, verified the runtime Ark data attributes, and
  aligned docs around the short `<RadioGroup>` root form.