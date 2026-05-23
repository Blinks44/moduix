# PreviewCard

Composed preview popup built on top of `@base-ui/react/preview-card`.

## Key use cases

- Show a small hover/focus preview for a link or inline trigger.
- Keep trigger and popup detached with `createPreviewCardHandle()`.
- Reuse one popup for multiple triggers via `payload`.
- Style internal infrastructure slots through `classNames` and `slotProps`.

## Basic anatomy

```tsx
<PreviewCard>
  <PreviewCardTrigger href="https://example.com">Open preview</PreviewCardTrigger>
  <PreviewCardContent>
    <div>Preview content</div>
  </PreviewCardContent>
</PreviewCard>
```

`PreviewCardContent` renders and wires the internal `Portal`, `Positioner`, `Popup`, `Arrow`, and `Viewport` slots for you.

## Composition notes

- `withArrow` defaults to `true`.
- `withBackdrop` defaults to `false`.
- `sideOffset` defaults to `8`.
- Top-level `container` overrides `slotProps.portal.container`.
- Top-level positioning props override matching values from `slotProps.positioner`.
- `arrow` supports both legacy boolean control and custom React node content:
  - `arrow={false}` hides the arrow.
  - `arrow={<CustomArrow />}` replaces the default arrow.
  - `withArrow` still has higher priority when both are provided.

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

## Slot customization

```tsx
<PreviewCard>
  <PreviewCardTrigger href="https://example.com">Styled preview</PreviewCardTrigger>
  <PreviewCardContent
    withBackdrop
    classNames={{
      backdrop: styles.backdrop,
      arrow: styles.arrow,
      viewport: styles.viewport,
    }}
    slotProps={{
      positioner: {
        side: 'right',
        sideOffset: 12,
      },
    }}
  >
    <div>Preview content</div>
  </PreviewCardContent>
</PreviewCard>
```

Use `className` for the popup itself, `classNames` for internal visual slots, and `slotProps` for non-class slot configuration.