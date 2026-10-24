import { Button } from '@moduix/react/button';
import { Field, FieldLabel } from '@moduix/react/field';
import { InputGroup, InputGroupAddon, InputGroupTextarea } from '@moduix/react/input-group';
import { useState } from 'react';
import styles from '@/components/examples/input-group/input-group-textarea.module.css';

const maxLength = 280;

export default function InputGroupTextareaDemo() {
  const [value, setValue] = useState('');

  return (
    <Field className={styles.root}>
      <FieldLabel>Message</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          autoresize
          maxLength={maxLength}
          placeholder="Write a reply"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <InputGroupAddon align="block">
          {value.length}/{maxLength}
          <Button className={styles.send} size="sm" disabled={!value.trim()}>
            Send
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  );
}