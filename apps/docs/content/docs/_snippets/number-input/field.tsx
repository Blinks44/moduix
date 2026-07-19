/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, NumberInput } from '@moduix/react';

export function NumberInputFieldDemo() {
  return (
    <Field invalid>
      <NumberInput min={1} max={10} required>
        <NumberInput.Label>Items</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <Field.ErrorText>Value should be between 1 and 10.</Field.ErrorText>
    </Field>
  );
}

//#endregion