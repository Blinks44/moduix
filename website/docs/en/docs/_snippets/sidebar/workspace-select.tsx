import { createListCollection } from '@ark-ui/react/collection';
import { Avatar } from '@moduix/react/avatar';
import { Menu } from '@moduix/react/menu';
import { Select } from '@moduix/react/select';
import { Sidebar } from '@moduix/react/sidebar';
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

export default function WorkspaceSidebar() {
  return (
    <Sidebar
      style={{
        borderRadius: 'var(--moduix-radius-lg)',
        boxShadow: 'var(--moduix-shadow-sm)',
        height: '34rem',
        minHeight: '28rem',
      }}
    >
      <Sidebar.Panel>
        <Sidebar.Header>
          <Sidebar.NavigationList>
            <Sidebar.NavigationItem>
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
                  <Sidebar.NavigationButton size="lg" aria-label="Select workspace">
                    <span
                      data-sidebar-icon
                      style={{
                        alignItems: 'center',
                        backgroundColor: 'var(--moduix-color-accent)',
                        borderRadius: 'var(--moduix-radius-sm)',
                        display: 'inline-flex',
                        height: '2rem',
                        justifyContent: 'center',
                        width: '2rem',
                      }}
                    >
                      AC
                    </span>
                    <Sidebar.Label>
                      <Select.ValueText placeholder="Select workspace" />
                    </Sidebar.Label>
                    <Select.Indicator />
                  </Sidebar.NavigationButton>
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
              </Select>
            </Sidebar.NavigationItem>
          </Sidebar.NavigationList>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.GroupAction aria-label="Create workspace item">
              <Plus />
            </Sidebar.GroupAction>
            <Sidebar.GroupContent>
              <Sidebar.NavigationList>
                <Sidebar.NavigationItem>
                  <Sidebar.NavigationButton asChild active>
                    <a href="/overview">
                      <Gauge />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                  <Sidebar.NavigationBadge>3</Sidebar.NavigationBadge>
                </Sidebar.NavigationItem>
                <Sidebar.NavigationItem>
                  <Sidebar.NavigationButton asChild>
                    <a href="/calendar">
                      <CalendarDays />
                      <Sidebar.Label>Calendar</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.NavigationItem>
                <Sidebar.NavigationItem>
                  <Sidebar.NavigationButton asChild>
                    <a href="/team">
                      <Users />
                      <Sidebar.Label>Team</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                  <Sidebar.NavigationAction aria-label="Rename team section">
                    <Pencil />
                  </Sidebar.NavigationAction>
                </Sidebar.NavigationItem>
              </Sidebar.NavigationList>
            </Sidebar.GroupContent>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Library</Sidebar.GroupLabel>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton asChild>
                  <a href="/documents">
                    <FileText />
                    <Sidebar.Label>Documents</Sidebar.Label>
                  </a>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton asChild>
                  <a href="/analytics">
                    <BarChart3 />
                    <Sidebar.Label>Analytics</Sidebar.Label>
                  </a>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton asChild>
                  <a href="/notifications">
                    <Bell />
                    <Sidebar.Label>Notifications</Sidebar.Label>
                  </a>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton asChild>
                  <a href="/settings">
                    <Settings />
                    <Sidebar.Label>Settings</Sidebar.Label>
                  </a>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer style={{ display: 'grid', width: '100%' }}>
          <Sidebar.Separator />
          <Menu
            positioning={{
              placement: 'right-end',
              gutter: 8,
              flip: false,
            }}
          >
            <Menu.Trigger asChild>
              <Sidebar.NavigationButton size="lg" aria-label="Open account menu">
                <Avatar size="sm" data-sidebar-icon>
                  <Avatar.Fallback>AM</Avatar.Fallback>
                </Avatar>
                <Sidebar.Label style={{ display: 'grid', flex: 1, textAlign: 'start' }}>
                  <strong
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    Alex Morgan
                  </strong>
                  <span
                    style={{
                      color: 'var(--moduix-color-muted-foreground)',
                      fontSize: 'var(--moduix-text-xs)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    alex@acme.dev
                  </span>
                </Sidebar.Label>
              </Sidebar.NavigationButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="profile">Profile</Menu.Item>
                <Menu.Item value="settings">Account settings</Menu.Item>
                <Menu.Separator />
                <Menu.Item value="sign-out" tone="destructive">
                  <Menu.ItemText>
                    <Menu.ItemTextContent>
                      <Menu.ItemTextIcon>
                        <LogOut />
                      </Menu.ItemTextIcon>
                      <Menu.ItemTextLabel>Sign out</Menu.ItemTextLabel>
                    </Menu.ItemTextContent>
                  </Menu.ItemText>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
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
          <strong>Acme Inc.</strong>
          <section
            style={{
              border: '1px solid var(--moduix-color-border)',
              borderRadius: 'var(--moduix-radius-md)',
              padding: '1rem',
            }}
          >
            Switch workspaces without changing the navigation shell.
          </section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}