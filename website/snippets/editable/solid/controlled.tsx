import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/solid/editable';
import { createSignal } from 'solid-js';

export default function ControlledEditableDemo() {
  const [value, setValue] = createSignal('Downtown route');

  return (
    <Editable value={value()} onValueChange={(details) => setValue(details.value)}>
      <EditableLabel>Controlled value</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  );
}
