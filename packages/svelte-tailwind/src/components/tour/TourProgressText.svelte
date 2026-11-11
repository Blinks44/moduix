<script lang="ts">
  import { TourProgressText, type TourProgressTextProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TourProgressTextProps = $props();
</script>

<TourProgressText
  {...props}
  bind:ref
  class={cn('mt-2 text-xs text-muted-foreground', className)}
  data-slot="tour-progress-text"
/>