<script lang="ts">
  import type { Snippet } from 'svelte';
  import {
    Sidebar,
    SidebarInset,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTrigger,
    type SidebarPanelProps,
    type SidebarResizeTriggerProps,
    type SidebarRootProps,
    type SidebarTriggerProps,
  } from '@/components/sidebar';

  let {
    children,
    panel = {},
    resize = {},
    root = {},
    trigger = {},
  }: {
    children?: Snippet;
    panel?: SidebarPanelProps;
    resize?: SidebarResizeTriggerProps;
    root?: SidebarRootProps;
    trigger?: SidebarTriggerProps | false;
  } = $props();
</script>

<Sidebar {...root}>
  <SidebarPanel {...panel}>{@render children?.()}</SidebarPanel>
  <SidebarResizeTrigger {...resize} />
  {#if trigger !== false}<SidebarTrigger {...trigger} />{/if}
  <SidebarInset data-testid="inset">Content</SidebarInset>
</Sidebar>