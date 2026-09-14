# Clipboard (Solid)

`Clipboard` is the moduix Solid wrapper around Ark UI Clipboard. It preserves the React wrapper's
compound anatomy, copy lifecycle, callback details, accessibility behavior, CSS hooks, and
`RootProvider` composition.

## Composition

```tsx
import { Clipboard } from '@moduix/solid/clipboard';

export function ClipboardDemo() {
  return (
    <Clipboard defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Label>Copy this link</Clipboard.Label>
      <Clipboard.Control>
        <Clipboard.Input readOnly />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}
```

`Clipboard.Indicator` renders moduix's default copy and check icons when its children and `copied`
content are omitted. `Clipboard.CopyText` renders `Copy` and `Copied` by default.

The public parts are `Root`, `RootProvider`, `Context`, `Label`, `Control`, `Input`, `Trigger`,
`Indicator`, `CopyText`, and `ValueText`. The barrel also re-exports `useClipboard` and
`useClipboardContext`.

## Ark Solid behavior

Solid uses a render-function `asChild` prop:

```tsx
<Clipboard.Trigger
  asChild={(props) => (
    <button {...props()} type="button">
      Copy link
    </button>
  )}
/>
```

The installed Ark Solid primitive does not forward `ref` through an `asChild` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths.

`useClipboard()` returns an accessor, so provider state is passed as `value={clipboard}` and read
as `clipboard().value` or `clipboard().copied`. Ark owns the clipboard write, copied-state timing,
ids, state attributes, and trigger semantics.