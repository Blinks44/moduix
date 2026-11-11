<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@moduix/svelte/segment-group';
  import styles from '@/components/examples/segment-group/segment-group-vertical-orientation.module.css';

  const views = ['List', 'Board', 'Calendar'];
</script>

<SegmentGroup class={styles.root} aria-label="View" defaultValue="List" orientation="vertical">
  <SegmentGroupIndicator />
  <SegmentGroupItems items={views} />
</SegmentGroup>