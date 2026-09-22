import { Field, FieldLabel } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import { useState } from 'react';
import styles from '@/components/examples/textarea/textarea-controlled.module.css';

export default function TextareaControlledDemo() {
  const [value, setValue] = useState('');

  return (
    <Field className={styles.root}>
      <FieldLabel>Feedback</FieldLabel>
      <Textarea
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}