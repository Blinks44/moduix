import { Button } from '@moduix/react/button';
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  useSwitch,
} from '@moduix/react/switch';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/switch/switch-root-provider.module.css';

export default function SwitchRootProviderDemo() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <div className={styles.stack}>
      <SwitchRootProvider value={switchApi}>
        <SwitchControl />
        <SwitchLabel>External state owner</SwitchLabel>
        <SwitchHiddenInput />
      </SwitchRootProvider>
      <PreviewMeta>
        <output>Current value: {String(switchApi.checked)}</output>
        <Button variant="outline" onClick={() => switchApi.toggleChecked()}>
          Toggle externally
        </Button>
      </PreviewMeta>
    </div>
  );
}