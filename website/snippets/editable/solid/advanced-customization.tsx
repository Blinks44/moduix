import {
  Editable,
  EditableArea,
  EditableContext,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/solid/editable';
import { Show } from 'solid-js';

export default function AdvancedEditableCustomizationDemo() {
  return (
    <Editable defaultValue="Service area">
      <EditableLabel>Name</EditableLabel>
      <EditableArea>
        <EditableInput />
        <EditablePreview />
      </EditableArea>
      <EditableContext>
        {(editable) => (
          <Show
            when={editable().editing}
            fallback={
              <EditableControl>
                <EditableEditTrigger />
              </EditableControl>
            }
          >
            <span>Enter to save, Esc to cancel.</span>
          </Show>
        )}
      </EditableContext>
    </Editable>
  );
}