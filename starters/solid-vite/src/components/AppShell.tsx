import { Button } from '@moduix/solid/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseIcon,
  DrawerContent,
  DrawerPositioner,
  DrawerTitle,
} from '@moduix/solid/drawer';
import { createSignal, For } from 'solid-js';
import type { JSX } from 'solid-js';
import { portalRef } from '../portal';

export type Page = 'Projects' | 'Team' | 'Reports' | 'Settings';

function Navigation(props: { page: Page; workspace: string; onNavigate: (page: Page) => void }) {
  return (
    <>
      <div class="brand">
        <span class="brand-mark">A</span>
        <div>
          <strong>{props.workspace}</strong>
          <span>moduix + Solid</span>
        </div>
      </div>
      <nav aria-label="Workspace">
        <p class="nav-heading">Workspace</p>
        <For each={['Projects', 'Team', 'Reports', 'Settings'] as const}>
          {(item) => (
            <button
              class="nav-item"
              aria-current={props.page === item ? 'page' : undefined}
              onClick={() => props.onNavigate(item)}
            >
              {item}
            </button>
          )}
        </For>
        <p class="nav-heading resources">Resources</p>
        <a class="nav-item" href="https://moduix.dev/docs/quick-start">
          Documentation
        </a>
        <a class="nav-item" href="https://moduix.dev/docs/components">
          Components
        </a>
      </nav>
      <div class="user">
        <span class="avatar">AL</span>
        <div>
          <strong>Ada Lovelace</strong>
          <span>ada@acme.dev</span>
        </div>
      </div>
    </>
  );
}

export default function AppShell(props: {
  page: Page;
  workspace: string;
  onNavigate: (page: Page) => void;
  children: JSX.Element;
}) {
  const [menuOpen, setMenuOpen] = createSignal(false);
  const toggleTheme = () => {
    const root = document.documentElement;
    root.dataset.moduixColorScheme =
      getComputedStyle(root).colorScheme === 'dark' ? 'light' : 'dark';
  };
  return (
    <div class="app-shell">
      <aside class="sidebar">
        <Navigation page={props.page} workspace={props.workspace} onNavigate={props.onNavigate} />
      </aside>
      <div class="app-inset">
        <header class="topbar">
          <Button
            class="mobile-menu"
            variant="ghost"
            size="icon-md"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            <span class="icon icon-menu" />
          </Button>
          <nav aria-label="Breadcrumb" class="breadcrumbs">
            <span>Workspace</span>
            <span>/</span>
            <strong>{props.page}</strong>
          </nav>
          <div class="topbar-actions">
            <Button
              variant="ghost"
              size="icon-md"
              aria-label="Toggle color scheme"
              onClick={toggleTheme}
            >
              <span class="icon icon-sun" />
            </Button>
            <a class="icon-link" aria-label="GitHub" href="https://github.com/Blinks44/moduix">
              <span class="icon icon-github" />
            </a>
          </div>
        </header>
        <main>{props.children}</main>
      </div>
      <Drawer
        open={menuOpen()}
        onOpenChange={(details) => setMenuOpen(details.open)}
        swipeDirection="start"
        portalRef={portalRef}
      >
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent class="mobile-sidebar">
            <DrawerTitle class="sr-only">Workspace navigation</DrawerTitle>
            <DrawerCloseIcon />
            <Navigation
              page={props.page}
              workspace={props.workspace}
              onNavigate={(next) => {
                props.onNavigate(next);
                setMenuOpen(false);
              }}
            />
          </DrawerContent>
        </DrawerPositioner>
      </Drawer>
    </div>
  );
}