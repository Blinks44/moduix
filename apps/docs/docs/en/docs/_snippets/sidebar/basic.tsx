import { Sidebar } from '@moduix/react';
import { FileText, Gauge } from 'lucide-react';

export default function AppSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.Tooltip content="Overview">
                  <Sidebar.MenuButton asChild active>
                    <a href="/overview">
                      <Gauge />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                </Sidebar.Tooltip>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.Tooltip content="Documents">
                  <Sidebar.MenuButton asChild>
                    <a href="/documents">
                      <FileText />
                      <Sidebar.Label>Documents</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                </Sidebar.Tooltip>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Content</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}