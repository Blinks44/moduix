import { Button } from '@moduix/solid/button';
import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/solid/number-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/number-input/number-input-form-submission.module.css';

export default function NumberInputFormSubmissionDemo() {
  const [submittedValue, setSubmittedValue] = createSignal('Not submitted');

  return (
    <form
      class={styles.root}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmittedValue(String(new FormData(event.currentTarget).get('quantity')));
      }}
    >
      <NumberInput defaultValue="42" name="quantity">
        <NumberInputLabel>Quantity</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <output>Submitted: {submittedValue()}</output>
      <Button type="submit" size="sm">
        Submit quantity
      </Button>
    </form>
  );
}