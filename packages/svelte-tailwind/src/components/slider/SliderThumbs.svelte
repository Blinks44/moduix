<script module lang="ts">
  import type { SliderThumbProps } from '@ark-ui/svelte/slider';

  export interface SliderThumbsProps {
    class?: SliderThumbProps['class'];
  }
</script>

<script lang="ts">
  import { SliderHiddenInput, useSliderContext } from '@ark-ui/svelte/slider';
  import SliderThumb from './SliderThumb.svelte';

  let { class: className }: SliderThumbsProps = $props();
  const slider = useSliderContext();
</script>

{#each slider().value as _, index (index)}
  <SliderThumb class={className} {index}>
    <SliderHiddenInput />
  </SliderThumb>
{/each}