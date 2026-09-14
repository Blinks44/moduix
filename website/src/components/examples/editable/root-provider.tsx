import { Button } from '@moduix/react/button';
import { Editable, useEditable } from '@moduix/react/editable';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/editable/editable-root-provider.module.css';

export default function RootProviderEditableDemo() {
  const editable = useEditable({
    activationMode: 'dblclick',
    defaultValue: 'Root provider value',
  });
  return (
    <div className={styles.root}>
      <Editable.RootProvider value={editable}>
        <Editable.Label>External state</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable.RootProvider>
      <PreviewMeta className={styles.meta}>
        <Button type="button" size="sm" onClick={() => editable.edit()}>
          Edit
        </Button>
      </PreviewMeta>
    </div>
  );
}