import { Clipboard } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function ValueTextClipboardDemo() {
  return (
    <PreviewLayout maxWidth="24rem" width="content">
      <Clipboard defaultValue="moduix/clipboard">
        <Clipboard.Control>
          <Clipboard.ValueText />
          <Clipboard.Trigger aria-label="Copy package name">
            <Clipboard.Indicator />
          </Clipboard.Trigger>
        </Clipboard.Control>
      </Clipboard>
    </PreviewLayout>
  );
}