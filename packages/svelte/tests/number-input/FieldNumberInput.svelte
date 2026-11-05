<script lang="ts">
  import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
  import { NumberInput, NumberInputField, NumberInputLabel } from '@/components/number-input';
</script>

<Field disabled invalid readOnly>
  <NumberInput>
    <NumberInputLabel>Items</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
  <FieldHelperText>Choose a valid amount.</FieldHelperText>
  <FieldErrorText>Value must be in range.</FieldErrorText>
</Field>