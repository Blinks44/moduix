import { Button } from '@moduix/react/button';
import { Field, FieldLabel } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import { useState } from 'react';
import styles from '@/components/examples/textarea/textarea-native-attributes.module.css';

export default function TextareaNativeAttributesDemo() {
  const [submitted, setSubmitted] = useState('Not submitted');

  return (
    <form
      className={styles.root}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get('notes') ?? ''));
      }}
    >
      <Field>
        <FieldLabel>Notes</FieldLabel>
        <Textarea
          name="notes"
          rows={6}
          maxLength={280}
          spellCheck={false}
          placeholder="Add enough context for the next person reading this."
        />
      </Field>
      <div data-preview-meta style={{ marginInline: 'auto', width: 'fit-content' }}>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
}