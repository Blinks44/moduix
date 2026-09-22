# ToggleGroup

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/toggle-group
- Chakra UI does not have a dedicated ToggleGroup component.

## Purpose

`ToggleGroup` is the moduix wrapper for a set of related two-state buttons that share selected
values.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/toggle-group`.

- The public values are `ToggleGroup`, `ToggleGroupItem`, `ToggleGroupRootProvider`, and
  `ToggleGroupContext`.
- `value` and `defaultValue` are `string[]` in single and multiple modes.
- `onValueChange` receives Ark `details`; consumers read `details.value`.
- `useToggleGroup()` creates a state instance for `ToggleGroupRootProvider`.
- `useToggleGroupContext()` reads group state below an existing root/provider.
- Ark owns roving focus, orientation-aware keyboard navigation, disabled state, ids, and item
  `data-state="on" | "off"`.

## Current behavior contract

- `ToggleGroup` wraps `ArkToggleGroup.Root`.
- `ToggleGroupRootProvider` wraps `ArkToggleGroup.RootProvider`.
- `ToggleGroupItem` wraps `ArkToggleGroup.Item`.
- `ToggleGroupContext` exposes `ArkToggleGroup.Context`.
- moduix adds two visual props to root, root provider, and item:
  - `variant?: 'default' | 'outline' | 'ghost'`
  - `size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'`
- `variant` defaults to `default`. `size` defaults to `md`.
- Root and root provider write `data-slot`, `data-variant`, and `data-size`.
- Item writes `data-slot="toggle-group-item"`, `data-variant`, and `data-size`.
- Those styling hooks are wrapper-owned and cannot be replaced through HTML `data-*` props.
- Items inherit the root/root-provider `variant` and `size` through a small local visual context.
  That context must not own selection, focus, disabled state, callbacks, ids, or ARIA behavior.
- Compound members, duplicate root aliases, legacy `render` and `nativeButton` props, and raw-array
  `onValueChange` callbacks are not part of this Ark-backed API.
- `ToggleGroupRootProps`, `ToggleGroupRootProviderProps`, `ToggleGroupItemProps`, `ToggleVariant`, and
  `ToggleSize` are exported for typed composition.

## Anatomy and exported parts

```text
ToggleGroup
├─ ToggleGroupContext (optional)
└─ ToggleGroupItem

ToggleGroupRootProvider
└─ ToggleGroupItem
```

| Part                               | data-slot                    | Purpose                                                |
| ---------------------------------- | ---------------------------- | ------------------------------------------------------ |
| `ToggleGroup`                      | `toggle-group-root`          | Ark root with selected values, roving focus, and size. |
| `ToggleGroupRootProvider`         | `toggle-group-root-provider` | Ark root driven by an external `useToggleGroup` state. |
| `ToggleGroupContext`              | -                            | Render-prop access to current group state.             |
| `ToggleGroupItem`                 | `toggle-group-item`          | Ark item button styled with moduix toggle visuals.     |

## Composition

Canonical usage:

```tsx
import { ToggleGroup, ToggleGroupItem } from '@moduix/react/toggle-group';

export function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}
```

Controlled usage keeps Ark callback details:

```tsx
import { ToggleGroup, ToggleGroupItem } from '@moduix/react/toggle-group';
import { useState } from 'react';

export function ControlledToggleGroupDemo() {
  const [value, setValue] = useState(['grid'] as string[]);

  return (
    <ToggleGroup
      value={value}
      onValueChange={(details) => setValue(details.value)}
      aria-label="View mode"
    >
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="map">Map</ToggleGroupItem>
    </ToggleGroup>
  );
}
```

Root provider usage:

```tsx
import {
  ToggleGroupItem,
  ToggleGroupRootProvider,
  useToggleGroup,
} from '@moduix/react/toggle-group';

export function RootProviderToggleGroupDemo() {
  const toggleGroup = useToggleGroup({ defaultValue: ['left'] });

  return (
    <ToggleGroupRootProvider value={toggleGroup} aria-label="Text alignment">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroupRootProvider>
  );
}
```

## Upstream feature coverage

- Basic: covered by `<ToggleGroup>` with `ToggleGroupItem` children.
- Controlled: supported with Ark `value` and `onValueChange(details)`.
- Multiple: supported with Ark `multiple`.
- RootProvider: supported with `ToggleGroupRootProvider` and an Ark `useToggleGroup()` state
  instance.
- Deselectable single selection: supported with Ark `deselectable`.
- Orientation and focus: supported with Ark `orientation`, `loopFocus`, and `rovingFocus`.
- Custom host composition: supported with Ark `asChild` on root, root provider, and item.
- IDs: supported through Ark `id` and `ids`.
- Form submission: not applicable; Ark ToggleGroup does not expose `HiddenInput`.

## Accessibility and state

- Root and items should receive accessible names through visible text, `aria-label`, or
  `aria-labelledby`.
- Icon-only items need item-level `aria-label`.
- Refs forward to the Ark DOM parts: root/root-provider `HTMLDivElement`, item `HTMLButtonElement`.
- Ark manages roving tab index, arrow-key navigation, pressed semantics, disabled propagation, and
  item selection state.
- Single-selection roots use `radiogroup` with `radio` items and `aria-checked`; multiple roots use
  `group` with button `aria-pressed`.
- Left/Right navigate horizontal groups, Up/Down navigate vertical groups, and Home/End focus the
  first/last enabled item. Space/Enter activate the focused button, and `loopFocus` controls
  whether arrow navigation wraps.
- Root supports `disabled`, `orientation`, `loopFocus`, `rovingFocus`, `multiple`, `deselectable`,
  `id`, and `ids`.
- `deselectable` is ignored when `multiple` is enabled.
- Item supports required `value`, `disabled`, and `asChild`.
- Ark data attributes to preserve: `data-scope="toggle-group"`, `data-part`, `data-orientation`,
  `data-disabled`, `data-focus`, and item `data-state="on" | "off"`.
- No Ark CSS variables are currently documented for ToggleGroup.
- Horizontal groups scroll when their content exceeds the available inline size. They do not wrap,
  preserving Ark's linear roving-focus behavior.

## Defaults and styling

- Root and root provider merge `styles.root` with consumer `className`.
- Item merges `Toggle.module.css` root styles, `ToggleGroup.module.css` item styles, and consumer
  `className`.
- Root and root provider cap their inline size to their container and use horizontal overflow for
  long groups.
- Root/root-provider write `data-slot="toggle-group-root"` or
  `data-slot="toggle-group-root-provider"`.
- Item writes `data-slot="toggle-group-item"`.
- `data-variant` and `data-size` are moduix visual hooks.
- A root/root-provider `variant` and `size` flows to every item unless that item declares its own
  value.
- Root CSS variables:
  - `--moduix-toggle-group-bg`
  - `--moduix-toggle-group-border-color`
  - `--moduix-toggle-group-border-width`
  - `--moduix-toggle-group-color`
  - `--moduix-toggle-group-gap`
  - `--moduix-toggle-group-ghost-bg`
  - `--moduix-toggle-group-ghost-border-color`
  - `--moduix-toggle-group-ghost-padding`
  - `--moduix-toggle-group-item-radius`
  - `--moduix-toggle-group-outline-bg`
  - `--moduix-toggle-group-padding`
  - `--moduix-toggle-group-radius`
- Item also supports the public `--moduix-toggle-*` variables from `Toggle`.
- Group-level overrides take priority across `default`, `outline`, and `ghost`; variant-specific
  group variables provide the fallback for their corresponding treatment.
- Set `--moduix-toggle-*` on the root to style all items, or on an item to style only that control.

## Intentional sugar and differences from upstream

- `variant` and `size` are moduix visual sugar layered over Ark behavior.
- Item styling reuses standalone `Toggle` visuals. Unpressed item text follows the group root
  color, so a default-variant item in a group intentionally differs from a standalone default
  `Toggle`, whose unpressed text is `secondary-foreground`.
- Items inherit root/root-provider `variant` and `size` unless the item overrides them.
- `ToggleGroupRootProvider`, `ToggleGroupContext`, `useToggleGroup()`, and
  `useToggleGroupContext()` are public for normal provider and state composition.
- The legacy `render`/`nativeButton` composition path is intentionally removed. Use Ark
  `asChild`.
- `onValueChange={setValue}` is intentionally removed because Ark passes details, not a raw array.

## Agent notes

- Keep behavior delegated to Ark. Do not add local selection state or callback remapping.
- Keep the local context limited to visual `variant` and `size` inheritance.
- Keep long horizontal groups scrollable rather than wrapping their items.
- If Ark adds more parts, context hooks, or CSS variables, mirror and document the public surface.
- Keep examples and stories using the flat `ToggleGroupItem` export.
- Keep `ToggleGroupItem` visuals synchronized with standalone `Toggle` when token names or
  variants change.

## Local changelog

- 2026-08-14: Made group-level token overrides apply consistently across variants and restored
  root-level Toggle token inheritance for item state customization.
- 2026-08-01: Made wrapper styling hooks non-overridable, exported the public composition types,
  kept long horizontal groups reachable through inline scrolling, and added Context coverage.
- 2026-07-12: Restored the Ark-aligned `Context`, `useToggleGroup()`, and
  `useToggleGroupContext()` surfaces through moduix so normal advanced composition avoids direct
  Ark imports.
- 2026-07-03: Removed public re-exports of Ark toggle-group context helpers and render-prop
  accessors while keeping `RootProvider` for externally owned Ark state.
- 2026-06-29: Clarified Ark role, keyboard, `ids`, and context contracts; simplified CSS nesting
  and docs examples; replaced fractional group padding with the matching border-width token; added
  provider/context story coverage.
- 2026-06-21: Migrated `ToggleGroup` to Ark UI React, adopted Ark `onValueChange(details)`,
  exposed provider, context, hooks, and types, and updated the styling contract around Ark data
  attributes.
