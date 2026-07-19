/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Checkbox, Field } from '@moduix/react';

const required = true;
export function CheckboxFieldDemo() {
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

//#endregion