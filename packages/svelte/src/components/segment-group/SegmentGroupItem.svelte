<script lang="ts">
  import { SegmentGroupItem, type SegmentGroupItemProps } from '@ark-ui/svelte/segment-group';
  import { clsx } from 'clsx';
  import styles from './SegmentGroup.module.css';

  let { class: className, ref = $bindable(null), ...props }: SegmentGroupItemProps = $props();
</script>

<SegmentGroupItem
  {...props}
  bind:ref
  class={clsx(styles.item, className)}
  data-slot="segment-group-item"
/>