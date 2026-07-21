# Menu

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/menu
- Chakra UI: https://chakra-ui.com/docs/components/menu

## Purpose

`Menu` renders trigger-anchored actions, context menus, links, checkbox/radio choices, and nested
command trees.

## Upstream model to preserve

The wrapper follows Ark UI `@ark-ui/react/menu` directly. Preserve the Ark parts:
`Root`, `RootProvider`, `Trigger`, `ContextTrigger`, `Positioner`, `Content`, `Arrow`, `ArrowTip`,
`Item`, `TriggerItem`, `Separator`, `ItemGroup`, `ItemGroupLabel`, `CheckboxItem`,
`RadioItemGroup`, `RadioItem`, `ItemIndicator`, and `ItemText`.

Callbacks and state shapes must remain Ark-shaped: `onOpenChange(details)`,
`onHighlightChange(details)`, `onSelect(details)`, `onValueChange(details)`,
`onCheckedChange(checked)`, `open`, `defaultOpen`, `highlightedValue`, `defaultHighlightedValue`,
`ids`, `present`, `lazyMount`, and `unmountOnExit`.

## Current behavior contract

`Root` and `RootProvider` portal `Positioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

The component exports thin styled wrappers over Ark parts. `useMenu` and `Menu.ItemContext` are
available from the moduix package surface for the normal provider and item-state paths.

Breaking legacy APIs were removed:

- no `render` prop contract; use Ark `asChild`
- no `closeOnClick`; use Ark `closeOnSelect` or item/root defaults
- no `MenuSubmenu`; nested menus are regular `Menu` roots opened by `Menu.TriggerItem`
- no `MenuLinkItem`; use `Menu.Item asChild` with an anchor
- no high-level `Menu.Content` wrapper that hides `Positioner`
- no `createMenuHandle`, `MenuPopup`, `MenuViewport`, `MenuBackdrop`, or `MenuPortal` aliases

## Anatomy and exported parts

```tsx
<Menu>
  <Menu.Trigger>
    <Menu.Indicator />
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Arrow>
        <Menu.ArrowTip />
      </Menu.Arrow>
      <Menu.Item value="edit" />
      <Menu.CheckboxItem value="toolbar" checked={checked}>
        <Menu.ItemIndicator />
        <Menu.ItemText />
      </Menu.CheckboxItem>
      <Menu.RadioItemGroup value={value}>
        <Menu.RadioItem value="date" />
      </Menu.RadioItemGroup>
      <Menu>
        <Menu.TriggerItem />
        <Menu.Positioner>
          <Menu.Content />
        </Menu.Positioner>
      </Menu>
    </Menu.Content>
  </Menu.Positioner>
</Menu>
```

Stable slots:

- `menu-trigger`, `menu-trigger-icon`, `menu-indicator`, `menu-context-trigger`
- `menu-positioner`, `menu-content`, `menu-arrow`, `menu-arrow-tip`
- `menu-item`, `menu-trigger-item`, `menu-trigger-item-icon`, `menu-separator`
- `menu-item-group`, `menu-item-group-label`
- `menu-radio-item-group`, `menu-radio-item`, `menu-checkbox-item`
- `menu-item-indicator`, `menu-item-text`, `menu-item-text-content`, `menu-item-text-icon`,
  `menu-item-text-label`, `menu-item-shortcut`

## Composition

```tsx
import { Button, Menu } from '@moduix/react';

export function Example() {
  return (
    <Menu positioning={{ placement: 'bottom-start', gutter: 8 }}>
      <Menu.Trigger asChild>
        <Button>Actions</Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="edit">Edit</Menu.Item>
          <Menu.Item value="duplicate">Duplicate</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}
```

Use `Menu.RootProvider` with moduix `useMenu()` only when state must be controlled from outside the
tree. Do not render `Menu` and `Menu.RootProvider` for the same state instance.

## Upstream feature coverage

Supported Ark examples and guides:

- basic button-triggered menus with `Positioner` and `Content`
- controlled `open` state and `onOpenChange(details)`
- `RootProvider` and moduix `useMenu`
- `Menu.ItemContext` for inline item state
- item grouping and labels
- link items through `Menu.Item asChild`
- checkbox items and `onCheckedChange(checked)`
- radio item groups and `onValueChange(details)`
- context menus through `ContextTrigger`
- nested menus through child `Menu` roots and `TriggerItem`
- multiple triggers with trigger `value`
- root `onSelect(details)`
- lazy mounting, `present`, and `unmountOnExit`
- custom IDs through root `ids`

## Accessibility and state

Ark owns ARIA roles, roving focus, typeahead, item highlighting, dismissal, focus restoration,
right-click context behavior, long-press context behavior, and nested menu keyboard traversal.

Use `value` for item identity. Do not set arbitrary item `id` values because Ark uses generated
IDs internally for item lookup.

Refs forward to the corresponding Ark DOM part. `Menu.Trigger` targets the trigger button,
`Menu.Content` targets the menu content element, and item refs target their item elements.

## Defaults and styling

Single-line popup items default to `--size-sm` with `--spacing-1` block padding. The default trigger
uses the same compact action rhythm as Button: `--size-md`, `--text-sm`, medium weight, and
`--spacing-1` block padding; every value remains independently configurable.

Group labels inherit the shared `--popup-group-label-*` defaults: muted `xs` text, regular weight,
and `--spacing-1` block padding. Menu-specific variables still take precedence.

Content motion falls back to the shared `--popup-motion-*` tokens; `--menu-*` motion variables
remain the more specific override.

Visual defaults preserve moduix tokens for trigger density, popup radius, shadow, item highlight,
destructive tone, indicators, and shortcuts.

Styles target Ark state and layout hooks:

- `[data-scope='menu']`, `[data-part='trigger']`, `[data-part='indicator']`,
  `[data-part='content']`, `[data-part='item']`, `[data-part='option-item']`
- `[data-type='checkbox' | 'radio']`, `[data-state='open' | 'closed' | 'checked' | 'unchecked']`
- `[data-highlighted]`, `[data-disabled]`, `[data-placement]`, `[data-side]`
- `--reference-width`, `--available-width`, `--available-height`, `--transform-origin`,
  `--layer-index`, `--arrow-size`, and `--arrow-background`

Public `--menu-*` variables are declared in `packages/react/src/lib/moduix/styles/theme.css`.

## Intentional sugar and differences from upstream

moduix adds leaf-level styling helpers only:

- `Menu.TriggerIcon` defaults to `ChevronDownIcon`
- `Menu.Indicator` defaults to `ChevronDownIcon` and sizes a direct custom SVG to its icon box
- `Menu.TriggerItemIcon` defaults to `ChevronRightIcon`
- `Menu.ItemIndicator` defaults to `CheckIcon`
- `Menu.ItemShortcut`, `Menu.ItemTextContent`, `Menu.ItemTextIcon`, and `Menu.ItemTextLabel` support
  common row layouts
- `tone="destructive"` on `Menu.Item`
- `indicator="start" | "end" | "none"` on checkbox and radio item wrappers; defaults to `start`
  and is reflected through `data-indicator-position`

These helpers must not hide the Ark part tree or remap Ark callback detail objects.

## Agent notes

Keep `Menu.Content` as the real Ark content part. Do not reintroduce a wrapper that renders
`Positioner` or `Arrow` internally; only portal transport belongs to the root.

Keep `useMenu` and `Menu.ItemContext` aligned with Ark because the public provider and item-state
examples use them. Other Ark state surfaces remain escape hatches until moduix documents them.

## Local changelog

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Normalized popup group labels to the shared regular-weight, `--spacing-1` contract.

- 2026-07-21: Compacted default popup items to `--size-sm` with `--spacing-1` block padding.

- 2026-07-16: Added shared `--popup-motion-*` fallbacks for project-wide popup content motion.
- 2026-07-10: Exported `useMenu` and `Menu.ItemContext` through moduix so normal provider and
  item-state examples do not require direct Ark imports.

- 2026-07-03: Removed Ark hook, context, and duplicate type re-exports from the moduix surface.
  Kept `RootProvider`, the callable root, visible menu parts, and leaf sugar like `tone`,
  `indicator`, and default icons.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-24: Made checkbox and radio `indicator` placement explicit by defaulting
  `data-indicator-position` to `start`, switched menu docs and stories to the Ark `Menu.Indicator`
  part, and removed stale backdrop story styles.
- 2026-06-19: Aligned popup item highlight defaults with `Select` and `Combobox` by switching
  menu highlighted-row fallback tokens from foreground/background to accent/accent-foreground.
- 2026-06-19: `Menu.Trigger` now skips the internal `.trigger` class when `asChild` is enabled, so
  consumer host components (for example, `Button`) keep their own background styles in
  hover/active/open states.
- 2026-06-19: Removed hardcoded hover/open fallback colors on `Menu.Trigger`. Hover/open background
  now applies only when `--menu-trigger-bg-hover` and/or `--menu-trigger-bg-active` are explicitly
  set, so `Menu.Trigger asChild` does not override consumer button styling.
- 2026-06-19: Changed `Menu.Trigger` open-state background fallback to `--menu-trigger-bg` so
  opening a popup no longer forces the hover accent color unless `--menu-trigger-bg-active` is set.
- 2026-06-18: Migrated `Menu` to Ark UI React. Removed legacy compatibility exports
  and rewrote the public contract around Ark parts, `asChild`, `value` items, `RootProvider`,
  `ContextTrigger`, `TriggerItem`, Ark state attributes, and Ark positioning variables.
- 2026-06-16: Added `tone="destructive"` and dedicated destructive highlight tokens for softer
  destructive hover backgrounds.
- 2026-06-14: Added `indicator="none"` for checkbox and radio rows so menus can opt out of the
  reserved indicator column without causing selection-time layout shift.
- 2026-06-10: Added phase-specific backdrop and popup motion tokens for menu enter/exit motion.
- 2026-06-02: Rewrote the local documentation around the previous wrapper contract.