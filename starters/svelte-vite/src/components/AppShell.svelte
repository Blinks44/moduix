<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Drawer,
    DrawerBackdrop,
    DrawerCloseIcon,
    DrawerContent,
    DrawerPositioner,
    DrawerTitle,
  } from '@moduix/svelte/drawer';
  import type { Snippet } from 'svelte';
  import type { Page } from '../data';
  import { portalRef } from '../portal';
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

<div class="app-shell">
  <aside class="sidebar">
    <AppNavigation {page} {workspace} {onNavigate} />
  </aside>
  <div class="app-inset">
    <header class="topbar">
      <Button
        class="mobile-menu"
        variant="ghost"
        size="icon-md"
        aria-label="Open navigation"
        onclick={() => (menuOpen = true)}><span class="icon icon-menu"></span></Button
      >
      <nav aria-label="Breadcrumb" class="breadcrumbs">
        <span>Workspace</span><span>/</span><strong>{page}</strong>
      </nav>
      <div class="topbar-actions">
        <Button
          variant="ghost"
          size="icon-md"
          aria-label="Toggle color scheme"
          onclick={toggleTheme}><span class="icon icon-sun"></span></Button
        ><a class="icon-link" aria-label="GitHub" href="https://github.com/Blinks44/moduix"
          ><span class="icon icon-github"></span></a
        >
      </div>
    </header>
    <main>{@render children()}</main>
  </div>
  <Drawer bind:open={menuOpen} swipeDirection="start" {portalRef}
    ><DrawerBackdrop /><DrawerPositioner
      ><DrawerContent class="mobile-sidebar"
        ><DrawerTitle class="sr-only">Workspace navigation</DrawerTitle><DrawerCloseIcon
        /><AppNavigation
          {page}
          {workspace}
          onNavigate={(next) => {
            onNavigate(next);
            menuOpen = false;
          }}
        /></DrawerContent
      ></DrawerPositioner
    ></Drawer
  >
</div>