import { Field, FieldErrorText, FieldHelperText } from '@moduix/solid/field';
import { PinInput, PinInputLabel, PinInputControl, PinInputInputs } from '@moduix/solid/pin-input';
import styles from '@/components/examples/pin-input/pin-input-field.module.css';

export default function FieldPinInput() {
  return (
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
  );
}
