/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Textarea } from '@moduix/react';
import styles from '@/components/examples/textarea.module.css';

export function TextareaFieldValidationDemo() {
  return (
    <Field className={styles.field} invalid required>
      <Field.Label>Details</Field.Label>
      <Textarea minLength={10} placeholder="Add at least 10 characters" />
      <Field.HelperText>
        Include enough detail for the team to reproduce the issue.
      </Field.HelperText>
      <Field.ErrorText>Please provide details.</Field.ErrorText>
      <Field.ErrorText>Enter at least 10 characters.</Field.ErrorText>
    </Field>
  );
}

//#endregion