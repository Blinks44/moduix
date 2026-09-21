import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/solid/editable';

export default function EditableDemo() {
  return (
    <Editable
      defaultValue="Layer name"
      translations={{
        input: 'Layer name',
        edit: 'Edit layer name',
        submit: 'Save layer name',
        cancel: 'Cancel layer name',
      }}
    >
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  );
}
