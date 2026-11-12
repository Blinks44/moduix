import { Button } from '@moduix/react/button';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { useState } from 'react';
import styles from '@/components/examples/checkbox/checkbox-with-form.module.css';

export default function CheckboxWithFormDemo() {
  const [submitted, setSubmitted] = useState('terms: none');

  return (
    <form
      className={styles.root}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitted(`terms: ${formData.get('terms') ?? 'none'}`);
      }}
    >
      <Checkbox name="terms" value="accepted">
        <CheckboxControl />
        <CheckboxLabel>I agree to the terms and conditions</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <div data-preview-meta>
        <output>{submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
}