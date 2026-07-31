import { Button, Switch, useSwitch } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/switch.module.css';

export default function SwitchRootProviderDemo() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <div className={styles.stack}>
      <Switch.RootProvider value={switchApi}>
        <Switch.Control />
        <Switch.Label>External state owner</Switch.Label>
      </Switch.RootProvider>
      <PreviewMeta>
        <output>Current value: {String(switchApi.checked)}</output>
        <Button variant="outline" onClick={() => switchApi.toggleChecked()}>
          Toggle externally
        </Button>
      </PreviewMeta>
    </div>
  );
}