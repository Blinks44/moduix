/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, RadioGroup } from '@moduix/react';

const defaultValue = 'team';
export function RadioGroupFieldDemo() {
  return (
    <Field>
      <Field.Label>Account type</Field.Label>
      <RadioGroup defaultValue="team" aria-label="Account type">
        <RadioGroup.Item value="personal">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Personal account</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="team">
          <RadioGroup.ItemHiddenInput />
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Team account</RadioGroup.ItemText>
        </RadioGroup.Item>
      </RadioGroup>
      <Field.HelperText>Choose the default account context for new projects.</Field.HelperText>
    </Field>
  );
}

//#endregion