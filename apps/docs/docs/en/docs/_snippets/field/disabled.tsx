import { Field } from '@moduix/react';

export default function DisabledFieldDemo() {
  return (
    <Field disabled>
      <Field.Label>Organization</Field.Label>
      <Field.Input placeholder="Acme Inc." />
      <Field.HelperText>This field is currently managed by your workspace.</Field.HelperText>
    </Field>
  );
}