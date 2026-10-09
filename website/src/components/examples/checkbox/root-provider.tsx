import { Button } from '@moduix/react/button';
import {
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
} from '@moduix/react/checkbox';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/checkbox/checkbox-root-provider.module.css';

export default function RootProviderCheckboxDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <div className={styles.root}>
      <CheckboxRootProvider value={checkbox}>
        <CheckboxControl />
        <CheckboxLabel>Managed outside the tree</CheckboxLabel>
        <CheckboxHiddenInput />
      </CheckboxRootProvider>
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