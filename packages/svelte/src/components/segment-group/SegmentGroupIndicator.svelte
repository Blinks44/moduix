<script lang="ts">
  import {
    SegmentGroupIndicator,
    type SegmentGroupIndicatorProps,
  } from '@ark-ui/svelte/segment-group';
  import { clsx } from 'clsx';
  import styles from './SegmentGroup.module.css';

  let { class: className, ref = $bindable(null), ...props }: SegmentGroupIndicatorProps = $props();
</script>

<SegmentGroupIndicator
  {...props}
  bind:ref
  class={clsx(styles.indicator, className)}
  data-slot="segment-group-indicator"
/>