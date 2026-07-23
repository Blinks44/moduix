import { Button, Editable, useEditable } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderEditableDemo() {
  const editable = useEditable({
    activationMode: 'dblclick',
    defaultValue: 'Root provider value',
  });
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
      <Editable.RootProvider value={editable}>
        <Editable.Label>External state</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable.RootProvider>
      <PreviewMeta>
        <Button type="button" size="sm" onClick={() => editable.edit()}>
          Edit
        </Button>
      </PreviewMeta>
    </div>
  );
}