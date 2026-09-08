import { Button } from '@moduix/solid/button';
import { Checkbox, useCheckbox } from '@moduix/solid/checkbox';
import styles from '@/components/examples/checkbox/checkbox-root-provider.module.css';

export default function RootProviderCheckboxDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <div class={styles.root}>
      <Checkbox.RootProvider value={checkbox}>
        <Checkbox.Control />
        <Checkbox.Label>Managed outside the tree</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.RootProvider>
      <div>
        <output>{checkbox().checked ? 'Checked' : 'Unchecked'}</output>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => checkbox().setChecked(!checkbox().checked)}
        >
          {checkbox().checked ? 'Uncheck' : 'Check'}
        </Button>
      </div>
    </div>
  );
}