<script lang="ts">
  import { Button } from '@moduix/svelte-tailwind/button';
  import {
    Drawer,
    DrawerCloseIcon,
    DrawerPanel,
    DrawerTitle,
  } from '@moduix/svelte-tailwind/drawer';
  import type { Snippet } from 'svelte';
  import type { Page } from '../data';
  import AppNavigation from './AppNavigation.svelte';

  let {
    page,
    workspace,
    onNavigate,
    children,
  }: { page: Page; workspace: string; onNavigate: (page: Page) => void; children: Snippet } =
    $props();
  let menuOpen = $state(false);
  const toggleTheme = () => {
    const root = document.documentElement;
    root.dataset.moduixColorScheme =
      getComputedStyle(root).colorScheme === 'dark' ? 'light' : 'dark';
  };
</script>

<div class="min-h-dvh">
  <aside
    class="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-background px-3 py-4 md:flex"
  >
    <AppNavigation {page} {workspace} {onNavigate} />
  </aside>
  <div class="md:ml-60">
    <header
      class="flex h-14 items-center justify-between gap-3 border-b border-border px-4 md:pr-6 md:pl-8"
    >
      <Button
        class="inline-flex md:hidden"
        variant="ghost"
        size="icon-md"
        aria-label="Open navigation"
        onclick={() => (menuOpen = true)}
      >
        <span
          class="inline-block size-4 bg-current mask-[url('/icons/menu.svg')] mask-contain mask-center mask-no-repeat"
        ></span>
      </Button>
      <nav
        aria-label="Breadcrumb"
        class="mr-auto flex items-center gap-2 text-muted-foreground md:mr-0"
      >
        <span>Workspace</span><span>/</span>
        <strong class="font-medium text-foreground">{page}</strong>
      </nav>
      <div class="flex gap-1">
        <Button
          variant="ghost"
          size="icon-md"
          aria-label="Toggle color scheme"
          onclick={toggleTheme}
        >
          <span
            class="inline-block size-4 bg-current mask-[url('/icons/sun.svg')] mask-contain mask-center mask-no-repeat"
          ></span>
        </Button>
        <a
          class="grid size-9 place-items-center rounded-lg hover:bg-muted focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-ring"
          aria-label="GitHub"
          href="https://github.com/Blinks44/moduix"
        >
          <span
            class="inline-block size-4 bg-current mask-[url('/icons/github.svg')] mask-contain mask-center mask-no-repeat"
          ></span>
        </a>
      </div>
    </header>
    <main class="grid gap-5 px-4 py-6 md:p-8">{@render children()}</main>
  </div>
  <Drawer bind:open={menuOpen} swipeDirection="start">
    <DrawerPanel
      class="bg-background [--_drawer-width:16.25rem] data-[swipe-direction=left]:px-3 data-[swipe-direction=left]:py-4"
    >
      <DrawerTitle class="sr-only">Workspace navigation</DrawerTitle>
      <DrawerCloseIcon />
      <AppNavigation
        {page}
        {workspace}
        onNavigate={(next) => {
          onNavigate(next);
          menuOpen = false;
        }}
      />
    </DrawerPanel>
  </Drawer>
</div>