# AspectRatio

Ark UI does not ship a dedicated `aspect-ratio` primitive in `@ark-ui/react@5.37.2`, so moduix
implements this component as an Ark-aligned factory wrapper with `@ark-ui/react/factory`.

## Purpose

`AspectRatio` constrains media and embed content inside a responsive box with a fixed numeric
width-to-height ratio.

## Current behavior contract

- Uses Ark-style root composition: `AspectRatio.Root`.
- `AspectRatio` itself is the same root component with `AspectRatio.Root` attached for namespace
  consistency with the rest of the library.
- `ratio` is required and accepts only a positive `number`.
- Root supports Ark factory polymorphism via `asChild`.
- Root renders with:
  - `data-scope="aspect-ratio"`
  - `data-part="root"`
  - `data-slot="aspect-ratio-root"`
- The resolved ratio is applied through inline `style.aspectRatio`; consumer `style` still wins if
  it overrides `aspectRatio`.
- Direct `img`, `video`, `iframe`, `canvas`, and `svg` children automatically fill the frame.
- Root default styles keep `position: relative`, `overflow: hidden`, and a moduix radius token.

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

```text
AspectRatio.Root
└─ media | iframe | canvas | custom content
```

Use `asChild` when another element must own the rendered DOM node.

## Defaults and styling

Stable hooks on the root:

| Hook                            | Purpose                      |
| ------------------------------- | ---------------------------- |
| `data-scope="aspect-ratio"`     | Ark-aligned component scope. |
| `data-part="root"`              | Ark-aligned part name.       |
| `data-slot="aspect-ratio-root"` | Stable moduix slot hook.     |

Primary CSS variable:

| Variable                | Default            |
| ----------------------- | ------------------ |
| `--aspect-ratio-radius` | `var(--radius-md)` |

## Intentional differences from the previous local contract

- Removed named ratio presets (`square`, `video`, `portrait`, `photo`).
- Removed the old `number | RatioPreset` API in favor of Ark-aligned numeric `ratio`.
- Added Ark-style namespace access through `AspectRatio.Root`.
- Added Ark-style `data-scope` and `data-part` hooks to the root.

## Agent notes

- Keep the wrapper thin; do not reintroduce preset aliases or compatibility translation.
- Keep `position: relative` on the root for absolute-fill patterns such as Next.js `Image fill`.
- Keep child auto-fill limited to direct `img`, `video`, `iframe`, `canvas`, and `svg` children.

## Local changelog

- 2026-06-17: Migrated `AspectRatio` to an Ark-aligned factory wrapper, added `AspectRatio.Root`,
  removed preset ratio aliases, and aligned docs/examples to numeric `ratio`.