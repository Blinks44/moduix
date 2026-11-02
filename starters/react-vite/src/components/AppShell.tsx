import { Button } from '@moduix/react/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseIcon,
  DrawerContent,
  DrawerPositioner,
  DrawerTitle,
} from '@moduix/react/drawer';
import { useState, type ReactNode } from 'react';
import { portalRef } from '../portal';

export type Page = 'Projects' | 'Team' | 'Reports' | 'Settings';

function Navigation({
  page,
  workspace,
  onNavigate,
}: {
  page: Page;
  workspace: string;
  onNavigate: (page: Page) => void;
}) {
  return (
    <>
      <div className="brand">
        <span className="brand-mark">A</span>
        <div>
          <strong>{workspace}</strong>
          <span>moduix + React</span>
        </div>
      </div>
      <nav aria-label="Workspace">
        <p className="nav-heading">Workspace</p>
        {(['Projects', 'Team', 'Reports', 'Settings'] as const).map((item) => (
          <button
            key={item}
            className="nav-item"
            aria-current={page === item ? 'page' : undefined}
            onClick={() => onNavigate(item)}
          >
            {item}
          </button>
        ))}
        <p className="nav-heading resources">Resources</p>
        <a className="nav-item" href="https://moduix.dev/docs/quick-start">
          Documentation
        </a>
        <a className="nav-item" href="https://moduix.dev/docs/components">
          Components
        </a>
      </nav>
      <div className="user">
        <span className="avatar">AL</span>
        <div>
          <strong>Ada Lovelace</strong>
          <span>ada@acme.dev</span>
        </div>
      </div>
    </>
  );
}

export default function AppShell({
  page,
  workspace,
  onNavigate,
  children,
}: {
  page: Page;
  workspace: string;
  onNavigate: (page: Page) => void;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleTheme = () => {
    const root = document.documentElement;
    root.dataset.moduixColorScheme =
      getComputedStyle(root).colorScheme === 'dark' ? 'light' : 'dark';
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Navigation page={page} workspace={workspace} onNavigate={onNavigate} />
      </aside>
      <div className="app-inset">
        <header className="topbar">
          <Button
            className="mobile-menu"
            variant="ghost"
            size="icon-md"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            <span className="icon icon-menu" />
          </Button>
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <span>Workspace</span>
            <span>/</span>
            <strong>{page}</strong>
          </nav>
          <div className="topbar-actions">
            <Button
              variant="ghost"
              size="icon-md"
              aria-label="Toggle color scheme"
              onClick={toggleTheme}
            >
              <span className="icon icon-sun" />
            </Button>
            <a className="icon-link" aria-label="GitHub" href="https://github.com/Blinks44/moduix">
              <span className="icon icon-github" />
            </a>
          </div>
        </header>
        <main>{children}</main>
      </div>
      <Drawer
        open={menuOpen}
        onOpenChange={(details) => setMenuOpen(details.open)}
        swipeDirection="start"
        portalRef={portalRef}
      >
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent className="mobile-sidebar">
            <DrawerTitle className="sr-only">Workspace navigation</DrawerTitle>
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