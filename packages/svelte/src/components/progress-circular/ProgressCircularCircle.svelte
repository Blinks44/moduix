<script lang="ts">
  import { ProgressCircle, type ProgressCircleProps } from '@ark-ui/svelte/progress';
  import { clsx } from 'clsx';
  import styles from './ProgressCircular.module.css';

  let { class: className, ref = $bindable(null), ...props }: ProgressCircleProps = $props();
</script>

<ProgressCircle
  {...props}
  bind:ref
  class={clsx(styles.circle, className)}
  data-slot="progress-circular-circle"
/>