# TagsInput (Solid)

`TagsInput` is the moduix Solid adapter over `@ark-ui/solid/tags-input`. Parts, defaults, the clear
trigger, and styles match the React wrapper; see `packages/react/src/components/tags-input/tags-input.md`.

## Ark Solid behavior

Ark Solid uses a render-function `asChild` prop; spread `props()` onto the host:

```tsx
<TagsInputClearTrigger asChild={(props) => <button {...props()}>Clear all</button>} />
```

The default `TagsInputClearTrigger` uses the same mechanism to render `CloseButton`. The Ark Solid
factory does not forward refs through `asChild`; use the ordinary part path when a ref is required.