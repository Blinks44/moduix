<script lang="ts">
  import { Sidebar, SidebarInset, SidebarPanel, SidebarResizeTrigger } from '@/components/sidebar';

  let rootRef: Element | null = $state(null);
  let panelRef: Element | null = $state(null);
  let resizeRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, panelRef, resizeRef });
</script>

<Sidebar bind:ref={rootRef} data-probe="root">
  <SidebarPanel bind:ref={panelRef}>
    {#snippet asChild(props)}<section {...props()} data-testid="panel-host">
        Navigation
      </section>{/snippet}
  </SidebarPanel>
  <SidebarResizeTrigger bind:ref={resizeRef}>
    {#snippet asChild(props)}<button {...props()} type="button">Resize sidebar</button>{/snippet}
  </SidebarResizeTrigger>
  <SidebarInset />
</Sidebar>