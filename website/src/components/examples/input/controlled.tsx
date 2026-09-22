import { Field, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { useState } from 'react';
import styles from '@/components/examples/input/input-controlled.module.css';

export default function ControlledInputDemo() {
  const [value, setValue] = useState('');
  return (
    <Field className={styles.root}>
      <FieldLabel>Username</FieldLabel>
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}