import { Button, Drawer } from '@moduix/react';
import {
  Bell,
  FolderKanban,
  HelpCircle,
  Inbox,
  LayoutDashboard,
  Menu,
  Settings,
  UsersRound,
} from 'lucide-react';
import styles from './mobile-drawer-navigation.module.css';
import '@moduix/react/style.css';

export function MobileDrawerNavigation() {
  return (
    <Drawer.Root swipeDirection="start">
      <section className={styles.root}>
        <header className={styles.topbar}>
          <div className={styles.leading}>
            <Drawer.Trigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Open navigation">
                <Menu />
              </Button>
            </Drawer.Trigger>
            <a className={styles.brand} href="#overview">
              <span className={styles.brandMark} aria-hidden>
                M
              </span>
              <span>Moduix</span>
            </a>
          </div>

          <div className={styles.topbarActions}>
            <Button variant="ghost" size="icon-sm" aria-label="View notifications">
              <Bell />
            </Button>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.intro}>
            <span className={styles.eyebrow}>Monday, July 20</span>
            <h2>Good morning, Alex</h2>
            <p>Keep your workspace moving from any screen size.</p>
          </div>

          <div className={styles.cardGrid}>
            <article className={styles.statCard}>
              <span>Active projects</span>
              <strong>12</strong>
              <p>3 due this week</p>
            </article>
            <article className={styles.statCard}>
              <span>Inbox</span>
              <strong>8</strong>
              <p>2 need your reply</p>
            </article>
          </div>

          <article className={styles.activity}>
            <span className={styles.activityDot} aria-hidden />
            <div>
              <strong>Website refresh moved to review</strong>
              <p>Open the navigation to see your workspace.</p>
            </div>
          </article>
        </main>
      </section>

      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content className={styles.drawer} draggable={false}>
          <Drawer.Header className={styles.drawerHeader}>
            <Drawer.Title>Navigation</Drawer.Title>
            <Drawer.CloseIcon />
          </Drawer.Header>
          <Drawer.Body className={styles.drawerBody}>
            <nav className={styles.navigation} aria-label="Mobile navigation">
              <span className={styles.navigationLabel}>Workspace</span>
              <Drawer.CloseTrigger asChild>
                <a className={styles.navigationLink} data-active href="#overview">
                  <LayoutDashboard />
                  Overview
                </a>
              </Drawer.CloseTrigger>
              <Drawer.CloseTrigger asChild>
                <a className={styles.navigationLink} href="#projects">
                  <FolderKanban />
                  Projects
                </a>
              </Drawer.CloseTrigger>
              <Drawer.CloseTrigger asChild>
                <a className={styles.navigationLink} href="#team">
                  <UsersRound />
                  Team
                </a>
              </Drawer.CloseTrigger>
              <Drawer.CloseTrigger asChild>
                <a className={styles.navigationLink} href="#inbox">
                  <Inbox />
                  Inbox
                  <span className={styles.inboxCount}>8</span>
                </a>
              </Drawer.CloseTrigger>

              <div className={styles.navigationFooter}>
                <Drawer.CloseTrigger asChild>
                  <a className={styles.navigationLink} href="#settings">
                    <Settings />
                    Settings
                  </a>
                </Drawer.CloseTrigger>
                <Drawer.CloseTrigger asChild>
                  <a className={styles.navigationLink} href="#help">
                    <HelpCircle />
                    Help and feedback
                  </a>
                </Drawer.CloseTrigger>
              </div>
            </nav>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}