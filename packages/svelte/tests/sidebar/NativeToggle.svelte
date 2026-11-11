<script lang="ts">
  import { useSplitterContext } from '@ark-ui/svelte/splitter';

  const splitter = useSplitterContext();
</script>

<button type="button" onclick={() => splitter().collapsePanel('sidebar')}>Native collapse</button>
<output>{splitter().getSizes().join(',')}</output>