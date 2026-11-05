<script lang="ts">
  import {
    AngleSliderValueText,
    useAngleSliderContext,
    type AngleSliderValueTextProps,
  } from '@ark-ui/svelte/angle-slider';
  import { cn } from '@/lib/moduix/cn';

  let {
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: AngleSliderValueTextProps = $props();
  const angleSlider = useAngleSliderContext();
</script>

<AngleSliderValueText
  {...props}
  bind:ref
  class={cn(
    'text-center text-lg font-medium tabular-nums [[data-slot=angle-slider-control]_&]:absolute [[data-slot=angle-slider-control]_&]:inset-0 [[data-slot=angle-slider-control]_&]:z-1 [[data-slot=angle-slider-control]_&]:grid [[data-slot=angle-slider-control]_&]:place-items-center',
    className,
  )}
  data-slot="angle-slider-value-text"
>
  {#if children}
    {@render children()}
  {:else}
    {angleSlider().value}°
  {/if}
</AngleSliderValueText>