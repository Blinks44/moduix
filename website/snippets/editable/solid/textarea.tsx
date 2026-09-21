import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/solid/editable';
import styles from '@/components/examples/editable/editable-textarea.module.css';

export default function TextareaEditableDemo() {
  return (
    <Editable
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
      class={styles.root}
    >
      <EditableLabel>Description</EditableLabel>
      <EditableArea class={styles.area}>
        <EditableInput asChild={(props) => <textarea {...props()} />} class={styles.textarea} />
        <EditablePreview class={styles.textarea} />
      </EditableArea>
      <EditableControls />
    </Editable>
  );
}
