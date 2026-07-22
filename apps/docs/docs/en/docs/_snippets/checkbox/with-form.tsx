import { Button, Checkbox } from '@moduix/react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function CheckboxWithFormDemo() {
  const [submitted, setSubmitted] = useState('terms: none');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitted(`terms: ${formData.get('terms') ?? 'none'}`);
      }}
    >
      <PreviewLayout alignItems="center" gap="var(--moduix-spacing-3)">
        <Checkbox name="terms" value="accepted">
          <Checkbox.Control />
          <Checkbox.Label>I agree to the terms and conditions</Checkbox.Label>
        </Checkbox>
        <Button type="submit">Submit</Button>
        <output className="checkbox-result">{submitted}</output>
      </PreviewLayout>
    </form>
  );
}