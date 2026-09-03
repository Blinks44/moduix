# Lightbox (Solid)

`Lightbox` is an image-first dialog composition built on Ark UI Dialog. The Solid adapter
preserves the React component's explicit anatomy, dialog state, focus behavior, portal placement,
presence lifecycle, CSS hooks, and callback detail objects.

## Composition

```tsx
<Lightbox aria-label="Mountain ridge at sunset">
  <Lightbox.Trigger
    asChild={(props) => (
      <button {...props()} type="button">
        <img src={thumbnail} alt="Mountain ridge at sunset" />
      </button>
    )}
  />
  <Lightbox.Backdrop />
  <Lightbox.Positioner>
    <Lightbox.CloseIcon />
    <Lightbox.Content>
      <Lightbox.Body>
        <Lightbox.Image src={fullSize} alt="Mountain ridge at sunset" />
      </Lightbox.Body>
    </Lightbox.Content>
  </Lightbox.Positioner>
</Lightbox>
```

`Lightbox` and `Lightbox.Root` are equivalent roots. `Backdrop` and `Positioner` are portalled by
default; use `portalled={false}` or `portalRef` on the root to control overlay placement.
`lazyMount` and `unmountOnExit` default to `true`.

## API surface

The adapter exports `Lightbox`, `LightboxBind`, `LightboxGallery`, `LightboxImage`,
`useLightbox`, and `useLightboxContext`. `Lightbox` exposes `Root`, `RootProvider`, `Trigger`,
`Backdrop`, `Positioner`, `Content`, `Title`, `Description`, `CloseTrigger`, `CloseIcon`,
`Header`, `Body`, `Footer`, `Image`, `Gallery`, and `Bind`.

`Lightbox.RootProvider` receives the accessor returned by `useLightbox()`:

```tsx
const lightbox = useLightbox();

<Lightbox.RootProvider value={lightbox}>
  <Lightbox.Positioner>
    <Lightbox.Content>
      <Lightbox.Title>Image preview</Lightbox.Title>
    </Lightbox.Content>
  </Lightbox.Positioner>
</Lightbox.RootProvider>;
```

Ark owns open state, focus management, dismissal, IDs, state attributes, and runtime CSS
variables. Callback handlers receive Ark detail objects, including `details.open` and
`details.value`.

`Lightbox.Image` is a styled native image. `closeOnClick` closes the dialog after the consumer
click handler unless that handler calls `event.preventDefault()`.

`Lightbox.Gallery` is a layout boundary for composing `Carousel`; it does not own image data or
slide state. `Lightbox.Bind` renders no DOM and binds a semantic button or link selected by
`selector` inside `rootRef` or `rootSelector`. In Solid, `rootRef` can be an element or an
accessor such as `rootRef={() => rootElement}`. `onImageSelect` receives `src`, optional `alt`,
and the source `HTMLImageElement`.

## Solid composition notes

Ark Solid uses a render-function `asChild` prop:
`asChild={(props) => <button {...props()} type="button" />}`. Its native composition does not
forward refs through `asChild`, so ordinary refs and custom-host composition are supported as
separate paths. `Lightbox.CloseIcon` composes `CloseButton.Root` through this native contract and
defaults its accessible label to `Close image`.