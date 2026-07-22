import { Clipboard } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function CustomCopyTextClipboardDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Clipboard defaultValue="workspace-secret">
        <Clipboard.Label>Override copy labels</Clipboard.Label>
        <Clipboard.Control>
          <Clipboard.Input readOnly />
          <Clipboard.Trigger>
            <Clipboard.Indicator />
            <Clipboard.CopyText copied="Copied!">Copy secret</Clipboard.CopyText>
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard>
    </PreviewLayout>
  );
}