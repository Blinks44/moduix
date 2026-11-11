<script lang="ts">
  import { NumberInput, NumberInputField, NumberInputLabel } from '@/components/number-input';

  let {
    invalidDetails,
  }: { invalidDetails: Array<{ reason: string; value: string; valueAsNumber: number }> } = $props();
</script>

<NumberInput
  min={1}
  max={10}
  clampValueOnBlur={false}
  onValueInvalid={(details) => invalidDetails.push(details)}
>
  <NumberInputLabel>Items</NumberInputLabel>
  <NumberInputField />
</NumberInput>