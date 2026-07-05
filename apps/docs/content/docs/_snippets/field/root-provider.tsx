/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useField } from '@ark-ui/react/field';
import { Field } from '@moduix/react';

export function RootProviderFieldDemo() {
  const field = useField({
    id: 'root-provider-field',
    required: true,
  });
  return (
    <Field.RootProvider value={field}>
      <Field.Label>Project key</Field.Label>
      <Field.Input placeholder="MAPS" />
      <Field.HelperText>The field state is created outside the rendered tree.</Field.HelperText>
    </Field.RootProvider>
  );
}

//#endregion