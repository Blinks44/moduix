# List

Upstream docs:

- Ark UI: no dedicated `List` component. Use the Composition, Styling, and Ref guides:
  - https://ark-ui.com/docs/guides/composition
  - https://ark-ui.com/docs/guides/styling
  - https://ark-ui.com/docs/guides/ref

## Purpose

`List` is a moduix-owned semantic list wrapper that uses Ark factory composition to style unordered and ordered lists with the moduix spacing, typography, and marker token contract.

## Upstream model to preserve

There is no dedicated Ark `List` primitive or component page. The wrapper should stay aligned with Ark's factory-based composition model:

- `List` is a thin `ark.ul` wrapper with `asChild` support for host-element replacement.
- `List.Item` is a thin `ark.li` wrapper with the same `asChild` composition path.
- Styling is driven through Ark-style `data-scope`, `data-part`, state-like data attributes, and public CSS variables.
- Ref behavior targets the rendered semantic root/item element, with the standard Ark `asChild` constraint of a single semantic child.

## Current behavior contract

- `List` defaults to a semantic `<ul>`.
- Ordered lists now use Ark-style composition: render `<List asChild><ol ... /></List>` instead of `as="ol"`.
- `List.Item` is the public item part. The flat `ListItem` export was removed during the Ark migration.
- `marker="none"` still applies `role="list"` by default for markerless semantics unless the caller passes a custom `role`.
- Native list props remain available on the rendered host element:
  - plain `<List>` accepts `ul` props;
  - ordered-list props such as `start`, `reversed`, and `type` belong on the child `<ol>` when `asChild` is used.
- Visual behavior stays token-driven through `gap`, `size`, `tone`, native `::marker`, and the `--list-*` CSS variable contract.

## Anatomy and exported parts

```text
List / List.Root
└─ List.Item | li
```

| Part                 | Stable hooks                                                     | Notes                                                                  |
| -------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `List` / `List.Root` | `data-scope="list"`, `data-part="root"`, `data-slot="list-root"` | Semantic list root with marker, spacing, size, and tone styling hooks. |
| `List.Item`          | `data-scope="list"`, `data-part="item"`, `data-slot="list-item"` | Thin semantic item wrapper with optional `asChild` composition.        |

## Composition

Canonical unordered usage:

```tsx
import { List } from 'moduix';

export function ListDemo() {
  return (
    <List>
      <List.Item>Use semantic list markup for grouped content.</List.Item>
      <List.Item>Keep spacing and typography on the library scale.</List.Item>
      <List.Item>Style markers with CSS variables or native ::marker selectors.</List.Item>
    </List>
  );
}
```

Canonical ordered usage:

```tsx
import { List } from 'moduix';

export function OrderedListDemo() {
  return (
    <List asChild>
      <ol start={3}>
        <List.Item>Prepare the release notes.</List.Item>
        <List.Item>Publish the package.</List.Item>
        <List.Item>Announce the release.</List.Item>
      </ol>
    </List>
  );
}
```

## Upstream feature coverage

- Ark Composition guide:
  - supported: `asChild` on the root and item parts;
  - supported: semantic child replacement with a single host element;
  - unsupported by design: there is no upstream state machine, context API, `RootProvider`, or callback detail object because no Ark primitive exists.
- Ark Styling guide:
  - supported: styling through `data-scope`, `data-part`, data attributes, `className`, and CSS variables;
  - supported: native marker styling with `li::marker`.
- Ark Ref guide:
  - supported: refs forwarded to the rendered root/item DOM element;
  - preserve the semantic-host requirement when using `asChild`.

## Accessibility and state

- Accessibility comes from native list semantics (`ul`, `ol`, `li`) rather than an Ark state machine.
- `marker="none"` hides markers visually and keeps list semantics via the default `role="list"` fallback.
- Keep direct `li` descendants under the rendered root. Root spacing and marker styling assume direct list items.
- There are no Ark callbacks, controlled/uncontrolled modes, `HiddenInput`, `Field.Root`/`Fieldset.Root` context, or provider/context exports for this component.
- Public styling hooks:
  - root: `data-gap`, `data-marker`, `data-size`, `data-tone`
  - item: `data-slot="list-item"` plus `data-scope` / `data-part`

## Defaults and styling

- `List` accepts `className` on the root and `List.Item` accepts `className` on the item.
- Defaults:
  - root host: `ul`
  - `gap`: `sm`
  - `size`: `md`
  - `tone`: `default`
  - `marker`: semantic auto mode (`disc` on `ul`, browser default ordered markers on `ol`)
- Public CSS variables remain:
  - color: `--list-color`, `--list-default-color`, `--list-muted-color`, `--list-subtle-color`, `--list-primary-color`, `--list-destructive-color`
  - typography: `--list-font-family`, `--list-font-size`, `--list-font-size-*`, `--list-font-weight`, `--list-line-height`, `--list-line-height-*`, `--list-letter-spacing`
  - spacing/markers: `--list-gap`, `--list-gap-*`, `--list-padding-x`, `--list-marker-color`, `--list-marker-font-weight`
- The CSS module relies on the Ark-style root hooks and native `li::marker`; keep those selectors aligned with the implementation.

## Intentional sugar and differences from upstream

- `List` is still a moduix-owned component because Ark UI does not ship a dedicated list primitive.
- The moduix wrapper adds design-system props (`gap`, `size`, `tone`, `marker`) and a stable `List.Item` slot.
- The Ark migration intentionally removed:
  - `as="ol"` in favor of `asChild`;
  - the flat `ListItem` export in favor of `List.Item`;
  - the old `ListAs` / union host-prop contract.

## Agent notes

- Do not add a fake Ark part tree, context API, or state callbacks to mimic other Ark primitives.
- Keep the wrapper thin: Ark factory composition, semantic DOM, styling hooks, and token mapping only.
- If future work needs more custom ordered-list behavior, prefer `asChild` + native `ol` props or CSS over new wrapper props.

## Local changelog

- 2026-06-19: Migrated `List` to an Ark-style factory wrapper, replaced `as="ol"` with `asChild`, removed the flat `ListItem` export in favor of `List.Item`, and rewrote the local contract around Ark composition/styling guides.
- 2026-06-15: Restored ordered-list markers on the default `as="ol"` path after the global reset, documented `ListItem`, formalized public styling hooks and CSS variables, and recorded the markerless accessibility + ordered-list marker preservation notes.