import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/react/editable';
import styles from '@/components/examples/editable/editable-basic.module.css';

export default function EditableDemo() {
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
      <EditableControls />
    </Editable>
  );
}