/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Avatar, Collapsible, Menu, Sidebar } from '@moduix/react';
import {
  ChevronsUpDown,
  FileText,
  FolderOpen,
  Gauge,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Users,
} from 'lucide-react';

export function AppSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <Sidebar.Panel>
        <Sidebar.Header>
          <div className="app-header-stack">
            <div className="app-brand">
              <strong className="app-brand-mark" data-sidebar-icon>
                M
              </strong>
              <Sidebar.Label>Moduix</Sidebar.Label>
            </div>
            <Sidebar.Input aria-label="Search workspace" placeholder="Search" size="sm" />
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.GroupAction aria-label="Create workspace item">
              <Plus />
            </Sidebar.GroupAction>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                <Sidebar.MenuItem>
                  <Sidebar.Tooltip content="Overview">
                    <Sidebar.MenuButton asChild active>
                      <a href="/overview">
                        <Gauge />
                        <Sidebar.Label>Overview</Sidebar.Label>
                      </a>
                    </Sidebar.MenuButton>
                  </Sidebar.Tooltip>
                  <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Collapsible defaultOpen className="app-collapsible">
                    <Sidebar.Tooltip content="Projects">
                      <Collapsible.Trigger asChild>
                        <Sidebar.MenuButton>
                          <FolderOpen />
                          <Sidebar.Label>Projects</Sidebar.Label>
                          <Collapsible.Indicator />
                        </Sidebar.MenuButton>
                      </Collapsible.Trigger>
                    </Sidebar.Tooltip>
                    <Sidebar.MenuAction aria-label="Rename project group">
                      <Pencil />
                    </Sidebar.MenuAction>
                    <Collapsible.Content>
                      <Sidebar.MenuSub>
                        <Sidebar.MenuSubItem>
                          <Sidebar.MenuSubButton href="/projects/website">
                            Website
                          </Sidebar.MenuSubButton>
                        </Sidebar.MenuSubItem>
                        <Sidebar.MenuSubItem>
                          <Sidebar.MenuSubButton href="/projects/mobile">
                            Mobile app
                          </Sidebar.MenuSubButton>
                        </Sidebar.MenuSubItem>
                      </Sidebar.MenuSub>
                    </Collapsible.Content>
                  </Collapsible>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.Tooltip content="Team">
                    <Sidebar.MenuButton asChild>
                      <a href="/team">
                        <Users />
                        <Sidebar.Label>Team</Sidebar.Label>
                      </a>
                    </Sidebar.MenuButton>
                  </Sidebar.Tooltip>
                  <Sidebar.MenuBadge>12</Sidebar.MenuBadge>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.Tooltip content="Documents">
                    <Sidebar.MenuButton asChild>
                      <a href="/documents">
                        <FileText />
                        <Sidebar.Label>Documents</Sidebar.Label>
                      </a>
                    </Sidebar.MenuButton>
                  </Sidebar.Tooltip>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer className="app-footer-stack">
          <Sidebar.Separator />
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
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