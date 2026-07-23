import { Checkbox, Field } from '@moduix/react';

export default function CheckboxFieldDemo() {
  return (
    <Field>
      <Checkbox required name="terms" value="accepted">
        <Checkbox.Control />
        <Checkbox.Label>Accept terms</Checkbox.Label>
      </Checkbox>
      <Field.HelperText>Required to continue.</Field.HelperText>
      <Field.ErrorText>Please accept the terms.</Field.ErrorText>
    </Field>
  );
}