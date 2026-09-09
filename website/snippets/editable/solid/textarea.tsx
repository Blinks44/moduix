import { Editable } from '@moduix/solid/editable';
import styles from '@/components/examples/editable/editable-textarea.module.css';

export default function TextareaEditableDemo() {
  return (
    <Editable
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
      class={styles.root}
    >
      <Editable.Label>Description</Editable.Label>
      <Editable.Area class={styles.area}>
        <Editable.Input asChild={(props) => <textarea {...props()} />} class={styles.textarea} />
        <Editable.Preview class={styles.textarea} />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}