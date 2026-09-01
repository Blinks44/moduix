import { Button } from '@moduix/react/button';
import { Editable } from '@moduix/react/editable';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/editable/editable-form.module.css';

export default function EditableFormDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(String(new FormData(event.currentTarget).get('title') ?? ''));
      }}
      className={styles.root}
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