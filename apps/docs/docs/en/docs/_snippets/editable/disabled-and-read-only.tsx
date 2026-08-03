import { Editable } from '@moduix/react/editable';

export default function EditableStatesDemo() {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
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