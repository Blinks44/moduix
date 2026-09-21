import { createListCollection } from '@ark-ui/react/collection';
import { Avatar, AvatarFallback } from '@moduix/react/avatar';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator, MenuItemText, MenuItemTextContent, MenuItemTextIcon, MenuItemTextLabel } from '@moduix/react/menu';
import { Select } from '@moduix/react/select';
import { Sidebar } from '@moduix/react/sidebar';
import {
  BarChart3,
  Bell,
  CalendarDays,
  FileText,
  Gauge,
  LogOut,
  Plus,
  Settings,
  Users,
} from 'lucide-react';
import styles from '@/components/examples/sidebar/sidebar-workspace-select.module.css';

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
    <Sidebar className={styles.root}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <Sidebar.NavigationList>
            <Sidebar.NavigationItem>
              <Select
                className={styles.workspaceSelect}
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
                    <span data-sidebar-icon className={styles.workspaceMark}>
                      AC
                    </span>
                    <Sidebar.Label className={styles.accountLabel}>
                      <strong className={styles.accountName}>
                        <Select.ValueText placeholder="Select workspace" />
                      </strong>
                      <span className={styles.accountEmail}>Workspace</span>
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
            <Sidebar.GroupHeader>
              <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
              <Sidebar.GroupAction aria-label="Create workspace item">
                <Plus />
              </Sidebar.GroupAction>
            </Sidebar.GroupHeader>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton asChild active>
                  <a href="/overview">
                    <Gauge />
                    <Sidebar.Label>Overview</Sidebar.Label>
                  </a>
                </Sidebar.NavigationButton>
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
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
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
        <Sidebar.Footer className={styles.footer}>
          <Sidebar.Separator />
          <Menu
            positioning={{
              placement: 'right-end',
              gutter: 8,
              flip: false,
            }}
          >
            <MenuTrigger asChild>
              <Sidebar.NavigationButton size="lg" aria-label="Open account menu">
                <Avatar size="sm" data-sidebar-icon>
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <Sidebar.Label className={styles.accountLabel}>
                  <strong className={styles.accountName}>Alex Morgan</strong>
                  <span className={styles.accountEmail}>alex@acme.dev</span>
                </Sidebar.Label>
              </Sidebar.NavigationButton>
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent>
                <MenuViewport>
                  <MenuItem value="profile">Profile</MenuItem>
                  <MenuItem value="settings">Account settings</MenuItem>
                  <MenuSeparator />
                  <MenuItem value="sign-out" tone="destructive">
                    <MenuItemText>
                      <MenuItemTextContent>
                        <MenuItemTextIcon>
                          <LogOut />
                        </MenuItemTextIcon>
                        <MenuItemTextLabel>Sign out</MenuItemTextLabel>
                      </MenuItemTextContent>
                    </MenuItemText>
                  </MenuItem>
                </MenuViewport>
              </MenuContent>
            </MenuPositioner>
          </Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className={styles.header}>Dashboard</header>
        <main className={styles.content}>
          <strong>Acme Inc.</strong>
          <section className={styles.card}>
            Switch workspaces without changing the navigation shell.
          </section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}
