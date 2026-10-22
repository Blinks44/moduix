# Sidebar

## Upstream reference

- [Ark UI Splitter](https://ark-ui.com/docs/components/splitter)
- [shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/sidebar)

Sources accessed 2026-10-21. Ark UI has no Sidebar primitive: moduix builds it on Ark `Splitter`
and adds explicit, stylable navigation parts. shadcn informs the part names, the sidebar color
tokens, and the icon-rail behavior. Chakra UI v3 has no Sidebar.

## Contract

- `Sidebar` is a horizontal Ark Splitter root with two panels; `orientation` and `panels` are not
  public. The sidebar panel starts at `16rem`, resizes down to a `3rem` collapsed icon rail, and
  stops at `18rem`. The inset (`id="content"`) has no minimum so narrow containers can still collapse.
- `side="left" | "right"` sets panel order, the resize trigger id, the floating trigger position,
  and its icon direction. Render the parts in visual order: `Panel → ResizeTrigger → Trigger → Inset`
  for left, `Inset → Trigger → ResizeTrigger → Panel` for right.
- `panelId` renames the sidebar panel and its resize trigger id. Layout parts do not accept their
  own `id`, so panels, trigger, and `useSidebar()` always agree. Use `Splitter` directly for other
  constraints, a custom inset id, or more than two panels.
- `SidebarPanel`, `SidebarInset`, `SidebarResizeTrigger`, `SidebarTrigger`, `SidebarTooltip`,
  `SidebarExpandedContent`, `SidebarCollapsedContent`, and `useSidebar()` need the Splitter context
  created by `Sidebar`. The other parts are plain styled wrappers.
- `useSidebar()` returns `collapsed`, `side`, `state` (`'expanded' | 'collapsed'`), and
  `toggleSidebar()`, which reads the Ark state when called.
- `SidebarTrigger` is a zero-width flex item on the resize line, `type="button"`,
  `aria-label="Toggle sidebar"`, `aria-expanded`. A consumer `onClick` runs first and can cancel the
  toggle with `event.preventDefault()`. Default child: `ChevronLeftIcon`.
- `SidebarResizeTrigger` defaults to `aria-label="Resize sidebar"` and renders
  `SplitterResizeTriggerIndicator` unless it gets children or `asChild`.
- `SidebarNavigationButton` (`button`, `active`, `size="sm" | "md" | "lg"`) and
  `SidebarNavigationSubButton` (`a`, `active`) set `data-active` and default `aria-current="page"`
  when active. Both support `asChild`.
- `SidebarNavigationBadge` follows a direct `SidebarNavigationButton` or `SidebarNavigationSubButton`
  sibling; the button reserves trailing space for it.
- `SidebarTooltip` wraps `Tooltip` around one trigger, is enabled only while collapsed, and places
  the content away from the sidebar (`openDelay` 200, `closeDelay` 0, `gutter` 8).
- `SidebarExpandedContent` / `SidebarCollapsedContent` set `hidden` from the panel state. They do not
  own Menu or Collapsible state.
- `SidebarInput` and `SidebarSeparator` keep the `input-root` / `separator-root` slots of their
  primitives; they add full width and collapsed hiding, and the sidebar border color.
- Types: `SidebarRootProps`, `SidebarSide`, `SidebarNavigationButtonSize`.

## Anatomy

```text
Sidebar
├─ SidebarPanel
│  ├─ SidebarHeader → SidebarLabel, SidebarInput
│  ├─ SidebarContent
│  │  └─ SidebarGroup
│  │     ├─ SidebarGroupHeader → SidebarGroupLabel, SidebarGroupAction
│  │     └─ SidebarNavigationList
│  │        └─ SidebarNavigationItem
│  │           ├─ SidebarTooltip → SidebarNavigationButton → icon, SidebarLabel
│  │           ├─ SidebarNavigationBadge
│  │           └─ SidebarNavigationSubList
│  │              └─ SidebarNavigationSubItem → SidebarNavigationSubButton → SidebarLabel
│  └─ SidebarFooter → SidebarSeparator
├─ SidebarResizeTrigger
├─ SidebarTrigger
└─ SidebarInset
```

Every part except `SidebarTooltip`, `SidebarInput`, and `SidebarSeparator` has a
`data-slot="sidebar-*"` hook. `SidebarPanel` exposes `data-state`, side-aware parts expose `data-side`.

## Composition

- Text belongs in `SidebarLabel`, in both navigation buttons: it truncates and leaves the collapsed
  rail visually while staying in the accessible name. Mark non-SVG visual anchors (`Avatar`, a brand
  mark) with `data-sidebar-icon`.
- Nested navigation: `Collapsible` with `CollapsibleTrigger asChild` around `SidebarNavigationButton`
  and `CollapsibleIndicator` as its direct child. To keep nested links reachable in the rail, put
  the `Collapsible` in `SidebarExpandedContent` and a `Menu` in `SidebarCollapsedContent`.
- `MenuIndicator`, `CollapsibleIndicator`, and `SelectIndicator` go as direct children of
  `SidebarNavigationButton`; Sidebar aligns them to the end and hides them below `7rem` and in the rail.
- Styled scrolling: put the `ScrollArea` parts inside `SidebarContent` and set it to
  `overflow: hidden`.
- Persisted width: control `size`, mirror `onResize(details)`, save on `onResizeEnd(details)`.
  CSS-length sizes are measured on the client; use percentages when SSR layout must not shift.
- Mobile navigation belongs to the application (examples use `Drawer`). Sidebar does not render a
  Sheet, persist a cookie, or register a shortcut.

## Styling

- Colors come from the foundation sidebar tokens: `--moduix-color-sidebar`, `-sidebar-foreground`,
  `-sidebar-accent`, `-sidebar-accent-foreground`, `-sidebar-border`, `-sidebar-ring`. The inset uses
  the page background; badges use `--moduix-color-primary`.
- Public variables: `--moduix-sidebar-width` and `--moduix-sidebar-height` (Ark sets inline
  `width/height`, so a class cannot change them) and `--moduix-sidebar-trigger-offset-y`. Everything
  else is a class on the part.
- The root overrides the shared Splitter styles with its own rules (no radius or shadow, no panel
  padding, sidebar border color) and sets `--moduix-splitter-resize-trigger-line-color` and
  `--moduix-splitter-resize-trigger-size` (`0.75rem` hit area).
- Collapsed rail: header, footer, and group padding shrink, labels become visually hidden, sub lists,
  inputs, and group actions are hidden, navigation buttons become centered `size-md` squares that
  keep their active and hover backgrounds.
- Do not animate panel width: Ark applies sizes immediately and a transition would lag behind drag
  and keyboard resizing.

## Agent notes

- Keep layout state in Splitter and nested interaction state in Collapsible, Menu, and Tooltip.
- Keep `panelId` in sync across the panels, `SidebarPanel`, `SidebarResizeTrigger`, and `useSidebar()`.
- The Tailwind packages repeat the Splitter resize trigger classes because `SplitterResizeTrigger`
  fixes its `data-slot`; keep them in sync with Splitter.