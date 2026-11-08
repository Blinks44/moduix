<script lang="ts">
  import TestSteps from './TestSteps.svelte';

  let { changes }: { changes: number[] } = $props();
  let step = $state(0);
</script>

<TestSteps bind:step onStepChange={(details) => changes.push(details.step)} />
<output data-step={step}>Current step: {step + 1}</output>