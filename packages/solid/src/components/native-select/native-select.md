# Native Select (Solid)

`NativeSelect` is the native Solid wrapper around Ark UI's `FieldSelect`. It preserves native
select values, options, form behavior, field state, and styling hooks. Its public API consists of
the single `NativeSelect` root value.

## Solid composition

Ark Solid uses a render-function `asChild` prop:

```tsx
<NativeSelect
  asChild={(props) => (
    <select {...props()} aria-label="Framework">
      <option value="react">React</option>
    </select>
  )}
/>
```

The installed Ark Solid factory does not forward `ref` through `asChild`. The ordinary ref path and
the `asChild` path are therefore supported independently, matching the native Solid primitive.
