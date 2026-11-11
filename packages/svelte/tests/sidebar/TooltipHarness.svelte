<script lang="ts">
  import {
    Sidebar,
    SidebarInset,
    SidebarNavigationButton,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTooltip,
    SidebarTrigger,
  } from '@/components/sidebar';

  let { portalled }: { portalled: boolean } = $props();
  let portal: HTMLElement | null = $state(null);
  let content = $state('Initial overview');

  export const getPortal = () => portal;
  export const setContent = (value: string) => (content = value);
</script>

<div
  bind:this={portal}
  data-testid="tooltip-target"
  style="--moduix-popover: rgb(11, 22, 33)"
></div>
<Sidebar style="width: 800px; height: 400px; --moduix-popover: rgb(44, 55, 66)">
  <SidebarPanel>
    <SidebarTooltip
      content={tooltipContent}
      {portalled}
      portalRef={portal ?? undefined}
      openDelay={0}
    >
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

{#snippet tooltipContent()}{content}{/snippet}