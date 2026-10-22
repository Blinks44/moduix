# Signature Pad

## Upstream docs

- Ark UI: https://ark-ui.com/docs/components/signature-pad
- Chakra UI and shadcn/ui ship no signature pad component.

## Contract

`SignaturePad` and its prefixed parts are thin styled wrappers over Ark: they add a class and a
`data-slot`, and keep Ark props, callback detail objects (`onDraw`, `onDrawEnd` with
`details.getDataUrl()`), ids, translations, and data attributes unchanged.

```tsx
SignaturePad | SignaturePadRootProvider
├─ SignaturePadLabel
├─ SignaturePadCanvas (sugar)
│  └─ SignaturePadControl
│     ├─ SignaturePadSegment
│     ├─ SignaturePadClearTrigger
│     └─ SignaturePadGuide
└─ SignaturePadHiddenInput value={serializedPaths} (explicit)
```

- `SignaturePadCanvas` renders the fixed control tree and forwards control props and its ref. Use
  the low-level parts when the tree itself must change.
- `SignaturePadClearTrigger` composes `CloseButton` with `RotateCcwIcon` by default; children
  replace the icon, `asChild` replaces the button. Its accessible name comes from Ark
  `translations.clearTrigger` unless `aria-label` or `aria-labelledby` is passed.
- `SignaturePadHiddenInput` is composed explicitly with a serialized `value`; do not add a
  serializer prop to the root.

## Read-only guard

Ark keeps the clear trigger active in read-only mode, so a click erases a read-only signature.
moduix hides the trigger when `readOnly` comes from the root, a surrounding `Field`, or the moduix
`useSignaturePad()`, as Ark already hides it while the pad is empty or drawing. Programmatic
`clear()` stays available.

`useSignaturePad()` returns the Ark API plus a plain `readOnly: boolean`, which
`SignaturePadRootProvider` reads. A raw Ark API without it is accepted and treated as not
read-only.

## Styling

The CSS Modules package exposes seven variables: `--moduix-signature-pad-width`, `-height`, `-bg`,
`-border-color`, `-radius`, `-stroke-color`, and `-guide-color`. Everything else is overridden with
a class on the part. The stroke color applies only when Ark `drawing.fill` is not set;
`drawing.fill` must be a real CSS color.

Disabled opacity is applied once on the root, so the clear trigger keeps full opacity inside it.
The guide and clear trigger use logical inline offsets for RTL.