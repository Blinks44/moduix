import { Clipboard } from '@moduix/react/clipboard';

export default function ValueTextClipboardDemo() {
  return (
    <Clipboard defaultValue="moduix/clipboard">
      <Clipboard.Control>
        <Clipboard.ValueText />
        <Clipboard.Trigger aria-label="Copy package name">
          <Clipboard.Indicator />
        </Clipboard.Trigger>
      </Clipboard.Control>
    </Clipboard>
  );
}