import { Button } from '@moduix/solid/button';
import {
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  useEditable,
} from '@moduix/solid/editable';
import styles from '@/components/examples/editable/editable-root-provider.module.css';

export default function RootProviderEditableDemo() {
  const editable = useEditable({
    activationMode: 'dblclick',
    defaultValue: 'Root provider value',
  });

  return (
    <div class={styles.root}>
      <EditableRootProvider value={editable}>
        <EditableLabel>External state</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </EditableRootProvider>
      <Button type="button" size="sm" onClick={() => editable().edit()}>
        Edit
      </Button>
    </div>
  );
}
