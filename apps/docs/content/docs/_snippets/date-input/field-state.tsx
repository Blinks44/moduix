/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { DateInput, Field } from '@moduix/react';

export function DateInputFieldDemo() {
  return (
    <Field invalid>
      <DateInput required invalid>
        <DateInput.Label>Deadline</DateInput.Label>
        <DateInput.Control>
          <DateInput.Segments />
        </DateInput.Control>
        <DateInput.HiddenInput name="deadline" />
      </DateInput>
      <Field.ErrorText>Enter a valid deadline.</Field.ErrorText>
    </Field>
  );
}

//#endregion