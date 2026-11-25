<script module lang="ts">
  import type { SplitterPanelProps } from '@ark-ui/svelte/splitter';

  export interface SidebarPanelProps extends Omit<SplitterPanelProps, 'id'> {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { SplitterPanel } from '@ark-ui/svelte/splitter';
  import { cn } from '@/lib/moduix/cn';
  import Drawer from '../drawer/Drawer.svelte';
  import DrawerPanel from '../drawer/DrawerPanel.svelte';
  import { useSidebar, useSidebarConfig } from './context';

  let {
    children,
    class: className,
    ref = $bindable(null),
    style,
    ...props
  }: SidebarPanelProps = $props();

  const { panelId } = useSidebarConfig();
  const sidebar = useSidebar();
</script>

{#if sidebar.isMobile}
  <SplitterPanel id={panelId()} hidden style="display: none" />
  <Drawer
    open={sidebar.openMobile}
    onOpenChange={({ open }) => sidebar.setOpenMobile(open)}
    swipeDirection={sidebar.side === 'right' ? 'end' : 'start'}
  >
    <DrawerPanel size="sm" class="p-0">
      <Ark
        as="div"
        {...props}
        bind:ref
        class={cn(
          'group/sidebar-panel @container/sidebar-panel relative flex size-full min-w-0 flex-col overflow-hidden bg-sidebar text-sidebar-foreground',
          className,
        )}
        {style}
        data-mobile=""
        data-side={sidebar.side}
        data-state="expanded"
        data-slot="sidebar-panel"
      >
        {@render children?.()}
      </Ark>
    </DrawerPanel>
  </Drawer>
{:else}
  <SplitterPanel
    {...props}
    bind:ref
    id={panelId()}
    class={cn(
      'group/sidebar-panel @container/sidebar-panel relative flex min-w-0 flex-col overflow-hidden bg-sidebar text-sidebar-foreground data-dragging:select-none',
      className,
    )}
    {style}
    data-side={sidebar.side}
    data-state={sidebar.state}
    data-slot="sidebar-panel"
  >
    {@render children?.()}
  </SplitterPanel>
{/if}