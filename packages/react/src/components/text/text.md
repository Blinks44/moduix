# Text

Upstream docs (accessed 2026-10-23):

- Ark UI: no dedicated Text primitive; use https://ark-ui.com/docs/guides/composition,
  https://ark-ui.com/docs/guides/styling, and https://ark-ui.com/docs/guides/ref
- Chakra UI: https://chakra-ui.com/docs/components/text
- shadcn/ui: no Text primitive; see https://ui.shadcn.com/docs/components/typography

## Purpose

`Text` renders body copy, inline copy, helper text, simple emphasis, and clamped previews on the
moduix typography scale.

## Upstream model to preserve

Ark UI does not ship a text primitive. moduix implements `Text` as a thin `@ark-ui/react/factory`
wrapper: one root part, `as` for the semantic element, Ark factory `asChild` for custom host
composition, and ref forwarding to the rendered element. Chakra's `Text` informs `truncate` and
`lineClamp`.

## Current behavior contract

- `Text` is the only public component value.
- Exports the `TextRootProps`, `TextElement`, `TextSize`, `TextWeight`, `TextTone`, and `TextAlign`
  types.
- The root renders `p` by default and accepts `as="p"`, `span`, `small`, `strong`, `em`, or `div`.
- `size` defaults to `sm` for `as="small"` and `md` otherwise; `weight` defaults to `semibold` for
  `as="strong"` and `regular` otherwise. With `asChild`, the defaults follow `as`, not the child.
- `tone` defaults to `default` (foreground color).
- `align` is unset by default, so `Text` inherits the container alignment.
- `truncate` clips to one line with an ellipsis. `lineClamp` accepts positive integers only and is
  applied inline as `-webkit-line-clamp`; other values disable clamping. With both, `lineClamp` wins.
- The root always emits `data-scope="text"`, `data-part="root"`, `data-slot="text-root"`, and the
  resolved `data-size`, `data-weight`, and `data-tone`, set after the consumer props. `data-align`,
  `data-truncate`, and `data-line-clamp` appear only when the matching prop is active.
- The ref is typed as `HTMLElement` because `as` and `asChild` can render different elements.
- The component has no managed state, callbacks, keyboard behavior, or ARIA abstraction.

## Composition

```tsx
import { Text } from '@moduix/react/text';

export function Example() {
  return (
    <Text as="small" tone="muted">
      Last updated 2 minutes ago
    </Text>
  );
}
```

Use `asChild` only when one existing element must own the DOM node:

```tsx
<Text asChild tone="primary" weight="medium">
  <a href="/docs">Read the documentation</a>
</Text>
```

## Accessibility

- `Text` keeps native semantics; choose `as` or `asChild` for meaning instead of adding ARIA.
- `truncate` and `lineClamp` only constrain rendering; disclosure belongs to the surrounding UI.

## Defaults and styling

| Entry       | Default         | Values / Notes                                       |
| ----------- | --------------- | ---------------------------------------------------- |
| `as`        | `p`             | `p`, `span`, `small`, `strong`, `em`, `div`          |
| `size`      | from `as`       | `xs`, `sm`, `md`, `lg`, `xl`                         |
| `weight`    | from `as`       | `regular`, `medium`, `semibold`, `bold`              |
| `tone`      | `default`       | `default`, `muted`, `primary`, `destructive`         |
| `align`     | unset (inherit) | `start`, `center`, `end`, `left`, `right`, `justify` |
| `truncate`  | `false`         | boolean                                              |
| `lineClamp` | unset           | positive integer                                     |
| `asChild`   | `false`         | Ark factory composition                              |

CSS Modules use foundation typography and color tokens directly and have no component variables; a
consumer class overrides the layered styles. The root sets `margin: 0`, `letter-spacing: 0`, and
`overflow-wrap: anywhere`. Tailwind adapters apply the same values through utilities.

## Agent notes

- Keep `Text` root-only and stateless. Do not add subparts, rich-text parsing, or layout spacing.
- Resolve size and weight defaults in the component, not from the element in CSS.
- Do not set a default `text-align`; it would stop `Text` from inheriting the container alignment.
- Do not reintroduce a `--moduix-text-*` variable family; a class on the root is the override path.
- `tone="default"` sets the foreground color on purpose: foundation does not style `body`, so an
  inherited color could be the browser black in dark mode.