# SegmentGroup

## Upstream review

Reviewed 2026-09-19:

| Source                                                               | Useful reference                                                                         | Moduix decision                                                                                       |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [Ark UI](https://ark-ui.com/solid/docs/components/segment-group)     | Primitive anatomy, state attributes, machine props, and runtime indicator variables.     | **Required correctness:** retain the complete Ark part tree, props, and ARIA contract unchanged.      |
| [Chakra UI](https://chakra-ui.com/docs/components/segmented-control) | Compound anatomy, `Items` shortcut, and indicator color customization through variables. | **Intentional difference:** keep the horizontal default and the `Items` sugar; no `size` prop matrix. |
| [shadcn/ui](https://ui.shadcn.com/docs/components/toggle-group)      | Consumer expectations for single-select segmented controls.                              | **Rejected shortcut:** keep the Ark anatomy instead of a toggle-group-style value/variant API.        |

Backed by the Zag `radio-group` machine for segmented controls. The machine's default orientation
is `vertical`; moduix intentionally defaults the callable root and the shared `useSegmentGroup` hook
to `horizontal` because this component renders as a segmented control.

## Purpose

`SegmentGroup` renders a segmented control: a single-value group of mutually exclusive options where
the moving indicator highlights the checked segment.

## Upstream model to preserve

The wrapper follows Ark UI Solid `@ark-ui/solid/segment-group`. Preserve the Ark parts exactly:
`Root`, `RootProvider`, `Context`, `ItemContext`, `Label`, `Item`, `ItemControl`, `ItemText`,
`ItemHiddenInput`, and `Indicator`. Preserve machine props unchanged: `value`, `defaultValue`,
`onValueChange`, `name`, `form`, `orientation`, `disabled`, `invalid`, `readOnly`, `required`,
`ids`, and `id`.

## Current behavior contract

`SegmentGroup` is the styled root, equivalent to `SegmentGroup.Root`, and defaults
`orientation` to `horizontal` (`SegmentGroup.Root` and `SegmentGroup.useSegmentGroup`).
`orientation="vertical"` preserves Ark vertical layout and arrow navigation.

The package exports the namespace, `useSegmentGroup`, `useSegmentGroupContext`, and
`useSegmentGroupItemContext`. `useSegmentGroup` adds Field/Fieldset inheritance (`disabled`,
`invalid`, `readOnly`, `required`); explicit props always win over field state. It returns a
reactive store accessor: read state and call methods through the accessor, for example
`segmentGroup().setValue('react')`.

`SegmentGroup.Items` is a convenience renderer for `{ value, label, disabled? }` lists: it creates
`Item`, `ItemText`, `ItemControl`, and one synchronized `ItemHiddenInput` per entry. Use explicit
`Item` parts when items need custom children, control styling, or non-standard anatomy.

```tsx
import { SegmentGroup } from '@moduix/solid/segment-group';

export function Example() {
  return (
    <SegmentGroup.Root defaultValue="react" aria-label="Framework">
      <SegmentGroup.Label>Framework</SegmentGroup.Label>
      <SegmentGroup.Indicator />
      <SegmentGroup.Item value="react">
        <SegmentGroup.ItemHiddenInput index={0} />
        <SegmentGroup.ItemText>React</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
      </SegmentGroup.Item>
      <SegmentGroup.Item value="solid">
        <SegmentGroup.ItemHiddenInput index={1} />
        <SegmentGroup.ItemText>Solid</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
      </SegmentGroup.Item>
    </SegmentGroup.Root>
  );
}
```

## Anatomy and exported parts

```text
SegmentGroup / SegmentGroup.Root
├─ SegmentGroup.Label (optional)
├─ SegmentGroup.Indicator
├─ SegmentGroup.Item
│  ├─ SegmentGroup.ItemHiddenInput
│  ├─ SegmentGroup.ItemText
│  └─ SegmentGroup.ItemControl
└─ SegmentGroup.Item (repeat per option)
```

| Export                                                                            | `data-slot`                   | Role                                                                        |
| --------------------------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------- |
| `SegmentGroup` / `SegmentGroup.Root`                                              | `segment-group-root`          | Ark root and state owner; renders the segments container.                   |
| `SegmentGroup.RootProvider`                                                       | `segment-group-root-provider` | Connects the parts to state created with `useSegmentGroup()`.               |
| `SegmentGroup.Context`                                                            | -                             | Render-prop access to the root state.                                       |
| `SegmentGroup.ItemContext`                                                        | -                             | Render-prop access to the item state.                                       |
| `SegmentGroup.Label`                                                              | `segment-group-label`         | Optional group label; renders a `span` by default.                          |
| `SegmentGroup.Items`                                                              | -                             | Moduix convenience renderer for standard item lists.                        |
| `SegmentGroup.Item`                                                               | `segment-group-item`          | Renders a `label` by default; contains text, control, and the hidden input. |
| `SegmentGroup.ItemControl`                                                        | `segment-group-item-control`  | Visual check bubble; hidden native control renders separately.              |
| `SegmentGroup.ItemText`                                                           | `segment-group-item-text`     | Item text; rendered as a `span` by default.                                 |
| `SegmentGroup.ItemHiddenInput`                                                    | -                             | Native radio input for form submission, reset, and autofill.                |
| `SegmentGroup.Indicator`                                                          | `segment-group-indicator`     | Moving checked-segment highlight positioned through Ark runtime variables.  |
| `SegmentGroup.useSegmentGroup`                                                    | -                             | Ark state hook plus Field/Fieldset inheritance for `RootProvider`.          |
| `SegmentGroup.useSegmentGroupContext` / `SegmentGroup.useSegmentGroupItemContext` | -                             | Advanced state reads.                                                       |

## Composition

`SegmentGroup.Field` is not part of this contract; keep `Label`, `Indicator`, and `Item` parts under
the root. `Items` covers standard lists; compose explicit items for custom anatomy. The indicator
is positioned by Ark runtime variables (`--top`, `--left`, `--width`, `--height`); moduix styles
read those variables, so the indicator must stay a child of the root.

## Upstream feature coverage

- Single selection with keyboard navigation: native Ark machine behavior.
- Controlled (`value`, `onValueChange`) and uncontrolled (`defaultValue`) modes.
- `Field`/`Fieldset` inheritance through the moduix `useSegmentGroup` hook and the Ark root.
- `asChild`: preserved on all Ark parts; the Solid adapter takes a render function
  `(props) => Element` and spreads the resolved props onto the consumer element.
- `ids` and `id` pass through for stable form association.
- `SegmentGroup.Context`, `SegmentGroup.ItemContext`,
  `SegmentGroup.useSegmentGroupContext()`, and `SegmentGroup.useSegmentGroupItemContext()`
  are available from moduix for advanced state reads.

## Accessibility and state

Ark provides the group semantics, roving focus, arrow-key navigation, and native radio inputs. Refs
forward to the actual Ark DOM part for every wrapped part.

Relevant Ark attributes and variables:

| Target      | Attribute or variable                                                                          | Meaning                                     |
| ----------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Root        | `data-orientation`, `data-disabled`, `data-invalid`, `data-required`                           | Group state.                                |
| Label       | `data-state`, `data-disabled`, `data-invalid`, `data-required`, `data-readonly`                | Mirrors group state for styling.            |
| Indicator   | `data-state`, `data-disabled`, `data-hidden`; `--left`, `--top`, `--width`, `--height`         | Checked-segment geometry from Ark.          |
| Indicator   | `--transition-duration`, `--transition-timing-function`                                        | Zag reads these from the indicator element. |
| Item        | `data-state`, `data-focus`, `data-focus-visible`, `data-readonly`, `data-hover`, `data-active` | Item interaction and selection state.       |
| ItemControl | `data-state`, `data-active`                                                                    | Pressed state for the visual bubble.        |

## Defaults and styling

Moduix adds visual defaults through CSS Modules and public CSS variables. Indicator motion reads
Ark runtime variables, with moduix defaults supplied on the indicator element:
`--moduix-segment-group-indicator-transition-duration` and
`--moduix-segment-group-indicator-transition-timing-function`. State-driven item colors, focus ring,
radius, and disabled opacities are documented in the CSS-property reference panel.

The root suppresses double-fading: the item-level `data-disabled` opacity applies only while the
root is enabled, and the root-level disabled opacity applies alone when the whole group is disabled.

## Solid adapter notes

- `asChild` accepts a render function `(props) => Element`; call `props()` and spread the resolved
  props onto the semantic element. Do not assume static JSX children.
- Ark Solid does not forward component refs through `asChild` composition; a `ref` passed together
  with `asChild` stays undefined. This is native Ark Solid behavior and is covered by tests.
- `useSegmentGroup()` and the context hooks return reactive store accessors, not plain objects.

## Intentional sugar and differences from upstream

- Horizontal default orientation is a moduix decision; explicit `orientation="vertical"` preserves
  Ark behavior.
- `Items` is a moduix sugar part; it does not exist in Ark anatomy.
- No `size` or `variant` prop matrix; density is controlled through component CSS variables.
- `Component.Root` and the static namespace mirror Chakra's `SegmentGroup` composition model.

## Agent notes

- Keep the wrapper thin; do not add automatic structural rendering beyond `Items`.
- Preserve the disabled-opacity scoping; do not let root and item opacities compound.
- Keep indicator styling reading Ark runtime variables rather than measuring DOM state.

## Local changelog

- 2026-09-19: Added the Solid contract file; parity with the React adapter plus Solid adapter notes
  for `asChild` render functions, refs, and the reactive store accessor.