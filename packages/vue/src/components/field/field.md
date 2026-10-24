# Field

## Upstream reference

[Ark Field](https://ark-ui.com/docs/components/field) and
[Vue defaults/reset guidance](https://github.com/chakra-ui/ark/issues/4117#issuecomment-5857099485).

## Public contract

`Field` associates one control with `FieldLabel`, `FieldHelperText`, and `FieldErrorText`.
`FieldItem` selects the root's `target` control; `FieldRootProvider` accepts a `useField()` store.
`FieldContext` and `useFieldContext` expose the native Ark context, and the barrel re-exports the
Ark prop, context, and hook types.

`Field` renders no control of its own; use `Input`, `Textarea`, `NativeSelect`, or another moduix
control inside it. Those controls preserve native Ark props, `v-model`, events, and `asChild`.

Initialize Vue models in the parent. A native form reset does not emit input/change events: reset
the bound refs in the form's reset handler. Ark Vue 5.39.3 binds `value` even when `modelValue` is
absent, clearing an input's `defaultValue` and a select's initial option, so use `v-model`.

## Preservation notes

Keep native refs through `$el`, field state, and label wiring. Helper/error IDs belong to the
control's `aria-describedby`. Field state and `data-slot` hooks must survive ordinary and
`asChild` composition without duplicate hosts, and SSR hydration must keep generated ids.

## Styling

CSS Modules have no `--moduix-field-*` variables; Tailwind uses utilities and consumer `class`.
Disabled Field roots dim the whole field once. Behavior is identical between the two Vue styling
adapters.