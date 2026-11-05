<script lang="ts">
  import { SegmentGroupLabel, type SegmentGroupLabelProps } from '@ark-ui/svelte/segment-group';
  import { clsx } from 'clsx';
  import styles from './SegmentGroup.module.css';

  let { class: className, ref = $bindable(null), ...props }: SegmentGroupLabelProps = $props();
</script>

<SegmentGroupLabel
  {...props}
  bind:ref
  class={clsx(styles.label, className)}
  data-slot="segment-group-label"
/>