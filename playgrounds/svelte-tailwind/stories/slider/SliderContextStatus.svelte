<script lang="ts">
  const headerClass = 'flex items-center justify-between gap-3';
  const valueClass = 'text-sm leading-5 text-muted-foreground';

  import { SliderLabel, useSliderContext } from '@/components/slider';

  const slider = useSliderContext();
</script>

<div class={headerClass}>
  <SliderLabel>Dragging: {String(slider().dragging)}</SliderLabel>
  <span class={valueClass}>{slider().value.join(', ')}</span>
</div>