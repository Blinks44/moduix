# Text (Solid)

Upstream docs (accessed 2026-08-13):

- Ark UI: no dedicated Text primitive; use https://ark-ui.com/docs/guides/composition#the-ark-factory,
  https://ark-ui.com/docs/guides/composition, https://ark-ui.com/docs/guides/styling, and
  https://ark-ui.com/docs/guides/ref
- Chakra UI: https://chakra-ui.com/docs/components/text
- shadcn/ui: no dedicated Text primitive; use https://ui.shadcn.com/docs/components/typography for
  consumer-facing typography examples.

## Purpose

`Text` is the moduix typography root for body copy, inline copy, helper text, simple semantic
emphasis, and constrained text previews.

## Upstream model to preserve

Ark UI does not ship a `Text` component. The wrapper follows Ark's factory/composition model with
`@ark-ui/solid/factory`, `HTMLArkProps`, a render-function `asChild`, `Dynamic` element switching,
`data-scope="text"`, and `data-part="root"`.

Chakra's `Text` recipe informs the supported typography surface: size, weight, truncation, line
clamp, and access to the underlying element. There are no Ark state machines, callbacks, providers,
context hooks, hidden inputs, ids, keyboard interactions, or controlled/uncontrolled modes to
preserve.

## Current behavior contract

`Text` renders one root element through the flat root export.

Default behavior:

| Prop        | Default         | Values                                                 |
| ----------- | --------------- | ------------------------------------------------------ |
| `as`        | `p`             | `p`, `span`, `small`, `strong`, `em`, `div`            |
| `asChild`   | `false`         | boolean or render function                             |
| `size`      | Element-based   | `xs`, `sm`, `md`, `lg`, `xl`                           |
| `weight`    | Element-based   | `regular`, `medium`, `semibold`, `bold`                |
| `tone`      | `default`       | `default`, `muted`, `subtle`, `primary`, `destructive` |
| `align`     | Unset (`start`) | `start`, `center`, `end`, `left`, `right`, `justify`   |
| `truncate`  | `false`         | boolean                                                |
| `lineClamp` | Unset           | Positive integer; other values disable clamping.       |

Element-based defaults:

- default root (`p`) -> `size="md"`, `weight="regular"`
- `as="small"` -> `size="sm"`, `weight="regular"`
- `as="strong"` -> `size="md"`, `weight="semibold"`
- every other root -> `size="md"`, `weight="regular"`

## Anatomy and exported parts

```text
Text
└─ text or inline content
```

| Part                 | data-slot   | Notes                                           |
| -------------------- | ----------- | ----------------------------------------------- |
| `Text`              | `text-root` | Ark factory root with typography styling hooks. |

## Composition

Canonical usage:

```tsx
import { Text } from '@moduix/solid/text';

export function Example() {
  return <Text>Use text to describe interface state and supporting details.</Text>;
}
```

Use `class` (not React `className`) for consumer utilities and overrides:

```tsx
<Text class="uppercase">Release candidate</Text>
```

Use `as` for supported intrinsic semantics:

```tsx
<Text as="small" tone="muted">
  Last updated 2 minutes ago
</Text>
```

Use the Ark Solid render-function `asChild` for a single custom host element:

```tsx
<Text
  asChild={(props) => (
    <a {...props()} href="/docs">
      Read the documentation
    </a>
  )}
  tone="primary"
  weight="medium"
/>
```

When `asChild` is used, the host owns the semantic element and must be a single accessible element
that can receive the forwarded props, class, data attributes, style, and ref. Ark Solid does not
forward a ref through an `asChild` render function, so ordinary refs and custom-host composition
remain separate native paths.

Ordinary refs flow to the rendered root through Solid's native `ref` prop:

```tsx
<Text ref={(element) => (root = element)} />
```

## Upstream feature coverage

- Ark composition guide: covered by `ark.*`, `HTMLArkProps`, the render-function `asChild`, and
  `Dynamic` element switching.
- Ark styling guide: covered by `data-scope`, `data-part`, `data-slot`, local state-like data
  attributes, `class`, and public CSS variables.
- Ark ref guide: covered by Solid's native `ref` prop reaching the rendered root element.
- Chakra usage: covered by the default body text root.
- Chakra sizes: covered by `size`.
- Chakra weights: covered by `weight`.
- Chakra truncation: covered by `truncate`.
- Chakra line clamp: covered by `lineClamp`.

## Accessibility and state

`Text` keeps native semantics. Use `as` or `asChild` to choose the correct HTML meaning instead of
adding ARIA to the default paragraph.

The component has no interactive state, keyboard behavior, focus lifecycle, Field/Fieldset context,
HiddenInput, ids, callback detail objects, provider, context, or RootProvider API. `truncate` and
`lineClamp` are CSS-only rendering constraints; they do not provide disclosure or screen reader
behavior. `lineClamp` accepts positive integers only; other values disable clamping. If `truncate`
and `lineClamp` are both passed, line clamp remains the effective visual constraint.

Root attributes:

- `data-scope="text"`
- `data-part="root"`
- `data-slot="text-root"`
- `data-size`
- `data-weight`
- `data-tone`
- `data-align` when `align` is set
- `data-truncate` when `truncate` is true
- `data-line-clamp` when `lineClamp` is set

## Defaults and styling

The root accepts `class`, `style`, native paragraph props from `HTMLArkProps<'p'>`, and `asChild`.
Base styles reset margin to `0`, use logical `text-align: start`, and wrap long words with
`overflow-wrap: anywhere`.

Solid merges the `lineClamp` prop value into `style` as the internal `--_text-line-clamp` carrier,
supporting both string and object styles; React works with object styles only. The public CSS
variable `--moduix-text-line-clamp` still overrides the prop fallback.

The CSS module is intentionally identical to the React component, including rule order so the
`[data-line-clamp]` block keeps precedence over `[data-truncate]` at equal specificity.

Public CSS variables:

| Variable                             | Default                                    |
| ------------------------------------ | ------------------------------------------ |
| `--moduix-text-default-color`        | `var(--moduix-color-foreground)`           |
| `--moduix-text-destructive-color`    | `var(--moduix-color-destructive)`          |
| `--moduix-text-font-family`          | `inherit`                                  |
| `--moduix-text-font-size-xs`         | `var(--moduix-text-xs)`                    |
| `--moduix-text-font-size-sm`         | `var(--moduix-text-sm)`                    |
| `--moduix-text-font-size-md`         | `var(--moduix-text-md)`                    |
| `--moduix-text-font-size-lg`         | `var(--moduix-text-lg)`                    |
| `--moduix-text-font-size-xl`         | `var(--moduix-text-xl)`                    |
| `--moduix-text-font-weight-bold`     | `var(--moduix-weight-bold)`                |
| `--moduix-text-font-weight-medium`   | `var(--moduix-weight-medium)`              |
| `--moduix-text-font-weight-regular`  | `var(--moduix-weight-regular)`             |
| `--moduix-text-font-weight-semibold` | `var(--moduix-weight-semibold)`            |
| `--moduix-text-letter-spacing`       | `0`                                        |
| `--moduix-text-line-clamp`           | overrides the `lineClamp` prop fallback    |
| `--moduix-text-line-height-xs`       | `var(--moduix-line-height-text-xs)`        |
| `--moduix-text-line-height-sm`       | `var(--moduix-line-height-text-sm)`        |
| `--moduix-text-line-height-md`       | `var(--moduix-line-height-text-md)`        |
| `--moduix-text-line-height-lg`       | `var(--moduix-line-height-text-lg)`        |
| `--moduix-text-line-height-xl`       | `var(--moduix-line-height-text-xl)`        |
| `--moduix-text-muted-color`          | `var(--moduix-color-muted-foreground)`     |
| `--moduix-text-primary-color`        | `var(--moduix-color-primary)`              |
| `--moduix-text-subtle-color`         | `var(--moduix-color-secondary-foreground)` |

## Intentional sugar and differences from upstream

moduix adds a constrained semantic `as` union, visual `tone` presets, default variants for `small`
and `strong`, stable `data-slot`, and theme variables.

Solid uses `class` and a render-function `asChild` rather than React `className` and child syntax.
There is no legacy `render` prop. Custom host composition now uses Ark-style `asChild`. Advanced
consumers should derive prop details from the component itself or import Ark utility types directly
when they need upstream typing helpers.

## Agent notes

- Keep `Text` root-only. Do not add subparts, local state, callback props, rich-text parsing, or
  layout spacing.
- Keep `Text` as the only public root value. It is a root-only component and does not need namespace
  composition.
- Keep the explicit `data-*` declarations in `TextProps`: Solid JSX types have no `data-*`
  signature and `splitProps` requires literal keys.
- If new variants or `--moduix-text-*` variables are added, update this file, the React contract
  doc, docs examples, theme tokens, and registry artifacts in the same task.

## Local changelog

- 2026-09-20: Added this Solid contract doc, ported from the React contract with Solid-specific
  composition notes (`class`, render-function `asChild`, native refs, style merge for
  `--_text-line-clamp`).
