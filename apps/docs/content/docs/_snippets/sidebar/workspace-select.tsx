/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { createListCollection } from '@ark-ui/react/collection';
import { Avatar, Menu, Select, Sidebar } from '@moduix/react';
import {
  BarChart3,
  Bell,
  CalendarDays,
  FileText,
  Gauge,
  LogOut,
  Pencil,
  Plus,
  Settings,
  Users,
} from 'lucide-react';

const workspaces = createListCollection({
  items: [
    {
      label: 'Acme Inc.',
      value: 'acme',
    },
    {
      label: 'Northstar',
      value: 'northstar',
    },
    {
      label: 'Personal',
      value: 'personal',
    },
  ],
});

export function WorkspaceSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <Sidebar.Panel>
        <Sidebar.Header>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Select
                collection={workspaces}
                defaultValue={['acme']}
                positioning={{
                  placement: 'right-start',
                  gutter: 8,
                  flip: false,
                }}
              >
                <Select.Trigger asChild>
                  <Sidebar.MenuButton size="lg" aria-label="Select workspace">
                    <span className="app-workspace-mark" data-sidebar-icon>
                      AC
                    </span>
                    <Sidebar.Label>
                      <Select.ValueText placeholder="Select workspace" />
                    </Sidebar.Label>
                    <Sidebar.Label>
                      <Select.Indicator />
                    </Sidebar.Label>
                  </Sidebar.MenuButton>
                </Select.Trigger>
                <Select.Positioner>
                  <Select.Content>
                    {workspaces.items.map((workspace) => (
                      <Select.Item key={workspace.value} item={workspace}>
                        <Select.ItemText>{workspace.label}</Select.ItemText>
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
                <Select.HiddenSelect />
              </Select>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
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
                  <Sidebar.MenuButton asChild active>
                    <a href="/overview">
                      <Gauge />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                  <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton asChild>
                    <a href="/calendar">
                      <CalendarDays />
                      <Sidebar.Label>Calendar</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.MenuButton asChild>
                    <a href="/team">
                      <Users />
                      <Sidebar.Label>Team</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                  <Sidebar.MenuAction aria-label="Rename team section">
                    <Pencil />
                  </Sidebar.MenuAction>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Library</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <a href="/documents">
                    <FileText />
                    <Sidebar.Label>Documents</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <a href="/analytics">
                    <BarChart3 />
                    <Sidebar.Label>Analytics</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <a href="/notifications">
                    <Bell />
                    <Sidebar.Label>Notifications</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <a href="/settings">
                    <Settings />
                    <Sidebar.Label>Settings</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer className="app-footer-stack">
          <Sidebar.Separator />
          <Menu
            positioning={{
              placement: 'right-end',
              gutter: 8,
              flip: false,
            }}
          >
            <Menu.Trigger asChild>
              <Sidebar.MenuButton size="lg" aria-label="Open account menu">
                <Avatar size="sm" data-sidebar-icon>
                  <Avatar.Fallback>AM</Avatar.Fallback>
                </Avatar>
                <Sidebar.Label className="app-account-meta">
                  <strong>Alex Morgan</strong>
                  <span>alex@acme.dev</span>
                </Sidebar.Label>
              </Sidebar.MenuButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="profile">Profile</Menu.Item>
                <Menu.Item value="settings">Account settings</Menu.Item>
                <Menu.Separator />
                <Menu.Item value="sign-out" tone="destructive">
                  <LogOut />
                  Sign out
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Workspace content</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}

//#endregion