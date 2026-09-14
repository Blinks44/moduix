import { Button } from '@moduix/solid/button';
import { Editable } from '@moduix/solid/editable';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/editable/editable-form.module.css';

export default function EditableFormDemo() {
  const [submitted, setSubmitted] = createSignal('Nothing submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setSubmitted(String(new FormData(form).get('title') ?? ''));
  };

  return (
    <form class={styles.root} onSubmit={handleSubmit}>
      <Editable defaultValue="Layer name" name="title">
        <Editable.Label>Layer name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable>
      <div>
        <output>Submitted: {submitted()}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
}