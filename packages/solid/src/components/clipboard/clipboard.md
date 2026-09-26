# Clipboard (Solid)

`Clipboard` is the moduix Solid wrapper around Ark UI Clipboard. It preserves the React wrapper's
flat anatomy, copy lifecycle, callback details, accessibility behavior, CSS hooks, and
`ClipboardRootProvider` composition.

## Composition

```tsx
import {
  Clipboard,
  ClipboardControl,
  ClipboardIndicator,
  ClipboardInput,
  ClipboardLabel,
  ClipboardTrigger,
} from '@moduix/solid/clipboard';

export function ClipboardDemo() {
  return (
    <Clipboard defaultValue="https://moduix.dev/docs/clipboard">
      <ClipboardLabel>Copy this link</ClipboardLabel>
      <ClipboardControl>
        <ClipboardInput readOnly />
        <ClipboardTrigger>
          <ClipboardIndicator />
        </ClipboardTrigger>
      </ClipboardControl>
    </Clipboard>
  );
}
```

`ClipboardIndicator` renders moduix's default copy and check icons when its children and `copied`
content are omitted. Text usage passes `copied="Copied"` and children directly to `ClipboardIndicator`.

The public values are `Clipboard`, `ClipboardRootProvider`, `ClipboardContext`, `ClipboardLabel`,
`ClipboardControl`, `ClipboardInput`, `ClipboardTrigger`, `ClipboardIndicator`,
and `ClipboardValueText`. The barrel also re-exports the `useClipboard` and `useClipboardContext`
hooks.

## Ark Solid behavior

Solid uses a render-function `asChild` prop:

```tsx
<ClipboardTrigger
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