import {
  Editable,
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
} from '@moduix/solid/editable';
import styles from '@/components/examples/editable/editable-disabled-and-read-only.module.css';

export default function EditableStatesDemo() {
  return (
    <div class={styles.root}>
      <Editable disabled defaultValue="Managed by your workspace">
        <EditableLabel>Disabled name</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>

      <Editable readOnly defaultValue="Assigned workspace">
        <EditableLabel>Read-only name</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </Editable>
    </div>
  );
}
