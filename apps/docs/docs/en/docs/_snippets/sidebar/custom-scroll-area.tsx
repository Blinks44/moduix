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
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content style={{ overflow: 'hidden' }}>
          <ScrollArea fade>
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
        <header
          style={{
            alignItems: 'center',
            borderBlockEnd: '1px solid var(--moduix-color-border)',
            display: 'flex',
            minHeight: '3.5rem',
            paddingInline: '1.5rem',
          }}
        >
          Project dashboard
        </header>
        <main style={{ display: 'grid', gap: '1rem', padding: '1.5rem' }}>
          <strong>Recent activity</strong>
          <section
            style={{
              border: '1px solid var(--moduix-color-border)',
              borderRadius: 'var(--moduix-radius-md)',
              padding: '1rem',
            }}
          >
            <strong>18 active projects</strong>
            <p style={{ color: 'var(--moduix-color-muted-foreground)', marginBlock: '0.25rem 0' }}>
              Scroll the project list independently from the application content.
            </p>
          </section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}