# SegmentGroup

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/segment-group
- Chakra UI: https://chakra-ui.com/docs/components/segmented-control

## Purpose

`SegmentGroup` lets users choose one value from a small visible set with a segmented-control look.

## Current behavior contract

- The parts are thin Ark wrappers from `@ark-ui/react/segment-group` (Zag `radio-group` machine)
  that add moduix classes and stable `data-slot` values. Ark owns state, keyboard navigation,
  `asChild`, callback details (`onValueChange(details)`), and the native inputs.
- `SegmentGroup` and the re-exported `useSegmentGroup` default `orientation` to `horizontal`; the Zag
  machine defaults to `vertical`. Explicit `orientation="vertical"` keeps Ark vertical layout and
  arrow navigation.
- `SegmentGroup` and `SegmentGroupRootProvider` accept the moduix-only `size?: 'sm' | 'md' | 'lg'`.
  It defaults to `md`, writes `data-size`, and makes the whole group as tall as `--moduix-size-<size>`,
  the height of a `Button` or `Input` of the same size.
- `SegmentGroupItems` takes strings (value and label) or `{ value, label, disabled? }` objects and
  renders the fixed item tree:
  `SegmentGroupItem`, `SegmentGroupItemText`, and `SegmentGroupItemHiddenInput`.
- Direct `SegmentGroupItem` composition must include `SegmentGroupItemHiddenInput`.
- `SegmentGroupItem` renders a `label`. With `asChild`, the direct child must still be a `label`.
- `SegmentGroupContext`, `SegmentGroupItemContext`, `SegmentGroupItemHiddenInput`,
  `useSegmentGroupContext`, and `useSegmentGroupItemContext` are Ark exports, unchanged.
- Types `SegmentGroupRootProps`, `SegmentGroupRootProviderProps`, `SegmentGroupSize`,
  `SegmentGroupItemOption`, and `SegmentGroupItemsProps` are exported.
- Ark's `ItemControl` is not exported: it is a visual-only (`aria-hidden`) radio control that a
  segmented control does not draw.

## Anatomy and exported parts

```text
SegmentGroup[size]
├─ SegmentGroupLabel (optional)
├─ SegmentGroupIndicator
├─ SegmentGroupItems[items]
└─ SegmentGroupItem[value]
   ├─ SegmentGroupItemText
   └─ SegmentGroupItemHiddenInput (explicit)
```

| Part                       | `data-slot`                   | Notes                                             |
| -------------------------- | ----------------------------- | ------------------------------------------------- |
| `SegmentGroup`             | `segment-group-root`          | Ark root, horizontal by default; `size`.          |
| `SegmentGroupRootProvider` | `segment-group-root-provider` | Uses state from `useSegmentGroup()`; `size`.      |
| `SegmentGroupLabel`        | `segment-group-label`         | Optional group label.                             |
| `SegmentGroupItems`        | -                             | Fixed item, text, and input per entry.            |
| `SegmentGroupItem`         | `segment-group-item`          | Ark item, renders a `label`.                      |
| `SegmentGroupItemText`     | `segment-group-item-text`     | Item text; no styles of its own.                  |
| `SegmentGroupIndicator`    | `segment-group-indicator`     | Highlight measured by Ark under the checked item. |

## Field and Fieldset

Ark SegmentGroup reads neither `Field` nor `Fieldset`. Pass `disabled`, `invalid`, `readOnly`, and
`required` to the group itself, as with `RadioGroup` and `Field`.

## Defaults and styling

- Per-size values live in private `--_segment-group-size`, `--_segment-group-item-padding-x`,
  `--_segment-group-font-size`, and `--_segment-group-line-height` on the root; the item height is
  the size minus the root padding and border.
- Public variables: `bg`, `border-color`, `indicator-bg`, `item-color`, and `item-color-checked`,
  all with the `--moduix-segment-group-` prefix. Everything else comes from foundation tokens;
  override it with a class over the `moduix.components` layer.
- The indicator sits at `z-index: -1` inside the `isolation: isolate` root, so item content needs no
  stacking of its own. Ark sets its position and the root's `position: relative` inline.
- The indicator sets Ark `--transition-duration` and `--transition-timing-function` from
  `--moduix-duration-normal` and `--moduix-ease-in-out`. Do not set `transition-duration` directly:
  Ark writes `0ms` inline until the selection changes so the first render does not animate.
- Hover darkens only unchecked items, so a custom checked color survives hover.
- Item disabled opacity applies only while the root is enabled, so opacities do not compound.

## Agent notes

- Keep `SegmentGroupItems` as the only sugar and `SegmentGroupIndicator` explicit, as in Chakra.
- Do not add Field/Fieldset inheritance back to the wrapper.
- Keep `size` on the root and the outer height equal to `--moduix-size-<size>`.