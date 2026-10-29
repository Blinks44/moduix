import { Button } from '@moduix/react/button';
import { Stack } from '@moduix/react/stack';
import {
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  useSwitch,
} from '@moduix/react/switch';
import { PreviewMeta } from '@/components/mdx/Components';

export default function SwitchRootProviderDemo() {
  const switchApi = useSwitch({ defaultChecked: true });

  return (
    <Stack align="center" gap="3">
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
    </Stack>
  );
}