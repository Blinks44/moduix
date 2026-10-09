import { Field, FieldLabel } from '@moduix/solid/field';
import { InputGroup, InputGroupClearTrigger, InputGroupInput } from '@moduix/solid/input-group';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/input-group/input-group-clear-trigger.module.css';

export default function InputGroupClearTriggerDemo() {
  const [query, setQuery] = createSignal('moduix');
  let inputRef: HTMLInputElement | undefined;
  return (
    <Field class={styles.root}>
      <FieldLabel>Search</FieldLabel>
      <InputGroup>
        <InputGroupInput
          ref={(element) => {
            inputRef = element;
          }}
          value={query()}
          onInput={(event) => setQuery(event.currentTarget.value)}
          placeholder="Search…"
        />
        {query() && (
          <InputGroupClearTrigger
            aria-label="Clear search"
            onClick={() => {
              setQuery('');
              inputRef?.focus();
            }}
          />
        )}
      </InputGroup>
    </Field>
  );
}