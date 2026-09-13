import { Sidebar } from '@moduix/react/sidebar';
import { FileText, Gauge } from 'lucide-react';
import styles from '@/components/examples/sidebar/sidebar-basic.module.css';

export default function AppSidebar() {
  return (
    <Sidebar className={styles.root}>
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
                <Sidebar.Tooltip content="Overview">
                  <Sidebar.NavigationButton asChild active>
                    <a href="/overview">
                      <Gauge />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Documents">
                  <Sidebar.NavigationButton asChild>
                    <a href="/documents">
                      <FileText />
                      <Sidebar.Label>Documents</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
                <Sidebar.NavigationBadge>12</Sidebar.NavigationBadge>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className={styles.header}>Dashboard</header>
        <main className={styles.content}>
          <div>
            <strong>Workspace overview</strong>
            <p className={styles.muted}>
              Keep navigation, content, and resizing in one responsive shell.
            </p>
          </div>
          <section className={styles.card}>
            <strong>12 open tasks</strong>
            <p className={styles.muted}>Your team is on track for this week.</p>
          </section>
          <div className={styles.stats}>
            <section className={styles.card}>
              <strong>8</strong>
              <p className={styles.muted}>In review</p>
            </section>
            <section className={styles.card}>
              <strong>4</strong>
              <p className={styles.muted}>Due today</p>
            </section>
          </div>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}