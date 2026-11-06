<script lang="ts">
  import { TourDescription, type TourDescriptionProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TourDescriptionProps = $props();
</script>

<TourDescription
  {...props}
  bind:ref
  class={cn('text-sm text-muted-foreground', className)}
  data-slot="tour-description"
/>