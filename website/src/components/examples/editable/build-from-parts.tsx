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
import { Check as CheckIcon, Pencil as PencilIcon, X as XIcon } from 'lucide-react';
import styles from '@/components/examples/editable/editable-basic.module.css';

export default function BuildFromPartsEditableDemo() {
  return (
    <Editable
      className={styles.root}
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
          {(editable) =>
            editable.editing ? (
              <>
                <EditableSubmitTrigger>
                  <CheckIcon strokeWidth={3} />
                </EditableSubmitTrigger>
                <EditableCancelTrigger>
                  <XIcon strokeWidth={3} />
                </EditableCancelTrigger>
              </>
            ) : (
              <EditableEditTrigger>
                <PencilIcon />
              </EditableEditTrigger>
            )
          }
        </EditableContext>
      </EditableControl>
    </Editable>
  );
}