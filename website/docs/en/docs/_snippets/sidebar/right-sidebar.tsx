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

export default function RightSidebar() {
  return (
    <Sidebar
      side="right"
      style={{
        borderRadius: 'var(--moduix-radius-lg)',
        boxShadow: 'var(--moduix-shadow-sm)',
        height: '34rem',
        minHeight: '28rem',
      }}
    >
      <Sidebar.Inset>
        <header
          style={{
            alignItems: 'center',
            borderBlockEnd: '1px solid var(--moduix-color-border)',
            display: 'flex',
            minHeight: '3.5rem',
            paddingInline: '1.5rem',
          }}
        >
          Dashboard
        </header>
        <main style={{ display: 'grid', gap: '1rem', padding: '1.5rem' }}>
          <strong>Page settings</strong>
          <section
            style={{
              border: '1px solid var(--moduix-color-border)',
              borderRadius: 'var(--moduix-radius-md)',
              padding: '1rem',
            }}
          >
            Select an Inspector tool to edit this page.
          </section>
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