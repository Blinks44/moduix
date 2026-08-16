import { ScrollArea } from '@moduix/react/scroll-area';

const copy =
  'Long single-line or wide content can stay in one native scroll viewport while the custom horizontal track remains visible only when x-axis overflow exists.';

export default function HorizontalScrollAreaDemo() {
  return (
    <ScrollArea
      style={{
        border: 'var(--moduix-border-width-sm) solid var(--moduix-color-border)',
        borderRadius: 'var(--moduix-radius-lg)',
      }}
    >
      <ScrollArea.Viewport>
        <ScrollArea.Content>
          <p style={{ width: '50rem', margin: 0, padding: 'var(--moduix-spacing-3)' }}>{copy}</p>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea>
  );
}