import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/solid/editable';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/editable/editable-controlled.module.css';

export default function ControlledEditableDemo() {
  const [value, setValue] = createSignal('Downtown route');

  return (
    <Editable
      class={styles.root}
      value={value()}
      onValueChange={(details) => setValue(details.value)}
    >
      <EditableLabel>Controlled value</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  );
}