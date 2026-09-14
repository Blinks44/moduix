import { Button } from '@moduix/react/button';
import { Checkbox } from '@moduix/react/checkbox';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
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
        <Checkbox.Control />
        <Checkbox.Label>I agree to the terms and conditions</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox>
      <PreviewMeta>
        <output>{submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}