import { Button } from '@moduix/react/button';
import { SignaturePad, useSignaturePadContext } from '@moduix/react/signature-pad';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/signature-pad/signature-pad-form-serialization.module.css';

function SignaturePadFormInput() {
  const signaturePad = useSignaturePadContext();

  return <SignaturePad.HiddenInput value={JSON.stringify(signaturePad.paths)} />;
}

export default function FormSerializationSignaturePadDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('signature') ?? ''));
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <SignaturePad name="signature">
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
        <SignaturePadFormInput />
      </SignaturePad>
      <PreviewMeta>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}