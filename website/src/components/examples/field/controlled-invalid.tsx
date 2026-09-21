import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { useState } from 'react';
import styles from '@/components/examples/field/field-controlled-invalid.module.css';

export default function ControlledInvalidFieldDemo() {
  const [value, setValue] = useState('');
  const invalid = value.length > 0 && value.length < 3;
  return (
    <Field className={styles.root} invalid={invalid}>
      <FieldLabel>Username</FieldLabel>
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="e.g. vinny"
      />
      <FieldHelperText>Use at least 3 characters.</FieldHelperText>
      <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
    </Field>
  );
}
