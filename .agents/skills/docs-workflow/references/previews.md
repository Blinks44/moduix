# Preview rules

Read this reference whenever a preview frame, metadata control, or snippet changes.

## Frame and snippet boundaries

- `PreviewFrame` exists only in MDX. Never copy it into TSX.
- The frame controls the canvas, not the demo. Keep documentation-only width and alignment rules out of the copied snippet and example CSS.
- Use `maxWidth="sm"` or `maxWidth="lg"` as a cap, not a forced width. Use `contentWidth="fit-content"` only when a naturally full-width root should shrink-wrap.
- Preserve deliberate component layout. Set `inline-size: 100%` on the direct demo root when the component should fill the frame.
- Preview snippets run from a virtual directory: do not use relative CSS imports in them.

## Auxiliary demo UI

For documentation-only actions or result feedback, import `PreviewMeta` from `@/components/mdx/Components`. Put a short labelled native `<output>` before its actions and use moduix `Button` for the actions. Do not move controls belonging to the documented component into `PreviewMeta`.

## Migration check

When migrating a page, inspect every preview fence and direct snippet root. Remove injected width-only styles, move preview-only state or status UI into the shared pattern, and keep visible component anatomy intact.