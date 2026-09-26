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
} from '@moduix/react/sidebar';
import { FileText, Gauge } from 'lucide-react';
import styles from '@/components/examples/sidebar/sidebar-basic.module.css';

export default function AppSidebar() {
  return (
    <Sidebar className={styles.root}>
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
                  <SidebarNavigationButton asChild active>
                    <a href="/overview">
                      <Gauge />
                      <SidebarLabel>Overview</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Documents">
                  <SidebarNavigationButton asChild>
                    <a href="/documents">
                      <FileText />
                      <SidebarLabel>Documents</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
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
      </SidebarInset>
    </Sidebar>
  );
}