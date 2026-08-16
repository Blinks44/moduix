import { Textarea } from '@moduix/react/textarea';

export default function DisabledAndReadonlyTextareaDemo() {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)', inlineSize: '100%' }}>
      <Textarea aria-label="Disabled textarea" disabled placeholder="Disabled textarea" />
      <Textarea aria-label="Read-only textarea" readOnly value="Read-only text value" />
    </div>
  );
}