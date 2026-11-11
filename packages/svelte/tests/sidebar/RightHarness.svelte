<script lang="ts">
  import {
    Sidebar,
    SidebarInset,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTrigger,
  } from '@/components/sidebar';
</script>

<Sidebar side="right" panelId="inspector">
  <SidebarInset />
  <SidebarTrigger />
  <SidebarResizeTrigger data-testid="resize" />
  <SidebarPanel />
</Sidebar>