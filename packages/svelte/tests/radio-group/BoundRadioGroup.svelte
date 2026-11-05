<script lang="ts">
  import { RadioGroup, RadioGroupLabel } from '@/components/radio-group';
  import RadioOptions from './RadioOptions.svelte';

  let { details }: { details: Array<string | null> } = $props();
  let value: string | null = $state('React');
</script>

<RadioGroup bind:value onValueChange={(event) => details.push(event.value)}>
  <RadioGroupLabel>Framework</RadioGroupLabel>
  <RadioOptions />
</RadioGroup>
<output>Current value: {value}</output>