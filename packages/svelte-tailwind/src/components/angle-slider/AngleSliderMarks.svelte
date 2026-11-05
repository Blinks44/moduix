<script module lang="ts">
  import type { AngleSliderMarkerGroupProps } from '@ark-ui/svelte/angle-slider';

  export interface AngleSliderMarksProps extends Omit<
    AngleSliderMarkerGroupProps,
    'asChild' | 'children'
  > {
    values: readonly number[];
  }
</script>

<script lang="ts">
  import AngleSliderMarker from './AngleSliderMarker.svelte';
  import AngleSliderMarkerGroup from './AngleSliderMarkerGroup.svelte';

  let { ref = $bindable(null), values, ...props }: AngleSliderMarksProps = $props();
</script>

<AngleSliderMarkerGroup {...props} bind:ref>
  {#each values as value, index (`${value}-${index}`)}
    <AngleSliderMarker {value} />
  {/each}
</AngleSliderMarkerGroup>