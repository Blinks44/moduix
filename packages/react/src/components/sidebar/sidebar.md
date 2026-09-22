# Sidebar

## Upstream reference

- [Ark UI Splitter](https://ark-ui.com/docs/components/splitter)
- [Chakra UI Splitter](https://chakra-ui.com/docs/components/splitter)
- [shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/sidebar)

Sources accessed 2026-08-12. Ark and Chakra establish the Splitter behavior; shadcn informs
discoverability and navigation composition only.

Ark UI has no dedicated Sidebar primitive. Moduix uses Ark `Splitter` as the behavioral and
accessibility foundation, then supplies its own explicit, stylable navigation parts.

## Purpose

`Sidebar` builds resizable, collapsible application navigation beside a main content inset.

## Upstream model to preserve

Preserve the Ark Splitter state machine through `Sidebar`, `SidebarPanel`, and `SidebarResizeTrigger`. Panel ids,
adjacent trigger ids, CSS length sizes, controlled sizes, collapse/expand callbacks, pointer
resizing, and keyboard resizing stay Ark-shaped.

Compose nested navigation with moduix `Collapsible` and account or workspace popups with `Menu`.
`SidebarTooltip` is the blessed collapsed-label helper and keeps Tooltip as an explicit primitive
without repeating its full anatomy around every menu button. Persisted layout belongs in app state
or storage through normal Splitter callbacks, not in a sidebar-owned provider.

`SelectTrigger asChild` can target `SidebarNavigationButton`; mark its compact visual anchor with
`data-sidebar-icon` and wrap only value text that should leave the collapsed layout in
`SidebarLabel`. Keep `SelectIndicator` as a direct child of the navigation button so Select can
place it at the trailing edge.

## Current behavior contract

- `Sidebar` wraps `Splitter` and preserve its props and callbacks.
- Sidebar is a horizontal navigation/inset layout; `orientation` is intentionally fixed and omitted
  from its public props.
- The sidebar starts at `16rem` (256px), resizes continuously down to its `3rem` (48px) collapsed
  icon rail, and has an `18rem` maximum. The content panel has no imposed minimum so narrow
  containers can still reach the collapsed size.
- `SidebarLabel`, `SidebarGroupLabel`, `SidebarNavigationButton`, and `SidebarNavigationSubButton` truncate
  overflowing text to one line so resizing does not change the sidebar layout.
- `side="left" | "right"` selects default panel order, adjacent trigger id, floating trigger
  position, and icon direction. Render sibling parts in matching visual order.
- `SidebarPanel`, `SidebarInset`, and `SidebarResizeTrigger` keep the ids derived from the root
  contract for the selected side.
- `panelId` changes the default navigation panel id and its adjacent resize trigger while the inset
  remains `content`. Sidebar layout parts intentionally do not accept individual ids, so the
  rendered panels, resize trigger, and `useSidebar()` always agree. Use `Splitter` directly for
  different panel constraints, a custom inset id, or more than two panels.
- `SidebarTrigger` is a root-level zero-width flex item that, by default, sits at the intersection
  of the resize line and a typical inset topbar divider. Its `40px` vertical offset is customizable
  with `--moduix-sidebar-trigger-offset-y`. It calls `collapsePanel()` or `expandPanel()` and reads
  the current Ark state at click time. A consumer `onClick` runs first and may cancel the toggle with
  `event.preventDefault()`.
- `useSidebar()` exposes the sidebar-specific `side`, `collapsed`, `state`, and `toggleSidebar`.
- `SidebarNavigationButton` supports `active`, `size`, and `asChild`.
- `SidebarNavigationBadge` is an optional counter placed after a direct `SidebarNavigationButton` or
  `SidebarNavigationSubButton` sibling. It reserves trailing space for truncation and is hidden in the
  compact rail. It does not add special handling to Collapsible or Select triggers.
- Text that must disappear in the collapsed rail belongs in `SidebarLabel`; Sidebar does not infer
  text children from arbitrary markup.
- `SidebarTooltip` wraps the shared Tooltip primitive with collapsed-only behavior and side-aware
  placement for menu labels.
- `SidebarNavigationSubButton` renders an anchor and supports `active` and `asChild`.
- `SidebarGroupHeader` makes the group label and its optional action an explicit flex row.
- `SidebarInput`, `SidebarSeparator`, and `SidebarGroupAction` are thin visual wrappers that
  match the shipped sidebar styling contract.
- The supported recipes are collapsed hover labels with `SidebarTooltip` and persisted width through
  controlled `size`, `onResize(details)`, and `onResizeEnd(details)`.

## Anatomy and exported parts

```text
Sidebar
├─ SidebarPanel[id="sidebar"]
│  ├─ SidebarHeader
│  │  ├─ SidebarLabel
│  │  └─ SidebarInput
│  ├─ SidebarContent
│  │  └─ SidebarGroup
│  │     ├─ SidebarGroupHeader
│  │     │  ├─ SidebarGroupLabel
│  │     │  └─ SidebarGroupAction
│  │     └─ SidebarNavigationList
│  │           └─ SidebarNavigationItem
│  │              ├─ SidebarTooltip
│  │              │  └─ SidebarNavigationButton
│  │              ├─ SidebarNavigationBadge
│  │              └─ SidebarNavigationSubList
│  │                 └─ SidebarNavigationSubItem
│  │                    ├─ SidebarNavigationSubButton
│  │                    └─ SidebarNavigationBadge
│  ├─ SidebarFooter
│  │  └─ SidebarSeparator
├─ SidebarResizeTrigger
├─ SidebarTrigger
└─ SidebarInset[id="content"]
```

| Part                         | Stable slot                     | Behavior                                                                                         |
| ---------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `Sidebar`                    | `sidebar-root`                  | Styled Ark Splitter root with side-aware defaults.                                               |
| `SidebarPanel`               | `sidebar-panel`                 | Sidebar panel; exposes `data-state="expanded\|collapsed"`.                                       |
| `SidebarInset`               | `sidebar-inset`                 | Main resizable content panel.                                                                    |
| `SidebarResizeTrigger`       | `sidebar-resize-trigger`        | Styled Ark Splitter handle line; renders the shared `SplitterResizeTriggerIndicator` by default. |
| `SidebarTrigger`             | `sidebar-trigger`               | Side-aware floating collapse/expand control.                                                     |
| `SidebarLabel`               | `sidebar-label`                 | Text removed from layout in the collapsed icon rail.                                             |
| `SidebarInput`               | `input-root`                    | Full-width styled search or filter field.                                                        |
| `SidebarHeader`              | `sidebar-header`                | Non-scrolling top region.                                                                        |
| `SidebarContent`             | `sidebar-content`               | Scrollable region between header and footer.                                                     |
| `SidebarFooter`              | `sidebar-footer`                | Non-scrolling bottom region.                                                                     |
| `SidebarSeparator`           | `separator-root`                | Styled section divider.                                                                          |
| `SidebarGroup`               | `sidebar-group`                 | Semantic navigation section.                                                                     |
| `SidebarGroupHeader`         | `sidebar-group-header`          | Flex row for a group label and trailing action.                                                  |
| `SidebarGroupLabel`          | `sidebar-group-label`           | Heading for a group.                                                                             |
| `SidebarGroupAction`         | `sidebar-group-action`          | Compact action button aligned with the group heading.                                            |
| `SidebarExpandedContent`     | `sidebar-expanded-content`      | Content visible only while the panel is expanded.                                                |
| `SidebarCollapsedContent`    | `sidebar-collapsed-content`     | Content visible only while the panel is collapsed.                                               |
| `SidebarNavigationList`      | `sidebar-navigation-list`       | Navigation list.                                                                                 |
| `SidebarNavigationItem`      | `sidebar-navigation-item`       | Positioned list item for a navigation control.                                                   |
| `SidebarTooltip`             | n/a                             | Collapsed-only label helper with side-aware placement.                                           |
| `SidebarNavigationButton`    | `sidebar-navigation-button`     | Button/link composition with active and size states.                                             |
| `SidebarNavigationBadge`     | `sidebar-navigation-badge`      | Optional counter beside a simple navigation control.                                             |
| `SidebarNavigationSubList`   | `sidebar-navigation-sub-list`   | Nested navigation list.                                                                          |
| `SidebarNavigationSubItem`   | `sidebar-navigation-sub-item`   | Nested list item.                                                                                |
| `SidebarNavigationSubButton` | `sidebar-navigation-sub-button` | Nested anchor/link composition.                                                                  |

Advanced provider, complete context, registry, layout, and resize-indicator APIs intentionally
remain on `Splitter`; Sidebar keeps the application-navigation contract small.

## Composition

```tsx
<Sidebar>
  <SidebarPanel>
    <SidebarHeader>
      <div>
        <Logo data-sidebar-icon />
        <SidebarLabel>Moduix</SidebarLabel>
      </div>
      <SidebarInput placeholder="Search" />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupHeader>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupAction aria-label="Add workspace item">
            <PlusIcon />
          </SidebarGroupAction>
        </SidebarGroupHeader>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <SidebarNavigationButton>
                  <ProjectsIcon />
                  <SidebarLabel>Projects</SidebarLabel>
                  <CollapsibleIndicator />
                </SidebarNavigationButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarNavigationSubList>{/* project links */}</SidebarNavigationSubList>
              </CollapsibleContent>
            </Collapsible>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarSeparator />
      {/* Menu + Avatar + MenuIndicator account control */}
    </SidebarFooter>
  </SidebarPanel>
  <SidebarResizeTrigger />
  <SidebarTrigger />
  <SidebarInset>
    <main>{children}</main>
  </SidebarInset>
</Sidebar>
```

For a right sidebar, pass `side="right"` and render `SidebarInset`, `SidebarTrigger`, `SidebarResizeTrigger`, and `SidebarPanel`
in that order.

Native overflow remains the default. For a styled scrollbar, place the explicit
`ScrollAreaViewport`, `ScrollAreaContent`, `ScrollAreaScrollbar`, and `ScrollAreaThumb` anatomy
inside `SidebarContent`, then set that outer content part to `overflow: hidden` so only the
ScrollArea viewport scrolls.

Keep the Splitter-bound pieces inside `Sidebar`: `SidebarPanel`, `SidebarInset`, `SidebarResizeTrigger`, `SidebarTrigger`, and
`useSidebar()`. Persisted desktop layout is a controlled-size recipe: mirror live drag updates from
`onResize(details)` and save the settled width from `onResizeEnd(details)`.

`SidebarNavigationList` is normally a direct child of `SidebarGroup`. Use `SidebarGroupHeader`
for a label with an action. Sidebar does not choose a collapsed-rail strategy for
nested links. If they must remain reachable after collapse, compose the inline `Collapsible` in
`SidebarExpandedContent` and the application’s popup `Menu` or another navigation pattern in
`SidebarCollapsedContent`. These parts only select their children from the panel’s Ark state; they
do not create popup state or transform one primitive into another. Use `useSidebar().collapsed` when
the application itself must change its React tree.

When `MenuTrigger asChild` wraps `SidebarNavigationButton`, render `MenuIndicator` as the direct
trailing child. Sidebar aligns it to the inline end and hides it with the rest of the trigger
affordances in the collapsed rail.

## Upstream feature coverage

- **CSS length sizing:** Ark accepts `px`, `rem`, viewport, and percentage panel sizes.
- **Collapsible panels:** default panel data enables Ark collapse and expand behavior.
- **Programmatic control:** `SidebarTrigger` and `useSidebar()` expose sidebar collapse/expand.
- **Controlled sizes:** `size` and `onResize(details)` pass directly to Ark.
- **Advanced Splitter composition:** use `Splitter` directly for providers, registries, complete
  context access, or layouts with more than the sidebar/inset pair.

## Accessibility and state

Ark `SidebarResizeTrigger` preserves the WAI-ARIA Window Splitter pattern, focus management, pointer
dragging, arrow-key resizing, and state attributes. Sidebar makes keyboard-visible focus visible
on its neutral resize line. Root callbacks retain Ark detail objects:
`onResize(details)`, `onResizeEnd(details)`, `onCollapse(details)`, and `onExpand(details)`.

`SidebarTrigger` renders a button, reports `aria-expanded`, and defaults to `"Toggle sidebar"`.
Active navigation buttons set `data-active` and default `aria-current="page"`. `asChild` must receive one
semantic child capable of accepting merged props and refs.

When visible hover labels are needed, prefer `SidebarTooltip content="..."` around icon navigation
buttons. Use the shared `Tooltip` primitive directly only when the sidebar needs custom popup
content or non-standard positioning. Use `CollapsibleTrigger`/`SidebarContent` for nested navigation so
Ark owns `aria-expanded`, ids, keyboard activation, and animation.

`SidebarPanel`, `SidebarInset`, `SidebarResizeTrigger`, `SidebarTrigger`, and `useSidebar()` all
require Splitter context. The remaining exported visual parts are plain styled wrappers.

`SidebarGroupAction` is a plain button with default `type="button"` and the shared sidebar focus ring.

Ark applies Splitter panel sizes immediately and does not expose a collapse transition lifecycle.
Do not add a CSS width or flex transition to panels because it would lag behind pointer and keyboard
resize state. Nested Collapsible content and the trigger icon keep their normal animations.

## Defaults and styling

All visual parts accept `className`. Public variables live in
`packages/foundation/src/styles/variables-moduix.css`. The panel exposes
`data-state="expanded" | "collapsed"` and all side-aware parts expose `data-side`.

Collapsed styling moves `SidebarLabel` and group labels out of layout with a visually-hidden
pattern, hides nested navigation lists and `SidebarInput`, and centers SVG or `data-sidebar-icon` elements.
Labels remain available to assistive technology without creating flex width or gaps. Mark non-SVG
visual anchors such as `Avatar` or a brand mark with `data-sidebar-icon`; Sidebar preserves that
element's own size. Collapsed styling also hides trailing group and navigation affordances so icon-only
items stay compact.

At narrow expanded widths (below `7rem`), Sidebar also hides trailing group actions, navigation actions,
badges, and indicators before they can overlap the leading icon. This is visual collision prevention;
the panel remains expanded and keeps its Ark state and visible labels.

Panel constraints are Ark state, not visual CSS. Override `defaultSize`, controlled `size`, and
callbacks for the Sidebar's current width. Use `Splitter` directly for application-specific expanded,
minimum, maximum, or collapsed constraints, or a custom inset id. CSS-length sizes are measured on the
client, so server-rendered layouts can shift after hydration; use percentages when stable SSR layout
matters.
Use the public `--moduix-sidebar-*` variables and stable slots for internal spacing, colors, item sizes,
group-action sizing, navigation-action sizing, navigation-badge spacing, and the floating trigger's vertical
offset.

The resize line inherits the shared Splitter default: it keeps the normal border color at rest and
shifts slightly toward `--moduix-color-muted-foreground` on hover and drag. Override the
underlying `--moduix-splitter-resize-trigger-line-color-*` variables when the product needs stronger
feedback.

## Intentional sugar and differences from upstream

- Defaults use Ark CSS lengths for a stable 256px expanded sidebar and configure a 48px collapsed
  rail.
- `side` configures default order and the floating trigger without introducing open state.
- `SidebarLabel` supplies a stable collapsed-rail hiding contract.
- `SidebarExpandedContent` and `SidebarCollapsedContent` provide explicit, stylable state branches without
  making Sidebar own Menu or Collapsible behavior.
- `SidebarTrigger` is a side-aware Splitter-context convenience.
- `SidebarInput`, `SidebarSeparator`, `SidebarGroupHeader`, and `SidebarGroupAction` bring the most
  common sidebar building blocks into the local styling contract without adding sidebar-owned state.
- `Tooltip` removes repeated collapsed-label boilerplate while still delegating popup behavior to the
  shared Tooltip primitive.
- `SidebarResizeTrigger` renders the shared `SplitterResizeTriggerIndicator` by default; custom
  children or `asChild` replace it.
- Unlike shadcn, Sidebar does not render a mobile Sheet, persist a cookie, register a global
  shortcut, or own Tooltip/Menu/Collapsible state.
- Instead of owning those concerns, Sidebar documents collapsed hover labels and persisted desktop
  widths while applications choose their own responsive navigation architecture.

## Agent notes

- Keep layout state in Splitter and nested interaction state in the corresponding moduix primitive.
- Keep `panelId` synchronized across root panel data, `SidebarPanel`, `SidebarTrigger`, and `SidebarResizeTrigger`.
- Preserve the explicit `Panel → ResizeTrigger → Trigger → Inset` order for left sidebars and
  `Inset → Trigger → ResizeTrigger → Panel` for right sidebars.
- Keep the shared `SplitterResizeTriggerIndicator` as the default `SidebarResizeTrigger` content, and do
  not hide structural parts inside `Root`.

## Local changelog

- 2026-09-22: Replaced the compound Sidebar API with the flat exports `Sidebar`, `SidebarPanel`,
  `SidebarNavigationButton`, and the other family-prefixed parts. Removed static members and
  compatibility aliases across package consumers, stories, tests, registries, and docs.
- 2026-09-20: Corrected the contract docs: `SidebarResizeTrigger` renders the shared
  `SplitterResizeTriggerIndicator` by default, and `SidebarInput`/`SidebarSeparator` keep the
  `input-root`/`separator-root` slots of their underlying primitives.
- 2026-09-13: Added `SidebarNavigationBadge` for direct `SidebarNavigationButton` and `SidebarNavigationSubButton`
  siblings with compact-rail hiding and preserved label truncation.
- 2026-08-29: Added `SidebarExpandedContent` and `SidebarCollapsedContent` as stylable, accessibility-safe state
  branches for explicit nested navigation compositions. Corrected Select guidance so its indicator is
  a direct trigger child.
- 2026-08-26: Fixed truncation for direct menu and nested-menu labels, made simultaneous menu actions
  and badges share the trailing space, and fixed the two-panel contract by moving custom panel layouts
  to `Splitter`.

- 2026-08-12: Centered the floating trigger on the divider, aligned wrapped Select indicators to
  the trailing edge of menu buttons, and made Drawer own mobile navigation layout in examples.
- 2026-08-12: Updated the maintained upstream reference links and added a behavior test for
  cancelled trigger clicks.
- 2026-08-12: Matched the default minimum and collapsed widths at `3rem` so pointer resizing reaches
  the icon rail without a size snap, and made labels and group labels truncate instead of shifting
  the layout. Removed the high-contrast resize-line focus fill that persisted after pointer dragging.
- 2026-07-30: Made the resize handle's Ark focus state visible, hid sidebar inputs in the collapsed
  rail, and restricted layout-part ids to the root `panelId` contract.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-11: Made `panelId` update the default panel data and resize trigger id, documented
  CSS-length hydration behavior, and kept custom inset ids on the lower-level `Splitter` path.
- 2026-07-06: Added `SidebarTooltip` as the blessed collapsed-label helper and migrated sidebar
  examples away from repeated manual Tooltip anatomy.
- 2026-07-06: Documented the blessed migration recipes explicitly: collapsed-rail tooltip
  composition, Drawer-based mobile overlays, and persisted widths through controlled Splitter size
  callbacks.
- 2026-07-06: Added `SidebarInput`, `SidebarSeparator`, and `SidebarGroupAction` parts so the Splitter-backed sidebar has more familiar affordances without adding a
  second layout state model.
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
- 2026-07-01: Moved `SidebarTrigger` to the root divider boundary, made toggle actions read live Ark
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