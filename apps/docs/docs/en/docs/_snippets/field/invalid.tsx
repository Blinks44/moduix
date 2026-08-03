import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';

export default function InvalidFieldDemo() {
  return (
    <Field invalid required>
      <Field.Label>Email</Field.Label>
      <Input type="email" placeholder="name@example.com" />
      <Field.HelperText>Use your work email.</Field.HelperText>
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  );
}