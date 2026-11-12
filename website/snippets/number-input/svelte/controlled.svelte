<script lang="ts">
  import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/svelte/number-input';
  import { Stack } from '@moduix/svelte/stack';

  let value = $state('24');
</script>

<Stack align="center">
  <NumberInput bind:value>
    <NumberInputLabel>Controlled value</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
  <div data-preview-meta>
    <output>Current value: {value || 'empty'}</output>
  </div>
</Stack>