# Native Select (Solid)

`NativeSelect` is the native Solid wrapper around Ark UI's `FieldSelect`. It preserves native
select values, options, form behavior, field state, styling hooks, and the `NativeSelect.Root`
namespace alias.

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
