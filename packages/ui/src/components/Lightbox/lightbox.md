# Lightbox

Composed component based on `@base-ui/react/dialog` primitives for image preview in a modal overlay.

## Recommended path

Use `LightboxImage` as the trigger and let `LightboxContent` render the full-size image when
children are omitted.

```tsx
<Lightbox>
  <LightboxImage src={thumbnail} fullSrc={fullSize} alt="Preview image" />
  <LightboxContent />
</Lightbox>
```

`fullSrc` is optional. When it is not provided, the lightbox reuses `src`.

## Composition

```tsx
<Lightbox>
  <LightboxTrigger render={<button type="button">Open image</button>} />
  <LightboxContent>
    <img src={fullSize} alt="Preview image" />
  </LightboxContent>
</Lightbox>
```

`LightboxContent` renders the default portal, backdrop, viewport, popup, frame, and close button.

Drop to `LightboxPortal`, `LightboxBackdrop`, `LightboxViewport`, `LightboxPopup`, and
`LightboxFrame` when the default structure is not enough.

## Dynamic capture

```tsx
<section ref={rootRef}>{/* dynamic HTML with images */}</section>
<LightboxGallery rootRef={rootRef} />
```

`LightboxGallery` reads `data-lightbox-src` first, then falls back to `currentSrc` or `src`, which
makes it useful for CMS-rendered thumbnails with separate full-size assets.