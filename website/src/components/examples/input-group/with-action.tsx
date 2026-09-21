import { Field, FieldLabel } from '@moduix/react/field';
import { InputGroup } from '@moduix/react/input-group';
import { useState } from 'react';
import styles from '@/components/examples/input-group/input-group-with-action.module.css';

const initialInviteEmail = '';

export default function InputGroupWithActionDemo() {
  const [value, setValue] = useState(initialInviteEmail);
  return (
    <Field className={styles.root}>
      <FieldLabel>Invite by email</FieldLabel>
      <InputGroup>
        <InputGroup.Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          type="email"
          placeholder="name@example.com"
        />
        <InputGroup.Button disabled={!value}>Send</InputGroup.Button>
      </InputGroup>
    </Field>
  );
}
