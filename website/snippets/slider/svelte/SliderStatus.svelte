<script lang="ts">
  import { SliderLabel, useSliderContext } from '@moduix/svelte/slider';

  const slider = useSliderContext();
</script>

<SliderLabel>Value: {slider().value.join(', ')} · Dragging: {String(slider().dragging)}</SliderLabel
>