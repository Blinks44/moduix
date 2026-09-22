import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@moduix/solid/menu';
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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarNavigationButton,
} from '@moduix/solid/sidebar';
import { BarChart3, FileText, FolderOpen, Gauge, MessageSquare, Settings } from 'lucide-solid';
import styles from '@/components/examples/sidebar/sidebar-custom-sizes.module.css';

export default function SizedSidebar() {
  return (
    <Sidebar defaultSize={['14rem']} class={styles.root}>
      <SidebarPanel>
        <SidebarHeader>
          <strong data-sidebar-icon>M</strong>
          <SidebarLabel>Moduix</SidebarLabel>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarNavigationButton active>
                  <Gauge />
                  <SidebarLabel>Overview</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton>
                  <FolderOpen />
                  <SidebarLabel>Projects</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton>
                  <FileText />
                  <SidebarLabel>Documents</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Insights</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarNavigationButton>
                  <BarChart3 />
                  <SidebarLabel>Analytics</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarNavigationButton>
                  <MessageSquare />
                  <SidebarLabel>Messages</SidebarLabel>
                </SidebarNavigationButton>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
            <MenuTrigger asChild={(props) => <SidebarNavigationButton {...props()} />}>
              <Settings />
              <SidebarLabel>Settings</SidebarLabel>
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent>
                <MenuViewport>
                  <MenuItem value="workspace">Workspace settings</MenuItem>
                  <MenuItem value="members">Manage members</MenuItem>
                  <MenuItem value="billing">Billing</MenuItem>
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
          <strong>Resizable workspace</strong>
          <section class={styles.card}>Resize the sidebar between 3rem and 18rem.</section>
        </main>
      </SidebarInset>
    </Sidebar>
  );
}
