import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { useState } from 'react';
import styles from '@/components/examples/input/input-controlled.module.css';

export default function ControlledInputDemo() {
  const [value, setValue] = useState('');
  return (
    <Field className={styles.root}>
      <Field.Label>Username</Field.Label>
      <Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}