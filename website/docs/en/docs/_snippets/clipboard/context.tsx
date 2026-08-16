import { Clipboard } from '@moduix/react/clipboard';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ContextClipboardDemo() {
  return (
    <Clipboard defaultValue="https://moduix.dev/docs/clipboard">
      <Clipboard.Control>
        <Clipboard.ValueText />
        <Clipboard.Trigger>
          <Clipboard.Indicator />
          <Clipboard.CopyText />
        </Clipboard.Trigger>
      </Clipboard.Control>
      <Clipboard.Context>
        {(clipboard) => (
          <div className="clipboard-preview-stack">
            <PreviewMeta>
              <output>Copied: {String(clipboard.copied)}</output>
            </PreviewMeta>
          </div>
        )}
      </Clipboard.Context>
    </Clipboard>
  );
}