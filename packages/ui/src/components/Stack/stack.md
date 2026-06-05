# Stack

Upstream primitive docs: none. `Stack` is a local layout primitive, not a Base UI wrapper.

## Purpose

`Stack` is a small flex wrapper for the common "put these children in a row or column with gap and
alignment" case.

Use it when the layout intent is:

- one flex container;
- one direction (`column` or `row`);
- optional gap, alignment, wrapping, and grow behavior;
- a simple mobile/desktop direction switch without a dedicated CSS file.

Use regular CSS when the layout needs grid behavior, more than two responsive breakpoints, or
styling that is easier to express in a stylesheet than in a few flex props.

## Current behavior contract

- Renders exactly one root element and forwards regular DOM props to that root.
- Applies `data-slot="stack-root"` on the root.
- Always applies the local root class from `Stack.module.css`, which sets `display: flex`.
- `direction` defaults to `column` by behavior.
- `fill={true}` sets `flex: 1 1 0` on the root. When omitted or `false`, the root keeps `flex:
initial`.
- `gap`, `align`, `justify`, and `wrap` are written as inline styles only when their corresponding
  prop is provided. When omitted, normal browser flex defaults apply.
- Responsive `direction={{ mobile, desktop }}` switches at `640px`.
- Responsive direction has a cross-fallback:
  - `direction={{ mobile: 'column' }}` also uses `column` on desktop;
  - `direction={{ desktop: 'row' }}` also uses `row` on mobile.
- The component does not add wrappers, slots, ARIA relationships, keyboard handling, focus
  management, disabled states, or read-only states.

## Composition

```text
Stack
└─ children
```

| Part    | Role                                                 |
| ------- | ---------------------------------------------------- |
| `Stack` | Root flex wrapper for direction, gap, and alignment. |

`Stack` is root-only and composition-first. Put any semantic or visual content inside it.

```tsx
import { Heading, Stack, Text } from 'moduix';

export function Example() {
  return (
    <Stack as="section" gap={12}>
      <Heading as="h2" size="md">
        Project updates
      </Heading>
      <Text tone="muted">Use Stack when flex direction and spacing are the main layout needs.</Text>
      <Text tone="muted">Keep more specific layout rules in local CSS.</Text>
    </Stack>
  );
}
```

### Common patterns

Row layout:

```tsx
<Stack direction="row" align="center" justify="space-between" gap={12}>
  <span>Status</span>
  <span>Ready to publish</span>
</Stack>
```

Responsive direction:

```tsx
<Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
  <span>Title</span>
  <span>Metadata</span>
</Stack>
```

Growing nested stack:

```tsx
<Stack direction="row" align="center" gap={12}>
  <div>Avatar</div>
  <Stack gap={8} fill>
    <div>Name</div>
    <div>Description</div>
  </Stack>
</Stack>
```

## Public props

`Stack` accepts regular `div` props plus these wrapper props:

| Prop        | Type                                                                 | Default by behavior | Notes                                                                  |
| ----------- | -------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------- |
| `as`        | `React.ElementType`                                                  | `div`               | Changes the rendered root element.                                     |
| `direction` | `'row' \| 'column' \| { mobile?: 'row' \| 'column'; desktop?: ... }` | `column`            | Supports a narrow mobile/desktop switch at `640px`.                    |
| `gap`       | `number \| string`                                                   | browser default     | Written to the CSS `gap` property. Numbers become `px`.                |
| `align`     | `CSSProperties['alignItems']`                                        | browser default     | Written to `align-items` only when provided.                           |
| `justify`   | `CSSProperties['justifyContent']`                                    | browser default     | Written to `justify-content` only when provided.                       |
| `wrap`      | `CSSProperties['flexWrap']`                                          | browser default     | Written to `flex-wrap` only when provided.                             |
| `fill`      | `boolean`                                                            | `false`             | `true` makes the root a growing flex item with `flex: 1 1 0`.          |
| `className` | `string`                                                             | —                   | Merged with the root class for local styling overrides.                |
| `style`     | `React.CSSProperties`                                                | —                   | Applied last; can override computed flex properties and CSS variables. |

`children`, `id`, `aria-*`, event handlers, and other regular DOM props are forwarded to the root.

`as` follows the same lightweight polymorphic pattern as other local layout primitives in this
package: it is convenient for semantic HTML (`section`, `article`, `nav`, `header`) and for custom
wrappers that accept `className`, `style`, and regular DOM attributes.

## Styling API

### Stable hook

| Hook                     | Purpose                            |
| ------------------------ | ---------------------------------- |
| `data-slot="stack-root"` | Stable selector for the root part. |

There are no additional slots, variant data attributes, `slotProps`, or `classNames` maps.

### Inline CSS custom properties

`Stack` writes these CSS custom properties directly on the root element:

| Variable                    | Source                    | Effect                                       |
| --------------------------- | ------------------------- | -------------------------------------------- |
| `--stack-direction-mobile`  | resolved from `direction` | Mobile `flex-direction` value.               |
| `--stack-direction-desktop` | resolved from `direction` | Desktop `flex-direction` value from `640px`. |
| `--stack-flex`              | resolved from `fill`      | Root `flex` value.                           |

Important difference from token-style variables in `theme.css`:

- these variables are **instance variables**, not global theme tokens;
- they are written as inline styles by the component;
- `className` rules cannot override them, because the inline style wins;
- use the `style` prop if you intentionally need to override them.

Example:

```tsx
<Stack
  direction="row"
  style={{
    '--stack-direction-mobile': 'column',
  }}
/>
```

The root also accepts normal flex styling overrides through `className` and `style`. For example,
backgrounds, borders, padding, or width belong in local CSS, not in the component API.

## Accessibility and UX notes

- `Stack` has no intrinsic semantics. Use `as="section"`, `as="article"`, `as="nav"`, or ARIA
  attributes when the wrapper itself should be meaningful to assistive technology.
- Because it is a normal flex container, reading order and focus order follow the child order in JSX.
- The component is non-interactive. It does not manage keyboard navigation, roving focus, disabled
  state, pressed state, or read-only behavior.
- `fill` affects the stack as a flex **item**, not its children. It is useful only when the parent is
  already a flex container.
- Responsive `direction` is intentionally narrow. If a layout needs tablet breakpoints, gap changes,
  or more complex responsive behavior, prefer local CSS over expanding `Stack`.

## Limitations and recommendations

- `Stack` is intentionally small. It does not provide grid layout, item-level alignment props, slot
  bags, per-breakpoint gap props, or variant presets.
- Keep visual surface styling in local CSS. `Stack` should stay a layout primitive, not become a card,
  panel, or list abstraction.
- Prefer plain composition over adding convenience props for every flex feature. The current API is
  meant to cover the common path only.
- When preview examples use custom surface styling, include the same wrapper classes in the shown code
  so consumers can understand why the preview looks the way it does.

## Intentional differences from Base UI

- There is no upstream Base UI primitive behind this component in our implementation.
- The local contract is one exported root component rather than a compound primitive API.
- There is no render-prop model, state model, slot props API, or `asChild` abstraction.
- Styling is driven by the root class, normal DOM props, and a few inline CSS custom properties.

## Agent notes

- Keep `Stack` a thin single-root flex primitive.
- Preserve `data-slot="stack-root"` as a stable root hook.
- Preserve the current responsive direction behavior, including the mobile/desktop cross-fallback when
  only one side is provided.
- Do not document `align`, `justify`, or `wrap` as component-enforced defaults; they rely on browser
  flex defaults when omitted.
- Keep the styling contract clear: `--stack-direction-*` and `--stack-flex` are inline instance
  variables, so `style` is the override escape hatch, not `className`.
- Add DX sugar only when it removes repeated real-world boilerplate without hiding the simple
  composition model. No additional sugar is justified in the current implementation.

## Local changelog

- 2026-06-03: Rewrote the local documentation around the real shipped `Stack` contract, including the
  root-only composition model, responsive-direction fallback behavior, styling hooks, accessibility
  boundaries, and instance-level CSS custom properties.
- 2026-06-03: Preserved `data-slot="stack-root"` as a stable root hook by preventing consumer props
  from overriding it accidentally.