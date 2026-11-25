import { Button } from '@moduix/react-tailwind/button';
import { Drawer, DrawerCloseIcon, DrawerPanel, DrawerTitle } from '@moduix/react-tailwind/drawer';
import { useState, type ReactNode } from 'react';

export type Page = 'Projects' | 'Team' | 'Reports' | 'Settings';

const navItemClass =
  'mb-0.5 block min-h-8 w-full cursor-pointer rounded-lg border border-transparent px-[11px] py-[5px] text-left text-muted-foreground no-underline hover:bg-muted aria-[current=page]:border-border aria-[current=page]:bg-card aria-[current=page]:text-foreground focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring';

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
      <div className="mb-0.5 flex items-center gap-2.5 px-2 pt-1 pb-5">
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          A
        </span>
        <div>
          <strong className="block text-sm font-semibold">{workspace}</strong>
          <span className="block text-xs leading-[17px] text-muted-foreground">
            moduix + React + Tailwind
          </span>
        </div>
      </div>
      <nav aria-label="Workspace">
        <p className="mb-0.5 px-3 py-1 text-xs leading-5 font-semibold text-muted-foreground">
          Workspace
        </p>
        {(['Projects', 'Team', 'Reports', 'Settings'] as const).map((item) => (
          <button
            key={item}
            className={navItemClass}
            aria-current={page === item ? 'page' : undefined}
            onClick={() => onNavigate(item)}
          >
            {item}
          </button>
        ))}
        <p className="mt-5 mb-0.5 px-3 py-1 text-xs leading-5 font-semibold text-muted-foreground">
          Resources
        </p>
        <a className={navItemClass} href="https://moduix.dev/docs/quick-start">
          Documentation
        </a>
        <a className={navItemClass} href="https://moduix.dev/docs/components">
          Components
        </a>
      </nav>
      <div className="mt-auto flex items-center gap-2.5 p-2">
        <span className="inline-grid size-8 shrink-0 place-items-center rounded-full bg-border text-xs text-foreground">
          AL
        </span>
        <div>
          <strong className="block text-sm font-semibold">Ada Lovelace</strong>
          <span className="block text-xs leading-[17px] text-muted-foreground">ada@acme.dev</span>
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
    <div className="min-h-dvh">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-background px-3 py-4 md:flex">
        <Navigation page={page} workspace={workspace} onNavigate={onNavigate} />
      </aside>
      <div className="md:ml-60">
        <header className="flex h-14 items-center justify-between gap-3 border-b border-border px-4 md:pr-6 md:pl-8">
          <Button
            className="inline-flex md:hidden"
            variant="ghost"
            size="icon-md"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
          >
            <span className="inline-block size-4 bg-current mask-[url('/icons/menu.svg')] mask-contain mask-center mask-no-repeat" />
          </Button>
          <nav
            aria-label="Breadcrumb"
            className="mr-auto flex items-center gap-2 text-muted-foreground md:mr-0"
          >
            <span>Workspace</span>
            <span>/</span>
            <strong className="font-medium text-foreground">{page}</strong>
          </nav>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon-md"
              aria-label="Toggle color scheme"
              onClick={toggleTheme}
            >
              <span className="inline-block size-4 bg-current mask-[url('/icons/sun.svg')] mask-contain mask-center mask-no-repeat" />
            </Button>
            <a
              className="grid size-9 place-items-center rounded-lg hover:bg-muted focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
              aria-label="GitHub"
              href="https://github.com/Blinks44/moduix"
            >
              <span className="inline-block size-4 bg-current mask-[url('/icons/github.svg')] mask-contain mask-center mask-no-repeat" />
            </a>
          </div>
        </header>
        <main className="grid gap-5 px-4 py-6 md:p-8">{children}</main>
      </div>
      <Drawer
        open={menuOpen}
        onOpenChange={(details) => setMenuOpen(details.open)}
        swipeDirection="start"
      >
        <DrawerPanel className="bg-background [--_drawer-width:16.25rem] data-[swipe-direction=left]:px-3 data-[swipe-direction=left]:py-4">
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
        </DrawerPanel>
      </Drawer>
    </div>
  );
}