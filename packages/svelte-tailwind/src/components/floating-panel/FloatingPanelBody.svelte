<script lang="ts">
  import { FloatingPanelBody, type FloatingPanelBodyProps } from '@ark-ui/svelte/floating-panel';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelBodyProps = $props();
</script>

<FloatingPanelBody
  {...props}
  bind:ref
  class={cn('min-h-0 flex-auto overflow-auto p-4 text-sm', className)}
  data-slot="floating-panel-body"
/>