'use client';

import { useRef, useState, type ReactNode } from 'react';
import { Button } from '@/registry/react/ui/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseIcon,
  DrawerContent,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/react/ui/drawer';
import styles from './app-shell.module.css';

export type AppPage = 'Projects' | 'Team' | 'Reports' | 'Settings';

function Navigation({
  page,
  workspace,
  onNavigate,
}: {
  page: AppPage;
  workspace: string;
  onNavigate: (page: AppPage) => void;
}) {
  return (
    <>
      <div className={styles.brand}>
        <span className={styles.brandMark}>A</span>
        <div>
          <strong>{workspace}</strong>
          <span>moduix + React</span>
        </div>
      </div>
      <nav aria-label="Workspace">
        <p className={styles.navHeading}>Workspace</p>
        {(['Projects', 'Team', 'Reports', 'Settings'] as const).map((item) => (
          <button
            key={item}
            type="button"
            className={styles.navItem}
            aria-current={page === item ? 'page' : undefined}
            onClick={() => onNavigate(item)}
          >
            {item}
          </button>
        ))}
        <p className={`${styles.navHeading} ${styles.resources}`}>Resources</p>
        <a className={styles.navItem} href="https://moduix.dev/docs/quick-start">
          Documentation
        </a>
        <a className={styles.navItem} href="https://moduix.dev/docs/components">
          Components
        </a>
      </nav>
      <div className={styles.user}>
        <span className={styles.avatar}>AL</span>
        <div>
          <strong>Ada Lovelace</strong>
          <span>ada@acme.dev</span>
        </div>
      </div>
    </>
  );
}

export function AppShell({
  page,
  workspace = 'Acme Projects',
  onNavigate,
  children,
}: {
  page: AppPage;
  workspace?: string;
  onNavigate: (page: AppPage) => void;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>();

  return (
    <div ref={rootRef} className={styles.root} data-moduix-color-scheme={colorScheme}>
      <Drawer
        open={menuOpen}
        onOpenChange={(details) => setMenuOpen(details.open)}
        swipeDirection="start"
        portalRef={rootRef}
      >
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <Navigation page={page} workspace={workspace} onNavigate={onNavigate} />
          </aside>
          <div className={styles.inset}>
            <header className={styles.topbar}>
              <DrawerTrigger asChild>
                <Button
                  className={styles.mobileMenu}
                  variant="ghost"
                  size="icon-md"
                  aria-label="Open navigation"
                >
                  <span className={`${styles.icon} ${styles.menuIcon}`} aria-hidden />
                </Button>
              </DrawerTrigger>
              <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
                <span>Workspace</span>
                <span aria-hidden>/</span>
                <strong aria-current="page">{page}</strong>
              </nav>
              <div className={styles.actions}>
                <Button
                  variant="ghost"
                  size="icon-md"
                  aria-label="Toggle color scheme"
                  onClick={() => {
                    if (rootRef.current)
                      setColorScheme(
                        getComputedStyle(rootRef.current).colorScheme === 'dark' ? 'light' : 'dark',
                      );
                  }}
                >
                  <span className={`${styles.icon} ${styles.sunIcon}`} aria-hidden />
                </Button>
                <a
                  className={styles.iconLink}
                  aria-label="GitHub"
                  href="https://github.com/Blinks44/moduix"
                >
                  <span className={`${styles.icon} ${styles.githubIcon}`} aria-hidden />
                </a>
              </div>
            </header>
            <main className={styles.content}>{children}</main>
          </div>
        </div>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent className={styles.mobileSidebar}>
            <DrawerTitle className={styles.srOnly}>Workspace navigation</DrawerTitle>
            <DrawerCloseIcon />
            <Navigation
              page={page}
              workspace={workspace}
              onNavigate={(next) => {
                onNavigate(next);
                setMenuOpen(false);
              }}
            />
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>
    </div>
  );
}