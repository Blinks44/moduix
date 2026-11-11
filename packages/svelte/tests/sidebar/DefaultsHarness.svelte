<script lang="ts">
  import {
    Sidebar,
    SidebarInset,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTrigger,
  } from '@/components/sidebar';
  import Constraints from './Constraints.svelte';
</script>

<Sidebar panelId="navigation" data-testid="sidebar">
  <SidebarPanel data-testid="panel">
    <Constraints />
  </SidebarPanel>
  <SidebarResizeTrigger data-testid="resize" />
  <SidebarTrigger />
  <SidebarInset data-testid="inset">Content</SidebarInset>
</Sidebar>