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
  SidebarTooltip,
  SidebarNavigationButton,
  SidebarNavigationBadge,
} from '@moduix/solid/sidebar';
import { FileText, Gauge } from 'lucide-solid';
import styles from '@/components/examples/sidebar/sidebar-basic.module.css';

export default function AppSidebar() {
  return (
    <Sidebar class={styles.root}>
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
                <SidebarTooltip content="Overview">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      active
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/overview">
                          <Gauge />
                          <SidebarLabel>Overview</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Documents">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/documents">
                          <FileText />
                          <SidebarLabel>Documents</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
                <SidebarNavigationBadge>12</SidebarNavigationBadge>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
        </SidebarContent>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
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
      </SidebarInset>
    </Sidebar>
  );
}