import {
  Editable,
  EditableArea,
  EditableContext,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/react/editable';

export default function AdvancedEditableCustomizationDemo() {
  return (
    <Editable defaultValue="Service area">
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableContext>
        {(editable) =>
          editable.editing ? (
            <span>Enter to save, Esc to cancel.</span>
          ) : (
            <EditableControl>
              <EditableEditTrigger />
            </EditableControl>
          )
        }
      </EditableContext>
    </Editable>
  );
}