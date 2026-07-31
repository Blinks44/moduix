import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';

export default function InvalidInputDemo() {
  return (
    <Field invalid>
      <Field.Label>Email</Field.Label>
      <Input type="email" placeholder="name@example.com" />
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  );
}