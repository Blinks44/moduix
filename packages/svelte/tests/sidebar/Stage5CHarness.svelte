<script lang="ts">
  import {
    Sidebar,
    SidebarInset,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTrigger,
  } from '@/index';
  import Constraints from './Constraints.svelte';

  let { mode = 'sizes' }: { mode?: 'sizes' | 'mobile' } = $props();
</script>

{#if mode === 'sizes'}
  <Sidebar panelId="navigation" minSize="5rem" maxSize="24rem" collapsedSize="4rem">
    <SidebarPanel><Constraints /></SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarInset />
  </Sidebar>
{:else}
  <Sidebar mobileBreakpoint={9999}>
    <SidebarPanel>
      <button type="button">Mobile nav link</button>
    </SidebarPanel>
    <SidebarResizeTrigger data-testid="mobile-resize" />
    <SidebarTrigger />
    <SidebarInset>Main content</SidebarInset>
  </Sidebar>
{/if}