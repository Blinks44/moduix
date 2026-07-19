/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, SignaturePad } from '@moduix/react';

const signatureName = 'signature';

export function FieldSignaturePadDemo() {
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

//#endregion