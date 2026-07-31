import { Button } from '@moduix/react/button';
import { NumberInput } from '@moduix/react/number-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function NumberInputFormSubmissionDemo() {
  const [submittedValue, setSubmittedValue] = useState('Not submitted');

  return (
    <form
      style={{ display: 'grid', gap: '0.75rem', justifyItems: 'center' }}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmittedValue(String(new FormData(event.currentTarget).get('quantity')));
      }}
    >
      <NumberInput defaultValue="42">
        <NumberInput.Label>Quantity</NumberInput.Label>
        <NumberInput.Field />
        <NumberInput.Context>
          {(context) => <input name="quantity" type="hidden" value={context.valueAsNumber} />}
        </NumberInput.Context>
      </NumberInput>
      <PreviewMeta>
        <output>Submitted: {submittedValue}</output>
        <Button type="submit" size="sm">
          Submit quantity
        </Button>
      </PreviewMeta>
    </form>
  );
}