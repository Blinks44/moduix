<script module lang="ts">
  import type { SplitterPanelProps } from '@ark-ui/svelte/splitter';

  export interface SidebarInsetProps extends Omit<SplitterPanelProps, 'id'> {}
</script>

<script lang="ts">
  import { SplitterPanel } from '@ark-ui/svelte/splitter';
  import { cn } from '@/lib/moduix/cn';
  import { useSidebarConfig } from './context';

  let { class: className, ref = $bindable(null), ...props }: SidebarInsetProps = $props();

  const { side } = useSidebarConfig();
</script>

<SplitterPanel
  {...props}
  bind:ref
  id="content"
  class={cn(
    'relative min-w-0 overflow-auto bg-background text-foreground data-dragging:select-none',
    className,
  )}
  data-side={side()}
  data-slot="sidebar-inset"
/>