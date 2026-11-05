<script lang="ts">
  import { SliderControl, type SliderControlProps } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SliderControlProps = $props();
</script>

<SliderControl
  {...props}
  bind:ref
  class={cn(
    'col-span-full flex min-h-5 cursor-pointer items-center group-data-readonly:cursor-default group-data-[orientation=vertical]:[grid-area:control] data-disabled:cursor-default data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-0 data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col',
    className,
  )}
  data-slot="slider-control"
/>