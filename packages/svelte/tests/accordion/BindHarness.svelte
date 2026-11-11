<script lang="ts">
  import TestAccordion from './TestAccordion.svelte';

  let { details }: { details: string[][] } = $props();
  let value = $state(['first']);
</script>

<TestAccordion bind:value onValueChange={(event) => details.push(event.value)} />
<output>Open items: {value.join(', ')}</output>