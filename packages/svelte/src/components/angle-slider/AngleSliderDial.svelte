<script lang="ts">
  import type { AngleSliderControlProps } from '@ark-ui/svelte/angle-slider';
  import AngleSliderControl from './AngleSliderControl.svelte';
  import AngleSliderThumb from './AngleSliderThumb.svelte';
  import AngleSliderValueText from './AngleSliderValueText.svelte';

  let {
    children,
    ref = $bindable(null),
    ...props
  }: Omit<AngleSliderControlProps, 'asChild'> = $props();
</script>

<AngleSliderControl {...props} bind:ref>
  {@render children?.()}
  <AngleSliderValueText />
  <AngleSliderThumb />
</AngleSliderControl>