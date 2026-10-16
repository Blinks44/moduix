import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/solid/editable';

export default function TextareaEditableDemo() {
  return (
    <Editable
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