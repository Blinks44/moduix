/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, SignaturePad, useSignaturePadContext } from '@moduix/react';

const signatureName = 'signature';

function SignaturePadHiddenValue() {
  const signaturePad = useSignaturePadContext();
  return <SignaturePad.HiddenInput value={signaturePad.paths.join(' ')} />;
}

export function FieldSignaturePadDemo() {
  return (
    <Field className="signature-pad-field" invalid required>
      <SignaturePad name={signatureName}>
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
        <SignaturePadHiddenValue />
      </SignaturePad>
      <Field.HelperText>Use pointer or touch input to add a signature.</Field.HelperText>
      <Field.ErrorText>Signature is required.</Field.ErrorText>
    </Field>
  );
}

//#endregion