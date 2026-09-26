import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import styles from '@/components/examples/textarea/textarea-field-validation.module.css';

export default function TextareaFieldValidationDemo() {
  return (
    <Field className={styles.root} invalid required>
      <FieldLabel>Details</FieldLabel>
      <Textarea minLength={10} placeholder="Add at least 10 characters" />
      <FieldHelperText>Include enough detail for the team to reproduce the issue.</FieldHelperText>
      <FieldErrorText>Please provide details.</FieldErrorText>
      <FieldErrorText>Enter at least 10 characters.</FieldErrorText>
    </Field>
  );
}