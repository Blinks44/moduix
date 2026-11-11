<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '@/components/button';
  import {
    Sidebar,
    SidebarInset,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTrigger,
  } from '@/components/sidebar';
  import styles from './Sidebar.stories.module.css';
  import SidebarNavigation from './SidebarNavigation.svelte';

  const persistedSidebarStorageKey = 'moduix-storybook-sidebar-size';
  const defaultPersistedSidebarSize = ['16rem'];

  const readPersistedSidebarSize = (): string[] | null => {
    const stored = window.localStorage.getItem(persistedSidebarStorageKey);
    if (!stored) return null;

    const nextSize = stored.split('|').filter(Boolean);
    return nextSize.length > 0 ? nextSize : null;
  };

  let size = $state<(number | string)[]>(defaultPersistedSidebarSize);

  onMount(() => {
    const persistedSize = readPersistedSidebarSize();
    if (persistedSize) size = persistedSize;
  });

  const persistSize = (details: { size: (number | string)[] }) => {
    window.localStorage.setItem(persistedSidebarStorageKey, details.size.join('|'));
  };

  const resetSize = () => {
    window.localStorage.removeItem(persistedSidebarStorageKey);
    size = [...defaultPersistedSidebarSize];
  };
</script>

<Sidebar bind:size class={styles.demo} onResizeEnd={persistSize}>
  <SidebarPanel><SidebarNavigation /></SidebarPanel>
  <SidebarResizeTrigger />
  <SidebarTrigger />
  <SidebarInset>
    <div class={styles.topbar}>
      <strong>Dashboard</strong>
      <Button variant="outline" size="sm" onclick={resetSize}>Reset saved width</Button>
    </div>
    <main class={styles.main}>
      <h2>Persisted width</h2>
      <p>Resize the sidebar and reload Storybook to restore the last desktop width.</p>
      <p>Saved width: {size[0] ?? '16rem'}</p>
      <div class={styles.placeholder}></div>
    </main>
  </SidebarInset>
</Sidebar>