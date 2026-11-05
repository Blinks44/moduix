<script lang="ts">
  import { SliderRoot, type SliderRootProps } from '@ark-ui/svelte/slider';
  import { cn } from '@/lib/moduix/cn';

  const rootClass =
    "group grid w-full grid-cols-[minmax(0,1fr)_auto] gap-2 data-disabled:opacity-disabled data-[orientation=vertical]:h-48 data-[orientation=vertical]:w-max data-[orientation=vertical]:grid-cols-[auto_max-content] data-[orientation=vertical]:grid-rows-[auto_minmax(0,1fr)] data-[orientation=vertical]:items-center data-[orientation=vertical]:[grid-template-areas:'label_value'_'control_markers']";

  let {
    class: className,
    readOnly,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: SliderRootProps = $props();
</script>

<SliderRoot
  {...props}
  bind:ref
  bind:value
  {readOnly}
  class={cn(rootClass, className)}
  data-readonly={readOnly ? '' : undefined}
  data-slot="slider-root"
/>