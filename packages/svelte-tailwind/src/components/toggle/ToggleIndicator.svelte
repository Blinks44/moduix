<script lang="ts">
  import { ToggleIndicator, type ToggleIndicatorProps } from '@ark-ui/svelte/toggle';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ToggleIndicatorProps = $props();
</script>

<ToggleIndicator
  {...props}
  bind:ref
  class={cn(
    `inline-flex items-center justify-center [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4`,
    className,
  )}
  data-slot="toggle-indicator"
/>