import { Button, SignaturePad } from '@moduix/react';
import type { FormEvent } from 'react';
import { useState } from 'react';

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
      <Button type="submit">Submit</Button>
      <output className="signature-pad-status">Submitted: {submitted}</output>
    </form>
  );
}