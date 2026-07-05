/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useFieldset } from '@ark-ui/react/fieldset';
import { Field, Fieldset } from '@moduix/react';

export function ExternalFieldsetState() {
  const fieldset = useFieldset({
    invalid: true,
  });
  return (
    <Fieldset.RootProvider value={fieldset} className="fieldset">
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" defaultValue="invalid-address" />
      </Field>
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
    </Fieldset.RootProvider>
  );
}

//#endregion