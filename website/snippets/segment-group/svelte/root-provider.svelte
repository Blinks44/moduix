<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    SegmentGroupIndicator,
    SegmentGroupItems,
    SegmentGroupRootProvider,
    useSegmentGroup,
  } from '@moduix/svelte/segment-group';
  import styles from '@/components/examples/segment-group/segment-group-root-provider.module.css';

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue'];

  const id = $props.id();
  const segmentGroup = useSegmentGroup({ id, defaultValue: 'React' });
</script>

<div class={styles.root}>
  <SegmentGroupRootProvider aria-label="Framework" value={segmentGroup}>
    <SegmentGroupIndicator />
    <SegmentGroupItems items={frameworks} />
  </SegmentGroupRootProvider>
  <output>Selected: {segmentGroup().value ?? 'none'}</output>
  <Button type="button" size="sm" onclick={() => segmentGroup().setValue('Solid')}>
    Set to Solid
  </Button>
</div>