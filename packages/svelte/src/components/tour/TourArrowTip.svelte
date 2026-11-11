<script lang="ts">
  import { TourArrowTip, type TourArrowTipProps } from '@ark-ui/svelte/tour';
  import { clsx } from 'clsx';
  import styles from './Tour.module.css';

  let { class: className, ref = $bindable(null), ...props }: TourArrowTipProps = $props();
</script>

<TourArrowTip
  {...props}
  bind:ref
  class={clsx(styles.arrowTip, className)}
  data-slot="tour-arrow-tip"
/>