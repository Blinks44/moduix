# Skeleton

Upstream docs:

- Ark UI: no dedicated Skeleton primitive exists; use https://ark-ui.com/docs/guides/composition, https://ark-ui.com/docs/guides/styling, and https://ark-ui.com/docs/guides/ref
- Chakra UI: https://chakra-ui.com/docs/components/skeleton

## Purpose

Use `Skeleton` to reserve space for content that has not loaded yet: text lines, cards, media blocks,
avatars, and custom page sections.

## Upstream model to preserve

Ark UI has no `Skeleton` component. The wrapper follows Ark's standalone factory model by using
`@ark-ui/react/factory`, `HTMLArkProps`, `asChild`, forwarded refs, and Ark-style `data-scope`,
`data-part`, state, and variant attributes.

Chakra's Skeleton model informs the public behavior: `loading` defaults to `true`, children can be
revealed with `loading={false}`, and `variant` supports `pulse` and `none`.

## Current behavior contract

- `Skeleton` renders `Skeleton.Root`; the short root form and namespaced root are equivalent.
- The root is an `ark.div` by default and forwards refs to that element.
- `asChild` is supported by the Ark factory path. The child must be a single semantic element.
- `loading` defaults to `true`. Loading roots get `aria-hidden`, `data-state="loading"`, and
  `data-loading`.
- `loading={false}` sets `data-state="loaded"` and lets children use their natural height unless
  `height`, `boxSize`, or `style.height` is set.
- `variant` defaults to `pulse` and accepts `pulse` and `none`.
- `width`, `height`, `boxSize`, and `borderRadius` accept CSS lengths. Numeric values are converted
  to `px`. `style` is merged last.

## Anatomy and exported parts

```text
Skeleton.Root
└─ children (optional, visible when loading={false})
```

| Part                | Stable hooks                                                                            | Notes                                       |
| ------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------- |
| `Skeleton` / `Root` | `data-scope="skeleton"`, `data-part="root"`, `data-slot="skeleton-root"`                | Short root form and namespace are the same. |
| Loading root state  | `data-state="loading"`, `data-loading`, `data-variant="pulse"` or `data-variant="none"` | Placeholder surface is decorative.          |
| Loaded root state   | `data-state="loaded"`, `data-variant="pulse"` or `data-variant="none"`                  | Children render through the same host.      |

## Composition

```tsx
import { Skeleton, Stack } from '@moduix/react';

export function UserRowSkeleton() {
  return (
    <Stack direction="row" align="center" gap={12}>
      <Skeleton boxSize={48} borderRadius="var(--radius-full)" />
      <Stack gap={8} fill>
        <Skeleton width="46%" height={16} />
        <Skeleton height={14} />
        <Skeleton width="72%" height={14} />
      </Stack>
    </Stack>
  );
}
```

```tsx
import { Skeleton } from '@moduix/react';

export function LoadedProfile() {
  return (
    <Skeleton loading={false}>
      <strong>Ada Lovelace</strong>
    </Skeleton>
  );
}
```

## Upstream feature coverage

- Ark primitive anatomy: not applicable because Ark has no dedicated primitive.
- Ark composition guide: covered through `ark.div`, `HTMLArkProps`, `asChild`, and single-child
  custom host composition.
- Ark styling guide: covered through `data-scope`, `data-part`, `data-state`, `data-variant`,
  `data-slot`, and public CSS variables.
- Ark ref guide: covered by forwarding refs to the root factory element.
- Chakra loading model: covered by `loading={true|false}`.
- Chakra variants: covered by `pulse` and `none`.
- Chakra companion `SkeletonCircle` / `SkeletonText`: intentionally not exported as separate
  components; use `boxSize`, `borderRadius`, and surrounding layout instead.

## Accessibility and state

- While loading, the root is decorative and gets `aria-hidden` unless the consumer explicitly passes a
  different `aria-hidden` value.
- The component has no keyboard behavior, focus management, controlled state, callbacks,
  `Field.Root`, `Fieldset.Root`, `HiddenInput`, `ids`, context hooks, or `RootProvider`.
- Keep real loading announcements in adjacent content when a status needs to be exposed to assistive
  technologies.
- Reduced-motion users get no loading animation through the component CSS.

## Defaults and styling

Default CSS:

- `display: block`
- `width: 100%`
- `overflow: hidden`
- `border-radius: var(--skeleton-border-radius, var(--radius-md))`
- loading-only height, background, text hiding, pointer blocking, and animation are scoped to
  `data-state="loading"`

Public CSS variables:

| Variable                   | Default                                                                           | Effect                                                        |
| -------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `--skeleton-animation`     | `var(--animation-pulse)`                                                          | Pulse variant animation.                                      |
| `--skeleton-border-radius` | `var(--radius-md)`                                                                | Root border radius when no inline `borderRadius` is provided. |
| `--skeleton-bg`            | `color-mix(in oklab, var(--color-muted-foreground) 18%, var(--color-background))` | Loading surface color.                                        |

## Intentional sugar and differences from upstream

- `boxSize` is moduix sugar for setting width and height together.
- `borderRadius` is moduix sugar for matching common tokenized surfaces without inline style objects.
- No separate `SkeletonCircle` or `SkeletonText` exports are provided. Compose those with `Skeleton`
  and layout primitives.
- Legacy `animated`, `shape`, `radius`, and `size` props were removed in favor of `variant`,
  `borderRadius`, and `boxSize`.

## Agent notes

- Keep the component thin. Do not add layout logic, status messaging, callback props, or internal
  loading state.
- Preserve the Ark factory import and `asChild` behavior; do not reintroduce legacy polymorphic
  render contracts.
- Keep docs, stories, registry output, and Stack examples aligned if prop names change again.
- Preserve `data-slot="skeleton-root"` for moduix styling compatibility, layered with Ark-style
  `data-scope` and `data-part`.

## Local changelog

- 2026-06-27: Audited the Ark factory migration, simplified loading-state CSS, fixed the anatomy
  hook table, and synchronized docs example data with rendered examples.
- 2026-06-20: Migrated `Skeleton` to an Ark-style factory wrapper, added `Skeleton.Root`,
  `asChild`, `loading`, `variant`, `boxSize`, and `borderRadius`, removed legacy
  `animated`/`shape`/`radius`/`size`, and synchronized stories/docs/styling hooks.
- 2026-06-03: Rewrote the local documentation around the actual moduix `Skeleton` wrapper,
  including the real prop contract, styling API, animation behavior, accessibility guidance, and
  implementation limitations.