import { Clipboard } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function TimeoutClipboardDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Clipboard defaultValue="workspace-secret" timeout={5000}>
        <Clipboard.Label>Five second copied state</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly />
          <Clipboard.Trigger>
            <Clipboard.Indicator />
            <Clipboard.CopyText />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard>
    </PreviewLayout>
  );
}