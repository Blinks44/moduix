import { Clipboard } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function ClipboardDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Clipboard defaultValue="https://moduix.dev/docs/clipboard">
        <Clipboard.Label>Copy this link</Clipboard.Label>
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