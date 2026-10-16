import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/editable';
import { Show } from 'solid-js';

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
          {(editable) => (
            <Show
              when={editable().editing}
              fallback={
                <EditableEditTrigger
                  asChild={(props) => (
                    <Button {...props()} variant="outline">
                      Rename
                    </Button>
                  )}
                />
              }
            >
              <EditableSubmitTrigger asChild={(props) => <Button {...props()}>Save</Button>} />
              <EditableCancelTrigger
                asChild={(props) => (
                  <Button {...props()} variant="outline">
                    Cancel
                  </Button>
                )}
              />
            </Show>
          )}
        </EditableContext>
      </EditableControl>
    </Editable>
  );
}