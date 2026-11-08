<script lang="ts">
  import { SplitterPanel, type SplitterPanelProps } from '@ark-ui/svelte/splitter';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SplitterPanelProps = $props();

  const panelClass = 'p-4 data-dragging:select-none';
</script>

<SplitterPanel {...props} bind:ref class={cn(panelClass, className)} data-slot="splitter-panel" />