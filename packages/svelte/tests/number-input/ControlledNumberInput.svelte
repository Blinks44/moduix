<script lang="ts">
  import { NumberInput, NumberInputField, NumberInputLabel } from '@/components/number-input';

  let {
    focusChanges,
    valueChanges,
  }: {
    focusChanges: Array<{ focused: boolean }>;
    valueChanges: Array<{ value: string; valueAsNumber: number }>;
  } = $props();
  let value = $state('2');
</script>

<NumberInput
  bind:value
  onValueChange={(details) => valueChanges.push(details)}
  onFocusChange={(details) => focusChanges.push(details)}
>
  <NumberInputLabel>Amount</NumberInputLabel>
  <NumberInputField />
</NumberInput>
<output>{value}</output>