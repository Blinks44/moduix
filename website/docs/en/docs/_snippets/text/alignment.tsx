import { Text } from '@moduix/react/text';

export default function TextAlignDemo() {
  return (
    <div style={{ display: 'grid', inlineSize: '100%', gap: 'var(--moduix-spacing-4)' }}>
      <Text align="start">Start-aligned text.</Text>
      <Text align="center">Center aligned text.</Text>
      <Text align="end">End-aligned text.</Text>
    </div>
  );
}