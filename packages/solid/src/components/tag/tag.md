# Tag (Solid)

`Tag` is the moduix Solid compact token built on the Ark Solid factory. Parts, defaults, close
trigger naming, and styles match the React wrapper; see `packages/react/src/components/tag/tag.md`.

## Ark Solid behavior

Ark Solid uses a render-function `asChild` prop:

```tsx
<Tag
  asChild={(props) => (
    <button {...props()} type="button">
      <TagLabel>Open filter</TagLabel>
    </button>
  )}
  variant="outline"
/>
```

The Ark Solid factory does not forward refs through `asChild`; ordinary refs and custom-host
composition are separate supported paths.