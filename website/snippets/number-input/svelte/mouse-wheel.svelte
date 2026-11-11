<script lang="ts">
  import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/svelte/number-input';
</script>

<NumberInput defaultValue="5" allowMouseWheel>
  <NumberInputLabel>Mouse wheel enabled</NumberInputLabel>
  <NumberInputField />
</NumberInput>