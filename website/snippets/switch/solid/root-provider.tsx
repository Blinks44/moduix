import { Button } from '@moduix/solid/button';
import { Switch, useSwitch } from '@moduix/solid/switch';
import styles from '@/components/examples/switch/switch-root-provider.module.css';

export default function SwitchRootProviderDemo() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <div class={styles.stack}>
      <Switch.RootProvider value={switchApi}>
        <Switch.Control />
        <Switch.Label>External state owner</Switch.Label>
        <Switch.HiddenInput />
      </Switch.RootProvider>
      <div>
        <output>Current value: {String(switchApi().checked)}</output>
        <Button variant="outline" onClick={() => switchApi().toggleChecked()}>
          Toggle externally
        </Button>
      </div>
    </div>
  );
}