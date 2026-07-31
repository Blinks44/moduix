import { Field } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import { useState } from 'react';
import styles from '@/components/examples/textarea.module.css';

export default function TextareaControlledDemo() {
  const [value, setValue] = useState('');

  return (
    <Field className={styles.field}>
      <Field.Label>Feedback</Field.Label>
      <Textarea
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}