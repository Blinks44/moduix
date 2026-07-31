import { Text } from '@moduix/react/text';

export default function TextTonesDemo() {
  return (
    <div style={{ display: 'grid', gap: 'var(--moduix-spacing-3)' }}>
      <Text tone="default">Default tone</Text>
      <Text tone="muted">Muted tone</Text>
      <Text tone="subtle">Subtle tone</Text>
      <Text tone="primary">Primary tone</Text>
      <Text tone="destructive">Destructive tone</Text>
    </div>
  );
}