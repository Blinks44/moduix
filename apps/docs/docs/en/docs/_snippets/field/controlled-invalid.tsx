import { Field } from '@moduix/react';
import { useState } from 'react';

export default function ControlledInvalidFieldDemo() {
  const [value, setValue] = useState('');
  const invalid = value.length > 0 && value.length < 3;
  return (
    <Field invalid={invalid}>
      <Field.Label>Username</Field.Label>
      <Field.Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="e.g. vinny"
      />
      <Field.HelperText>Use at least 3 characters.</Field.HelperText>
      <Field.ErrorText>Username must be at least 3 characters.</Field.ErrorText>
    </Field>
  );
}