<script lang="ts">
  import { useSplitterContext } from '@/components/splitter';

  const splitter = useSplitterContext();
  const panel = $derived(splitter().getPanelById('navigation'));
</script>

<output data-testid="constraints">{panel.minSize}:{panel.collapsedSize}</output>