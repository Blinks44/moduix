<script lang="ts">
  import {
    Sidebar,
    SidebarCollapsedContent,
    SidebarExpandedContent,
    SidebarInset,
    SidebarNavigationButton,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTooltip,
    SidebarTrigger,
  } from '@/components/sidebar';

  let { collapsed, resized }: { collapsed: string[]; resized: (number | string)[][] } = $props();
  let size = $state<(number | string)[]>(['16rem']);

  export const getSize = () => size;
</script>

<Sidebar
  style="width: 800px; height: 400px"
  bind:size
  onResize={(details) => resized.push(details.size)}
  onCollapse={(details) => collapsed.push(details.panelId)}
>
  <!-- Inline padding keeps the collapsed width independent of the CSS bundle order of Sidebar and Splitter. -->
  <SidebarPanel data-testid="panel" style="padding: 0">
    <SidebarExpandedContent data-testid="expanded">Expanded</SidebarExpandedContent>
    <SidebarCollapsedContent data-testid="collapsed">Collapsed</SidebarCollapsedContent>
    <SidebarTooltip content="Overview">
      {#snippet children(props)}
        <SidebarNavigationButton {...props()} aria-label="Overview"
          >Overview</SidebarNavigationButton
        >
      {/snippet}
    </SidebarTooltip>
  </SidebarPanel>
  <SidebarResizeTrigger />
  <SidebarTrigger />
  <SidebarInset />
</Sidebar>