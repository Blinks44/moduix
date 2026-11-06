<script lang="ts">
  import { TourProgressText, type TourProgressTextProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import styles from './Tour.module.css';

  let { class: className, ref = $bindable(null), ...props }: TourProgressTextProps = $props();
</script>

<TourProgressText
  {...props}
  bind:ref
  class={clsx(styles.progressText, className)}
  data-slot="tour-progress-text"
/>