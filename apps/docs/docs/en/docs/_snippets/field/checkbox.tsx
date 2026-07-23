import { Checkbox, Field } from '@moduix/react';

export default function CheckboxFieldDemo() {
  return (
    <Field required>
      <Checkbox.Root>
        <Checkbox.Control />
        <Checkbox.Label>Accept support access</Checkbox.Label>
      </Checkbox.Root>
      <Field.HelperText>Required before the team can inspect workspace data.</Field.HelperText>
      <Field.ErrorText>Support access must be enabled.</Field.ErrorText>
    </Field>
  );
}