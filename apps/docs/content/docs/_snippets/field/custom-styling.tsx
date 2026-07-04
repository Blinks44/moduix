/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field } from '@moduix/react';

export function CustomStylesFieldDemo() {
  return (
    <Field invalid className="customField">
      <Field.Label className="customLabel">Project key</Field.Label>
      <Field.Input required placeholder="MAPS" className="customControl" />
      <Field.HelperText>Use three to five uppercase letters.</Field.HelperText>
      <Field.ErrorText className="customError">Please enter a project key.</Field.ErrorText>
    </Field>
  );
}

//#endregion