<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    NumberInputField,
    NumberInputLabel,
    NumberInputRootProvider,
    useNumberInput,
  } from '@moduix/svelte/number-input';
  import { Stack } from '@moduix/svelte/stack';

  const id = $props.id();
  const numberInput = useNumberInput({
    id,
    defaultValue: '3',
    min: 1,
    max: 10,
  });
</script>

<Stack align="center">
  <NumberInputRootProvider value={numberInput}>
    <NumberInputLabel>Guests</NumberInputLabel>
    <NumberInputField />
  </NumberInputRootProvider>
  <output>Value: {numberInput().value}</output>
  <Button type="button" size="sm" variant="outline" onclick={() => numberInput().setToMin()}>
    Min
  </Button>
  <Button type="button" size="sm" variant="outline" onclick={() => numberInput().setToMax()}>
    Max
  </Button>
</Stack>