<script lang="ts">
  import { ProgressRange, type ProgressRangeProps } from '@ark-ui/svelte/progress';
  import { clsx } from 'clsx';
  import styles from './ProgressLinear.module.css';

  let { class: className, ref = $bindable(null), ...props }: ProgressRangeProps = $props();
</script>

<ProgressRange
  {...props}
  bind:ref
  class={clsx(styles.range, className)}
  data-slot="progress-linear-range"
/>