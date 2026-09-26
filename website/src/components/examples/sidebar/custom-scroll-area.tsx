import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/react/scroll-area';
import {
  Sidebar,
  SidebarPanel,
  SidebarInset,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarLabel,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarNavigationButton,
} from '@moduix/react/sidebar';
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
      <SidebarPanel>
        <SidebarHeader>
          <strong data-sidebar-icon>M</strong>
          <SidebarLabel>Moduix</SidebarLabel>
        </SidebarHeader>
        <SidebarContent className={styles.sidebarContent}>
          <ScrollArea fade>
            <ScrollAreaViewport>
              <ScrollAreaContent>
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
                  </SidebarNavigationList>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Recent projects</SidebarGroupLabel>
                  <SidebarNavigationList>
                    {projects.map((project) => (
                      <SidebarNavigationItem key={project}>
                        <SidebarNavigationButton>
                          <FileText />
                          <SidebarLabel>{project}</SidebarLabel>
                        </SidebarNavigationButton>
                      </SidebarNavigationItem>
                    ))}
                  </SidebarNavigationList>
                </SidebarGroup>
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar>
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollArea>
        </SidebarContent>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
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
      </SidebarInset>
    </Sidebar>
  );
}