<script lang="ts">
  import {
    Sidebar,
    SidebarInset,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTrigger,
  } from '@/components/sidebar';
</script>

<Sidebar style="color: red; height: 24rem">
  <SidebarPanel>Navigation</SidebarPanel>
  <SidebarResizeTrigger />
  <SidebarTrigger />
  <SidebarInset>Content</SidebarInset>
</Sidebar>