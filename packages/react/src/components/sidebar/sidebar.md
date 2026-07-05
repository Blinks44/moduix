# Sidebar

## Upstream docs

- [Ark UI Splitter](https://ark-ui.com/docs/components/splitter)
- [shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/radix/sidebar)

Ark UI has no dedicated Sidebar primitive. Moduix uses Ark `Splitter` as the behavioral and
accessibility foundation and follows shadcn's explicit navigation anatomy.

## Purpose

`Sidebar` builds resizable, collapsible application navigation beside a main content inset.

## Upstream model to preserve

Preserve the Ark Splitter state machine through `Root`, `Panel`, and `ResizeTrigger`. Panel ids,
adjacent trigger ids, CSS length sizes, controlled sizes, collapse/expand callbacks, pointer
resizing, and keyboard resizing stay Ark-shaped.

Compose nested navigation with moduix `Collapsible` and account or workspace popups with `Menu`.
Tooltip is an optional enhancement for collapsed icon labels. Sidebar must not duplicate those
state machines.

`Select.Trigger asChild` can target `Sidebar.MenuButton`; mark its compact visual anchor with
`data-sidebar-icon` and wrap values or indicators that should leave the collapsed layout in
`Sidebar.Label`.

## Current behavior contract

- `Sidebar` and `Sidebar.Root` wrap `Splitter.Root` and preserve its props and callbacks.
- Sidebar is a horizontal navigation/inset layout; `orientation` is intentionally fixed and omitted
  from its public props.
- The sidebar starts at `16rem` (256px), stays between `12rem` and `18rem`, and
  configures a `3rem` (48px) collapsed icon rail. The content panel has no imposed minimum so narrow
  containers can still reach the collapsed size.
- `side="left" | "right"` selects default panel order, adjacent trigger id, floating trigger
  position, and icon direction. Render sibling parts in matching visual order.
- `Sidebar.Panel`, `Sidebar.Inset`, and `Sidebar.ResizeTrigger` default to the correct ids for the
  selected side.
- Panel constraints can be replaced with normal Ark `panels`, `defaultSize`, and controlled `size`
  while retaining the standard `sidebar` and `content` ids. Use `Splitter` directly for custom ids
  or more than two panels.
- `Sidebar.Trigger` is a root-level zero-width flex item centered above the resize line. It calls
  `collapsePanel()` or `expandPanel()` and reads the current Ark state at click time. A consumer
  `onClick` runs first and may cancel the toggle with `event.preventDefault()`.
- `useSidebar()` exposes the sidebar-specific `side`, `collapsed`, `state`, and `toggleSidebar`.
- `Sidebar.MenuButton` supports `active`, `size`, and `asChild`.
- `Sidebar.MenuSubButton` renders an anchor and supports `active` and `asChild`.

## Anatomy and exported parts

```text
Sidebar / Sidebar.Root
├─ Sidebar.Panel[id="sidebar"]
│  ├─ Sidebar.Header
│  │  └─ Sidebar.Label
│  ├─ Sidebar.Content
│  │  └─ Sidebar.Group
│  │     ├─ Sidebar.GroupLabel
│  │     └─ Sidebar.Menu
│  │        └─ Sidebar.MenuItem
│  │           ├─ Sidebar.MenuButton
│  │           └─ Sidebar.MenuSub
│  │              └─ Sidebar.MenuSubItem
│  │                 └─ Sidebar.MenuSubButton
│  └─ Sidebar.Footer
├─ Sidebar.ResizeTrigger
├─ Sidebar.Trigger
└─ Sidebar.Inset[id="content"]
```

| Part               | Stable slot               | Behavior                                                   |
| ------------------ | ------------------------- | ---------------------------------------------------------- |
| `Sidebar` / `Root` | `sidebar-root`            | Styled Ark Splitter root with side-aware defaults.         |
| `Panel`            | `sidebar-panel`           | Sidebar panel; exposes `data-state="expanded\|collapsed"`. |
| `Inset`            | `sidebar-inset`           | Main resizable content panel.                              |
| `ResizeTrigger`    | `sidebar-resize-trigger`  | Neutral Ark Window Splitter handle line.                   |
| `Trigger`          | `sidebar-trigger`         | Side-aware floating collapse/expand control.               |
| `Label`            | `sidebar-label`           | Text removed from layout in the collapsed icon rail.       |
| `Header`           | `sidebar-header`          | Non-scrolling top region.                                  |
| `Content`          | `sidebar-content`         | Scrollable region between header and footer.               |
| `Footer`           | `sidebar-footer`          | Non-scrolling bottom region.                               |
| `Group`            | `sidebar-group`           | Semantic navigation section.                               |
| `GroupLabel`       | `sidebar-group-label`     | Heading for a group.                                       |
| `Menu`             | `sidebar-menu`            | Navigation list.                                           |
| `MenuItem`         | `sidebar-menu-item`       | List item for a navigation control.                        |
| `MenuButton`       | `sidebar-menu-button`     | Button/link composition with active and size states.       |
| `MenuSub`          | `sidebar-menu-sub`        | Nested navigation list.                                    |
| `MenuSubItem`      | `sidebar-menu-sub-item`   | Nested list item.                                          |
| `MenuSubButton`    | `sidebar-menu-sub-button` | Nested anchor/link composition.                            |

Advanced provider, complete context, registry, layout, and resize-indicator APIs intentionally
remain on `Splitter`; Sidebar keeps the application-navigation contract small.

## Composition

```tsx
<Sidebar>
  <Sidebar.Panel>
    <Sidebar.Header>
      <Logo data-sidebar-icon />
      <Sidebar.Label>Moduix</Sidebar.Label>
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Collapsible defaultOpen>
              <Collapsible.Trigger asChild>
                <Sidebar.MenuButton>
                  <ProjectsIcon />
                  <Sidebar.Label>Projects</Sidebar.Label>
                  <Collapsible.Indicator />
                </Sidebar.MenuButton>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <Sidebar.MenuSub>{/* project links */}</Sidebar.MenuSub>
              </Collapsible.Content>
            </Collapsible>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>
    <Sidebar.Footer>{/* Menu + Avatar account control */}</Sidebar.Footer>
  </Sidebar.Panel>
  <Sidebar.ResizeTrigger />
  <Sidebar.Trigger />
  <Sidebar.Inset>
    <main>{children}</main>
  </Sidebar.Inset>
</Sidebar>
```

For a right sidebar, pass `side="right"` and render `Inset`, `Trigger`, `ResizeTrigger`, and `Panel`
in that order.

Native overflow remains the default. For a styled scrollbar, place the explicit
`ScrollArea.Viewport`, `ScrollArea.Content`, `ScrollArea.Scrollbar`, and `ScrollArea.Thumb` anatomy
inside `Sidebar.Content`, then set that outer content part to `overflow: hidden` so only the
ScrollArea viewport scrolls.

## Upstream feature coverage

- **CSS length sizing:** Ark accepts `px`, `rem`, viewport, and percentage panel sizes.
- **Collapsible panels:** default panel data enables Ark collapse and expand behavior.
- **Programmatic control:** `Sidebar.Trigger` and `useSidebar()` expose sidebar collapse/expand.
- **Controlled sizes:** `size` and `onResize(details)` pass directly to Ark.
- **Advanced Splitter composition:** use `Splitter` directly for providers, registries, complete
  context access, or layouts with more than the sidebar/inset pair.

## Accessibility and state

Ark `ResizeTrigger` preserves the WAI-ARIA Window Splitter pattern, focus management, pointer
dragging, arrow-key resizing, and state attributes. Root callbacks retain Ark detail objects:
`onResize(details)`, `onResizeEnd(details)`, `onCollapse(details)`, and `onExpand(details)`.

`Sidebar.Trigger` renders a button, reports `aria-expanded`, and defaults to `"Toggle sidebar"`.
Active menu buttons set `data-active` and default `aria-current="page"`. `asChild` must receive one
semantic child capable of accepting merged props and refs.

When visible hover labels are needed, compose `Tooltip disabled={!collapsed}` around icon menu
buttons and read `collapsed` from `useSidebar()`. Use `Collapsible.Trigger`/`Content` for nested
navigation so Ark owns `aria-expanded`, ids, keyboard activation, and animation.

Ark applies Splitter panel sizes immediately and does not expose a collapse transition lifecycle.
Do not add a CSS width or flex transition to panels because it would lag behind pointer and keyboard
resize state. Nested Collapsible content and the trigger icon keep their normal animations.

## Defaults and styling

All visual parts accept `className`. Public variables live in
`packages/react/src/lib/moduix/styles/theme.css`. The panel exposes
`data-state="expanded" | "collapsed"` and all side-aware parts expose `data-side`.

Collapsed styling moves `Sidebar.Label` and group labels out of layout with a visually-hidden
pattern, hides nested menus, and centers SVG or `data-sidebar-icon` elements. Labels remain
available to assistive technology without creating flex width or gaps. Mark non-SVG visual anchors
such as `Avatar` or a brand mark with `data-sidebar-icon`; Sidebar preserves that element's own
size.

Panel constraints are Ark state, not visual CSS. Override `panels`, `defaultSize`, controlled
`size`, and callbacks for application-specific expanded, minimum, maximum, or collapsed widths.
Keep the standard `sidebar` and `content` ids; use `Splitter` directly when custom ids are required.
Use the public `--sidebar-*` variables and stable slots for internal spacing, colors, item sizes, and
the floating trigger's vertical offset.

Zag 1.41.2 currently leaves the expanded inline `min-width` on a collapsed panel, so the installed
version visually clamps the configured `3rem` rail to `12rem`. This is tracked by
[zag#3179](https://github.com/chakra-ui/zag/issues/3179) and fixed by the open
[zag#3180](https://github.com/chakra-ui/zag/pull/3180). Sidebar intentionally does not patch the
upstream layout while that fix is pending.

The resize line inherits the shared Splitter default: it keeps the normal border color at rest and
shifts slightly toward `--color-muted-foreground` on hover and drag. Override the
underlying `--splitter-resize-trigger-line-color-*` variables when the product needs stronger
feedback.

## Intentional sugar and differences from upstream

- Defaults use Ark CSS lengths for a stable 256px expanded sidebar and configure a 48px collapsed
  rail.
- `side` configures default order and the floating trigger without introducing open state.
- `Label` supplies a stable collapsed-rail hiding contract.
- `Trigger` is a side-aware Splitter-context convenience.
- Sidebar deliberately omits `ResizeTriggerIndicator`; the neutral line is the complete resize UI.
- Unlike shadcn, Sidebar does not render a mobile Sheet, persist a cookie, register a global
  shortcut, or own Tooltip/Menu/Collapsible state.

## Agent notes

- Keep layout state in Splitter and nested interaction state in the corresponding moduix primitive.
- Keep default ids synchronized across root panel data, `Panel`, `Inset`, and `ResizeTrigger`.
- Preserve the explicit `Panel → ResizeTrigger → Trigger → Inset` order for left sidebars and
  `Inset → Trigger → ResizeTrigger → Panel` for right sidebars.
- Do not restore a Sidebar resize indicator or hide structural parts inside `Root`.

## Local changelog

- 2026-07-03: Kept the visual/navigation parts and `useSidebar()` sugar, but stopped exporting the internal `SidebarSide` type alias from the public package surface.
- 2026-07-01: Rounded the default expanded and maximum widths to `16rem` and `18rem`, and
  documented `ScrollArea` as an opt-in content composition.
- 2026-07-01: Kept fixed `sidebar`/`content` ids for a smaller root API, reset reserved scrollbar
  space in the collapsed rail, added story interaction coverage, and documented focused
  Select/Menu/custom sizing composition.
- 2026-07-01: Changed collapsed labels from `display: none` to an out-of-flow visually-hidden
  pattern so text remains accessible without shifting icon-only menu controls, and simplified the
  public Basic example to direct Sidebar composition.
- 2026-07-01: Removed the local collapsed-width compensation in favor of the pending upstream Zag
  fix, simplified the menu state surface, centered custom collapsed icons explicitly, and moved
  account popup examples to the right of their trigger.
- 2026-07-01: Reduced the public composition to navigation parts that carry structure or behavior,
  narrowed `useSidebar()` to sidebar state, moved advanced provider/context/registry APIs back to
  `Splitter`, and enforced the configured collapsed width over Zag's retained inline minimum.
- 2026-07-01: Moved `Trigger` to the root divider boundary, made toggle actions read live Ark
  state, removed the content-panel minimum that blocked 48px collapse in narrow containers, kept
  collapsed account controls transparent, and removed nested Tooltip/Menu triggers so popup
  positioning retains the real account button anchor.
- 2026-07-01: Corrected the 48px icon rail composition, preserved Avatar and custom icon sizes,
  aligned Collapsible menu labels, and reduced the default maximum width.
- 2026-07-01: Refined the expanded/collapsed CSS-length layout, added side-aware floating
  triggers, compact labels, `useSidebar`, Collapsible/Tooltip navigation, and Menu/Avatar
  account composition; removed the Sidebar resize indicator.
- 2026-07-01: Added the Splitter-backed Sidebar layout, semantic navigation anatomy, styling
  contract, stories, registry entry, and public docs.
- 2026-07-05: Dropped the sidebar-specific resize-line hover/focus/drag color variables and now
  rely on the shared Splitter defaults, including the pointer-release reset on the divider line.