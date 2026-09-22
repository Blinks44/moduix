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
detail objects, `SegmentGroupRootProvider`, `asChild` behavior, measured `SegmentGroupIndicator`,
and native form input integration intact. `SegmentGroupItems` includes each input; direct item
composition is explicit.

### Release review sources

Reviewed on 2026-08-12:

- Ark UI: https://ark-ui.com/docs/components/segment-group - required correctness: radio-group
  semantics, roving focus, arrow-key selection, `SegmentGroupRootProvider`, measured indicator, and native
  input lifecycle.
- Chakra UI: https://chakra-ui.com/docs/components/segmented-control - consumer ergonomics:
  `SegmentGroupItems` is the appropriate concise path for standard item lists.
- shadcn/ui: https://ui.shadcn.com/docs/components/base/toggle-group - consumer expectation:
  keep the default composition concise and make orientation and disabled states discoverable.

Intentional differences: moduix keeps Ark-shaped parts, explicit native inputs, and CSS-variable
theming instead of adding Chakra `size` or shadcn-style visual variants. Those APIs would widen the
surface without improving correctness or composability for this component.

## Current behavior contract

`SegmentGroup` is the root component. The public parts are thin Ark wrappers that add moduix CSS
Modules and stable `data-slot` values. `SegmentGroupItems` is a fixed convenience renderer for
standard `{ value, label, disabled? }` segment lists.

`SegmentGroup` forwards Ark props such as `value`, `defaultValue`,
`onValueChange(details)`, `name`, `form`, `orientation`, `disabled`, `invalid`, `readOnly`,
`required`, `ids`, and `asChild`. Consumers should read `details.value`; do not unpack or remap
the callback in the wrapper.

moduix defaults `orientation` to `horizontal` on `SegmentGroup`. Explicit
`orientation="vertical"` still preserves Ark vertical keyboard navigation and layout.

## Anatomy and exported parts

```tsx
<SegmentGroup>
  <SegmentGroupIndicator />
  <SegmentGroupItem>
    <SegmentGroupItemText />
    <SegmentGroupItemControl />
  </SegmentGroupItem>
</SegmentGroup>
```

| Part                        | `data-slot`                   | Notes                                      |
| --------------------------- | ----------------------------- | ------------------------------------------ |
| `SegmentGroup`              | `segment-group-root`          | Ark root, value state, orientation, forms. |
| `SegmentGroupRootProvider` | `segment-group-root-provider` | Uses state from `useSegmentGroup`.         |
| `SegmentGroupContext`      | -                             | Advanced render-prop access to root state. |
| `SegmentGroupItemContext`  | -                             | Advanced render-prop access to item state. |
| `SegmentGroupLabel`        | `segment-group-label`         | Optional Ark group label.                  |
| `SegmentGroupItems`        | -                             | Renders standard text items.               |
| `SegmentGroupItem`         | `segment-group-item`          | Ark item, renders a `label` by default.    |
| `SegmentGroupItemControl`  | `segment-group-item-control`  | Hidden visual control part for Ark state.  |
| `SegmentGroupItemText`     | `segment-group-item-text`     | Visible item text.                         |
| `SegmentGroupItemHiddenInput` | -                          | Native input for form submission and reset. |
| `SegmentGroupIndicator`    | `segment-group-indicator`     | Measured active-item highlight.            |

Import `useSegmentGroup`, `useSegmentGroupContext`, and `useSegmentGroupItemContext` from
`@moduix/react` when an advanced state workflow needs `SegmentGroupRootProvider` or current Ark state.

## Composition

Canonical usage:

```tsx
import { SegmentGroup } from '@moduix/react/segment-group';

const frameworks = [
  { value: 'React', label: 'React' },
  { value: 'Solid', label: 'Solid' },
  { value: 'Svelte', label: 'Svelte' },
  { value: 'Vue', label: 'Vue' },
];

export function SegmentGroupDemo() {
  return (
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworks} />
    </SegmentGroup>
  );
}
```

Use `SegmentGroupRootProvider` with moduix `useSegmentGroup` when state must be controlled from
outside the rendered tree. Do not render `SegmentGroup` and `SegmentGroupRootProvider` for the same
state instance. `SegmentGroupItemHiddenInput` is public and explicit for direct item composition.
`SegmentGroupItems` includes it in its fixed convenience tree.

## Upstream feature coverage

- Basic, controlled, root provider, disabled item, vertical orientation, indicator, programmatic
  value control, form usage, and focus control are supported through the same Ark parts and props.
- `asChild` is supported on Ark parts. `SegmentGroupItem` renders a `label` by default; when
  `asChild` is used, the direct child must still be a semantic `label`.
- `SegmentGroupItems` includes a native input for every item; direct `SegmentGroupItem` composition
  requires `SegmentGroupItemHiddenInput`.
- `ids` is forwarded from `SegmentGroup` and `SegmentGroupRootProvider` for explicit accessibility
  composition.
- `SegmentGroupIndicator` preserves Ark CSS variables: `--left`, `--top`, `--width`, and `--height`.
- `Field` state propagates through Ark for `disabled`, `invalid`, `required`, and `readOnly`.
  `Fieldset` provides shared `disabled` and `invalid` state.

## Accessibility and state

Ark owns the WAI-ARIA radio-group behavior, roving focus, keyboard navigation, controlled and
uncontrolled state, disabled/read-only/invalid/required propagation, and hidden input behavior.
Preserve Ark data attributes such as `data-scope="segment-group"`, `data-part`, `data-state`,
`data-orientation`, `data-disabled`, `data-invalid`, `data-required`, `data-active`, and
`data-focus-visible`.

`SegmentGroup`, `SegmentGroupRootProvider`, `SegmentGroupLabel`, `SegmentGroupItem`,
`SegmentGroupItemControl`, `SegmentGroupItemText`, and `SegmentGroupIndicator` forward refs to their
public Ark DOM parts. The native input is not a separate public ref target.

`SegmentGroupContext`, `SegmentGroupItemContext`, `useSegmentGroupContext`, and
`useSegmentGroupItemContext` are exported from `@moduix/react` for advanced state-driven markup.

## Defaults and styling

The CSS uses Ark state attributes, Ark measurement variables on `SegmentGroupIndicator`, and public
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
`orientation="vertical"` for vertical arrow navigation and vertical layout. `SegmentGroupItemControl` is
rendered but visually hidden because the segmented-control affordance comes from the active
`SegmentGroupIndicator` and checked item text color.

## Intentional sugar and differences from upstream

- The family root export `<SegmentGroup>` is the styled Ark root.
- The wrapper adds only moduix styling defaults and `data-slot` hooks.
- `SegmentGroupItems` renders the fixed standard item tree: `SegmentGroupItem`,
  `SegmentGroupItemText`, `SegmentGroupItemControl`, and `SegmentGroupItemHiddenInput`. Use
  `SegmentGroupItem` directly with an explicit `SegmentGroupItemHiddenInput` for custom markup or
  per-item styling.
- `useSegmentGroup` is re-exported from moduix for the documented `SegmentGroupRootProvider` workflow.
- Horizontal orientation is a moduix default because this component is visually a segmented
  control. Ark/Zag behavior remains available through explicit `orientation`.
- No local `size`, `variant`, callback alias, or selection state layer is added.

## Agent notes

- Keep behavior delegated to Ark. Do not add local selection state or callback remapping.
- Keep `SegmentGroupRootProvider`, context parts, and moduix hook exports aligned.
- Keep examples with `SegmentGroupIndicator` before items when the active highlight should render.
- When changing public slots or variables, sync stories, local docs, app docs, registry metadata,
  and generated registry output in the same task.

## Local changelog

- 2026-09-04: Exposed Ark `SegmentGroupItemHiddenInput`; custom item trees now compose it explicitly.
- 2026-08-12: Prevented root and item disabled opacity from compounding, expanded regression
  coverage for native radio semantics, wrapper refs, disabled state, and read-only native
  inputs, and re-checked Ark, Chakra, and shadcn guidance.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-13: Native form controls were rendered automatically at this point in the wrapper history.

- 2026-07-30: Clarified the native-input contract, Field/Fieldset integration, and the
  moduix-owned context exports.

- 2026-07-11: Added `SegmentGroupItems` for standard segment lists and re-exported
  `useSegmentGroup` for the documented `SegmentGroupRootProvider` workflow.
- 2026-07-03: Removed duplicate Ark type aliases from the moduix surface. `SegmentGroupRootProvider`, context
  parts, and state hooks remain available for Ark-shaped advanced composition.
- 2026-06-22: Added Ark UI `segment-group` wrapper with namespace parts, provider/context hooks,
  CSS Modules styling, local documentation, docs examples, and registry metadata.
- 2026-06-22: Set moduix default orientation to horizontal, polished `asChild` card styling, and
  clarified the component choice against Tabs, ToggleGroup, and RadioGroup.
- 2026-06-27: Aligned invalid/read-only styling with Ark state attributes and moved indicator
  motion customization to Ark runtime transition variables.
