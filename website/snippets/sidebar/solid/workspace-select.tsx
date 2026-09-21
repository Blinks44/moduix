import { createListCollection } from '@ark-ui/solid/collection';
import { Avatar, AvatarFallback } from '@moduix/solid/avatar';
import { Menu } from '@moduix/solid/menu';
import { Select } from '@moduix/solid/select';
import { Sidebar } from '@moduix/solid/sidebar';
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
} from 'lucide-solid';
import { For } from 'solid-js';
import styles from '@/components/examples/sidebar/sidebar-workspace-select.module.css';

const workspaces = createListCollection({
  items: [
    { label: 'Acme Inc.', value: 'acme' },
    { label: 'Northstar', value: 'northstar' },
    { label: 'Personal', value: 'personal' },
  ],
});

export default function WorkspaceSidebar() {
  return (
    <Sidebar class={styles.root}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <Sidebar.NavigationList>
            <Sidebar.NavigationItem>
              <Select
                class={styles.workspaceSelect}
                collection={workspaces}
                defaultValue={['acme']}
                positioning={{ placement: 'right-start', gutter: 8, flip: false }}
              >
                <Select.Trigger
                  asChild={(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      size="lg"
                      aria-label="Select workspace"
                    />
                  )}
                >
                  <span data-sidebar-icon class={styles.workspaceMark}>
                    AC
                  </span>
                  <Sidebar.Label class={styles.accountLabel}>
                    <strong class={styles.accountName}>
                      <Select.ValueText placeholder="Select workspace" />
                    </strong>
                    <span class={styles.accountEmail}>Workspace</span>
                  </Sidebar.Label>
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Positioner>
                  <Select.Content>
                    <For each={workspaces.items}>
                      {(workspace) => (
                        <Select.Item item={workspace}>
                          <Select.ItemText>{workspace.label}</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                      )}
                    </For>
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
                <Sidebar.NavigationButton
                  active
                  asChild={(props) => <a {...props()} href="/overview" />}
                >
                  <Gauge />
                  <Sidebar.Label>Overview</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton asChild={(props) => <a {...props()} href="/calendar" />}>
                  <CalendarDays />
                  <Sidebar.Label>Calendar</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton asChild={(props) => <a {...props()} href="/team" />}>
                  <Users />
                  <Sidebar.Label>Team</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Library</Sidebar.GroupLabel>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton asChild={(props) => <a {...props()} href="/documents" />}>
                  <FileText />
                  <Sidebar.Label>Documents</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton asChild={(props) => <a {...props()} href="/analytics" />}>
                  <BarChart3 />
                  <Sidebar.Label>Analytics</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton
                  asChild={(props) => <a {...props()} href="/notifications" />}
                >
                  <Bell />
                  <Sidebar.Label>Notifications</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton asChild={(props) => <a {...props()} href="/settings" />}>
                  <Settings />
                  <Sidebar.Label>Settings</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer class={styles.footer}>
          <Sidebar.Separator />
          <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
            <Menu.Trigger
              asChild={(props) => (
                <Sidebar.NavigationButton {...props()} size="lg" aria-label="Open account menu" />
              )}
            >
              <Avatar size="sm" data-sidebar-icon>
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <Sidebar.Label class={styles.accountLabel}>
                <strong class={styles.accountName}>Alex Morgan</strong>
                <span class={styles.accountEmail}>alex@acme.dev</span>
              </Sidebar.Label>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Viewport>
                  <Menu.Item value="profile">Profile</Menu.Item>
                  <Menu.Item value="settings">Account settings</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item value="sign-out" tone="destructive">
                    <Menu.ItemText>
                      <LogOut />
                      Sign out
                    </Menu.ItemText>
                  </Menu.Item>
                </Menu.Viewport>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header class={styles.header}>Dashboard</header>
        <main class={styles.content}>
          <strong>Acme Inc.</strong>
          <section class={styles.card}>
            Switch workspaces without changing the navigation shell.
          </section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}