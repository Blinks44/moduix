---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
---

Fieldset: CSS Modules drop all 22 `--moduix-fieldset-*` variables; styles come from foundation tokens, so override them with a plain class on the part. The invalid root border is removed in every adapter: it had zero width by default and never showed, so show group errors with `FieldsetErrorText`. Tailwind roots lose the no-op `max-w-none` and `border-transparent` classes, and the legend drops `inline-block`. React and Solid now re-export the Ark Fieldset part props, context, and hook types, as Vue already did.