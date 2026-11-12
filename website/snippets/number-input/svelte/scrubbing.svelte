<script lang="ts">
  import {
    NumberInput,
    NumberInputField,
    NumberInputLabel,
    NumberInputScrubber,
  } from '@moduix/svelte/number-input';
  import { Stack } from '@moduix/svelte/stack';

  let value = $state('250');
</script>

<Stack align="center">
  <NumberInput bind:value>
    <NumberInputLabel>Adjust value</NumberInputLabel>
    <NumberInputScrubber>Drag left or right to adjust</NumberInputScrubber>
    <NumberInputField />
  </NumberInput>
  <div data-preview-meta>
    <output>Value: {value}</output>
  </div>
</Stack>