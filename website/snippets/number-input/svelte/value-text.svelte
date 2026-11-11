<script lang="ts">
  import {
    NumberInput,
    NumberInputField,
    NumberInputLabel,
    NumberInputValueText,
  } from '@moduix/svelte/number-input';
</script>

<NumberInput defaultValue="42">
  <NumberInputLabel>Value preview</NumberInputLabel>
  <NumberInputField />
  <NumberInputValueText />
</NumberInput>