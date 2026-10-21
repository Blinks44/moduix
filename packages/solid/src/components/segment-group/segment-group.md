# SegmentGroup (Solid)

`SegmentGroup` is the moduix Solid wrapper around Ark UI SegmentGroup. It follows the React contract
in `packages/react/src/components/segment-group/segment-group.md`: flat parts, horizontal default
orientation on the root and on `useSegmentGroup`, root `size` (`sm`, `md`, `lg`), `SegmentGroupItems`
with string or object items as the only sugar, no
`SegmentGroupItemControl`, and no Field/Fieldset inheritance.

## Composition

```tsx
import {
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupItems,
} from '@moduix/solid/segment-group';

const frameworks = ['React', 'Solid'];

export function SegmentGroupDemo() {
  return (
    <SegmentGroup defaultValue="React" aria-label="Framework">
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworks} />
    </SegmentGroup>
  );
}
```

Direct `SegmentGroupItem` composition requires an explicit `SegmentGroupItemHiddenInput`.

## Ark Solid behavior

- `asChild` takes a render function: `asChild={(props) => <label {...props()} />}`.
- Ark Solid does not forward a `ref` passed together with `asChild`; this is covered by tests.
- `useSegmentGroup()` and the context hooks return reactive accessors, for example
  `segmentGroup().setValue('Solid')`.