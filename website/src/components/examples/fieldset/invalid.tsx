import { Field, FieldErrorText, FieldLabel } from '@moduix/react/field';
import { Fieldset, FieldsetErrorText, FieldsetLegend } from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/fieldset/fieldset-invalid.module.css';

export default function InvalidFieldset() {
  return (
    <Fieldset className={styles.root} invalid>
      <FieldsetLegend>Account information</FieldsetLegend>
      <FieldsetErrorText>Please fix the errors below to continue.</FieldsetErrorText>
      <Field invalid>
        <FieldLabel>Username</FieldLabel>
        <Input defaultValue="jo" />
        <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
      </Field>
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" defaultValue="invalid-email" />
        <FieldErrorText>Enter a valid email address.</FieldErrorText>
      </Field>
    </Fieldset>
  );
}