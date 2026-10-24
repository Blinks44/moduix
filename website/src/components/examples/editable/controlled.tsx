import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/react/editable';
import { useState } from 'react';
import styles from '@/components/examples/editable/editable-controlled.module.css';

export default function ControlledEditableDemo() {
  const [value, setValue] = useState('Downtown route');
  return (
    <Editable
      className={styles.root}
      value={value}
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