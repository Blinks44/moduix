/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Textarea } from '@moduix/react';
import { useState } from 'react';
import styles from '@/components/examples/textarea.module.css';

export function TextareaControlledDemo() {
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

//#endregion