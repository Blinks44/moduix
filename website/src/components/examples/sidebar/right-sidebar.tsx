import { Menu } from '@moduix/react/menu';
import { Sidebar } from '@moduix/react/sidebar';
import {
  FileSearch,
  History,
  MessageSquare,
  PanelRight,
  Settings,
  SlidersHorizontal,
} from 'lucide-react';
import styles from '@/components/examples/sidebar/sidebar-right-sidebar.module.css';

export default function RightSidebar() {
  return (
    <Sidebar side="right" className={styles.root}>
      <Sidebar.Inset>
        <header className={styles.header}>Dashboard</header>
        <main className={styles.content}>
          <strong>Page settings</strong>
          <section className={styles.card}>Select an Inspector tool to edit this page.</section>
        </main>
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
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton active>
                  <PanelRight />
                  <Sidebar.Label>Properties</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton>
                  <SlidersHorizontal />
                  <Sidebar.Label>Appearance</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton>
                  <FileSearch />
                  <Sidebar.Label>Accessibility</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Activity</Sidebar.GroupLabel>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton>
                  <History />
                  <Sidebar.Label>Version history</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton>
                  <MessageSquare />
                  <Sidebar.Label>Comments</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
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
              <Sidebar.NavigationButton>
                <Settings />
                <Sidebar.Label>Inspector settings</Sidebar.Label>
              </Sidebar.NavigationButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Viewport>
                  <Menu.Item value="preferences">Preferences</Menu.Item>
                  <Menu.Item value="shortcuts">Keyboard shortcuts</Menu.Item>
                  <Menu.Item value="reset">Reset panels</Menu.Item>
                </Menu.Viewport>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
    </Sidebar>
  );
}