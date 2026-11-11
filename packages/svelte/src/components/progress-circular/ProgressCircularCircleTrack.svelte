<script lang="ts">
  import { ProgressCircleTrack, type ProgressCircleTrackProps } from '@ark-ui/svelte/progress';
  import { clsx } from 'clsx';
  import styles from './ProgressCircular.module.css';

  let { class: className, ref = $bindable(null), ...props }: ProgressCircleTrackProps = $props();
</script>

<ProgressCircleTrack
  {...props}
  bind:ref
  class={clsx(styles.circleTrack, className)}
  data-slot="progress-circular-circle-track"
/>