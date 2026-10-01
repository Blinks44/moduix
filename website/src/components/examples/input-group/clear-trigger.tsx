import { Field, FieldLabel } from '@moduix/react/field';
import { InputGroup, InputGroupClearTrigger, InputGroupInput } from '@moduix/react/input-group';
import { useRef, useState } from 'react';
import styles from '@/components/examples/input-group/input-group-clear-trigger.module.css';

export default function InputGroupClearTriggerDemo() {
  const [query, setQuery] = useState('moduix');
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Field className={styles.root}>
      <FieldLabel>Search</FieldLabel>
      <InputGroup>
        <InputGroupInput
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search…"
        />
        {query && (
          <InputGroupClearTrigger
            aria-label="Clear search"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
          />
        )}
      </InputGroup>
    </Field>
  );
}