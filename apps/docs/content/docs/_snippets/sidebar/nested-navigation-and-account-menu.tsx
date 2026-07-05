/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Avatar, Collapsible, Menu, Sidebar, Tooltip, useSidebar } from '@moduix/react';
import {
  ChevronsUpDown,
  FileText,
  FolderOpen,
  Gauge,
  LogOut,
  Pencil,
  RotateCcw,
} from 'lucide-react';

function SidebarNavigation() {
  const { collapsed, side } = useSidebar();
  const tooltipPlacement = side === 'left' ? 'right' : 'left';
  return (
    <>
      <Sidebar.Header>
        <div className="app-brand">
          <strong className="app-brand-mark" data-sidebar-icon>
            M
          </strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Tooltip
                disabled={!collapsed}
                openDelay={200}
                closeDelay={0}
                positioning={{
                  placement: tooltipPlacement,
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
                  <Tooltip.Content>
                    Overview
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Collapsible defaultOpen className="app-collapsible">
                <Tooltip
                  disabled={!collapsed}
                  openDelay={200}
                  closeDelay={0}
                  positioning={{
                    placement: tooltipPlacement,
                    gutter: 8,
                  }}
                >
                  <Tooltip.Trigger asChild>
                    <Collapsible.Trigger asChild>
                      <Sidebar.MenuButton>
                        <FolderOpen />
                        <Sidebar.Label>Projects</Sidebar.Label>
                        <Collapsible.Indicator />
                      </Sidebar.MenuButton>
                    </Collapsible.Trigger>
                  </Tooltip.Trigger>
                  <Tooltip.Positioner>
                    <Tooltip.Content>
                      Projects
                      <Tooltip.Arrow />
                    </Tooltip.Content>
                  </Tooltip.Positioner>
                </Tooltip>
                <Collapsible.Content>
                  <Sidebar.MenuSub>
                    <Sidebar.MenuSubItem>
                      <Sidebar.MenuSubButton href="/projects/website">
                        Website
                      </Sidebar.MenuSubButton>
                    </Sidebar.MenuSubItem>
                  </Sidebar.MenuSub>
                </Collapsible.Content>
              </Collapsible>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Tooltip
                disabled={!collapsed}
                openDelay={200}
                closeDelay={0}
                positioning={{
                  placement: tooltipPlacement,
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
                  <Tooltip.Content>
                    Documents
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Menu
              positioning={{
                placement: 'right-end',
                gutter: 8,
                flip: false,
              }}
            >
              <Menu.Trigger asChild>
                <Sidebar.MenuButton
                  size="lg"
                  aria-label="Open account menu"
                  title="Account"
                  className="app-account-button"
                >
                  <Avatar size="sm" data-sidebar-icon>
                    <Avatar.Fallback>AM</Avatar.Fallback>
                  </Avatar>
                  <Sidebar.Label className="app-account-meta">
                    <strong>Alex Morgan</strong>
                    <span>alex@acme.dev</span>
                  </Sidebar.Label>
                  <Sidebar.Label className="app-account-chevron">
                    <ChevronsUpDown />
                  </Sidebar.Label>
                </Sidebar.MenuButton>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content className="app-account-menu">
                  <Menu.Item value="profile">
                    <Pencil />
                    Profile
                  </Menu.Item>
                  <Menu.Item value="settings">
                    <RotateCcw />
                    Settings
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item value="sign-out" tone="destructive">
                    <LogOut />
                    Sign out
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Footer>
    </>
  );
}

export function AppSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <Sidebar.Panel>
        <SidebarNavigation />
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