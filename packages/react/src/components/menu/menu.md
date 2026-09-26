# Menu

Upstream review (accessed 2026-08-11):

- Ark UI: https://ark-ui.com/docs/components/menu
- Chakra UI: https://chakra-ui.com/docs/components/menu
- shadcn/ui: https://ui.shadcn.com/docs/components/dropdown-menu

## Purpose

`Menu` renders trigger-anchored actions, context menus, links, checkbox/radio choices, and nested
command trees.

## Upstream model to preserve

The wrapper follows Ark UI `@ark-ui/react/menu` directly. Preserve the Ark parts:
`Root`, `RootProvider`, `Trigger`, `ContextTrigger`, `Positioner`, `Content`, `Arrow`, `ArrowTip`,
`Item`, `TriggerItem`, `Separator`, `ItemGroup`, `ItemGroupLabel`, `CheckboxItem`,
`RadioItemGroup`, `RadioItem`, `ItemIndicator`, and `ItemText`.

moduix additionally exports `Viewport`, an explicit styled container for the scrollable item region.
It is not an Ark state part and does not alter menu behavior.

Callbacks and state shapes must remain Ark-shaped: `onOpenChange(details)`,
`onHighlightChange(details)`, `onSelect(details)`, `onValueChange(details)`,
`onCheckedChange(checked)`, `open`, `defaultOpen`, `highlightedValue`, `defaultHighlightedValue`,
`ids`, `present`, `lazyMount`, and `unmountOnExit`.

## Current behavior contract

`Root` and `RootProvider` portal `Positioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

The component exports thin styled wrappers over Ark parts. `useMenu`, `MenuContext`,
`useMenuContext`, `MenuItemContext`, and `useMenuItemContext` are available from the moduix package
surface for provider and descendant state paths. `ContextTrigger` uses the compact trigger styling by
default and leaves a custom `asChild` host untouched.

Breaking legacy APIs were removed:

- no `render` prop contract; use Ark `asChild`
- no `closeOnClick`; use Ark `closeOnSelect` or item/root defaults
- no `MenuSubmenu`; nested menus are regular `Menu` roots opened by `MenuTriggerItem`
- no `MenuLinkItem`; use `MenuItem asChild` with an anchor
- no high-level `MenuContent` wrapper that hides `Positioner`
- no `createMenuHandle`, `MenuPopup`, `MenuBackdrop`, or `MenuPortal` aliases

## Anatomy and exported parts

```tsx
<Menu>
  <MenuTrigger>
    <MenuIndicator />
  </MenuTrigger>
  <MenuPositioner>
    <MenuContent>
      <MenuViewport>
        <MenuItem value="edit" />
        <MenuCheckboxItem value="toolbar" checked={checked}>
          <MenuItemIndicator />
          <MenuItemText />
        </MenuCheckboxItem>
        <MenuRadioItemGroup value={value}>
          <MenuRadioItem value="date" />
        </MenuRadioItemGroup>
        <Menu>
          <MenuTriggerItem />
          <MenuPositioner>
            <MenuContent>
              <MenuViewport />
            </MenuContent>
          </MenuPositioner>
        </Menu>
      </MenuViewport>
    </MenuContent>
  </MenuPositioner>
</Menu>
```

Stable slots:

- `menu-trigger`, `menu-trigger-icon`, `menu-indicator`, `menu-context-trigger`
- `menu-positioner`, `menu-content`, `menu-viewport`, `menu-arrow`, `menu-arrow-tip`
- `menu-item`, `menu-trigger-item`, `menu-trigger-item-icon`, `menu-separator`
- `menu-item-group`, `menu-item-group-label`
- `menu-radio-item-group`, `menu-radio-item`, `menu-checkbox-item`
- `menu-item-indicator`, `menu-item-text`, `menu-item-text-content`, `menu-item-text-icon`,
  `menu-item-text-label`, `menu-item-shortcut`

State exports: `MenuContext`, `useMenuContext`, `MenuItemContext`, and `useMenuItemContext`.

## Composition

```tsx
import { Button } from '@moduix/react/button';
import {
  Menu,
  MenuRootProvider,
  MenuContext,
  MenuTrigger,
  MenuTriggerIcon,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuArrow,
  MenuItem,
  MenuTriggerItem,
  MenuTriggerItemIcon,
  MenuRadioItemGroup,
  MenuRadioItem,
  MenuCheckboxItem,
  MenuItemIndicator,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuItemShortcut,
  MenuItemContext,
} from '@moduix/react/menu';

export function Example() {
  return (
    <Menu positioning={{ placement: 'bottom-start', gutter: 8 }}>
      <MenuTrigger asChild>
        <Button>Actions</Button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuViewport>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}
```

Use `MenuRootProvider` with moduix `useMenu()` only when state must be controlled from outside the
tree. Do not render `Menu` and `MenuRootProvider` for the same state instance.

## Upstream feature coverage

Supported Ark examples and guides:

- basic button-triggered menus with `Positioner` and `Content`
- controlled `open` state and `onOpenChange(details)`
- `RootProvider` and moduix `useMenu`
- `MenuItemContext` for inline item state
- item grouping and labels
- link items through `MenuItem asChild`
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

Refs forward to the corresponding Ark DOM part. `MenuTrigger` targets the trigger button,
`MenuContent` targets the menu content element, and item refs target their item elements.

`MenuViewport` scrolls when its height reaches `--moduix-menu-popup-max-height` or Ark's available
viewport height. Keep an optional `MenuArrow` as a direct child of `MenuContent`, next to the
viewport, so it remains outside the scroll clip. The default `MenuTriggerItemIcon` flips in RTL so
its direction matches submenu navigation. Both `Content` and `Viewport` support `asChild` without
reordering or inspecting their children, including during SSR.

## Defaults and styling

Single-line popup items default to `--moduix-size-sm` with `--moduix-spacing-1` block padding. The default trigger
uses the same compact action rhythm as Button: `--moduix-size-md`, `--moduix-text-sm`, medium weight, and
`--moduix-spacing-1` block padding; every value remains independently configurable.

Group labels inherit the shared `--moduix-popup-group-label-*` defaults: muted `xs` text, regular weight,
and `--moduix-spacing-1` block padding. Menu-specific variables still take precedence.

Content motion falls back to the shared `--moduix-popup-motion-*` tokens; `--moduix-menu-*` motion variables
remain the more specific override.

Visual defaults preserve moduix tokens for trigger density, popup radius, shadow, item highlight,
destructive tone, indicators, and shortcuts.

`MenuContent` allows its overflow to be overridden with `--moduix-menu-popup-overflow`; it defaults
to `visible` so the direct `MenuArrow` can extend beyond the popup outline. Set it to `hidden` only
when clipping popup content is required.

Styles target Ark state and layout hooks:

- `[data-scope='menu']`, `[data-part='trigger']`, `[data-part='indicator']`,
  `[data-part='content']`, `[data-part='item']`
- `[data-type='checkbox' | 'radio']`, `[data-state='open' | 'closed' | 'checked' | 'unchecked']`
- `[data-current]`, `[data-highlighted]`, `[data-disabled]`, `[data-placement]`, `[data-side]`
- `--reference-width`, `--available-width`, `--available-height`, `--transform-origin`,
  `--layer-index`, `--arrow-size`, and `--arrow-background`

Public `--moduix-menu-*` variables are declared in `packages/foundation/src/styles/variables-moduix.css`.

## Intentional sugar and differences from upstream

moduix adds leaf-level styling helpers only:

- `MenuTriggerIcon` defaults to `ChevronDownIcon`
- `MenuIndicator` defaults to `ChevronDownIcon` and sizes a direct custom SVG to its icon box
- `MenuTriggerItemIcon` defaults to `ChevronRightIcon`
- `MenuItemIndicator` defaults to `CheckIcon`
- `MenuItemShortcut`, `MenuItemTextContent`, `MenuItemTextIcon`, and `MenuItemTextLabel` support
  common row layouts
- `tone="destructive"` on `MenuItem`
- `indicator="start" | "end" | "none"` on checkbox and radio item wrappers; defaults to `start`
  and is reflected through `data-indicator-position`

These helpers must not hide the Ark part tree or remap Ark callback detail objects.

## Agent notes

Keep `MenuContent` as the real Ark content part. Do not reintroduce a wrapper that renders,
reorders, or detects `Positioner`, `Viewport`, or `Arrow` internally; only portal transport belongs
to the root. Consumers compose `MenuViewport` explicitly around the scrollable item collection and
keep `MenuArrow` as a direct content child so it can extend beyond the popup outline.

Keep `useMenu` and `MenuItemContext` aligned with Ark because the public provider and item-state
examples use them. Other Ark state surfaces remain escape hatches until moduix documents them.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-09-08: Added the explicit `MenuViewport` part and removed child inspection/reordering from
  `MenuContent`, making the popup structure deterministic across client rendering, SSR, and
  hydration. Existing content must wrap its scrollable item collection in `MenuViewport`.

- 2026-08-11: Added a reduced-motion path for popup and trigger transitions, corrected the public
  CSS-variable reference, and covered the automatic and inline portal contracts.

- 2026-08-11: Made the recommended popup composition arrowless and kept `MenuArrow` as an
  explicit visual-anchor option.

- 2026-08-01: Defaulted portalled overlay presence to lazy mounting and unmounting after exit.

- 2026-07-29: Added `--moduix-menu-popup-overflow` so consumers can clip `MenuContent` when needed;
  it defaults to `visible` to preserve direct-arrow rendering.

- 2026-07-29: Restored Ark `MenuContent asChild` composition so a custom single host stays the
  actual menu content element. Removed the stale `option-item` styling hook from the docs.

- 2026-07-25: Scope the open trigger treatment to Ark's `data-current` so a shared menu only
  highlights the trigger that opened it.

- 2026-07-24: Let `MenuArrow` extend beyond and paint over the content outline, so its stroke
  joins the popup border instead of being clipped or layered beneath it.

- 2026-07-24: Kept custom context triggers unstyled with `asChild`, made menu content scroll within
  its viewport limit, and flipped the default submenu icon in RTL.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Normalized popup group labels to the shared regular-weight, `--moduix-spacing-1` contract.

- 2026-07-21: Compacted default popup items to `--moduix-size-sm` with `--moduix-spacing-1` block padding.

- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for project-wide popup content motion.
- 2026-07-10: Exported `useMenu` and `MenuItemContext` through moduix so normal provider and
  item-state examples do not require direct Ark imports.

- 2026-07-03: Removed Ark hook, context, and duplicate type re-exports from the moduix surface.
  Kept `RootProvider`, the callable root, visible menu parts, and leaf sugar like `tone`,
  `indicator`, and default icons.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-24: Made checkbox and radio `indicator` placement explicit by defaulting
  `data-indicator-position` to `start`, switched menu docs and stories to the Ark `MenuIndicator`
  part, and removed stale backdrop story styles.
- 2026-06-19: Aligned popup item highlight defaults with `Select` and `Combobox` by switching
  menu highlighted-row fallback tokens from foreground/background to accent/accent-foreground.
- 2026-06-19: `MenuTrigger` now skips the internal `.trigger` class when `asChild` is enabled, so
  consumer host components (for example, `Button`) keep their own background styles in
  hover/active/open states.
- 2026-06-19: Removed hardcoded hover/open fallback colors on `MenuTrigger`. Hover/open background
  now applies only when `--moduix-menu-trigger-bg-hover` and/or `--moduix-menu-trigger-bg-active` are explicitly
  set, so `MenuTrigger asChild` does not override consumer button styling.
- 2026-06-19: Changed `MenuTrigger` open-state background fallback to `--moduix-menu-trigger-bg` so
  opening a popup no longer forces the hover accent color unless `--moduix-menu-trigger-bg-active` is set.
- 2026-06-18: Migrated `Menu` to Ark UI React. Removed legacy compatibility exports
  and rewrote the public contract around Ark parts, `asChild`, `value` items, `RootProvider`,
  `ContextTrigger`, `TriggerItem`, Ark state attributes, and Ark positioning variables.
- 2026-06-16: Added `tone="destructive"` and dedicated destructive highlight tokens for softer
  destructive hover backgrounds.
- 2026-06-14: Added `indicator="none"` for checkbox and radio rows so menus can opt out of the
  reserved indicator column without causing selection-time layout shift.
- 2026-06-10: Added phase-specific backdrop and popup motion tokens for menu enter/exit motion.
- 2026-06-02: Rewrote the local documentation around the previous wrapper contract.