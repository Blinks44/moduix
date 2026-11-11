<script lang="ts">
  import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/svelte/number-input';
</script>

<NumberInput
  min={0}
  step={50}
  defaultValue="1250"
  formatOptions={{
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }}
>
  <NumberInputLabel>Price</NumberInputLabel>
  <NumberInputField />
</NumberInput>