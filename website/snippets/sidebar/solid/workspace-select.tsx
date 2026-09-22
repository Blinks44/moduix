import { createListCollection } from '@ark-ui/solid/collection';
import { Avatar, AvatarFallback } from '@moduix/solid/avatar';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator, MenuItemText } from '@moduix/solid/menu';
import {
  Select,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/solid/select';
import {
  Sidebar,
  SidebarPanel,
  SidebarInset,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarLabel,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarNavigationButton,
} from '@moduix/solid/sidebar';
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
      <SidebarPanel>
        <SidebarHeader>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <Select
                class={styles.workspaceSelect}
                collection={workspaces}
                defaultValue={['acme']}
                positioning={{ placement: 'right-start', gutter: 8, flip: false }}
              >
                <SelectTrigger
                  asChild={(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      size="lg"
                      aria-label="Select workspace"
                    />
                  )}
                >
                  <span data-sidebar-icon class={styles.workspaceMark}>
                    AC
                  </span>
                  <SidebarLabel class={styles.accountLabel}>
                    <strong class={styles.accountName}>
                      <SelectValueText placeholder="Select workspace" />
                    </strong>
                    <span class={styles.accountEmail}>Workspace</span>
                  </SidebarLabel>
                  <SelectIndicator />
                </SelectTrigger>
                <SelectPositioner>
                  <SelectContent>
                    <For each={workspaces.items}>
                      {(workspace) => (
                        <SelectItem item={workspace}>
                          <SelectItemText>{workspace.label}</SelectItemText>
                          <SelectItemIndicator />
                        </SelectItem>
                      )}
                    </For>
                  </SelectContent>
                </SelectPositioner>
              </Select>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupHeader>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Create workspace item">
                <Plus />
              </SidebarGroupAction>
            </SidebarGroupHeader>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarNavigationButton
                  active
                  asChild={(props) => <a {...props()} href="/overview" />}
                >
                  <Gauge />
                  <SidebarLabel>Overview</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild={(props) => <a {...props()} href="/calendar" />}>
                  <CalendarDays />
                  <SidebarLabel>Calendar</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild={(props) => <a {...props()} href="/team" />}>
                  <Users />
                  <SidebarLabel>Team</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Library</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild={(props) => <a {...props()} href="/documents" />}>
                  <FileText />
                  <SidebarLabel>Documents</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild={(props) => <a {...props()} href="/analytics" />}>
                  <BarChart3 />
                  <SidebarLabel>Analytics</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton
                  asChild={(props) => <a {...props()} href="/notifications" />}
                >
                  <Bell />
                  <SidebarLabel>Notifications</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild={(props) => <a {...props()} href="/settings" />}>
                  <Settings />
                  <SidebarLabel>Settings</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter class={styles.footer}>
          <SidebarSeparator />
          <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
            <MenuTrigger
              asChild={(props) => (
                <SidebarNavigationButton {...props()} size="lg" aria-label="Open account menu" />
              )}
            >
              <Avatar size="sm" data-sidebar-icon>
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <SidebarLabel class={styles.accountLabel}>
                <strong class={styles.accountName}>Alex Morgan</strong>
                <span class={styles.accountEmail}>alex@acme.dev</span>
              </SidebarLabel>
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent>
                <MenuViewport>
                  <MenuItem value="profile">Profile</MenuItem>
                  <MenuItem value="settings">Account settings</MenuItem>
                  <MenuSeparator />
                  <MenuItem value="sign-out" tone="destructive">
                    <MenuItemText>
                      <LogOut />
                      Sign out
                    </MenuItemText>
                  </MenuItem>
                </MenuViewport>
              </MenuContent>
            </MenuPositioner>
          </Menu>
        </SidebarFooter>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <header class={styles.header}>Dashboard</header>
        <main class={styles.content}>
          <strong>Acme Inc.</strong>
          <section class={styles.card}>
            Switch workspaces without changing the navigation shell.
          </section>
        </main>
      </SidebarInset>
    </Sidebar>
  );
}
