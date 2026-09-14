# List (Solid)

## Upstream reference

Ark UI has no dedicated visual list primitive. This component uses the Ark Solid factory:

- https://ark-ui.com/docs/guides/composition
- https://ark-ui.com/docs/guides/styling
- https://ark-ui.com/docs/guides/ref

## Purpose

`List` is a semantic `ul`/`ol` wrapper with moduix spacing, typography, marker, and tone tokens.

## Public contract

- `List` and `List.Root` render an unordered list by default.
- Use `as="ol"` to render an ordered list with native ordered-list props such as `start`, `reversed`,
  and `type`.
- `List.Item` renders a semantic `li` and forwards native item props and refs.
- `gap`, `size`, `tone`, and `marker` control the moduix styling hooks.
- `marker="none"` keeps list semantics with a default `role="list"` unless a custom role is supplied.
- Component-owned `data-scope`, `data-part`, `data-slot`, and styling data hooks override colliding
  consumer values.

```tsx
import { List } from '@moduix/solid/list';

export function Example() {
  return (
    <List>
      <List.Item>Use semantic list markup for grouped content.</List.Item>
      <List.Item>Keep spacing and typography on the library scale.</List.Item>
    </List>
  );
}
```

## Composition and refs

Use `asChild` with one semantic host and a Solid render function:

```tsx
<List
  asChild={(props) => (
    <ul {...props()} aria-label="Release tasks">
      <List.Item>Publish the package.</List.Item>
    </ul>
  )}
  marker="none"
/>
```

Ordinary roots and items forward Solid refs to their rendered native elements. Ark Solid does not
forward a ref through an `asChild` render function, so those paths remain separate.

## Styling and accessibility

Native list semantics come from the rendered `ul`, `ol`, and `li` elements. The root emits:

- `data-scope="list"`
- `data-part="root"`
- `data-slot="list-root"`
- `data-gap`, `data-marker`, `data-size`, and `data-tone`

Items emit `data-scope="list"`, `data-part="item"`, and `data-slot="list-item"`. The CSS module is
identical to the React component and uses native `::marker` styling and the public
`--moduix-list-*` variables.

## Differences from upstream

- moduix adds `gap`, `size`, `tone`, `marker`, stable data hooks, and the `List.Root`/`List.Item`
  composition API.
- Solid uses `class` and `asChild={(props) => ...}` rather than React `className` and child syntax.
- There is no Ark state machine, context, provider, or callback API because Ark does not provide a
  dedicated visual list primitive.