<script lang="ts">
  import { TourTitle, type TourTitleProps } from '@ark-ui/svelte/tour';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TourTitleProps = $props();
</script>

<TourTitle
  {...props}
  bind:ref
  class={cn('pe-6 text-md font-semibold', className)}
  data-slot="tour-title"
/>