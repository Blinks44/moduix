# AspectRatio

Upstream docs:

- Ark UI factory: https://ark-ui.com/docs/guides/composition#the-ark-factory
- Ark UI composition: https://ark-ui.com/docs/guides/composition
- Ark UI styling: https://ark-ui.com/docs/guides/styling
- Ark UI ref: https://ark-ui.com/docs/guides/ref

## Purpose

`AspectRatio` constrains media and embed content inside a responsive box with a fixed numeric
width-to-height ratio.

Ark UI does not ship a dedicated `aspect-ratio` primitive. Moduix builds this component with the official
[Ark factory](https://ark-ui.com/docs/guides/composition#the-ark-factory), follows Ark's
[composition](https://ark-ui.com/docs/guides/composition), [styling](https://ark-ui.com/docs/guides/styling), and
[ref](https://ark-ui.com/docs/guides/ref) guidance.

## Upstream model to preserve

- Uses the Ark factory composition model instead of a dedicated Ark primitive.
- Keeps the API intentionally small: one root part with polymorphic DOM ownership through `asChild`.
- Keeps the ratio expressed as a plain numeric `style.aspectRatio` value instead of preset aliases.

## Current behavior contract

- `AspectRatio` is the recommended root export; `AspectRatio.Root` is the same component exposed for
  namespace consistency.
- `ratio` is a required `number` applied to the CSS `aspect-ratio` property. Consumers must pass a
  finite value greater than zero for valid CSS behavior.
- Root supports Ark factory polymorphism via `asChild`.
- Root renders with `data-scope="aspect-ratio"`, `data-part="root"`, and
  `data-slot="aspect-ratio-root"`.
- The resolved ratio is applied through inline `style.aspectRatio`; consumer `style` still wins if
  it overrides `aspectRatio`.
- Direct `img`, `video`, `iframe`, `canvas`, and `svg` children automatically fill the frame.
- Root default styles keep `position: relative`, `overflow: hidden`, and a moduix radius token.

## Anatomy and exported parts

```text
AspectRatio / AspectRatio.Root
└─ media | iframe | canvas | svg | custom content
```

Every exported part accepts `className` and uses the standard hooks below:

| Part                               | Hook                            | Notes                        |
| ---------------------------------- | ------------------------------- | ---------------------------- |
| `AspectRatio` / `AspectRatio.Root` | `data-slot="aspect-ratio-root"` | Single exported root part.   |
| `AspectRatio` / `AspectRatio.Root` | `data-scope="aspect-ratio"`     | Ark-aligned component scope. |
| `AspectRatio` / `AspectRatio.Root` | `data-part="root"`              | Ark-aligned part name.       |

## Composition

```tsx
import { AspectRatio } from '@moduix/react';

export function AspectRatioExample() {
  return (
    <AspectRatio ratio={16 / 9}>
      <img src="/hero.jpg" alt="Hero" style={{ objectFit: 'cover' }} />
    </AspectRatio>
  );
}
```

Use `asChild` with exactly one child when another semantic element must own the rendered DOM node:

```tsx
<AspectRatio ratio={16 / 9} asChild>
  <figure>
    <img src="/hero.jpg" alt="Hero" style={{ objectFit: 'cover' }} />
  </figure>
</AspectRatio>
```

## Upstream feature coverage

- `Composition`: preserved through Ark factory `asChild` behavior.
- `Polymorphic root`: preserved through the single root part.
- `Dedicated primitive features`: not applicable because Ark has no dedicated `AspectRatio`
  component page for this wrapper to mirror.
- `Preset ratios`: intentionally unsupported; moduix keeps a numeric `ratio` only.

## Accessibility and state

- The component is presentational and does not add managed state, callbacks, or ARIA behavior.
- Ark-style ownership changes remain available through `asChild`.
- `asChild` requires one valid React element; consumers remain responsible for choosing semantic,
  accessible host elements.
- The forwarded ref targets the rendered root element, or the composed child when `asChild` is used.
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
- 2026-06-18: Audited the Ark factory contract, documented valid ratio constraints and `asChild`,
  aligned the recommended short root form, and fixed the registry dependency.
- 2026-06-24: Re-audited the local-only Ark factory contract, refreshed the official Ark guide
  references, documented the root ref target, and simplified docs/examples after migration.