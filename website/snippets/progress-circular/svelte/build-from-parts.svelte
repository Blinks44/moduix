<script lang="ts">
  import {
    ProgressCircular,
    ProgressCircularCircle,
    ProgressCircularCircleRange,
    ProgressCircularCircleTrack,
    ProgressCircularLabel,
    ProgressCircularValueText,
  } from '@moduix/svelte/progress-circular';
  import styles from '@/components/examples/progress-circular/component-basic.module.css';
</script>

<ProgressCircular defaultValue={42}>
  <ProgressCircularLabel>Export data</ProgressCircularLabel>
  <div class={styles.circleContainer}>
    <ProgressCircularCircle aria-label="Export data">
      <ProgressCircularCircleTrack />
      <ProgressCircularCircleRange />
    </ProgressCircularCircle>
    <ProgressCircularValueText />
  </div>
</ProgressCircular>