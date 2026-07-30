import { Button, SignaturePad } from '@moduix/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function FormSerializationSignaturePadDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('signature') ?? ''));
  };

  return (
    <form className="signature-pad-stack" onSubmit={handleSubmit}>
      <SignaturePad name="signature" getFormValue={(paths) => JSON.stringify(paths)}>
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
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