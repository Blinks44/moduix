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

<NumberInput class="w-80 max-w-sm gap-4 text-primary">
  <NumberInputLabel>Amount</NumberInputLabel>
  <NumberInputControl class="gap-4">
    <NumberInputDecrementTrigger class="size-12 min-w-12 rounded-lg bg-muted p-2" />
    <NumberInputInput class="h-12 w-40 rounded-md bg-muted px-0 py-0 text-primary" />
    <NumberInputIncrementTrigger class="size-12 min-w-12 rounded-lg bg-muted p-2" />
  </NumberInputControl>
</NumberInput>