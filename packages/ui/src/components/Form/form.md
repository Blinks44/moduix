# Form

`Form` is a thin wrapper over the Base UI `Form` primitive.

It keeps native form semantics intact, adds the library root styling hooks, and leaves validation,
field composition, and submit flow in consumer code.

Use it with `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `Input`, and submit controls.

Recommended usage:

- use `onFormSubmit` when object-shaped form values are more convenient than reading `FormData`
- use native `onSubmit` when you need the raw submit event or direct `FormData` access
- use `errors` to surface server or action validation
- use `actionsRef` when another control needs to trigger validation imperatively

Public styling hooks on the root:

- `className`
- `data-slot="form-root"`
- `--form-gap`
- `--form-width`
- `--form-max-width`