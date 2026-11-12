<script lang="ts">
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@moduix/svelte/segment-group';
  import styles from '@/components/examples/segment-group/segment-group-controlled.module.css';

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

  let value = $state<string | null>('React');
</script>

<div class={styles.root}>
  <SegmentGroup bind:value aria-label="Framework">
    <SegmentGroupIndicator />
    <SegmentGroupItems items={frameworks} />
  </SegmentGroup>
  <div data-preview-meta>
    <output>Selected: {value ?? 'none'}</output>
  </div>
</div>