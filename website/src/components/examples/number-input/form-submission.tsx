import { Button } from '@moduix/react/button';
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/react/number-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/number-input/number-input-form-submission.module.css';

export default function NumberInputFormSubmissionDemo() {
  const [submittedValue, setSubmittedValue] = useState('Not submitted');

  return (
    <form
      className={styles.root}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmittedValue(String(new FormData(event.currentTarget).get('quantity')));
      }}
    >
      <NumberInput defaultValue="42" name="quantity">
        <NumberInputLabel>Quantity</NumberInputLabel>
        <NumberInputField />
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
