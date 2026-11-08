<script lang="ts">
  import { ProgressCircleRange, type ProgressCircleRangeProps } from '@ark-ui/svelte/progress';
  import { clsx } from 'clsx';
  import styles from './ProgressCircular.module.css';

  let { class: className, ref = $bindable(null), ...props }: ProgressCircleRangeProps = $props();
</script>

<ProgressCircleRange
  {...props}
  bind:ref
  class={clsx(styles.circleRange, className)}
  data-slot="progress-circular-circle-range"
/>