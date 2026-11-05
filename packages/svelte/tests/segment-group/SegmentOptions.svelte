<script lang="ts">
  import { SegmentGroupItems } from '@/components/segment-group';

  const items = ['React', 'Solid', 'Svelte', 'Vue'].map((value) => ({ value, label: value }));
</script>

<SegmentGroupItems {items} />