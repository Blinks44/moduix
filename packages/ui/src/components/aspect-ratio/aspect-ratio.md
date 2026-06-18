# AspectRatio

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition

## Purpose

`AspectRatio` constrains media and embed content inside a responsive box with a fixed numeric
width-to-height ratio.

Ark UI does not ship a dedicated `AspectRatio` primitive in `@ark-ui/react@5.37.2`, so moduix
implements this component as an Ark-aligned factory wrapper with `@ark-ui/react/factory`.

## Upstream model to preserve

- Uses the Ark factory composition model instead of a dedicated Ark primitive.
- Keeps the API intentionally small: one root part with polymorphic DOM ownership through `asChild`.
- Keeps the ratio expressed as a plain numeric `style.aspectRatio` value instead of preset aliases.

## Current behavior contract

- Uses Ark-style root composition: `AspectRatio.Root`.
- `AspectRatio` itself is the same root component with `AspectRatio.Root` attached for namespace
  consistency with the rest of the library.
- `ratio` is required and accepts only a positive `number`.
- Root supports Ark factory polymorphism via `asChild`.
- Root renders with `data-scope="aspect-ratio"`, `data-part="root"`, and
  `data-slot="aspect-ratio-root"`.
- The resolved ratio is applied through inline `style.aspectRatio`; consumer `style` still wins if
  it overrides `aspectRatio`.
- Direct `img`, `video`, `iframe`, `canvas`, and `svg` children automatically fill the frame.
- Root default styles keep `position: relative`, `overflow: hidden`, and a moduix radius token.

## Anatomy and exported parts

```text
AspectRatio.Root
└─ media | iframe | canvas | svg | custom content
```

Every exported part accepts `className` and uses the standard hooks below:

| Part               | Hook                            | Notes                        |
| ------------------ | ------------------------------- | ---------------------------- |
| `AspectRatio.Root` | `data-slot="aspect-ratio-root"` | Single exported root part.   |
| `AspectRatio.Root` | `data-scope="aspect-ratio"`     | Ark-aligned component scope. |
| `AspectRatio.Root` | `data-part="root"`              | Ark-aligned part name.       |

## Composition

```tsx
import { AspectRatio } from 'moduix';

export function AspectRatioExample() {
  return (
    <AspectRatio.Root ratio={16 / 9}>
      <img src="/hero.jpg" alt="Hero" style={{ objectFit: 'cover' }} />
    </AspectRatio.Root>
  );
}
```

Use `asChild` when another element must own the rendered DOM node.

## Upstream feature coverage

- `Composition`: preserved through Ark factory `asChild` behavior.
- `Polymorphic root`: preserved through the single root part.
- `Dedicated primitive features`: not applicable because Ark has no dedicated `AspectRatio`
  component page for this wrapper to mirror.
- `Preset ratios`: intentionally unsupported; moduix keeps a numeric `ratio` only.

## Accessibility and state

- The component is presentational and does not add managed state, callbacks, or ARIA behavior.
- Ark-style ownership changes remain available through `asChild`.
- The root keeps stable hooks for styling and test targeting: `data-scope`, `data-part`, and
  `data-slot`.

## Defaults and styling

Primary CSS variable:

| Variable                | Default            |
| ----------------------- | ------------------ |
| `--aspect-ratio-radius` | `var(--radius-md)` |

## Intentional sugar and differences from upstream

- moduix adds the namespace surface `AspectRatio.Root` for consistency with the rest of the library.
- moduix adds a styled default radius token and direct-media auto-fill rules.
- moduix removes the previous local preset aliases and keeps only the Ark-aligned numeric ratio.

## Agent notes

- Keep the wrapper thin; do not reintroduce preset aliases or compatibility translation.
- Keep `position: relative` on the root for absolute-fill patterns such as Next.js `Image fill`.
- Keep child auto-fill limited to direct `img`, `video`, `iframe`, `canvas`, and `svg` children.

## Local changelog

- 2026-06-17: Migrated `AspectRatio` to an Ark-aligned factory wrapper, added `AspectRatio.Root`,
  removed preset ratio aliases, and aligned docs/examples to numeric `ratio`.