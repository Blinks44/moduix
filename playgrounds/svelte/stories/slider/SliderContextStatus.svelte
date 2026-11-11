<script lang="ts">
  import { SliderLabel, useSliderContext } from '@/components/slider';
  import styles from './Slider.stories.module.css';

  const slider = useSliderContext();
</script>

<div class={styles.header}>
  <SliderLabel>Dragging: {String(slider().dragging)}</SliderLabel>
  <span class={styles.value}>{slider().value.join(', ')}</span>
</div>