import { Field } from '@moduix/react/field';
import { Fieldset } from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';

export default function InvalidFieldset() {
  return (
    <Fieldset className="fieldset" invalid>
      <Fieldset.Legend>Account information</Fieldset.Legend>
      <Fieldset.ErrorText>Please fix the errors below to continue.</Fieldset.ErrorText>
      <Field invalid>
        <Field.Label>Username</Field.Label>
        <Input defaultValue="jo" />
        <Field.ErrorText>Username must be at least 3 characters.</Field.ErrorText>
      </Field>
      <Field invalid>
        <Field.Label>Email</Field.Label>
        <Input type="email" defaultValue="invalid-email" />
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field>
    </Fieldset>
  );
}