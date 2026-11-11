<script lang="ts">
  import { FileText as FileTextIcon, Gauge as GaugeIcon } from '@lucide/svelte';
  import { Button } from '@moduix/svelte/button';
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarLabel,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTooltip,
    SidebarTrigger,
    type SidebarRootProps,
  } from '@moduix/svelte/sidebar';
  import { onMount } from 'svelte';
  import styles from '@/components/examples/sidebar/sidebar-persisted-layout.module.css';

  const storageKey = 'my-app-sidebar-size';
  type SidebarSize = NonNullable<SidebarRootProps['size']>;
  const defaultSize: SidebarSize = ['16rem'];
  let size = $state<SidebarSize>(defaultSize);

  const readPersistedSize = (): SidebarSize | null => {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return null;

    const nextSize = stored.split('|').filter(Boolean);
    return nextSize.length > 0 ? nextSize : null;
  };

  onMount(() => {
    const persistedSize = readPersistedSize();
    if (persistedSize) size = persistedSize;
  });

  const handleResizeEnd = (details: { size: SidebarSize }) => {
    window.localStorage.setItem(storageKey, details.size.join('|'));
  };

  const handleReset = () => {
    window.localStorage.removeItem(storageKey);
    size = [...defaultSize];
  };
</script>

<Sidebar class={styles.root} bind:size onResizeEnd={handleResizeEnd}>
  <SidebarPanel>
    <SidebarHeader>
      <strong data-sidebar-icon>M</strong><SidebarLabel>moduix</SidebarLabel>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarTooltip content="Overview">
              {#snippet children(tooltipProps)}
                <SidebarNavigationButton {...tooltipProps()} active>
                  {#snippet asChild(buttonProps)}
                    <a {...buttonProps()} href="/overview">
                      <GaugeIcon /><SidebarLabel>Overview</SidebarLabel>
                    </a>
                  {/snippet}
                </SidebarNavigationButton>
              {/snippet}
            </SidebarTooltip>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarTooltip content="Documents">
              {#snippet children(tooltipProps)}
                <SidebarNavigationButton {...tooltipProps()}>
                  {#snippet asChild(buttonProps)}
                    <a {...buttonProps()} href="/documents">
                      <FileTextIcon /><SidebarLabel>Documents</SidebarLabel>
                    </a>
                  {/snippet}
                </SidebarNavigationButton>
              {/snippet}
            </SidebarTooltip>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
    </SidebarContent>
  </SidebarPanel>
  <SidebarResizeTrigger />
  <SidebarTrigger />
  <SidebarInset>
    <header class={styles.header}>
      Dashboard
      <Button variant="outline" size="sm" onclick={handleReset}>Reset saved width</Button>
    </header>
    <main class={styles.content}>
      <strong>Saved layout</strong>
      <section class={styles.card}>
        Resize the sidebar and reload to restore the saved width.
      </section>
    </main>
  </SidebarInset>
</Sidebar>