import { Field, Input } from '@moduix/react';

export default function InvalidInputDemo() {
  return (
    <Field className="input-demo-field" invalid>
      <Field.Label>Email</Field.Label>
      <Input type="email" placeholder="name@example.com" />
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  );
}