<script module lang="ts">
  import type { SplitterPanelProps } from '@ark-ui/svelte/splitter';

  export interface SidebarPanelProps extends Omit<SplitterPanelProps, 'id'> {}
</script>

<script lang="ts">
  import { SplitterPanel } from '@ark-ui/svelte/splitter';
  import { cn } from '@/lib/moduix/cn';
  import { useSidebar, useSidebarConfig } from './context';

  let { class: className, ref = $bindable(null), ...props }: SidebarPanelProps = $props();

  const { panelId } = useSidebarConfig();
  const sidebar = useSidebar();
</script>

<SplitterPanel
  {...props}
  bind:ref
  id={panelId()}
  class={cn(
    'group/sidebar-panel @container/sidebar-panel relative flex min-w-0 flex-col overflow-hidden bg-sidebar text-sidebar-foreground data-dragging:select-none',
    className,
  )}
  data-side={sidebar.side}
  data-state={sidebar.state}
  data-slot="sidebar-panel"
/>