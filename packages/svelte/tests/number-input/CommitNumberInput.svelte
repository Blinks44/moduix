<script lang="ts">
  import {
    NumberInputField,
    NumberInputLabel,
    NumberInputRootProvider,
    useNumberInput,
  } from '@/components/number-input';

  let { commits }: { commits: Array<{ value: string; valueAsNumber: number }> } = $props();
  const numberInput = useNumberInput({
    id: 'amount',
    defaultValue: '2',
    onValueCommit: (details) => commits.push(details),
  });
</script>

<NumberInputRootProvider value={numberInput}>
  <NumberInputLabel>Amount</NumberInputLabel>
  <NumberInputField />
</NumberInputRootProvider>
<button type="button">After input</button>