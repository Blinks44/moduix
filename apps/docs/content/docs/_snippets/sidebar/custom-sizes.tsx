/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Menu, Sidebar } from '@moduix/react';
import { BarChart3, FileText, FolderOpen, Gauge, MessageSquare, Settings } from 'lucide-react';

const panels = [
  {
    id: 'sidebar',
    minSize: '10rem',
    maxSize: '17rem',
    collapsible: true,
    collapsedSize: '3rem',
  },
  {
    id: 'content',
  },
];

export function SizedSidebar() {
  return (
    <Sidebar panels={panels} defaultSize={['14rem']} className="app-sidebar">
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton active>
                  <Gauge />
                  <Sidebar.Label>Overview</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <FolderOpen />
                  <Sidebar.Label>Projects</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <FileText />
                  <Sidebar.Label>Documents</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Insights</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <BarChart3 />
                  <Sidebar.Label>Analytics</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <MessageSquare />
                  <Sidebar.Label>Messages</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Menu
            positioning={{
              placement: 'right-end',
              gutter: 8,
              flip: false,
            }}
          >
            <Menu.Trigger asChild>
              <Sidebar.MenuButton>
                <Settings />
                <Sidebar.Label>Settings</Sidebar.Label>
              </Sidebar.MenuButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="workspace">Workspace settings</Menu.Item>
                <Menu.Item value="members">Manage members</Menu.Item>
                <Menu.Item value="billing">Billing</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Resize between 10rem and 17rem.</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}

//#endregion