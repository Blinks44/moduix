# Lightbox

Composed component based on `@base-ui/react/dialog` primitives for image preview in a modal overlay.

## Key use cases

- Wrap a known image with `LightboxImage` + `LightboxContent`.
- Use custom trigger composition with `LightboxTrigger`.
- Dynamically capture images in CMS-rendered content with `LightboxGallery`.
- Drop down to `LightboxPortal`, `LightboxBackdrop`, `LightboxViewport`, `LightboxPopup`, and `LightboxFrame` when the default structure is not enough.

## Basic anatomy

```tsx
<Lightbox>
  <LightboxImage src="..." alt="..." />
  <LightboxContent>
    <img src="..." alt="..." />
  </LightboxContent>
</Lightbox>
```

`LightboxContent` renders the default portal, backdrop, viewport, popup, frame, and close button.

For advanced layout or styling, compose the low-level parts manually.

## Dynamic capture

```tsx
<section ref={rootRef}>{/* dynamic HTML with images */}</section>
<LightboxGallery rootRef={rootRef} />
```