<script lang="ts">
  import TestTabs from './TestTabs.svelte';

  let { details }: { details: string[] } = $props();
  let value = $state('overview');
</script>

<TestTabs bind:value onValueChange={(event) => details.push(event.value)} />
<output>Selected: {value}</output>