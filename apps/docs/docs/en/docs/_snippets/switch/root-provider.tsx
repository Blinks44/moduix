import { Button, Switch, useSwitch } from '@moduix/react';
import styles from '@/components/examples/switch.module.css';

export default function SwitchRootProviderDemo() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <div className={styles.stack}>
      <Button variant="outline" onClick={() => switchApi.toggleChecked()}>
        Toggle externally
      </Button>
      <Switch.RootProvider value={switchApi}>
        <Switch.Control />
        <Switch.Label>External state owner</Switch.Label>
      </Switch.RootProvider>
    </div>
  );
}