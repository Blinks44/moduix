# RadioGroup

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/radio-group
- Chakra UI: https://chakra-ui.com/docs/components/radio-card

## Purpose

`RadioGroup` lets users choose one value from a visible set of mutually exclusive options.

## Upstream model to preserve

The component follows Ark UI's `@ark-ui/react/radio-group` primitive. Keep the Ark anatomy, state
shape, callback detail objects, `RootProvider`, `asChild` behavior, and `ItemHiddenInput` form
integration intact. Advanced Ark hooks and context access stay available directly from
`@ark-ui/react/radio-group`.

## Current behavior contract

`RadioGroup` is the root component and also exposes `RadioGroup.Root` for namespace consistency.
The public parts are thin Ark wrappers that add moduix CSS Modules, stable `data-slot` values, and
one small styling convenience: `RadioGroup.ItemControl size="xs" | "sm" | "md" | "lg" | "xl"`.

`RadioGroup.Root` forwards Ark props such as `value`, `defaultValue`, `onValueChange(details)`,
`name`, `form`, `orientation`, `disabled`, `invalid`, `readOnly`, `required`, `ids`, and `asChild`.
Do not unpack or remap `onValueChange`; consumers should read `details.value`.

## Anatomy and exported parts

```tsx
<RadioGroup.Root>
  <RadioGroup.Label />
  <RadioGroup.Item>
    <RadioGroup.ItemControl />
    <RadioGroup.ItemText />
    <RadioGroup.ItemHiddenInput />
  </RadioGroup.Item>
  <RadioGroup.Indicator />
</RadioGroup.Root>
```

| Part                         | `data-slot`                     | Notes                                     |
| ---------------------------- | ------------------------------- | ----------------------------------------- |
| `RadioGroup` / `Root`        | `radio-group-root`              | Ark root, value state, orientation, form. |
| `RadioGroup.RootProvider`    | `radio-group-root-provider`     | Uses state from Ark `useRadioGroup()`.    |
| `RadioGroup.Label`           | `radio-group-label`             | Ark group label.                          |
| `RadioGroup.Item`            | `radio-group-item`              | Ark item, renders a `label` by default.   |
| `RadioGroup.ItemControl`     | `radio-group-item-control`      | Visual control; accepts moduix `size`.    |
| `RadioGroup.ItemText`        | `radio-group-item-text`         | Ark item label text.                      |
| `RadioGroup.ItemHiddenInput` | `radio-group-item-hidden-input` | Required for native forms and reset.      |
| `RadioGroup.Indicator`       | `radio-group-indicator`         | Optional Ark active-item indicator.       |

## Composition

```tsx
import { RadioGroup } from '@moduix/react';

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="React">
      <RadioGroup.Label>Framework</RadioGroup.Label>
      {['React', 'Solid', 'Vue'].map((framework) => (
        <RadioGroup.Item key={framework} value={framework}>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      ))}
    </RadioGroup>
  );
}
```

Use `RadioGroup.RootProvider` with Ark `useRadioGroup()` when state must be controlled from outside
the rendered tree. Do not render `Root` and `RootProvider` for the same state instance.

## Upstream feature coverage

- Basic, initial value, controlled, disabled, orientation, root provider, and fieldset examples are
  supported through the same Ark parts and props.
- `asChild` is supported on Ark parts. `RadioGroup.Item` renders a `label` by default; when
  `asChild` is used, the direct child must still be a semantic `label`.
- `ItemHiddenInput` is exposed and should be rendered in each item that participates in form
  submission, validation, or native reset.
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

`ItemHiddenInput` forwards its ref to the real input. `Root`, `RootProvider`, `Label`, `Item`,
`ItemControl`, `ItemText`, and `Indicator` forward refs to their Ark DOM parts.

## Defaults and styling

The CSS uses Ark state attributes and moduix `--radio-*` variables. Public selectors should target
the exported part class, `data-slot`, or Ark attributes rather than old legacy state attributes.

The root lays items out vertically by default. For horizontal groups, use `orientation="horizontal"`
and provide an inline item wrapper when you need custom row wrapping. `ItemControl` writes
`data-size` for the moduix size token mapping.

## Intentional sugar and differences from upstream

- The component is named `radio-group` and exports only the Ark-shaped namespace; old `Radio`,
  `RadioField`, `RadioLabel`, `RadioGroupLabel`, and `RadioGroupList` aliases are removed.
- `ItemControl` accepts a moduix-only `size` prop for control diameter and indicator-dot scale.
- The default checked visual is CSS on `ItemControl::before`, not an extra public icon part.
- legacy `render`, `nativeButton`, `inputRef`, and legacy callback signatures are not supported.
  Use Ark `asChild`, Ark refs, and `onValueChange(details)` instead.

## Agent notes

- Keep `ItemHiddenInput` in examples unless the item is explicitly non-form-only and that exception
  is documented.
- Keep `RootProvider`, but do not re-export Ark hooks, contexts, or duplicate Ark type aliases
  from the moduix barrel.
- When changing the public namespace, sync stories, docs examples, registry paths, and generated
  registry output in the same task.
- Do not reintroduce flat aliases just for backwards compatibility.

## Local changelog

- 2026-07-03: Simplified the public surface to the callable root, `RootProvider`, visual parts, and
  the `ItemControl` size sugar. Advanced Ark hooks and context access now come directly from
  `@ark-ui/react/radio-group`.
- 2026-06-19: Migrated from legacy `radio`/`radio-group` wrappers to Ark UI `radio-group`,
  renamed the component surface to `radio-group`, removed legacy aliases and render contracts, and
  documented the Ark-aligned namespace API.
- 2026-06-27: Re-audited the Ark UI migration, verified the runtime Ark data attributes, and
  aligned docs around the short `<RadioGroup>` root form.