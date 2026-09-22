import { Field, FieldErrorText, FieldHelperText } from '@moduix/solid/field';
import {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  useSignaturePadContext,
} from '@moduix/solid/signature-pad';
import styles from '@/components/examples/signature-pad/signature-pad-field.module.css';

const signatureName = 'signature';

function SignaturePadFormInput() {
  const signaturePad = useSignaturePadContext();

  return <SignaturePadHiddenInput value={JSON.stringify(signaturePad().paths)} />;
}

export default function FieldSignaturePadDemo() {
  return (
    <Field class={styles.root} invalid required>
      <SignaturePad name={signatureName}>
        <SignaturePadLabel>Sign below</SignaturePadLabel>
        <SignaturePadCanvas />
        <SignaturePadFormInput />
      </SignaturePad>
      <FieldHelperText>Use pointer or touch input to add a signature.</FieldHelperText>
      <FieldErrorText>Signature is required.</FieldErrorText>
    </Field>
  );
}
