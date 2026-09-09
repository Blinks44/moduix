import { Editable } from '@moduix/solid/editable';
import styles from '@/components/examples/editable/editable-disabled-and-read-only.module.css';

export default function EditableStatesDemo() {
  return (
    <div class={styles.root}>
      <Editable disabled defaultValue="Managed by your workspace">
        <Editable.Label>Disabled name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable>

      <Editable readOnly defaultValue="Assigned workspace">
        <Editable.Label>Read-only name</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable>
    </div>
  );
}