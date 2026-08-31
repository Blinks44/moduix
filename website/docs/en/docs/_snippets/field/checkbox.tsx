import { Checkbox } from '@moduix/react/checkbox';
import { Field } from '@moduix/react/field';

export default function CheckboxFieldDemo() {
  return (
    <Field invalid>
      <Checkbox.Root invalid required name="support-access" value="enabled">
        <Checkbox.Control />
        <Checkbox.Label>Accept support access</Checkbox.Label>
      </Checkbox.Root>
      <Field.HelperText>Required before the team can inspect workspace data.</Field.HelperText>
      <Field.ErrorText>Support access must be enabled.</Field.ErrorText>
    </Field>
  );
}