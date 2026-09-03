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

`Sidebar` and `Sidebar.Root` wrap the Solid `Splitter.Root`. `orientation` and `panels` are owned by
Sidebar and omitted from the public root props. `side="left" | "right"` selects panel order,
resize-trigger id order, side attributes, and trigger icon direction. `panelId` renames the sidebar
panel while the inset remains `content`.

Defaults match the React component: expanded size `16rem`, min/collapsed size `3rem`, max size
`18rem`, horizontal layout, `aria-label="Resize sidebar"` on `ResizeTrigger`, and
`aria-label="Toggle sidebar"` plus `type="button"` on `Trigger`.

Exported parts:

- `Root`, `Panel`, `Inset`, `ResizeTrigger`, `Trigger`
- `Label`, `Input`, `Header`, `Content`, `ExpandedContent`, `CollapsedContent`, `Footer`, `Separator`
- `Group`, `GroupLabel`, `GroupAction`, `GroupContent`
- `NavigationList`, `NavigationItem`, `NavigationButton`, `NavigationAction`, `NavigationBadge`
- `NavigationSubList`, `NavigationSubItem`, `NavigationSubButton`, `Tooltip`
- `useSidebar`

`useSidebar()` returns native Solid accessors: `collapsed()`, `side()`, and `state()`, plus
`toggleSidebar()`. The hook and layout parts require the Splitter context created by `Sidebar.Root`.

## Composition

Ark Solid uses render-function `asChild`. Use that native shape for links, menu/select triggers, and
collapsed-label tooltips:

```tsx
<Sidebar>
  <Sidebar.Panel>
    <Sidebar.Header>
      <div>
        <Logo data-sidebar-icon />
        <Sidebar.Label>Moduix</Sidebar.Label>
      </div>
      <Sidebar.Input placeholder="Search" />
    </Sidebar.Header>
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
        <Sidebar.GroupAction aria-label="Add workspace item">
          <PlusIcon />
        </Sidebar.GroupAction>
        <Sidebar.NavigationList>
          <Sidebar.NavigationItem>
            <Sidebar.Tooltip content="Overview">
              {(props) => (
                <Sidebar.NavigationButton
                  {...props()}
                  active
                  asChild={(buttonProps) => (
                    <a {...buttonProps()} href="#overview">
                      <ProjectsIcon />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  )}
                />
              )}
            </Sidebar.Tooltip>
          </Sidebar.NavigationItem>
        </Sidebar.NavigationList>
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar.Panel>
  <Sidebar.ResizeTrigger />
  <Sidebar.Trigger />
  <Sidebar.Inset>
    <main>{children}</main>
  </Sidebar.Inset>
</Sidebar>
```

For a right sidebar, render `Inset`, `Trigger`, `ResizeTrigger`, and `Panel` in that visual order.
Use controlled `size`, `onResize(details)`, and `onResizeEnd(details)` to persist width. Use
`Splitter` directly for custom panel constraints, more than two panels, custom inset ids, registries,
or root-provider layouts.

## Preservation notes

`Panel`, `Inset`, and `ResizeTrigger` derive ids from the root `panelId`/`side` contract so
`useSidebar()`, Ark panel data, rendered panels, and the adjacent splitter handle stay aligned.
`Trigger` reads the current Ark Splitter state at click time, invokes any consumer `onClick` first,
and does not toggle when the event is prevented.

`NavigationButton` supports `active`, `size="sm" | "md" | "lg"`, and native Solid `asChild`.
Active navigation controls set `data-active` and default `aria-current="page"`.
`NavigationSubButton` renders an anchor by default, supports `active` and `asChild`, and wraps string
children in `data-slot="sidebar-navigation-sub-label"` for truncation.

`ExpandedContent` and `CollapsedContent` only toggle the HTML `hidden` attribute from Splitter state;
they do not create popup or collapsible state. Compose nested expanded navigation with `Collapsible`
and collapsed alternatives with `Menu` or another app-owned navigation pattern.

`Sidebar.Tooltip` delegates to the shared Solid `Tooltip`, defaults to `openDelay={200}` and
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

- 2026-09-03: Ported Sidebar to Solid with native Splitter/Tooltip composition, accessor-based
  `useSidebar`, equivalent CSS, tests, playground stories, package exports, and registry metadata.