<script lang="ts">
  import { NumberInput, NumberInputField, NumberInputLabel } from '@/components/number-input';
</script>

<form id="quantity-form"></form>
<NumberInput defaultValue="42" form="quantity-form" name="quantity">
  <NumberInputLabel>Quantity</NumberInputLabel>
  <NumberInputField />
</NumberInput>