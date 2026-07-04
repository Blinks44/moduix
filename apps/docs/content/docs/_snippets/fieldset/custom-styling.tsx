/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, Fieldset } from '@moduix/react';

export function StyledFieldset() {
  return (
    <Fieldset className="fieldset custom-fieldset">
      <Fieldset.Legend>Styled fieldset</Fieldset.Legend>
      <Field>
        <Field.Label>Project name</Field.Label>
        <Field.Input placeholder="Maps Platform" />
      </Field>
      <Fieldset.HelperText>Visible to project members.</Fieldset.HelperText>
    </Fieldset>
  );
}

//#endregion