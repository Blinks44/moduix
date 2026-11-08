<script lang="ts">
  import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/svelte/number-input';
</script>

<NumberInput
  defaultValue="12.5"
  step={0.25}
  formatOptions={{
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }}
>
  <NumberInputLabel>Hours</NumberInputLabel>
  <NumberInputField />
</NumberInput>