import { Field, Input } from '@moduix/react';

export default function InputDemo() {
  return (
    <Field className="input-demo-field">
      <Field.Label>Name</Field.Label>
      <Field.HelperText>Used in your public workspace profile.</Field.HelperText>
      <Input name="name" placeholder="Enter your name" />
    </Field>
  );
}