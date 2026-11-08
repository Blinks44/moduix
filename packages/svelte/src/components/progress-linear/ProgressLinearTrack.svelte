<script lang="ts">
  import { ProgressTrack, type ProgressTrackProps } from '@ark-ui/svelte/progress';
  import { clsx } from 'clsx';
  import styles from './ProgressLinear.module.css';

  let { class: className, ref = $bindable(null), ...props }: ProgressTrackProps = $props();
</script>

<ProgressTrack
  {...props}
  bind:ref
  class={clsx(styles.track, className)}
  data-slot="progress-linear-track"
/>