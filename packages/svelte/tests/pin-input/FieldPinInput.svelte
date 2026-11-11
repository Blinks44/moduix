<script lang="ts">
  import { Field, FieldErrorText } from '@/components/field';
  import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@/components/pin-input';
</script>

<Field disabled invalid readOnly>
  <PinInput count={4}>
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl><PinInputInputs /></PinInputControl>
  </PinInput>
  <FieldErrorText>Enter a valid code.</FieldErrorText>
</Field>