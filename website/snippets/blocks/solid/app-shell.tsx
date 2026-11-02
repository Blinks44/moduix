import { createSignal, For, type JSX } from 'solid-js';
import { Button } from '@/registry/solid/ui/button';
import {
  Drawer,
  DrawerBackdrop,
  DrawerCloseIcon,
  DrawerContent,
  DrawerPositioner,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/solid/ui/drawer';
import styles from './app-shell.module.css';

export type AppPage = 'Projects' | 'Team' | 'Reports' | 'Settings';

function Navigation(props: {
  page: AppPage;
  workspace: string;
  onNavigate: (page: AppPage) => void;
}) {
  return (
    <>
      <div class={styles.brand}>
        <span class={styles.brandMark}>A</span>
        <div>
          <strong>{props.workspace}</strong>
          <span>moduix + Solid</span>
        </div>
      </div>
      <nav aria-label="Workspace">
        <p class={styles.navHeading}>Workspace</p>
        <For each={['Projects', 'Team', 'Reports', 'Settings'] as const}>
          {(item) => (
            <button
              type="button"
              class={styles.navItem}
              aria-current={props.page === item ? 'page' : undefined}
              onClick={() => props.onNavigate(item)}
            >
              {item}
            </button>
          )}
        </For>
        <p class={`${styles.navHeading} ${styles.resources}`}>Resources</p>
        <a class={styles.navItem} href="https://moduix.dev/docs/quick-start">
          Documentation
        </a>
        <a class={styles.navItem} href="https://moduix.dev/docs/components">
          Components
        </a>
      </nav>
      <div class={styles.user}>
        <span class={styles.avatar}>AL</span>
        <div>
          <strong>Ada Lovelace</strong>
          <span>ada@acme.dev</span>
        </div>
      </div>
    </>
  );
}

export function AppShell(props: {
  page: AppPage;
  workspace?: string;
  onNavigate: (page: AppPage) => void;
  children: JSX.Element;
}) {
  const [rootRef, setRootRef] = createSignal<HTMLDivElement>();
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [colorScheme, setColorScheme] = createSignal<'light' | 'dark'>();

  return (
    <div ref={setRootRef} class={styles.root} data-moduix-color-scheme={colorScheme()}>
      <Drawer
        open={menuOpen()}
        onOpenChange={(details) => setMenuOpen(details.open)}
        swipeDirection="start"
        portalRef={rootRef}
      >
        <div class={styles.layout}>
          <aside class={styles.sidebar}>
            <Navigation
              page={props.page}
              workspace={props.workspace ?? 'Acme Projects'}
              onNavigate={props.onNavigate}
            />
          </aside>
          <div class={styles.inset}>
            <header class={styles.topbar}>
              <DrawerTrigger
                asChild={(triggerProps) => (
                  <Button
                    {...triggerProps()}
                    class={styles.mobileMenu}
                    variant="ghost"
                    size="icon-md"
                    aria-label="Open navigation"
                  >
                    <span class={`${styles.icon} ${styles.menuIcon}`} aria-hidden />
                  </Button>
                )}
              />
              <nav aria-label="Breadcrumb" class={styles.breadcrumbs}>
                <span>Workspace</span>
                <span aria-hidden>/</span>
                <strong aria-current="page">{props.page}</strong>
              </nav>
              <div class={styles.actions}>
                <Button
                  variant="ghost"
                  size="icon-md"
                  aria-label="Toggle color scheme"
                  onClick={() => {
                    const root = rootRef();
                    if (root)
                      setColorScheme(
                        getComputedStyle(root).colorScheme === 'dark' ? 'light' : 'dark',
                      );
                  }}
                >
                  <span class={`${styles.icon} ${styles.sunIcon}`} aria-hidden />
                </Button>
                <a
                  class={styles.iconLink}
                  aria-label="GitHub"
                  href="https://github.com/Blinks44/moduix"
                >
                  <span class={`${styles.icon} ${styles.githubIcon}`} aria-hidden />
                </a>
              </div>
            </header>
            <main class={styles.content}>{props.children}</main>
          </div>
        </div>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent class={styles.mobileSidebar}>
            <DrawerTitle class={styles.srOnly}>Workspace navigation</DrawerTitle>
            <DrawerCloseIcon />
            <Navigation
              page={props.page}
              workspace={props.workspace ?? 'Acme Projects'}
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