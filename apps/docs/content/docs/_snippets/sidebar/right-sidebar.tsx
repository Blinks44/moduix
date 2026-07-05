/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Menu, Sidebar } from '@moduix/react';
import {
  FileSearch,
  History,
  MessageSquare,
  PanelRight,
  Settings,
  SlidersHorizontal,
} from 'lucide-react';

export function RightSidebar() {
  return (
    <Sidebar side="right" className="app-sidebar">
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Main content</main>
      </Sidebar.Inset>
      <Sidebar.Trigger />
      <Sidebar.ResizeTrigger />
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>IN</strong>
          <Sidebar.Label>Inspector</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Tools</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton active>
                  <PanelRight />
                  <Sidebar.Label>Properties</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <SlidersHorizontal />
                  <Sidebar.Label>Appearance</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <FileSearch />
                  <Sidebar.Label>Accessibility</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Activity</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <History />
                  <Sidebar.Label>Version history</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <MessageSquare />
                  <Sidebar.Label>Comments</Sidebar.Label>
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
                <Sidebar.Label>Inspector settings</Sidebar.Label>
              </Sidebar.MenuButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="preferences">Preferences</Menu.Item>
                <Menu.Item value="shortcuts">Keyboard shortcuts</Menu.Item>
                <Menu.Item value="reset">Reset panels</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
    </Sidebar>
  );
}

//#endregion