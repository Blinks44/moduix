<script lang="ts">
  import { useSegmentGroupItemContext } from '@/components/segment-group';

  const item = useSegmentGroupItemContext();
</script>

<span>{item().checked ? 'checked' : 'unchecked'}</span>