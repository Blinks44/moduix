import { createListCollection } from '@ark-ui/react/collection';
import { Avatar, AvatarFallback } from '@moduix/react/avatar';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator, MenuItemText, MenuItemTextContent, MenuItemTextIcon, MenuItemTextLabel } from '@moduix/react/menu';
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
} from '@moduix/react/select';
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
} from '@moduix/react/sidebar';
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
      <SidebarPanel>
        <SidebarHeader>
          <SidebarNavigationList>
            <SidebarNavigationItem>
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
                <SelectTrigger asChild>
                  <SidebarNavigationButton size="lg" aria-label="Select workspace">
                    <span data-sidebar-icon className={styles.workspaceMark}>
                      AC
                    </span>
                    <SidebarLabel className={styles.accountLabel}>
                      <strong className={styles.accountName}>
                        <SelectValueText placeholder="Select workspace" />
                      </strong>
                      <span className={styles.accountEmail}>Workspace</span>
                    </SidebarLabel>
                    <SelectIndicator />
                  </SidebarNavigationButton>
                </SelectTrigger>
                <SelectPositioner>
                  <SelectContent>
                    {workspaces.items.map((workspace) => (
                      <SelectItem key={workspace.value} item={workspace}>
                        <SelectItemText>{workspace.label}</SelectItemText>
                        <SelectItemIndicator />
                      </SelectItem>
                    ))}
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
                <SidebarNavigationButton asChild active>
                  <a href="/overview">
                    <Gauge />
                    <SidebarLabel>Overview</SidebarLabel>
                  </a>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild>
                  <a href="/calendar">
                    <CalendarDays />
                    <SidebarLabel>Calendar</SidebarLabel>
                  </a>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild>
                  <a href="/team">
                    <Users />
                    <SidebarLabel>Team</SidebarLabel>
                  </a>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Library</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild>
                  <a href="/documents">
                    <FileText />
                    <SidebarLabel>Documents</SidebarLabel>
                  </a>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild>
                  <a href="/analytics">
                    <BarChart3 />
                    <SidebarLabel>Analytics</SidebarLabel>
                  </a>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild>
                  <a href="/notifications">
                    <Bell />
                    <SidebarLabel>Notifications</SidebarLabel>
                  </a>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton asChild>
                  <a href="/settings">
                    <Settings />
                    <SidebarLabel>Settings</SidebarLabel>
                  </a>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className={styles.footer}>
          <SidebarSeparator />
          <Menu
            positioning={{
              placement: 'right-end',
              gutter: 8,
              flip: false,
            }}
          >
            <MenuTrigger asChild>
              <SidebarNavigationButton size="lg" aria-label="Open account menu">
                <Avatar size="sm" data-sidebar-icon>
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <SidebarLabel className={styles.accountLabel}>
                  <strong className={styles.accountName}>Alex Morgan</strong>
                  <span className={styles.accountEmail}>alex@acme.dev</span>
                </SidebarLabel>
              </SidebarNavigationButton>
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
        </SidebarFooter>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <header className={styles.header}>Dashboard</header>
        <main className={styles.content}>
          <strong>Acme Inc.</strong>
          <section className={styles.card}>
            Switch workspaces without changing the navigation shell.
          </section>
        </main>
      </SidebarInset>
    </Sidebar>
  );
}
