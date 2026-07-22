# SegmentGroup

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/segment-group
- Chakra UI: https://chakra-ui.com/docs/components/segmented-control

## Purpose

`SegmentGroup` lets users choose one option from a small, visible set with a segmented-control
visual.

## Upstream model to preserve

The component follows Ark UI React `@ark-ui/react/segment-group`, which is backed by Zag
`radio-group` behavior for segmented controls. Keep the Ark anatomy, single-value state, callback
detail objects, `RootProvider`, `asChild` behavior, measured `Indicator`, and native form input
integration intact. Each item renders its input internally.

## Current behavior contract

`SegmentGroup` is the short root form and is equivalent to `SegmentGroup.Root`. The public parts
are thin Ark wrappers that add moduix CSS Modules and stable `data-slot` values. `SegmentGroup.Items`
is a fixed convenience renderer for standard `{ value, label, disabled? }` segment lists.

`SegmentGroup.Root` forwards Ark props such as `value`, `defaultValue`,
`onValueChange(details)`, `name`, `form`, `orientation`, `disabled`, `invalid`, `readOnly`,
`required`, `ids`, and `asChild`. Consumers should read `details.value`; do not unpack or remap
the callback in the wrapper.

moduix defaults `orientation` to `horizontal` on `SegmentGroup.Root`. Explicit
`orientation="vertical"` still preserves Ark vertical keyboard navigation and layout.

## Anatomy and exported parts

```tsx
<SegmentGroup.Root>
  <SegmentGroup.Indicator />
  <SegmentGroup.Item>
    <SegmentGroup.ItemText />
    <SegmentGroup.ItemControl />
  </SegmentGroup.Item>
</SegmentGroup.Root>
```

| Part                        | `data-slot`                   | Notes                                      |
| --------------------------- | ----------------------------- | ------------------------------------------ |
| `SegmentGroup` / `Root`     | `segment-group-root`          | Ark root, value state, orientation, forms. |
| `SegmentGroup.RootProvider` | `segment-group-root-provider` | Uses state from `useSegmentGroup`.         |
| `SegmentGroup.Label`        | `segment-group-label`         | Optional Ark group label.                  |
| `SegmentGroup.Items`        | —                             | Renders standard text items.               |
| `SegmentGroup.Item`         | `segment-group-item`          | Ark item, renders a `label` by default.    |
| `SegmentGroup.ItemControl`  | `segment-group-item-control`  | Hidden visual control part for Ark state.  |
| `SegmentGroup.ItemText`     | `segment-group-item-text`     | Visible item text.                         |
| `SegmentGroup.Indicator`    | `segment-group-indicator`     | Measured active-item highlight.            |

Import `useSegmentGroup` from `@moduix/react` when an advanced state workflow needs
`RootProvider`. `SegmentGroup.Context` and `useSegmentGroupContext` remain Ark escape hatches from
`@ark-ui/react/segment-group`.

## Composition

Canonical usage:

```tsx
import { SegmentGroup } from '@moduix/react';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export function SegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroup.Indicator />
      <SegmentGroup.Items items={frameworks} />
    </SegmentGroup>
  );
}
```

Use `SegmentGroup.RootProvider` with moduix `useSegmentGroup` when state must be controlled from
outside the rendered tree. Do not render `Root` and `RootProvider` for the same state instance.

## Upstream feature coverage

- Basic, controlled, root provider, disabled item, vertical orientation, indicator, programmatic
  value control, form usage, and focus control are supported through the same Ark parts and props.
- `asChild` is supported on Ark parts. `SegmentGroup.Item` renders a `label` by default; when
  `asChild` is used, the direct child must still be a semantic `label`.
- Both `Items` and explicit `Item` composition render a native form input automatically for every item.
- `ids` is forwarded from `Root`/`RootProvider` for explicit accessibility composition.
- `Indicator` preserves Ark CSS variables: `--left`, `--top`, `--width`, and `--height`.

## Accessibility and state

Ark owns the WAI-ARIA radio-group behavior, roving focus, keyboard navigation, controlled and
uncontrolled state, disabled/read-only/invalid/required propagation, and hidden input behavior.
Preserve Ark data attributes such as `data-scope="segment-group"`, `data-part`, `data-state`,
`data-orientation`, `data-disabled`, `data-invalid`, `data-required`, `data-active`, and
`data-focus-visible`.

`Root`, `RootProvider`, `Label`, `Item`, `ItemControl`, `ItemText`, and `Indicator` forward refs
to their public Ark DOM parts. The native input is not a separate public ref target.

## Defaults and styling

The CSS uses Ark state attributes, Ark measurement variables on `Indicator`, and public
`--moduix-segment-group-*` variables. Public selectors should target the exported part class,
`data-slot`, or Ark attributes.

`data-invalid` changes the root border and invalid focus ring through
`--moduix-segment-group-border-color-invalid` and `--moduix-segment-group-focus-ring-color-invalid`.
`data-readonly` keeps the item readable but removes hover/click affordance styling.

The indicator keeps Ark in charge of measurement and transition lifecycle. Customize motion with
`--moduix-segment-group-indicator-transition-duration` and
`--moduix-segment-group-indicator-transition-timing-function`, which feed Ark's
`--transition-duration` and `--transition-timing-function` runtime variables.

The root lays items out horizontally by default at both the component and hook level. Set
`orientation="vertical"` for vertical arrow navigation and vertical layout. `ItemControl` is
rendered but visually hidden because the segmented-control affordance comes from the active
`Indicator` and checked item text color.

## Intentional sugar and differences from upstream

- The short root export `<SegmentGroup>` is equivalent to `<SegmentGroup.Root>`.
- The wrapper adds only moduix styling defaults and `data-slot` hooks.
- `SegmentGroup.Items` renders the fixed standard item tree: `Item`, `ItemText`, and `ItemControl`; each `Item` renders its native form input automatically. Use `Item` directly for custom markup or per-item styling.
- `useSegmentGroup` is re-exported from moduix for the documented `RootProvider` workflow.
- Horizontal orientation is a moduix default because this component is visually a segmented
  control. Ark/Zag behavior remains available through explicit `orientation`.
- No local `size`, `variant`, callback alias, or selection state layer is added.

## Agent notes

- Keep behavior delegated to Ark. Do not add local selection state or callback remapping.
- Keep `RootProvider` and the moduix `useSegmentGroup` re-export aligned. Ark context parts and
  type aliases remain direct Ark escape hatches.
- Keep examples with `SegmentGroup.Indicator` before items when the active highlight should render.
- When changing public slots or variables, sync stories, local docs, app docs, registry metadata,
  and generated registry output in the same task.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-13: Native form controls are now rendered automatically; the former public form-control part was removed.

- 2026-07-11: Added `SegmentGroup.Items` for standard segment lists and re-exported
  `useSegmentGroup` for the documented `RootProvider` workflow.
- 2026-07-03: Removed Ark context parts, state hooks, and duplicate Ark type exports from the
  moduix surface. `RootProvider` remained for externally owned Ark state.
- 2026-06-22: Added Ark UI `segment-group` wrapper with namespace parts, provider/context hooks,
  CSS Modules styling, local documentation, docs examples, and registry metadata.
- 2026-06-22: Set moduix default orientation to horizontal, polished `asChild` card styling, and
  clarified the component choice against Tabs, ToggleGroup, and RadioGroup.
- 2026-06-27: Aligned invalid/read-only styling with Ark state attributes and moved indicator
  motion customization to Ark runtime transition variables.