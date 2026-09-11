import { Field } from '@moduix/solid/field';
import { PinInput } from '@moduix/solid/pin-input';
import styles from '@/components/examples/pin-input/pin-input-field.module.css';

export default function FieldPinInput() {
  return (
    <Field class={styles.root} invalid required>
      <PinInput count={6}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInput.Inputs />
        </PinInput.Control>
      </PinInput>
      <Field.HelperText>Additional info</Field.HelperText>
      <Field.ErrorText>Please enter the verification code.</Field.ErrorText>
    </Field>
  );
}