import { Button } from '@moduix/solid/button';
import { Editable, useEditable } from '@moduix/solid/editable';
import styles from '@/components/examples/editable/editable-root-provider.module.css';

export default function RootProviderEditableDemo() {
  const editable = useEditable({
    activationMode: 'dblclick',
    defaultValue: 'Root provider value',
  });

  return (
    <div class={styles.root}>
      <Editable.RootProvider value={editable}>
        <Editable.Label>External state</Editable.Label>
        <Editable.Area>
          <Editable.Input />
          <Editable.Preview />
        </Editable.Area>
        <Editable.Controls />
      </Editable.RootProvider>
      <Button type="button" size="sm" onClick={() => editable().edit()}>
        Edit
      </Button>
    </div>
  );
}