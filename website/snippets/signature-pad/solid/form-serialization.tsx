import { Button } from '@moduix/solid/button';
import {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  useSignaturePadContext,
} from '@moduix/solid/signature-pad';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/signature-pad/signature-pad-form-serialization.module.css';

function SignaturePadFormInput() {
  const signaturePad = useSignaturePadContext();

  return <SignaturePadHiddenInput value={JSON.stringify(signaturePad().paths)} />;
}

export default function FormSerializationSignaturePadDemo() {
  const [submitted, setSubmitted] = createSignal('Nothing submitted');

  const handleSubmit = (event: SubmitEvent & { currentTarget: HTMLFormElement }) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('signature') ?? ''));
  };

  return (
    <form class={styles.root} onSubmit={handleSubmit}>
      <SignaturePad name="signature">
        <SignaturePadLabel>Sign below</SignaturePadLabel>
        <SignaturePadCanvas />
        <SignaturePadFormInput />
      </SignaturePad>
      <div>
        <output>Submitted: {submitted()}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
}