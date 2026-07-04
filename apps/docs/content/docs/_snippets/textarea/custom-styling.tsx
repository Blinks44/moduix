/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Textarea } from '@moduix/react';
import styles from '@/components/examples/textarea.module.css';

export function CustomTextareaDemo() {
  return (
    <Field className={styles.field}>
      <Field.Label>Notes</Field.Label>
      <Textarea className={styles.customTextarea} placeholder="Styled textarea" />
    </Field>
  );
}

//#endregion