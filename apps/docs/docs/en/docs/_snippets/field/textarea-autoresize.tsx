import { Field } from '@moduix/react';

export default function TextareaAutoresizeFieldDemo() {
  return (
    <Field>
      <Field.Label>Details</Field.Label>
      <Field.Textarea autoresize placeholder="Add extra context" />
      <Field.HelperText>The textarea grows as the user types.</Field.HelperText>
    </Field>
  );
}