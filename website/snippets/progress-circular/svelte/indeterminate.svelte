<script lang="ts">
  import {
    ProgressCircular,
    ProgressCircularLabel,
    ProgressCircularRing,
    ProgressCircularValueText,
  } from '@moduix/svelte/progress-circular';
  import styles from '@/components/examples/progress-circular/component-indeterminate.module.css';
</script>

<ProgressCircular defaultValue={null}>
  <ProgressCircularLabel>Preparing report</ProgressCircularLabel>
  <div class={styles.circleContainer}>
    <ProgressCircularRing aria-label="Preparing report" />
    <ProgressCircularValueText />
  </div>
</ProgressCircular>