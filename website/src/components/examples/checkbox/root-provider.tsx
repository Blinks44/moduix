import { Button } from '@moduix/react/button';
import { Checkbox, useCheckbox } from '@moduix/react/checkbox';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/checkbox/checkbox-root-provider.module.css';

export default function RootProviderCheckboxDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <div className={styles.root}>
      <Checkbox.RootProvider value={checkbox}>
        <Checkbox.Control />
        <Checkbox.Label>Managed outside the tree</Checkbox.Label>
      </Checkbox.RootProvider>
      <PreviewMeta>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => checkbox.setChecked(!checkbox.checked)}
        >
          {checkbox.checked ? 'Uncheck' : 'Check'}
        </Button>
      </PreviewMeta>
    </div>
  );
}