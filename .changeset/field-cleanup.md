---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Field: `FieldInput`, `FieldTextarea`, and `FieldSelect` are removed. They were styled copies of `Input`, `Textarea`, and `NativeSelect`, which already read the field context, so put those inside `Field` instead (`FieldInput size` becomes `Input htmlSize`). In Solid this also removes the `defaultValue` shim that only those parts carried.
CSS Modules drop all 38 `--moduix-field-*` variables; styles come from foundation tokens, so override them with a plain class on the part. TagsInput and PasswordInput no longer fall back to `--moduix-field-*` variables. React, Solid, and Vue now re-export the Ark Field part props, context, and hook types.