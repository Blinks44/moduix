import { Button } from '@moduix/react/button';
import {
  Editable,
  EditableArea,
  EditableCancelTrigger,
  EditableContext,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmitTrigger,
} from '@moduix/react/editable';

export default function AdvancedEditableCustomizationDemo() {
  return (
    <Editable
      defaultValue="Service area"
      translations={{ edit: 'Rename', submit: 'Save', cancel: 'Cancel' }}
    >
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableControl>
        <EditableContext>
          {(editable) =>
            editable.editing ? (
              <>
                <EditableSubmitTrigger asChild>
                  <Button>Save</Button>
                </EditableSubmitTrigger>
                <EditableCancelTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </EditableCancelTrigger>
              </>
            ) : (
              <EditableEditTrigger asChild>
                <Button variant="outline">Rename</Button>
              </EditableEditTrigger>
            )
          }
        </EditableContext>
      </EditableControl>
    </Editable>
  );
}