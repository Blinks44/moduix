<script lang="ts">
  import { Minus as MinusIcon, Plus as PlusIcon } from '@lucide/svelte';
  import {
    NumberInput,
    NumberInputControl,
    NumberInputDecrementTrigger,
    NumberInputIncrementTrigger,
    NumberInputInput,
    NumberInputLabel,
  } from '@moduix/svelte/number-input';
</script>

<NumberInput defaultValue="100">
  <NumberInputLabel>Amount</NumberInputLabel>
  <NumberInputControl>
    <NumberInputDecrementTrigger>
      <MinusIcon strokeWidth={3} />
    </NumberInputDecrementTrigger>
    <NumberInputInput />
    <NumberInputIncrementTrigger>
      <PlusIcon strokeWidth={3} />
    </NumberInputIncrementTrigger>
  </NumberInputControl>
</NumberInput>