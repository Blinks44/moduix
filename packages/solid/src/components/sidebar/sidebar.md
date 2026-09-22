# Sidebar (Solid)

Primary upstream sources:

- Ark UI Splitter docs, https://ark-ui.com/docs/components/splitter
- Ark UI Tooltip docs, https://ark-ui.com/docs/components/tooltip
- Ark UI composition guide, https://ark-ui.com/docs/guides/composition

Sources accessed 2026-09-03. Ark UI has no dedicated Sidebar primitive; moduix builds Sidebar on
Ark Splitter plus explicit navigation wrappers.

## Purpose

Resizable, collapsible application navigation beside a main content inset.

## Public contract

`Sidebar` wraps the Solid `Splitter.Root`. `orientation` and `panels` are owned by
Sidebar and omitted from the public root props. `side="left" | "right"` selects panel order,
resize-trigger id order, side attributes, and trigger icon direction. `panelId` renames the sidebar
panel while the inset remains `content`.

Defaults match the React component: expanded size `16rem`, min/collapsed size `3rem`, max size
`18rem`, horizontal layout, `aria-label="Resize sidebar"` on `SidebarResizeTrigger`, and
`aria-label="Toggle sidebar"` plus `type="button"` on `SidebarTrigger`.

Exported parts:

- `Sidebar`, `SidebarPanel`, `SidebarInset`, `SidebarResizeTrigger`, `SidebarTrigger`
- `SidebarLabel`, `SidebarInput`, `SidebarHeader`, `SidebarContent`, `SidebarExpandedContent`, `SidebarCollapsedContent`, `SidebarFooter`, `SidebarSeparator`
- `SidebarGroup`, `SidebarGroupHeader`, `SidebarGroupLabel`, `SidebarGroupAction`
- `SidebarNavigationList`, `SidebarNavigationItem`, `SidebarNavigationButton`, `SidebarNavigationBadge`
- `SidebarNavigationSubList`, `SidebarNavigationSubItem`, `SidebarNavigationSubButton`, `SidebarTooltip`
- `useSidebar`

`useSidebar()` returns native Solid accessors: `collapsed()`, `side()`, and `state()`, plus
`toggleSidebar()`. The hook and layout parts require the Splitter context created by `Sidebar`.
Text that must disappear in the collapsed rail belongs in `SidebarLabel`; Sidebar does not infer
text children from arbitrary markup.

## Composition

Ark Solid uses render-function `asChild`. Use that native shape for links, menu/select triggers, and
collapsed-label tooltips:

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
            <SidebarTooltip content="Overview">
              {(props) => (
                <SidebarNavigationButton
                  {...props()}
                  active
                  asChild={(buttonProps) => (
                    <a {...buttonProps()} href="#overview">
                      <ProjectsIcon />
                      <SidebarLabel>Overview</SidebarLabel>
                    </a>
                  )}
                />
              )}
            </SidebarTooltip>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
    </SidebarContent>
  </SidebarPanel>
  <SidebarResizeTrigger />
  <SidebarTrigger />
  <SidebarInset>
    <main>{children}</main>
  </SidebarInset>
</Sidebar>
```

For a right sidebar, render `SidebarInset`, `SidebarTrigger`, `SidebarResizeTrigger`, and `SidebarPanel` in that visual order.
Use controlled `size`, `onResize(details)`, and `onResizeEnd(details)` to persist width. Use
`Splitter` directly for custom panel constraints, more than two panels, custom inset ids, registries,
or root-provider layouts.

## Preservation notes

`SidebarPanel`, `SidebarInset`, and `SidebarResizeTrigger` derive ids from the root `panelId`/`side` contract so
`useSidebar()`, Ark panel data, rendered panels, and the adjacent splitter handle stay aligned.
`SidebarTrigger` reads the current Ark Splitter state at click time, invokes any consumer `onClick` first,
and does not toggle when the event is prevented.

`SidebarNavigationButton` supports `active`, `size="sm" | "md" | "lg"`, and native Solid `asChild`.
Active navigation controls set `data-active` and default `aria-current="page"`.
`SidebarNavigationSubButton` renders an anchor by default, supports `active` and `asChild`, and wraps string
children in `data-slot="sidebar-navigation-sub-label"` for truncation.
`SidebarNavigationBadge` is an optional counter placed after a direct `SidebarNavigationButton` or
`SidebarNavigationSubButton` sibling. It reserves trailing space for truncation, hides in the compact rail,
and does not add special handling to Collapsible or Select triggers.

`SidebarExpandedContent` and `SidebarCollapsedContent` only toggle the HTML `hidden` attribute from Splitter state;
they do not create popup or collapsible state. Compose nested expanded navigation with `Collapsible`
and collapsed alternatives with `Menu` or another app-owned navigation pattern.

`SidebarTooltip` delegates to the shared Solid `Tooltip`, defaults to `openDelay={200}` and
`closeDelay={0}`, disables itself while expanded, and places content to the opposite side of the
sidebar rail. Its child is the render function passed to `Tooltip.Trigger asChild`.

## Styling and accessibility

The copied CSS module is intentionally equivalent to React. Stable hooks include
`data-slot="sidebar-root"`, `sidebar-panel`, `sidebar-inset`, `sidebar-resize-trigger`,
`sidebar-trigger`, labels, groups, navigation parts, and collapsed/expanded content parts. The panel
exposes `data-state="expanded" | "collapsed"`; side-aware layout parts expose `data-side`.

Every styled part accepts `class`, merged with moduix defaults. Collapsed styling visually hides
labels, group labels, nested sublists, input, actions, and badges while keeping label text available
to assistive technology. Mark non-SVG compact anchors with `data-sidebar-icon` so the icon rail can
center them without overriding their own size.

Ark Splitter owns resize semantics, WAI-ARIA window-splitter behavior, focus management, pointer and
keyboard resizing, panel sizes, collapse/expand callbacks, and runtime ids. Ark Solid `asChild`
keeps the consumer host as the interactive element but does not forward wrapper refs through the
render function; ordinary refs and custom-host composition remain separate native paths.

## Local changelog

- 2026-09-22: Replaced the compound Sidebar API with the flat exports `Sidebar`, `SidebarPanel`,
  `SidebarNavigationButton`, and the other family-prefixed parts. Removed static members and
  compatibility aliases across package consumers, stories, tests, registries, and docs.
- 2026-09-13: Added `SidebarNavigationBadge` for direct `SidebarNavigationButton` and `SidebarNavigationSubButton`
  siblings with compact-rail hiding and preserved label truncation.
- 2026-09-03: Ported Sidebar to Solid with native Splitter/Tooltip composition, accessor-based
  `useSidebar`, equivalent CSS, tests, playground stories, package exports, and registry metadata.
