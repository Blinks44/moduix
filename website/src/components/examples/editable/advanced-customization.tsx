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
import styles from '@/components/examples/editable/editable-advanced-customization.module.css';

export default function AdvancedEditableCustomizationDemo() {
  return (
    <Editable
      className={styles.root}
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