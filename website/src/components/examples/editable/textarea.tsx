import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/react/editable';
import styles from '@/components/examples/editable/editable-textarea.module.css';

export default function TextareaEditableDemo() {
  return (
    <Editable
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      submitMode="none"
      placeholder="Enter a description"
      className={styles.root}
    >
      <EditableLabel>Description</EditableLabel>
      <EditableArea className={styles.area}>
        <EditableInput asChild className={styles.textarea}>
          <textarea />
        </EditableInput>
        <EditablePreview className={styles.textarea} />
      </EditableArea>
      <EditableControls />
    </Editable>
  );
}
