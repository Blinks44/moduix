# List

There is no Base UI primitive behind `List`. It is a small native wrapper over `ul`, `ol`, and `li`
that keeps browser list semantics and adds moduix typography and spacing tokens.

## Purpose

Use `List` when you need:

- native list semantics with design-system spacing and typography;
- a small marker API for the common `disc`, `decimal`, and markerless cases;
- stable styling hooks for the root and optional item wrapper without inventing a custom parts system.

Use plain HTML lists when you do not need the design-system styling contract. Use `Text` or `Heading`
for non-list typography.

## Current behavior contract

`List` renders exactly one semantic root:

- `ul` by default;
- `ol` when `as="ol"` is passed.

The root always receives:

- `data-slot="list-root"`;
- `data-gap`;
- `data-marker`;
- `data-marker-mode="auto" | "explicit"`;
- `data-size`;
- `data-tone`.

`ListItem` renders a plain `li` with `data-slot="list-item"`.

Important behavior details:

- the root styles **direct `li` children only**;
- `ListItem` is optional and exists mainly for the stable item slot;
- when `marker="none"`, the component adds `role="list"` unless the caller already passed `role`;
- ordered-list props like `start`, `reversed`, and `type` still pass through to the underlying `ol`;
- native ordered-list `type` markers are preserved when `marker` is left on the default ordered path;
- explicitly setting `marker="decimal"` forces decimal markers even if `type` is also present.

Default behavior:

| Prop     | Default   | Values                                                 |
| -------- | --------- | ------------------------------------------------------ |
| `as`     | `ul`      | `ul`, `ol`                                             |
| `marker` | by `as`   | `disc`, `decimal`, `none`                              |
| `gap`    | `sm`      | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`                    |
| `size`   | `md`      | `xs`, `sm`, `md`, `lg`, `xl`                           |
| `tone`   | `default` | `default`, `muted`, `subtle`, `primary`, `destructive` |

## Basic usage

```tsx
import { List, ListItem } from 'moduix';

export function Example() {
  return (
    <List>
      <ListItem>Use semantic list markup for grouped content.</ListItem>
      <ListItem>Keep spacing and typography on the library scale.</ListItem>
      <ListItem>Style markers with CSS variables or native ::marker selectors.</ListItem>
    </List>
  );
}
```

## Composition

```text
List (ul | ol)
└─ li | ListItem
```

Recommended usage:

- use `as` to choose unordered vs ordered semantics;
- use `marker` only for the common marker presets or to hide markers;
- use `ListItem` when a stable item slot is useful for styling or testing;
- use plain `li` elements when an extra wrapper component adds no value;
- keep the children as direct `li` descendants so root spacing and markers keep working.

`List` does not expose slot prop bags, marker render props, nested structure helpers, or stateful
behavior. Layout around the list stays outside the component.

### Ordered lists

```tsx
import { List, ListItem } from 'moduix';

export function OrderedExample() {
  return (
    <List as="ol" type="A">
      <ListItem>Draft the rollout checklist.</ListItem>
      <ListItem>Coordinate the release window.</ListItem>
      <ListItem>Confirm the post-release review.</ListItem>
    </List>
  );
}
```

Leave `marker` unset when you want browser-provided ordered marker styles like `type="A"` or
`type="i"`. Set `marker="decimal"` only when decimal numbering should win regardless of the native
`type` attribute.

## Public API

`List` accepts native `ul` or `ol` attributes plus these wrapper props:

| Prop        | Type         | Description                                                           |
| ----------- | ------------ | --------------------------------------------------------------------- |
| `as`        | `ListAs`     | Chooses the semantic root element.                                    |
| `marker`    | `ListMarker` | Controls marker visibility/style: `disc`, `decimal`, or `none`.       |
| `gap`       | `ListGap`    | Controls spacing between direct list items.                           |
| `size`      | `ListSize`   | Controls typography size.                                             |
| `tone`      | `ListTone`   | Controls text and marker tone through color tokens.                   |
| `className` | `string`     | Adds classes to the root list element.                                |
| `role`      | native       | Optional override; otherwise `marker="none"` resolves to `role=list`. |

`ListItem` accepts native `li` props plus `className`.

Exported types:

- `ListAs`
- `ListGap`
- `ListItemProps`
- `ListMarker`
- `ListProps`
- `ListSize`
- `ListTone`

## Styling API

Root hooks:

- `data-slot="list-root"`
- `data-gap="xs" | "sm" | "md" | "lg" | "xl" | "2xl"`
- `data-marker="disc" | "decimal" | "none"`
- `data-marker-mode="auto" | "explicit"`
- `data-size="xs" | "sm" | "md" | "lg" | "xl"`
- `data-tone="default" | "muted" | "subtle" | "primary" | "destructive"`

Item hook:

- `data-slot="list-item"`

Public CSS variables:

| Variable                    | Default                                                  |
| --------------------------- | -------------------------------------------------------- |
| `--list-color`              | `var(--list-default-color, var(--color-foreground))`     |
| `--list-default-color`      | `var(--color-foreground)`                                |
| `--list-destructive-color`  | `var(--color-destructive)`                               |
| `--list-font-family`        | `var(--font-sans)`                                       |
| `--list-font-size`          | `var(--list-font-size-md, var(--text-md))`               |
| `--list-font-size-xs`       | `var(--text-xs)`                                         |
| `--list-font-size-sm`       | `var(--text-sm)`                                         |
| `--list-font-size-md`       | `var(--text-md)`                                         |
| `--list-font-size-lg`       | `var(--text-lg)`                                         |
| `--list-font-size-xl`       | `var(--text-xl)`                                         |
| `--list-font-weight`        | `var(--weight-regular)`                                  |
| `--list-gap`                | `var(--list-gap-sm, var(--spacing-2))`                   |
| `--list-gap-xs`             | `var(--spacing-1)`                                       |
| `--list-gap-sm`             | `var(--spacing-2)`                                       |
| `--list-gap-md`             | `var(--spacing-3)`                                       |
| `--list-gap-lg`             | `var(--spacing-4)`                                       |
| `--list-gap-xl`             | `var(--spacing-5)`                                       |
| `--list-gap-2xl`            | `var(--spacing-6)`                                       |
| `--list-letter-spacing`     | `0`                                                      |
| `--list-line-height`        | `var(--list-line-height-md, var(--line-height-text-md))` |
| `--list-line-height-xs`     | `var(--line-height-text-xs)`                             |
| `--list-line-height-sm`     | `var(--line-height-text-sm)`                             |
| `--list-line-height-md`     | `var(--line-height-text-md)`                             |
| `--list-line-height-lg`     | `var(--line-height-text-lg)`                             |
| `--list-line-height-xl`     | `var(--line-height-text-xl)`                             |
| `--list-marker-color`       | `currentColor`                                           |
| `--list-marker-font-weight` | `inherit`                                                |
| `--list-muted-color`        | `var(--color-muted-foreground)`                          |
| `--list-padding-x`          | `var(--spacing-5)`                                       |
| `--list-primary-color`      | `var(--color-primary)`                                   |
| `--list-subtle-color`       | `var(--color-secondary-foreground)`                      |

Example override:

```tsx
import { List, ListItem } from 'moduix';
import styles from './example.module.css';

export function Example() {
  return (
    <List className={styles.accentList}>
      <ListItem className={styles.accentItem}>Customized markers</ListItem>
      <ListItem className={styles.accentItem}>Spacing still comes from the root</ListItem>
    </List>
  );
}
```

```css
.accentList {
  --list-padding-x: var(--spacing-6);
}

.accentItem::marker {
  color: var(--color-primary);
  font-weight: var(--weight-semibold);
}
```

## UX and accessibility notes

- Native `ul` and `ol` semantics are preserved by default.
- `marker="none"` hides markers visually but keeps list semantics by default through `role="list"`.
- There is no custom keyboard navigation, focus management, disabled state, or read-only state because
  the component is not interactive.
- Screen-reader and numbering behavior come from native list markup, so avoid replacing direct `li`
  children with non-list elements.
- `overflow-wrap: break-word` is applied on the root to keep long content from breaking layouts.

## Limitations and recommendations

- `List` is intentionally small. It does not provide custom marker renderers, nested slot APIs, or
  item layout helpers.
- Root spacing applies only to direct `li` children. Wrapper elements between `List` and `li` break the
  built-in spacing contract.
- `ListItem` is a convenience wrapper, not a separate visual part with its own variants.
- If you need uncommon marker styles, prefer native ordered-list attributes or CSS `list-style-type`
  overrides before expanding the component API.

## Intentional differences from Base UI

- no Base UI primitive wrapper;
- no headless state, interaction, or render-prop behavior;
- no slot bag or marker-content API;
- no abstraction over nested list structure beyond the optional `ListItem` wrapper.

## Agent notes

- Preserve the direct-child `li` contract unless the component API is intentionally widened.
- Preserve `data-slot`, `data-gap`, `data-marker`, `data-marker-mode`, `data-size`, `data-tone`, and the
  documented `--list-*` variable contract.
- Keep `marker="none"` accessible; do not remove the fallback `role="list"` behavior as a cleanup.
- Keep ordered-list native `type` support working on the default ordered path.

## Local changelog

- 2026-06-15: Restored ordered-list markers on the default `as="ol"` path after the global reset,
  while preserving native `type`-driven marker styles and explicit `marker="decimal"` overrides.
- 2026-06-02: Rewrote the local documentation around the shipped moduix wrapper contract, documented
  styling hooks and CSS variables, and recorded the markerless accessibility + ordered-list marker
  behavior.