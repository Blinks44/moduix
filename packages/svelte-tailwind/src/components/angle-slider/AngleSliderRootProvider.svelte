<script lang="ts">
  import {
    AngleSliderRootProvider,
    type AngleSliderRootProviderProps,
  } from '@ark-ui/svelte/angle-slider';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: AngleSliderRootProviderProps = $props();
</script>

<AngleSliderRootProvider
  {...props}
  bind:ref
  class={cn(
    'inline-flex min-w-0 flex-col items-center gap-3 text-foreground data-disabled:opacity-disabled',
    className,
  )}
  data-slot="angle-slider-root-provider"
/>