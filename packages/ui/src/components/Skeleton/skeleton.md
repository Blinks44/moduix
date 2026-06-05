# Skeleton

`Skeleton` is a local moduix loading placeholder. It does not wrap a Base UI primitive.

## Purpose

Use `Skeleton` to reserve space for content that has not loaded yet: text lines, cards, media
blocks, avatars, and custom page sections.

It is intentionally small:

- one exported part
- one visual root
- no built-in layout
- no loading state management
- no variants or slot prop bags

Compose repeated loading layouts with `Stack` or your own wrapper markup.

## Current behavior contract

- `Skeleton` renders a single `div` root with `data-slot="skeleton-root"`.
- The root is decorative by default and renders with `aria-hidden="true"`.
- `animated` defaults to `true`. When enabled, the root gets `data-animated`; when disabled, the
  attribute is omitted and the CSS animation is turned off.
- Motion is also disabled automatically under `prefers-reduced-motion`, even when `animated` stays
  `true`.
- Default root styles come from `Skeleton.module.css`:
  - `display: block`
  - `width: 100%`
  - `height: 1rem`
  - `overflow: hidden`
  - `pointer-events: none`
  - `user-select: none`
- `width`, `height`, `radius`, and `size` accept CSS lengths. Numeric values are converted to `px`.
- `size` is a convenience prop that fills in both dimensions. Explicit `width` or `height` still win
  on their own axis.
- `shape="circle"` only changes the computed border radius to `50%` when `radius` is not provided. It
  does not force equal width and height.
- `style` is merged last, so consumers can override the computed width, height, or border radius as an
  escape hatch.

## Basic usage

Text placeholder:

```tsx
import { Skeleton, Stack } from 'moduix';

export function ArticleTitleSkeleton() {
  return (
    <Stack gap={10}>
      <Skeleton height={18} />
      <Skeleton width="86%" height={18} />
      <Skeleton width="64%" height={18} />
    </Stack>
  );
}
```

Avatar-style placeholder:

```tsx
import { Skeleton, Stack } from 'moduix';

export function UserRowSkeleton() {
  return (
    <Stack direction="row" align="center" gap={12}>
      <Skeleton size={48} shape="circle" />
      <Stack gap={8} fill>
        <Skeleton width="46%" height={16} />
        <Skeleton height={14} />
        <Skeleton width="72%" height={14} />
      </Stack>
    </Stack>
  );
}
```

## Composition

`Skeleton` exposes one exported visual part:

```text
Skeleton
└─ root[data-slot="skeleton-root"][data-animated?]
```

Layout stays outside the component.

- Use multiple instances for text, lists, and card shells.
- Use `size` with `shape="circle"` for avatar placeholders.
- Use `radius` when the placeholder should match another surface such as a card or media container.
- Use `animated={false}` when the loading state is visually dense or should stay quiet.
- Use `className`, `style`, and the public `--skeleton-*` variables for styling overrides.

## Public props

`Skeleton` accepts standard `div` props plus these wrapper props:

| Prop        | Type                  | Default              | Notes                                                                                              |
| ----------- | --------------------- | -------------------- | -------------------------------------------------------------------------------------------------- |
| `animated`  | `boolean`             | `true`               | Controls whether the root receives `data-animated`. Reduced-motion still disables animation.       |
| `width`     | `number \| string`    | —                    | Width override. Numeric values become `px`. Wins over `size` on the width axis.                    |
| `height`    | `number \| string`    | —                    | Height override. Numeric values become `px`. Wins over `size` on the height axis.                  |
| `radius`    | `number \| string`    | —                    | Border radius override. Numeric values become `px`. Wins over `shape`.                             |
| `size`      | `number \| string`    | —                    | Convenience prop that fills both width and height when that axis is otherwise unset.               |
| `shape`     | `'rect' \| 'circle'`  | `'rect'` by behavior | `circle` sets border radius to `50%` when `radius` is not provided. Does not enforce a square box. |
| `className` | `string`              | —                    | Merged with the root class for local styling overrides.                                            |
| `style`     | `React.CSSProperties` | —                    | Applied last. Can override computed width, height, and border radius.                              |

## Styling API

### Stable hooks

| Hook                        | Purpose                                 |
| --------------------------- | --------------------------------------- |
| `data-slot="skeleton-root"` | Stable selector for the exported root.  |
| `[data-animated]`           | Present only when animation is enabled. |

There is no `data-shape`, no `data-size`, and no variant attribute contract.

### Public CSS variables

`Skeleton` exposes these public variables through `src/styles/theme.css` and the component stylesheet:

| Variable               | Default                                                                           | Effect                                            |
| ---------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------- |
| `--skeleton-animation` | `var(--animation-pulse)`                                                          | Root animation value.                             |
| `--skeleton-bg`        | `color-mix(in oklab, var(--color-muted-foreground) 18%, var(--color-background))` | Root background color.                            |
| `--skeleton-radius`    | `var(--radius-md)`                                                                | Default root border radius for non-circle shapes. |

Example override:

```tsx
import { Skeleton, Stack } from 'moduix';
import styles from './custom-skeleton-demo.module.css';

export function CustomSkeletonDemo() {
  return (
    <Stack gap={10} className={styles.block}>
      <Skeleton className={styles.item} height={18} />
      <Skeleton className={styles.item} width="78%" height={18} />
      <Skeleton className={styles.item} width="52%" height={18} />
    </Stack>
  );
}
```

```css
.block {
  --skeleton-bg: var(--color-primary);
  --skeleton-radius: var(--radius-full);
  --skeleton-animation: none;
}

.item {
  opacity: 0.28;
}
```

Notes:

- `animated={false}` disables animation per instance by removing `data-animated`.
- `--skeleton-animation: none` disables the animation through styling for every matching descendant in
  that subtree.
- `shape="circle"` applies `border-radius: 50%` inline when `radius` is not provided, so
  `--skeleton-radius` does not affect that case.

## UX and accessibility

- `Skeleton` is decorative by default. Keep real loading announcements, labels, and progress context in
  adjacent content instead of on the placeholder itself.
- The component is non-interactive: no keyboard navigation, focus handling, disabled state, or
  read-only state.
- `pointer-events: none` prevents the placeholder from intercepting input while the surrounding layout
  is loading.
- Respect reduced motion. The shipped CSS already disables the pulse animation for users who prefer
  reduced motion.

## Limitations and recommendations

- For circle placeholders, prefer `size` or provide both `width` and `height`. `shape="circle"` alone
  does not guarantee equal dimensions.
- Use wrapper layout primitives such as `Stack` for spacing and responsive structure. `Skeleton` should
  stay a visual building block, not a layout component.
- Do not use `Skeleton` as the only accessible indicator that content is loading. Pair it with nearby
  text, a region label, or another status message when the state needs to be announced.
- Use `className` for local overrides and the public CSS variables for token-level customization. Do not
  add parallel `classNames` maps or slot prop bags.

## Intentional differences from Base UI

- There is no upstream Base UI `Skeleton` primitive to mirror locally.
- moduix ships `Skeleton` as a single styled `div` instead of a namespaced multi-part primitive API.
- The local documentation describes the shipped moduix wrapper contract and public styling hooks, not a
  generic loading-placeholder pattern.

## Agent notes

- Keep `Skeleton` thin. Do not add layout logic, variants, status messaging, or internal loading state.
- Preserve the public `data-slot="skeleton-root"` hook and the `--skeleton-*` CSS variable contract.
- Preserve the current sizing precedence:
  - explicit `width` wins over `size` for width
  - explicit `height` wins over `size` for height
  - explicit `radius` wins over `shape`
- If root behavior, styling hooks, or CSS variables change, update `Skeleton.tsx`, `Skeleton.module.css`,
  Storybook stories, docs examples, and this file in the same task.
- Keep examples aligned with docs previews: when a preview uses wrapper CSS or multiple skeleton blocks,
  the shown code should include the same composition.

## Local changelog

- 2026-06-03: Rewrote the local documentation around the actual moduix `Skeleton` wrapper, including
  the real prop contract, styling API, animation behavior, accessibility guidance, and implementation
  limitations.