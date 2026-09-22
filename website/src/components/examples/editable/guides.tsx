import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/react/editable';

export default function EditableGuidesDemo() {
  return (
    <Editable
      defaultValue="Route"
      activationMode="click"
      autoResize
      maxLength={24}
      placeholder={{
        preview: 'Click to edit',
        edit: 'Type a short name',
      }}
      translations={{
        input: 'Route name',
        edit: 'Edit route name',
        submit: 'Save route name',
        cancel: 'Cancel route name',
      }}
    >
      <EditableLabel>Auto-resizing name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControls />
    </Editable>
  );
}