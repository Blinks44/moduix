<script lang="ts">
  import {
    NumberInput,
    NumberInputControl,
    NumberInputDecrementTrigger,
    NumberInputIncrementTrigger,
    NumberInputInput,
    NumberInputLabel,
  } from '@/components/number-input';
</script>

<NumberInput class="consumer-root">
  <NumberInputLabel class="consumer-label">Amount</NumberInputLabel>
  <NumberInputControl class="consumer-control">
    <NumberInputDecrementTrigger class="consumer-decrement" />
    <NumberInputInput class="consumer-input" />
    <NumberInputIncrementTrigger class="consumer-increment" />
  </NumberInputControl>
</NumberInput>