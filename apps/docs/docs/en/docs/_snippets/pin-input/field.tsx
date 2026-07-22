import { Field, PinInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function FieldPinInput() {
  return (
    <PreviewLayout width="content">
      <Field invalid required>
        <PinInput count={6}>
          <PinInput.Label>Verification code</PinInput.Label>
          <PinInput.Control>
            <PinInput.Inputs />
          </PinInput.Control>
        </PinInput>
        <Field.HelperText>Additional info</Field.HelperText>
        <Field.ErrorText>Please enter the verification code.</Field.ErrorText>
      </Field>
    </PreviewLayout>
  );
}