<script lang="ts">
  import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/svelte/number-input';
  import { Stack } from '@moduix/svelte/stack';
</script>

<Stack align="flex-start" gap="0.75rem">
  <NumberInput defaultValue="4" disabled>
    <NumberInputLabel>Disabled quantity</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
  <NumberInput defaultValue="8" readOnly>
    <NumberInputLabel>Read-only quantity</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
</Stack>