<script lang="ts">
  import {
    AngleSliderValueText,
    useAngleSliderContext,
    type AngleSliderValueTextProps,
  } from '@ark-ui/svelte/angle-slider';
  import { clsx } from 'clsx';
  import styles from './AngleSlider.module.css';

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
  class={clsx(styles.valueText, className)}
  data-slot="angle-slider-value-text"
>
  {#if children}
    {@render children()}
  {:else}
    {angleSlider().value}°
  {/if}
</AngleSliderValueText>