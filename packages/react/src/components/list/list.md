# List

Upstream docs:

- Ark UI has no List primitive; the wrapper uses the Ark factory:
  https://ark-ui.com/docs/guides/composition
- Chakra UI List: https://chakra-ui.com/docs/components/list
- shadcn/ui has no List component.

Sources reviewed 2026-10-17.

## Purpose

`List` is a thin `ark.ul` / `ark.ol` wrapper that adds design-system props (`marker`, `gap`, `size`, `tone`) to
native list semantics. `ListItem` is a thin `ark.li` wrapper with stable data hooks.

## Contract

- `as` is `ul` (default) or `ol`. Do not widen it; use `asChild` for a custom host that renders `ul`, `ol`, or `li`
  and forwards props and ref.
- `marker` defaults from `as`: `disc` for `ul`, `decimal` for `ol`. With `asChild`, pass `marker` to match the
  child. `data-marker` always holds the resolved value.
- The native `type` attribute of `ol` does not change markers (the component sets `list-style-type`); use a class.
  CSS cannot map it: Chrome ignores the case-sensitive `[type='a' s]` flag and matches `type` case-insensitively.
- `marker="none"` removes the indentation and adds `role="list"` unless the caller passes `role`, so Safari keeps
  list semantics.
- Defaults: `gap="sm"`, `size="md"`, `tone="default"`.
- Spacing uses flex `gap` on a column; consumers can switch to a row or wrap. Do not restore `li + li` margins.
- A `ul`/`ol` directly inside an item gets `margin-block-start` equal to its own gap (private `--_list-gap`), so a
  nested `List` sits one gap below the item text.
- `ListIndicator` is a `span` for an icon instead of the native marker; use it with `marker="none"`. An item whose
  direct child is an indicator becomes a flex row (`li:has(> indicator)`), so long text wraps beside the icon. Icons
  are `1em`, and the indicator is at least `1lh` tall to align with the first line. It sets no `aria-hidden`:
  decorative icons hide themselves.
- `data-scope`, `data-part`, `data-slot`, and the `data-*` styling hooks are set after the props spread and cannot be
  replaced by consumer props.
- Exported types: `ListRootProps`, `ListElement`, `ListMarker`, `ListGap`, `ListSize`, `ListTone`.

```tsx
import { List, ListItem } from '@moduix/react/list';

<List as="ol" start={3}>
  <ListItem>Prepare the release notes.</ListItem>
  <ListItem>Publish the package.</ListItem>
</List>;
```

## Anatomy

| Part            | Hooks                                                                                                                 |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `List`          | `data-scope="list"`, `data-part="root"`, `data-slot="list-root"`, `data-marker`, `data-gap`, `data-size`, `data-tone` |
| `ListItem`      | `data-scope="list"`, `data-part="item"`, `data-slot="list-item"`                                                      |
| `ListIndicator` | `data-scope="list"`, `data-part="indicator"`, `data-slot="list-indicator"`                                            |

Native `<li>` children work too; `ListItem` only adds the hooks and `asChild`.

## Styling

CSS Modules read foundation tokens directly and have no `--moduix-list-*` variables. A class on the root overrides
the `moduix.components` layer; style markers with `li::marker` (Tailwind: `marker:` utilities). The Tailwind variant
uses the same spacing (`gap-1` … `gap-6`, `ps-5`) and typography utilities.

## Agent notes

- No context, provider, or state: there is no Ark machine to wrap.
- Keep the wrapper thin: semantic host, data hooks, and token mapping only.