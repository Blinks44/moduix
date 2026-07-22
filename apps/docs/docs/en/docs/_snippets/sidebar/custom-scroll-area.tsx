import { ScrollArea, Sidebar } from '@moduix/react';
import { FileText, FolderOpen, Gauge } from 'lucide-react';

const projects = [
  'Website',
  'Mobile app',
  'Design system',
  'Marketing',
  'Internal tools',
  'Customer portal',
  'Analytics',
  'Documentation',
  'Onboarding',
  'Research',
  'Experiments',
  'Archive',
];

export default function ScrollableSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content className="app-sidebar-scroll-content">
          <ScrollArea fade className="app-sidebar-scroll-area">
            <ScrollArea.Viewport>
              <ScrollArea.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton active>
                        <Gauge />
                        <Sidebar.Label>Overview</Sidebar.Label>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton>
                        <FolderOpen />
                        <Sidebar.Label>Projects</Sidebar.Label>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Recent projects</Sidebar.GroupLabel>
                  <Sidebar.Menu>
                    {projects.map((project) => (
                      <Sidebar.MenuItem key={project}>
                        <Sidebar.MenuButton>
                          <FileText />
                          <Sidebar.Label>{project}</Sidebar.Label>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    ))}
                  </Sidebar.Menu>
                </Sidebar.Group>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea>
        </Sidebar.Content>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Main content</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}