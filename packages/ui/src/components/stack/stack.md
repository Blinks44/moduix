# Stack

Upstream docs:

- Ark UI: no dedicated Stack primitive. Use the Ark composition and factory model: https://ark-ui.com/docs/guides/composition
- Chakra UI: https://chakra-ui.com/docs/components/stack

## Purpose

`Stack` lays out children in one vertical or horizontal flex container with common spacing,
alignment, wrapping, grow behavior, and optional separators.

## Upstream model to preserve

Ark UI does not ship a dedicated `Stack` primitive. moduix implements `Stack` as an Ark-aligned
factory wrapper with `@ark-ui/react/factory`.

Preserve the Ark composition model: one root part, DOM ownership through `asChild`, forwarded refs
to the root element, Ark-style `data-scope` / `data-part` attributes, and no Base UI `render` or
legacy `as` contract. Chakra's Stack recipe informs the public layout props and the optional
`separator` composition pattern.

## Current behavior contract

- `Stack` is the primary root component.
- `Stack.Root` is the same component exposed for Ark-style namespace consistency.
- Root accepts Ark factory div props, including `asChild`.
- Applies `data-scope="stack"`, `data-part="root"`, and `data-slot="stack-root"` on the root.
- Always applies the local root class from `Stack.module.css`, which sets `display: flex`.
- `direction` defaults to `column` by behavior.
- `fill={true}` sets `flex: 1 1 0` on the root. When omitted or `false`, the root keeps
  `flex: initial`.
- `gap`, `align`, `justify`, and `wrap` are written as inline styles only when their corresponding
  prop is provided. When omitted, normal browser flex defaults apply.
- Responsive `direction={{ mobile, desktop }}` switches at `640px` and cross-falls back when only
  one side is provided.
- `separator` renders the provided React node between children. It does not add extra spacing,
  roles, or ARIA behavior.
- The component does not add item wrappers, keyboard handling, focus management, disabled states, or
  read-only states.

## Anatomy and exported parts

```text
Stack / Stack.Root
└─ children
```

Every exported part accepts `className` and uses the standard hooks below:

| Part                   | Hook                     | Notes                                                |
| ---------------------- | ------------------------ | ---------------------------------------------------- |
| `Stack` / `Stack.Root` | `data-slot="stack-root"` | Root flex wrapper for direction, gap, and alignment. |
| `Stack` / `Stack.Root` | `data-scope="stack"`     | Ark-aligned component scope.                         |
| `Stack` / `Stack.Root` | `data-part="root"`       | Ark-aligned part name.                               |

## Composition

```tsx
import { Heading, Stack, Text } from 'moduix';
import styles from './stack.module.css';

export function Example() {
  return (
    <Stack asChild gap={12} className={styles.panel}>
      <section>
        <Heading asChild size="md">
          <h2>Project updates</h2>
        </Heading>
        <Text tone="muted">
          Use Stack when flex direction and spacing are the main layout needs.
        </Text>
        <Text tone="muted">Keep more specific layout rules in local CSS.</Text>
      </section>
    </Stack>
  );
}
```

Prefer the short `<Stack>` form for normal `div` output. Use the equivalent `<Stack.Root>` namespace
form when consistency with multipart component anatomy is useful. Use `asChild` when a semantic
element such as `section`, `article`, `nav`, or `header` should own the DOM node; the child must be
a single element that accepts `className`, `style`, and DOM attributes.

## Upstream feature coverage

- Ark composition: preserved through factory `asChild` behavior.
- Ark ref guide: the forwarded ref targets the root DOM element or the single `asChild` child.
- Ark styling: the root exposes `data-scope`, `data-part`, and `data-slot` hooks.
- Chakra Stack direction, gap, align, justify, wrap, and separator patterns are supported.
- Chakra `HStack` and `VStack` shortcut components are intentionally not exported. Use
  `direction="row"` or the default column direction.
- Dedicated Ark state, provider/context, callbacks, `ids`, form integration, and keyboard patterns
  are not applicable because `Stack` is a stateless layout primitive.

## Accessibility and state

- `Stack` has no managed state, callbacks, or ARIA behavior.
- Use `asChild` with semantic HTML or ARIA attributes when the wrapper itself should be meaningful to
  assistive technology.
- Reading order and focus order follow the JSX child order.
- `separator` is rendered as provided. Mark decorative separators with `aria-hidden="true"` or use
  semantic markup when the separator should be announced.
- There is no `Field` / `Fieldset` context integration, `HiddenInput`, `RootProvider`, or context
  hook surface.

## Defaults and styling

| Entry       | Default         | Values / Notes                                           |
| ----------- | --------------- | -------------------------------------------------------- |
| `direction` | `column`        | `column`, `row`, or `{ mobile?: ..., desktop?: ... }`    |
| `gap`       | browser default | CSS length (`number` = `px`)                             |
| `align`     | browser default | Any valid `align-items` value                            |
| `justify`   | browser default | Any valid `justify-content` value                        |
| `wrap`      | browser default | Any valid `flex-wrap` value                              |
| `fill`      | `false`         | `true` sets `flex: 1 1 0` on the root                    |
| `separator` | -               | React node rendered between children                     |
| `asChild`   | `false`         | Ark factory composition                                  |
| `className` | -               | Applied to the root                                      |
| `style`     | -               | Applied last and can override computed inline properties |

`Stack` writes these instance CSS custom properties directly on the root element:

| Variable                    | Source                    | Effect                                       |
| --------------------------- | ------------------------- | -------------------------------------------- |
| `--stack-direction-mobile`  | resolved from `direction` | Mobile `flex-direction` value.               |
| `--stack-direction-desktop` | resolved from `direction` | Desktop `flex-direction` value from `640px`. |
| `--stack-flex`              | resolved from `fill`      | Root `flex` value.                           |

These variables are instance variables, not global theme tokens. Use the `style` prop when one stack
needs to override them.

## Intentional sugar and differences from upstream

- There is no dedicated Ark Stack primitive, so `Stack` is a moduix-owned root-only wrapper rather
  than a direct primitive namespace.
- Legacy `as` was removed. Use Ark factory `asChild` instead.
- `Stack.Root` exists only for Ark-style namespace consistency; it is the same root component as
  `Stack`.
- `separator` is Chakra-informed sugar. Prefer the moduix `Separator` component for visual dividers,
  but moduix does not add `HStack`, `VStack`, item wrappers, or built-in divider styling.
- `fill` is moduix sugar for making the stack itself grow as a flex item.

## Agent notes

- Keep `Stack` a thin single-root flex primitive.
- Preserve `data-scope="stack"`, `data-part="root"`, and `data-slot="stack-root"` as stable root
  hooks.
- Preserve the current responsive direction behavior, including the mobile/desktop cross-fallback
  when only one side is provided.
- Keep `separator` structural and unstyled; use `Separator` for the standard moduix divider or
  consumer CSS for custom separators.
- Do not document `align`, `justify`, or `wrap` as component-enforced defaults; they rely on browser
  flex defaults when omitted.
- Keep the styling contract clear: `--stack-direction-*` and `--stack-flex` are inline instance
  variables, so `style` is the override escape hatch, not `className`.

## Local changelog

- 2026-06-21: Migrated `Stack` to `@ark-ui/react/factory`, added `Stack.Root`, `asChild`,
  `data-scope="stack"`, `data-part="root"`, forwarded root refs, and Chakra-informed `separator`
  composition.
- 2026-06-21: Removed the legacy `as` contract in favor of Ark factory `asChild`.
- 2026-06-03: Rewrote the local documentation around the real shipped `Stack` contract, including
  the root-only composition model, responsive-direction fallback behavior, styling hooks,
  accessibility boundaries, and instance-level CSS custom properties.
- 2026-06-03: Preserved `data-slot="stack-root"` as a stable root hook by preventing consumer props
  from overriding it accidentally.