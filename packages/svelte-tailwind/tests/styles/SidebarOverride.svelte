<script lang="ts">
  import {
    Sidebar,
    SidebarInset,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTrigger,
  } from '@/components/sidebar';
</script>

<Sidebar class="h-64 bg-muted">
  <SidebarPanel class="p-6">
    <SidebarNavigationList>
      <SidebarNavigationItem>
        <SidebarNavigationButton class="p-6">Overview</SidebarNavigationButton>
      </SidebarNavigationItem>
    </SidebarNavigationList>
  </SidebarPanel>
  <SidebarResizeTrigger class="w-2 min-w-2" />
  <SidebarTrigger class="size-8" />
  <SidebarInset />
</Sidebar>