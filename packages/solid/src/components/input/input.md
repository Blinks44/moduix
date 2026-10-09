# Input (Solid)

`Input` is the native Solid wrapper around Ark UI's `FieldInput`. It preserves the React
component's visual sizes, `htmlSize`, data hooks, native input props, and field state.

## Defaults and styling

`Input size="md"` matches the default `FieldInput` appearance. Both use Ark FieldInput directly;
`Input` owns visual sizes, `htmlSize`, and `--moduix-input-*`, while `FieldInput` keeps the
native numeric `size` and `--moduix-field-control-*`. A disabled moduix Field or FieldRootProvider
owns the whole field’s opacity; the input is not dimmed a second time. Standalone disabled inputs
retain their own disabled opacity.

## Solid composition

Solid Ark components use a render-function `asChild` prop:

```tsx
<Input asChild={(props) => <input {...props()} name="repository" placeholder="owner/project" />} />
```

The installed Ark Solid factory removes `ref` from the props passed to an `asChild` render
function. The ordinary ref path and the `asChild` path are therefore supported independently,
matching the native Solid primitive behavior.