import { ScrollArea } from '@moduix/solid/scroll-area';
import { Sidebar } from '@moduix/solid/sidebar';
import { FileText, FolderOpen, Gauge } from 'lucide-solid';
import { For } from 'solid-js';
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
    <Sidebar class={styles.root}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content class={styles.sidebarContent}>
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
                    <For each={projects}>
                      {(project) => (
                        <Sidebar.NavigationItem>
                          <Sidebar.NavigationButton>
                            <FileText />
                            <Sidebar.Label>{project}</Sidebar.Label>
                          </Sidebar.NavigationButton>
                        </Sidebar.NavigationItem>
                      )}
                    </For>
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
        <header class={styles.header}>Project dashboard</header>
        <main class={styles.content}>
          <strong>Recent activity</strong>
          <section class={styles.card}>
            <strong>18 active projects</strong>
            <p class={styles.muted}>
              Scroll the project list independently from the application content.
            </p>
          </section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}