# Textarea (Solid)

`Textarea` is the native Solid wrapper around Ark UI's `Field.Textarea`. It preserves the React
component's native textarea props, field state, autoresize behavior, data hooks, and CSS variables.

## Solid composition

Solid Ark components use a render-function `asChild` prop:

```tsx
<Textarea asChild={(props) => <textarea {...props()} name="summary" />} />
```

The installed Ark Solid factory does not forward `ref` through an `asChild` render function. The
ordinary ref path and the `asChild` path are therefore supported independently, matching the native
Solid primitive behavior.