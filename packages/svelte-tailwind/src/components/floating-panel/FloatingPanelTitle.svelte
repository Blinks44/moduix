<script lang="ts">
  import { FloatingPanelTitle, type FloatingPanelTitleProps } from '@ark-ui/svelte/floating-panel';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FloatingPanelTitleProps = $props();
</script>

<FloatingPanelTitle
  {...props}
  bind:ref
  class={cn('inline-flex min-w-0 items-center gap-2 text-sm font-semibold', className)}
  data-slot="floating-panel-title"
/>