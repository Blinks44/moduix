# SegmentGroup

## Upstream review

Reviewed 2026-09-19:

| Source                                                               | Useful reference                                                                         | Moduix decision                                                                                                   |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [Ark UI](https://ark-ui.com/solid/docs/components/segment-group)     | Primitive anatomy, state attributes, machine props, and runtime indicator variables.     | **Required correctness:** retain the complete Ark part tree, props, and ARIA contract unchanged.                  |
| [Chakra UI](https://chakra-ui.com/docs/components/segmented-control) | Compound anatomy, `Items` shortcut, and indicator color customization through variables. | **Intentional difference:** keep the horizontal default and the `SegmentGroupItems` sugar; no `size` prop matrix. |
| [shadcn/ui](https://ui.shadcn.com/docs/components/toggle-group)      | Consumer expectations for single-select segmented controls.                              | **Rejected shortcut:** keep the Ark anatomy instead of a toggle-group-style value/variant API.                    |

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

`SegmentGroup` is the styled root and defaults `orientation` to `horizontal` both on the component
and on `useSegmentGroup`.
`orientation="vertical"` preserves Ark vertical layout and arrow navigation.

The package exports flat component values, `useSegmentGroup`, `useSegmentGroupContext`, and
`useSegmentGroupItemContext`. `useSegmentGroup` adds Field/Fieldset inheritance (`disabled`,
`invalid`, `readOnly`, `required`); explicit props always win over field state. It returns a
reactive store accessor: read state and call methods through the accessor, for example
`segmentGroup().setValue('react')`.

`SegmentGroupItems` is a convenience renderer for `{ value, label, disabled? }` lists: it creates
`SegmentGroupItem`, `SegmentGroupItemText`, `SegmentGroupItemControl`, and one synchronized
`SegmentGroupItemHiddenInput` per entry. Use explicit `SegmentGroupItem` parts when items need custom
children, control styling, or non-standard anatomy.

```tsx
import { SegmentGroup } from '@moduix/solid/segment-group';

export function Example() {
  return (
    <SegmentGroup defaultValue="react" aria-label="Framework">
      <SegmentGroupLabel>Framework</SegmentGroupLabel>
      <SegmentGroupIndicator />
      <SegmentGroupItem value="react">
        <SegmentGroupItemHiddenInput index={0} />
        <SegmentGroupItemText>React</SegmentGroupItemText>
        <SegmentGroupItemControl />
      </SegmentGroupItem>
      <SegmentGroupItem value="solid">
        <SegmentGroupItemHiddenInput index={1} />
        <SegmentGroupItemText>Solid</SegmentGroupItemText>
        <SegmentGroupItemControl />
      </SegmentGroupItem>
    </SegmentGroup>
  );
}
```

## Anatomy and exported parts

```text
SegmentGroup
├─ SegmentGroupLabel (optional)
├─ SegmentGroupIndicator
├─ SegmentGroupItem
│  ├─ SegmentGroupItemHiddenInput
│  ├─ SegmentGroupItemText
│  └─ SegmentGroupItemControl
└─ SegmentGroupItem (repeat per option)
```

| Export                                                  | `data-slot`                   | Role                                                                           |
| ------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------ |
| `SegmentGroup`                                          | `segment-group-root`          | Ark root and state owner; renders the segments container.                      |
| `SegmentGroupRootProvider`                              | `segment-group-root-provider` | Connects the parts to state created with `useSegmentGroup()`.                  |
| `SegmentGroupContext`                                   | -                             | Render-prop access to the root state.                                          |
| `SegmentGroupItemContext`                               | -                             | Render-prop access to the item state.                                          |
| `SegmentGroupLabel`                                     | `segment-group-label`         | Optional group label; renders a `span` by default.                             |
| `SegmentGroupItems`                                     | -                             | Moduix convenience renderer for standard item lists.                           |
| `SegmentGroupItem`                                      | `segment-group-item`          | Renders a `label` by default; contains text, control, and the hidden input.    |
| `SegmentGroupItemControl`                               | `segment-group-item-control`  | Visual check bubble; hidden native control renders separately.                 |
| `SegmentGroupItemText`                                  | `segment-group-item-text`     | Item text; rendered as a `span` by default.                                    |
| `SegmentGroupItemHiddenInput`                           | -                             | Native radio input for form submission, reset, and autofill.                   |
| `SegmentGroupIndicator`                                 | `segment-group-indicator`     | Moving checked-segment highlight positioned through Ark runtime variables.     |
| `useSegmentGroup`                                       | -                             | Ark state hook plus Field/Fieldset inheritance for `SegmentGroupRootProvider`. |
| `useSegmentGroupContext` / `useSegmentGroupItemContext` | -                             | Advanced state reads.                                                          |

## Composition

`Field` is not part of this contract; keep `SegmentGroupLabel`, `SegmentGroupIndicator`, and
`SegmentGroupItem` under `SegmentGroup`. `SegmentGroupItems` covers standard lists; compose explicit
parts for custom anatomy. The indicator is positioned by Ark runtime variables (`--top`, `--left`,
`--width`, `--height`); moduix styles read those variables, so it must stay a child of the root.

## Upstream feature coverage

- Single selection with keyboard navigation: native Ark machine behavior.
- Controlled (`value`, `onValueChange`) and uncontrolled (`defaultValue`) modes.
- `Field`/`Fieldset` inheritance through the moduix `useSegmentGroup` hook and the Ark root.
- `asChild`: preserved on all Ark parts; the Solid adapter takes a render function
  `(props) => Element` and spreads the resolved props onto the consumer element.
- `ids` and `id` pass through for stable form association.
- `SegmentGroupContext`, `SegmentGroupItemContext`,
  `useSegmentGroupContext()`, and `useSegmentGroupItemContext()`
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
- `SegmentGroupItems` is a moduix sugar part; it does not exist in Ark anatomy.
- No `size` or `variant` prop matrix; density is controlled through component CSS variables.
- The flat values preserve Chakra's composition model without a static namespace.

## Agent notes

- Keep the wrapper thin; do not add automatic structural rendering beyond `SegmentGroupItems`.
- Preserve the disabled-opacity scoping; do not let root and item opacities compound.
- Keep indicator styling reading Ark runtime variables rather than measuring DOM state.

## Local changelog

- 2026-09-19: Added the Solid contract file; parity with the React adapter plus Solid adapter notes
  for `asChild` render functions, refs, and the reactive store accessor.