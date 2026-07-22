import { Field } from '@moduix/react';

export default function TextareaFieldDemo() {
  return (
    <Field>
      <Field.Label>Summary</Field.Label>
      <Field.Textarea placeholder="Describe the request" />
      <Field.HelperText>Use a short operational summary.</Field.HelperText>
    </Field>
  );
}