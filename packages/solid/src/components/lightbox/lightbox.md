# Lightbox (Solid)

`Lightbox` is an image-first dialog composition built on Ark UI Dialog. The Solid adapter
preserves the React component's explicit anatomy, dialog state, focus behavior, portal placement,
presence lifecycle, CSS hooks, and callback detail objects.

## Composition

```tsx
<Lightbox aria-label="Mountain ridge at sunset">
  <LightboxTrigger
    asChild={(props) => (
      <button {...props()} type="button">
        <img src={thumbnail} alt="Mountain ridge at sunset" />
      </button>
    )}
  />
  <LightboxBackdrop />
  <LightboxPositioner>
    <LightboxCloseIcon />
    <LightboxContent>
      <LightboxBody>
        <LightboxImage src={fullSize} alt="Mountain ridge at sunset" />
      </LightboxBody>
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>
```

`Lightbox` is the root component. `LightboxBackdrop` and `LightboxPositioner` are portalled by
default; use `portalled={false}` or `portalRef` on the root to control overlay placement.
`lazyMount` and `unmountOnExit` default to `true`.

## API surface

The adapter exports `Lightbox`, `LightboxRootProvider`, `LightboxTrigger`, `LightboxBackdrop`,
`LightboxPositioner`, `LightboxContent`, `LightboxTitle`, `LightboxDescription`,
`LightboxCloseTrigger`, `LightboxCloseIcon`, `LightboxHeader`, `LightboxBody`, `LightboxFooter`,
`LightboxImage`, `LightboxGallery`, `LightboxBind`, `useLightbox`, and `useLightboxContext`.

`LightboxRootProvider` receives the accessor returned by `useLightbox()`:

```tsx
const lightbox = useLightbox();

<LightboxRootProvider value={lightbox}>
  <LightboxPositioner>
    <LightboxContent>
      <LightboxTitle>Image preview</LightboxTitle>
    </LightboxContent>
  </LightboxPositioner>
</LightboxRootProvider>;
```

Ark owns open state, focus management, dismissal, IDs, state attributes, and runtime CSS
variables. Callback handlers receive Ark detail objects, including `details.open` and
`details.value`.

`LightboxImage` is a styled native image. `closeOnClick` closes the dialog after the consumer
click handler unless that handler calls `event.preventDefault()`.

`LightboxGallery` is a layout boundary for composing `Carousel`; it does not own image data or
slide state. `LightboxBind` renders no DOM and binds a semantic button or link selected by
`selector` inside `rootRef` or `rootSelector`. In Solid, `rootRef` can be an element or an
accessor such as `rootRef={() => rootElement}`. `onImageSelect` receives `src`, optional `alt`,
and the source `HTMLImageElement`.

## Solid composition notes

Ark Solid uses a render-function `asChild` prop:
`asChild={(props) => <button {...props()} type="button" />}`. Its native composition does not
forward refs through `asChild`, so ordinary refs and custom-host composition are supported as
separate paths. `LightboxCloseIcon` composes `CloseButton` through this native contract and
defaults its accessible label to `Close image`.
