<script lang="ts">
  import { TourControl, type TourControlProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TourControlProps = $props();
</script>

<TourControl
  {...props}
  bind:ref
  class={cn('mt-3 flex flex-wrap justify-end gap-2', className)}
  data-slot="tour-control"
/>