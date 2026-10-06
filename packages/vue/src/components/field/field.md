# Field

## Upstream reference

[Ark Field](https://ark-ui.com/docs/components/field) and
[Vue defaults/reset guidance](https://github.com/chakra-ui/ark/issues/4117#issuecomment-5857099485).

## Public contract

`Field` associates one control with `FieldLabel`, `FieldHelperText`, and `FieldErrorText`.
`FieldItem` selects the root's `target` control; `FieldRootProvider` accepts a `useField()` store.
`FieldContext` and `useFieldContext` expose the native Ark context.

`FieldInput`, `FieldTextarea`, and `FieldSelect` preserve native Ark props, `v-model`, events,
and `asChild`. The wrappers own only styling and `data-slot` hooks. `FieldInput.size` is the native
numeric HTML attribute, not the visual size variant of `Input`.

Initialize Vue models in the parent. A native form reset does not emit input/change events:
reset the bound refs in the form's reset handler. No local default/reset state is maintained.
There is no React-like `defaultValue` prop on the Vue Field wrappers.

## Preservation notes

Keep native refs through `$el`, controlled updates, form submission, field state, and label wiring.
Helper/error IDs belong to the control's `aria-describedby`. Field state and `data-slot` hooks
must survive ordinary and `asChild` composition without duplicate events or hosts.

Ark Vue 5.39.3 binds `value` even when `modelValue` is absent, clearing input `defaultValue`
and select's initial selected option. Plain HTML controls preserve those defaults. The native
uncontrolled regression remains skipped pending an upstream fix; the supported initialized
`v-model` path, parent-owned reset, SSR, and hydration remain actively tested.

## Styling

CSS Modules exposes `--moduix-field-control-*`; Tailwind uses utilities and consumer `class`.
`FieldInput` matches the default `Input size="md"` appearance. Disabled Field roots dim the
whole field once. Behavior is identical between the two Vue styling adapters.

## Changelog

- 2026-10-06: Removed the nonfunctional React-like defaultValue prop and redundant native prop
  forwarding; control props and events now follow Ark Vue directly.