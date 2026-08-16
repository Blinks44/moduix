import { Button } from '@moduix/react/button';
import { Field } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function TextareaNativeAttributesDemo() {
  const [submitted, setSubmitted] = useState('Not submitted');

  return (
    <form
      style={{ inlineSize: '100%' }}
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get('notes') ?? ''));
      }}
    >
      <Field>
        <Field.Label>Notes</Field.Label>
        <Textarea
          name="notes"
          rows={6}
          maxLength={280}
          spellCheck={false}
          placeholder="Add enough context for the next person reading this."
        />
      </Field>
      <PreviewMeta style={{ marginInline: 'auto', width: 'fit-content' }}>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}