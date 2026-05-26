# PreviewCard

Thin preview popup built on top of `@base-ui/react/preview-card`.

## Key use cases

- Show a small hover or focus preview for a link.
- Keep trigger and popup detached with `createPreviewCardHandle()`.
- Reuse one popup for multiple triggers via `payload`.
- Drop down to explicit composition when you need custom structure, arrow content, or backdrop.

## Basic anatomy

```tsx
<PreviewCard>
  <PreviewCardTrigger href="https://example.com">Open preview</PreviewCardTrigger>
  <PreviewCardContent>
    <div>Preview content</div>
  </PreviewCardContent>
</PreviewCard>
```

`PreviewCardContent` renders `Portal`, `Positioner`, `Popup`, and `Viewport` for the default path.

## Defaults

- `showArrow` defaults to `false`.
- `sideOffset` defaults to `8`.

## Detached trigger

```tsx
const previewCardHandle = createPreviewCardHandle();

<PreviewCardTrigger handle={previewCardHandle} href="https://example.com">
  Open detached preview
</PreviewCardTrigger>

<PreviewCard handle={previewCardHandle}>
  <PreviewCardContent>
    <div>Shared preview content</div>
  </PreviewCardContent>
</PreviewCard>
```

## Multiple triggers with payload

```tsx
type LinkPayload = {
  title: string;
  summary: string;
};

const previewCardHandle = createPreviewCardHandle<LinkPayload>();

<PreviewCardTrigger
  handle={previewCardHandle}
  href="https://example.com/type"
  payload={{ title: 'Typography', summary: 'Readable type scales and rhythm.' }}
>
  Typography
</PreviewCardTrigger>

<PreviewCardTrigger
  handle={previewCardHandle}
  href="https://example.com/grid"
  payload={{ title: 'Grid systems', summary: 'Consistent layout and alignment.' }}
>
  Grid systems
</PreviewCardTrigger>

<PreviewCard handle={previewCardHandle}>
  {({ payload }) => (
    <PreviewCardContent>
      <div>
        <strong>{payload?.title}</strong>
        <p>{payload?.summary}</p>
      </div>
    </PreviewCardContent>
  )}
</PreviewCard>
```

## Custom composition

```tsx
<PreviewCard>
  <PreviewCardTrigger href="https://example.com">Styled preview</PreviewCardTrigger>
  <PreviewCardPortal>
    <PreviewCardBackdrop className={styles.backdrop} />
    <PreviewCardPositioner side="right" sideOffset={12}>
      <PreviewCardPopup className={styles.popup}>
        <PreviewCardArrow className={styles.arrow}>
          <CustomArrow />
        </PreviewCardArrow>
        <PreviewCardViewport className={styles.viewport}>
          <div>Preview content</div>
        </PreviewCardViewport>
      </PreviewCardPopup>
    </PreviewCardPositioner>
  </PreviewCardPortal>
</PreviewCard>
```

Use this path when you need a backdrop, custom arrow markup, custom portal behavior, or direct styling
of the structural parts.
