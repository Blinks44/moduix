<script lang="ts">
  import FruitSelect from './FruitSelect.svelte';

  let { details }: { details: string[][] } = $props();
  let value: string[] = $state([]);
</script>

<FruitSelect bind:value defaultOpen={false} onValueChange={(event) => details.push(event.value)} />
<output>Value: {value.join(', ')}</output>