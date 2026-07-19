//#region demo
import { Checkbox, Field } from '@moduix/react';

const _fieldName = 'terms';

export function CheckboxFieldDemo() {
  return (
    <Field className="checkbox-field">
      <Checkbox required name="terms" value="accepted">
        <Checkbox.Control />
        <Checkbox.Label>Accept terms</Checkbox.Label>
      </Checkbox>
      <Field.HelperText>Required to continue.</Field.HelperText>
      <Field.ErrorText>Please accept the terms.</Field.ErrorText>
    </Field>
  );
}
//#endregion