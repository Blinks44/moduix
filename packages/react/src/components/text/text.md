# Text

Upstream docs:

- Ark UI: no dedicated Text primitive; use https://ark-ui.com/docs/guides/composition#the-ark-factory,
  https://ark-ui.com/docs/guides/composition, https://ark-ui.com/docs/guides/styling, and
  https://ark-ui.com/docs/guides/ref
- Chakra UI: https://chakra-ui.com/docs/components/text

## Purpose

`Text` is the moduix typography root for body copy, inline copy, helper text, simple semantic
emphasis, and constrained text previews.

## Upstream model to preserve

Ark UI does not ship a `Text` component. The wrapper follows Ark's factory/composition model with
`@ark-ui/react/factory`, `HTMLArkProps`, `asChild`, forwarded refs, `data-scope="text"`, and
`data-part="root"`.

Chakra's `Text` recipe informs the supported typography surface: size, weight, truncation, line
clamp, and access to the underlying element ref. There are no Ark state machines, callbacks,
providers, context hooks, hidden inputs, ids, keyboard interactions, or controlled/uncontrolled
modes to preserve.

## Current behavior contract

`Text` renders one root element. The short `<Text>` form and `<Text.Root>` are equivalent.

Default behavior:

| Prop        | Default         | Values                                                 |
| ----------- | --------------- | ------------------------------------------------------ |
| `as`        | `p`             | `p`, `span`, `small`, `strong`, `em`, `div`            |
| `asChild`   | `false`         | boolean                                                |
| `size`      | Element-based   | `xs`, `sm`, `md`, `lg`, `xl`                           |
| `weight`    | Element-based   | `regular`, `medium`, `semibold`, `bold`                |
| `tone`      | `default`       | `default`, `muted`, `subtle`, `primary`, `destructive` |
| `align`     | Unset (`start`) | `left`, `center`, `right`                              |
| `truncate`  | `false`         | boolean                                                |
| `lineClamp` | Unset           | number                                                 |

Element-based defaults:

- default root (`p`) -> `size="md"`, `weight="regular"`
- `as="small"` -> `size="sm"`, `weight="regular"`
- `as="strong"` -> `size="md"`, `weight="semibold"`
- every other root -> `size="md"`, `weight="regular"`

## Anatomy and exported parts

```text
Text / Text.Root
└─ text or inline content
```

| Part                 | data-slot   | Notes                                           |
| -------------------- | ----------- | ----------------------------------------------- |
| `Text` / `Text.Root` | `text-root` | Ark factory root with typography styling hooks. |

## Composition

Canonical usage:

```tsx
import { Text } from '@moduix/react';

export function Example() {
  return <Text>Use text to describe interface state and supporting details.</Text>;
}
```

Use `as` for supported intrinsic semantics:

```tsx
<Text as="small" tone="muted">
  Last updated 2 minutes ago
</Text>
```

Use `asChild` for a single custom host element:

```tsx
<Text asChild tone="primary" weight="medium">
  <a href="/docs">Read the documentation</a>
</Text>
```

When `asChild` is used, the child owns the semantic element and must be a single accessible element
that can receive the forwarded props, class name, data attributes, style, and ref.

## Upstream feature coverage

- Ark composition guide: covered by `ark.*`, `HTMLArkProps`, forwarded refs, and `asChild`.
- Ark styling guide: covered by `data-scope`, `data-part`, `data-slot`, local state-like data
  attributes, `className`, and public CSS variables.
- Ark ref guide: covered by forwarding the ref to the rendered root element.
- Chakra usage: covered by the default body text root.
- Chakra sizes: covered by `size`.
- Chakra weights: covered by `weight`.
- Chakra truncation: covered by `truncate`.
- Chakra line clamp: covered by `lineClamp`.
- Chakra ref: covered by `forwardRef` to the root host.

## Accessibility and state

`Text` keeps native semantics. Use `as` or `asChild` to choose the correct HTML meaning instead of
adding ARIA to the default paragraph.

The component has no interactive state, keyboard behavior, focus lifecycle, Field/Fieldset context,
HiddenInput, ids, callback detail objects, provider, context, or RootProvider API. `truncate` and
`lineClamp` are CSS-only rendering constraints; they do not provide disclosure or screen reader
behavior. If `truncate` and `lineClamp` are both passed, line clamp remains the effective visual
constraint.

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

The root accepts `className`, `style`, native paragraph props from `HTMLArkProps<'p'>`, and `asChild`.
Its ref is typed as `HTMLElement` because every supported `as` value and an `asChild` host can render
a different native element. Base styles reset margin to `0`, use logical `text-align: start`, and
wrap long words with `overflow-wrap: break-word`.

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
| `--moduix-text-line-clamp`           | set by `lineClamp`                         |
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

There is no legacy `render` prop. Custom host composition now uses Ark-style `asChild`.
Advanced consumers should derive prop details from the component itself or import Ark utility types
directly when they need upstream typing helpers.

## Agent notes

- Keep `Text` root-only. Do not add subparts, local state, callback props, rich-text parsing, or
  layout spacing.
- Keep `Text.Root` attached so root-only docs can teach short `<Text>` while preserving Ark-style
  namespace composition.
- If new variants or `--moduix-text-*` variables are added, update this file, docs examples, theme tokens,
  and registry artifacts in the same task.

## Local changelog

- 2026-07-11: Widened the root ref type to `HTMLElement` so it remains accurate for every supported
  semantic root and `asChild` host.
- 2026-06-27: Re-audited the local Ark factory contract, simplified default variant resolution,
  preserved root data hooks after passthrough props, aligned docs API text with local-only
  components, and fixed `lineClamp` when `truncate` is also present.
- 2026-07-03: Dropped duplicate public type exports so `Text` matches the smaller callable-root
  surface used by other simplified components.
- 2026-06-21: Migrated `Text` from legacy `useRender` to Ark factory, replaced `render` with
  `asChild`, added `Text.Root`, forwarded refs, Ark-style root data attributes, and Chakra-informed
  `truncate` / `lineClamp` props.
- 2026-06-03: Rewrote the local documentation around the shipped moduix `Text` contract, including
  defaults, composition, styling hooks, CSS variables, accessibility guidance, and exported types.