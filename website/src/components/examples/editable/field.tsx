import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/react/editable';
import { Field, FieldErrorText } from '@moduix/react/field';
import styles from '@/components/examples/editable/editable-field.module.css';

export default function FieldEditableDemo() {
  return (
    <Field className={styles.root} invalid>
      <Editable defaultValue="" placeholder="Click to edit your bio" required>
        <EditableLabel>Bio</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
      <FieldErrorText>Bio is required.</FieldErrorText>
    </Field>
  );
}
