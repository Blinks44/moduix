<script lang="ts">
  import {
    NumberInputField,
    NumberInputLabel,
    NumberInputRootProvider,
    useNumberInput,
  } from '@/components/number-input';
  import RootState from './RootState.svelte';

  // Ark Svelte requires an explicit id for the standalone hook.
  const numberInput = useNumberInput({ id: 'guests', defaultValue: '3', min: 1, max: 10 });
</script>

<NumberInputRootProvider value={numberInput}>
  <NumberInputLabel>Guests</NumberInputLabel>
  <NumberInputField />
  <RootState />
</NumberInputRootProvider>