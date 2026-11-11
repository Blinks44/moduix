<script lang="ts">
  import { RatingGroupLabel, type RatingGroupLabelProps } from '@ark-ui/svelte/rating-group';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: RatingGroupLabelProps = $props();
</script>

<RatingGroupLabel
  {...props}
  bind:ref
  class={cn(
    'text-sm leading-5 font-semibold text-foreground select-none data-disabled:opacity-disabled',
    className,
  )}
  data-slot="rating-group-label"
/>