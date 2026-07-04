/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Sidebar, Tooltip, useSidebar, Menu } from '@moduix/react';
import { FileText, Gauge } from 'lucide-react';

function Navigation() {
  const { collapsed, side } = useSidebar();
  const placement = side === 'left' ? 'right' : 'left';
  return (
    <Sidebar.Group>
      <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Tooltip
            disabled={!collapsed}
            positioning={{
              placement,
              gutter: 8,
            }}
          >
            <Tooltip.Trigger asChild>
              <Sidebar.MenuButton asChild active>
                <a href="/overview">
                  <Gauge />
                  <Sidebar.Label>Overview</Sidebar.Label>
                </a>
              </Sidebar.MenuButton>
            </Tooltip.Trigger>
            <Tooltip.Positioner>
              <Tooltip.Content>Overview</Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip>
        </Sidebar.MenuItem>
        <Sidebar.MenuItem>
          <Tooltip
            disabled={!collapsed}
            positioning={{
              placement,
              gutter: 8,
            }}
          >
            <Tooltip.Trigger asChild>
              <Sidebar.MenuButton asChild>
                <a href="/documents">
                  <FileText />
                  <Sidebar.Label>Documents</Sidebar.Label>
                </a>
              </Sidebar.MenuButton>
            </Tooltip.Trigger>
            <Tooltip.Positioner>
              <Tooltip.Content>Documents</Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Group>
  );
}

export function AppSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content>
          <Navigation />
        </Sidebar.Content>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Content</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}

//#endregion