import { Field } from '@moduix/solid/field';
import { Fieldset } from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/fieldset/fieldset-invalid.module.css';

export default function InvalidFieldset() {
  return (
    <Fieldset class={styles.root} invalid>
      <Fieldset.Legend>Account information</Fieldset.Legend>
      <Fieldset.ErrorText>Please fix the errors below to continue.</Fieldset.ErrorText>
      <Field invalid>
        <Field.Label>Username</Field.Label>
        <Input value="jo" />
        <Field.ErrorText>Username must be at least 3 characters.</Field.ErrorText>
      </Field>
      <Field invalid>
        <Field.Label>Email</Field.Label>
        <Input type="email" value="invalid-email" />
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field>
    </Fieldset>
  );
}