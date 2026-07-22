import { Field } from '@moduix/react';

export default function ReadOnlyFieldDemo() {
  return (
    <Field readOnly>
      <Field.Label>Workspace key</Field.Label>
      <Field.Input defaultValue="MAPS" />
      <Field.HelperText>Read-only state is propagated to the input.</Field.HelperText>
    </Field>
  );
}