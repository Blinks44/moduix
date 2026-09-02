import { ScrollArea } from '@moduix/react/scroll-area';
import { Sidebar } from '@moduix/react/sidebar';
import { FileText, FolderOpen, Gauge } from 'lucide-react';
import styles from '@/components/examples/sidebar/sidebar-custom-scroll-area.module.css';

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
    <Sidebar className={styles.root}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content className={styles.sidebarContent}>
          <ScrollArea fade>
            <ScrollArea.Viewport>
              <ScrollArea.Content>
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
                  </Sidebar.NavigationList>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Recent projects</Sidebar.GroupLabel>
                  <Sidebar.NavigationList>
                    {projects.map((project) => (
                      <Sidebar.NavigationItem key={project}>
                        <Sidebar.NavigationButton>
                          <FileText />
                          <Sidebar.Label>{project}</Sidebar.Label>
                        </Sidebar.NavigationButton>
                      </Sidebar.NavigationItem>
                    ))}
                  </Sidebar.NavigationList>
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
        <header className={styles.header}>Project dashboard</header>
        <main className={styles.content}>
          <strong>Recent activity</strong>
          <section className={styles.card}>
            <strong>18 active projects</strong>
            <p className={styles.muted}>
              Scroll the project list independently from the application content.
            </p>
          </section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}