# Button

Upstream docs:

- Ark UI: https://ark-ui.com/docs/guides/composition
- Ark UI Styling: https://ark-ui.com/docs/guides/styling
- Chakra UI: https://chakra-ui.com/docs/components/button

## Purpose

`Button` is the moduix action control built as an Ark-style factory wrapper.

Ark UI does not ship a dedicated button primitive, so moduix exposes `Button.Root` on top of
`@ark-ui/react/factory` and keeps the wrapper limited to styling, `data-slot`, and `asChild`
composition.

## Upstream model to preserve

- Uses the Ark factory composition model instead of a dedicated Ark primitive.
- Uses Chakra Button as the nearest recipe-level reference for a single-part action control.
- Keeps the API intentionally small: one root part with polymorphic DOM ownership through `asChild`.
- Keeps native button semantics and attributes intact on the root.

## Current behavior contract

- Uses one Ark-aligned root part: `Button.Root`.
- Keeps `Button` as a callable alias of `Button.Root`.
- Supports Ark factory root props such as `asChild`, `className`, `style`, event handlers, and
  native button attributes.
- `variant`, `size`, and `loading` are the local root props. `variant` and `size` map to
  `data-variant` and `data-size`; `loading` sets `data-loading`, `aria-busy`, and the disabled
  styling path.
- The package exports only the `Button` value. Derive its props with
  `React.ComponentProps<typeof Button>` when a wrapper needs them.
- Native roots default to `type="button"`; pass `type="submit"` explicitly for form submission.
- `disabled`, `aria-disabled="true"`, and `loading` expose `data-disabled`.
- The forwarded ref targets the rendered button element.
- Writes `data-scope="button"`, `data-part="root"`, and `data-slot="button-root"` on a standalone
  root by default. When an Ark parent composes Button as its `asChild` trigger, incoming
  `data-scope` and `data-part` take precedence so the parent anatomy survives; `data-slot` remains
  the stable moduix styling hook and can still be narrowed by composed wrappers.
- When `asChild` is enabled, the wrapper keeps `aria-disabled`, `aria-busy`, and `data-disabled`
  for state and styling, but it does not force a native `disabled` attribute onto the custom host.
- Does not keep legacy `render`, `nativeButton`, or `focusableWhenDisabled`.

## Anatomy and exported parts

```text
Button.Root
└─ root[data-scope="button"][data-part="root"][data-slot="button-root"]
   ├─ icon, spinner, or other visual child (optional)
   └─ text label
```

Every exported root accepts `className` and receives stable hooks:

| Part          | `data-slot`   | Notes                                         |
| ------------- | ------------- | --------------------------------------------- |
| `Button.Root` | `button-root` | Root interactive surface with moduix styling. |
| `Button`      | alias of root | Callable alias of `Button.Root`.              |

## Composition

```tsx
import { Button } from '@moduix/react';

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

When an Ark part such as `Dialog.Trigger` or `Menu.Trigger` composes Button as its child, Button
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
- `Button.Root` forwards native button attributes and event handlers without wrapper translation.
- `Button.Root` forwards its ref to the rendered root.
- `aria-disabled` on a non-button `asChild` target does not block activation by itself. Application
  code must prevent navigation or activation.
- `loading={true}` forces `aria-busy` and keeps the loading indicator content fully compositional.
- On an `asChild` host, `loading` does not inject native disabling. Keep navigation or activation
  suppression in application code.
- Icon-only buttons still need an accessible name through `aria-label` or equivalent labeling.

## Defaults and styling

The default `md` and `icon-md` variants use `--size-md`; the `md` text button uses `--spacing-1` block padding.

| Entry       | Default   | Values                                                                                   |
| ----------- | --------- | ---------------------------------------------------------------------------------------- |
| `loading`   | `false`   | `boolean`                                                                                |
| `variant`   | `default` | `default`, `outline`, `secondary`, `destructive`, `destructive-outline`, `ghost`, `link` |
| `size`      | `md`      | `xs`, `sm`, `md`, `lg`, `xl`, `icon-sm`, `icon-md`, `icon-lg`                            |
| `type`      | `button`  | Native roots only; not injected into `asChild` targets                                   |
| `asChild`   | `false`   | Ark factory composition                                                                  |
| `className` | -         | Applied to the root                                                                      |

Primary CSS variables:

| Variable                                            | Default/fallback                                                                |
| --------------------------------------------------- | ------------------------------------------------------------------------------- |
| `--button-border-width`                             | `var(--border-width-sm)`                                                        |
| `--button-color`                                    | `var(--color-foreground)`                                                       |
| `--button-content-gap`                              | `var(--spacing-2)`                                                              |
| `--button-default-bg`                               | `var(--color-primary)`                                                          |
| `--button-default-bg-hover`                         | `color-mix(in srgb, var(--button-default-bg, var(--color-primary)) 88%, black)` |
| `--button-default-border-color`                     | `var(--color-primary)`                                                          |
| `--button-default-color`                            | `var(--color-primary-foreground)`                                               |
| `--button-destructive-bg`                           | `var(--color-destructive)`                                                      |
| `--button-destructive-border-color`                 | `var(--color-destructive)`                                                      |
| `--button-destructive-color`                        | `var(--color-primary-foreground)`                                               |
| `--button-destructive-hover-brightness`             | `0.96`                                                                          |
| `--button-destructive-outline-bg`                   | `var(--color-background)`                                                       |
| `--button-destructive-outline-bg-hover`             | `var(--color-destructive)`                                                      |
| `--button-destructive-outline-border-color`         | `var(--color-destructive)`                                                      |
| `--button-destructive-outline-color`                | `var(--color-destructive)`                                                      |
| `--button-destructive-outline-color-hover`          | `var(--button-destructive-color)`                                               |
| `--button-disabled-opacity`                         | `var(--opacity-disabled)`                                                       |
| `--button-focus-ring-color`                         | `var(--color-ring)`                                                             |
| `--button-focus-ring-offset`                        | `var(--button-border-width)`                                                    |
| `--button-focus-ring-width`                         | `var(--border-width-md)`                                                        |
| `--button-font-size`                                | `var(--text-sm)`                                                                |
| `--button-font-size-xs` / `--button-line-height-xs` | `var(--text-xs)` / `var(--line-height-text-xs)`                                 |
| `--button-font-size-lg` / `--button-line-height-lg` | `var(--text-md)` / `var(--line-height-text-md)`                                 |
| `--button-font-size-xl` / `--button-line-height-xl` | `var(--text-lg)` / `var(--line-height-text-lg)`                                 |
| `--button-font-weight`                              | `var(--weight-medium)`                                                          |
| `--button-ghost-bg`                                 | `transparent`                                                                   |
| `--button-ghost-bg-hover`                           | `var(--color-accent)`                                                           |
| `--button-ghost-border-color`                       | `transparent`                                                                   |
| `--button-ghost-color`                              | `var(--color-foreground)`                                                       |
| `--button-icon-size`                                | `1rem`                                                                          |
| `--button-line-height`                              | `var(--line-height-text-sm)`                                                    |
| `--button-link-color`                               | `var(--color-primary)`                                                          |
| `--button-link-color-hover`                         | `var(--color-foreground)`                                                       |
| `--button-link-text-decoration`                     | `underline`                                                                     |
| `--button-link-underline-offset`                    | `0.25em`                                                                        |
| `--button-outline-bg`                               | `var(--color-background)`                                                       |
| `--button-outline-bg-hover`                         | `var(--color-accent)`                                                           |
| `--button-outline-border-color`                     | `var(--color-border)`                                                           |
| `--button-outline-color`                            | `var(--color-foreground)`                                                       |
| `--button-padding-x-xs` / `--button-padding-y-xs`   | `0.625rem` / `0.25rem`                                                          |
| `--button-padding-x-sm` / `--button-padding-y-sm`   | `0.75rem` / `0.375rem`                                                          |
| `--button-padding-x-md` / `--button-padding-y-md`   | `1rem` / `0.5rem`                                                               |
| `--button-padding-x-lg` / `--button-padding-y-lg`   | `1.25rem` / `0.625rem`                                                          |
| `--button-padding-x-xl` / `--button-padding-y-xl`   | `1.5rem` / `0.75rem`                                                            |
| `--button-radius`                                   | `var(--radius-md)`                                                              |
| `--button-secondary-bg`                             | `var(--color-secondary)`                                                        |
| `--button-secondary-bg-hover`                       | `var(--color-accent)`                                                           |
| `--button-secondary-border-color`                   | `var(--color-secondary)`                                                        |
| `--button-secondary-color`                          | `var(--color-secondary-foreground)`                                             |
| `--button-size-icon-sm`                             | `var(--size-sm)`                                                                |
| `--button-size-icon-md`                             | `var(--size-lg)`                                                                |
| `--button-size-icon-lg`                             | `var(--size-xl)`                                                                |
| `--button-size-xs`                                  | `var(--size-xs)`                                                                |
| `--button-size-sm`                                  | `var(--size-sm)`                                                                |
| `--button-size-md`                                  | `var(--size-lg)`                                                                |
| `--button-size-lg`                                  | `var(--size-xl)`                                                                |
| `--button-size-xl`                                  | `3.5rem`                                                                        |
| `--button-transition`                               | `var(--transition-default)`                                                     |

## Intentional sugar and differences from upstream

- Ark UI has no button primitive here; moduix owns the root wrapper.
- moduix ships pre-styled defaults and the local `variant` / `size` shortcuts.
- moduix keeps loading content compositional but adds a narrow `loading` prop for the busy and
  disabled state wiring instead of copying Chakra's managed `loadingText`, `spinner`, and
  `spinnerPlacement` props.
- moduix accepts optional `data-icon="inline-start|inline-end"` hooks on child icon or spinner
  elements for explicit inline icon styling without introducing icon props.
- The old legacy `render`, `nativeButton`, and `focusableWhenDisabled` surface is removed. Use
  `asChild` for polymorphism and native `disabled` or `aria-disabled` depending on the rendered
  element.

## Agent notes

- Keep the wrapper root-only unless a real multi-part button contract appears.
- Keep `variant` and `size` synchronized across `Button.tsx`, CSS, stories, docs, and theme tokens.
- Preserve the native-root `type="button"` default and do not forward that default through
  `asChild`.
- Keep `data-disabled` synchronized with native `disabled`, `aria-disabled`, and `loading`.
- Keep native `disabled` off `asChild` hosts; preserve `aria-disabled`, `aria-busy`, and
  `data-disabled` there instead.
- Keep `loading` narrow: it owns busy/disabled state only, not spinner structure or loading text.
- Keep the `data-slot` default as `button-root`, but preserve the narrow override path for composed
  wrappers that need their own stable slot.
- Preserve incoming `data-scope` and `data-part` so Ark trigger composition keeps parent anatomy;
  do not move styling dependencies from `data-slot` onto those parent-owned attributes.
- Do not reintroduce Base button shims or converted prop names.

## Local changelog

- 2026-07-21: Reduced the default `md` and `icon-md` controls to `--size-md` and compacted `md` padding.

- 2026-07-12: Preserved parent Ark `data-scope` and `data-part` values when Button is composed as a
  trigger child, while retaining passthrough handlers, merged refs, recipe styling, and the stable
  `data-slot` hook.
- 2026-07-09: Stopped forcing native `disabled` onto `asChild` hosts, documented the `loading`
  contract for custom hosts, and added optional `data-icon` styling hooks for inline icons and
  spinners.
- 2026-07-07: Added narrow `loading` state sugar that sets `data-loading`, `aria-busy`, and the
  disabled styling path, softened the default hover fallback, and aligned link sizing plus press
  feedback with the recommended usage contract.
- 2026-07-02: Removed the public `ButtonRootProps`, `ButtonSize`, and `ButtonVariant` aliases while
  preserving the callable root and all local variant, size, composition, state, and styling sugar.
- 2026-06-25: Allowed composed wrappers to override only the root `data-slot` while keeping
  `data-scope="button"` and `data-part="root"` locked to Button.
- 2026-06-24: Finalized the Ark factory review by locking the root data hooks after passthrough
  props, simplifying disabled CSS to the shared `data-disabled` state, and aligning docs with the
  local-only Ark factory API reference text.
- 2026-06-18: Restored safe `type="button"` behavior for native roots, added Ark-style
  `data-disabled`, documented ref forwarding and Chakra recipe coverage, and kept `asChild`
  free of injected button-only defaults.
- 2026-06-17: Migrated `Button` from legacy to an Ark-style factory wrapper, added `Button.Root`
  plus the callable `Button` alias, and replaced `render` / `nativeButton` with `asChild`.
- 2026-06-17: Switched disabled styling hooks to native `[disabled]` and `[aria-disabled='true']`
  for the root-only Ark surface.