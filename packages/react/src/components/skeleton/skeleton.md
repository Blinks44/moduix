# Skeleton

Upstream docs:

- Ark UI: no dedicated primitive; built with https://ark-ui.com/docs/guides/composition
- Chakra UI: https://chakra-ui.com/docs/components/skeleton

## Contract

- `Skeleton` is the only public component: one `ark.div` root with `asChild` and a forwarded ref.
- Local props follow Chakra: `loading` (default `true`) and `variant` (`pulse` | `none`, default
  `pulse`). Chakra's `shine` variant and `SkeletonCircle` / `SkeletonText` are intentionally not
  provided; compose them with `boxSize`, `borderRadius`, and layout.
- Sizing sugar: `width`, `height`, `boxSize` (width and height together; explicit `width` and
  `height` win), and `borderRadius`. Numbers are pixels. `style` is merged last.
- Exported types: `SkeletonRootProps`, `SkeletonVariant`.
- The component has no internal state, context, or callbacks.

```text
Skeleton
└─ children (optional, shown when loading={false})
```

## Accessibility and state

- While loading, the root gets `aria-hidden` unless the consumer passes `aria-hidden` explicitly.
- Put `aria-busy` and loading announcements on the region that owns the request, not on the
  placeholder.
- The wrapper owns `data-scope="skeleton"`, `data-part="root"`, `data-slot="skeleton-root"`,
  `data-state` (`loading` | `loaded`), `data-loading` (present while loading), and `data-variant`;
  passthrough values do not override them.

## Styling

- The root is `display: block`, `width: 100%`, with a `radius-md` corner.
- Only while loading: default height, background, `overflow: hidden`, transparent text, no pointer
  events or selection, and hidden descendants and pseudo-elements. Loaded content keeps its natural
  height and is not clipped.
- The `pulse` variant uses the foundation token `--moduix-animation-pulse`, which becomes `none`
  under `prefers-reduced-motion`. Override the token to change the pulse globally, or set
  `animation` in a class for one placeholder.
- CSS Modules expose `--moduix-skeleton-bg`, `--moduix-skeleton-border-radius`, and
  `--moduix-skeleton-height`. Tailwind variants map the same values to utilities that are added
  conditionally in code, so consumer utilities merged through `cn` replace them.

## Agent notes

- Keep `Skeleton` thin: no layout logic, status messaging, callbacks, or internal loading state.