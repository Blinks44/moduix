# Textarea (Solid)

`Textarea` is the native Solid wrapper around Ark UI's `FieldTextarea`. It keeps the React
contract (see `packages/react/src/components/textarea/textarea.md`): native textarea props, field
state, `autoresize`, `size`, data hooks, the two CSS variables, and the `TextareaRootProps` and
`TextareaSize` types.

## Solid composition

Solid Ark components use a render-function `asChild` prop:

```tsx
<Textarea asChild={(props) => <textarea {...props()} name="summary" />} />
```

The installed Ark Solid factory does not forward `ref` through an `asChild` render function. The
ordinary ref path and the `asChild` path are therefore supported independently, matching the native
Solid primitive behavior.

## `defaultValue`

Solid renders an unknown `defaultValue` prop as an attribute, which a native `<textarea>` ignores.
The wrapper sets it as the `defaultValue` DOM property through `prop:defaultValue`, which works on
the ordinary and `asChild` paths and keeps native form reset.