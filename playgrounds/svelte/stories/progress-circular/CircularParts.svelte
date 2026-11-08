<script lang="ts">
  import { ProgressCircularRing, ProgressCircularValueText } from '@/components/progress-circular';
  import styles from './ProgressCircular.stories.module.css';

  let { 'aria-label': ariaLabel }: { 'aria-label': string } = $props();
</script>

<div class={styles.circleContainer}>
  <ProgressCircularRing aria-label={ariaLabel} />
  <ProgressCircularValueText />
</div>