import { Button } from '@moduix/solid/button';
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  useSwitch,
} from '@moduix/solid/switch';
import styles from '@/components/examples/switch/switch-root-provider.module.css';

export default function SwitchRootProviderDemo() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <div class={styles.stack}>
      <SwitchRootProvider value={switchApi}>
        <SwitchControl />
        <SwitchLabel>External state owner</SwitchLabel>
        <SwitchHiddenInput />
      </SwitchRootProvider>
      <div>
        <output>Current value: {String(switchApi().checked)}</output>
        <Button variant="outline" onClick={() => switchApi().toggleChecked()}>
          Toggle externally
        </Button>
      </div>
    </div>
  );
}
