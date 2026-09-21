import { Button } from '@moduix/solid/button';
import { Field, FieldLabel } from '@moduix/solid/field';
import { Textarea } from '@moduix/solid/textarea';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/textarea/textarea-native-attributes.module.css';

export default function TextareaNativeAttributesDemo() {
  const [submitted, setSubmitted] = createSignal('Not submitted');

  return (
    <form
      class={styles.root}
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
          spellcheck={false}
          placeholder="Add enough context for the next person reading this."
        />
      </Field>
      <output>Submitted: {submitted()}</output>
      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}
