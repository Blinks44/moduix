# Button

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition
- Ark UI Styling: https://ark-ui.com/docs/guides/styling
- Chakra UI: https://chakra-ui.com/docs/components/button

## Purpose

`Button` is the moduix action control built as an Ark-style factory wrapper.

Ark UI does not ship a dedicated button primitive, so moduix exposes `Button` on top of
`@ark-ui/react/factory` and keeps the wrapper limited to styling, `data-slot`, and `asChild`
composition.

## Upstream model to preserve

- Uses the Ark factory composition model instead of a dedicated Ark primitive.
- Uses Chakra Button as the nearest recipe-level reference for a single-part action control.
- Keeps the API intentionally small: one root part with polymorphic DOM ownership through `asChild`.
- Keeps native button semantics and attributes intact on the root.

## Current behavior contract

The React module declares a `'use client'` boundary. Server parents may pass serializable props;
event handlers and render functions belong in a client composition.

- Exposes the root directly as the single `Button` value under the shared flat API.
- Supports Ark factory root props such as `asChild`, `className`, `style`, event handlers, and
  native button attributes.
- `variant`, `size`, and `loading` are the local root props. `variant` and `size` map to
  `data-variant` and `data-size`; `loading` sets `data-loading`, `aria-busy`, and the disabled
  styling path.
- The package exports the `Button` value and the `ButtonRootProps`, `ButtonSize`, and
  `ButtonVariant` types.
- Native roots default to `type="button"`; pass `type="submit"` explicitly for form submission.
- `disabled`, `aria-disabled="true"`, and `loading` expose `data-disabled` and prevent click
  activation.
- The forwarded ref targets the rendered button element.
- Writes `data-scope="button"`, `data-part="root"`, and `data-slot="button-root"` on a standalone
  root by default. When an Ark parent composes Button as its `asChild` trigger, incoming
  `data-scope` and `data-part` take precedence so the parent anatomy survives; `data-slot` remains
  the stable moduix styling hook and can still be narrowed by composed wrappers.
- When `asChild` is enabled, disabled states keep `aria-disabled`, `aria-busy`, and `data-disabled`
  for state and styling, prevent click activation, and do not force a native `disabled` attribute
  onto the custom host.
- Does not keep legacy `render`, `nativeButton`, or `focusableWhenDisabled`.

## Anatomy and exported parts

```text
Button
└─ root[data-scope="button"][data-part="root"][data-slot="button-root"]
   ├─ icon, spinner, or other visual child (optional)
   └─ text label
```

Every exported root accepts `className` and receives stable hooks:

| Part     | `data-slot`   | Notes                                         |
| -------- | ------------- | --------------------------------------------- |
| `Button` | `button-root` | Root interactive surface with moduix styling. |

## Composition

```tsx
import { Button } from '@moduix/react/button';

export function SaveButton() {
  return <Button>Save Changes</Button>;
}
```

Use `asChild` when another element should own the DOM node:

```tsx
<Button asChild variant="outline">
  <a href="/docs/button">Open Button Docs</a>
</Button>
```

When an Ark part such as `DialogTrigger` or `MenuTrigger` composes Button as its child, Button
preserves the parent part's `data-scope`, `data-part`, handlers, and merged ref on the shared DOM
node while retaining its recipe classes and `data-slot`.

For icon-only buttons, use an `icon-*` size and provide an accessible name with `aria-label` or an
equivalent labeling mechanism.

## Upstream feature coverage

- `Composition`: preserved through Ark factory `asChild` behavior.
- `Ref`: forwarded to the rendered root for focus and measurement.
- `Disabled`: native `disabled` and composed `aria-disabled` states share `data-disabled`.
- `Loading`: supported through child composition with `Spinner`; the local `loading` prop adds the
  disabled and busy state wiring without taking over layout or content.
- `Chakra recipe features`: variants, sizes, icons, disabled state, loading composition, links through
  `asChild`, custom radius through CSS variables, and refs are covered. Chakra-only `colorPalette`,
  responsive recipe props, `ButtonGroup`, and managed `loadingText` / `spinnerPlacement` props are
  intentionally not exposed.
- `Dedicated primitive features`: not applicable because Ark has no dedicated `Button` component
  page for this wrapper to mirror.
- `Native button semantics`: preserved through the root `button` element and native attributes.

## Accessibility and state

- A standalone root exposes:
  - `data-scope="button"`
  - `data-part="root"`
  - `data-variant="<variant>"`
  - `data-size="<size>"`
- An Ark parent part may replace `data-scope` and `data-part` during `asChild` composition. Button
  does not overwrite those incoming anatomy attributes.
- Disabled styling is driven by `[data-disabled]`.
- `data-disabled` is present for native `disabled`, `aria-disabled="true"`, and `loading`.
- `data-loading` is present when `loading={true}`.
- `Button` forwards native button attributes and event handlers. Disabled states prevent click
  activation.
- `Button` forwards its ref to the rendered root.
- `aria-disabled="true"` on a non-button `asChild` target adds the disabled state and prevents click
  activation.
- `loading={true}` forces `aria-busy` and keeps the loading indicator content fully compositional.
- On an `asChild` host, `loading` does not inject native disabling but does prevent click activation.
- Icon-only buttons still need an accessible name through `aria-label` or equivalent labeling.

## Defaults and styling

The default `md` and `icon-md` variants use `--moduix-size-md`; the `md` text button uses `--moduix-spacing-1` block padding.
Standalone Button roots use a subtle 1px press movement with a 150ms ease-in-out transition.
Link variants, popup triggers
(`aria-haspopup`), composed parts with another `data-slot`, and reduced-motion preferences omit
the movement. This keeps InputGroupButton, SplitButton, and trigger compositions stationary.

| Entry       | Default   | Values                                                                                   |
| ----------- | --------- | ---------------------------------------------------------------------------------------- |
| `loading`   | `false`   | `boolean`                                                                                |
| `variant`   | `default` | `default`, `outline`, `secondary`, `destructive`, `destructive-outline`, `ghost`, `link` |
| `size`      | `md`      | `xs`, `sm`, `md`, `lg`, `xl`, `icon-sm`, `icon-md`, `icon-lg`                            |
| `type`      | `button`  | Native roots only; not injected into `asChild` targets                                   |
| `asChild`   | `false`   | Ark factory composition                                                                  |
| `className` | -         | Applied to the root                                                                      |

Public CSS variables (CSS Modules packages):

| Variable                       | Default/fallback                                                               |
| ------------------------------ | ------------------------------------------------------------------------------ |
| `--moduix-button-bg`           | Variant-specific; `var(--moduix-color-primary)` for `default`                  |
| `--moduix-button-bg-hover`     | Variant-specific; filled variants mix `--moduix-button-bg` 88% with black      |
| `--moduix-button-border-color` | Variant-specific; filled variants follow `--moduix-button-bg`                  |
| `--moduix-button-border-width` | `var(--moduix-border-width-sm)`                                                |
| `--moduix-button-color`        | Variant-specific; `var(--moduix-color-primary-foreground)` for `default`       |
| `--moduix-button-content-gap`  | `var(--moduix-spacing-2)`                                                      |
| `--moduix-button-font-size`    | Size-specific; `var(--moduix-text-sm)` for `md`                                |
| `--moduix-button-font-weight`  | `var(--moduix-weight-medium)`                                                  |
| `--moduix-button-height`       | Size-specific; `var(--moduix-size-md)` for `md`; also the `icon-*` square side |
| `--moduix-button-icon-size`    | `var(--moduix-spacing-4)`                                                      |
| `--moduix-button-line-height`  | Size-specific; `var(--moduix-line-height-text-sm)` for `md`                    |
| `--moduix-button-padding-x`    | Size-specific; `var(--moduix-spacing-4)` for `md`                              |
| `--moduix-button-padding-y`    | Size-specific; `var(--moduix-spacing-1)` for `md`                              |
| `--moduix-button-radius`       | `var(--moduix-radius-md)`                                                      |

Variant and size defaults live in private `--_button-*` properties. To theme one variant across the
application, set the public variables on `[data-slot='button-root'][data-variant='<variant>']`. Focus
ring, transition, and disabled opacity use foundation tokens directly.

## Intentional sugar and differences from upstream

- Ark UI has no button primitive here; moduix owns the root wrapper.
- moduix ships pre-styled defaults and the local `variant` / `size` shortcuts.
- moduix keeps loading content compositional but adds a narrow `loading` prop for the busy and
  disabled state wiring instead of copying Chakra's managed `loadingText`, `spinner`, and
  `spinnerPlacement` props.
- The old legacy `render`, `nativeButton`, and `focusableWhenDisabled` surface is removed. Use
  `asChild` for polymorphism and native `disabled` or `aria-disabled` depending on the rendered
  element.

## Agent notes

- Keep the wrapper root-only unless a real multi-part button contract appears.
- Keep `variant` and `size` synchronized across `Button.tsx`, CSS, stories, docs, and theme tokens.
- Keep the public variables generic (no per-variant or per-size names); other components no longer read
  `--moduix-button-*` colors or sizes, only the shared border, radius, font, gap, and icon variables.
- Preserve the native-root `type="button"` default and do not forward that default through
  `asChild`.
- Keep `data-disabled` synchronized with native `disabled`, `aria-disabled`, and `loading`.
- Keep native `disabled` off `asChild` hosts; preserve `aria-disabled`, `aria-busy`, and
  `data-disabled` there instead.
- Keep the disabled click capture guard: Ark composes a child's bubble handler before the wrapper's
  bubble handler, so the guard must stop composed activation before the target phase. Stopping
  propagation in the capture phase also skips every bubble listener on the target, including the
  wrapper's own `onClick`, so no second bubble guard is needed.
- Keep `loading` narrow: it owns busy/disabled state only, not spinner structure or loading text.
- Keep the `data-slot` default as `button-root`, but preserve the narrow override path for composed
  wrappers that need their own stable slot.
- Preserve incoming `data-scope` and `data-part` so Ark trigger composition keeps parent anatomy;
  do not move styling dependencies from `data-slot` onto those parent-owned attributes.
- Do not reintroduce Base button shims or converted prop names.