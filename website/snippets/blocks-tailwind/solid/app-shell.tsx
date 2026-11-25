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

export type AppPage = 'Projects' | 'Team' | 'Reports' | 'Settings';

function Navigation(props: {
  page: AppPage;
  workspace: string;
  onNavigate: (page: AppPage) => void;
}) {
  return (
    <>
      <div class="mb-0.5 flex min-w-0 items-center gap-2.5 px-2 pt-1 pb-5 [&_div>span]:block [&_div>span]:text-xs [&_div>span]:text-muted-foreground [&_strong]:block [&_strong]:text-sm [&_strong]:font-semibold">
        <span class="grid size-control-sm flex-none place-items-center rounded-md bg-primary text-primary-foreground">
          A
        </span>
        <div>
          <strong>{props.workspace}</strong>
          <span>moduix + Solid</span>
        </div>
      </div>
      <nav aria-label="Workspace">
        <p class="m-0 mb-0.5 px-3 py-1 text-xs font-semibold text-muted-foreground">Workspace</p>
        <For each={['Projects', 'Team', 'Reports', 'Settings'] as const}>
          {(item) => (
            <button
              type="button"
              class="mb-0.5 block min-h-control-sm w-full cursor-pointer rounded-md border border-transparent bg-transparent px-[0.6875rem] py-[0.3125rem] text-start text-muted-foreground no-underline hover:bg-muted focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring aria-[current=page]:border-border aria-[current=page]:bg-card aria-[current=page]:text-foreground"
              aria-current={props.page === item ? 'page' : undefined}
              onClick={() => props.onNavigate(item)}
            >
              {item}
            </button>
          )}
        </For>
        <p class="m-0 mt-5 mb-0.5 px-3 py-1 text-xs font-semibold text-muted-foreground">
          Resources
        </p>
        <a
          class="mb-0.5 block min-h-control-sm w-full cursor-pointer rounded-md border border-transparent bg-transparent px-[0.6875rem] py-[0.3125rem] text-start text-muted-foreground no-underline hover:bg-muted focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring aria-[current=page]:border-border aria-[current=page]:bg-card aria-[current=page]:text-foreground"
          href="https://moduix.dev/docs/quick-start"
        >
          Documentation
        </a>
        <a
          class="mb-0.5 block min-h-control-sm w-full cursor-pointer rounded-md border border-transparent bg-transparent px-[0.6875rem] py-[0.3125rem] text-start text-muted-foreground no-underline hover:bg-muted focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring aria-[current=page]:border-border aria-[current=page]:bg-card aria-[current=page]:text-foreground"
          href="https://moduix.dev/docs/components"
        >
          Components
        </a>
      </nav>
      <div class="mt-auto flex items-center gap-2.5 p-2 [&_div>span]:block [&_div>span]:text-xs [&_div>span]:text-muted-foreground [&_strong]:block [&_strong]:text-sm [&_strong]:font-semibold">
        <span class="grid size-control-sm flex-none place-items-center rounded-full bg-border text-xs">
          AL
        </span>
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
    <div
      ref={setRootRef}
      class="@container/app-shell isolate min-h-dvh w-full bg-card font-sans text-sm text-foreground data-[moduix-color-scheme=dark]:[color-scheme:dark] data-[moduix-color-scheme=light]:[color-scheme:light]"
      data-moduix-color-scheme={colorScheme()}
    >
      <Drawer
        open={menuOpen()}
        onOpenChange={(details) => setMenuOpen(details.open)}
        swipeDirection="start"
        portalRef={rootRef}
      >
        <div class="grid min-h-[inherit] grid-cols-[minmax(0,1fr)] @min-[48rem]/app-shell:grid-cols-[15rem_minmax(0,1fr)]">
          <aside class="hidden flex-col border-e border-border bg-background px-3 py-4 @min-[48rem]/app-shell:flex">
            <Navigation
              page={props.page}
              workspace={props.workspace ?? 'Acme Projects'}
              onNavigate={props.onNavigate}
            />
          </aside>
          <div class="min-w-0">
            <header class="flex min-h-14 items-center justify-between gap-3 border-b border-border px-4 py-2.5 @min-[48rem]/app-shell:ps-8 @min-[48rem]/app-shell:pe-6">
              <DrawerTrigger
                asChild={(triggerProps) => (
                  <Button
                    {...triggerProps()}
                    class="inline-flex @min-[48rem]/app-shell:hidden"
                    variant="ghost"
                    size="icon-md"
                    aria-label="Open navigation"
                  >
                    <svg
                      class="size-4"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="2.667" y1="3.333" x2="13.333" y2="3.333" />
                      <line x1="2.667" y1="8" x2="13.333" y2="8" />
                      <line x1="2.667" y1="12.667" x2="13.333" y2="12.667" />
                    </svg>
                  </Button>
                )}
              />
              <nav
                aria-label="Breadcrumb"
                class="me-auto flex flex-wrap items-center gap-2 text-muted-foreground @min-[48rem]/app-shell:me-0 [&_strong]:font-medium [&_strong]:text-foreground"
              >
                <span>Workspace</span>
                <span aria-hidden>/</span>
                <strong aria-current="page">{props.page}</strong>
              </nav>
              <div class="flex gap-1">
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
                  <svg
                    class="size-4"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="2.667" />
                    <line x1="8" y1="1.333" x2="8" y2="2.667" />
                    <line x1="8" y1="13.333" x2="8" y2="14.667" />
                    <line x1="3.287" y1="3.287" x2="4.227" y2="4.227" />
                    <line x1="11.773" y1="11.773" x2="12.713" y2="12.713" />
                    <line x1="1.333" y1="8" x2="2.667" y2="8" />
                    <line x1="13.333" y1="8" x2="14.667" y2="8" />
                    <line x1="4.227" y1="11.773" x2="3.287" y2="12.713" />
                    <line x1="12.713" y1="3.287" x2="11.773" y2="4.227" />
                  </svg>
                </Button>
                <a
                  class="grid size-control-md flex-none place-items-center rounded-md text-inherit hover:bg-muted focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
                  aria-label="GitHub"
                  href="https://github.com/Blinks44/moduix"
                >
                  <svg class="size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 .198C3.58.198 0 3.78 0 8.198c0 3.535 2.292 6.533 5.47 7.59.4.075.547-.172.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.725-.496.056-.486.056-.486.803.056 1.225.824 1.225.824.714 1.223 1.873.87 2.33.665.072-.517.278-.87.507-1.07-1.777-.2-3.644-.888-3.644-3.953 0-.873.31-1.587.823-2.147-.09-.202-.36-1.015.07-2.117 0 0 .67-.215 2.2.82.64-.178 1.32-.266 2-.27.68.004 1.36.092 2 .27 1.52-1.035 2.19-.82 2.19-.82.43 1.102.16 1.915.08 2.117.51.56.82 1.274.82 2.147 0 3.073-1.87 3.75-3.65 3.947.28.24.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.14.46.55.38C13.71 14.728 16 11.728 16 8.198 16 3.78 12.418.198 8 .198Z" />
                  </svg>
                </a>
              </div>
            </header>
            <main class="px-4 py-6 @min-[48rem]/app-shell:p-8">{props.children}</main>
          </div>
        </div>
        <DrawerBackdrop />
        <DrawerPositioner>
          <DrawerContent class="flex w-[min(17rem,100%)] flex-col bg-background px-3 py-4 [&>[data-slot=drawer-close-icon]]:absolute [&>[data-slot=drawer-close-icon]]:end-3 [&>[data-slot=drawer-close-icon]]:top-3">
            <DrawerTitle class="sr-only">Workspace navigation</DrawerTitle>
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