import { Sidebar } from '@moduix/solid/sidebar';
import { FileText, Gauge } from 'lucide-solid';
import styles from '@/components/examples/sidebar/sidebar-basic.module.css';

export default function AppSidebar() {
  return (
    <Sidebar class={styles.root}>
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
                  {(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      active
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/overview">
                          <Gauge />
                          <Sidebar.Label>Overview</Sidebar.Label>
                        </a>
                      )}
                    />
                  )}
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Documents">
                  {(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/documents">
                          <FileText />
                          <Sidebar.Label>Documents</Sidebar.Label>
                        </a>
                      )}
                    />
                  )}
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header class={styles.header}>Dashboard</header>
        <main class={styles.content}>
          <div>
            <strong>Workspace overview</strong>
            <p class={styles.muted}>
              Keep navigation, content, and resizing in one responsive shell.
            </p>
          </div>
          <section class={styles.card}>
            <strong>12 open tasks</strong>
            <p class={styles.muted}>Your team is on track for this week.</p>
          </section>
          <div class={styles.stats}>
            <section class={styles.card}>
              <strong>8</strong>
              <p class={styles.muted}>In review</p>
            </section>
            <section class={styles.card}>
              <strong>4</strong>
              <p class={styles.muted}>Due today</p>
            </section>
          </div>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}