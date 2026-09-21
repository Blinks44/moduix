import { Button } from '@moduix/react/button';
import {
  EditableArea,
  EditableControls,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRootProvider,
  useEditable,
} from '@moduix/react/editable';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/editable/editable-root-provider.module.css';

export default function RootProviderEditableDemo() {
  const editable = useEditable({
    activationMode: 'dblclick',
    defaultValue: 'Root provider value',
  });
  return (
    <div className={styles.root}>
      <EditableRootProvider value={editable}>
        <EditableLabel>External state</EditableLabel>
        <EditableArea>
          <EditableInput />
          <EditablePreview />
        </EditableArea>
        <EditableControls />
      </EditableRootProvider>
      <PreviewMeta className={styles.meta}>
        <Button type="button" size="sm" onClick={() => editable.edit()}>
          Edit
        </Button>
      </PreviewMeta>
    </div>
  );
}
