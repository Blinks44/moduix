import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/react/editable';
import { useState } from 'react';

export default function ControlledEditableDemo() {
  const [value, setValue] = useState('Downtown route');
  return (
    <Editable value={value} onValueChange={(details) => setValue(details.value)}>
      <EditableLabel>Controlled value</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  );
}