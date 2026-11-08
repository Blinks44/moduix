<script lang="ts">
  import type { Snippet } from 'svelte';
  import { Button } from '@/components/ui/button';
  import {
    Drawer,
    DrawerBackdrop,
    DrawerCloseIcon,
    DrawerContent,
    DrawerPositioner,
    DrawerTitle,
    DrawerTrigger,
  } from '@/components/ui/drawer';
  import AppShellNavigation from './app-shell-navigation.svelte';
  import type { AppPage } from './app-shell-navigation.svelte';
  import styles from './app-shell.module.css';

  let {
    page,
    workspace = 'Acme Projects',
    onnavigate,
    children,
  }: {
    page: AppPage;
    workspace?: string;
    onnavigate?: (page: AppPage) => void;
    children?: Snippet;
  } = $props();
  let root = $state<HTMLDivElement | null>(null);
  let menuOpen = $state(false);
  let colorScheme = $state<'light' | 'dark'>();

  function toggleColorScheme() {
    if (root) {
      colorScheme = getComputedStyle(root).colorScheme === 'dark' ? 'light' : 'dark';
    }
  }
</script>

<div bind:this={root} class={styles.root} data-moduix-color-scheme={colorScheme}>
  <Drawer bind:open={menuOpen} swipeDirection="start" portalRef={() => root}>
    <div class={styles.layout}>
      <aside class={styles.sidebar}>
        <AppShellNavigation {page} {workspace} {onnavigate} />
      </aside>
      <div class={styles.inset}>
        <header class={styles.topbar}>
          <DrawerTrigger>
            {#snippet asChild(props)}
              <Button
                {...props()}
                class={styles.mobileMenu}
                variant="ghost"
                size="icon-md"
                aria-label="Open navigation"
              >
                <span class={[styles.icon, styles.menuIcon]} aria-hidden="true"></span>
              </Button>
            {/snippet}
          </DrawerTrigger>
          <nav aria-label="Breadcrumb" class={styles.breadcrumbs}>
            <span>Workspace</span><span aria-hidden="true">/</span><strong aria-current="page"
              >{page}</strong
            >
          </nav>
          <div class={styles.actions}>
            <Button
              variant="ghost"
              size="icon-md"
              aria-label="Toggle color scheme"
              onclick={toggleColorScheme}
            >
              <span class={[styles.icon, styles.sunIcon]} aria-hidden="true"></span>
            </Button>
            <a
              class={styles.iconLink}
              aria-label="GitHub"
              href="https://github.com/Blinks44/moduix"
            >
              <span class={[styles.icon, styles.githubIcon]} aria-hidden="true"></span>
            </a>
          </div>
        </header>
        <main class={styles.content}>{@render children?.()}</main>
      </div>
    </div>
    <DrawerBackdrop />
    <DrawerPositioner>
      <DrawerContent class={styles.mobileSidebar}>
        <DrawerTitle class={styles.srOnly}>Workspace navigation</DrawerTitle>
        <DrawerCloseIcon />
        <AppShellNavigation
          {page}
          {workspace}
          onnavigate={(next) => {
            onnavigate?.(next);
            menuOpen = false;
          }}
        />
      </DrawerContent>
    </DrawerPositioner>
  </Drawer>
</div>