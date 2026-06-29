# ToggleGroup

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/toggle-group
- Chakra UI: https://chakra-ui.com/docs/components/toggle-group

## Purpose

`ToggleGroup` is the moduix wrapper for a set of related two-state buttons that share selected
values.

## Upstream model to preserve

The wrapper follows Ark UI React `@ark-ui/react/toggle-group`.

- The public parts are `Root`, `Item`, `RootProvider`, and `Context`.
- `value` and `defaultValue` are `string[]` in single and multiple modes.
- `onValueChange` receives Ark `details`; consumers read `details.value`.
- `useToggleGroup()` creates a state instance for `ToggleGroup.RootProvider`.
- `useToggleGroupContext()` reads group state below an existing root/provider.
- Ark owns roving focus, orientation-aware keyboard navigation, disabled state, ids, and item
  `data-state="on" | "off"`.

## Current behavior contract

- `ToggleGroup` is the short root form and is equivalent to `ToggleGroup.Root`.
- `ToggleGroup.Root` wraps `ArkToggleGroup.Root`.
- `ToggleGroup.RootProvider` wraps `ArkToggleGroup.RootProvider`.
- `ToggleGroup.Item` wraps `ArkToggleGroup.Item`.
- `ToggleGroup.Context`, `useToggleGroup`, and `useToggleGroupContext` are exported from the public
  barrel.
- moduix adds two visual props to root, root provider, and item:
  - `variant?: 'default' | 'outline' | 'ghost'`
  - `size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'`
- `variant` defaults to `default`. `size` defaults to `md`.
- Root and root provider write `data-slot`, `data-variant`, and `data-size`.
- Item writes `data-slot="toggle-group-item"`, `data-variant`, and `data-size`.
- Items inherit the root/root-provider `variant` and `size` through a small local visual context.
  That context must not own selection, focus, disabled state, callbacks, ids, or ARIA behavior.
- Flat `ToggleGroupItem`, legacy `render`, `nativeButton`, and raw-array `onValueChange` callback
  compatibility are not part of this Ark-backed API.

## Anatomy and exported parts

```text
ToggleGroup / ToggleGroup.Root
└─ ToggleGroup.Item

ToggleGroup.RootProvider
└─ ToggleGroup.Item
```

| Part                               | data-slot                    | Purpose                                                |
| ---------------------------------- | ---------------------------- | ------------------------------------------------------ |
| `ToggleGroup` / `ToggleGroup.Root` | `toggle-group-root`          | Ark root with selected values, roving focus, and size. |
| `ToggleGroup.RootProvider`         | `toggle-group-root-provider` | Ark root driven by an external `useToggleGroup` state. |
| `ToggleGroup.Item`                 | `toggle-group-item`          | Ark item button styled with moduix toggle visuals.     |
| `ToggleGroup.Context`              | —                            | Ark render-prop state access.                          |

## Composition

Canonical usage:

```tsx
import { ToggleGroup } from '@moduix/react';

export function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
      <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
      <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
      <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
    </ToggleGroup>
  );
}
```

Controlled usage keeps Ark callback details:

```tsx
import { ToggleGroup } from '@moduix/react';
import { useState } from 'react';

export function ControlledToggleGroupDemo() {
  const [value, setValue] = useState(['grid'] as string[]);

  return (
    <ToggleGroup
      value={value}
      onValueChange={(details) => setValue(details.value)}
      aria-label="View mode"
    >
      <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
      <ToggleGroup.Item value="map">Map</ToggleGroup.Item>
    </ToggleGroup>
  );
}
```

Root provider usage:

```tsx
import { ToggleGroup, useToggleGroup } from '@moduix/react';

export function RootProviderToggleGroupDemo() {
  const toggleGroup = useToggleGroup({ defaultValue: ['left'] });

  return (
    <ToggleGroup.RootProvider value={toggleGroup} aria-label="Text alignment">
      <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
      <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
      <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
    </ToggleGroup.RootProvider>
  );
}
```

## Upstream feature coverage

- Basic: covered by `<ToggleGroup>` / `<ToggleGroup.Root>` with `ToggleGroup.Item` children.
- Controlled: supported with Ark `value` and `onValueChange(details)`.
- Multiple: supported with Ark `multiple`.
- RootProvider: supported with `useToggleGroup()` and `ToggleGroup.RootProvider`.
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

## Defaults and styling

- Root and root provider merge `styles.root` with consumer `className`.
- Item merges `Toggle.module.css` root styles, `ToggleGroup.module.css` item styles, and consumer
  `className`.
- Root/root-provider write `data-slot="toggle-group-root"` or
  `data-slot="toggle-group-root-provider"`.
- Item writes `data-slot="toggle-group-item"`.
- `data-variant` and `data-size` are moduix visual hooks.
- Root CSS variables:
  - `--toggle-group-bg`
  - `--toggle-group-border-color`
  - `--toggle-group-border-width`
  - `--toggle-group-color`
  - `--toggle-group-gap`
  - `--toggle-group-ghost-bg`
  - `--toggle-group-ghost-border-color`
  - `--toggle-group-ghost-padding`
  - `--toggle-group-item-radius`
  - `--toggle-group-outline-bg`
  - `--toggle-group-padding`
  - `--toggle-group-radius`
- Item also supports the public `--toggle-*` variables from `Toggle`.

## Intentional sugar and differences from upstream

- The short root export `<ToggleGroup>` is equivalent to `<ToggleGroup.Root>`.
- `variant` and `size` are moduix visual sugar layered over Ark behavior.
- Item styling reuses standalone `Toggle` visuals so `Toggle` and `ToggleGroup.Item` stay visually
  synchronized.
- Items inherit root/root-provider `variant` and `size` unless the item overrides them.
- The legacy flat `ToggleGroupItem` export is intentionally removed. Use `ToggleGroup.Item`.
- The legacy `render`/`nativeButton` composition path is intentionally removed. Use Ark
  `asChild`.
- `onValueChange={setValue}` is intentionally removed because Ark passes details, not a raw array.

## Agent notes

- Keep behavior delegated to Ark. Do not add local selection state or callback remapping.
- Keep the local context limited to visual `variant` and `size` inheritance.
- If Ark adds more parts, context hooks, or CSS variables, mirror and document the public surface.
- Keep examples and stories using `ToggleGroup.Item`, not a flat item alias.
- Keep `ToggleGroup.Item` visuals synchronized with standalone `Toggle` when token names or
  variants change.

## Local changelog

- 2026-06-29: Clarified Ark role, keyboard, `ids`, and context contracts; simplified CSS nesting
  and docs examples; replaced fractional group padding with the matching border-width token; added
  provider/context story coverage.
- 2026-06-21: Migrated `ToggleGroup` to Ark UI React, replaced flat
  `ToggleGroupItem` with `ToggleGroup.Item`, adopted Ark `onValueChange(details)`, exposed
  `RootProvider`/`Context`/hooks/types, and updated the styling contract around Ark data
  attributes.