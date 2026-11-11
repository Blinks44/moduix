<script lang="ts">
  import {
    DateInputSegmentGroup,
    type DateInputSegmentGroupProps,
  } from '@ark-ui/svelte/date-input';
  import { clsx } from 'clsx';
  import styles from './DateInput.module.css';
  let { class: className, ref = $bindable(null), ...props }: DateInputSegmentGroupProps = $props();
</script>

<DateInputSegmentGroup
  {...props}
  bind:ref
  class={clsx(styles.segmentGroup, className)}
  data-slot="date-input-segment-group"
/>