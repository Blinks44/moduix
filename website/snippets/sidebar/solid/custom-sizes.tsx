import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@moduix/solid/menu';
import { Sidebar } from '@moduix/solid/sidebar';
import { BarChart3, FileText, FolderOpen, Gauge, MessageSquare, Settings } from 'lucide-solid';
import styles from '@/components/examples/sidebar/sidebar-custom-sizes.module.css';

export default function SizedSidebar() {
  return (
    <Sidebar defaultSize={['14rem']} class={styles.root}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton active>
                  <Gauge />
                  <Sidebar.Label>Overview</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton>
                  <FolderOpen />
                  <Sidebar.Label>Projects</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton>
                  <FileText />
                  <Sidebar.Label>Documents</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Insights</Sidebar.GroupLabel>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton>
                  <BarChart3 />
                  <Sidebar.Label>Analytics</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.NavigationButton>
                  <MessageSquare />
                  <Sidebar.Label>Messages</Sidebar.Label>
                </Sidebar.NavigationButton>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
            <MenuTrigger asChild={(props) => <Sidebar.NavigationButton {...props()} />}>
              <Settings />
              <Sidebar.Label>Settings</Sidebar.Label>
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
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header class={styles.header}>Dashboard</header>
        <main class={styles.content}>
          <strong>Resizable workspace</strong>
          <section class={styles.card}>Resize the sidebar between 3rem and 18rem.</section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}
