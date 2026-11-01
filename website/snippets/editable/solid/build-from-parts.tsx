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
import { Check as CheckIcon, Pencil as PencilIcon, X as XIcon } from 'lucide-solid';
import { Show } from 'solid-js';
import styles from '@/components/examples/editable/editable-basic.module.css';

export default function BuildFromPartsEditableDemo() {
  return (
    <Editable
      class={styles.root}
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
      <EditableControl>
        <EditableContext>
          {(editable) => (
            <Show
              when={editable().editing}
              fallback={
                <EditableEditTrigger>
                  <PencilIcon />
                </EditableEditTrigger>
              }
            >
              <EditableSubmitTrigger>
                <CheckIcon strokeWidth={3} />
              </EditableSubmitTrigger>
              <EditableCancelTrigger>
                <XIcon strokeWidth={3} />
              </EditableCancelTrigger>
            </Show>
          )}
        </EditableContext>
      </EditableControl>
    </Editable>
  );
}