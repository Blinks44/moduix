<script lang="ts">
  import { SliderRootProvider, type SliderRootProviderProps } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  const rootClass =
    "group grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 data-disabled:opacity-disabled data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-cols-[auto_max-content] data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)] data-[orientation=vertical]:items-center data-[orientation=vertical]:[grid-template-areas:'label_value'_'control_markers']";

  let { class: className, ref = $bindable(null), ...props }: SliderRootProviderProps = $props();
</script>

<SliderRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-slot="slider-root-provider"
/>