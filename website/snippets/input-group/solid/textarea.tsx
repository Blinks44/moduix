import { Button } from '@moduix/solid/button';
import { Field, FieldLabel } from '@moduix/solid/field';
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@moduix/solid/input-group';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/input-group/input-group-textarea.module.css';

const maxLength = 280;

export default function InputGroupTextareaDemo() {
  const [value, setValue] = createSignal('');

  return (
    <Field class={styles.root}>
      <FieldLabel>Message</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          autoresize
          maxLength={maxLength}
          placeholder="Write a reply"
          value={value()}
          onInput={(event) => setValue(event.currentTarget.value)}
        />
        <InputGroupAddon align="block">
          {value().length}/{maxLength}
          <Button class={styles.send} size="sm" disabled={!value().trim()}>
            Send
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}