import { Field, PinInput } from '@moduix/react';

export default function FieldPinInput() {
  return (
    <Field className="centered-field-example" invalid required>
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