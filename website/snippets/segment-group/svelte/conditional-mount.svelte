<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItems,
  } from '@moduix/svelte/segment-group';
  import styles from '@/components/examples/segment-group/segment-group-conditional-mount.module.css';

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

  let visible = $state(true);
</script>

<div class={styles.root}>
  {#if visible}
    <SegmentGroup aria-label="Framework" defaultValue="React">
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworks} />
    </SegmentGroup>
  {/if}
  <div data-preview-meta>
    <output>Segment group: {visible ? 'visible' : 'hidden'}</output>
    <Button type="button" size="sm" onclick={() => (visible = !visible)}>
      {visible ? 'Hide' : 'Show'}
    </Button>
  </div>
</div>