<script lang="ts">
  import { AngleSliderRoot, type AngleSliderRootProps } from '@ark-ui/svelte/angle-slider';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    value = $bindable(),
    ref = $bindable(null),
    ...props
  }: AngleSliderRootProps = $props();
</script>

<AngleSliderRoot
  {...props}
  bind:ref
  bind:value
  class={cn(
    'inline-flex min-w-0 flex-col items-center gap-3 text-foreground data-disabled:opacity-disabled',
    className,
  )}
  data-slot="angle-slider-root"
/>