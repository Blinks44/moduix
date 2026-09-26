import { Field, FieldLabel } from '@moduix/solid/field';
import { InputGroup, InputGroupButton, InputGroupInput } from '@moduix/solid/input-group';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/input-group/input-group-with-action.module.css';

const initialInviteEmail = '';

export default function InputGroupWithActionDemo() {
  const [value, setValue] = createSignal(initialInviteEmail);

  return (
    <Field class={styles.root}>
      <FieldLabel>Invite by email</FieldLabel>
      <InputGroup>
        <InputGroupInput
          value={value()}
          onInput={(event) => setValue(event.currentTarget.value)}
          type="email"
          placeholder="name@example.com"
        />
        <InputGroupButton disabled={!value()}>Send</InputGroupButton>
      </InputGroup>
    </Field>
  );
}