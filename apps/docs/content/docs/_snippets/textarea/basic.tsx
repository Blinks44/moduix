/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Textarea } from '@moduix/react';
import styles from '@/components/examples/textarea.module.css';

export function TextareaDemo() {
  return (
    <Field className={styles.field}>
      <Field.Label>Comment</Field.Label>
      <Field.HelperText>Included in the issue summary visible to the whole team.</Field.HelperText>
      <Textarea placeholder="Write a short comment" />
    </Field>
  );
}

//#endregion