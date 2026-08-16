import { Field } from '@moduix/react/field';
import { SignaturePad } from '@moduix/react/signature-pad';

const signatureName = 'signature';

export default function FieldSignaturePadDemo() {
  return (
    <Field className="signature-pad-field" invalid required>
      <SignaturePad name={signatureName}>
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
      </SignaturePad>
      <Field.HelperText>Use pointer or touch input to add a signature.</Field.HelperText>
      <Field.ErrorText>Signature is required.</Field.ErrorText>
    </Field>
  );
}