# Lightbox

Composed component based on `@base-ui/react/dialog` primitives for image preview in a modal overlay.

## Key use cases

- Wrap a known image with `LightboxImage` + `LightboxContent`.
- Use custom trigger composition with `LightboxTrigger`.
- Dynamically capture images in CMS-rendered content with `LightboxGallery`.
- Toggle the built-in top-right close button with `withCloseButton` or override it with `closeButton`.

## Basic anatomy

```tsx
<Lightbox>
  <LightboxImage src="..." alt="..." />
  <LightboxContent>
    <img src="..." alt="..." />
  </LightboxContent>
</Lightbox>
```

## Dynamic capture

```tsx
<section ref={rootRef}>{/* dynamic HTML with images */}</section>
<LightboxGallery rootRef={rootRef} />
```