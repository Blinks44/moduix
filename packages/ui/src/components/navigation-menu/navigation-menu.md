---
title: Navigation Menu
subtitle: Multi-level site navigation with a built-in popup viewport and optional low-level composition.
description: moduix wrapper around Base UI navigation-menu primitives with a default popup composition, trigger icon sugar, stable styling hooks, and documented escape hatches.
---

# NavigationMenu

Upstream primitive docs: https://base-ui.com/react/components/navigation-menu

`NavigationMenu` is the moduix site-navigation wrapper. It keeps Base UI interaction behavior, but
documents and stabilizes the moduix contract: exported parts, popup defaults, `data-slot` hooks,
CSS variables, and the small DX sugar we intentionally keep.

## Purpose

Use `NavigationMenu` for top-level navigation that may reveal richer panels, grouped links, or a
second navigation level.

Use:

- `NavigationMenuTrigger` + `NavigationMenuContent` for panels that open in the shared popup.
- `NavigationMenuLink` for direct navigation items and panel links that navigate to another page or
  route.
- nested `NavigationMenu` instances when a panel needs a second navigation layer.

Avoid it for action menus or lightweight command lists. Those belong to `Menu` or `Menubar`.

## Current behavior contract

This component is **not** a direct re-export of the Base UI API.

moduix adds and standardizes:

- a high-level root path where `NavigationMenu` renders `NavigationMenuPortal`,
  `NavigationMenuPositioner`, `NavigationMenuPopup`, and `NavigationMenuViewport` for you;
- `showPopup` on the root to disable that built-in popup composition when you need to place the
  viewport manually;
- `showArrow` on the root to enable the built-in popup arrow;
- `icon` on `NavigationMenuTrigger` to replace or suppress the default chevron;
- stable `data-slot` attributes for all exported parts;
- public CSS variables under the `--navigation-menu-*` namespace;
- exported wrapper types: `NavigationMenuPositionerProps`, `NavigationMenuProps`, and
  `NavigationMenuTriggerProps`.

Defaults applied by the wrapper:

- built-in popup composition is enabled by default;
- built-in popup arrow is disabled by default;
- built-in positioner uses `sideOffset={10}`;
- built-in positioner uses `collisionAvoidance={{ side: 'none' }}`;
- built-in positioner uses `collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}`.

## Recommended composition

Use the default root composition unless you need a backdrop, manual popup placement, or an inline
viewport.

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'moduix';

export function Example() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>{/* panel content */}</NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/releases" closeOnClick>
            Releases
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

When `showPopup={false}`, you must render `NavigationMenuViewport` somewhere in the tree yourself or
panel content will not be displayed.

## Parts

| Export                     | Role                                                                       |
| -------------------------- | -------------------------------------------------------------------------- |
| `NavigationMenu`           | Root state, keyboard interaction, and optional built-in popup composition. |
| `NavigationMenuList`       | Top-level list container.                                                  |
| `NavigationMenuItem`       | Item wrapper that owns trigger/content or direct link state.               |
| `NavigationMenuTrigger`    | Interactive trigger for popup content.                                     |
| `NavigationMenuIcon`       | Trigger icon part. Defaults to `ChevronDownIcon`.                          |
| `NavigationMenuContent`    | Panel content that is shown through the shared viewport.                   |
| `NavigationMenuLink`       | Direct navigation item styled like a trigger.                              |
| `NavigationMenuPortal`     | Low-level portal part.                                                     |
| `NavigationMenuBackdrop`   | Optional visual backdrop. Styled as non-interactive by default.            |
| `NavigationMenuPositioner` | Low-level positioning part for the shared popup.                           |
| `NavigationMenuPopup`      | Low-level popup surface around the shared viewport.                        |
| `NavigationMenuArrow`      | Popup arrow. Renders the moduix popup arrow icon by default.               |
| `NavigationMenuViewport`   | Shared viewport that renders the active `NavigationMenuContent`.           |

## Public props

All parts forward the matching Base UI primitive props. The table below covers the parts where
moduix adds defaults or wrapper-specific behavior.

### `NavigationMenu`

`NavigationMenuProps` is exported from `moduix`.

| Prop                                                                                                                               | Default                                      | Notes                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------- |
| `showPopup`                                                                                                                        | `true`                                       | Renders the built-in portal + positioner + popup + viewport composition.              |
| `showArrow`                                                                                                                        | `false`                                      | Adds `NavigationMenuArrow` inside the built-in popup.                                 |
| `sideOffset`                                                                                                                       | `10`                                         | Default gap for the built-in `NavigationMenuPositioner`.                              |
| `collisionAvoidance`                                                                                                               | `{ side: 'none' }`                           | Keeps the shared popup from flipping sides by default.                                |
| `collisionPadding`                                                                                                                 | `{ top: 5, bottom: 5, left: 20, right: 20 }` | Default viewport-edge padding for the built-in positioner.                            |
| `side`, `align`, `alignOffset`, `arrowPadding`, `anchor`, `collisionBoundary`, `sticky`, `positionMethod`, `disableAnchorTracking` | Base UI default unless noted above           | Forwarded only to the built-in `NavigationMenuPositioner` when `showPopup` is `true`. |

`NavigationMenu` also forwards Base UI root props such as `value`, `defaultValue`,
`onValueChange`, `orientation`, `delay`, `closeDelay`, `actionsRef`, `render`, `className`, and
`style`.

### `NavigationMenuTrigger`

`NavigationMenuTriggerProps` is exported from `moduix`.

| Prop     | Default             | Notes                                                                                                     |
| -------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| `icon`   | built-in chevron    | Pass custom content to replace the icon. Pass `null` or `false` to suppress it.                           |
| `render` | Base UI passthrough | Lets consumers own the trigger element. moduix skips the default trigger class when `render` is provided. |

Important caveat: `render` does **not** suppress the built-in icon. If your custom trigger should not
render a chevron, also pass `icon={null}`.

### Low-level popup parts

`NavigationMenuPositionerProps` is exported from `moduix`.

Use `NavigationMenuPortal`, `NavigationMenuPositioner`, `NavigationMenuPopup`,
`NavigationMenuArrow`, and `NavigationMenuViewport` only when you need to own the popup structure
directly. The common reasons are:

- adding a backdrop;
- taking control over popup placement;
- moving the viewport inline for nested panels.

## Composition patterns

### Full control over popup structure

```tsx
<NavigationMenu showPopup={false}>
  <NavigationMenuList>{/* items */}</NavigationMenuList>

  <NavigationMenuPortal>
    <NavigationMenuBackdrop />
    <NavigationMenuPositioner sideOffset={16}>
      <NavigationMenuPopup>
        <NavigationMenuArrow />
        <NavigationMenuViewport />
      </NavigationMenuPopup>
    </NavigationMenuPositioner>
  </NavigationMenuPortal>
</NavigationMenu>
```

### Nested submenu with another `NavigationMenu`

Use a nested `NavigationMenu` inside `NavigationMenuContent` when the second level should open in
its own popup. The nested menu usually uses `orientation="vertical"` and a side like `right`.

### Inline nested viewport

Use `showPopup={false}` on the nested menu and render `NavigationMenuViewport` inline when the
second level should stay inside the current panel rather than opening another popup.

## Styling API

### `data-slot`

Every exported part has a stable `data-slot`:

- `navigation-menu-root`
- `navigation-menu-list`
- `navigation-menu-item`
- `navigation-menu-trigger`
- `navigation-menu-icon`
- `navigation-menu-content`
- `navigation-menu-link`
- `navigation-menu-portal`
- `navigation-menu-backdrop`
- `navigation-menu-positioner`
- `navigation-menu-popup`
- `navigation-menu-arrow`
- `navigation-menu-viewport`

### Important data attributes

These attributes are part of the current styling contract because moduix CSS uses them directly:

- root: `[data-orientation='vertical']`
- trigger/link: `[data-active]`, `[data-popup-open]`, `[data-disabled]`, `:disabled`
- icon: `[data-popup-open]`
- positioner: `[data-side]`, `[data-instant]`
- popup/backdrop/content: `[data-starting-style]`, `[data-ending-style]`
- content: `[data-activation-direction]`
- arrow: `[data-side]`

### CSS variables

All public variables live in `packages/ui/src/styles/theme.css` under the `--navigation-menu-*`
namespace.

Root and list:

- `--navigation-menu-bg`, `--navigation-menu-color`, `--navigation-menu-min-width`,
  `--navigation-menu-padding`, `--navigation-menu-radius`, `--navigation-menu-list-gap`,
  `--navigation-menu-list-justify`

Trigger, icon, focus, and disabled state:

- `--navigation-menu-trigger-bg`, `--navigation-menu-trigger-bg-hover`,
  `--navigation-menu-trigger-bg-active`, `--navigation-menu-trigger-border-color`,
  `--navigation-menu-trigger-border-style`, `--navigation-menu-trigger-border-width`,
  `--navigation-menu-trigger-color`, `--navigation-menu-trigger-font-size`,
  `--navigation-menu-trigger-gap`, `--navigation-menu-trigger-height`,
  `--navigation-menu-trigger-line-height`, `--navigation-menu-trigger-padding-x`,
  `--navigation-menu-trigger-padding-y`, `--navigation-menu-trigger-radius`,
  `--navigation-menu-icon-color`, `--navigation-menu-icon-size`,
  `--navigation-menu-icon-transition`, `--navigation-menu-focus-ring-color`,
  `--navigation-menu-focus-ring-width`, `--navigation-menu-disabled-opacity`,
  `--navigation-menu-transition`

Nested submenu trigger styling:

- `--navigation-menu-submenu-trigger-bg`, `--navigation-menu-submenu-trigger-bg-active`,
  `--navigation-menu-submenu-trigger-min-width`, `--navigation-menu-submenu-trigger-padding-x`,
  `--navigation-menu-submenu-trigger-padding-y`, `--navigation-menu-submenu-trigger-radius`,
  `--navigation-menu-submenu-trigger-shadow-active`

Popup, content, positioner, backdrop, and arrow:

- `--navigation-menu-popup-bg`, `--navigation-menu-popup-border-color`,
  `--navigation-menu-popup-border-style`, `--navigation-menu-popup-border-width`,
  `--navigation-menu-popup-color`, `--navigation-menu-popup-radius`,
  `--navigation-menu-popup-shadow`, `--navigation-menu-popup-scale`,
  `--navigation-menu-popup-transition-duration`,
  `--navigation-menu-popup-transition-easing`, `--navigation-menu-popup-leave-duration`,
  `--navigation-menu-content-min-width`, `--navigation-menu-content-opacity-duration`,
  `--navigation-menu-content-padding`, `--navigation-menu-content-slide-distance`,
  `--navigation-menu-content-width-mobile`, `--navigation-menu-positioner-gap`,
  `--navigation-menu-positioner-max-width`, `--navigation-menu-backdrop-bg`,
  `--navigation-menu-backdrop-blur`, `--navigation-menu-backdrop-transition`,
  `--navigation-menu-arrow-width`, `--navigation-menu-arrow-height`,
  `--navigation-menu-arrow-offset`, `--navigation-menu-arrow-inline-offset`,
  `--navigation-menu-arrow-stroke-color`, `--navigation-menu-arrow-transition-duration`

Two variables are especially easy to overlook:

- `--navigation-menu-positioner-gap` controls the invisible hover bridge between the trigger and the
  popup. Reducing it can make cursor travel less forgiving.
- `--navigation-menu-content-width-mobile` controls the mobile-width content clamp before desktop
  `max-content` sizing takes over.

## Accessibility and UX notes

- Keyboard navigation, focus management, active-item state, and screen-reader behavior come from the
  Base UI primitive and should be preserved.
- The wrapper styles visible focus on triggers and direct links with `:focus-visible`.
- Disabled triggers and links use `[data-disabled]` / `:disabled` styling and block pointer
  interaction.
- The built-in popup arrow is opt-in; default usage stays visually simpler.
- `NavigationMenuBackdrop` is visual-only by default because the moduix class sets
  `pointer-events: none`.
- Nested menus are supported, but a second-level menu should be deliberate: a wide panel with clear
  grouping is usually easier to scan than many cascading levels.

## Intentional differences from Base UI

- The default path is rooted at `NavigationMenu`, not at manual `Portal`/`Positioner` assembly.
- Popup positioning props live on the root only for the built-in popup path.
- Trigger icon sugar is part of the moduix contract.
- moduix ships a styled popup arrow icon and stable `data-slot` names.
- The local documentation describes the moduix wrapper contract, not the full upstream primitive
  API.

## Agent notes

- Do not remove the built-in popup composition from `NavigationMenu` unless the user explicitly asks
  to change the public API.
- Do not rename `showPopup`, `showArrow`, or `icon` without a deliberate package-level API change.
- If `showPopup={false}` behavior changes, update stories, docs examples, and this file in the same
  task.
- If trigger `render` behavior changes, keep the docs explicit about whether moduix styles or icon
  injection still apply.
- Keep `data-slot` names and `--navigation-menu-*` variable names stable unless the user explicitly
  requests a breaking styling-contract change.

## Local changelog

- 2026-06-10: Switched default motion fallbacks to shared transition and duration/easing tokens so
  docs previews and shipped CSS use the same popup timing contract as Storybook.
- 2026-06-02: Replaced copied Base UI markdown with moduix-specific documentation, documented the
  built-in popup contract and trigger icon sugar, and recorded styling/accessibility constraints that
  future changes must preserve.
- 2026-06-06: Aligned trigger and link content to the start so panel links with different text
  lengths stay visually stable. Removed the full-width example from stories and docs because it did
  not demonstrate a strong recommended pattern.