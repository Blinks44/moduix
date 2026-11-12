import { Button } from '@moduix/solid/button';
import { Stack } from '@moduix/solid/stack';
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  useSwitch,
} from '@moduix/solid/switch';

export default function SwitchRootProviderDemo() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <Stack align="center" gap="3">
      <SwitchRootProvider value={switchApi}>
        <SwitchControl />
        <SwitchLabel>External state owner</SwitchLabel>
        <SwitchHiddenInput />
      </SwitchRootProvider>
      <div data-preview-meta>
        <output>Current value: {String(switchApi().checked)}</output>
        <Button variant="outline" onClick={() => switchApi().toggleChecked()}>
          Toggle externally
        </Button>
      </div>
    </Stack>
  );
}