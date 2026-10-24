# Fieldset (Vue)

[Ark Fieldset](https://ark-ui.com/docs/components/fieldset).

## Public contract

`Fieldset`, `FieldsetRootProvider`, `FieldsetLegend`, `FieldsetHelperText`, and `FieldsetErrorText`
wrap the Ark parts with a class and a `data-slot`. `useFieldset` feeds `FieldsetRootProvider`;
`FieldsetContext` and `useFieldsetContext` read the state in a descendant. The barrel re-exports the
Ark prop, context, and hook types.

## Preservation notes

Keep native refs through `$el`, `asChild` without duplicate hosts, and generated ids across SSR
hydration.

## Styling

CSS Modules have no `--moduix-fieldset-*` variables; Tailwind uses utilities and consumer `class`.
The root resets native fieldset chrome, draws no border when invalid, and dims once when disabled.
Behavior is identical between the two Vue styling adapters.