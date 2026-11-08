<script lang="ts">
  import { Field, FieldErrorText, FieldHelperText } from '@moduix/svelte/field';
  import {
    PinInput,
    PinInputControl,
    PinInputInputs,
    PinInputLabel,
  } from '@moduix/svelte/pin-input';
  import styles from '@/components/examples/pin-input/pin-input-field.module.css';
</script>

<Field class={styles.root} invalid required>
  <PinInput count={6}>
    <PinInputLabel>Verification code</PinInputLabel>
    <PinInputControl>
      <PinInputInputs />
    </PinInputControl>
  </PinInput>
  <FieldHelperText>Additional info</FieldHelperText>
  <FieldErrorText>Please enter the verification code.</FieldErrorText>
</Field>