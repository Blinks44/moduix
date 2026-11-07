<script lang="ts">
  import {
    SignaturePadControl,
    SignaturePadRoot,
    SignaturePadSegment,
  } from '@ark-ui/svelte/signature-pad';

  let paths = $state<string[]>([]);
  const committed = $state<string[][]>([]);

  export const getState = () => ({ committed, paths });
  const translations = { clearTrigger: 'Clear signature', control: 'Signature drawing area' };
</script>

<SignaturePadRoot bind:paths {translations} onDrawEnd={(details) => committed.push(details.paths)}>
  <SignaturePadControl style="width: 240px; height: 120px"
    ><SignaturePadSegment /></SignaturePadControl
  >
</SignaturePadRoot>