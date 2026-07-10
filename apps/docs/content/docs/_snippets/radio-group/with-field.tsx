/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, RadioGroup } from '@moduix/react';

export function RadioGroupFieldDemo() {
  return (
    <Field.Root invalid className="radio-field">
      <Field.Label>Account type</Field.Label>
      <RadioGroup required name="account-type">
        <RadioGroup.Option value="personal">Personal account</RadioGroup.Option>
        <RadioGroup.Option value="team">Team account</RadioGroup.Option>
      </RadioGroup>
      <Field.HelperText>Choose the default account context for new projects.</Field.HelperText>
      <Field.ErrorText>Choose an account type.</Field.ErrorText>
    </Field.Root>
  );
}

//#endregion