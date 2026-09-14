# Highlight (Solid)

`Highlight` emphasizes matched words or phrases inside existing copy with moduix-styled `<mark>`
elements. It preserves Ark UI's matching behavior and renders no wrapper element.

## Composition

```tsx
import { Highlight } from '@moduix/solid/highlight';
import { Text } from '@moduix/solid/text';

export function HighlightDemo() {
  return (
    <Text>
      <Highlight
        query="component"
        text="Ark UI is a headless component library for building accessible web applications."
      />
    </Text>
  );
}
```

`Highlight` and `Highlight.Root` are the same styled root. Each matched segment is a native
`<mark>` with `data-scope="highlight"`, `data-part="root"`, and `data-slot="highlight-root"`.
Unmatched text remains plain text, and a query with no matches renders no `<mark>` elements.

The `query`, `text`, `ignoreCase`, `matchAll`, and `exactMatch` props are passed to Ark UI. A string
array query requires `matchAll` to remain `true`; `exactMatch` follows Ark's JavaScript word-boundary
behavior and does not provide whole-word matching for every non-ASCII script.

Pass `class`, `style`, `title`, `id`, or `data-*` attributes to style or annotate every matched
`<mark>`. The component has no focus behavior, refs, state context, hidden inputs, or controlled
state of its own.