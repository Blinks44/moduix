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
      class={styles.root}
      defaultValue="Ark UI keeps the editable state, keyboard handling, and focus lifecycle."
      placeholder="Enter a description"
    >
      <EditableLabel>Description</EditableLabel>
      <EditableArea>
        <EditableInput asChild={(props) => <textarea {...props()} />} />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  );
}