<script lang="ts">
  import { SliderLabel, useSliderContext } from '@/components/slider';

  const slider = useSliderContext();
</script>

<SliderLabel>Hook: {slider().value.join(', ')} / Dragging: {String(slider().dragging)}</SliderLabel>