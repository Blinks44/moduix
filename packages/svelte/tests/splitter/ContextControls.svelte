<script lang="ts">
  import { useSplitterContext } from '@/components/splitter';

  const splitter = useSplitterContext();
</script>

<button type="button" onclick={() => splitter().setSizes([25, 75])}>Set A to 25%</button>