<script lang="ts">
  import TestCollapsible from './TestCollapsible.svelte';

  let { details }: { details: boolean[] } = $props();
  let open = $state(false);
</script>

<TestCollapsible bind:open onOpenChange={(event) => details.push(event.open)} />
<output>Open: {open}</output>