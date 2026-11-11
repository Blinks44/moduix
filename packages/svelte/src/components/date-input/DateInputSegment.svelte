<script lang="ts">
  import { DateInputSegment, type DateInputSegmentProps } from '@ark-ui/svelte/date-input';
  import { clsx } from 'clsx';
  import styles from './DateInput.module.css';
  let { class: className, ref = $bindable(null), ...props }: DateInputSegmentProps = $props();
</script>

<DateInputSegment
  {...props}
  bind:ref
  class={clsx(styles.segment, className)}
  data-slot="date-input-segment"
/>