import { Editable } from '@moduix/react/editable';
import styles from '@/components/examples/editable/editable-textarea.module.css';

export default function TextareaEditableDemo() {
  return (
    <Editable
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
      className={styles.root}
    >
      <Editable.Label>Description</Editable.Label>
      <Editable.Area className={styles.area}>
        <Editable.Input asChild className={styles.textarea}>
          <textarea />
        </Editable.Input>
        <Editable.Preview className={styles.textarea} />
      </Editable.Area>
      <Editable.Controls />
    </Editable>
  );
}