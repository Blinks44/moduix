<script lang="ts">
  import { RatingGroupControl, type RatingGroupControlProps } from '@ark-ui/svelte/rating-group';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: RatingGroupControlProps = $props();
</script>

<RatingGroupControl
  {...props}
  bind:ref
  class={cn('inline-flex items-center gap-1 data-disabled:opacity-disabled', className)}
  data-slot="rating-group-control"
/>