# Empty (Solid)

Shared contract: [`packages/react/src/components/empty/empty.md`](../../../../react/src/components/empty/empty.md).
This file lists only Solid differences.

## Upstream reference

Ark UI has no Empty primitive. The parts use the Ark Solid factory:
https://ark-ui.com/docs/guides/composition#the-ark-factory

## Solid specifics

- Use `class` instead of `className`; each part splits `class` from the forwarded props.
- `asChild` takes a render function:

```tsx
<EmptyTitle asChild={(props) => <h2 {...props()}>No saved places</h2>} />
```

- Ordinary parts forward Solid refs to the native element. Ark Solid does not forward a ref through
  an `asChild` render function.