import { Field } from '@moduix/react/field';
import { SignaturePad, useSignaturePadContext } from '@moduix/react/signature-pad';
import styles from '@/components/examples/signature-pad/signature-pad-field.module.css';

const signatureName = 'signature';

function SignaturePadFormInput() {
  const signaturePad = useSignaturePadContext();

  return <SignaturePad.HiddenInput value={JSON.stringify(signaturePad.paths)} />;
}

export default function FieldSignaturePadDemo() {
  return (
    <Field className={styles.root} invalid required>
      <SignaturePad name={signatureName}>
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
        <SignaturePadFormInput />
      </SignaturePad>
      <Field.HelperText>Use pointer or touch input to add a signature.</Field.HelperText>
      <Field.ErrorText>Signature is required.</Field.ErrorText>
    </Field>
  );
}