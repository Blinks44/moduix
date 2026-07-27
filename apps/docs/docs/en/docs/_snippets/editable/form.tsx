import { Button, Editable } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function EditableFormDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get('title') ?? ''));
      }}
      style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}
    >
      <Editable defaultValue="Layer name" name="title">
        <Editable.Label>Layer name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable>
      <PreviewMeta>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}